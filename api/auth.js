const express = require("express");
let app = module.exports = express();
const passport = require('passport'); 
const LocalStrategy = require('passport-local'); //локальная стратегия авторизации
const JwtStrategy = require('passport-jwt').Strategy; // авторизация через JWT
const ExtractJwt = require('passport-jwt').ExtractJwt; // авторизация через JWT
const socketioJwt = require('socketio-jwt'); // аутентификация по JWT для socket.io

const secretkey = "ht23Ydsj01`1-2^&#DJK1NDNSdha321";

const UserSchema = require("./v1/users/User.schema");

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    session: false
  },
  function (username, password, done) {
    UserSchema.findOne({username}, (err, user) => {
      if (err) {
        return done(err);
      }

      if (!user || !user.checkPassword(password)) {
        return done(null, false, {message: 'Нет такого пользователя или пароль неверен.'});
      }

      return done(null, user);
    });
  }
  )
);

// Ждем JWT в Header

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: secretkey
};

passport.use(new JwtStrategy(jwtOptions, function (payload, done) {
    UserSchema.findById(payload.id, (err, user) => {
      if (err) {
        return done(err)
      }
      if (user) {
        done(null, user)
      } else {
        done(null, false)
      }
    });
  })
);

passport.serializeUser(function(user, done) {
	console.log('serialize');
  done(null, user);
});

passport.deserializeUser(function(user, done) {
	console.log('deserialize');
  done(null, user);
});

app.use(passport.initialize());