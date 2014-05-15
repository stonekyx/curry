(function($) {
  /**
   * @class: TicketView implements the page logic of ticket browser page.
   */
  Curry.Views.Ticket = Curry.Views.BaseView.extend({
    name: 'ticket',

    events: _.extend({
      'click .info-section .edit-btn': '_onClickEditBtn',
      'click .info-section .check-btn': '_onClickCheckBtn',
      'click .comment-section #edit-btn': '_toggleCommentStatus',
      'click .comment-section #cancel-btn': '_toggleCommentStatus',
      'click .comment-section #submit-btn': '_onSaveComment',
      'mouseenter .comment-header .blue-link': '_onHoverPulisher'
    }, Curry.Views.BaseView.prototype.events),

    beforeRender: function() {},
    renderInternal: function() {
      var self = this;

      var doRender = function() {
        self._container.find('.ticket-browser').empty().html(self.renderTemplate('browse/ticket/ticket_details', self.ticket));
        self.form = self._container.find('#ticket-form');
        self.commentButtons = self.form.find('.button-container');
        self._initElements();
      };

      Curry.Helpers.JsonResponser.get({
        url: Curry.Utils.Str.format(Curry.Constants.URL.API.FETCHTICKET, this._data.ticketId)
      }).done(function(response) {
        if (response && response['success']) {
          self.ticket = new Curry.Models.Ticket(response);
          Curry.Utils.DateTime.convertDateTime(self.ticket.comments, 'date.formats.default');
          doRender();
        }
      }).fail(function(response) {
        alert('YAMIEDIE');
      });
    },

    afterRender: function() {},

    _initElements: function() {
     this.form.find('input').not('[type=hidden]').attr('disabled', true);
     this._toggleCommentStatus();
    },

    _toggleStandBy: function(el) {
      //TODO: zacky, need to add loading btn here.
      var input = el.siblings('input');
      if (el.hasClass('edit-btn')) {
        input.removeAttr('disabled');
        el.removeClass('edit-btn');
        el.addClass('check-btn');
      } else {
        input.attr('disabled', true);
        el.removeClass('check-btn');
        el.addClass('edit-btn');
      }
    },

    _toggleCommentStatus: function() {
      if (this.ticket.editingComment == false) {
        this.commentButtons.find('#edit-btn').hide();
        this.form.find('#comment').val('');
        this.form.find('.comment-bucket').show();
        this.commentButtons.find('#cancel-btn').show();
        this.commentButtons.find('#submit-btn').show();
        this.ticket.editingComment = true;
      } else {
        this.form.find('.comment-bucket').hide();
        this.commentButtons.find('#cancel-btn').hide();
        this.commentButtons.find('#submit-btn').hide();
        this.commentButtons.find('#edit-btn').show();
        this.ticket.editingComment = false;
      }
    },

    _onClickEditBtn: function(evt) {
      if (evt.target) {
        //TODO: zacky, bufferVal will get into chaos when more than one field in edit state.
        //this.ticket.bufferVal = $(evt.target).siblings('input').val();
        this._toggleStandBy($(evt.target));
      }
    },

    _onClickCheckBtn: function(evt) {
      if (evt.target) {
        var input = $(evt.target).siblings('input').not('[type=button]');
        var key = input.attr('name');
        var inputVal = Curry.Utils.Str.trim(input.val());
        Curry.Utils.Form.clearError($(input));

        if (Curry.Utils.isBlank(inputVal)) {
          var errMsg = I18n.t('Errors.Inputs.' + key)[1];
          Curry.Utils.Form.setError($(input), errMsg);
        } else if (inputVal != this.ticket.bufferVal) {
          var data = {};
          switch ($(evt.target).siblings('input').not('[type=hidden]').attr('id')) {
            case 'priority':
              data['priority'] = inputVal;
              break;
            case 'status':
              data['status'] = inputVal;
              break;
            case 'assignee':
              data['assignee'] = inputVal;
              break;
            case 'fix-version':
              data['pid'] = this.ticket.projectId;
              data['fix_version'] = inputVal;
              break;
          }

          var self = this;
          Curry.Helpers.JsonResponser.post({
            url: Curry.Utils.Str.format(Curry.Constants.URL.API.UPDATETICKET, this.ticket.id),
            data: data
          }).done(function(response) {
            if (response) {
              if (response['success']) {
                self._toggleStandBy($(evt.target));
              } else if (response['fail']) {
                var errPrompt = response['errors']['message'];
                var errMsg = I18n.t('Errors.Inputs.' + errPrompt['key'])[errPrompt['index']];
                Curry.Utils.Form.setError($(input), errMsg);
              }
            }
          }).fail(function(response) {
            alert('YAMIEDIE');
          });
        }
      }
    },

    _onSaveComment: function() {
      var input = this.form.find('#comment');
      var key = input.attr('name');
      var inputVal = Curry.Utils.Str.trim(input.val());
      Curry.Utils.Form.clearError($(input));

      if (Curry.Utils.isBlank(inputVal)) {
        var errMsg = I18n.t('Errors.Inputs.' + key)[1];
        Curry.Utils.Form.setError($(input), errMsg);
      } else {
        var data = {};
        data['comment'] = inputVal;

        var self = this;
        Curry.Helpers.JsonResponser.post({
          url: Curry.Utils.Str.format(Curry.Constants.URL.API.ADDCOMMENT, this.ticket.id),
          data: data
        }).done(function(response) {
          if (response) {
            if (response['success']) {
              //TODO: zacky, better to just refresh comment section rather than ticket page.
              Curry.Utils.Url.reload();
            } else if (response['fail']) {
              var errPrompt = response['errors']['message'];
              var errMsg = I18n.t('Errors.Inputs.' + errPrompt['key'])[errPrompt['index']];
              Curry.Utils.Form.setError($(input), errMsg);
            }
          }
        }).fail(function(response) {
          alert('YAMIEDIE');
        });
      }
    },

    _onHoverPulisher: function(evt) {
      if (evt.target) {
        var idx = _.indexOf(this.form.find('.comment-header .blue-link'), evt.target);
        //TODO: zacky, perhaps better to design hoverbox here.
        //alert(this.ticket.comments[idx]['publisher_email']);
      }
    }
  });
}).call(this, jQuery);
