'use strict';

angular.module('wisrNgApp').factory('AskersRsrc', function($resource, Paths) {
  return $resource(Paths.apiURL + '/askers.json?published=:published',
    {published: true}, {});
});
