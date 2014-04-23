(function($) {
  /**
   * @class: HeaderView implemets the header logic of all pages.
   */
  Curry.Views.Header = Curry.Views.BaseView.extend({
    name: 'header',

    events: {
      'click .item': '_onClickItem',
      'click .login': '_onClickLogin',
      'click .logout': '_onClickLogout'
    },

    beforeRender: function() {
      Curry.Utils.EventManager.bind(Curry.Events.Views.Header.LOGGEDIN, this._onUserLoggedIn, this);
      Curry.Utils.EventManager.bind(Curry.Events.Views.Header.LOGGEDOUT, this._onUserLoggedOut, this);
    },

    renderInternal: function() {
      if (Curry.Helpers.Observer.isLoggedIn()) {
        this._container.find('.logout').show();
        this._container.find('.login').hide();
      } else {
        this._container.find('.login').show();
        this._container.find('.logout').hide();
      }
      this._locateAnchor();
    },

    _onClickLogin: function() {
      Curry.Utils.ElementManager.showPopup('login');
    },

    _onClickLogout: function() {
      Curry.Events.COLLECTION.trigger(Curry.Events.Views.Header.LOGGEDOUT);
    },

    _onClickItem: function(evt) {
      if (evt.target) {
        var pathname = $(evt.target).parents('div.item').attr('link-for');
        if (!Curry.Utils.isBlank(pathname)) {
          Curry.navigate(pathname);
        }
      }
    },

    _onUserLoggedIn: function() {
      var userName = Curry.Helpers.Observer.getUserName();
      //TODO: zacky, need further design to show username.
    },

    _onUserLoggedOut: function() {
      Cookies.eraseUserCookies();
      Curry.navigate('/');
    },

    _locateAnchor: function() {
      var pathname = Curry.Utils.Url.getPathname();
      var headerItems = this._container.find('.item').not('.login .logout');
      var indexOfAnchor = _.indexOf(headerItems, _.find(headerItems, function(item) {
        return !Curry.Utils.isBlank($(item).attr('link-for')) && $(item).attr('link-for') == pathname;
      }));
      $(headerItems[indexOfAnchor]).addClass('anchor');
    }
  });
}).call(this, jQuery);
