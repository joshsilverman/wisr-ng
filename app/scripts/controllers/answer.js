'use strict';

/**
 * @ngdoc function
 * @name wisrNgApp.controller:AnswerCtrl
 * @description
 * # AnswerCtrl
 * Controller of the wisrNgApp
 */
angular.module('wisrNgApp')
  .controller('AnswerCtrl', function ($scope, $location, Auth, CurrentUser) {
    var currentUser;

    var init = function() {
      CurrentUser(function(_currentUser) {
        currentUser = _currentUser;
        console.log(currentUser);
      });
    };

    $scope.respondToQuestion = function() {
      var params;
      
      // if (self.feedPublication.answered() === true) return;
      if (!currentUser) {
        Auth.login();
        return;
      }
      
      params = {"asker_id" : $scope.publication.asker_id,
        "publication_id" : $scope.publication.id,
        "answer_id" : $scope.id};

      console.log(params);

      // self.grading(true);
      // $.post('/respond_to_question', params, self.renderResults);};
    };

    init();
  });