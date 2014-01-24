'use strict';

//Global service for global variables
angular.module('toptal_todo.system').factory('Auth', function($rootScope, $q, $window) {
  return {
    request: function(config) {
      config.headers = config.headers || {};
      if($window.sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
      }
      return config;
    },
    response: function(response) {
      if(response.status === 401) {
        // User not authenticated
        console.log('Not authenticated.');
      }
      return response || $q.when(response);
    }
  };
});
