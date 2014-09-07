'use strict';

angular.module('wisrNgApp').factory('PublicationRsrc', function($resource, Paths) {
  return $resource(Paths.apiURL + '/publications/:id.json');
});
