(function($) {
  /**
   * @namespace Form Utils
   */
  Curry.Utils.Form = {
    /*
     * Initialize inputs names of form. i.e.: first_name => First Name
     * @param {css elements} form Form container including inputs to initialize names
     */
    initInputNames: function(form) {
      var inputs = form.find('input, textarea').not('[type=hidden], [type=radio]');
      for (var i=0; i<inputs.length; i++) {
        var item = inputs.eq(i);
        var name = Curry.Utils.Str.titleize(item.attr('name'));
        var label = $('<label>').html(name).attr('for', item.attr('id'));
        label.insertBefore(inputs[i]);
        label.inFieldLabels({fadeDuration: 100});
      }
    },

    /*
     * Initialize inputs values of form.
     * @params {css elements} form Form container including inputs to initialize values
     * @params {object} data The object contains values to initialize inputs
     */
    initInputValues: function(form, data) {
      var inputs = form.find('input, textarea');
      for (var i=0; i<inputs.length; i++) {
        var item = inputs.eq(i);
        var initValue = data[Curry.Utils.Str.camelize(item.attr('name'))] || data[item.attr('name')];
        if (!Curry.Utils.isBlank(initValue)) {
          var label = form.find('label[for=' + item.attr('id') + ']');
          if (!Curry.Utils.isBlank(label)) label.hide();
          item.val(initValue);
        }
      }
    },

    /*
     * Clear inputs values of form.
     * @param {css elements} for Form container including inputs to clear
     */
    clearInputs: function(form) {
      form.furthestProgress = -1;
      form.fieldsStatus = [];
      var inputs = form.find('input, textarea').not('[type=hidden], [type=radio]');
      for (var i=0; i<inputs.length; i++) {
        inputs[i].value = '';
        this.clearError($(inputs[i]));
        $(inputs[i]).siblings().show();
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

      var inputs = form.find('input, textarea').not('[type=hidden], [type=radio], .optional');
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
            inputs[i+1].value = '';
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
          if (_.include(['email_from', 'email_to'], inputs[i].name)) {
            key = 'email';
          } else if (inputs[i].name == 'password_confirmation') {
            key = 'password';
          }
          var errMsg = I18n.t('Errors.Inputs.' + key)[code];
          this.setError($(inputs[i]), errMsg);
        }
      }
    }
  };
}).call(this, jQuery);
