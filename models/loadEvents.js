var module = require('module');
var exports = module.exports = {};

exports.connection = function () {
    var connection = mysql.createConnection({
        host: 'webitcloud.net',
        user: 'webitclo_G501',
        password: 'BD1617G501526',
        database: 'webitclo_G501'
    });
    connection.connect();
};

exports.loadEvents = function () {
    var events;
    connection.query('SELECT nome_evento, descricao, morada, cidade, pais, data_desc FROM Evento, Localidade, Data_Hora, Categoria WHERE Evento.id_localidade = Localidade.id_localidade AND Evento.id_data_hora = Data_Hora.id_data_hora AND Evento.id_categoria = Categoria.id_categoria;', function (err, rows, fields) {
        if (!err) {
            events = rows;
            res.send(events);
        } else {
            console.log('Error while performing Query.', err);
        }
    });
};