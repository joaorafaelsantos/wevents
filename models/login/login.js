var connection = require("../configurations/connection.js");
var bodyParser = require("../configurations/bodyParser.js");
var cookieSession = require("../configurations/cookieSession.js");

var exports = module.exports = {};

bodyParser.bodyParser();
cookieSession.cookieSession();

// Create user

exports.createUser = function (request, response) {
    connection.connection();

    var email = global.connection.escape(request.body.email);
    var password = global.connection.escape(request.body.password);

    var query = "INSERT INTO Utilizador (password, email, id_tipo_utilizador) VALUES (" + password + "," + email + ", 2);"

    global.connection.query(query, function (err, rows, fields) {
        if (!err) {
            console.log('Inserted');
            // global.request("https://wevents.herokuapp.com").pipe(response);
        } else {
            console.log('Error while performing Query.', err);
            global.request("https://wevents.herokuapp.com").pipe(response);
        }
    });
};

// Check normal login

exports.checkLogin = function (request, response) {
    connection.connection();

    var email = global.connection.escape(request.body.email);
    var password = global.connection.escape(request.body.password);

    var query = "SELECT EXISTS(SELECT email, password FROM Utilizador WHERE email = " + email + " AND password = " + password + ") as value;";

    global.connection.query(query, function (err, rows, fields) {
        if (!err) {
            if (rows[0].value != 0) {
                request.session.user = email;
                request.session.password = password;
                request.session.key = "*\~/*" + email + "*\./*" + password + "*\|/*" + password.length + "*\%/*" + email.length + "*\}/*" + "tsiw_2017" + "*\ª/*";
                request.session.type = "normal";
                response.send("success");
            } else {
                response.send("!auth");
            }
        } else {
            console.log('Error while performing Query.', err);
            global.request("https://wevents.herokuapp.com").pipe(response);
        }
    });
};

// Check facebook login

exports.checkLoginFacebook = function (request, response) {
    if (request.body.name != undefined && request.body.id != undefined) {
        var name = request.body.name;
        var id = request.body.id;
        request.session.user = name;
        request.session.password = id;
        request.session.key = "*\~/*" + name + "*\./*" + id + "*\|/*" + id.length + "*\%/*" + name.length + "*\}/*" + "tsiw_2017" + "*\ª/*";
        request.session.type = "facebook";
        response.send("success");
    } else {
        response.send("!auth");
    }
};

// Check facebook login

exports.checkLoginGoogle = function (request, response) {
    if (request.body.name != undefined && request.body.id != undefined) {
        console.log(request.body.name)
        var name = request.body.name;
        var id = request.body.id;
        request.session.user = name;
        request.session.password = id;
        request.session.key = "*\~/*" + name + "*\./*" + id + "*\|/*" + id.length + "*\%/*" + name.length + "*\}/*" + "tsiw_2017" + "*\ª/*";
        request.session.type = "google";
        response.send("success");
    } else {
        response.send("!auth");
    }
};

// Get user

exports.getUser = function (request, response) {
    var user = request.session.user;
    if (user != undefined) {
        response.send(user);
    } else {
        response.send("!auth");
    }
};

// Logout

exports.logout = function (request, response) {
    request.session = null;
    response.send("logout");
};