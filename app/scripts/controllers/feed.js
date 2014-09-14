'use strict';

/**
 * @ngdoc function
 * @name wisrNgApp.controller:FeedCtrl
 * @description
 * # FeedCtrl
 * Controller of the wisrNgApp
 */
angular.module('wisrNgApp')
  .controller('FeedCtrl', function($scope, $routeParams, $http, $sce, $rootScope, Paths, CurrentUser, AskersRsrc, PublicationRsrc) {
    var init = function() {
      $scope.assetBasePath = Paths.assets;
      $rootScope.assetBasePath = Paths.assets;
      $scope.imageBaseURL = Paths.imageBaseURL;
      $scope.Paths = Paths;
      $rootScope.title = "Daily Quiz Questions | Wisr";

      loadInFocusPublication();

      CurrentUser(function(_currentUser) {
        $scope.currentUser = _currentUser;
        $scope.authenticated = $scope.currentUser.id;
        $scope.$broadcast('FeedCtrl:currentUserLoaded');
      });

      AskersRsrc.query().$promise.then(function(_askers) {
        $scope.askers = _askers;
        $scope.currentAsker = _.find($scope.askers, function(a) {
          return a.subject_url == $routeParams.subjectURL;
        });

        $scope.$emit('FeedCtrl:fetchedCurrentAsker', $scope.currentAsker);
        $scope.$broadcast('FeedCtrl:fetchedCurrentAsker', $scope.currentAsker);

        configStyles();
      });

      $scope.$on('PublicationsCtrl:newFeedLoaded', registerNewFeedLoaded);
    };

    function loadInFocusPublication() {
      if (!$routeParams.publicationId) return;

      PublicationRsrc.get({id: $routeParams.publicationId}).$promise.then(function(rsrc) {
        $scope.$broadcast('FeedCtrl:inFocusPublicationLoaded', rsrc);
      });
    }

    function registerNewFeedLoaded() {
      $scope.isNewFeed = true;
    }

    function configStyles() {
      fetchSilhouette(function() {
        if ($scope.currentAsker) {
          $scope.bgColor = $scope.currentAsker.styles["bg_color"];
          $scope.silhouetteColor = $scope.currentAsker.styles["silhouette_color"];
          $scope.questImage = $scope.currentAsker.styles["quest_image"];
        }
        $scope.bgColor = $scope.bgColor || '#202734';
        $scope.silhouetteColor = $scope.silhouetteColor || '#292935';
        $scope.questImage = $scope.questImage || "quests/scholar.png";
      });

      if ($scope.currentAsker)
        $rootScope.title = ["Daily ", $scope.currentAsker.subject, " Quiz | Wisr"].join("");
    }

    function fetchSilhouette(callback) {
      if ($scope.currentAsker)
        $scope.silhouetteImage = $scope.currentAsker.styles["silhouette_image"];
      $scope.silhouetteImage = $scope.silhouetteImage || 'bg_images/nature.svg';

      $http.get(Paths.imageBaseURL + "/" + $scope.silhouetteImage)
        .success(function(data) {
          $scope.silhouette = $sce.trustAsHtml(data);
          callback.call();
        }
      );
    };

    init();
  });
