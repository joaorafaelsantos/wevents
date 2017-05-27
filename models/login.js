var connection = require("../models/connection.js");
var bodyParser = require("../models/bodyParser.js");

var exports = module.exports = {};

bodyParser.bodyParser();

exports.login = function (request, response) {
    connection.connection();

    var email = global.connection.escape(request.body.email);
    var password = global.connection.escape(request.body.password);
    console.log(email, password);

    var query = "SELECT EXISTS(SELECT email, password FROM Utilizador WHERE email = " + email + " AND password = " + password + ") as value;";

    global.connection.query(query, function (err, rows, fields) {
        if (!err) {
            if (rows[0].value == 0) {
                request.redirect("https://wevents.herokuapp.com/login");
            } else {
                request.redirect("https://wevents.herokuapp.com/portal");
            }
        } else {
            console.log('Error while performing Query.', err);
        }
    });
};