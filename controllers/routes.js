// var loadEvents = require("../models/loadEvents.js");

var exports = module.exports = {};

exports.routes = function () {

    global.app.get('/home', function (req, res) {
        console.log("entrei")
        request("https://webitcloud.net/PW/1617/JAF/App/views/index.html").pipe(res);
    });

    // app.post('/loadEvents', function (req, res) {
    //     loadEvents.loadEvents();
    // });

};