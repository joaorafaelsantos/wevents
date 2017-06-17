var cookieSession = require("../configurations/cookieSession.js");

var exports = module.exports = {};

cookieSession.cookieSession();

// Redirect to portal page

exports.redirectPortal = function (request, response) {
    if (request.session.email != undefined && request.session.password != undefined) {
        console.log("entrei1")
        var key = "*\~/*" + request.session.email + "*\./*" + request.session.password + "*\|/*" + request.session.password.length + "*\%/*" + request.session.email.length + "*\}/*" + "tsiw_2017" + "*\ª/*";
        if (request.session.key == key) {
            global.request("https://webitcloud.net/PW/1617/JAF/App/views/main.html").pipe(response);
        } else {
            global.request("https://webitcloud.net/PW/1617/JAF/App/views/pages/errors/403.html").pipe(response);
        }

    } else {
        console.log("entrei2")
        global.request("https://webitcloud.net/PW/1617/JAF/App/views/pages/errors/403.html").pipe(response);
    }
}