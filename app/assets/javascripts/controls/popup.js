(function($) {
  Curry.Controls.Popup.Login = Curry.Controls.Popup.extend({
    events: {
      'click #login-btn': '_onClickLogin'
    },

    _init: function() {
      this.name = 'login_box';
      this.data = {};
    },

    renderInternal: function() {
      this._container.html(this.renderTemplate('popup/login', this.data));
      this.form = this._container.find('#login-form');
    },

    _onClickLogin: function() {
      var self = this;
      Curry.Helpers.JsonResponser.post({
        url: Curry.Constants.URL.API.LOGIN,
        data: this.form.serialize()
      }).done(function(response) {
        if (response['success']) {
          alert("AUTHENTICATED SUCCEEDED");
          Curry.Utils.Url.reload();
        } else {
          alert("WHO ARE YOU...")
        }
        self._onClickCancel();
      }).fail(function(response) {
        alert("YAMIEDIE");
      });
    }
  });

  Curry.Utils.ElementManager.registerPopup('login', Curry.Controls.Popup.Login);
}).call(this, jQuery);
