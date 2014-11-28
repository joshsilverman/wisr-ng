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

      // @strange that this had to go on the scope and could
      // not be put in this context and pulled in via the closure
      scope.prevQuestionText = scope.question.text;
      scope.$watch('question.text', _.debounce(function() {
        if (scope.prevQuestionText == scope.question.text) return;
        else scope.prevQuestionText = scope.question.text;

        scope.question.$update({id: scope.question.id});
        console.log('update question');
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

      scope.prevCorrectAnswerText = scope.correctAnswer.text;
      scope.$watch('correctAnswer.text', _.debounce(function() {
        if (scope.prevCorrectAnswerText == scope.correctAnswer.text) return;
        else scope.prevCorrectAnswerText = scope.correctAnswer.text;

        scope.correctAnswer.$update({id: scope.correctAnswer.id});
        console.log('update correct answer');
      }, debounceLimit));
    }

    function assignIncorrectAnswers() {
      var i = 0;
      scope.incorrectAnswers = [];
      _.each(scope.lessonItem['_answers'], function(questionText, id) {
        if (id == scope.correctAnswerId) return;
        var k = i; // create a var local to this context to get pulled in
        var answer = new AnswerRsrc({
          id: id,
          text: questionText
        });

        scope.incorrectAnswers.push(answer);

        scope.prevIncorrectAnswerText = scope.prevIncorrectAnswerText || {};
        scope.prevIncorrectAnswerText[k] = answer.text;
        var watchExp = ['incorrectAnswers[', k , '].text'].join('');
        scope.$watch(watchExp, _.debounce(function() {
          if (scope.prevIncorrectAnswerText[k] == answer.text) return;
          else scope.prevIncorrectAnswerText[k] = answer.text;

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
