var connection = require("../models/connection.js");
var bodyParser = require("../models/bodyParser.js");

var exports = module.exports = {};

bodyParser.bodyParser();

exports.login = function (request, response, auth) {
    connection.connection();

    var email = global.connection.escape(request.body.email);
    var password = global.connection.escape(request.body.password);

    var query = "SELECT EXISTS(SELECT email, password FROM Utilizador WHERE email = " + email + " AND password = " + password + ") as value;";
    global.auth = false;
    global.connection.query(query, function (err, rows, fields) {
        if (!err) {
            // if (rows[0].value != 0) {
            //     global.auth = true;
            // }
            console.log("tamanho: " + rows[0].value);
        } else {
            console.log('Error while performing Query.', err);
            global.request("https://wevents.herokuapp.com").pipe(response);
        }
    });
};