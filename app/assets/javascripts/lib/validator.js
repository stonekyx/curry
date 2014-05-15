(function($) {
  /**
   * @namespace Validator Helpers
   */
  Curry.Helpers.Validator = {
    /*
     * Fields names to validate.
     */
    watchList: ['email', 'email_from', 'email_to', 'password', 'password_confirmation', 'first_name', 'last_name', 'name', 'project_name', 'project_title', 'genre', 'priority', 'assignee', 'fix_version', 'description'],

    /*
     * Validate router.
     * @param {string} fieldName to be validated
     * @value {string} value to be validated
     * @return {number} code of validation
     */
    watchField: function(fieldName, value) {
      if (!_.include(this.watchList, fieldName)) return 0;

      var code = 0;
      switch (fieldName) {
        case 'email': case 'email_from': case 'email_to':
          code = this.watchEmail(value);
          break;
        case 'password':
          code = this.watchPassword(value);
          break;
        case 'password_confirmation':
          var p1 = value.split('+')[0];
          var p2 = value.split('+')[1];
          code = this.watchPasswordAgain(p1, p2);
          break;
        default:
          code = this.watchNonEmptyField(value);
          break;
      }

      return code;
    },

    /*
     * Validate email.
     * @param {string} email to be validated
     * @return {number} code of validation
     */
    watchEmail: function(email) {
      if (Curry.Utils.isBlank(email)) return 1;

      // See more at http://stackoverflow.com/questions/940577/javascript-regular-expression-email-validation
      var emailFormat = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (!emailFormat.test(email)) return 2;

      return 0;
    },

    /*
     * Validate password.
     * @param {string} password to be validated
     * @return {number} code of validation
     */
    watchPassword: function(password) {
      if (Curry.Utils.isBlank(password)) return 1;
      //TODO: zacky, should add more validation for password complexity here.

      return 0;
    },

    /*
     * Validate password.
     * @param {string} password to be validated
     * @param {string} passwordAgain to be validated
     * @return {number} code of validation
     */
    watchPasswordAgain: function(password, passwordAgain) {
      if (Curry.Utils.isBlank(passwordAgain)) return 2;
      if (password != passwordAgain) return 3;

      return 0;
    },

    /*
     * Validate non-empty field. i.e.: first-name, last-name
     * @param {string} string to be validated
     * @return {number} code of validation
     */
    watchNonEmptyField: function(stringToWatch) {
      if (Curry.Utils.isBlank(stringToWatch)) return 1;

      return 0;
    }
  };
}).call(this, jQuery);
