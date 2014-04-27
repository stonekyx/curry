(function($) {
  /**
   * @class: ErrorView implements the page logic of error page.
   */
  Curry.Views.Error = Curry.Views.BaseView.extend({
    name: 'error',

    beforeRender: function() {},
    renderInternal: function() {
      this._container.find('#error-code').empty().html(404);
      this._container.find('#error-message').empty().html(I18n.t('Error.message'));
    },
    afterRender: function() {}
  });
}).call(this, jQuery);
