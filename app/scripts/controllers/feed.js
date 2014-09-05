'use strict';

/**
 * @ngdoc function
 * @name wisrNgApp.controller:FeedCtrl
 * @description
 * # FeedCtrl
 * Controller of the wisrNgApp
 */
angular.module('wisrNgApp')
  .controller('FeedCtrl', function($scope, $routeParams, $http, $sce, $rootScope, Paths, CurrentUser, AskersRsrc) {
    var offset, loadingPublications;

    var init = function() {
      $scope.assetBasePath = Paths.assets;
      $scope.imageBaseURL = Paths.imageBaseURL;
      $scope.Paths = Paths;
      $rootScope.title = "Daily Quiz Questions | Wisr";

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

        $scope.$emit('FeedCtrl::fetchedCurrentAsker', $scope.currentAsker);
        $scope.$broadcast('FeedCtrl::fetchedCurrentAsker', $scope.currentAsker);

        configStyles();
      });

      $rootScope.$on('AuthorQuestionModalCtrl:showAuthorQuestionModal', function() {blurContainer(true)});
      $rootScope.$on('AuthorQuestionModalCtrl:hideAuthorQuestionModal', function() {blurContainer(false)});
    };

    var configStyles = function() {
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

    var fetchSilhouette = function(callback) {
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

    var blurContainer = function(bool) {
      $scope.blurRootContainer = bool;
    };

    init();
  });
