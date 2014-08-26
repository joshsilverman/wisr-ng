'use strict';

angular.module('wisrNgApp')
  .directive('wsrStellar', function() {
    return {
      restrict: 'A',
      link: function(scope, elem) {
        console.log('link stellar');
        var ua = navigator.userAgent;
        var isMobileWebkit = /WebKit/.test(ua) && /Mobile/.test(ua);

        if (!isMobileWebkit) {
          $(window).stellar({
            horizontalScrolling: false
          });
        }
      },
    };
  });