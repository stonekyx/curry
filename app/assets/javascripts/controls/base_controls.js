(function($) {
  /**
   * The base class for popup boxes.
   */
  Curry.Controls.Popup = Curry.Views.BaseView.extend({
    name: 'popup',

    events: {
      'click .cancel': '_onClickCancel'
    },

    beforeRender: function() {
      this._init();
    },

    renderInternal: function() {},

    _onClickCancel: function() {
      Curry.Utils.ElementManager.closePopup();
    }
  });
}).call(this, jQuery);
