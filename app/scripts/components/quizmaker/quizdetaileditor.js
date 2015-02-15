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

    function link(scope, element, attrs) {
      $scope = scope;
      $scope.updatePublished = updatePublished;

      if ($scope.quiz && $scope.currentAsker) {
        $scope.displayQuiz = {name: $scope.quiz.name};
        watchQuizForChanges();
      }
    }

    function watchQuizForChanges() {
      var prevText = $scope.quiz.name;
      $scope.$watch('displayQuiz.name', _.debounce(function() {
        if (prevText == $scope.displayQuiz.name) return;
        else prevText = $scope.displayQuiz.name;

        // strip illegal chars
        $scope.displayQuiz.name = $scope.displayQuiz.name.match(/[a-zA-Z0-9\s\+\,\(\)\:]+/g).join('')

        $scope.quiz.name = $scope.displayQuiz.name;
        $scope.quiz.$update({id: $scope.quiz.id});
      }, 200));
    }

    function updatePublished() {
      $scope.updatingPublished = true;
      $scope.quiz.published = !$scope.quiz.published;

      $scope.quiz.$update({id: $scope.quiz.id}).then(function() {
        $scope.updatingPublished = false;
      });
    }

    return {
      templateUrl: '/scripts/components/quizmaker/_quiz_detail_editor.html',
      restrict: 'E',
      scope: {
        quiz: '=',
        currentAsker: '=',
        editMode: '='
      },
      link: function postLink(scope, element, attrs) {
        var linkArgs = arguments;

        // switch to $watchGroup after upgrade to ng 1.3+
        _.each(['quiz', 'currentAsker', 'editMode'], function(exp) {
          scope.$watch(exp, function() {
            link.apply(this, linkArgs);
          });
        });
      }
    };
  });
