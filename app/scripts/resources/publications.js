'use strict';

// console.log('publications');
//Articles service used for articles REST endpoint
angular.module('wisrNgApp').factory('Publications', ['$resource',
  function($resource) {
    // return $resource('articles/:articleId', {
    return $resource('https://www.wisr.com/biology.json', {}, {});
  }
]);
