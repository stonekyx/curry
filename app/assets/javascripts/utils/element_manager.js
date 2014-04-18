(function($) {
  /**
   * @namespace ElementManager
   */
  Curry.Utils.ElementManager = {
    registedPopup: {},

    /*
     * Register specific popup.
     */
    registerPopup: function(name, popupClass) {
      if (this.registedPopup[name]) return;
      this.registedPopup[name] = popupClass;
    },

    /*
     * Show specific popup.
     */
    showPopup: function(name, options) {
      if (!this.registedPopup[name]) {
        //TODO: zanwen, should throw exception this kind of popup not exist here.
      }

      options = options || {};
      params  = this._getParamsByType('popup');
      var container = this._getPopupEl();
      var popupView = new this.registedPopup[name](params);
      this._showOverlay();
      container.empty().append(popupView.render().el).show();
      popupView.afterRender();
      this._attachOverlayEventHandler('click', options.onClickOverlay || popupView._onClickCancel);
      this._attachPopupEventHandler('click', popupView._onClickCancel);

      return;
    },

    /*
     * Close popup.
     */
    closePopup: function() {
      var container = this._getPopupEl();
      container.empty().hide();
      this._hideOverlay();
      this._detachOverlayEventHandler('click');
      this._detachPopupEventHandler('click');

      return;
    },

    /*
     * Get parameters of popups by type.
     */
    _getParamsByType: function(type) {
      var params = {};
      params.template = type + '/index';
      params.context  = type + '-content';

      return params;
    },

    /*
     * Get popup element of body.
     */
    _getPopupEl: function() {
      return $('#popup-container');
    },

    /*
     * Get overlay element of body.
     */
    _getOverlayEl: function() {
      return $('#overlay-container');
    },

    /*
     * Show overlay of 60% opacity background.
     */
    _showOverlay: function() {
      var container = this._getOverlayEl();
      container.append("<div class='overlay'></div>").show();
    },

    /*
     * Hide overlay of background.
     */
    _hideOverlay: function() {
      var container = this._getOverlayEl();
      container.empty().hide();
    },

    /*
     * Attach handler to overlay event.
     */
    _attachOverlayEventHandler: function(evt, handler) {
      var container = this._getOverlayEl();
      container.bind(evt, handler);
    },

    /*
     * Attach handler to popup event.
     */
    _attachPopupEventHandler: function(evt, handler) {
      var container = this._getPopupEl();
      container.find('.cancel').bind(evt, handler);
    },

    /*
     * Detach handler to overlay event.
     */
    _detachOverlayEventHandler: function(evt, handler) {
      var container = this._getOverlayEl();
      container.unbind(evt, handler);
    },

    /*
     * Detach handler to popup event.
     */
    _detachPopupEventHandler: function(evt, handler) {
      var container = this._getPopupEl();
      container.find('.cancel').unbind(evt, handler);
    }
  };
}).call(this, jQuery);
