var connection = require("../configurations/connection.js");
var bodyParser = require("../configurations/bodyParser.js");

var exports = module.exports = {};

bodyParser.bodyParser();

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
        console.log("1 user updated");
    });
};

// Remove users

exports.removeUser = function (request, response) {
    connection.connection();
    var email = request.body.email;
    var remove = "DELETE FROM Utilizador WHERE email = '" + email + "';";
    global.connection.query(remove, function (err, result) {
        if (err) throw err;
        console.log("1 user removed");
    });
};

// Create users

exports.createUser = function (request, response) {
    connection.connection();
    var email = requestuest.body.email;
    var name = request.body.name;
    var pass = request.body.pass;
    var tipo = request.body.tipo;
    var img = request.body.img;
    var insert = "INSERT INTO Utilizador (password, email, id_tipo_utilizador, nome, img_url) VALUES ('" + pass + "', '" + email + "', '" + tipo + "' , '" + name + "' , '" + img + "');";
    global.connection.query(insert, function (err, result) {
        if (err) throw err;
        console.log("1 user inserted");
    });
};

// Change event

exports.changeEvent = function (request, response) {
    connection.connection();
    var event = request.body.event;
    var img = request.body.img;
    var privacidade = request.body.privacidade;
    var rua = request.body.rua;
    var localidade = "SELECT id_localidade FROM Localidade WHERE morada = '" + rua + "';";
    var update = "UPDATE Evento SET privacidade = '" + privacidade + "',  img_url = '" + img + "',  id_localidade = '" + localidade + "' WHERE evento = '" + event + "';";
    global.connection.query(update, function (err, result) {
        if (err) throw err;
        console.log("1 event updated");
    });
};

// Remove event

exports.removeEvent = function (request, response) {
    connection.connection();
    var event = request.body.event;
    var remove = "DELETE FROM Evento WHERE nome_evento = '" + event + "';";
    global.connection.query(remove, function (err, result) {
        if (err) throw err;
        console.log("1 event removed");
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

    var query = "SELECT EXISTS(SELECT email, password, id_tipo_utilizador FROM Utilizador WHERE email = " + email + " AND password = " + password + "AND id_tipo_utilizador = 2) as value, id_utilizador, nome FROM Utilizador WHERE email =" + email + ";";

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

// Get user

exports.getUser = function (request, response) {
    var name = request.session.name;
    var id = request.session.id;
    var img = request.session.img;
    var data = {
        name: name,
        id: id,
        img: img
    }
    if (name != undefined) {
            connection.connection();
            var query = "SELECT nome, img_url from Utilizador WHERE id_utilizador =" + id + ";"
            global.connection.query(query, function (err, rows, fields) {
                if (!err) {
                    data.name = rows[0].nome;
                    data.img = rows[0].img_url;
                    request.session.img = rows[0].img_url;
                    response.send(data);
                } else {
                    console.log('Error while performing Query.', err);
                    response.send("fail");
                }
            });
    } else {
        response.send("!auth");
    }
};

// Logout

exports.logout = function (request, response) {
    request.session = null;
    response.send("logout");
};