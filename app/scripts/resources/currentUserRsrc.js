'use strict';

// console.log('publications');
//Articles service used for articles REST endpoint
angular.module('wisrNgApp').factory('CurrentUserRsrc', function($resource, Paths) {
    return $resource(Paths.apiURL + '/users/me.json', {}, {});
  }
);
