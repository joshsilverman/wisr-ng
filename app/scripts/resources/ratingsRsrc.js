'use strict';

angular.module('wisrNgApp').factory('RatingsRsrc', function($resource, Paths) {
  return $resource(Paths.apiURL + '/ratings.json', {}, {});
});
