(function($) {
  /**
   * @class: MessageController implements routing stuff in message page.
   */
  Curry.Routers.MessageController = Curry.Routers.BaseController.extend({
    name: 'message',

    // Context keys Collections
    CONTEXT: {
      MESSAGE: 'message',
      CONTACT: 'contact'
    },

    _template: {
      index: 'message/index',
      contact: 'message/contact'
    },

    index: function() {
      return this.swap(new Curry.Views.Message({template: this._template.index, context: this.CONTEXT.MESSAGE}));
    },

    contact: function() {
      return this.swap(new Curry.Views.Contact({template: this._template.contact, context: this.CONTEXT.CONTACT}));
    }
  });
}).call(this, jQuery);
