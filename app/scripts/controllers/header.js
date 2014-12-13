'use strict';

/**
 * @ngdoc function
 * @name wisrNgApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the wisrNgApp
 */
angular.module('wisrNgApp')
  .controller('HeaderCtrl', function ($scope, $rootScope, CurrentUser, Paths) {
    var init = function() {
      loadCurrentUser();

      $scope.assetBasePath = Paths.assets;
      $rootScope.assetBasePath = Paths.assets;
      $scope.imageBaseURL = Paths.imageBaseURL;
      $scope.Paths = Paths;
    };

    $scope.openDrawer = function() {
      $rootScope.$emit('FeedCtrl:open');
    };

    function loadCurrentUser() {
      CurrentUser(function(_currentUser) {
        $scope.currentUser = _currentUser;
        $scope.authenticated = $scope.currentUser.id;
      });
    }

    init();
  });
