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
        baseURL: 'http://dev.localhost'
      },
      production: {
        baseURL: 'http://wisr.com'
      }
    };

    return { 
      'assets': 'https://wisr-herokuapp-com.global.ssl.fastly.net/assets',
      'imageBaseURL': envDependentPaths[ENV.name].baseURL + '/assets',
      'authBaseURL': 'https:/www.wisr.com',
      'apiURL': envDependentPaths[ENV.name].baseURL,
      'legacyURL': envDependentPaths[ENV.name].baseURL };
  });