var connection = require("../models/connection.js");

var exports = module.exports = {};

exports.bodyParser = function () {
    global.app.use(global.bodyParser.urlencoded({
        extended: true
    }));
}

exports.createUser = function (request, response) {
    connection.connection();

    var email = global.connection.escape(request.body.email);
    var password = global.connection.escape(request.body.password);

    var query = "INSERT INTO Utilizador (password, email, id_tipo_utilizador) VALUES ('" + password + "', '" + email + ", 2');";

    global.connection.query(query, function (err, rows, fields) {
        if (!err) {
            console.log('Inserted');
        } else {
            console.log('Error while performing Query.', err);
        }
    });
};