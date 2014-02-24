(function($) {
  /**
   * @class: BaseView implements the basic functionality of a View.
   */
  Curry.Views.BaseView = Backbone.View.extend({
    /* Local Variables */

    // The name will be used as a key to store page location.
    name: 'baseView',

    // The events will be used in a specific page.
    events: {},

    /* Page Data Functions */

    initialize: function(options) {
      this._super("initialize", options);
      this._template = options.template;
      this._context  = options.context;
    },

    /* Rendering Functions */

    renderTemplate: function(templatePath, data) {
      var rootPath = 'templates/';
      return JST[rootPath + templatePath](data);
    },

    renderFramework: function() {
      if (Curry.Utils.isBlank(this._template) || Curry.Utils.isBlank(this._context)) {
        //TODO: zanwen, should throw exceptions here.
      }
      $(this.el).attr('id', 'main');
      $(this.el).html(this.renderTemplate(this._template));
      this._container = $(this.el).find('#' + this._context + '-container');
    },

    // Internal render method for sub class to override to implement different features.
    renderInternal: function() {},

    beforeRender: function() {},

    render: function() {
      this.renderFramework();
      this.renderInternal();
      return this;
    },

    afterRender: function() {}
  });
}).call(this, jQuery);
