'use strict';

/**
 * @ngdoc directive
 * @name wisrNgApp.directive:wsrSnap
 * @description
 * # wsrSnap
 */
angular.module('wisrNgApp')
  .directive('wsrSnap', function ($rootScope) {
    function postLink(scope, element, attrs) {
      var snapper;
      
      if ($('body.phone-variant').length > 0) return;

      $rootScope.$on('FeedCtrl:open', function() {
        snapper = new Snap({
          element: $('.main-view')[0],
          disable: 'right',
          touchToDrag: false
        });

        snapper.on('animated', function() {
          if ($('.main-view').css('transform') !== 'none') {
            return;
          }
          return $('.drawer').removeClass('show');
        });
        setInterval(function() {
          if ($('.main-view').css('transform') !== 'none' && $('.main-view').css('transform') !== 'matrix(1, 0, 0, 1, 0, 0)') {
            return;
          }
          return $('.drawer').removeClass('show');
        }, 10);
        snapper.on('animating', function() {
          return $('.drawer').addClass('show');
        });
        snapper.on('open', function() {
          return $('.drawer').addClass('show');
        });
        snapper.on('drag', function() {
          return $('.drawer').addClass('show');
        });

        snapper.open('left');
      });
    }

    return {
      link: postLink
    };
  });