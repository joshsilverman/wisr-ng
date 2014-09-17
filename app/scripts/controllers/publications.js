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
      fetchPublications();
      loadCorrectAnswers();
    }

    function fetchPublications() {
      var params = {offset: offset};
      if ($routeParams.subjectURL)
        params.subjectURL = $routeParams.subjectURL;
      else
        $scope.index = true;

      loadingPublications = true;
      if ($route.current.$$route.params.new) {
        PublicationsRsrc.queryNew(params, afterFetchPublications);
        $scope.$emit('PublicationsCtrl:newFeedLoaded');
      } else if ($route.current.$$route.params.lesson) {
        params.lesson = $routeParams.lesson;
        PublicationsRsrc.queryLesson(params, afterFetchPublications);
        $scope.$emit('PublicationsCtrl:newFeedLoaded');
      }
      else {
        PublicationsRsrc.query(params, afterFetchPublications);
      }
    };

    function afterFetchPublications(data) {
      $scope.publications = $scope.publications.concat(data);
      loadingPublications = false;
      dedupePublications();
    }

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
      if ($route.current.$$route.params.lesson) {return;}

      offset += 10;
      fetchPublications();
    };

    $scope.isInFocus = function(publicationId) {
      if (!$scope.inFocusPublication) return;

      if (!publicationId) return;

      if (publicationId == $scope.inFocusPublication.id)
        return true;
    }

    init();
  });
