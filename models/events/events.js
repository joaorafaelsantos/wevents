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
    var hour = global.connection.escape(request.body.hour);
    var address = global.connection.escape(request.body.address);
    var city = global.connection.escape(request.body.city);
    var country = global.connection.escape(request.body.country);
    var typeEvent = global.connection.escape(request.body.type);
    var url = global.connection.escape(request.body.url);
    var privacy = global.connection.escape(request.body.privacy);

    var queryInsert = "INSERT INTO Localidade (morada, cidade, pais) VALUES (" + address + ", " + city + ", " + country + ");";
    var querySelect = "SELECT id_data_hora FROM Data_Hora WHERE data_desc =" + date + " AND hora = " + hour + ";"
    var querySelect2 = 'SELECT id_localidade FROM Localidade ORDER BY id_localidade DESC LIMIT 1;';
    var tempDataHora;
    var tempLocalidade;
    // global.connection.query(queryInsert, function (err, rows, fields) {
    //     if (!err) {
    //         console.log('Inserted');
    //     } else {
    //         console.log('Error while performing Query.', err);
    //     }
    // });

    var query = "INSERT INTO Evento (nome_evento, id_localidade, id_data_hora, id_categoria, privacidade, img_url) VALUES (" + name + ", " + "(SELECT id_localidade FROM Localidade ORDER BY id_localidade DESC LIMIT 1)" + ", " + "(SELECT id_data_hora FROM Data_Hora WHERE data_desc =" + date + "' AND hora = '" + hour + ")" + ", " + typeEvent + ", " + privacy + ", " + url + ");"
    console.log(query)
    // global.connection.query("INSERT INTO Evento (nome_evento, id_localidade, id_data_hora, id_categoria, privacidade, img_url) VALUES (" + name + ", " + tempLocalidade + ", " + tempDataHora + ", " + typeEvent + ", " + privacy + ", " + url + ");", function (err, rows, fields) {
    //     if (!err) {
    //         console.log('Inserted');
    //     } else {
    //         console.log('Error while performing Query.', err);
    //     }
    // });
};

// Load events

exports.loadUserEvents = function (request, response) {
    connection.connection();
    var events;
    var id = request.session.id;

    var query = 'SELECT id_evento as id, nome_evento as name, descricao as description, morada as address, cidade as city, pais as country, data_desc as date, hora as hour FROM Evento, Localidade, Data_Hora, Categoria WHERE Evento.id_localidade = Localidade.id_localidade AND Evento.id_data_hora = Data_Hora.id_data_hora AND Evento.id_categoria = Categoria.id_categoria AND Evento.id_utilizador_criador =' + id + ';';
    global.connection.query(query, function (err, rows, fields) {
        if (!err) {
            events = rows;
            response.send(events);
        } else {
            console.log('Error while performing Query.', err);
        }
    });
};