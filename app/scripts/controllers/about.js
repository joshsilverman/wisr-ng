'use strict';

/**
 * @ngdoc function
 * @name wisrNgApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the wisrNgApp
 */
angular.module('wisrNgApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
