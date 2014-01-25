'use strict';

// User routes use users controller
var users = require('../controllers/users');

module.exports = function(app) {

  // Setting up the users api
  app.post('/users', users.create);

  // Setting the local strategy route
  app.post('/users/session', users.signin);

};
