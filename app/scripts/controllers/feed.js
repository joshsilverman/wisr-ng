'use strict';

/**
 * @ngdoc function
 * @name wisrNgApp.controller:FeedCtrl
 * @description
 * # FeedCtrl
 * Controller of the wisrNgApp
 */
angular.module('wisrNgApp')
  .controller('FeedCtrl', function ($scope, Publications, Paths) {
    $scope.assetBasePath = Paths.assets;

    Publications.query({}, function(data) {
        $scope.publications = data;
    });
  });
