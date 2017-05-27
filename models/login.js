var connection = require("../models/connection.js");

var exports = module.exports = {};

exports.bodyParser = function () {
    global.app.use(global.bodyParser.urlencoded({
        extended: true
    }));
}

exports.login = function () {
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