'use strict';

angular.module('toptal_todo.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.userData = Global.getCurrentUserData();
    $scope.$watch('global.getCurrentUserData()', function(newData) {
      $scope.userData = newData;
    });

    $scope.isCollapsed = false;
}]);