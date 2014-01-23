'use strict';

// Todo routes use todos controller
var todos = require('../controllers/todos');
var authorization = require('./middlewares/authorization');

// Todo authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.todo.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/todos', todos.all);
    app.post('/todos', authorization.requiresLogin, todos.create);
    app.get('/todos/:todoId', todos.show);
    app.put('/todos/:todoId', authorization.requiresLogin, hasAuthorization, todos.update);
    app.del('/todos/:todoId', authorization.requiresLogin, hasAuthorization, todos.destroy);

    // Finish with setting up the todoId param
    app.param('todoId', todos.todo);

};