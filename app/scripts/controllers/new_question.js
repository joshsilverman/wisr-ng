'use strict';

/**
 * @ngdoc function
 * @name wisrNgApp.controller:NewQuestionCtrl
 * @description
 * # NewQuestionCtrl
 * Controller of the wisrNgApp
 */
angular.module('wisrNgApp')
  .controller('NewQuestionCtrl', function ($scope) {
    function init() {
      initIncorrectAnswers();

      // $scope.$watch('incorrectAnswers', updateAnswers)
    }

    function initIncorrectAnswers() {
      $scope.incorrectAnswers = [];
      pushIncorrectAnswer();
    }

    function pushIncorrectAnswer() {
      $scope.incorrectAnswers.push({
        text: ''
      });
    }

    $scope.updateAnswers = function() {
      if ($scope.incorrectAnswers.length >= 3) return;

      if (_.last($scope.incorrectAnswers).text.length)
        pushIncorrectAnswer();
    }

    init();
  });
