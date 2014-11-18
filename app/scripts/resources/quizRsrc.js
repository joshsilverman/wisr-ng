'use strict';

angular.module('wisrNgApp').factory('QuizRsrc', function($resource, Paths) {
    return $resource(Paths.apiURL + '/topics.json', {}, {
      get: {
        url: Paths.apiURL + '/topics/:id.json',
        isArray: true
      }
    });
  }
);