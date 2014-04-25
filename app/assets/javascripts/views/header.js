(function($) {
  /**
   * @class: HeaderView implements the header logic of all pages.
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
      this._locateAnchor();
    },

    _onClickLogin: function() {
      Curry.Utils.ElementManager.showPopup('login');
    },

    _onClickLogout: function() {
      Curry.Helpers.JsonResponser.post({
        url: Curry.Constants.URL.API.LOGOUT
      }).done(function(response) {
        if (response['success']) {
          Curry.Events.COLLECTION.trigger(Curry.Events.Views.Header.LOGGEDOUT);
        }
      }).fail(function(response) {
        alert("YAMIEDIE");
      });
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
      //TODO: zacky, need add avatar logic here.

      Curry.Utils.Url.reload();
    },

    _onUserLoggedOut: function() {
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
