var loadEvents = require("../models/loadEvents.js");
var createEvent = require("../models/createEvent.js");
var login = require("../models/login.js");
var createUser = require("../models/createUser.js");

var exports = module.exports = {};

exports.init = function () {

    // load homepage

    global.app.get('/', function (req, res) {
        global.request("https://webitcloud.net/PW/1617/JAF/App/views/index.html").pipe(res);
    });

    // load portal
    global.app.get('/portal', function (req, res) {
        console.log(req.session.password);
        // if (req.session.user != undefined && req.session.password != undefined) {
        //     global.request("https://webitcloud.net/PW/1617/JAF/App/views/main.html").pipe(res);
        // } else {
        //     global.request("https://webitcloud.net/PW/1617/JAF/App/views/pages/errors/403.html").pipe(res);
        // }
    });

    // check permission
    global.app.post('/checkPermission', function (req, res) {
        console.log(req.body);
    });

    // api
    global.app.post('/api', function (req, res) {
        loadEvents.loadEvents(res);
    });

    // check login ***
    global.app.post('/', function (req, res) {
        login.login(req, res);
    });

    // create user ***
    global.app.post('/createUser', function (req, res) {
        createUser.createUser();
    });

    // create event *** 
    global.app.post('/createEvent', function (req, res) {
        createEvent.createEvent(req, res);
    });

    // 404 error handler
    global.app.get('*', function (req, res) {
        global.request("https://webitcloud.net/PW/1617/JAF/App/views/pages/errors/404.html").pipe(res);
    });
};