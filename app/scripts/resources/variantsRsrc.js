'use strict';

angular.module('wisrNgApp').factory('VariantsRsrc', function($resource, Paths) {
  return $resource(Paths.apiURL + '/variants/current', {}, {});
});
