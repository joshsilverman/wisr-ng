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
    var init = function() {
      CurrentUser;
      debugger;
    }

    $scope.respondToQuestion = function() {
      // if (self.feedPublication.answered() === true) return;
      // if (!currentUserId) {
        Auth.login();
        return;
      // }

      // params = {"asker_id" : askerId,
      //   "publication_id" : self.publication_id,
      //   "answer_id" : self.id};

      // self.grading(true);
      // $.post('/respond_to_question', params, self.renderResults);};
    };

    init();
  });