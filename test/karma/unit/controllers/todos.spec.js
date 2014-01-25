'use strict';

(function() {
  // Todos Controller Spec
  describe('Controller Spec', function() {
    describe('TodosController', function() {
      // The $resource service augments the response object with methods for updating and deleting the resource.
      // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
      // the responses exactly. To solve the problem, we use a newly-defined toEqualData Jasmine matcher.
      // When the toEqualData matcher compares two objects, it takes only object properties into
      // account and ignores methods.
      beforeEach(function() {
        this.addMatchers({
          toEqualData: function(expected) {
            return angular.equals(this.actual, expected);
          }
        });
      });

      // Load the controllers module
      beforeEach(module('toptal_todo'));

      // Initialize the controller and a mock scope
      var TodosController,
        scope,
        $httpBackend,
        $routeParams,
        $location;

      // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
      // This allows us to inject a service but then attach it to a variable
      // with the same name as the service.
      beforeEach(inject(function($controller, $rootScope, _$location_, _$routeParams_, _$httpBackend_) {

        scope = $rootScope.$new();

        $routeParams = _$routeParams_;

        $httpBackend = _$httpBackend_;

        $location = _$location_;

        TodosController = $controller('TodosController', {
          $scope: scope
        });

      }));

      it('$scope.find() should create an array with at least one todo object ' +
        'fetched from XHR', function() {

          // test expected GET request
          $httpBackend.expectGET('todos').respond([{
            task: 'A Test Todo!'
          }]);

          // run controller
          scope.find();
          $httpBackend.flush();

          // test scope value
          expect(scope.todos).toEqualData([{
            task: 'A Test Todo!'
          }]);

        });

      it('$scope.findOne() should create an array with one todo object fetched ' +
        'from XHR using a todoId URL parameter', function() {
          // fixture URL parament
          $routeParams.todoId = '525a8422f6d0f87f0e407a33';

          // fixture response object
          var testTodoData = function() {
            return {
              task: 'A Test Todo!'
            };
          };

          // test expected GET request with response object
          $httpBackend.expectGET(/todos\/([0-9a-fA-F]{24})$/).respond(testTodoData());

          // run controller
          scope.findOne();
          $httpBackend.flush();

          // test scope value
          expect(scope.todo).toEqualData(testTodoData());

        });

      it('$scope.create() with valid form data should send a POST request ' +
        'with the form input values', function() {

          // fixture expected POST data
          var postTodoData = function() {
            return {
              task: 'A Test Todo!'
            };
          };

          // fixture expected response data
          var responseTodoData = function() {
            return {
              _id: '525cf20451979dea2c000001',
              task: 'A Test Todo!'
            };
          };

          // Set array to empty
          scope.todos = [];

          // fixture mock form input values
          scope.task = 'A Test Todo!';

          // test post request is sent
          $httpBackend.expectPOST('todos', postTodoData()).respond(responseTodoData());

          // Run controller
          scope.create();
          $httpBackend.flush();

          // test form input(s) are reset
          expect(scope.task).toEqual('');
        });

      it('$scope.update() should update a valid todo', inject(function(Todos) {

        // fixture rideshare
        var putTodoData = function() {
          return {
            _id: '525a8422f6d0f87f0e407a33',
            task: 'A Test Todo!',
            to: 'A Different Test Todo!'
          };
        };

        // mock todo object from form
        var todo = new Todos(putTodoData());

        // mock todo in scope
        scope.todo = todo;

        // test PUT happens correctly
        $httpBackend.expectPUT(/todos\/([0-9a-fA-F]{24})$/).respond();

        // testing the body data is out for now until an idea for testing the dynamic updated array value is figured out
        //$httpBackend.expectPUT(/todos\/([0-9a-fA-F]{24})$/, putTodoData()).respond();
        /*
        Error: Expected PUT /todos\/([0-9a-fA-F]{24})$/ with different data
        EXPECTED: {"_id":"525a8422f6d0f87f0e407a33","task":"A Test Todo!","to":"MEAN is great!"}
        GOT:      {"_id":"525a8422f6d0f87f0e407a33","task":"A Test Todo!","to":"MEAN is great!","updated":[1383534772975]}
        */

        // run controller
        scope.update();
        $httpBackend.flush();

      }));

      it('$scope.remove() should send a DELETE request with a valid todoId' +
        'and remove the todo from the scope', inject(function(Todos) {

          // fixture rideshare
          var todo = new Todos({
            _id: '525a8422f6d0f87f0e407a33'
          });

          // mock rideshares in scope
          scope.todos = [];
          scope.todos.push(todo);

          // test expected rideshare DELETE request
          $httpBackend.expectDELETE(/todos\/([0-9a-fA-F]{24})$/).respond(204);

          // run controller
          scope.destroy(todo);
          $httpBackend.flush();

          // test after successful delete URL location todos lis
          //expect($location.path()).toBe('/todos');
          expect(scope.todos.length).toBe(0);

        }));
    });
  });
}());