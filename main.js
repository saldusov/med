const express = require("express");
const app = express();
const http = require('http').Server(app);

var global = require('./api/global');
global.io = require('socket.io').listen(http);

const favicon = require('serve-favicon');
const bodyParser = require("body-parser");
const path = require('path');

var routing = require("./api/routing");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/medtest111');

// parse application/json
app.use(bodyParser.json());                        
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/src/dist'));
app.use(favicon(__dirname + '/src/favicon.ico'));

app.use(routing);

app.get("*", (req, res) => {
    res.sendfile(path.resolve('src/dist/index.html'));
});

app.use(function(err, req, res, next) {
 
  console.log(err.message);
  let [errCode, errMessage] = err.message.split("|");
  code = errCode ? errCode : 500;
  message = errMessage ? errMessage : "Please check your log file!";

  res.status(code).send({message});
});

http.listen(3000, () => {
  console.log("App run!");
});

module.exports = http;