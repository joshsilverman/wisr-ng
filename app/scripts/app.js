'use strict';

/**
 * @ngdoc overview
 * @name wisrNgApp
 * @description
 * # wisrNgApp
 *
 * Main module of the application.
 */
angular
  .module('wisrNgApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'config',
    'infinite-scroll',
    'angularMoment'
  ])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    // $locationProvider.html5Mode(true);
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;

    $routeProvider
      .when('/:subjectURL', {
        templateUrl: 'views/feed.html',
        controller: 'FeedCtrl'
      })
      .otherwise({
        templateUrl: 'views/feed.html',
        controller: 'FeedCtrl'
      });
  });
