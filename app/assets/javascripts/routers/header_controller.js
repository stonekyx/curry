(function($) {
  /**
   * @class: HeaderController implements header stuffs of all pages.
   */
  Curry.Routers.HeaderController = Curry.Routers.BaseController.extend({
    name: 'header',

    context: 'banner',

    _template: 'header/index',

    index: function() {
      this._generatePageConfigs(this.contextKey);
      this._generatePageModels(this.pageConfigs);
      var headerView = new Curry.Views.Header({template: this._template, context: this.context, models: this.pageModels});
      $('#header-container').empty().append(headerView.render().el);
    },

    _generatePageModels: function(configs) {
      this.pageModels = {};
      this.pageModels['coreModel'] = {isLoggedIn: Curry.Helpers.Observer.isLoggedIn()};
      if (Curry.Helpers.Observer.isLoggedIn()) {
        this.pageModels.coreModel.userName = Curry.Utils.Str.capitalize(Curry.Helpers.Observer.getUserName());
      }

      return this.pageModels;
    },

  });
}).call(this, jQuery);
