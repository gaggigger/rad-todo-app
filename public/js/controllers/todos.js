'use strict';

angular.module('toptal_todo.todos').controller('TodosController', ['$scope', '$routeParams', '$location', 'Global', 'Todos', function ($scope, $routeParams, $location, Global, Todos) {
    $scope.global = Global;

    $scope.create = function() {
        var todo = new Todos({
            task: this.task
        });
        todo.$save(function(response) {
            $location.path('todos/' + response._id);
        });

        this.task = '';
    };

    $scope.remove = function(todo) {
        if (todo) {
            todo.$remove();

            for (var i in $scope.todos) {
                if ($scope.todos[i] === todo) {
                    $scope.todos.splice(i, 1);
                }
            }
        }
        else {
            $scope.todo.$remove();
            $location.path('todos');
        }
    };

    $scope.update = function() {
        var todo = $scope.todo;
        if (!todo.updated) {
            todo.updated = [];
        }
        todo.updated.push(new Date().getTime());

        todo.$update(function() {
            $location.path('todos/' + todo._id);
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
}]);