(function($) {
  /**
   * @class: ContactView implements the page logic of contact page.
   */
  Curry.Views.Contact = Curry.Views.BaseView.extend({
    name: 'contact',

    events: _.extend({
      'click input[type=radio]': '_onClickRadioButton',
      'click #submit-btn': '_onClickSend'
    }, Curry.Views.BaseView.prototype.events),

    beforeRender: function() {},
    renderInternal: function() {
      this.form = this._container.find('#message-form');
      this.form.furthestProgress = -1;
      this.form.fieldsStatus = [];
      this.projectDesc = I18n.t('Message.project_description');
      this.form.find('.description-title').empty().html(this.projectDesc[2]);
    },

    afterRender: function() {
      Curry.Utils.Form.initInputNames(this.form);
    },

    _onClickRadioButton: function(evt) {
      if (evt.target) {
        var self = this;
        var idx = evt.target.value;
        var descTitleEl = this.form.find('.description-title');
        descTitleEl.fadeOut('slow', function() {
          descTitleEl.empty().html(self.projectDesc[idx]).fadeIn('slow');
        });
        Curry.Utils.Form.clearInputs(this.form);
      }
    },

    _onClickSend: function() {
      if (!this.formOverallCheck()) return false;

      var self = this;
      Curry.Helpers.JsonResponser.post({
        url: Curry.Constants.URL.API.SENDMESSAGE,
        data: this.form.serialize()
      }).done(function(response) {
        //TODO: zacky, should show popup wating for response.
        alert('SENT SUCCESS');
      }).fail(function(response) {
        alert('YAMIEDIE');
      });
    }
  });
}).call(this, jQuery);
