'use strict';

/**
 * @ngdoc function
 * @name wisrNgApp.controller:LessonsCtrl
 * @description
 * # LessonsCtrl
 * Controller of the wisrNgApp
 */
angular.module('wisrNgApp')
  .controller('LessonsCtrl', function ($scope, $rootScope, $location, $routeParams, Paths, LessonsRsrc, AskersRsrc, LessonAnswerCountsRsrc) {
    function init() {
      fetchCurrentAsker(function() {
        loadLessonCounts();
      });

      $rootScope.$on('AnswerCtrl:correct', updateAnsweredCounts);
    };

    function fetchCurrentAsker(callback) {
      AskersRsrc.query().$promise.then(function(_askers) {
        $scope.currentAsker = _.find($scope.askers, function(a) {
          return a.subject_url == $routeParams.subjectURL;
        });

        callback.call();
      });
    }

    function loadLessonCounts() {
      LessonsRsrc.get({asker_id: $scope.currentAsker.id}, function(data) {
        $scope.lessons = data.topics;
        $scope.subject_url = data.meta.subject_url;
      });

      updateAnsweredCounts();
    }

    function updateAnsweredCounts() {
      LessonAnswerCountsRsrc.get({}, function(data) {
        $scope.lessonCounts = data;
      });
    }

    $scope.navToLesson = function(subject_url, topic_url) {
      var url = ['/', subject_url, '/', topic_url, '/quiz'];
      $location.path(url.join(''));
    };

    init();
  });
