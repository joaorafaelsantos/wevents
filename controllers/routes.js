var loadEvents = require("../models/loadEvents.js");

var exports = module.exports = {};

exports.init = function () {
    global.app.get('/home', function (req, res) {
        global.request("https://webitcloud.net/PW/1617/JAF/App/views/index.html").pipe(res);
        console.log("entrei")
    });
    loadEvents.connection();
    global.app.post('/loadEvents', function (req, res) {
        loadEvents.loadEvents();
        console.log("entrei2")
    });
};