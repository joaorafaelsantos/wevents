var connection = require("./connection.js");
var bodyParser = require("./bodyParser.js");
var cookieSession = require("./cookieSession.js");


var exports = module.exports = {};

bodyParser.bodyParser();
cookieSession.cookieSession();

exports.sendEmail = function (request, response) {
    connection.connection();

    var transporter = nodemailer.createTransport({
        host: 'cp26.webserver.pt',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'jaf@webitcloud.net',
            pass: 'PW2G501567'
        }
    });

    var recEmail = request.body.recEmail;

    var newPassword = "";
    var possibilities = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_/%-*";

    for (var i = 0; i < 15; i++) {
        newPassword += possibilities.charAt(Math.floor(Math.random() * possibilities.length));
    }

    var text = 'Your new password: ' + newPassword;

    var mailOptions = {
        from: 'jaf@webitcloud.net',
        to: recEmail,
        subject: 'worldevents - New Password',
        text: text
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            response.send("fail");
        } else {
            var sql = "UPDATE Utilizador SET password = '" + newPassword + "' WHERE email = '" + recEmail + "';";
            global.connection.query(sql, function (err, result) {
                if (err) {
                    response.send("fail");
                } else {
                    console.log(result.affectedRows + " record(s) updated");
                }
            });
            response.send("success");
        };
    });

};