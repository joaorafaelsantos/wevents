var connection = require("../configurations/connection.js");
var bodyParser = require("../configurations/bodyParser.js");
var cookieSession = require("../configurations/cookieSession.js");
var transporter = require("../configurations/transporter.js");

var exports = module.exports = {};

bodyParser.bodyParser();
cookieSession.cookieSession();

// Load events

exports.loadEvents = function (response) {
    connection.connection();
    var events;
    var query = "SELECT nome_evento as name, descricao as description, morada as address, cidade as city, pais as country, data_desc as date, hora as hour, img_url as img, capacidade as capacity FROM Evento, Localidade, Data_Hora, Categoria WHERE Evento.id_localidade = Localidade.id_localidade AND Evento.id_data_hora = Data_Hora.id_data_hora AND Evento.id_categoria = Categoria.id_categoria AND Evento.privacidade = 0 GROUP BY id_evento;";
    global.connection.query(query, function (err, rows, fields) {
        if (!err) {
            events = rows;
            response.send(events);
        } else {
            response.send("fail");
        }
    });
};

// Create event

exports.createEvent = function (request, response) {
    connection.connection();

    var name = global.connection.escape(request.body.name);
    var date = global.connection.escape(request.body.date);
    var hour = global.connection.escape(request.body.hour);
    var address = global.connection.escape(request.body.address);
    var city = global.connection.escape(request.body.city);
    var country = global.connection.escape(request.body.country);
    var typeEvent = request.body.type;
    var url = global.connection.escape(request.body.url);
    var privacy = request.body.privacy;
    var capacity = request.body.capacity;

    var currentDate = (Date.now()).toString();
    var key = "_" + name[1].toUpperCase() + name[name.length - 2].toUpperCase() + currentDate;

    var queryInsert = "INSERT INTO Localidade (morada, cidade, pais) VALUES (" + address + ", " + city + ", " + country + ");";

    global.connection.query(queryInsert, function (err, rows, fields) {});

    var query = "INSERT INTO Evento (nome_evento, id_localidade, id_data_hora, id_categoria, id_utilizador_criador, privacidade, img_url, capacidade, chave) VALUES (" + name + ", " + "(SELECT id_localidade FROM Localidade ORDER BY id_localidade DESC LIMIT 1), (SELECT id_data_hora FROM Data_Hora WHERE data_desc =" + date + " AND hora = " + hour + ")" + ", " + typeEvent + ", " + request.session.id + ", " + privacy + ", " + url + ", " + capacity + ", '" + key + "');"
    global.connection.query(query, function (err, rows, fields) {
        if (!err) {
            if (request.session.email != undefined) {
                sendEmail();
            } else {
                response.send("success");
            }

        } else {
            response.send("fail");
        }
    });

    function sendEmail() {
        transporter.transporter();

        var email = request.session.email;
        var text = "Hello " + request.session.name + ", here is some information about your new event (" + name + "):<br>";
        var typeEventArray = ['Conference', 'Project', 'Reunion', 'Workshop'];
        var privacyArray = ['Public', 'Private'];
        var content = "Name: " + name + "<br><br><img src=" + url + " width='145px' height='105px'><br><br>Date: " + date + "<br>Hour: " + hour + "<br>Address: " + address + "<br>City: " + city + "<br>Country: " + country + "<br>Type: " + typeEventArray[typeEvent - 1] + "<br>Privacy: " + privacyArray[privacy] + "<br>Capacity: " + capacity + "<br>Secret key: " + key;

        var mailOptions = {
            from: 'jaf@webitcloud.net',
            to: email,
            subject: 'worldevents // ' + name,
            html: "<center><b>worldevents / The soul of your events</b><br><br><img src='https://webitcloud.net/PW/1617/JAF/App/views/assets/common/img/logo/logo144.png'</img><br><br><br>" + text + "<br><br>" + content + "<br><br><br><br><a href='https://wevents.herokuapp.com'>Visit us</a></center>"
        };

        global.transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                response.send("fail");
            } else {
                response.send("success");
            };
        });
    }

};

// Load events

exports.loadUserEvents = function (request, response) {
    connection.connection();
    var events;
    var id = request.session.id;

    var query = 'SELECT id_evento as id, nome_evento as name, descricao as description, morada as address, cidade as city, pais as country, data_desc as date, hora as hour, img_url as img FROM Evento, Localidade, Data_Hora, Categoria WHERE Evento.id_localidade = Localidade.id_localidade AND Evento.id_data_hora = Data_Hora.id_data_hora AND Evento.id_categoria = Categoria.id_categoria AND Evento.id_utilizador_criador =' + id + ';';
    global.connection.query(query, function (err, rows, fields) {
        if (!err) {
            events = rows;
            response.send(events);
        } else {
            response.send("fail");
        }
    });
};

exports.loadUserSubscribedEvents = function (request, response) {
    connection.connection();
    var events;
    var id = request.session.id;
    var query = "(SELECT Evento.id_evento as id, Registo.id_utilizador as user_id, nome_evento as name, descricao as description, morada as address, cidade as city, pais as country, data_desc as date, hora as hour, img_url as img FROM Evento, Localidade, Data_Hora, Categoria, Registo WHERE Evento.id_localidade = Localidade.id_localidade AND Evento.id_data_hora = Data_Hora.id_data_hora AND Evento.id_categoria = Categoria.id_categoria AND Evento.id_evento = Registo.id_evento AND id_utilizador =" + id + ");";
    global.connection.query(query, function (err, rows, fields) {
        if (!err) {
            events = rows;
            response.send(events);
        } else {
            response.send("fail");
        }
    });
};

exports.loadSubscribeEvent = function (request, response) {
    connection.connection();
    var events;
    var id = request.session.id;
    var query = "SELECT id_evento as id, Evento.id_utilizador_criador as user_id,nome_evento as name, descricao as description, morada as address, cidade as city, pais as country, data_desc as date, hora as hour, img_url as img FROM Evento, Localidade, Data_Hora, Categoria WHERE Evento.id_localidade = Localidade.id_localidade AND Evento.id_data_hora = Data_Hora.id_data_hora AND Evento.id_categoria = Categoria.id_categoria AND Evento.id_utilizador_criador !=" + id + " AND Evento.privacidade = 0 AND id_evento NOT IN (SELECT id_evento as id FROM Registo WHERE id_utilizador =" + id + ");"
    global.connection.query(query, function (err, rows, fields) {
        if (!err) {
            events = rows;
            response.send(events);
        } else {
            response.send("fail");
        }
    });
};

exports.subscribeEvent = function (request, response) {
    connection.connection();
    var events;
    var id = request.session.id;
    var id_event = request.body.id;
    var key = request.body.key;
    var query = '';

    if (key != undefined) {
        id_event = "(SELECT id_evento FROM Evento WHERE chave = '" + key + "' )";
        query = "INSERT INTO Registo(id_evento, id_utilizador) SELECT DISTINCT " + id_event + ", " + id + " FROM Registo WHERE (SELECT (SELECT COUNT(*) FROM Registo WHERE id_evento = " + id_event + ") < (SELECT capacidade FROM Evento WHERE id_evento = " + id_event + ") = 1) AND " + id_event + " NOT IN (SELECT id_evento FROM Evento WHERE id_utilizador_criador = " + id + ");";
    } else {
        query = "INSERT INTO Registo(id_evento, id_utilizador) SELECT DISTINCT " + id_event + ", " + id + " FROM Registo WHERE (SELECT (SELECT COUNT(*) FROM Registo WHERE id_evento = " + id_event + ") < (SELECT capacidade FROM Evento WHERE id_evento = " + id_event + ") = 1) AND " + id_event + " NOT IN (SELECT id_evento FROM Evento WHERE id_utilizador_criador = " + id + ");";
    }

    global.connection.query(query, function (err, result) {
        if (!err) {
            var numRows = result.affectedRows;
            if (numRows == 1) {
                response.send("success");
            } else {
                response.send("fail");
            }
        } else {
            response.send("fail");
        }
    });

};

exports.getSubscribers = function (request, response) {
    connection.connection();
    var id_event = request.body.id;
    var query = "SELECT Utilizador.img_url, Utilizador.nome FROM Registo, Utilizador, Evento WHERE Registo.id_utilizador = Utilizador.id_utilizador AND Registo.id_evento = " + id_event + " GROUP BY Utilizador.nome;"
    global.connection.query(query, function (err, rows, fields) {
        if (!err) {
            var subscribers = rows;
            response.send(subscribers);
        } else {
            response.send("fail");
        }
    });
};

exports.removeEvent = function (request, response) {
    connection.connection();
    var id_event = request.body.id;
    var query = "DELETE FROM Evento WHERE id_evento = " + id_event + ";";

    global.connection.query(query, function (err, result) {
        if (!err) {
            var numRows = result.affectedRows;
            if (numRows == 1) {
                response.send("success");
            } else {
                response.send("fail");
            }
        } else {
            response.send("fail");
        }
    });
};

exports.removeSubscription = function (request, response) {
    connection.connection();
    var id = request.session.id;
    var id_event = request.body.id;
    var query = "DELETE FROM Registo WHERE id_utilizador = " + id + " AND id_evento = " + id_event + ";";

    global.connection.query(query, function (err, result) {
        if (!err) {
            var numRows = result.affectedRows;
            if (numRows == 1) {
                response.send("success");
            } else {
                response.send("fail");
            }
        } else {
            response.send("fail");
        }
    });
};