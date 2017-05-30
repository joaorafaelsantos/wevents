var connection = require("../models/connection.js");

var exports = module.exports = {};

exports.loadEvents = function (response) {
    connection.connection();
    var events;
    var query = 'SELECT nome_evento as name, descricao as description, morada as address, cidade as city, pais as country, data_desc as date FROM Evento, Localidade, Data_Hora, Categoria WHERE Evento.id_localidade = Localidade.id_localidade AND Evento.id_data_hora = Data_Hora.id_data_hora AND Evento.id_categoria = Categoria.id_categoria AND Evento.privacidade = 0;';
    global.connection.query(query, function (err, rows, fields) {
        if (!err) {
            events = rows;
            response.send(events);
        } else {
            console.log('Error while performing Query.', err);
        }
    });

};