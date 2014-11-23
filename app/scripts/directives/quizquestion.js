'use strict';

/**
 * @ngdoc directive
 * @name wisrNgApp.directive:quizquestion
 * @description
 * # quizquestion
 */
angular.module('wisrNgApp')
  .directive('quizquestion', function () {
    function link(scope, element, attrs) {
      var correctAnswerId = scope.question._question.correct_answer_id;
      if (correctAnswerId) {
        scope.correctAnswer = {
          text: scope.question._answers[correctAnswerId]
        };
      }
    }

    return {
      templateUrl: '/views/quizmaker/_new_question.html',
      restrict: 'E',
      scope: {
        question: '='
      },
      link: function(scope, element, attrs) {
        scope.$watch('question', function() {
          link(scope, element, attrs);          
        });

        link(scope, element, attrs);
      }
    };
  });
