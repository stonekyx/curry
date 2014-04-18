(function($) {
  /**
   * The base class for popup boxes.
   */
  Curry.Controls.Popup = Curry.Views.BaseView.extend({
    name: 'popup',

    beforeRender: function() {
      this._init();
    },

    _onClickCancel: function() {
      Curry.Utils.ElementManager.closePopup();
    }
  });
}).call(this, jQuery);