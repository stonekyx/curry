(function($) {
  /**
   * The base class for popup boxes.
   */
  Curry.Controls.Popup = Curry.Views.BaseView.extend({
    name: 'popup',

    beforeRender: function() {
      this._init();
      this.data = this._models.data;
    },

    _onClickCancel: function() {
      Curry.Utils.ElementManager.closePopup();
    }
  });
}).call(this, jQuery);
