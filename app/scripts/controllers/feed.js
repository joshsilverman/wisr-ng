'use strict';

/**
 * @ngdoc function
 * @name wisrNgApp.controller:FeedCtrl
 * @description
 * # FeedCtrl
 * Controller of the wisrNgApp
 */
angular.module('wisrNgApp')
  .controller('FeedCtrl', function ($scope, $routeParams, PublicationsRsrc, Paths) {
    $scope.assetBasePath = Paths.assets;

    PublicationsRsrc.query({subjectURL: $routeParams.subjectURL}, function(data) {
        $scope.publications = data;
    });
  });