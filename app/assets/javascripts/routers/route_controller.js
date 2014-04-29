(function($) {
  /**
   * @class: Broadcaster is a central events instance for necessary event proxy.
   * @usage: bind, unbind, on, off, trigger.
   */

  Curry.Routers.Broadcaster = {};
  _.extend(Curry.Routers.Broadcaster, Backbone.Events);

  /**
   * @class: RouteController implements the basic functionality of a Controller.
   * @usage: A specific controller is used to handle a specific url.
   */

  Curry.Routers.RouteController = Support.SwappingRouter.extend({
    /* Local Variables */

    // The name will be used as a key to store controller history state.
    name: 'route',

    // The current view of the controller
    currentView: null,

    swapTimeoutThreshold: 500,
    _isFirstLoad: null,

    /* Page Data Functions */

    initialize: function() {
      this._attachRootEl();
      this._attachEvents();
    },

    // Find the root element of content view.
    _attachRootEl: function() {
      this.el = $('#content-container');
    },

    // Attach events to the router.
    _attachEvents: function() {
      Curry.Utils.EventManager.bind(Curry.Events.Views.BEFORE_SWAP, this._retrieveFrame, this);
    },

    /* Swapping Functions */

    // Override this method in backbone to inject routes in sub routers.
    route: function(route, name, callback) {
      Backbone.history || (Backbone.history = new History);
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);

      Backbone.history.route(route, _.bind(function(fragment) {
        var args = this._extractParameters(route, fragment);
        //NOTE: zacky, make sure 'name.split' is correct.
        var callbackGuide = name.split('.');
        if (callbackGuide && callbackGuide.length == 2) {
          var subRouterClass = Curry.Routers[callbackGuide[0]];
          if (subRouterClass) {
            var subRouter = new subRouterClass();
            var callback  = subRouter['_actionHandler'];
            subRouter.router = this;
            args.unshift(callbackGuide[1]);

            callback.apply(subRouter, args);
          }
        }
      }, this));
    },

    // Retrieve frame beforehand, like header & footer.
    _retrieveFrame: function() {
      var headerRouter = new Curry.Routers.HeaderController();
      var callback = headerRouter['index'];
      callback.apply(headerRouter);

      var footerRouter = new Curry.Routers.FooterController();
      var callback = footerRouter['index'];
      callback.apply(footerRouter);
    },

    // Swap to the new view.
    swap: function(view) {
      this._isFirstLoad = Curry.Utils.isBlank(this.currentView);
      this.currentView = view;
      if (this._isFirstLoad) {
        //TODO: zanwen, should do something here, like bind events etc.
      }

      this._beforeSwap();
      this._tryToSwap();
      //TODO: zanwen, should move the _afterSwap logic to _tryToSwap, since it can be saved with error page.
      this._afterSwap();
    },

    _beforeSwap: function() {
      Curry.Events.COLLECTION.trigger(Curry.Events.Views.BEFORE_SWAP);
    },

    _tryToSwap: function() {},

    _afterSwap: function() {
      $(this.el).empty().append(this.currentView.render().el);
      this.currentView.afterRender();
    }
  });
}).call(this, jQuery);
