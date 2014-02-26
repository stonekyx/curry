(function($) {
  /**
   * @class: HomeController implements routing stuffs in home page.
   */
  Curry.Routers.HomeController = Curry.Routers.BaseController.extend({
    name: 'home',

    // Context keys Collections
    CONTEXT: {
      HOME: 'home'
    },

    _template: 'home/index',
    _models: {},

    _startAction: function(contextKey) {
      this._generatePageConfigs(contextKey);
      if(Curry.Verifier.isAnonymousUser()) {
          // TODO: zanwen, need to handle params in a centralized way.
          this._models.gamePlayer = new Curry.Models.GamePlayer({class_prefix: 'figure'});
      } // TODO: stone, consider other situations.
      return this.swap(new Curry.Views.Home({template: this._template, context: contextKey, models: this._models}));
    },

    index: function() {
      this._startAction(this.CONTEXT.HOME);
    }
  });
}).call(this, jQuery);
