var loadEvents = require("../models/loadEvents.js");
var createEvent = require("../models/createEvent.js");
var login = require("../models/login.js");
var createUser = require("../models/createUser.js");

var exports = module.exports = {};

exports.init = function () {

    // Load homepage
    global.app.get('/', function (req, res) {
        global.request("https://webitcloud.net/PW/1617/JAF/App/views/index.html").pipe(res);
    });

    // Load portal
    global.app.get('/portal', function (req, res) {
        if (req.session.user != undefined && req.session.password != undefined) {
            var key = "*\~/*" + req.session.user + "*\./*" + req.session.password + "*\|/*" + req.session.password.length + "*\%/*" + req.session.user.length + "*\}/*" + "tsiw_2017" + "*\ª/*";
            if (req.session.key == key) {
                global.request("https://webitcloud.net/PW/1617/JAF/App/views/main.html").pipe(res);
            } else {
                global.request("https://webitcloud.net/PW/1617/JAF/App/views/pages/errors/403.html").pipe(res);
            }

        } else {
            global.request("https://webitcloud.net/PW/1617/JAF/App/views/pages/errors/403.html").pipe(res);
        }
    });

    /* Login */

    // Check login
    global.app.post('/login/checkLogin', function (req, res) {
        login.login(req, res);
    });

    // Get user
    global.app.post('/login/getUser', function (req, res) {
        var user = req.session.user;
        if (user != undefined) {
            res.send(user);
        } else {
            res.send("!auth");
        }

    });

    // Facebook

    global.app.post('/login/facebook', function (req, res) {
        console.log(req.name);
    });

    // Logout

    global.app.post('/login/logout', function (req, res) {
        req.session = null;
        res.send("logout");
    });

    // Create user ***
    global.app.post('/login/createUser', function (req, res) {
        createUser.createUser();
    });

    /* Events */

    // Get Events (only public events)
    global.app.post('/events/getEvents', function (req, res) {
        loadEvents.loadEvents(res);
    });

    // Create event
    global.app.post('/events/createEvent', function (req, res) {
        createEvent.createEvent(req, res);
    });

    // 404 error handler
    global.app.get('*', function (req, res) {
        global.request("https://webitcloud.net/PW/1617/JAF/App/views/pages/errors/404.html").pipe(res);
    });
};