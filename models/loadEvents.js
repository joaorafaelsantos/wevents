var mysql = require('mysql');
var express = require('express');
var http = require('http');
var request = require('request');
var app = express();
var port = process.env.PORT || 3000;


var connection = mysql.createConnection({
    host: 'webitcloud.net',
    user: 'webitclo_G501',
    password: 'BD1617G501526',
    database: 'webitclo_G501'
});

connection.connect();

app.get('/home', function (req, res) {
    request("https://webitcloud.net/PW/1617/JAF/App/views/index.html").pipe(res);
});

// app.post('/loadEvents', function (req, res) {

//     var events;
//     connection.query('SELECT nome_evento, descricao, morada, cidade, pais, data_desc FROM Evento, Localidade, Data_Hora, Categoria WHERE Evento.id_localidade = Localidade.id_localidade AND Evento.id_data_hora = Data_Hora.id_data_hora AND Evento.id_categoria = Categoria.id_categoria;', function (err, rows, fields) {
//         if (!err) {
//             events = rows;
//             res.send(events);
//         } else {
//             console.log('Error while performing Query.', err);
//         }
//     });
// });

// app.use(function (err, req, res, next) {
//     request("https://webitcloud.net/PW/1617/JAF/App/views/pages/errors/404.html").pipe(res);
// });

app.listen(port, function () {
    //   console.log('Example app listening on port 3000!')
})