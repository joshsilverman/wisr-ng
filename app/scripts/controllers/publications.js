'use strict';

angular.module('wisrNgApp')
  .controller('PublicationsCtrl', function($scope, $timeout, $routeParams, $route, PublicationsRsrc, CorrectQuestionIdsRsrc) {
    var offset, loadingPublications, asker;

    var init = function() {
      $scope.publications = [];
      offset = 0;

      $scope.$watch('correctQIds', broadcastCorrectAnswersLoaded);
      $scope.$watch('publications', broadcastCorrectAnswersLoaded);
      $scope.$on('FeedCtrl:currentUserLoaded', afterCurrentUserLoaded);
      $scope.$on('FeedCtrl:inFocusPublicationLoaded', onInFocusPublicationLoaded);
    };

    function afterCurrentUserLoaded() {
      loadPublications();
      loadCorrectAnswers();
    }

    function loadPublications(callback) {
      var params = {offset: offset};
      if ($routeParams.subjectURL)
        params.subjectURL = $routeParams.subjectURL;
      else
        $scope.index = true;

      function callback(data) {
        console.log(data);
        $scope.publications = $scope.publications.concat(data);
        loadingPublications = false;
        dedupePublications();
      }

      loadingPublications = true;
      if ($route.current.$$route.params.new)
        PublicationsRsrc.queryNew(params, callback);
      else
        PublicationsRsrc.query(params, callback);
    };

    function onInFocusPublicationLoaded(e, rsrc) {
      $scope.publications.unshift(rsrc);
      $scope.inFocusPublication = rsrc;

      dedupePublications();
    }

    function dedupePublications() {
      $scope.publications = _.uniq($scope.publications, false, function(pub) {
        if (pub.id)
          return pub.id;
        else
          return pub;
      });
    }

    function loadCorrectAnswers() {
      if (!$scope.currentUser.id) return;

      CorrectQuestionIdsRsrc.query({currentUserId: $scope.currentUser.id},
        function(correctQIds) {
          $scope.correctQIds = correctQIds;
      });
    };

    function broadcastCorrectAnswersLoaded() {
      if (!$scope.correctQIds) return;
      $timeout(function() {
        $scope.$broadcast('PublicationsCtrl:correctQIds:loaded', $scope.correctQIds);
      });
    };

    $scope.loadMore = function() {
      if (loadingPublications) {return;}
      if ($scope.publications.length == 0) {return;}

      offset += 10;
      loadPublications();
    };

    $scope.isInFocus = function(publicationId) {
      if (!$scope.inFocusPublication) return;

      if (!publicationId) return;

      if (publicationId == $scope.inFocusPublication.id)
        return true;
    }

    init();
  });
