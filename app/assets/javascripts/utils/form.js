(function($){
  /**
   * @namespace Form Utils
   */
  Curry.Utils.Form = {
    /*
     * Initialize inputs names of container. i.e.: first_name => First Name
     * @param {css elements} container Form container including inputs to initialize
     */
    initInputNames: function(container) {
      var inputs = container.find('input, textarea').not('[type=hidden]');
      for (var i=0; i<inputs.length; i++) {
        var item = inputs.eq(i);
        var name = Curry.Utils.Str.titleize(item.attr('name'));
        var label = $('<label>').html(name).attr('for', item.attr('id'));
        label.insertBefore(inputs[i]);
        label.inFieldLabels({fadeDuration: 100});
      }
    },

    /*
     * Set error status & message of the current input.
     * @param {css elements} el Element of current input
     * @param {string} errMsg Error message
     */
    setError: function(el, errMsg) {
      var msgEl = el.parents('div.input-row').find('.message');
      el.addClass('error');
      msgEl.addClass('error');
      msgEl.empty().html(errMsg);
    },

    /*
     * Clear error status & message of the current input.
     * @param {css elements} el Element of current input.
     */
    clearError: function(el) {
      var msgEl = el.parents('div.input-row').find('.message');
      el.removeClass('error');
      msgEl.removeClass('error');
      msgEl.empty();
    },

    /*
     * Check necessary inputs of form in order.
     * @param {string} fieldName Current field name to check
     * @param {css elements} form Form container including inputs to check
     * @return {boolean} valid or not of all necessary inputs of form
     */
    advanceFieldProgress: function(fieldName, form) {
      if (Curry.Utils.isBlank(fieldName) || Curry.Utils.isBlank(form) || form.length == 0) return;

      var inputs = form.find('input, textarea').not('[type=hidden], .optional');
      var currentPosition = _.indexOf(inputs, _.find(inputs, function(item) {
        return item.name == fieldName;
      }));
      if (currentPosition > form.furthestProgress) {
        form.furthestProgress = currentPosition;
      }

      for (var i=0; i<=form.furthestProgress; i++) {
        if (!Curry.Utils.isBlank(form.fieldsStatus[i]) && inputs[i].name != fieldName) continue;
        var value = inputs[i].value;
        if (inputs[i].name == 'password') {
          if (i+1 < inputs.length && inputs[i+1].name == 'password_confirmation') {
            form.fieldsStatus[i+1] = false;
            inputs[i+1].value = "";
            this.clearError($(inputs[i+1]));
          }
        } else if (inputs[i].name == 'password_confirmation') {
          if (i >= 1 &&Curry.Utils.isBlank(inputs[i-1].value)) continue;
          value = inputs[i-1].value + '+' + value;
        }

        var code = Curry.Helpers.Validator.watchField(inputs[i].name, value);
        if (!code) {
          form.fieldsStatus[i] = true;
          this.clearError($(inputs[i]));
        } else {
          form.fieldsStatus[i] = false;
          var key = inputs[i].name;
          if (inputs[i].name == 'password_confirmation') {
            key = 'password';
          }
          var errMsg = I18n.t("Errors.Inputs." + key)[code];
          this.setError($(inputs[i]), errMsg);
        }
      }
    }
  };
}).call(this, jQuery);
