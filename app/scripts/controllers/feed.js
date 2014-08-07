'use strict';

/**
 * @ngdoc function
 * @name wisrNgApp.controller:FeedCtrl
 * @description
 * # FeedCtrl
 * Controller of the wisrNgApp
 */
angular.module('wisrNgApp')
  .controller('FeedCtrl', function ($scope, $routeParams, PublicationsRsrc, Paths, CurrentUser, CorrectQuestionIdsRsrc) {
    var currentUser, correctQIds;

    var init = function() {
      $scope.assetBasePath = Paths.assets;

      CurrentUser(function(_currentUser) {
        currentUser = _currentUser;
        loadCorrectAnswers();
      });

      loadPublications();
    };

    var loadPublications = function() {
      PublicationsRsrc.query({subjectURL: $routeParams.subjectURL}, 
        function(data) {
          $scope.publications = data;
      });
    };

    var loadCorrectAnswers = function() {
      CorrectQuestionIdsRsrc.query({currentUserId: currentUser.id}, 
        function(_correctQIds) {
          correctQIds = _correctQIds;
          $scope.$broadcast('FeedCtrl:correctQIds:loaded', correctQIds);
      });
    }

    init();
  });