'use strict';

/**
 * @ngdoc function
 * @name wisrNgApp.controller:NewQuestionCtrl
 * @description
 * # NewQuestionCtrl
 * Controller of the wisrNgApp
 */
angular.module('wisrNgApp')
  .controller('NewQuestionCtrl', function ($scope, NewQuestionRsrc, CurrentUser) {
    function init() {
      initModels();

      $scope.$on('FeedCtrl:fetchedCurrentAsker', registerCurrentAsker);
      CurrentUser(registerCurrentUser);
    }

    function registerCurrentAsker(e, _currentAsker) {
      $scope.currentAsker = _currentAsker;
    }

    function registerCurrentUser(_currentUser) {
      $scope.currentUser = _currentUser;
    }

    function initModels() {
      $scope.question = {text: ""};
      $scope.correctAnswer = {text: ""};

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

    $scope.submit = function() {
      var params = buildParams();
      if (!validate(params)) return;

      NewQuestionRsrc.save(params, function() {
        var path = ['/', $scope.currentAsker.subject_url, '/new'].join('');
        document.location.href = path;
      });
    }

    function buildParams() {
      var params = {
        question: $scope.question.text,
        asker_id: $scope.currentAsker.id,
        canswer: $scope.correctAnswer.text
      };

      _.each($scope.incorrectAnswers, function(ianswer, i) {
        if (!ianswer.text) return;

        params['ianswer' + (i + 1)] = ianswer.text;
      });

      return params;
    }

    function validate(params) {
      if (!params.asker_id) {
        return false;
      }

      if (!params.question) {
        alert('Please enter a question.');
        return false;
      }

      if (!params.canswer) {
        alert('Please enter a correct answer.');
        return false;
      }

      if (!params.ianswer1) {
        alert('Please enter an incorrect answer.');
        return false;
      }

      return true;
    }

    init();
  });
