'use strict';

angular.module('wisrNgApp').factory('RespondToQuestionRsrc', function($resource, Paths) {
    return $resource(Paths.apiURL + '/respond_to_question', {}, {});
  }
);
