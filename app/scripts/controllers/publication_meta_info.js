'use strict';

/**
 * @ngdoc function
 * @name wisrNgApp.controller:PublicationMetaInfoCtrl
 * @description
 * # PublicationMetaInfoCtrl
 * Controller of the wisrNgApp
 */
angular.module('wisrNgApp')
  .controller('PublicationMetaInfoCtrl', function ($scope) {
    function init() {
      setAuthorInfo();
      setCounts();
    }

    function setAuthorInfo() { 
      if (!$scope.publication) return;
      if (!$scope.publication._question) return;

      $scope.author = $scope.publication._question.author_twi_screen_name
      $scope.created_at = $scope.publication._question.created_at
    }

    function setCounts() {
      var correctCount = 0,
        incorrectCount = 0;

      $scope.answered_count = 0;
      $scope.percent_correct = 0;

      if (!$scope.publication) return;
      if (!$scope.publication._answer_counts) return;

      if ($scope.publication._answer_counts.correct) {
        correctCount = parseInt($scope.publication._answer_counts.correct);
        $scope.answered_count += correctCount;
      }

      if ($scope.publication._answer_counts.incorrect) {
        incorrectCount = parseInt($scope.publication._answer_counts.incorrect);
        $scope.answered_count += incorrectCount;
      }

      if ((incorrectCount + correctCount) > 0)
        $scope.percent_correct = correctCount / (incorrectCount + correctCount) * 100;
    }

    init();
  });