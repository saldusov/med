const path = require('path');
const socketioJwt = require('socketio-jwt');
let io = require(path.resolve('api/global')).io;
const cfg = require(path.resolve('api/global')).config;
const userDBFunc = require(path.resolve('api/v1/users/lib/indexFunctions'));

var nsp = io.of('/payments').use(socketioJwt.authorize({
  secret: cfg.jwtSecret,
  handshake: true
}));

nsp.on('connection', function (socket) {
  userDBFunc
  	.getUserByIdWithSpecialistInfo(socket.decoded_token.id)
  	.then((user) => {
  		if(user.group == 'user-spec') {
  			socket.join(user.specialist._id);
  		} else {
  			socket.join('all');
  		}
  	})
  	.catch((err) => socket.emit('disconnect'));

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

module.exports = nsp;