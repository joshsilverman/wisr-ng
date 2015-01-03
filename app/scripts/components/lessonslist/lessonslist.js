'use strict';

/**
 * @ngdoc directive
 * @name wisrNgApp.directive:lessonsList
 * @description
 * # lessonsList
 */

angular.module('wisrNgApp')
  .directive('lessonsList', function (LessonsRsrc, LessonAnswerCountsRsrc) {
    var $scope;

    function init(scope, element, attrs) {
      $scope = scope;

      loadLessonCounts();

      $scope.navToLesson = function(lesson) {
        var url;

        if ($scope.editMode()) {
          url = [
            $scope.subject_url,
            lesson.id,
            "quiz",
            "edit",
            ].join("/");
        } else {
          url = [
            $scope.subject_url,
            lesson.topic_url,
            'quiz'
          ].join('/');
        }

        return url;
      }
    }

    function loadLessonCounts() {
      if (!$scope.asker) return;

      LessonsRsrc.get({asker_id: $scope.asker.id}, function(data) {
        $scope.lessons = data.topics;
        $scope.subject_url = data.meta.subject_url;
      });

      updateAnsweredCounts();
    }

    function updateAnsweredCounts() {
      if (!$scope.showAnsweredCounts()) return;

      LessonAnswerCountsRsrc.get({}, function(data) {
        $scope.lessonCounts = data;
      });
    }

    return {
      templateUrl: '/scripts/components/lessonslist/lessonslist.html',
      restrict: 'E',
      scope: {
        asker: '=',
        editMode: '&',
        showAnsweredCounts: '&'
      },
      link: function postLink(scope, element, attrs) {
        var linkArgs = arguments;

        scope.$watch('asker', function() {
          init.apply(this, linkArgs);          
        });
      }
    };
  });
