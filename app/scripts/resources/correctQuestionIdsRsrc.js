'use strict';

angular.module('wisrNgApp').factory('CorrectQuestionIdsRsrc', function($resource, Paths) {
    return $resource(Paths.apiURL + '/users/:currentUserId/correct_question_ids.json', {}, 
      {
        query: {
          method: 'GET',
          transformResponse: function (data, headers) {
            if (data)
              return {ids: JSON.parse(data)};
            else
              return {ids: []};
          }
        }
      }
    );
  }
);
