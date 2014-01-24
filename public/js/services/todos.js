'use strict';

//Todos service used for todos REST endpoint
angular.module('toptal_todo.todos').factory('Todos', ['$resource', function($resource) {
  return $resource('todos/:todoId', {
    todoId: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });
}]);