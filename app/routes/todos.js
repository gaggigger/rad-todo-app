'use strict';

// Todo routes use todos controller
var todos = require('../controllers/todos');

module.exports = function(app) {

  app.get('/todos', todos.all);
  app.post('/todos', todos.create);
  app.get('/todos/:todoId', todos.show);
  app.put('/todos/:todoId', todos.update);
  app.del('/todos/:todoId', todos.destroy);

  // Finish with setting up the todoId param
  app.param('todoId', todos.todo);

};