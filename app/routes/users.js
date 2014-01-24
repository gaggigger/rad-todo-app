'use strict';

// User routes use users controller
var users = require('../controllers/users');
var jwt = require('jsonwebtoken');

module.exports = function(app, passport) {

  app.get('/signin', users.signin);
  app.get('/signup', users.signup);
  app.get('/signout', users.signout);
  app.get('/users/me', users.me);

  // Setting up the users api
  app.post('/users', users.create);

  // Setting up the userId param
  app.param('userId', users.user);

  // Setting the local strategy route
  app.post('/users/session', function(req, res, next) {
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
  });

};
