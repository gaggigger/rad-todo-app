'use strict';

//Setting up route
angular.module('toptal_todo').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/todos', {
            templateUrl: 'views/todos/list.html'
        }).
        when('/todos/create', {
            templateUrl: 'views/todos/create.html'
        }).
        when('/todos/:articleId/edit', {
            templateUrl: 'views/todos/edit.html'
        }).
        when('/todos/:articleId', {
            templateUrl: 'views/todos/view.html'
        }).
        when('/', {
            templateUrl: 'views/index.html'
        }).
        otherwise({
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