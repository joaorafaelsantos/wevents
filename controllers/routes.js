var loadEvents = require("../models/loadEvents.js");
var createEvent = require("../models/createEvent.js");
var login = require("../models/login.js");
var createUser = require("../models/createUser.js");

var exports = module.exports = {};

exports.init = function () {

    global.app.use(global.cookieSession({
        name: 'session',
        keys: ['key1', 'key2'],
        // Cookie Options
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }))


    // load homepage

    global.app.get('/', function (req, res) {
        global.request("https://webitcloud.net/PW/1617/JAF/App/views/index.html").pipe(res);
        req.session.user = 'xpto';
    });

    // load portal
    global.app.get('/portal', function (req, res) {
        //global.request("https://webitcloud.net/PW/1617/JAF/App/views/main.html").pipe(res);
        // Update views
        res.send(req.session.user);
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