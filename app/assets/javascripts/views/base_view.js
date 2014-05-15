(function($) {
  /**
   * @class: BaseView implements the basic functionality of a View.
   */
  Curry.Views.BaseView = Backbone.View.extend({
    /* Local Variables */

    // The name will be used as a key to store page location.
    name: 'base',

    // The events will be used in a specific page.
    events: {
      'focus input': '_onFocusField',
      'input input': '_onInputField',
      'blur input': '_onBlurField',
      'focus textarea': '_onFocusField',
      'input textarea': '_onInputField',
      'blur textarea': '_onBlurField',
      'click .dropdown-menu li': '_onClickDropdownList'
    },

    /* Constant Html Elements */
    _loadingHtml: '<div class="loading-section"></div>',

    /* Page Data Functions */

    initialize: function(options) {
      this._super('initialize', options);
      this._template = options.template;
      this._context  = options.context;
      this._models   = options.models || {};
      this._data     = options.data || {};
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
      $(this.el).html(this.renderTemplate(this._template, this._data));
      this._container = $(this.el).find('#' + this._context + '-container');
    },

    // Internal render method for subclass to override to implement different features.
    renderInternal: function() {},

    // Before render method for subclass to override to prepare data and attach events.
    beforeRender: function() {},

    render: function() {
      this.beforeRender();
      this.renderFramework();
      this.renderInternal();
      return this;
    },

    // After render method for subclass to override to initialize page elements.
    afterRender: function() {},

    _onFocusField: function(evt) {},

    _onInputField: function(evt) {},

    _onBlurField: function(evt) {
      if (!$(evt.target).hasClass('optional') && !Curry.Utils.isBlank(this.form)) {
        Curry.Utils.Form.advanceFieldProgress(evt.target.name, this.form);
      }
    },

    _onClickDropdownList: function(evt) {
      if (evt.target) {
        var shadow = $(evt.target).parents('.dropdown-box').find('input[type=hidden]');
        var input  = $(evt.target).parents('.dropdown-box').find('input[type=button]');
        var label  = $(evt.target).parents('.dropdown-box').find('label[for=' + input.attr('id') + ']');
        Curry.Utils.Form.clearError(input);
        if (!Curry.Utils.isBlank(label)) label.hide();
        var list = $(evt.target).parents('ul').find('li');
        var item = $(evt.target).parent()[0];
        shadow.val(_.indexOf(list, item));
        input.val(evt.target.text);

        if (!input.hasClass('optional') && !Curry.Utils.isBlank(this.form)) {
          Curry.Utils.Form.advanceFieldProgress(input[0].name, this.form);
        }
      }
    },

    formOverallCheck: function() {
      if (Curry.Utils.isBlank(this.form) || this.form.length == 0) return false;

      var inputs = this.form.find('input, textarea').not('[type=hidden], [type=radio], .optional');
      var len = inputs.length;
      Curry.Utils.Form.advanceFieldProgress(inputs[len-1].name, this.form);
      for (var i=0; i<len; i++) {
        if (this.form.fieldsStatus[i] != true) return false;
      }

      return true;
    }
  });
}).call(this, jQuery);
