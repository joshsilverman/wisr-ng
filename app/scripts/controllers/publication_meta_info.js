'use strict';

/**
 * @ngdoc function
 * @name wisrNgApp.controller:PublicationMetaInfoCtrl
 * @description
 * # PublicationMetaInfoCtrl
 * Controller of the wisrNgApp
 */
angular.module('wisrNgApp')
  .controller('PublicationMetaInfoCtrl', function ($scope) {
    function init() {
      $scope.author = $scope.publication._question.author_twi_screen_name
      $scope.created_at = $scope.publication._question.created_at
    }

    init();
  });
