angular.module('wisrNgApp')
  .factory('Auth', function(Paths) {
    return {
      logout: function() {  },
      login: function() {
        location.href = Paths.legacyURL + '/users/sign_in';
      }
    };
  });