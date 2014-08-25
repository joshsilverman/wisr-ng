'use strict';

angular.module('wisrNgApp')
  .controller('PublicationsCtrl', function($scope, $timeout, $routeParams, PublicationsRsrc, CorrectQuestionIdsRsrc) {
    var offset, loadingPublications, asker;

    var init = function() {
      $scope.publications = [];
      offset = 0;

      $scope.$watch('correctQIds', broadcastCorrectAnswersLoaded);
      $scope.$watch('publications', broadcastCorrectAnswersLoaded);
      $scope.$on('FeedCtrl:currentUserLoaded', afterCurrentUserLoaded);
    };

    var afterCurrentUserLoaded = function() {
      loadPublications();
      loadCorrectAnswers();
    }

    var loadPublications = function(callback) {
      var params = {offset: offset};
      if ($routeParams.subjectURL)
        params.subjectURL = $routeParams.subjectURL;
      else
        $scope.index = true;

      loadingPublications = true;
      PublicationsRsrc.query(params, 
        function(data) {
          $scope.publications = $scope.publications.concat(data);
          loadingPublications = false;
      });
    };

    var loadCorrectAnswers = function() {
      if (!$scope.currentUser.id) return;
      
      CorrectQuestionIdsRsrc.query({currentUserId: $scope.currentUser.id}, 
        function(correctQIds) {
          $scope.correctQIds = correctQIds;
      });
    };

    var broadcastCorrectAnswersLoaded = function() {
      if (!$scope.correctQIds) return;
      $timeout(function() {
        $scope.$broadcast('PublicationsCtrl:correctQIds:loaded', $scope.correctQIds);
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