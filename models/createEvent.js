// var connection = require("../models/connection.js");

var exports = module.exports = {};

exports.createEvent = function (request, response) {

    response.send('You sent the name "' + request.body.name + '".');

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