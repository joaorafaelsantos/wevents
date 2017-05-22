mysql = require('mysql');
express = require('express');
http = require('http');
request = require('request');
app = express();
port = process.env.PORT || 3000;

// files
var routes = require("./controllers/routes.js");

// load
routes.routes();

app.listen(global.port);