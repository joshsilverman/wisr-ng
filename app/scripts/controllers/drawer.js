'use strict';

angular.module('wisrNgApp')
  .controller('DrawerCtrl', function($scope, AskersRsrc, Paths) {
    var init = function() {
      AskersRsrc.query().$promise.then(function(_askers) {
        $scope.askers = _.filter(_askers, function(asker) {
          return asker.published;
        });
      });
    };

    init()
  });