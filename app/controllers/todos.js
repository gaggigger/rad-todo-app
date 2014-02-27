'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Todo = mongoose.model('Todo'),
  _ = require('lodash');


/**
 * Find todo by id
 */
exports.todo = function(req, res, next, id) {
  console.log(id);
  Todo.load(id, function(err, todo) {
    if (err) return next(err);
    if (!todo){
      console.log('failed to load todo');
      return next(new Error('Failed to load todo ' + id));
    }
    if (todo.user._id.toString() !== req.user._id.toString()) return res.send(401, { error: new Error('Unauthorized') });
    req.todo = todo;
    next();
  });
};

/**
 * Create a todo
 */
exports.create = function(req, res) {
  var todo = new Todo(req.body);
  todo.user = req.user._id;

  todo.save(function(err) {
    if (err) {
      res.jsonp({ error: err.message });
    } else {
      res.jsonp(todo);
    }
  });
};

/**
 * Update a todo
 */
exports.update = function(req, res) {
  var todo = req.todo;

  todo = _.extend(todo, req.body);

  todo.save(function(err) {
    if (err) {
      console.log(err);
      res.jsonp(500, { error: err.errors || err.message });
    } else {
      res.jsonp(todo);
    }
  });
};

/**
 * Delete an todo
 */
exports.destroy = function(req, res) {
  var todo = req.todo;

  todo.remove(function(err) {
    if (err) {
      res.jsonp(500, { error: err.message });
    } else {
      res.jsonp(todo);
    }
  });
};

/**
 * Show an todo
 */
exports.show = function(req, res) {
  res.jsonp(req.todo);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
  Todo.find({ user: req.user._id }).sort({priority: -1, created: -1}).populate('user', 'name email').exec(function(err, todos) {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      res.jsonp(todos);
    }
  });
};