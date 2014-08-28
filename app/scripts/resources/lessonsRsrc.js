'use strict';

angular.module('wisrNgApp').factory('LessonsRsrc', function($resource, Paths) {
  return $resource(Paths.apiURL + '/topics.json?scope=lessons&asker_id=:asker_id', {}, {});
});