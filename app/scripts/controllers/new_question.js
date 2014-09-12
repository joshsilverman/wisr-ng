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
    }

    function initIncorrectAnswers() {
      $scope.incorrectAnswers = [];
      pushIncorrectAnswer();
    }

    function pushIncorrectAnswer() {
      $scope.incorrectAnswers.push({
        text: 'Another incorrect answer'
      });
    }

    init();
  });
