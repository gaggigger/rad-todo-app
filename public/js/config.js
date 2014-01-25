'use strict';

//Setting up route
angular.module('toptal_todo').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/signup', {
        templateUrl: 'views/users/create.html'
      })
      .when('/signin', {
        templateUrl: 'views/sessions/create.html'
      })
      .when('/', {
        templateUrl: 'views/index.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
]);

//Setting HTML5 Location Mode
angular.module('toptal_todo').config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);

//Setting Auth interceptor
angular.module('toptal_todo').config(function($httpProvider) {
  $httpProvider.interceptors.push('Auth');
});