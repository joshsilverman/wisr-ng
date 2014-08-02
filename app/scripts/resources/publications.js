'use strict';

// console.log('publications');
//Articles service used for articles REST endpoint
angular.module('wisrNgApp').factory('Publications', ['$resource',
  function($resource) {
    // return $resource('articles/:articleId', {
    return $resource('http://data.localhost:8080/biology.json', {}, {});
  }
]);
