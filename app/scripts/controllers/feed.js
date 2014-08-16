'use strict';

/**
 * @ngdoc function
 * @name wisrNgApp.controller:FeedCtrl
 * @description
 * # FeedCtrl
 * Controller of the wisrNgApp
 */
angular.module('wisrNgApp')
  .controller('FeedCtrl', function ($scope, $routeParams, $timeout, $http, $sce, PublicationsRsrc, Paths, CurrentUser, CorrectQuestionIdsRsrc, AskersRsrc) {
    var currentUser, offset, loadingPublications, askers;

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

      AskersRsrc.query().$promise.then(function(_askers) {
        askers = _askers;
        $scope.currentAsker = _.find(askers, function(a) {
          return a.subject_url == $routeParams.subjectURL;
        });
        configStyles();
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

    var configStyles = function() {
      if ($scope.currentAsker) {
        $scope.bgColor = $scope.currentAsker.styles["bg_color"];
        $scope.silhouetteColor = $scope.currentAsker.styles["silhouette_color"];
      }
      else {
        $scope.bgColor = '#202734';
        $scope.silhouetteColor = '#292935';
      }

      $scope.imageBaseURL = Paths.imageBaseURL;
      $scope.questImage = $scope.currentAsker.styles["quest_image"];
      fetchSilhouette();
    }

    var fetchSilhouette = function() {
      if ($scope.currentAsker)
        $scope.silhouetteImage = $scope.currentAsker.styles["silhouette_image"];
      else
        $scope.silhouetteImage = 'bg_images/nature.svg';

      $http.get(Paths.imageBaseURL + "/" + $scope.silhouetteImage)
        .success(function(data) {
          $scope.silhouette = $sce.trustAsHtml(data);
        }
      );
    };

    $scope.loadMore = function() {
      if (loadingPublications) {return;}
      if ($scope.publications.length == 0) {return;}

      offset += 10;
      loadPublications();
    };

    init();
  });