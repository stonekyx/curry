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

    _startAction: function(contextKey) {
      this._generatePageConfigs(contextKey);
      this._generatePageModels(this.pageConfigs);
      return this.swap(new Curry.Views.Home({template: this._template, context: contextKey, models: this.pageModels}));
    },

    _generatePageModels: function(configs) {
      this.pageModels = {};
      this.pageModels['player'] = new Curry.Models.GamePlayer({class_prefix: 'figure'});

      return this.pageModels;
    },

    index: function() {
      this._startAction(this.CONTEXT.HOME);
    }
  });
}).call(this, jQuery);
