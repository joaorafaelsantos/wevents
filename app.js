mysql = require('mysql');
express = require('express');
bodyParser = require('body-parser');
http = require('http');
request = require('request');
cookieSession = require('cookie-session')
app = express();
port = process.env.PORT || 3000;

// load files
var routes = require("./controllers/routes.js");

// app
routes.init();


app.listen(global.port);