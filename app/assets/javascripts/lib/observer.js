(function($){
  /**
   * @namespace Observer Helpers
   */
  Curry.Helpers.Observer = {
    /*
     * Whether current user is logged in.
     * @return {Boolean}
     */
    isLoggedIn: function() {
      return Curry.Helpers.Observer.getUserId() != -1;
    },

    /*
     * Whether current user is a anonymous user.
     * @return {Boolean}
     */
    isAnonymousUser: function() {
      return true;
    },

    /*
     * Get user id of user from cookies
     * @return {Number}
     */
    getUserId: function() {
      var uid = Cookies.getCookieByKey('CURRY_UID');
      return Curry.Utils.isBlank(uid) ? -1 : parseInt(uid);
    },

    /*
     * Get username of user from cookies
     * @return {String}
     */
    getUserName: function() {
      var uname = Cookies.getCookieByKey('CURRY_UNAME') || '';
      return uname;
    }
  };
}).call(this, jQuery);
