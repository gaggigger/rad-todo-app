'use strict';

//Global service for global variables
angular.module('toptal_todo.system').factory('Global', [ '$window',
  function($window) {
    var data = {
      authenticated: $window.sessionStorage.token !== undefined,
      name: $window.sessionStorage.name || ''
    };

    return {
      isAuthenticated: function() {
        return data.authenticated;
      },

      getCurrentUserData: function() {
        return data;
      },

      refreshCurrentUserData: function() {
        data = {
          authenticated: $window.sessionStorage.token !== undefined,
          name: $window.sessionStorage.name || ''
        };
      },
    };
  }
]);
