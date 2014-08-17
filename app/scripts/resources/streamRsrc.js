'use strict';

angular.module('wisrNgApp').factory('StreamRsrc', function($resource, Paths) {
    return $resource(Paths.apiURL + '/feeds/stream.json', {}, {});
  });