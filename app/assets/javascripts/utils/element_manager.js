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
      var popupView = new this.registedPopup[name](_.extend(params, {models: options}));
      this._showOverlay();
      container.empty().append(popupView.render().el).hide();
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
      container.css({left: '', top: '', width: '', height: '', 'overflow-x': '', 'overflow-y': ''});
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
     * Get Element by Type.
     */
    getElByType: function(type) {
      var el = null;

      switch (type) {
        case 'popup': el = this._getPopupEl(); break;
      }

      return el;
    },

    /*
     * Get View Width and Height.
     */
    getViewportInfo: function() {
      var w = $(window).width();
      var h = $(window).height();
      var x = $(window).scrollLeft();
      var y = $(window).scrollTop();

      return {width: w, height: h, left: x, top: y};
    },

    /*
     * Show Element On Center of Window.
     */
    showElementOnCenter: function(el) {
      if (Curry.Utils.isBlank(el)) return;

      vpi = this.getViewportInfo();
      var verticalMargin = 30;
      var horizontalMargin = 40;

      el.css({left: '', top: '', width: '', height: '', 'overflow-x': '', 'overflow-y': ''});

      var left = (vpi.width - el.outerWidth()) / 2;
      if (left < horizontalMargin) {
        el.css({
          left: horizontalMargin + 'px',
          width: (vpi.width - horizontalMargin * 2) + 'px',
          'overflow-x': 'auto'
        });
      } else {
        el.css({left: left + 'px'});
      }

      var top = (vpi.height - el.outerHeight()) / 2;
      if (top < verticalMargin) {
        el.css({
          top: verticalMargin + 'px',
          height: (vpi.height - verticalMargin * 2) + 'px',
          'overflow-y': 'auto'
        });
      } else {
        el.css({top: top + 'px'});
      }

      if (el.width() && el.height()) {
        el.show();
      }
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
