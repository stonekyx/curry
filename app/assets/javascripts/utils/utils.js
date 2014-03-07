(function($) {
  /**
   * @namespace Utils
   */
  Curry.Utils = {
    /**
     * Determine whether the given object is function.
     */
    isFunction: function(variable) {
      return (typeof(variable) === 'function');
    },

    /**
     * Determine whether the given object is undefined.
     */
    isUndefined: function(variable) {
      return (typeof(variable) === 'undefined');
    },

    /**
     * Determine whether the given object is null.
     */
    isNull: function(variable) {
      return (variable === null)
    },

    /**
     * Determine whether the given object is blank.
     */
    isBlank: function(variable) {
      if (Curry.Utils.isUndefined(variable) || Curry.Utils.isNull(variable)) return true;

      var type = Object.prototype.toString.call(variable).slice(8, -1);
      switch(type) {
        case 'String': return !$.trim(variable);
        case 'Array' : return !variable.length;
        case 'Object': return $.isEmptyObject(variable);
      }
      return false;
    }
  };
}).call(this, jQuery);
