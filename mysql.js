var mysql = require('mysql');
var express = require('express')
var app = express();

var port = process.env.PORT || 3000;
app.listen(port);

var connection = mysql.createConnection({
  host: 'webitcloud.net',
  user: 'webitclo_G501',
  password: 'BD1617G501526',
  database: 'webitclo_G501'
});

connection.connect();

// POST method route
app.post('/home2', function (req, res) {
  var data = "";

  connection.query('SELECT nome_empresa from Empresa', function (err, rows, fields) {
    if (!err) {
      console.log('The solution is: ', rows);
      console.log("entrei");
      data = rows;
      console.log(data);
      res.send(JSON.stringify(rows));
    } else {
      console.log('Error while performing Query.', err);
    }

  });
})



connection.end();