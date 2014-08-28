'use strict';

/**
 * @ngdoc function
 * @name wisrNgApp.controller:LessonsCtrl
 * @description
 * # LessonsCtrl
 * Controller of the wisrNgApp
 */
angular.module('wisrNgApp')
  .controller('LessonsCtrl', function ($scope, $rootScope, LessonsRsrc, LessonAnswerCountsRsrc) {
    var init = function() {
      LessonsRsrc.get({asker_id: 13588}, function(data) {
        $scope.lessons = data.topics;
        $scope.subject_url = data.meta.subject_url;
      });

      updateAnsweredCounts();
      $rootScope.$on('AnswerCtrl:correct', updateAnsweredCounts);
    };

    var updateAnsweredCounts = function() {
      LessonAnswerCountsRsrc.get({}, function(data) {
        $scope.lessonCounts = data;
      });
    }

    init();
  });