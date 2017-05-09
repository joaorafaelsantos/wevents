var mysql = require('mysql');
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var connection = mysql.createConnection({
    host: 'webitcloud.net',
    user: 'webitclo_G501',
    password: 'BD1617G501526',
    database: 'webitclo_G501'
});

app.post('/loadEvents', function (req, res) {
    connection.connect();
    var events;
    var conferences;
    var projects;
    var reunions;
    var workshops;
    connection.query('SELECT nome_evento, id_localidade, id_data_hora from Evento', function (err, rows, fields) {
        if (!err) {
            // for (var i = 0; i < rows.length; i++) {
            //     if (rows[i].descricao == 'Conferência') {
            //         conferences.push(rows[i]);
            //     }
            //     else if (rows[i].descricao == 'Projeto') {
            //         projects.push(rows[i]);
            //     }
            //     else if (rows[i].descricao == 'Reuniões') {
            //         reunions.push(rows[i]);
            //     }
            //     else if (rows[i].descricao == 'Workshops') {
            //         workshops.push(rows[i]);
            //     }
            // }
            // events.conferences = conferences;
            // events.projects = projects;
            // events.reunions = reunions;
            // events.workshops = workshops;
            events = "123";
            res.send(events);
        }
        else {
            console.log('Error while performing Query.', err);
        }
    });
    connection.end();
});

app.listen(port, function () {
//   console.log('Example app listening on port 3000!')
})