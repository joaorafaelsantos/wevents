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
    var name = global.connection.escape(request.body.name);
    var url = global.connection.escape(request.body.url);

    var query = "INSERT INTO Utilizador (password, email, id_tipo_utilizador, nome, img_url) VALUES (" + password + "," + email + ", 2," + name + ", " + url + ");"

    global.connection.query(query, function (err, rows, fields) {
        if (!err) {
            response.send("success");
        } else {
            response.send("fail");
        }
    });
};

// Check normal login

exports.checkLogin = function (request, response) {
    connection.connection();

    var email = global.connection.escape(request.body.email);
    var password = global.connection.escape(request.body.password);

    var query = "SELECT EXISTS(SELECT email, password FROM Utilizador WHERE email = " + email + " AND password = " + password + ") as value, id_utilizador, nome FROM Utilizador WHERE email =" + email + ";";

    global.connection.query(query, function (err, rows, fields) {
        if (!err) {
            if (rows[0].value != 0) {
                request.session.name = rows[0].nome;
                request.session.email = request.body.email;
                request.session.password = password;
                request.session.key = "*\~/*" + email + "*\./*" + password + "*\|/*" + password.length + "*\%/*" + email.length + "*\}/*" + "tsiw_2017" + "*\ª/*";
                request.session.type = "normal";
                request.session.id = rows[0].id_utilizador;
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
        var email = request.body.email;
        var id = request.body.id;
        request.session.name = name;
        request.session.email = email;
        request.session.password = id;
        request.session.key = "*\~/*" + name + "*\./*" + id + "*\|/*" + id.length + "*\%/*" + name.length + "*\}/*" + "tsiw_2017" + "*\ª/*";
        request.session.type = "facebook";
        request.session.id = id;
        request.session.img = "https://graph.facebook.com/" + id + "/picture?type=large";
        response.send("success");
    } else {
        response.send("!auth");
    }
};

// Check facebook login

exports.checkLoginGoogle = function (request, response) {
    if (request.body.name != undefined && request.body.id != undefined) {
        var name = request.body.name;
        var id = request.body.id;
        var img = request.body.img;
        var email = request.body.email;
        request.session.name = name;
        request.session.password = id;
        request.session.key = "*\~/*" + name + "*\./*" + id + "*\|/*" + id.length + "*\%/*" + name.length + "*\}/*" + "tsiw_2017" + "*\ª/*";
        request.session.type = "google";
        request.session.id = id;
        request.session.img = img;
        request.session.email = email;
        response.send("success");
    } else {
        response.send("!auth");
    }
};

// Get user

exports.getUser = function (request, response) {
    var name = request.session.name;
    var id = request.session.id;
    var type = request.session.type;
    var img = request.session.img;
    var email = request.session.email;
    var data = {
        name: name,
        id: id,
        type: type,
        img: img,
        email: email
    }

    if (name != undefined) {

        if (type == "normal") {
            connection.connection();
            var query = "SELECT nome, img_url from Utilizador WHERE id_utilizador =" + id + ";"
            global.connection.query(query, function (err, rows, fields) {
                if (!err) {
                    data.name = rows[0].nome;
                    data.img = rows[0].img_url;
                    request.session.img = rows[0].img_url;
                    response.send(data);
                } else {
                    console.log('Error while performing Query.', err);
                    response.send("fail");
                }
            });
        } else {
            response.send(data);
        }
    } else {
        response.send("!auth");
    }
};

exports.getTypeLogin = function (request, response) {
    var type = request.session.type;
    if (type != undefined) {
        response.send(type);
    } else {
        response.send("!auth");
    }
};

// Logout

exports.logout = function (request, response) {
    request.session = null;
    response.send("logout");
};