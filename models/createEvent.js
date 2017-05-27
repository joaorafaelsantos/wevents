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
    var querys = [];
    // var query = "INSERT INTO Data_Hora (data_desc, hora) VALUES (" + date + ", " + hour + ");";
    // var query2 = "INSERT INTO Localidade (morada, cidade, pais) VALUES (" + address + ", " + city + ", " + country +");";
    // var query3 = "INSERT INTO Evento nome_evento, id_localidade, id_data_hora, id_categoria, privacidade) VALUES (" + nome_evento + ", " + city + ", " + country +");";
    // nome_evento,localidade,data,tipo_evento,privacidade_evento,img_evento);
    // query.push(query, query2, query3);
    // for (var i = 0; i < 3; i++) {

    // }
    var tempData;
    global.connection.query('SELECT id_data_hora FROM Data_Hora ORDER BY id_data_hora DESC LIMIT 1;', function (err, rows, fields) {
        if (!err) {
            tempData = rows;
            response.send(tempData);
        } else {
            console.log('Error while performing Query.', err);
        }
    });
    console.log(tempData)

    "SELECT id_data_hora FROM Data_Hora ORDER BY id_data_hora DESC LIMIT 1;"

};