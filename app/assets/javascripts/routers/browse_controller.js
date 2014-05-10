(function($) {
  /**
   * @class: BrowseController implements routing stuffs in browse page.
   */
  Curry.Routers.BrowseController = Curry.Routers.BaseController.extend({
    name: 'browse',

    CONTEXT: {
      INDEX: 'index',
      TICKET: 'ticket'
    },

    _template: {
      index: 'browse/index',
      ticket: 'browse/ticket'
    },

    index: function() {
      //TODO: zacky, need to handle browse route issue.
    },

    ticket: function() {
      this._preparePageData(arguments);
      return this.swap(new Curry.Views.Ticket({template: this._template.ticket, context: this.CONTEXT.TICKET, data: this.pageData}));
    },

    _preparePageData: function(queryParams) {
      this.pageData = {ticketId: queryParams[0]};

      return this.pageData;
    }
  });
}).call(this, jQuery);
