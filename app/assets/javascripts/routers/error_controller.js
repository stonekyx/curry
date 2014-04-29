(function($) {
  /**
   * @class: ErrorController implements routing stuffs in error page.
   */
  Curry.Routers.ErrorController = Curry.Routers.BaseController.extend({
    name: 'error',

    CONTEXT: {
      ERROR: 'error'
    },

    _template: {
      error: 'error/index'
    },

    index: function(path) {
      Curry.navigate(Curry.Constants.URL.PAGE.ERROR, {replace: true, needRefresh: false});
      return this.swap(new Curry.Views.Error({template: this._template.error, context: this.CONTEXT.ERROR}));
    }
  });
}).call(this, jQuery);
