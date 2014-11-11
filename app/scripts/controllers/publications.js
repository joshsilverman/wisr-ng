'use strict';

angular.module('wisrNgApp')
  .controller('PublicationsCtrl', function($scope, $q, $timeout, $routeParams, $route, PublicationsRsrc, CorrectQuestionIdsRsrc, RatingsRsrc) {
    var offset, loadingPublications, asker, correctQIds, ratings;

    var init = function() {
      $scope.publications = [];
      offset = 0;

      $scope.$on('FeedCtrl:currentUserLoaded', afterCurrentUserLoaded);
      $scope.$on('FeedCtrl:inFocusPublicationLoaded', onInFocusPublicationLoaded);
      $(window).on('ios:refresh', iOSRefresh);
    };

    function afterCurrentUserLoaded() {
      var promises = [fetchPublications()];
      if ($scope.currentUser.id) {
        promises.push(CorrectQuestionIdsRsrc.query({currentUserId: $scope.currentUser.id}).$promise);
        promises.push(RatingsRsrc.query().$promise);
      }

      $q.all(promises).then(afterFetchPublications);
    }

    function fetchPublications() {
      var params = {offset: offset};
      if ($routeParams.subjectURL)
        params.subjectURL = $routeParams.subjectURL;
      else
        $scope.index = true;

      loadingPublications = true;
      if ($route.current.$$route.params.new) {
        $scope.$emit('PublicationsCtrl:newFeedLoaded');
        return PublicationsRsrc.queryNew(params).$promise;
      } else if ($route.current.$$route.params.lesson) {
        params.lesson = $routeParams.lesson;
        return PublicationsRsrc.queryLesson(params).$promise;
      }
      else {
        return PublicationsRsrc.query(params).$promise;
      }
    };

    function iOSRefresh() {
      PublicationsRsrc.query({offset: 0}, function(data) {
        window.location.href = 'ios://refreshed';
        $scope.publications = [];
        afterFetchPublications([data])
      });
    }

    function afterFetchPublications(data) {
      var publications = data[0];
      correctQIds = correctQIds || data[1];
      ratings = ratings || data[2];

      $scope.publications = $scope.publications.concat(publications);
      loadingPublications = false;
      dedupePublications();
      emitLesson();

      if (correctQIds) {
        $timeout(function() {
          $scope.$broadcast('PublicationsCtrl:correctQIds:loaded', correctQIds);
        });
      }

      if (ratings) {
        $timeout(function() {
          $scope.$broadcast('PublicationsCtrl:ratings:loaded', ratings);
        });
      }
    }

    function emitLesson() {
      if ($scope.publications.length) {
        var lesson = $scope.publications[0]._lesson;

        if (lesson && $route.current.$$route.params.lesson) {
          $scope.$emit('PublicationsCtrl:lessonLoaded', lesson);
        }
      }
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

    $scope.loadMore = function() {
      if (loadingPublications) {return;}
      if ($scope.publications.length == 0) {return;}
      if ($route.current.$$route.params.lesson) {return;}

      offset += 10;
      $q.all([fetchPublications()]).then(afterFetchPublications);
    };

    $scope.isInFocus = function(publicationId) {
      if (!$scope.inFocusPublication) return;

      if (!publicationId) return;

      if (publicationId == $scope.inFocusPublication.id)
        return true;
    }

    init();
  });
