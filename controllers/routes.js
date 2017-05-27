var loadEvents = require("../models/loadEvents.js");
var createEvents = require("../models/createEvents.js");

var exports = module.exports = {};

exports.init = function () {

    global.app.use(global.bodyParser.urlencoded({
        extended: true
    }));

    global.app.get('/', function (req, res) {
        global.request("https://webitcloud.net/PW/1617/JAF/App/views/index.html").pipe(res);
    });

    global.app.post('/', function (req, res) {
        loadEvents.loadEvents(res);
    });

    global.app.post('/createEvents', function (req, res) {
        createEvents.createEvents(req, res);
    });

    global.app.get('*', function (req, res) {
        global.request("https://webitcloud.net/PW/1617/JAF/App/views/pages/errors/404.html").pipe(res);
    });
};