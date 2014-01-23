'use strict';

angular.module('toptal_todo.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;
    
    $scope.isCollapsed = false;
}]);