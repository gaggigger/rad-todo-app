'use strict';

angular.module('toptal_todo.todos').controller('TodosController', ['$scope', '$routeParams', '$location', 'Global', 'Todos', function ($scope, $routeParams, $location, Global, Todos) {
  $scope.global = Global;

  $scope.userData = Global.getCurrentUserData();
  $scope.$watch('global.getCurrentUserData()', function(newData) {
    $scope.userData = newData;
  });
  
  $scope.create = function() {
    var todo = new Todos({
      task: this.task
    });
    todo.$save(function(response) {
      if(response) {
        $scope.todos.push(todo);
      }
    });

    this.task = '';
  };

  $scope.destroy = function(todo) {
    if (todo) {
      todo.$remove(function(todo) {
        for (var i in $scope.todos) {
          if ($scope.todos[i] === todo) {
            $scope.todos.splice(i, 1);
          }
        }
        $scope.notfounderror = undefined;
      }, function(response) {
        if(response.data.error.indexOf('Failed to load') !== -1) {
          for (var i in $scope.todos) {
            if ($scope.todos[i] === todo) {
              $scope.todos.splice(i, 1);
            }
          }
          $scope.notfounderror = undefined;
        } else {
          console.log('To-do failed to be deleted.');
          $scope.notfounderror = 'To-do failed to be deleted.';
        }
      });
    }
    else {
      $scope.todo.$remove();
      $location.path('todos');
    }
  };

  $scope.update = function() {
    var todo = $scope.todo || this.todo;
    if (!todo.updated) {
      todo.updated = [];
    }
    todo.updated.push(new Date().getTime());

    todo.$update(function() {
      // $location.path('todos/' + todo._id);
    });
  };

  $scope.find = function() {
    Todos.query(function(todos) {
      $scope.todos = todos;
    });
  };

  $scope.findOne = function() {
    Todos.get({
      todoId: $routeParams.todoId
    }, function(todo) {
      $scope.todo = todo;
    });
  };

  $scope.sortFlag = 'due';

  $scope.sortByDue = function() {
    $scope.sortFlag = 'due';
  };

  $scope.sortByPriority = function() {
    $scope.sortFlag = 'priority';
  };

  $scope.isActive = function(flag) {
    return $scope.sortFlag === flag;
  };

}]);