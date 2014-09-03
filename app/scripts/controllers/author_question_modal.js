'use strict';

/**
 * @ngdoc function
 * @name wisrNgApp.controller:AuthorQuestionModalCtrl
 * @description
 * # AuthorQuestionModalCtrl
 * Controller of the wisrNgApp
 */
angular.module('wisrNgApp')
  .controller('AuthorQuestionModalCtrl', function ($scope, $rootScope, $location, $timeout, $http, Paths, CurrentUser) {
    var currentUser, modal;

    function init() {
      $rootScope.$on('FeedCtrl::fetchedCurrentAsker', registerCurrentAsker);
      if (!$location.search().q) return;

      CurrentUser(function(_currentUser) {
        currentUser = _currentUser;
        if (!currentUser.id) return;

        showModal();
      });

      $scope.incorrectAnswerCount = 1;
      $scope.question = {
        text: '',
        correctAnswer: '',
        incorrectAnswers: {0: ''}};
    }

    function getModal(callback) {
      modal = $('#post_question_modal');
      if (modal.length)
        callback(modal);
      else
        $timeout(function() {getModal(callback)}, 100);
    }

    function showModal() {
      getModal(function(modal) {
        $scope.$emit('AuthorQuestionModalCtrl:showAuthorQuestionModal');
        modal.modal('show');
      });
    }

    function registerCurrentAsker(e, _currentAsker) {
      $scope.currentAsker = _currentAsker;
    }

    $scope.addAnswer = function() {
      if ($scope.incorrectAnswerCount > 2) return;

      $scope.question.incorrectAnswers[$scope.incorrectAnswerCount] = '';
      $scope.incorrectAnswerCount = _.keys($scope.question.incorrectAnswers).length;
    }

    $scope.submit = function() {
      if (!valid()) return;

      var data = {
        "question" : $scope.question.text,
        "asker_id" : $scope.currentAsker.id,
        "canswer"  : $scope.question.correctAnswer,
        "ianswer1" : $scope.question.incorrectAnswers[0],
        "ianswer2" : $scope.question.incorrectAnswers[1] || '',
        "ianswer3" : $scope.question.incorrectAnswers[2] || '',
      };

      var url = Paths.legacyURL + "/questions/save_question_and_answers";
      $http.defaults.useXDomain = true;
      $http.defaults.withCredentials = true;
      $scope.submitted = true;

      $http.post(url, data)
        .success(function(e) {
        });
    }

    $scope.close = function() {
      modal.modal('hide');
      $scope.$emit('AuthorQuestionModalCtrl:hideAuthorQuestionModal');
    }

    $scope.postAnother = function() {
      $scope.question.text = '';
      $scope.question.correctAnswer = '';
      $scope.question.incorrectAnswers[0] = '';
      delete $scope.question.incorrectAnswers[1];
      delete $scope.question.incorrectAnswers[2];

      $scope.submitted = false;
    }

    function valid() {
      function textPresent(validateable) {
        if (!validateable) return false;
        if (!validateable.length) return false;

        return true;
      }

      if (!textPresent($scope.question.text)) {
        alert("Please enter a question.");
        return false
      }

      if (!textPresent($scope.question.correctAnswer)) {
        alert("Please enter a correct answer.")
        return false
      }

      if (!textPresent($scope.question.incorrectAnswers[0])) {
        alert("Please enter at least one incorrect answer.");
        return false;
      }

      return true
    }

    init();
  });
