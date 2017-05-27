// var connection = require("../models/connection.js");

var exports = module.exports = {};

exports.bodyParser = function () {
    global.app.use(global.bodyParser.urlencoded({
        extended: true
    }));
}

exports.createEvent = function (request, response) {
    var name = request.body.name;
    var date = request.body.date;
    var address = request.body.address;
    var city = request.body.city;
    var country = request.body.country;
    var typeEvent = request.body.selEvent;
    var privacy = request.body.optradio;
    response.send(privacy);
    // name, date, address, city, country, typeEvent, 

    // connection.connection();

    // var events;
    // global.connection.query('SELECT nome_evento, descricao, morada, cidade, pais, data_desc FROM Evento, Localidade, Data_Hora, Categoria WHERE Evento.id_localidade = Localidade.id_localidade AND Evento.id_data_hora = Data_Hora.id_data_hora AND Evento.id_categoria = Categoria.id_categoria AND Evento.privacidade = 0;', function (err, rows, fields) {
    //     if (!err) {
    //         events = rows;
    //         response.send(events);
    //     } else {
    //         console.log('Error while performing Query.', err);
    //     }
    // });

};