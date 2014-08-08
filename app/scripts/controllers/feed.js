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
    var currentUser, correctQIds, offset, loading;

    var init = function() {
      $scope.assetBasePath = Paths.assets;
      $scope.publications = [];
      offset = 0;

      CurrentUser(function(_currentUser) {
        currentUser = _currentUser;
        loadCorrectAnswers();
      });

      loadPublications();
    };

    var loadPublications = function(callback) {
      loading = true;
      PublicationsRsrc.query({subjectURL: $routeParams.subjectURL, offset: offset}, 
        function(data) {
          $scope.publications = $scope.publications.concat(data);
          loading = false;
      });
    };

    var loadCorrectAnswers = function() {
      CorrectQuestionIdsRsrc.query({currentUserId: currentUser.id}, 
        function(_correctQIds) {
          correctQIds = _correctQIds;
          $scope.$broadcast('FeedCtrl:correctQIds:loaded', correctQIds);
      });
    }

    $scope.loadMore = function() {
      if (loading) {
        console.log('de-dogpile');
        return;
      }

      offset += 10;
      loadPublications();
    };

    init();
  });