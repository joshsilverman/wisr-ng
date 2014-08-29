'use strict';

/**
 * @ngdoc function
 * @name wisrNgApp.controller:LessonsCtrl
 * @description
 * # LessonsCtrl
 * Controller of the wisrNgApp
 */
angular.module('wisrNgApp')
  .controller('LessonsCtrl', function ($scope, $rootScope, Paths, LessonsRsrc, LessonAnswerCountsRsrc) {
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

    $scope.navToLesson = function(subject_url, topic_url) {
      var url = [Paths.legacyURL, '/', subject_url, '/', topic_url, '/quiz'];
      window.location.href = url.join('');
    };

    init();
  });