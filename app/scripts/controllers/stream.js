'use strict';

/**
 * @ngdoc function
 * @name wisrNgApp.controller:StreamCtrl
 * @description
 * # StreamCtrl
 * Controller of the wisrNgApp
 */
angular.module('wisrNgApp')
  .controller('StreamCtrl', function ($scope, $timeout, Paths, StreamRsrc, Pusher) {
    function init() {
      $scope.questionBaseURL = Paths.legacyURL + "/questions";

      StreamRsrc.query({}, function(data) {
        $scope.streamItems = data;

        _.each($scope.streamItems, function(item) {
          item.appear = true;
        });
      });

      subscribeToStream();
    };

    function subscribeToStream() {
      try {
        var channel = Pusher.subscribe('stream', 'answer', afterAnswerPub);
      } catch(err) {}
    }

    function afterAnswerPub(post) {
      $scope.streamItems.unshift(post);

      $timeout(function() {
          post.appear = true;
        });

      $timeout(function() {
          $scope.streamItems.pop();
        }, 500);
    }

    $scope.navToURL = function(href) {
      document.location.href = href;
    };

    init();
  });
