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
      return (Curry.Utils.isUndefined(variable) || Curry.Utils.isNull(variable) || /^\s*$/.test(variable));
    }
  };
}).call(this, jQuery);
