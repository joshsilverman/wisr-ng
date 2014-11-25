'use strict';

/**
 * @ngdoc directive
 * @name wisrNgApp.directive:quizquestion
 * @description
 * # quizquestion
 */
angular.module('wisrNgApp')
  .directive('quizquestion', function () {
    var scope;

    function link(_scope, element, attrs) {
      scope = _scope;
      // console.log(scope.question);
      // console.log(scope.question['_answers']);
      assignAnswers();
    }

    function assignAnswers() {
      if (!scope.question || !scope.question['_answers']) return;

      var correctAnswerId = scope.question['_question'].correct_answer_id;
      if (correctAnswerId) {
        scope.correctAnswer = {
          text: scope.question['_answers'][correctAnswerId]
        };
      }

      scope.incorrectAnswers = [];
      _.each(scope.question['_answers'], function(questionText, id) {
        if (id == correctAnswerId) return;

        scope.incorrectAnswers.push({
          id: id,
          text: questionText
        });
      });
    }

    return {
      templateUrl: '/views/quizmaker/_new_question.html',
      restrict: 'E',
      scope: {
        question: '=',
        correctAnswer: '=',
        incorrectAnswers: '='
      },
      link: function(_scope, element, attrs) {
        _scope.$watch('question', function() {
          link(_scope, element, attrs);          
        });

        link(_scope, element, attrs);
      }
    };
  });
