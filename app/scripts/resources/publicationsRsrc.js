'use strict';

//Publications service used for publications REST endpoint
angular.module('wisrNgApp').factory('PublicationsRsrc', function($resource, Paths) {
  return $resource(Paths.apiURL + '/:subjectURL.json?offset=:offset',
    {subjectURL: 'index'}, {
      queryNew: {
        url: Paths.apiURL + '/:subjectURL/new.json?offset=:offset',
        isArray: true
      }
    });
});
