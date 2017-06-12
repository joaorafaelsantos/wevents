mysql = require('mysql');
express = require('express');
bodyParser = require('body-parser');
http = require('http');
request = require('request');
cookieSession = require('cookie-session')
nodemailer = require('nodemailer');
router = global.express.Router();
MongoClient = require('mongodb').MongoClient;
assert = require('assert');
ObjectId = require('mongodb').ObjectID;
path = require('path');
app = express();
port = process.env.PORT || 3000;

// Load files
var routes = require("./controllers/routes.js");

// App
routes.init();


app.listen(global.port);