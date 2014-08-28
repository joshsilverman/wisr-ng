'use strict';

angular.module('wisrNgApp').factory('LessonAnswerCountsRsrc', function($resource, Paths) {
  return $resource(Paths.apiURL + '/topics/answered_counts.json', {}, {});
});