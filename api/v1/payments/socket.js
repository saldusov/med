const io = require('../../sockets');
var nsp = io.of('/payments');

nsp.on('connection', function (socket) {
  console.log('user connected');
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  
  socket.on('reserve-payment', (message) => {
    nsp.emit('reserve', {type:'new-payment', text: 'new'});    
  });
});

module.exports = nsp;