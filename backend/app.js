var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const fileUpload = require("express-fileupload");
require("./database/db");

var indexRouter = require('./routes/index');

var app = express();

app.use(cors());
app.use(fileUpload());
app.set('trust proxy', true)
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({limit: '50mb'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/public", express.static(__dirname + "/public"));

app.use('/', indexRouter);

module.exports = app;
