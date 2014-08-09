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
    var currentUser, correctQIds, offset, 
      loadingPublications, loadingCorrectAIds;

    var init = function() {
      $scope.assetBasePath = Paths.assets;
      $scope.publications = [];
      offset = 0;

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
          $timeout(loadCorrectAnswers);
          loadingPublications = false;
      });
    };

    var loadCorrectAnswers = function() {
      var callback = function() {
        $scope.$broadcast('FeedCtrl:correctQIds:loaded', correctQIds);
      }

      if (!correctQIds && !loadingCorrectAIds) {
        loadingCorrectAIds = true;
        CorrectQuestionIdsRsrc.query({currentUserId: currentUser.id}, 
          function(_correctQIds) {
            correctQIds = _correctQIds;
            callback();
            loadingCorrectAIds = false;
        });
      } else {callback();}
    };

    $scope.loadMore = function() {
      if (loadingPublications) {return;}
      if ($scope.publications.length == 0) {return;}

      offset += 10;
      loadPublications();
    };

    init();
  });