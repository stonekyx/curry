(function($) {
  /**
   * @namespace DateTime Utils
   */
  Curry.Utils.DateTime = {
    checkFieldLists: ['sent_at'],

    /*
     * Convert time string to specific scope.
     * @param {Object} inputs Objects contains time string to convert
     * @param {string} scope The string scope to convert
     */
     convertDateTime: function(inputs, scope) {
        for (var i=0; i<inputs.length; i++) {
          _.each(_.keys(inputs[i]), function(key) {
            if (_.include(this.checkFieldLists, key)) {
              inputs[i][key] = I18n.l(scope, inputs[i][key]);
            }
          }, this);
        }
     }
  };
}).call(this, jQuery);
