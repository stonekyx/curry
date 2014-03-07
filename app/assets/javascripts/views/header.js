(function($) {
  /**
   * @class: HeaderView implemets the header logic of all pages.
   */
  Curry.Views.Header = Curry.Views.BaseView.extend({
    name: 'header',

    events: {
      'click #user-menu': '_onClickLogin',
    },

    beforeRender: function() {},

    renderInternal: function() {
      //TODO: zanwen, should add renderHeader logic here.
    },

    _onClickLogin: function() {
      Curry.Utils.ElementManager.showPopup('login');
    }
  });
}).call(this, jQuery);
