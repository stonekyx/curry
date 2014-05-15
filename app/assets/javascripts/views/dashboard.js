(function($) {
  /**
   * @class: DashboardView implements the page logic of projects dashboard.
   */
  Curry.Views.Dashboard = Curry.Views.BaseView.extend({
    name: 'dashboard',

    events: _.extend({
      'click .btn.fire-ticket': '_onClickFireTicket',
      'click .content-row .name': '_onClickItem',
      'click .content-row .view-details': '_onClickViewDetails'
    }, Curry.Views.BaseView.prototype.events),

    beforeRender: function() {
      Curry.Utils.EventManager.bind(Curry.Events.Views.Dashboard.INFOUPDATE, this._onProjectInfoUpdate, this);
    },

    renderInternal: function() {
      var self = this;

      var doRender = function() {
        self._container.find('.project-browser').empty().html(self.renderTemplate('browse/project', self.data));
      };

      this._container.find('.project-browser').empty().html(this._loadingHtml);
      Curry.Helpers.JsonResponser.get({
        url: Curry.Constants.URL.API.BROWSEPROJECT
      }).done(function(response) {
        if (response) {
          self.data = {};
          self.data.projectList = response['list'];
          Curry.Utils.DateTime.convertDateTime(self.data.projectList, 'date.formats.default');
          doRender();
        }
      }).fail(function(response) {
        alert('Failed...');
      });
    },
    afterRender: function() {},

    _onClickItem: function(evt) {
      if (evt.target) {
        var idx = _.indexOf(this._container.find('.content-row .name'), evt.target);
        Curry.Utils.ElementManager.showPopup('view_ticket_info', {data: this.data.projectList[idx]});
      }
    },

    _onClickViewDetails: function(evt) {
      if (evt.target) {
        var idx = _.indexOf(this._container.find('.content-row .view-details'), evt.target);
        Curry.Utils.ElementManager.showPopup('view_project_detail', {data: this.data.projectList[idx]});
      }
    },

    _onProjectInfoUpdate: function(evt) {
      var idx = evt.projectId;
      var self = this;
      Curry.Helpers.JsonResponser.get({
        url: Curry.Utils.Str.format(Curry.Constants.URL.API.FETCHPROJECT, idx)
      }).done(function(response) {
        if (response) {
          for (var i=0; i<self.data.projectList.length; i++) {
            if (self.data.projectList[i].id == idx) {
              self.data.projectList[i] = response['item'];
              break;
            }
          }
        }
      }).fail(function(response) {
        alert('Failed...');
      });
    },

    _onClickFireTicket: function() {
      Curry.Utils.ElementManager.showPopup('fire_ticket', {});
    },
  });
}).call(this, jQuery);
