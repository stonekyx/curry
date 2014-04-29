(function($) {
  /**
   * @class: ProjectsController implements routing stuffs in projects page.
   */
  Curry.Routers.ProjectsController = Curry.Routers.BaseController.extend({
    name: 'projects',

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
