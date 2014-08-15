angular.module('wisrNgApp')
  .factory('CurrentUser', function(Paths, CurrentUserRsrc) {
    var loaded = false,
      callbacks = [],
      loading = false,
      currentUser,
      id, email, twi_screen_name;

    var get = function() {
      if (loading) return;

      loading = true;
      CurrentUserRsrc.get({}, function(data) {
        currentUser = data;
        runCallbacks();
      });
    };

    var runCallbacks = function() {
        angular.forEach(callbacks, function(callback) {
          callback(currentUser);
        });
    };

    var getOnce = function(callback) {
      if (currentUser)
        callback(currentUser);
      else
        callbacks.push(callback);
        get();
    };

    return getOnce;
  });