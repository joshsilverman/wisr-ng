'use strict';

/**
 * @ngdoc directive
 * @name wisrNgApp.directive:lessonsList
 * @description
 * # lessonsList
 */

angular.module('wisrNgApp')
  .directive('lessonsList', function (LessonsRsrc) {
    var $scope;

    function init(scope, element, attrs) {
      $scope = scope;

      loadLessonCounts();

      $scope.navToLesson = function(lesson) {
        var url = [
          $scope.subject_url,
          "quiz",
          lesson.id
          ].join("/");
        return url;
      }
    }

    function loadLessonCounts() {
      LessonsRsrc.get({asker_id: $scope.asker.id}, function(data) {
        $scope.lessons = data.topics;
        $scope.subject_url = data.meta.subject_url;
      });

      // updateAnsweredCounts();
    }

    return {
      templateUrl: '/scripts/components/lessonslist/lessonslist.html',
      restrict: 'E',
      scope: {
        asker: '=',
        showCounts: '='
      },
      link: function postLink(scope, element, attrs) {
        var linkArgs = arguments;

        scope.$watch('asker', function() {
          init.apply(this, linkArgs);          
        });
      }
    };
  });
