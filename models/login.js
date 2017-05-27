var connection = require("../models/connection.js");
var bodyParser = require("../models/bodyParser.js");

var exports = module.exports = {};

bodyParser.bodyParser();

exports.login = function (request, response) {
    connection.connection();

    var email = global.connection.escape(request.body.email);
    var password = global.connection.escape(request.body.password);

    var query = "SELECT EXISTS(SELECT email, password FROM Utilizador WHERE email = " + email + " AND password = " + password + " +);";

    global.connection.query(query, function (err, rows, fields) {
        if (!err) {
            console.log(rows)
        } else {
            console.log('Error while performing Query.', err);
        }
    });
};