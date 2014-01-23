'use strict';

angular.module('toptal_todo.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        'title': 'Todos',
        'link': 'todos'
    }, {
        'title': 'Create New Todo',
        'link': 'todos/create'
    }];
    
    $scope.isCollapsed = false;
}]);