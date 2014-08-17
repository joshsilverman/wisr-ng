'use strict';

/**
 * @ngdoc function
 * @name wisrNgApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the wisrNgApp
 */
angular.module('wisrNgApp')
  .controller('HeaderCtrl', function ($scope, $rootScope) {
    var init = function() {
    };

    $scope.openDrawer = function() {
      $rootScope.$emit('FeedCtrl:open');
    };

    init();
  });
