'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Todo Schema
 */
var TodoSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  task: {
    type: String,
    default: '',
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  due: {
    type: Date,
    default: Date.now
  },
  priority: {
    type: Number,
    default: 0
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

/**
 * Validations
 */
TodoSchema.path('task').validate(function(task) {
  return task.length;
}, 'Task cannot be blank');

/**
 * Statics
 */
TodoSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name email').exec(cb);
};

mongoose.model('Todo', TodoSchema);
