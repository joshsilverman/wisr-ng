'use strict';

/**
 * @ngdoc directive
 * @name wisrNgApp.directive:quizquestion
 * @description
 * # quizquestion
 */
angular.module('wisrNgApp')
  .directive('quizquestion', function () {
    return {
      templateUrl: '/views/quizmaker/_new_question.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        
      }
    };
  });
