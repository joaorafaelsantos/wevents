var loadEvents = require("../models/greetings.js");

var exports = module.exports = {};

exports.routes = function () {

    app.get('/home', function (req, res) {
        request("https://webitcloud.net/PW/1617/JAF/App/views/index.html").pipe(res);
    });

    app.post('/loadEvents', function (req, res) {
        loadEvents.loadEvents();
    });

};