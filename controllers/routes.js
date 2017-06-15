var login = require("../models/login/login.js");
var events = require("../models/events/events.js");
var access = require("../models/access/access.js");
var mongo = require("../models/configurations/mongo.js");
var nodemailer = require("../models/configurations/nodemailer.js");
var configurations = require("../models/configurations/configurations.js")

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

    // Get user
    global.app.post('/login/getTypeLogin', function (req, res) {
        login.getTypeLogin(req, res);
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

    // Get events (only public events)
    global.app.post('/events/getEvents', function (req, res) {
        events.loadEvents(res);
    });

    // Get user events
    global.app.post('/events/getUserEvents', function (req, res) {
        events.loadUserEvents(req, res);
    });

    // Create event
    global.app.post('/events/createEvent', function (req, res) {
        events.createEvent(req, res);
    });

    // Get user subscribed events
    global.app.post('/events/getUserSubscribedEvents', function (req, res) {
        events.loadUserSubscribedEvents(req, res);
    });

    // Get subscribe events available
    global.app.post('/events/getSubscribeEvent', function (req, res) {
        events.loadSubscribeEvent(req, res);
    });

    // // Dashboard get message //*TO DO*//
    // global.app.post('/dashboard/getMessage', function (req, res) {
    //     mongo.readMessages(res);
    // });

    // User send message (index)
    global.app.post('/user/sendMessage', function (req, res) {
        mongo.saveMessages(req, res);
    });

    // Send messages on password recovery
    global.app.post('/login/recoverPassword', function (req, res) {
        nodemailer.sendEmail(req, res);
    });

    // Change password
    global.app.post('/configurations/changePassword', function (req, res) {
        configurations.changePassword(req, res);
    });

    // Change image
    global.app.post('/configurations/changeImage', function (req, res) {
        configurations.changeImage(req, res);
    });

    // 404 error handler
    global.app.get('*', function (req, res) {
        global.request("https://webitcloud.net/PW/1617/JAF/App/views/pages/errors/404.html").pipe(res);
    });
};