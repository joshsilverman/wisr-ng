'use strict';

angular.module('wisrNgApp').factory('CurrentUserRsrc', function($resource, Paths) {
    return $resource(Paths.apiURL + '/users/me.json', {}, {});
  }
);
