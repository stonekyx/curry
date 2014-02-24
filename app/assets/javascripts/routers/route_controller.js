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
    name: 'routeController',

    pageModels:  null,
    pageView:    null,

    swapTimeoutThreshold: 500,
    _isFirstLoad: null,

    /* Page Data Functions */

    initialize: function() {
      this._attachRootEl();
    },

    // Find the root element of content view.
    _attachRootEl: function() {
      this.el = $('#content-container');
    },

    _getPageModels: function() {
      return this.pageModels || [];
    },

    _getPageView: function() {
      return this.pageView;
    },

    /* Swapping Functions */

    // Override this method in backbone to inject routes in sub routers.
    route: function(route, name, callback) {
      Backbone.history || (Backbone.history = new History);
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);

      var self = this;
      Backbone.history.route(route, function(fragment) {
        var args = self._extractParameters(route, fragment);
        var callbackGuide = self.routes[fragment].split('.');
        if (callbackGuide && callbackGuide.length == 2) {
          var subRouterClass = Curry.Routers[callbackGuide[0]];
          if (subRouterClass) {
            var subRouter = new subRouterClass(this);
            var callback  = subRouter['_actionHandler'];
            subRouter.router = self;
            args.unshift(callbackGuide[1]);

            callback.apply(subRouter, args);
          }
        }
      });
    },

    // Swap to the new view.
    swap: function(view) {
      if (view == null) {
        // TODO: zanwen, should throw exceptions here.
      }
      this._isFirstLoad = Curry.Utils.isBlank(this.pageView);
      this.pageView = view;
      if (this._isFirstLoad) {
        //TODO: zanwen, should do something here, like bind events etc.
      }

      this._beforeSwap();
      this._preparePageData();
      //TODO: zanwen, should move the _afterSwap logic to _preparePageData, since it can be saved with error page.
      this._afterSwap();
    },

    _beforeSwap: function() {},

    _preparePageData: function() {},

    _afterSwap: function() {
      $(this.el).empty().append(this.pageView.render().el);
    }
  });
}).call(this, jQuery);
