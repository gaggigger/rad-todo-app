'use strict';

(function() {
  describe('Controller Spec', function() {
    describe('IndexController', function() {
      // Load the controllers module
      beforeEach(module('toptal_todo'));

      var scope, IndexController;

      beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();

        IndexController = $controller('IndexController', {
          $scope: scope
        });
      }));

      it('should expose some global scope', function() {

        expect(scope.global).toBeTruthy();

      });
    });
  });
})();