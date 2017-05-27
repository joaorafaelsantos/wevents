var connection = require("../models/connection.js");

var exports = module.exports = {};

exports.bodyParser = function () {
    global.app.use(global.bodyParser.urlencoded({
        extended: true
    }));
}

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
    var typeEvent = global.connection.escape(request.body.selEvent);
    var privacy = global.connection.escape(request.body.optRadio);

    var queryInsert = "INSERT INTO Data_Hora (data_desc, hora) VALUES ('" + date + "', '" + hour + "');";
    var queryInsert2 = "INSERT INTO Localidade (morada, cidade, pais) VALUES (" + address + ", " + city + ", " + country + ");";
    var querySelect = 'SELECT id_data_hora FROM Data_Hora ORDER BY id_data_hora DESC LIMIT 1;';
    var querySelect2 = 'SELECT id_localidade FROM Localidade ORDER BY id_localidade DESC LIMIT 1;';
    var tempData;
    global.connection.query(queryInsert, function (err, rows, fields) {
        if (!err) {
            console.log('Inserted');
        } else {
            console.log('Error while performing Query.', err);
        }
    });
    global.connection.query(querySelect, function (err, rows, fields) {
        if (!err) {
            tempDataHora = rows[0].id_data_hora
        } else {
            console.log('Error while performing Query.', err);
        }
    });

    global.connection.query(queryInsert2, function (err, rows, fields) {
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

    global.connection.query("INSERT INTO Evento nome_evento, id_localidade, id_data_hora, id_categoria, privacidade) VALUES (" + name + ", " + tempLocalidade + ", " + tempDataHora + ", " + typeEvent + ", " + privacy + ");", function (err, rows, fields) {
        if (!err) {
            console.log('Inserted');
        } else {
            console.log('Error while performing Query.', err);
        }
    });
};