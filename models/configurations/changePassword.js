var connection = require("./connection.js");
var bodyParser = require("./bodyParser.js");
var cookieSession = require("./cookieSession.js");

bodyParser.bodyParser();
cookieSession.cookieSession();

var exports = module.exports = {};

exports.changePassword = function (request, response) {

    connection.connection();

    var email = request.session.user;
    var sessionPassword = request.session.password;
    var oldPassword = request.body.oldPassword;
    var newPassword = request.body.newPassword;

    if (oldPassword == sessionPassword) {
        var sql = "UPDATE Utilizador SET password = '" + newPassword + "' WHERE email = '" + email + "';";
        global.connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
        });
        request.session = null;
        response.send("success");
    } else {
        response.send("fail");
    }

};