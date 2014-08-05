angular.module('wisrNgApp')
  .factory('CurrentUser', function(Paths, CurrentUserRsrc) {
    var loaded = false,
      currentUser,
      id, email, twi_screen_name;
    console.log('init currentUser');

    CurrentUserRsrc.get({}, function(data) {
      if (data.id) {
        currentUser = {};

        currentUser.id = data.id;
        currentUser.email = data.email;
        currentUser.twi_screen_name = data.twi_screen_name;
      }
    })

    return {
      currentUser: function() { return currentUser; }
    };
  });