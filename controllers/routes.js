var loadEvents = require("../models/loadEvents.js");
var createEvent = require("../models/createEvent.js");
var login = require("../models/login.js");
var createUser = require("../models/createUser.js");

var exports = module.exports = {};

exports.init = function () {

    app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

    // load homepage
    global.app.get('/', function (req, res) {
        global.request("https://webitcloud.net/PW/1617/JAF/App/views/index.html").pipe(res);
    });

    // load portal
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