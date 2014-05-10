(function($) {
  /**
   * @class: ErrorView implements the page logic of error page.
   */
  Curry.Views.Error = Curry.Views.BaseView.extend({
    name: 'error',

    events: _.extend({
    }, Curry.Views.BaseView.prototype.events),

    beforeRender: function() {},
    renderInternal: function() {},
    afterRender: function() {}
  });
}).call(this, jQuery);
