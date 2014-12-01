'use strict';

/**
 * @ngdoc directive
 * @name wisrNgApp.directive:quizquestion
 * @description
 * # quizquestion
 */
angular.module('wisrNgApp')
  .directive('quizquestion', function (QuestionRsrc, AnswerRsrc) {
    var debounceLimit = 1500;

    function link(scope, element, attrs) {
      assignCorrectAnswer(scope);
      assignIncorrectAnswers(scope);
      assignQuestion(scope);

      scope.addAnswer = function(question_id) {
        if (scope.incorrectAnswers.length >= 3) return;

        var answer = new AnswerRsrc({
          correct: false,
          question_id: question_id
        });

        answer.$save().then(function() {
          listenToIncorrectAnswerChange(answer, scope);
        });
      };
    }

    function assignQuestion(scope) {
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
      }, debounceLimit));
    }

    function assignCorrectAnswer(scope) {
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
      }, debounceLimit));
    }

    function assignIncorrectAnswers(scope) {
      if (scope.incorrectAnswers) return; // assign once
      scope.incorrectAnswers = [];
      _.each(scope.lessonItem['_answers'], function(questionText, id) {
        if (id == scope.correctAnswerId) return;
        var answer = new AnswerRsrc({
          id: id,
          text: questionText
        });
        listenToIncorrectAnswerChange(answer, scope);
      });
    }

    function listenToIncorrectAnswerChange(answer, scope) {
      var k = scope.incorrectAnswers.length;
      scope.incorrectAnswers.push(answer);

      scope.prevIncorrectAnswerText = scope.prevIncorrectAnswerText || {};
      scope.prevIncorrectAnswerText[k] = answer.text;
      var watchExp = ['incorrectAnswers[', k , '].text'].join('');
      scope.$watch(watchExp, _.debounce(function() {
        if (scope.prevIncorrectAnswerText[k] == answer.text) return;
        else scope.prevIncorrectAnswerText[k] = answer.text;

        answer.$update({id: answer.id});
      }, debounceLimit));
    }

    return {
      templateUrl: '/scripts/components/quizmaker/_new_question.html',
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
