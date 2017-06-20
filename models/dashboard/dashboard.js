var connection = require("../configurations/connection.js");

var exports = module.exports = {};

// Load events

exports.loadEvents = function (response) {
    connection.connection();
    var events;
    var query = 'SELECT privacidade as privacy, id_utilizador_criador as user_creator, chave as key, img_url as image, nome_evento as name, descricao as description, morada as address, cidade as city, pais as country, data_desc as date FROM Evento, Localidade, Data_Hora, Categoria WHERE Evento.id_localidade = Localidade.id_localidade AND Evento.id_data_hora = Data_Hora.id_data_hora AND Evento.id_categoria = Categoria.id_categoria;';
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

exports.loadUsers = function (response) {
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