(function($) {
  /**
   * @class: HomeView implemets the page logic of signup page.
   */
  Curry.Views.Signup = Curry.Views.BaseView.extend({
    name: 'signup',

    events: {
      'click #submit-btn': '_onClickSignup'
    },

    beforeRender: function() {},
    renderInternal: function() {
      this.form = this._container.find('#signup-form');
    },

    _onClickSignup: function() {
      var self = this;
      Curry.Helpers.JsonResponser.post({
        url: Curry.Constants.URL.API.SIGNUP,
        data: this.form.serialize()
      }).done(function(response) {
        alert("SIGNUP SUCCESS");
        Curry.Utils.Url.reload();
      }).fail(function(response) {
        alert("YAMIEDIE");
      });
    }
  });
}).call(this, jQuery);
