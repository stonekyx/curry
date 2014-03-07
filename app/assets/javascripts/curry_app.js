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
    }
  };
}).call(this, jQuery);
