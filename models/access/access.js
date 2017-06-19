var cookieSession = require("../configurations/cookieSession.js");

var exports = module.exports = {};

cookieSession.cookieSession();

// Redirect to portal page

exports.redirectPortal = function (request, response) {
    if (request.session.name != undefined && request.session.password != undefined) {
        var key = "*\~/*" + request.session.name + "*\./*" + request.session.password + "*\|/*" + request.session.password.length + "*\%/*" + request.session.name.length + "*\}/*" + "tsiw_2017" + "*\ª/*";
        if (request.session.key == key) {
            global.request("https://webitcloud.net/PW/1617/JAF/App/views/main.html").pipe(response);
        } else {
            global.request("https://webitcloud.net/PW/1617/JAF/App/views/pages/errors/403.html").pipe(response);
        }

    } else {
        global.request("https://webitcloud.net/PW/1617/JAF/App/views/pages/errors/404.html").pipe(response);
    }
}