var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'webitcloud.net',
  user: 'webitclo_G501',
  password: 'BD1617G501526',
  database: 'webitclo_G501'
});

connection.connect();
var confs;

connection.query('SELECT nome_empresa from Empresa', function (err, rows, fields) {
  if (!err) {
    console.log('The solution is: ', rows);
  }
  else {
    console.log('Error while performing Query.', err);
  }
  confs = rows;
});

connection.end();
