mysql = require('mysql');
express = require('express');
bodyParser = require('body-parser');
http = require('http');
request = require('request');
cookieSession = require('cookie-session')
app = express();
port = process.env.PORT || 3000;

global.app.use(cookieSession({
    name: 'session',
    keys: [ /* secret keys */ ],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

// load files
var routes = require("./controllers/routes.js");

// app
routes.init();


app.listen(global.port);