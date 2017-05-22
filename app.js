var mysql = require('mysql');
var express = require('express');
var http = require('http');
var request = require('request');
var app = express();
var port = process.env.PORT || 3000;

// files
var routes = require("controllers/routes.js");

// load

routes.routes();


app.listen(port);