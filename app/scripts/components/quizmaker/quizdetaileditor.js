'use strict';

/**
 * @ngdoc directive
 * @name wisrNgApp.directive:quizDetailEditor
 * @description
 * # quizDetailEditor
 */
angular.module('wisrNgApp')
  .directive('quizDetailEditor', function (LessonRsrc) {
    var $scope;

    function init(scope, element, attrs) {
      $scope = scope;
      $scope.updatePublished = updatePublished;

      if ($scope.quiz && $scope.currentAsker) {
        watchQuizForChanges();
      }
    }

    function watchQuizForChanges() {
      var prevText = $scope.quiz.name;
      $scope.$watch('quiz.name', _.debounce(function() {
        if (prevText == $scope.quiz.name) return;
        else prevText = $scope.quiz.name;

        $scope.quiz.$update({id: $scope.quiz.id});
      }, 1000));
    }

    function updatePublished() {
      $scope.quiz.$update({id: $scope.quiz.id});
    }

    return {
      templateUrl: '/scripts/components/quizmaker/_quiz_detail_editor.html',
      restrict: 'E',
      scope: {
        quiz: '=',
        currentAsker: '='
      },
      link: function postLink(scope, element, attrs) {
        var linkArgs = arguments;

        // switch to $watchGroup after upgrade to ng 1.3+
        _.each(['quiz', 'currentAsker'], function(exp) {
          scope.$watch(exp, function() {
            init.apply(this, linkArgs);          
          });
        });
      }
    };
  });
