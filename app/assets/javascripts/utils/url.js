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

    getProtocal: function() {
      return window.location.protocal;
    },

    getHost: function() {
      return window.location.host;
    },

    getOrigin: function() {
      return window.location.origin;
    },

    getHref: function() {
      return window.location.href;
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
