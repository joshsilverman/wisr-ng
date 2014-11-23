'use strict';

angular.module('wisrNgApp').factory('LessonRsrc', function($resource, Paths) {
    return $resource(Paths.apiURL + '/lessons.json', {}, {
      get: {
        url: Paths.apiURL + '/lessons/:id.json',
        isArray: true
      },
      update: {
        url: Paths.apiURL + '/lessons/:id.json',
        method: 'PUT'
      }
    });
  }
);