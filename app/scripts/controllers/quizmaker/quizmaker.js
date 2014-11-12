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
      $scope.bgColor = $scope.currentAsker.styles["bg_color"] || '#202734';
      $scope.silhouetteColor = $scope.currentAsker.styles["silhouette_color"] || '#292935';
      $scope.questImage = $scope.currentAsker.styles["quest_image"] || "quests/scholar.png";

      $rootScope.title = "Quiz Maker | Wisr";
    }

    init();
  });