var loadEvents = require("../models/loadEvents.js");

var exports = module.exports = {};

exports.routes = function () {

    global.app.get('/home', function (req, res) {
        global.request("https://webitcloud.net/PW/1617/JAF/App/views/index.html").pipe(res);
    });

    global.app.post('/loadEvents', function (req, res) {
        console.log("entrei")
        // loadEvents.loadEvents();
    });

};