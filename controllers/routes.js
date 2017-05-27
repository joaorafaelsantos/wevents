var loadEvents = require("../models/loadEvents.js");
var createEvent = require("../models/createEvent.js");

var exports = module.exports = {};

exports.init = function () {

    global.app.use(bodyParser.urlencoded({
        extended: true
    }));

    global.app.use(bodyParser.json());

    global.app.get('/', function (req, res) {
        global.request("https://webitcloud.net/PW/1617/JAF/App/views/index.html").pipe(res);
    });

    global.app.post('/', function (req, res) {
        loadEvents.loadEvents(res);
    });

    global.app.post('/createEvent', function (req, res) {
        createEvent.createEvent(req, res);
    });

    global.app.get('*', function (req, res) {
        global.request("https://webitcloud.net/PW/1617/JAF/App/views/pages/errors/404.html").pipe(res);
    });
};