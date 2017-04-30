const express = require("express");
let app = module.exports = express();
let http = require('http').Server(app);

let io = require('socket.io').listen(3030);

module.exports = io;