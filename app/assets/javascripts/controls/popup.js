(function($) {
  Curry.Controls.Popup.Login = Curry.Controls.Popup.extend({
    events: _.extend({
      'click #cancel-btn': '_onClickCancel',
      'click #submit-btn': '_onClickLogin',
      'keypress input#user-email': '_onInputEnter',
      'keypress input#user-password': '_onInputEnter'
    }, Curry.Views.BaseView.prototype.events),

    _init: function() {
      this.name  = 'login_box';
      this.title = I18n.t('Popup.Login.title');
      this.data  = {};
    },

    renderInternal: function() {
      this._container.find('#header-container .headline').html(this.title);
      this._container.find('#body-container').html(this.renderTemplate('popup/login', this.data));
      this.form = this._container.find('#login-form');
      this.form.furthestProgress = -1;
      this.form.fieldsStatus = [];
    },

    afterRender: function() {
      Curry.Utils.Form.initInputNames(this.form);
    },

    _onClickLogin: function() {
      if (!this.formOverallCheck()) return false;

      var self = this;
      Curry.Helpers.JsonResponser.post({
        url: Curry.Constants.URL.API.LOGIN,
        data: this.form.serialize()
      }).done(function(response) {
        if (response['success']) {
          self._onClickCancel();
          Curry.Events.COLLECTION.trigger(Curry.Events.Views.Header.LOGGEDIN);
        } else {
          alert("WHO ARE YOU...")
        }
      }).fail(function(response) {
        alert("YAMIEDIE");
      });

      return true;
    },

    _onInputEnter: function(evt) {
      if (evt.which == Curry.Constants.KEYCODES.ENTER) {
        this._onClickLogin();
      }
    }
  });

  Curry.Utils.ElementManager.registerPopup('login', Curry.Controls.Popup.Login);
}).call(this, jQuery);
