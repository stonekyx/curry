(function($) {
  /**
   * @class: Ticket
   */
  Curry.Models.Ticket = Curry.Models.Base.extend({
    name: 'ticket',

    readOnly: true,

    attributesMap: [
      { id: -1 },
      { projectId: -1 },
      { genre: -1 },
      { name: null },
      { title: null },
      { createdAt: function(jsonValue) {
          return I18n.l('date.formats.default', jsonValue);
        }
      },
      { priority: -1},
      { status: -1 },
      { reporterEamil: null },
      { reporterName: null },
      { assigneeEamil: null },
      { assigneeName: null },
      { fixVersion: null },
      { description: null },
      { comments: [] },
      { priorityList: function() {
          return I18n.t('Common.Dropdown.ticket_priority');
        }
      },
      { statusList: function() {
          return I18n.t('Common.Dropdown.ticket_status');
        }
      },
      { genreText: function() {
          if (this.genre != -1) {
            return I18n.t('Common.Dropdown.ticket_genre')[this.genre];
          }

          return null;
        }
      },
      { priorityText: function() {
          if (this.priority != -1) {
            return this.priorityList[this.priority];
          }
        }
      },
      { statusText: function() {
          if (this.status != -1) {
            return this.statusList[this.status];
          }
        }
      }
    ],
  });
}).call(jQuery, this);
