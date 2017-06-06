var login = require("../models/login/login.js");
var events = require("../models/events/events.js");
var access = require("../models/access/access.js");

var exports = module.exports = {};

exports.init = function () {

    // Load homepage
    global.app.get('/', function (req, res) {
        global.request("https://webitcloud.net/PW/1617/JAF/App/views/index.html").pipe(res);
    });

    // Load portal
    global.app.get('/portal', function (req, res) {
        access.redirectPortal(req, res);
    });

    /* Login */

    // Check login
    global.app.post('/login/checkLogin', function (req, res) {
        login.checkLogin(req, res);
    });

    // Get user
    global.app.post('/login/getUser', function (req, res) {
        login.getUser(req, res);
    });

    // Facebook

    global.app.post('/login/facebook', function (req, res) {
        login.checkLoginFacebook(req, res);
    });

    // Google

    global.app.post('/login/google', function (req, res) {
        login.checkLoginGoogle(req, res);
    });

    // Logout

    global.app.post('/login/logout', function (req, res) {
        login.logout(req, res);
    });

    // Create user ***
    global.app.post('/login/createUser', function (req, res) {
        login.createUser(req, res);
    });

    /* Events */

    // Get Events (only public events)
    global.app.post('/events/getEvents', function (req, res) {
        events.loadEvents(res);
    });

    // Get User Events
    global.app.post('/events/getUserEvents', function (req, res) {
        events.loadUserEvents(res);
    });

    // Create event
    global.app.post('/events/createEvent', function (req, res) {
        events.createEvent(req, res);
    });

    // 404 error handler
    global.app.get('*', function (req, res) {
        global.request("https://webitcloud.net/PW/1617/JAF/App/views/pages/errors/404.html").pipe(res);
    });
};