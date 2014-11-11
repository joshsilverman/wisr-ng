'use strict';

/**
 * @ngdoc function
 * @name wisrNgApp.controller:QuizmakerCtrl
 * @description
 * # QuizmakerCtrl
 * Controller of the wisrNgApp
 */
angular.module('wisrNgApp')
  .controller('QuizmakerCtrl', function($scope, $routeParams, $http, $sce, $rootScope, Paths, CurrentUser, AskersRsrc, PublicationRsrc, VariantsRsrc) {
    function init() {
      $scope.assetBasePath = Paths.assets;
      $rootScope.assetBasePath = Paths.assets;
      $scope.imageBaseURL = Paths.imageBaseURL;
      $scope.Paths = Paths;

      loadCurrentUser();
      loadAskers();
    }

    function loadCurrentUser() {
      CurrentUser(function(_currentUser) {
        $scope.currentUser = _currentUser;
      });
    }

    function loadAskers() {
      AskersRsrc.query().$promise.then(function(_askers) {
        $scope.askers = _askers;
        $scope.currentAsker = _.find($scope.askers, function(a) {
          return a.subject_url == $routeParams.subjectURL;
        });

        configStyles();
      });
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

      setTitle();
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

    function setTitle() {
      $rootScope.title = "Quiz Maker | Wisr";
    }

    init();
  });