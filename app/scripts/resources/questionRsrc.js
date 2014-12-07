'use strict';

angular.module('wisrNgApp').factory('QuestionRsrc', function($resource, Paths) {
    return $resource(Paths.apiURL + '/questions.json', {}, {
      update: {
        url: Paths.apiURL + '/questions/:id.json',
        method: 'PUT'
      },
      delete: {
        url: Paths.apiURL + '/questions/:id.json',
        method: 'DELETE'
      }
    });
  }
);