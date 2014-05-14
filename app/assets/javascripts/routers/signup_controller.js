(function($) {
  /**
   * @class: SignupController implements routing stuffs in signup page.
   */
  Curry.Routers.SignupController = Curry.Routers.BaseController.extend({
    name: 'signup',

    // Context keys Collections
    CONTEXT: {
      SIGNUP: 'signup',
      THANKS: 'thanks'
    },

    _template: {
      index:  'signup/index',
      thanks: 'signup/thanks'
    },

    index: function() {
      return this.swap(new Curry.Views.Signup({template: this._template.index, context: this.CONTEXT.SIGNUP}));
    },

    thanks: function() {
      //TODO: zacky, need to add thanks page.
      return this.swap(new Curry.Views.Thanks({template: this._template.thanks, context: this.CONTEXT.THANKS}));
    }
  });
}).call(this, jQuery);
