'use strict';

/**
 * @ngdoc function
 * @name wisrNgApp.directive:Header
 * @description
 * # Header
 */
angular.module('wisrNgApp')
  .directive('header', function ($rootScope, CurrentUser, Paths) {
    var link = function(scope, element, attrs) {
      loadCurrentUser(scope);

      scope.assetBasePath = Paths.assets;
      $rootScope.assetBasePath = Paths.assets;
      scope.imageBaseURL = Paths.imageBaseURL;
      scope.Paths = Paths;

      scope.openDrawer = function() {
        $rootScope.$emit('FeedCtrl:open');
      };
    };


    function loadCurrentUser(scope) {
      CurrentUser(function(_currentUser) {
        scope.currentUser = _currentUser;
        scope.authenticated = scope.currentUser.id;
      });
    }

    return {
      templateUrl: '/scripts/components/header/header.html',
      restrict: 'E',
      // scope: {
      //   asker: '=',
      //   editMode: '&',
      //   showAnsweredCounts: '&',
      //   currentUser: '='
      // },
      link: function (scope, element, attrs) {
        var linkArgs = arguments;
        link(scope, element, attrs);
        // scope.$watch('asker', function() {
        //   init.apply(this, linkArgs);
        // });
      }
    };
  });
