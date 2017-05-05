const path = require('path');
let io = require(path.resolve('api/global')).io;
var nsp = io.of('/payments');

nsp.on('connection', function (socket) {
  console.log('user connected');
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

module.exports = nsp;