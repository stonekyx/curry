(function($) {
  /**
   * @class: MessageView implements the page logic of message page.
   */
  Curry.Views.Message = Curry.Views.BaseView.extend({
    name: 'message',

    events: _.extend({
      'click input[type=radio]': '_onClickRadioButton',
      'click .view-details': '_onClickViewDetails'
    }, Curry.Views.BaseView.prototype.events),

    beforeRender: function() {},
    renderInternal: function() {
      var self = this;

      this._container.find('.message-browser').empty().html(this._loadingHtml);
      Curry.Helpers.JsonResponser.get({
        url: Curry.Constants.URL.API.BROWSEMESSAGE
      }).done(function(response) {
        if (response) {
          self.data = {};
          self.data.receivedItems = response['received_items'];
          self.data.sentItems = response['sent_items'];
          self.data.items = {};
          self.data.items.messageAnchor = '0';
          Curry.Utils.DateTime.convertDateTime(self.data.receivedItems, 'time.formats.long');
          Curry.Utils.DateTime.convertDateTime(self.data.sentItems, 'time.formats.long');
          self._showMessageInfo();
        }
      }).fail(function(response) {
        alert('YAMIEDIE');
      });
    },

    afterRender: function() {},

    _onClickRadioButton: function(evt) {
      if (evt.target) {
        if (evt.target.value != this.data.items.messageAnchor) {
          this.data.items.messageAnchor = evt.target.value;
          this._showMessageInfo();
        }
      }
    },

    _onClickViewDetails: function(evt) {
      if (evt.target) {
        var idx = _.indexOf(this._container.find('.view-details'), evt.target) - 1;
        Curry.Utils.ElementManager.showPopup('view_message_detail', {data: this.data.items.messageToShow[idx]});
      }
    },

    _showMessageInfo: function() {
      //TODO: zacky, need to add pagination logic here.
      if (this.data.items.messageAnchor == '0') {
        this.data.items.messageToShow = this.data.receivedItems;
      } else if (this.data.items.messageAnchor == '1') {
        this.data.items.messageToShow = this.data.sentItems;
      }

      this._container.find('.message-browser').empty().html(this.renderTemplate('message/message', this.data.items));
    }
  });
}).call(this, jQuery);
