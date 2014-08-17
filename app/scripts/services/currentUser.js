angular.module('wisrNgApp')
  .factory('CurrentUser', function($timeout, Paths, CurrentUserRsrc) {
    var loaded = false,
      callbacks = [],
      loading = false,
      currentUser,
      id, email, twi_screen_name;

    var get = function() {
      if (loading) return;

      loading = true;
      CurrentUserRsrc.get({}, runCallbacks, runCallbacks);
    };

    var runCallbacks = function(data) {
      currentUser = data;
      angular.forEach(callbacks, function(callback) {
        callback(currentUser);
      });
    };

    var getOnce = function(callback) {
      if (currentUser)
        $timeout(function() {callback(currentUser)});
      else
        callbacks.push(callback);
        get();
    };

    return getOnce;
  });