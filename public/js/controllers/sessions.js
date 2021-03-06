'use strict';

angular.module('toptal_todo.system').controller('SessionsController', ['$scope', '$http', '$window', '$location', 'Global', function ($scope, $http, $window, $location, Global) {
  $scope.global = Global;
  $scope.user = { email: '', password: '' };
  $scope.errors = {};

  $scope.signin = function() {
    $http
      .post('/users/session', $scope.user)
      .success(function(data) {
        $window.sessionStorage.token = data.token;
        $window.sessionStorage.name = data.name;
        // Update var in angular service so views reflect the change
        Global.refreshCurrentUserData();
        $location.path('/');
      })
      .error(function(data){
        delete $window.sessionStorage.token;
        // Update var in angular service so views reflect the change
        Global.refreshCurrentUserData();
        $scope.errors = {};
        if(data.error) {
          $scope.errors.email = data.error;
        }
      });
  };

  $scope.signout = function() {
    delete $window.sessionStorage.token;
    // Update var in angular service so views reflect the change
    Global.refreshCurrentUserData();
    $location.path('/');
  };

}]);