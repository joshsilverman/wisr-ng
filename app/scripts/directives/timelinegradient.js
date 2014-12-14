'use strict';

/**
 * @ngdoc directive
 * @name wisrNgApp.directive:timelineGradient
 * @description
 * # timelineGradient
 */
angular.module('wisrNgApp')
  .directive('timelineGradient', function () {
    function link(scope, element, attrs) {
      // @ugly style fade out of timeline
      var style = [
        '<style>',
        'ul.timeline:before{',
        'background: linear-gradient(to top, rgba(255, 255, 255, 0) 0%, ',
        scope.bgColor,
        ' 100%);',
        '}',
        '</style>'].join('');
      $('head').append(style);
    }

    return {
      restrict: 'A',
      scope: {
        bgColor: '='
      },
      link: function postLink(scope, element, attrs) {
        scope.$watch('bgColor', function() {
          link(scope, element, attrs);
        });
      }
    };
  });
