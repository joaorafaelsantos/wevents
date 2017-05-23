var loadEvents = require("../models/loadEvents.js");

var exports = module.exports = {};

exports.init = function () {

    global.app.get('/', function (req, res) {
        global.request("https://webitcloud.net/PW/1617/JAF/App/views/index.html").pipe(res);
    });

    global.app.post('/', function (req, res) {
        loadEvents.loadEvents(res);
    });

    global.app.get('*', function (req, res) {
        global.request("https://webitcloud.net/PW/1617/JAF/App/views/pages/errors/404.html").pipe(res);
    });
};