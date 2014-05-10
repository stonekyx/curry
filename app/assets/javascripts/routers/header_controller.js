(function($) {
  /**
   * @class: HeaderController implements header stuffs of all pages.
   */
  Curry.Routers.HeaderController = Curry.Routers.BaseController.extend({
    name: 'header',

    context: 'banner',

    _template: 'header/index',

    index: function() {
      this._preparePageData(arguments);
      var headerView = new Curry.Views.Header({template: this._template, context: this.context, data: this.pageData});
      $('#header-container').empty().append(headerView.render().el);
    },

    _preparePageData: function(queryParams) {
      this.pageData = {isLoggedIn: Curry.Helpers.Observer.isLoggedIn()};
      if (Curry.Helpers.Observer.isLoggedIn()) {
        this.pageData.userName = Curry.Utils.Str.capitalize(Curry.Helpers.Observer.getUserName());
      }

      return this.pageData;
    },

  });
}).call(this, jQuery);
