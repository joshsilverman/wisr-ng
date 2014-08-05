'use strict';

// console.log('publications');
//Articles service used for articles REST endpoint
angular.module('wisrNgApp').factory('PublicationsRsrc', function($resource, Paths) {
    return $resource(Paths.apiURL + '/:subjectURL.json', {}, {});
  });