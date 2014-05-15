(function($) {
  /**
   * The base class for popup boxes.
   */
  Curry.Controls.Popup = Curry.Views.BaseView.extend({
    name: 'popup_box',

    type: 'popup',

    events: _.extend({
      'click #cancel-btn': '_onClickCancel',
    }, Curry.Views.BaseView.prototype.events),

    beforeRender: function() {
      this.data = this._models.data || {};
      this._init();
    },

    afterRender: function() {
      this._resetPosition();
      this._initElements();
    },

    _onClickCancel: function() {
      Curry.Utils.ElementManager.closePopup();
    },

    _resetPosition: function() {
      Curry.Utils.ElementManager.showElementOnCenter(Curry.Utils.ElementManager.getElByType(this.type));
    }
  });
}).call(this, jQuery);
