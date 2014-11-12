'use strict';

/**
 * @ngdoc function
 * @name wisrNgApp.controller:FeedCtrl
 * @description
 * # FeedCtrl
 * Controller of the wisrNgApp
 */
angular.module('wisrNgApp')
  .controller('FeedCtrl', function($scope, $routeParams, $http, $sce, $rootScope, Paths, CurrentUser, AskersRsrc, PublicationRsrc, VariantsRsrc) {
    function init() {
      $scope.assetBasePath = Paths.assets;
      $rootScope.assetBasePath = Paths.assets;
      $scope.imageBaseURL = Paths.imageBaseURL;
      $scope.Paths = Paths;

      loadInFocusPublication();
      loadCurrentUser();
      loadAskers();
      loadVariant();

      $scope.$on('PublicationsCtrl:newFeedLoaded', registerNewFeedLoaded);
      $scope.$on('PublicationsCtrl:lessonLoaded', registerLesson);
      $scope.$on('PublicationsCtrl:lessonLoaded', setTitle);

      setTitle();
    };

    function loadCurrentUser() {
      CurrentUser(function(_currentUser) {
        $scope.currentUser = _currentUser;
        $scope.authenticated = $scope.currentUser.id;
        $scope.$broadcast('FeedCtrl:currentUserLoaded');
      });
    }

    function loadAskers() {
      AskersRsrc.query().$promise.then(function(_askers) {
        $scope.askers = _askers;
        $scope.currentAsker = _.find($scope.askers, function(a) {
          return a.subject_url == $routeParams.subjectURL;
        });

        $scope.$emit('FeedCtrl:fetchedCurrentAsker', $scope.currentAsker);
        $scope.$broadcast('FeedCtrl:fetchedCurrentAsker', $scope.currentAsker);

        configStyles();
      });
    }

    function loadInFocusPublication() {
      if (!$routeParams.publicationId) return;

      PublicationRsrc.get({id: $routeParams.publicationId}).$promise.then(function(rsrc) {
        $scope.$broadcast('FeedCtrl:inFocusPublicationLoaded', rsrc);
      });
    }

    function loadVariant() {
      VariantsRsrc.get(function(variant) {
        if (variant.name == 'phone') {
          $rootScope.iOS = true;
          $scope.iOS = true;
        }
        else {
          $scope.web = true;
          $rootScope.web = true;
        }
      });
    }

    function registerNewFeedLoaded() {
      $scope.isNewFeed = true;
    }

    function registerLesson(e, lesson) {
      if (lesson.name)
        $scope.lesson = lesson;
    }

    function configStyles() {
      if ($scope.currentAsker) {
        $scope.bgColor = $scope.currentAsker.styles["bg_color"];
        $scope.silhouetteColor = $scope.currentAsker.styles["silhouette_color"];
        $scope.questImage = $scope.currentAsker.styles["quest_image"];
      }
      $scope.bgColor = $scope.bgColor || '#202734';
      $scope.silhouetteColor = $scope.silhouetteColor || '#292935';
      $scope.questImage = $scope.questImage || "quests/scholar.png";

      setTitle();
    }

    function setTitle() {
      $rootScope.title = "Daily Quiz Questions | Wisr";
      $scope.title = "Daily quiz questions";

      if ($scope.lesson)
        $scope.title = [$scope.lesson.name, "Quiz"].join(" ");
      else if ($scope.currentAsker)
        $scope.title = ["Daily", $scope.currentAsker.subject, "questions"].join(" ");

      if ($scope.lesson || $scope.currentAsker)
        $rootScope.title = [$scope.title, "| Wisr"].join(" ");
    } 

    init();
  });
