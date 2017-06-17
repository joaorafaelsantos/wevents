var connection = require("../configurations/connection.js");
var bodyParser = require("../configurations/bodyParser.js");
var cookieSession = require("../configurations/cookieSession.js");

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
    var typeEvent = global.connection.escape(request.body.type);
    var url = global.connection.escape(request.body.url);
    var privacy = global.connection.escape(request.body.privacy);
    var capacity = global.connection.escape(request.body.capacity);

    var currentDate = (Date.now()).toString();
    var key = '_' + name[0].toUpperCase() + name[name.length - 1].toUpperCase() + currentDate;

    var queryInsert = "INSERT INTO Localidade (morada, cidade, pais) VALUES (" + address + ", " + city + ", " + country + ");";

    global.connection.query(queryInsert, function (err, rows, fields) {
        if (!err) {
            response.send("success");
        } else {
            response.send("fail");
        }
    });

    var query = "INSERT INTO Evento (nome_evento, id_localidade, id_data_hora, id_categoria, id_utilizador_criador, privacidade, img_url, capacidade, chave) VALUES (" + name + ", " + "(SELECT id_localidade FROM Localidade ORDER BY id_localidade DESC LIMIT 1), (SELECT id_data_hora FROM Data_Hora WHERE data_desc =" + date + " AND hora = " + hour + ")" + ", " + typeEvent + ", " + request.session.id + ", " + privacy + ", " + url + ", " + capacity + ", " + key + ");"
    global.connection.query(query, function (err, rows, fields) {
        if (!err) {
            response.send("success");
        } else {
            response.send("fail");
        }
    });
    response.send("end");
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
            console.log('Error while performing Query.', err);
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
            console.log('Error while performing Query.', err);
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
            console.log('Error while performing Query.', err);
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
        id_event = "(SELECT id_evento FROM Evento WHERE chave = " + key + " )";
        console.log("key")
        query = "INSERT INTO Registo(id_evento, id_utilizador) SELECT DISTINCT " + id_event + ", " + id + " FROM Registo WHERE (SELECT (SELECT COUNT(*) FROM Registo WHERE id_evento = " + id_event + ") < (SELECT capacidade FROM Evento WHERE id_evento = " + id_event + ") = 1) AND " + id_event + " NOT IN (SELECT id_evento FROM Evento WHERE id_utilizador_criador = " + id + ");";
    } else {
        query = "INSERT INTO Registo(id_evento, id_utilizador) SELECT DISTINCT " + id_event + ", " + id + " FROM Registo WHERE (SELECT (SELECT COUNT(*) FROM Registo WHERE id_evento = " + id_event + ") < (SELECT capacidade FROM Evento WHERE id_evento = " + id_event + ") = 1) AND " + id_event + " NOT IN (SELECT id_evento FROM Evento WHERE id_utilizador_criador = " + id + ");";
    }

    // global.connection.query(query, function (err, result) {
    //     if (!err) {
    //         var numRows = result.affectedRows;
    //         if (numRows == 1) {
    //             response.send("success");
    //         } else {
    //             response.send("fail");
    //         }
    //     } else {
    //         response.send("fail");
    //         console.log('Error while performing Query.', err);
    //     }
    // });
};