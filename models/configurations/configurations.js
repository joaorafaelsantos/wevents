var connection = require("./connection.js");
var bodyParser = require("./bodyParser.js");
var cookieSession = require("./cookieSession.js");
var transporter = require("./transporter.js");

bodyParser.bodyParser();
cookieSession.cookieSession();

var exports = module.exports = {};

exports.changePassword = function (request, response) {

    connection.connection();

    var email = request.session.email;
    var sessionPassword = request.session.password;
    var oldPassword = global.connection.escape(request.body.oldPassword);
    var newPassword = global.connection.escape(request.body.newPassword);
    console.log(oldPassword, newPassword);
    if (oldPassword == sessionPassword) {
        var sql = "UPDATE Utilizador SET password = " + newPassword + " WHERE email = '" + email + "';";
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

exports.changeImage = function (request, response) {

    connection.connection();

    var email = request.session.email;

    var url = global.connection.escape(request.body.url);

    var sql = "UPDATE Utilizador SET img_url = " + url + " WHERE email = '" + email + "';";
    global.connection.query(sql, function (err, result) {
        if (!err) {
            console.log(result.affectedRows + " record(s) updated");
            response.send("success");
        } else {
            console.log('Error while performing Query.', err);
            response.send("fail");
        }
    });

};

exports.recoverEmail = function (request, response) {
    connection.connection();
    transporter.transporter();

    var recEmail = request.body.recEmail;

    var newPassword = "";
    var possibilities = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_/%-*";

    for (var i = 0; i < 15; i++) {
        newPassword += possibilities.charAt(Math.floor(Math.random() * possibilities.length));
    }

    var text = 'Your new password: ';

    var mailOptions = {
        from: 'jaf@webitcloud.net',
        to: recEmail,
        subject: 'worldevents - New Password',
        html: "<center><b>worldevents / The soul of your events</b><br><br><img src='https://webitcloud.net/PW/1617/JAF/App/views/assets/common/img/logo/logo144.png'</img><br><br>" + text + "<b>" + newPassword + "</b><br><br><br><br><a href='https://wevents.herokuapp.com'>Visit us</a></center>"
    };

    global.transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            response.send("fail");
        } else {
            var sql = "UPDATE Utilizador SET password = '" + newPassword + "' WHERE email = '" + recEmail + "';";
            global.connection.query(sql, function (err, result) {
                if (err) {
                    response.send("fail");
                } else {
                    response.send("success");
                }
            });

        };
    });
};