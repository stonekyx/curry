(function($) {
  window.Curry = {
    /* Init Namespaces */
    Models:   {},
    Views:    {},
    Controls: {},
    Routers:  {},
    Helpers:  {},
    Configs:  {},

    /* Init Variables */
    hasInited:  false,
    isSwapping: false,
    navigationHistory: [],

    // Add navigation history
    _addNavigationHistory: function(url) {
      this.navigationHistory.push(url);
    },

    // Setup events
    _setupEvents: function() {},

    init: function() {
      // Init the navigation history with the referrer.
      this._addNavigationHistory(document.referrer);

      Curry.router = new Curry.Routers.MainController();

      this._setupEvents();
      this.hasInited = true;
    },

    run: function() {
      Backbone.history.start({ pushState: true });
    },

    navigate: function(pathname, options) {
      if (Curry.Utils.isBlank(pathname)) {
        pathname = '/';
      }

      //NOTE: stone, please make sure this is correct and standard.
      Backbone.history.navigate(pathname, options);
      Curry.Utils.Url.load(Curry.Utils.Url.getOrigin() + pathname);
    }
  };
}).call(this, jQuery);
