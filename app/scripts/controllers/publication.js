'use strict';

/**
 * @ngdoc function
 * @name wisrNgApp.controller:PublicationCtrl
 * @description
 * # PublicationCtrl
 * Controller of the wisrNgApp
 */
angular.module('wisrNgApp')
  .controller('PublicationCtrl', function ($scope) {
    var init = function() {
      $scope.$on('AnswerCtrl:correct', answered);
      $scope.$on('PublicationsCtrl:correctQIds:loaded', markPreviouslyAnswered);
      $scope.correctAId = parseInt($scope.publication._question.correct_answer_id);

      shuffleAnswers();
    };

    function answered() {
      $scope.answered = true;
    }

    function markPreviouslyAnswered(e, correctQuestions) {
      if (correctQuestions.ids.indexOf($scope.publication.question_id) >= 0) {
        $scope.answered = true;
        $scope.$broadcast('PublicationCtrl:markPreviouslyAnswered', $scope.correctAId);
      }
    };

    function shuffleAnswers() {
      var shuffledKeys = _.shuffle(_.keys($scope.publication._answers));
      $scope.publication._shuffledAnswers = [];

      _.map(shuffledKeys, function(key){
        $scope.publication._shuffledAnswers.push({
          id: key,
          text: $scope.publication._answers[key]
        });
      });
    }

    $scope.tellMe = function() {
      $scope.disabled = true;
    }

    init();
  });
