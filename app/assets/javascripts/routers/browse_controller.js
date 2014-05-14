(function($) {
  /**
   * @class: BrowseController implements routing stuffs in browse page.
   */
  Curry.Routers.BrowseController = Curry.Routers.BaseController.extend({
    name: 'browse',

    CONTEXT: {
      DASHBOARD: 'dashboard',
      TICKET: 'ticket'
    },

    _template: {
      index: 'browse/index',
      ticket: 'browse/ticket'
    },

    index: function() {
      return this.swap(new Curry.Views.Dashboard({template: this._template.index, context: this.CONTEXT.DASHBOARD}));
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
