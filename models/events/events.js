var connection = require("../configurations/connection.js");
var bodyParser = require("../configurations/bodyParser.js");

var exports = module.exports = {};

bodyParser.bodyParser();

// Load events

exports.loadEvents = function (response) {
    connection.connection();
    var events;
    var query = 'SELECT nome_evento as name, descricao as description, morada as address, cidade as city, pais as country, data_desc as date, hora as hour FROM Evento, Localidade, Data_Hora, Categoria WHERE Evento.id_localidade = Localidade.id_localidade AND Evento.id_data_hora = Data_Hora.id_data_hora AND Evento.id_categoria = Categoria.id_categoria AND Evento.privacidade = 0;';
    global.connection.query(query, function (err, rows, fields) {
        if (!err) {
            events = rows;
            response.send(events);
        } else {
            console.log('Error while performing Query.', err);
        }
    });
};

// Create event

exports.createEvent = function (request, response) {
    connection.connection();

    var name = global.connection.escape(request.body.name);
    var date = global.connection.escape(request.body.date);
    var date = request.body.date;
    var tempDate = date.split(" ");
    date = tempDate[0];
    var hour = tempDate[1];
    var address = global.connection.escape(request.body.address);
    var city = global.connection.escape(request.body.city);
    var country = global.connection.escape(request.body.country);
    var typeEvent = request.body.selEvent;
    var privacy = request.body.optRadio;
    var image;

    var queryInsert = "INSERT INTO Localidade (morada, cidade, pais) VALUES (" + address + ", " + city + ", " + country + ");";
    var querySelect = "SELECT id_data_hora FROM Data_Hora WHERE data_desc =" + date + "AND hora =" + hour + ";"
    var querySelect2 = 'SELECT id_localidade FROM Localidade ORDER BY id_localidade DESC LIMIT 1;';
    var tempDataHora;
    var tempLocalidade;
    global.connection.query(querySelect, function (err, rows, fields) {
        if (!err) {
            tempDataHora = rows[0].id_data_hora
        } else {
            console.log('Error while performing Query.', err);
        }
    });

    global.connection.query(queryInsert, function (err, rows, fields) {
        if (!err) {
            console.log('Inserted');
        } else {
            console.log('Error while performing Query.', err);
        }
    });
    global.connection.query(querySelect2, function (err, rows, fields) {
        if (!err) {
            tempLocalidade = rows[0].id_localidade
        } else {
            console.log('Error while performing Query.', err);
        }
    });
    global.connection.query("INSERT INTO Evento (nome_evento, id_localidade, id_data_hora, id_categoria, privacidade) VALUES (" + name + ", " + tempLocalidade + ", " + tempDataHora + ", " + typeEvent + ", " + privacy + ");", function (err, rows, fields) {
        console.log("INSERT INTO Evento (nome_evento, id_localidade, id_data_hora, id_categoria, privacidade) VALUES (" + name + ", " + tempLocalidade + ", " + tempDataHora + ", " + typeEvent + ", " + privacy + ");")
        if (!err) {
            console.log('Inserted');
        } else {
            console.log('Error while performing Query.', err);
        }
    });
};

// Load events

exports.loadUserEvents = function (request, response) {
    connection.connection();
    var events;
    var user;
    if (request.session.type != "normal") {
        user = request.session.password;
    } else if (request.session.type == "normal") {
        user = request.session.id;
    }
    var query = 'SELECT nome_evento as name, descricao as description, morada as address, cidade as city, pais as country, data_desc as date, hora as hour FROM Evento, Localidade, Data_Hora, Categoria WHERE Evento.id_localidade = Localidade.id_localidade AND Evento.id_data_hora = Data_Hora.id_data_hora AND Evento.id_categoria = Categoria.id_categoria AND Evento.privacidade = 0 AND Evento.id_utilizador_criador =' + user + ';';
    global.connection.query(query, function (err, rows, fields) {
        if (!err) {
            events = rows;
            response.send(events);
            // console.log(events)
        } else {
            console.log('Error while performing Query.', err);
        }
    });
};