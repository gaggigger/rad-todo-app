'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  passport = require('passport'),
  User = mongoose.model('User');

/**
 * Sign in User
 */
exports.signin = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if(err) {
      console.log(info);
      return next(err);
    }
    if(!user) {
      console.log(info);
      return res.json(401, { error: 'Invalid email or password' });
    }
    var token = jwt.sign({ email: user.email, _id: user._id }, 'toptal-todo-app-secret', { expiresInMinutes: 60*24 });
    res.json({ token: token, name: user.name });
  })(req, res, next);
};

/**
 * Create user
 */
exports.create = function(req, res, next) {
  var user = new User(req.body);
  var message = '';
  
  user.save(function(err) {
    if (err) {
      var code = 500;
      console.log('Err: ' + err);
      if(err.errors) {
        var key = (err.errors.email !== undefined) ? 'email' : (err.errors.password !== undefined) ? 'password' : (err.errors.name !== undefined) ? 'name' : undefined;
        message = (key) ? err.errors[key].message : '';
      } else if(err && err.code && (err.code === 11000 || err.code === 11001)) {
        message = 'Email is already in use';
        code = 401;
      }
      return res.send(code, { error: message });
    }
    req.logIn(user, function(err) {
      if (err) return next(err);
      var token = jwt.sign({ email: user.email, _id: user._id }, 'toptal-todo-app-secret', { expiresInMinutes: 60*24 });
      return res.json({ token: token, name: user.name });
    });
  });
};
