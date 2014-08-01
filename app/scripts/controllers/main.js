'use strict';

/**
 * @ngdoc function
 * @name wisrNgApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wisrNgApp
 */
angular.module('wisrNgApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
