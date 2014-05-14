(function($) {
  /**
   * @namespace Url Utils
   */
  Curry.Utils.Url = {
    setLocation: function(url) {
      window.location = url;
    },

    getLocation: function() {
      return window.location;
    },

    getHref: function() {
      return window.location.href;
    },

    getOrigin: function() {
      return window.location.origin;
    },

    getProtocal: function() {
      return window.location.protocal;
    },

    getHost: function() {
      return window.location.host;
    },

    getPathname: function() {
      return window.location.pathname;
    },

    getPathnameLocation: function() {
      var pathLoc = this.getPathname();

      if (/^\/thanks.*/.test(pathLoc)) {
        pathLoc = 'signup';
      } else if (/^\/browse.*/.test(pathLoc)) {
        pathLoc = '/dashboard';
      }

      return pathLoc;
    },

    /* Load Page */
    load: function(url) {
      document.location.href = url;
    },

    /* Reload Page */
    reload: function() {
      window.location.reload();
    }
  };
}).call(this, jQuery);
