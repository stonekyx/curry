(function($) {
  /**
   * @class: HomeView implemets the page logic of signup page.
   */
  Curry.Views.Signup = Curry.Views.BaseView.extend({
    name: 'signup',

    events: _.extend({
      'click #submit-btn': '_onClickSignup'
    }, Curry.Views.BaseView.prototype.events),

    beforeRender: function() {},
    renderInternal: function() {
      this.form = this._container.find('#signup-form');
      this.form.furthestProgress = -1;
      this.form.fieldsStatus = [];
    },

    afterRender: function() {
      Curry.Utils.Form.initInputNames(this.form);
    },

    _onClickSignup: function() {
      if (!this.formOverallCheck()) return false;

      var self = this;
      Curry.Helpers.JsonResponser.post({
        url: Curry.Constants.URL.API.SIGNUP,
        data: this.form.serialize()
      }).done(function(response) {
        alert("SIGNUP SUCCESS");
        //TODO: zacky, should direct to '/thanks' page.
        Curry.Utils.Url.reload();
      }).fail(function(response) {
        alert("YAMIEDIE");
      });

      return true;
    }
  });
}).call(this, jQuery);
