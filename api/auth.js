const express = require("express");
let app = module.exports = express();
const passport = require('passport'); 
const LocalStrategy = require('passport-local'); //локальная стратегия авторизации
const JwtStrategy = require('passport-jwt').Strategy; // авторизация через JWT
const ExtractJwt = require('passport-jwt').ExtractJwt; // авторизация через JWT
const socketioJwt = require('socketio-jwt'); // аутентификация по JWT для socket.io
const cfg = require("./global").config;
const rulesManager = require("./v1/users/lib/rules-manager");

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: cfg.jwtSecret
};

const UserSchema = require("./v1/users/User.schema");

module.exports = function() {
  var jwtStrategy = new JwtStrategy(jwtOptions, function (payload, done) {
      UserSchema.findById(payload.id, (err, user) => {
        if (err) {
          return done(err)
        }
        if (user) {
          done(null, user)
        } else {
          done(null, false);
        }
      });
  });

  passport.use(jwtStrategy);

  return {
    initialize: function() {
      return passport.initialize();
    },
    
    authenticate: function() {
      return passport.authenticate("jwt", cfg.jwtSession);
    },

    checkAccess: function(rule) {
      return function(req, res, next) {
        passport.authenticate("jwt", cfg.jwtSession, function(err, user, info) {
          req.user = user || { group: "guest" }
          let allowed = rulesManager.get(req.user.group);

          if(allowed.indexOf(rule) >= 0 || rule == "tools") {
            next();
          } else {
            if(req.user.group == "guest") {
              res.status(401).send("Unauthorized");
            } else {
              res.status(403).send("Forbidden");
            }
          }
        })(req, res, next);
      }
    }
  }
};