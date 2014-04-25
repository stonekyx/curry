(function($) {
  /**
   * @class: FooterController implements footer stuffs of all pages.
   */
  Curry.Routers.FooterController = Curry.Routers.BaseController.extend({
    name: 'footer',

    context: 'declaration',

    _template: 'footer/index',

    index: function() {
      var footerView = new Curry.Views.Footer({template: this._template, context: this.context, models: this.pageModels});
      $('#footer-container').empty().append(footerView.render().el);
    }
  });
}).call(this, jQuery);
