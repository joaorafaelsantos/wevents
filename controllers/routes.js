var loadEvents = require("../models/loadEvents.js");
var createEvent = require("../models/createEvent.js");
var login = require("../models/login.js");
var createUser = require("../models/createUser.js");

var exports = module.exports = {};

exports.init = function () {

    global.app.get('/', function (req, res) {
        global.request("https://webitcloud.net/PW/1617/JAF/App/views/index.html").pipe(res);
    });

    global.app.get('/portal', function (req, res) {
        global.request("https://webitcloud.net/PW/1617/JAF/App/views/main.html").pipe(res);
    });

    global.app.get('/login', function (req, res) {
        global.request("https://webitcloud.net/PW/1617/JAF/App/views/pages/login/login.html").pipe(res);
    });

    global.app.post('/', function (req, res) {
        loadEvents.loadEvents(res);
    });

    global.app.post('/login', function (req, res) {
        login.login();
    });

    global.app.post('/createUser', function (req, res) {
        createUser.createUser();
    });

    createEvent.bodyParser();
    global.app.post('/createEvent', function (req, res) {
        createEvent.createEvent(req, res);
    });

    global.app.get('*', function (req, res) {
        global.request("https://webitcloud.net/PW/1617/JAF/App/views/pages/errors/404.html").pipe(res);
    });
};