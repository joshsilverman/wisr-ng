'use strict';

/**
 * @ngdoc directive
 * @name wisrNgApp.directive:quizquestion
 * @description
 * # quizquestion
 */
angular.module('wisrNgApp')
  .directive('quizQuestion', function (QuestionRsrc, AnswerRsrc) {
    var debounceLimit = 250;

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

      scope.deleteQuestion = function() {
        var confirmMsg = 'Are you sure you want to delete this question?';
        if (!confirm(confirmMsg)) return;

        scope.question.$delete({id: scope.question.id});
      }

      scope.deleteAnswer = function(id) {
        var confirmMsg = 'Are you sure you want to delete this answer?';
        if (!confirm(confirmMsg)) return;

        var answer = _.filter(scope.incorrectAnswers, function(answer){
          return answer.id == parseInt(id);
        })[0];

        var displayAnswer = _.filter(scope.displayIncorrectAnswers, function(answer){
          return answer.id == parseInt(id);
        })[0];

        if (answer) {
          answer.$delete({id: answer.id}).then(function() {
            displayAnswer.id = null;

            scope.incorrectAnswers = _.filter(scope.incorrectAnswers, function(answer){
              return answer.id;
            });

            scope.displayIncorrectAnswers = _.filter(scope.displayIncorrectAnswers, function(answer){
              return answer.id;
            });
          });
        }
      }
    }

    function assignQuestion(scope) {
      if (!scope.lessonItem) return;
      if (scope.question) return;

      scope.question = new QuestionRsrc(scope.lessonItem['_question']);

      // @strange that this had to go on the scope and could
      // not be put in this context and pulled in via the closure
      scope.prevQuestionText = scope.question.text;
      scope.$watch('question.text', function() {
        if (!scope.question.id) return;

        if (scope.prevQuestionText == scope.question.text) return;
        else scope.prevQuestionText = scope.question.text;

        scope.saving = true;
        var watchArgs = arguments;
        scope.question.$update({id: scope.question.id}).then(function() {
          scope.saving = false;
        });
      });
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
      scope.$watch('correctAnswer.text', function() {
        if (scope.prevCorrectAnswerText == scope.correctAnswer.text) return;
        else scope.prevCorrectAnswerText = scope.correctAnswer.text;

        scope.saving = true;
        scope.correctAnswer.$update({id: scope.correctAnswer.id}).then(function() {
          scope.saving = false;
        });
      });
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
      scope.$watch(watchExp, function() {
        if (!answer.id) return;

        if (scope.prevIncorrectAnswerText[k] == answer.text) return;
        else scope.prevIncorrectAnswerText[k] = answer.text;

        scope.saving = true;
        answer.$update({id: answer.id}).then(function() {
          scope.saving = false;
        });
      });
    }

    return { //quizQuestion
      templateUrl: '/scripts/components/quizmaker/quizQuestion.html',
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
