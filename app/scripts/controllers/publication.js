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
      $scope.$on('FeedCtrl:correctQIds:loaded', markPreviouslyAnswered);
      $scope.correctAId = parseInt($scope.publication._question.correct_answer_id);
    };

    var answered = function() {
      $scope.answered = true;
    }

    var markPreviouslyAnswered = function(e, correctQuestions) {
      if (correctQuestions.ids.indexOf($scope.publication.question_id) >= 0) {
        $scope.answered = true;
        $scope.$broadcast('PublicationCtrl:markPreviouslyAnswered', $scope.correctAId);
      }
    };

    $scope.tellMe = function() {
      $scope.toldMe = true;
    }

    init();
  });