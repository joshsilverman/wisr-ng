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
    function init() {
      $scope.assetBasePath = Paths.assets;
      $rootScope.assetBasePath = Paths.assets;
      $scope.imageBaseURL = Paths.imageBaseURL;
      $scope.Paths = Paths;
      setTitle();

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

      $scope.$on('PublicationsCtrl:lessonLoaded', registerLesson);
      $scope.$on('PublicationsCtrl:lessonLoaded', setTitle);
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

    function registerLesson(e, lesson) {
      $scope.lesson = lesson;
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
      $rootScope.title = "Daily Quiz Questions | Wisr";
      $scope.title = "Daily quiz questions";

      if ($scope.lesson && $scope.currentAsker)
        $scope.title = [$scope.currentAsker.subject, $scope.lesson.name, "Quiz"].join(" ");
      else if ($scope.lesson)
        $scope.title = [$scope.lesson.name, "Quiz"].join(" ");
      else if ($scope.currentAsker)
        $scope.title = ["Daily", $scope.currentAsker.subject, "questions"].join(" ");

      if ($scope.lesson || $scope.currentAsker)
        $rootScope.title = [$scope.title, "| Wisr"].join(" ");
    }

    init();
  });
