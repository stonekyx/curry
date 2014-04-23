(function($) {
  /**
   * @namepace EventManager
   */
  Curry.Utils.EventManager = {
    _counter: 0,
    pool: [],

    /* Trigger For All Events is Curry.Events.COLLECTION */


    /*
     * Bind event to observer's method.
     */
    bind: function(evt, method, observer) {
      if (Curry.Utils.isBlank(evt) || Curry.Utils.isBlank(method) || Curry.Utils.isBlank(observer)) return false;

      if (Curry.Utils.isBlank(observer.eventId)) {
        observer.eventId = this._generateEventId(observer);
      }

      this._bindEvent(evt, method, observer);
      return true;
    },

    /*
     *  Unbind event to observer's method.
     */
    unbind: function(evt, method, observer) {
      if (Curry.Utils.isBlank(evt) || Curry.Utils.isBlank(method) || Curry.Utils.isBlank(observer)) return false;

      if (Curry.Utils.isBlank(observer.eventId)) return false;

      this._unbindEvent(evt, method, observer);
      return true;
    },

    /*
     * Unbind all events of an observer's method.
     */
    unbindAll: function(observer) {
      if (Curry.Utils.isBlank(observer) || Curry.Utils.isBlank(observer.eventId)) return false;

      var records = this.pool[this._getEventId(observer)];
      _.each(records, function(value, key){
        this._unbindEvent(key, value, observer);
      });
      return true;
    },

    /*
     * Bind observer's method to trigger's event.
     */
    _bindEvent: function(evt, method, observer) {
      if (!this._hasRecord(evt, method, observer)) {
        Curry.Events.COLLECTION.on(evt, method, observer);
        this._addRecord(evt, method, observer);
      }
    },

    /*
     * Unbind observer's method to trigger's event.
     */
    _unbindEvent: function(evt, method, observer) {
      if (this._hasRecord(evt, method, observer)) {
        Curry.Events.COLLECTION.off(evt, method, observer);
        this._removeRecord(evt, method, observer);
      }
    },

    /*
     * Add event record to the interanl pool.
     */
    _addRecord: function(evt, method, observer) {
      if (!this.pool[this._getEventId(observer)]) {
        this.pool[this._getEventId(observer)] = {};
      }

      var records = this.pool[this._getEventId(observer)];
      if (Curry.Utils.isBlank(records[evt])) {
        records[evt] = method;
      }
    },

    /*
     * Remove event record from the internal pool.
     */
    _removeRecord: function(evt, method, observer) {
      if (!this.pool[this._getEventId(observer)]) return;

      var records = this.pool[this._getEventId(observer)];
      delete records[evt];
    },

    /*
     * Check whether the specific event is recorded in the internal pool.
     */
    _hasRecord: function(evt, method, observer) {
      if (!this.pool[this._getEventId(observer)]) return false;

      var records = this.pool[this._getEventId(observer)];
      return !Curry.Utils.isBlank(records[evt]);
    },

    /*
     * Generate an eventId for event to be recorded.
     */
    _generateEventId: function(observer) {
      var name = observer.name;
      var type = '';

      if (observer instanceof Curry.Models.BaseModel) {
        type = 'model';
      } else if (observer instanceof Curry.Views.BaseView) {
        type = 'view';
      } else if (observer instanceof Curry.Routers.RouteController) {
        type = 'route_controller';
      } else if (observer instanceof Curry.Routers.BaseController) {
        type = 'base_controller';
      } else {
        type = 'fuck';
      }

      return type + '_' + name + '_' + (this._counter++);
    },

    /*
     * Get event number of an observer.
     */
    _getEventId: function(observer) {
      var pos = observer.eventId.lastIndexOf('_');
      return parseInt(observer.eventId.slice(pos+1));
    }
  };
}).call(this, jQuery);
