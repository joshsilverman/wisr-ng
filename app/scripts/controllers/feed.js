'use strict';

/**
 * @ngdoc function
 * @name wisrNgApp.controller:FeedCtrl
 * @description
 * # FeedCtrl
 * Controller of the wisrNgApp
 */
angular.module('wisrNgApp')
  .controller('FeedCtrl', function ($scope, $routeParams, $timeout, PublicationsRsrc, Paths, CurrentUser, CorrectQuestionIdsRsrc) {
    var currentUser, offset, loadingPublications;

    var init = function() {
      $scope.assetBasePath = Paths.assets;
      $scope.publications = [];
      offset = 0;

      $scope.$watch('correctQIds', broadcastCorrectAnswersLoaded);
      $scope.$watch('publications', broadcastCorrectAnswersLoaded);

      CurrentUser(function(_currentUser) {
        currentUser = _currentUser;
        loadPublications();
        loadCorrectAnswers();
      });
    };

    var loadPublications = function(callback) {
      loadingPublications = true;
      PublicationsRsrc.query({subjectURL: $routeParams.subjectURL, offset: offset}, 
        function(data) {
          $scope.publications = $scope.publications.concat(data);
          loadingPublications = false;
      });
    };

    var loadCorrectAnswers = function() {
      CorrectQuestionIdsRsrc.query({currentUserId: currentUser.id}, 
        function(correctQIds) {
          $scope.correctQIds = correctQIds;
      });
    };

    var broadcastCorrectAnswersLoaded = function() {
      if (!$scope.correctQIds) return;
      $timeout(function() {
        $scope.$broadcast('FeedCtrl:correctQIds:loaded', $scope.correctQIds);
      });
    }

    $scope.loadMore = function() {
      if (loadingPublications) {return;}
      if ($scope.publications.length == 0) {return;}

      offset += 10;
      loadPublications();
    };

    init();
  });