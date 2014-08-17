'use strict';

/**
 * @ngdoc service
 * @name wisrNgApp.paths
 * @description
 * # paths
 * Constant in the wisrNgApp.
 */
angular.module('wisrNgApp')
  .constant('Paths', {
    'assets': 'https://wisr-herokuapp-com.global.ssl.fastly.net/assets',
    'imageBaseURL': 'http://dev.localhost/assets',
    'authBaseURL': 'https:/www.wisr.com',
    'apiURL': 'http://dev.localhost',
    'legacyURL': 'http://dev.localhost'
  });