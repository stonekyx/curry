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
      'click .content-row .ticket-name': '_onClickTicket'
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
        var statusList = I18n.t('Common.Dropdown.ticket_status');
        _.each(self.data.ticketList, function(item) {
          item['status'] = statusList[item['status']];
        });
        doRender();
      }).fail(function(response) {
        alert('Failed...');
      });
    },

    _initElements: function() {},

    _onClickTicket: function(evt) {
      if (evt.target) {
        var idx = _.indexOf(this._container.find('.content-row .ticket-name'), evt.target);
        var ticketId = this.data.ticketList[idx].id;
        if (!Curry.Utils.isBlank(ticketId)) {
          this._onClickCancel();
          Curry.navigate(Curry.Utils.Str.format(Curry.Constants.URL.PAGE.BROWSETICKET, ticketId));
        }
      }
    }
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
      //TODO: zacky, better to show total number of fired tickets.
      this._container.find('#body-container').html(this.renderTemplate('popup/view_project_detail', this.data));
      this.form = this._container.find('#project-form');
      this.buttons = this._container.find('.button-container');
    },

    _initElements: function() {
      Curry.Utils.Form.initInputNames(this.form);
      Curry.Utils.Form.initInputValues(this.form, this.data);
      this.form.find('input, textarea').not('[type=hidden]').attr('disabled', true);
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

  Curry.Controls.Popup.FireTicket = Curry.Controls.Popup.extend({
    events: _.extend({
      'click #submit-btn': '_onClickSubmit'
    }, Curry.Controls.Popup.prototype.events),

    _init: function() {
      this.name = 'fire_ticket_box';
      this.title = I18n.t('Popup.Title.fire_ticket');
      this.data['ticketGenreList'] = I18n.t('Common.Dropdown.ticket_genre');
      this.data['ticketPriorityList'] = I18n.t('Common.Dropdown.ticket_priority');
      this.data['reporter'] = this.data['assignee'] = Cookies.getCookieByKey('CURRY_UNAME');
    },

    renderInternal: function() {
      this._container.find('#header-container .headline').html(this.title);
      this._container.find('#body-container').html(this.renderTemplate('popup/fire_ticket', this.data));
      this.form = this._container.find('#ticket-form');
      this.form.furthestProgress = -1;
      this.form.fieldsStatus = [];
    },

    _initElements: function() {
      Curry.Utils.Form.initInputNames(this.form);
      Curry.Utils.Form.initInputValues(this.form, this.data);
    },

    _onClickSubmit: function() {
      if (!this.formOverallCheck()) return false;

      var self = this;
      Curry.Helpers.JsonResponser.post({
        url: Curry.Constants.URL.API.FIRETICKET,
        data: this.form.serialize()
      }).done(function(response) {
        if (response) {
          if (response['success']) {
            self._onClickCancel();
            Curry.navigate('/browse/ticket_id='+response['ticket_id']);
          } else if (response['fail']) {
            var errPrompt = response['errors']['message'];
            var input = self.form.find('input[name='+errPrompt['key']+']');
            var errMsg = I18n.t('Errors.Inputs.' + errPrompt['key'])[errPrompt['index']];
            Curry.Utils.Form.setError(input, errMsg);
          }
        }
      }).fail(function(response) {
        alert('Failed...');
      });
    }
  });

  Curry.Utils.ElementManager.registerPopup('login', Curry.Controls.Popup.Login);
  Curry.Utils.ElementManager.registerPopup('view_ticket_info', Curry.Controls.Popup.ViewTicketInfo);
  Curry.Utils.ElementManager.registerPopup('view_project_detail', Curry.Controls.Popup.ViewProjectDetail);
  Curry.Utils.ElementManager.registerPopup('view_message_detail', Curry.Controls.Popup.ViewMessageDetail);
  Curry.Utils.ElementManager.registerPopup('fire_ticket', Curry.Controls.Popup.FireTicket);
}).call(this, jQuery);
