'use strict';

/**
 * @ngdoc function
 * @name wisrNgApp.controller:StreamCtrl
 * @description
 * # StreamCtrl
 * Controller of the wisrNgApp
 */
angular.module('wisrNgApp')
  .controller('StreamCtrl', function ($scope, Paths, StreamRsrc) {
    var init = function() {
      $scope.questionBaseURL = Paths.legacyURL + "/questions";

      StreamRsrc.query({}, function(data) {
        $scope.streamItems = data;
      });
    };

    $scope.navToURL = function(href) {
      document.location.href = href;
    };

    init();
  });
