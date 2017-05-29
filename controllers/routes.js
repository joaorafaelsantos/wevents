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
    global.app.post('/portal', function (req, res) {
        // global.request("https://webitcloud.net/PW/1617/JAF/App/views/main.html").pipe(res);

        var content = "    <link rel='stylesheet' href='https://webitcloud.net/PW/1617/JAF/App/views/assets/common/css/main/createEvent.css'></head><body><nav class='navbar navbar-we navbar-fixed-top'><div class='container-fluid'><div class='navbar-header'><button id='btnToggle' class='navbar-toggle collapsed pull-left' type='button' data-toggle='collapse'><span class='sr-only'>Toggle navigation</span><span class='icon-bar top-bar'></span><span class='icon-bar middle-bar'></span><span class='icon-bar bottom-bar'></span></button><div class='navbar-brand navbar-right'><a class='' href='#'><img class='' alt='Brand' src='https://webitcloud.net/PW/1617/JAF/App/views/assets/common/img/logo/logo.svg'></a></div></div></nav></body>"
        res.send(content);
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