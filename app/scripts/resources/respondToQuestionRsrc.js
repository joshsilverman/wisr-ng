'use strict';

angular.module('wisrNgApp').factory('RespondToQuestionRsrc', function($resource, Paths) {
    return $resource(Paths.apiURL + '/respond_to_question', {}, {
      respond: {
        method: 'POST',
        transformResponse: function(grade) {
          var transform;
          if (grade == 'false') {
            transform = {correct: false};
          }
          else {
            transform = {correct: true};
          }
          return transform;
        }
      }
    });
  }
);
