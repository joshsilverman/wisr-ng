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
    'angularMoment',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true);
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;

    $routeProvider
      .when('/', {
        templateUrl: '/views/feed_index.html',
        controller: 'FeedCtrl',
        params: {}
      })
      .when('/:subjectURL', {
        templateUrl: '/views/feed.html',
        controller: 'FeedCtrl',
        params: {}
      })
      .when('/:subjectURL/new', {
        templateUrl: '/views/feed.html',
        controller: 'FeedCtrl',
        params: {new: true}
      })
      .when('/:subjectURL/:publicationId', {
        templateUrl: '/views/feed.html',
        controller: 'FeedCtrl',
        params: {}
      })
      .when('/:subjectURL/:lesson/quiz', {
        templateUrl: '/views/feed.html',
        controller: 'FeedCtrl',
        params: {lesson: true}
      })
      .when('/:subjectURL/quiz/new', {
        templateUrl: '/scripts/components/quizmaker/new.html',
        controller: 'QuizmakerCtrl',
        params: {'new': true}
      })
      .when('/:subjectURL/quiz/:id', {
        templateUrl: '/scripts/components/quizmaker/new.html',
        controller: 'QuizmakerCtrl',
        params: {edit: true}
      })
      .otherwise({
        templateUrl: '/views/feed.html',
        controller: 'FeedCtrl'
      });
  });
