'use strict';

//Articles service used for articles REST endpoint
angular.module('toptal_todo.articles').factory('Articles', ['$resource', function($resource) {
    return $resource('articles/:articleId', {
        articleId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);