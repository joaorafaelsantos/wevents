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
    //console.log(name, date, hour, address, city, country, typeEvent, privacy);
    var querysInsert = [];
    var queryInsert = "INSERT INTO Data_Hora (data_desc, hora) VALUES ('" + date + "', '" + hour + "');";
    var queryInsert2 = "INSERT INTO Localidade (morada, cidade, pais) VALUES ('" + address + "', '" + city + "', '" + country + "');";
    querysInsert.push(queryInsert, queryInsert2);
    var querysSelect = [];
    var querySelect = 'SELECT id_data_hora FROM Data_Hora ORDER BY id_data_hora DESC LIMIT 1;';
    var querySelect2 = 'SELECT id_localidade FROM Localidade ORDER BY id_localidade DESC LIMIT 1;';
    querysSelect.push(querySelect, querySelect2);

    var dataQuery = [];
    for (var i = 0; i < 2; i++) {
        global.connection.query(queryInsert[0], function (err, rows, fields) {
            if (!err) {
                console.log('Inserted');
            } else {
                console.log('Error while performing Query.', err);
            }
            console.log(dataQuery)
        });
        global.connection.query(querySelect[0], function (err, rows, fields) {
            if (!err) {
                var tempData = rows;
                dataQuery.push(tempData);
            } else {
                console.log('Error while performing Query.', err);
            }
            console.log(dataQuery)
        });
        
    } //console.log(name, date, hour, address, city, country, typeEvent, privacy);
    var queryInsertEvent = "INSERT INTO Evento nome_evento, id_localidade, id_data_hora, id_categoria, privacidade) VALUES ('" + name + "', " + dataQuery[1].tempData[0].id_localidade + ", '" + dataQuery[0].tempData[0].id_data_hora + "', " + typeEvent + ", " + privacy + ");";
    global.connection.query(queryInsertEvent, function (err, rows, fields) {
        if (!err) {
            console.log('Inserted');
        } else {
            console.log('Error while performing Query.', err);
        }
    });



    // "SELECT id_data_hora FROM Data_Hora ORDER BY id_data_hora DESC LIMIT 1;"

};