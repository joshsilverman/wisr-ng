'use strict';

angular.module('wisrNgApp').factory('QuizRsrc', function($resource, Paths) {
    return $resource(Paths.apiURL + '/topics.json', {}, {});
  }
);