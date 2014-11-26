'use strict';

angular.module('wisrNgApp').factory('AnswerRsrc', function($resource, Paths) {
    return $resource(Paths.apiURL + '/answers.json', {}, {
      update: {
        url: Paths.apiURL + '/answers/:id.json',
        method: 'PUT'
      }
    });
  }
);