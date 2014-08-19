'use strict';

angular.module('wisrNgApp').factory('SignOutRsrc', function($resource, Paths) {
    return $resource(Paths.apiURL + '/users/signout', {}, {});
  }
);
