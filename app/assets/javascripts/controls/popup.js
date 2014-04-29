(function($) {
  Curry.Controls.Popup.Login = Curry.Controls.Popup.extend({
    events: _.extend({
      'click #submit-btn': '_onClickLogin',
      'keypress input#user-email': '_onInputEnter',
      'keypress input#user-password': '_onInputEnter'
    }, Curry.Controls.Popup.prototype.events),

    _init: function() {
      this.name  = 'login_box';
      this.title = I18n.t('Popup.Title.login');
    },

    renderInternal: function() {
      this._container.find('#header-container .headline').html(this.title);
      this._container.find('#body-container').html(this.renderTemplate('popup/login', this.data));
      this.form = this._container.find('#login-form');
      this.form.furthestProgress = -1;
      this.form.fieldsStatus = [];
    },

    _initElements: function() {
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

  Curry.Controls.Popup.ViewTicketInfo = Curry.Controls.Popup.extend({
    events: _.extend({
    }, Curry.Controls.Popup.prototype.events),

    _init: function() {
      this.name  = 'view_ticket_info_box';
      this.title = I18n.t('Popup.Title.view_ticket_info', {project_name: this.data.name});
    },

    renderInternal: function() {
      this._container.find('#header-container .headline').html(this.title);
      this._container.find('#body-container').html(this._loadingHtml);
      var self = this;

      var doRender = function() {
        self._container.find('#body-container').empty().html(self.renderTemplate('popup/view_ticket_info', self.data));
        self._resetPosition();
      };

      Curry.Helpers.JsonResponser.get({
        url: Curry.Utils.Str.format(Curry.Constants.URL.API.PROJECTTICKETS, this.data.id)
      }).done(function(response) {
        self.data.ticketList = response['list'];
        doRender();
      }).fail(function(response) {
        alert('Failed...');
      });
    },

    _initElements: function() {}
  });

  Curry.Controls.Popup.ViewProjectDetail = Curry.Controls.Popup.extend({
    events: _.extend({
      'click #edit-btn': '_onClickEdit',
      'click #submit-btn': '_onClickSubmit'
    }, Curry.Controls.Popup.prototype.events),

    _init: function() {
      this.name = 'view_project_detail_box';
      this.title = I18n.t('Popup.Title.view_project_detail');
    },

    renderInternal: function() {
      this._container.find('#header-container .headline').html(this.title);
      this._container.find('#body-container').html(this.renderTemplate('popup/view_project_detail', this.data));
      this.form = this._container.find('#project-form');
      this.buttons = this._container.find('.button-container');
    },

    _initElements: function() {
      Curry.Utils.Form.initInputNames(this.form);
      Curry.Utils.Form.initInputValues(this.form, this.data);
      this.form.find('input, textarea').not('[type=hidden]').attr('disabled', 'disabled');
      this.buttons.find('#edit-btn').show();
      this.buttons.find('#submit-btn').hide();
    },

    _onClickEdit: function() {
      this.form.furthestProgress = -1;
      this.form.fieldsStatus = [];
      //NOTE: zacky, wouldn't like project name be changed frequently.
      this.form.find('#description').removeAttr('disabled');
      this.buttons.find('#edit-btn').hide();
      this.buttons.find('#submit-btn').show();
    },

    _onClickSubmit: function() {
      if (!this.formOverallCheck()) return false;

      var self = this;
      Curry.Helpers.JsonResponser.post({
        url: Curry.Utils.Str.format(Curry.Constants.URL.API.UPDATEPROJECT, this.data.id),
        data: this.form.serialize()
      }).done(function(response) {
        Curry.Events.COLLECTION.trigger(Curry.Events.Views.Dashboard.INFOUPDATE, {projectId: self.data.id});
        self._onClickCancel();
      }).fail(function(response) {
        alert('Failed...');
      });
    }
  });

  Curry.Controls.Popup.ViewMessageDetail = Curry.Controls.Popup.extend({
    events: _.extend({
    }, Curry.Controls.Popup.prototype.events),

    _init: function() {
      this.name  = 'view_message_detail_box';
      this.title = I18n.t('Popup.Title.view_message_detail');
    },

    renderInternal: function() {
      this._container.find('#header-container .headline').html(this.title);
      this._container.find('#body-container').html(this.renderTemplate('popup/view_message_detail', this.data));
    },

    _initElements: function() {}
  });

  Curry.Utils.ElementManager.registerPopup('login', Curry.Controls.Popup.Login);
  Curry.Utils.ElementManager.registerPopup('view_ticket_info', Curry.Controls.Popup.ViewTicketInfo);
  Curry.Utils.ElementManager.registerPopup('view_project_detail', Curry.Controls.Popup.ViewProjectDetail);
  Curry.Utils.ElementManager.registerPopup('view_message_detail', Curry.Controls.Popup.ViewMessageDetail);
}).call(this, jQuery);
