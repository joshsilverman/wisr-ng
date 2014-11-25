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
      assignAnswers();
      assignQuestion();
    }

    function assignQuestion() {
      if (!scope.lessonItem) return;


      scope.question = scope.lessonItem['_question'];
    }

    function assignAnswers() {
      if (!scope.lessonItem || !scope.lessonItem['_answers']) return;

      var correctAnswerId = scope.lessonItem['_question'].correct_answer_id;
      if (correctAnswerId) {
        scope.correctAnswer = {
          text: scope.lessonItem['_answers'][correctAnswerId]
        };
      }

      scope.incorrectAnswers = [];
      _.each(scope.lessonItem['_answers'], function(questionText, id) {
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
        lessonItem: '=',
        correctAnswer: '=',
        incorrectAnswers: '='
      },
      link: function(_scope, element, attrs) {
        _scope.$watch('lessonItem', function() {
          link(_scope, element, attrs);          
        });

        link(_scope, element, attrs);
      }
    };
  });
