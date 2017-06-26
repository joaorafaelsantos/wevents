var connection = require("../configurations/connection.js");
var bodyParser = require("../configurations/bodyParser.js");
var cookieSession = require("../configurations/cookieSession.js");

var exports = module.exports = {};

bodyParser.bodyParser();
cookieSession.cookieSession();


// Load events

exports.loadEvents = function (request, response) {
    connection.connection();
    var events;
    var query = 'SELECT privacidade as privacy, id_utilizador_criador as user_creator, chave as secretKey, img_url as image, nome_evento as name, descricao as description, morada as address, cidade as city, pais as country, data_desc as date FROM Evento, Localidade, Data_Hora, Categoria WHERE Evento.id_localidade = Localidade.id_localidade AND Evento.id_data_hora = Data_Hora.id_data_hora AND Evento.id_categoria = Categoria.id_categoria;';
    global.connection.query(query, function (err, rows, fields) {
        if (!err) {
            events = rows;
            response.send(events);
        } else {
            response.send("fail");
        }
    });
};

// Load users

exports.loadUsers = function (request, response) {
    connection.connection();
    var users;
    var query = 'SELECT img_url as image, password as password, email as email, nome as name, id_tipo_utilizador as tipo FROM Utilizador;';
    global.connection.query(query, function (err, rows, fields) {
        if (!err) {
            users = rows;
            response.send(users);
        } else {
            response.send("fail");
        }
    });
};

// Change users

exports.changeUser = function (request, response) {
    connection.connection();
    var email = request.body.email;
    var pass = request.body.pass;
    var img = request.body.img;
    var update = "UPDATE Utilizador SET password = '" + pass + "',  img_url = '" + img + "' WHERE email = '" + email + "';";
    global.connection.query(update, function (err, result) {
        if (err) throw err;
        response.send("success");
    });
};

// Remove users

exports.removeUser = function (request, response) {
    connection.connection();
    var email = request.body.email;
    var remove = "DELETE FROM Utilizador WHERE email = '" + email + "';";
    console.log(remove);
    // global.connection.query(remove, function (err, result) {
    //     if (err) throw err;
    //     response.send("success");
    // });
};

// Create users

exports.createUser = function (request, response) {
    connection.connection();
    var email = global.connection.escape(request.body.email);
    var name = global.connection.escape(request.body.name);
    var pass = global.connection.escape(request.body.pass);
    var tipo = request.body.tipo;
    var img =  global.connection.escape(request.body.img);
    var insert = "INSERT INTO Utilizador (password, email, id_tipo_utilizador, nome, img_url) VALUES (" + pass + ", " + email + ", '" + tipo + "' , " + name + " , " + img + ");";
    console.log(insert);
    // global.connection.query(insert, function (err, result) {
    //     if (!err) {
    //         response.send("success");
    //     } else {
    //         response.send("fail");
    //     }
    // });
};

// Change event

exports.changeEvent = function (request, response) {
    connection.connection();
    var event = request.body.event;
    var img = request.body.img;
    var privacidade = request.body.privacidade;
    var rua = request.body.rua;
    var localidade = "SELECT id_localidade FROM Localidade WHERE morada = '" + rua;
    var update = "UPDATE Evento SET privacidade = '" + privacidade + "',  img_url = '" + img + "',  id_localidade = (" + localidade + "') WHERE nome_evento = '" + event + "';";
    global.connection.query(update, function (err, result) {
        if (!err) {
            response.send("success");
        } else {
            response.send("fail");
        }
    });
};

// Remove event

exports.removeEvent = function (request, response) {
    connection.connection();
    var event = request.body.event;
    var remove = "DELETE FROM Evento WHERE nome_evento = '" + event + "';";
    global.connection.query(remove, function (err, result) {
        if (!err) {
            response.send("success");
        } else {
            response.send("fail");
        }
    });
};

exports.getStatistics = function (request, response) {
    connection.connection();
    var query = "SELECT (SELECT SUM(TABLE_ROWS) FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'webitclo_G501') as Inserts, (SELECT COUNT(*) FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'webitclo_G501') as Tables, (SELECT COUNT(*) FROM Evento) as Events, (SELECT COUNT(*) FROM Utilizador) as Users, (SELECT COUNT(*) FROM Registo) as Subscriptions;";
    global.connection.query(query, function (err, rows, fields) {
        if (!err) {
            response.send(rows);
        } else {
            response.send("fail");
        }
    });

};

exports.checkLogin = function (request, response) {
    connection.connection();

    var email = global.connection.escape(request.body.email);
    var password = global.connection.escape(request.body.password);

    var query = "SELECT EXISTS(SELECT email, password, id_tipo_utilizador FROM Utilizador WHERE email = " + email + " AND password = " + password + "AND id_tipo_utilizador = 1) as value, id_utilizador, nome FROM Utilizador WHERE email =" + email + ";";

    global.connection.query(query, function (err, rows, fields) {
        if (!err) {
            if (rows[0].value != 0) {
                request.session.name = rows[0].nome;
                request.session.email = request.body.email;
                request.session.password = password;
                request.session.key = "*\~/*" + request.session.name + "*\./*" + password + "*\|/*" + password.length + "*\%/*" + request.session.name.length + "*\}/*" + "tsiw_2017" + "*\ª/*";
                request.session.id = rows[0].id_utilizador;
                response.send("success");
            } else {
                response.send("!auth");
            }
        } else {
            console.log('Error while performing Query.', err);
            global.request("https://wevents.herokuapp.com").pipe(response);
        }
    });
};
