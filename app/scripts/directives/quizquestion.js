'use strict';

/**
 * @ngdoc directive
 * @name wisrNgApp.directive:quizquestion
 * @description
 * # quizquestion
 */
angular.module('wisrNgApp')
  .directive('quizquestion', function (QuestionRsrc, AnswerRsrc) {
    var debounceLimit = 1000,
      scope;

    function link(_scope, element, attrs) {
      scope = _scope;
      assignCorrectAnswer();
      assignIncorrectAnswers();
      assignQuestion();
    }

    function assignQuestion() {
      if (!scope.lessonItem) return;
      if (scope.question) return;

      scope.question = new QuestionRsrc(scope.lessonItem['_question']);

      var prevText = scope.question.text;
      scope.$watch('question.text', _.debounce(function() {
        if (prevText == scope.question.text) return;
        else prevText = scope.question.text;

        scope.question.$update({id: scope.question.id});
      }, debounceLimit));
    }

    function assignCorrectAnswer() {
      if (!scope.lessonItem || !scope.lessonItem['_answers']) return;
      if (scope.correctAnswer) return;

      scope.correctAnswerId = scope.lessonItem['_question'].correct_answer_id;
      if (scope.correctAnswerId) {
        scope.correctAnswer = new AnswerRsrc({
          id: scope.correctAnswerId,
          text: scope.lessonItem['_answers'][scope.correctAnswerId]
        });
      }

      var prevText = scope.correctAnswer.text;
      scope.$watch('correctAnswer.text', _.debounce(function() {
        if (prevText == scope.correctAnswer.text) return;
        else prevText = scope.correctAnswer.text;

        scope.correctAnswer.$update({id: scope.correctAnswer.id});
      }, debounceLimit));
    }

    function assignIncorrectAnswers() {
      var i = 0;
      scope.incorrectAnswers = [];
      _.each(scope.lessonItem['_answers'], function(questionText, id) {
        if (id == scope.correctAnswerId) return;

        var answer = new AnswerRsrc({
          id: id,
          text: questionText
        });

        scope.incorrectAnswers.push(answer);

        var prevText = answer.text;
        var watchExp = ['incorrectAnswers[', i , '].text'].join('');
        scope.$watch(watchExp, _.debounce(function() {
          if (prevText == answer.text) return;
          else prevText = answer.text;

          answer.$update({id: answer.id});
        }, debounceLimit));

        i++;
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
