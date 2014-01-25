'use strict';

angular.module('toptal_todo')
/**
 * Removes server error when user updates input
 */
  .directive('mongooseError', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        scope.$watch('errors', function(errors) {
          if(errors.email !== undefined) {
            ngModel.$setValidity('mongoose', false);
          } else {
            ngModel.$setValidity('mongoose', true);
          }
        });
        element.on('keydown', function() {
          return ngModel.$setValidity('mongoose', true);
        });
      }
    };
  });