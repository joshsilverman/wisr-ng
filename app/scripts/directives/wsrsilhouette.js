'use strict';

/**
 * @ngdoc directive
 * @name wisrNgApp.directive:silhouette
 * @description
 * # silhouette
 */

angular.module('wisrNgApp')
  .directive('wsrSilhouette', function ($http, $sce, Paths) {
    return {
      templateUrl: "/views/shared/_silhouette.html",
      restrict: 'E',
      scope: {
        currentAsker: '=currentasker'
      },
      link: function postLink(scope, element, attrs) {

        function fetchSilhouette() {
          $http.get(Paths.imageBaseURL + "/" + scope.silhouetteImage)
            .success(function(data) {
              scope.silhouette = $sce.trustAsHtml(data);
            }
          );
        }

        function askerLoaded() {
          if (!scope.currentAsker) { return };

          scope.bgColor = scope.currentAsker.styles["bg_color"];
          scope.silhouetteColor = scope.currentAsker.styles["silhouette_color"];
          
          scope.silhouetteImage = scope.currentAsker.styles["silhouette_image"];
          scope.silhouetteImage = scope.silhouetteImage || 'bg_images/nature.svg';
          fetchSilhouette();
        }

        scope.$watch('currentAsker', askerLoaded);
      }
    };
  });
