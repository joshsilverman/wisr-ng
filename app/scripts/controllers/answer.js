'use strict';

/**
 * @ngdoc function
 * @name wisrNgApp.controller:AnswerCtrl
 * @description
 * # AnswerCtrl
 * Controller of the wisrNgApp
 */
angular.module('wisrNgApp')
  .controller('AnswerCtrl', function ($scope, $location, Auth, CurrentUser, RespondToQuestionRsrc) {
    var currentUser;

    var init = function() {
      CurrentUser(function(_currentUser) {
        currentUser = _currentUser;
      });

      $scope.$on('PublicationCtrl:markPreviouslyAnswered', markPreviouslyAnswered);
    };

    $scope.respondToQuestion = function() {
      var params;
      if ($scope.$parent.$parent.answered === true) return;
      if ($scope.$parent.$parent.toldMe === true) return;

      if (!currentUser) {
        Auth.login();
        return;
      }
      
      params = {
        "asker_id" : $scope.publication.asker_id,
        "publication_id" : $scope.publication.id,
        "answer_id" : $scope.id};

      $scope.grading = true;
      RespondToQuestionRsrc.save('/respond_to_question', params).
        $promise.then(function(data) {
          $scope.grading = false;

          if (data[0] == 'f') {
            $scope.correct = false;
          }
          else {
            $scope.correct = true;
            $scope.$emit('AnswerCtrl:correct');
          } 
        });
    };

    var markPreviouslyAnswered = function(e, correctAId) {
      if (correctAId == parseInt($scope.id)) {
        $scope.correct = true;
      }
    };

    init();
  });