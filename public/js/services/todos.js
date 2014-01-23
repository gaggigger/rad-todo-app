'use strict';

// Todos service used for todos REST endpoint
angular.module('toptal_todo.todos').factory('todos', ['$resource', function($resource) {
    return $resource('todos/:todoId', {
        articleId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);