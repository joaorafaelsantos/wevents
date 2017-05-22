var module = require('module');

var loadEvents = require("../models/loadEvents.js");

var exports = module.exports = {};

exports.routes = function () {

    app.get('/home', function (req, res) {
        request("https://webitcloud.net/PW/1617/JAF/App/views/index.html").pipe(res);
    });

    app.post('/loadEvents', function (req, res) {
        loadEvents.loadEvents();
    });

};