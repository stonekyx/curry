(function($) {
  /**
   * @class: FooterView implements the footer logic of all pages.
   */
  Curry.Views.Footer = Curry.Views.BaseView.extend({
    name: 'footer',

    events: _.extend({
    }, Curry.Views.BaseView.prototype.events),

    beforeRender: function() {},

    renderInternal: function() {}
  });
}).call(this, jQuery);
