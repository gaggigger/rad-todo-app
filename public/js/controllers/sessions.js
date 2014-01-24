'use strict';

angular.module('toptal_todo.system').controller('SessionsController', ['$scope', '$http', '$window', '$location', 'Global', function ($scope, $http, $window, $location, Global) {
    $scope.global = Global;
    $scope.user = { email: '', password: '' };

    $scope.signin = function() {
      $http
        .post('/users/session', $scope.user)
        .success(function(data, status, headers, config) {
          $window.sessionStorage.token = data.token;
          $window.sessionStorage.name = data.name;
          // Update var in angular service so views reflect the change
          Global.refreshCurrentUserData();
          $location.path('/');
        })
        .error(function(data, status, headers, config){
          delete $window.sessionStorage.token;
          // Update var in angular service so views reflect the change
          Global.refreshCurrentUserData();
        });
    };

    $scope.signout = function() {
      delete $window.sessionStorage.token;
      // Update var in angular service so views reflect the change
      Global.refreshCurrentUserData();
      $location.path('/');
    };

}]);