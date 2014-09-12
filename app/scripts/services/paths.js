'use strict';

/**
 * @ngdoc service
 * @name wisrNgApp.paths
 * @description
 * # paths
 * Factory in the wisrNgApp.
 */
angular.module('wisrNgApp')
  .factory('Paths', function (ENV) {
    var envDependentPaths = {
      development: {
        baseURL: 'http://dev.localhost',
        assetsBaseURL: 'http://dev.localhost'
      },
      production: {
        baseURL: 'https://www.wisr.com',
        assetsBaseURL: 'https://www.wisr.com' // 'https://d1dvglagckiwr1.cloudfront.net'
      }
    };

    return {
      'assets': envDependentPaths[ENV.name].assetsBaseURL + '/assets',
      'imageBaseURL': envDependentPaths[ENV.name].baseURL + '/assets',
      'authBaseURL': 'https://www.wisr.com',
      'apiURL': envDependentPaths[ENV.name].baseURL,
      'legacyURL': envDependentPaths[ENV.name].baseURL };
  });
