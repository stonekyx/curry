(function($) {
  /**
   * @class: DashboardController implements routing stuffs in dashboard page.
   */
  Curry.Routers.DashboardController = Curry.Routers.BaseController.extend({
    name: 'dashboard',

    CONTEXT: {
      DASHBOARD: 'dashboard'
    },

    _template: {
      index: 'dashboard/index'
    },

    index: function() {
      return this.swap(new Curry.Views.Dashboard({template: this._template.index, context: this.CONTEXT.DASHBOARD}));
    }
  });
}).call(this, jQuery);
