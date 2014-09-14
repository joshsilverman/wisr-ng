'use strict';

angular.module('wisrNgApp').factory('NewQuestionRsrc', function($resource, Paths) {
    return $resource(Paths.apiURL + '/questions/save_question_and_answers', {}, {});
  }
);
