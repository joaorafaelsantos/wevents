var connection = require("../models/connection.js");
var bodyParser = require("../models/bodyParser.js");
var cookieSession = require("../models/cookieSession.js");

var exports = module.exports = {};

bodyParser.bodyParser();
cookieSession.cookieSession();

exports.login = function (request, response) {
    connection.connection();

    var email = global.connection.escape(request.body.email);
    var password = global.connection.escape(request.body.password);

    var query = "SELECT EXISTS(SELECT email, password FROM Utilizador WHERE email = " + email + " AND password = " + password + ") as value;";

    global.connection.query(query, function (err, rows, fields) {
        if (!err) {
            if (rows[0].value != 0) {
                request.session.user = email;
                request.session.password = password;
                request.session.key = "*\~/*" + email + "*\./*" + password + "*\|/*" + password.length + "*\%/*" + email.length + "*\}/*" + "tsiw_2017" + "*\ª/*"
                response.send("success");
                // return response.redirect('https://webitcloud.net/PW/1617/JAF/App/views/main.html');
            } else {
                response.send("fail");
            }
        } else {
            console.log('Error while performing Query.', err);
            global.request("https://wevents.herokuapp.com").pipe(response);
        }
    });
};