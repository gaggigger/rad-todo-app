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
    default: Date.now,
    set: function(val) {
      if(val === '') return null;
      var d = new Date(val);
      console.log("DDD");
      console.log(d);
      return (d != 'Invalid Date') ? val : undefined;
    },
    validate: [
      {
        validator: function(val) {
          console.log(val);
          if(!val) return false;

          var r = new Date(val);
          console.log("RRRR:");
          console.log(r);
          return r != 'Invalid Date';
        },
        msg: 'Due must be a valid date.'
      }
    ]
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

// TodoSchema.path('due').validate(function(due) {
//   if(!due.length) return true;

//   var r = new Date(due);
//   return r != 'Invalid Date';
// }, 'Due is an invalid date');

TodoSchema.path('priority').validate(function(priority) {
  var num = parseFloat(priority);
  return !isNaN(num) && num >= 0;
}, 'Priority must be greater than or equal to zero.');

/**
 * Statics
 */
TodoSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name email').exec(cb);
};

mongoose.model('Todo', TodoSchema);
