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
      return uid ? parseInt(uid) : -1;
    },

    /*
     * Get group id from cookies
     * @return {Number}
     * group_id:
     *    1 means only for anonymous user,
     *    2 means only for devloper,
     *    4 means only for project manager
     *    (should move commets for group_id to cookies file)
     */
    getGroupId: function() {
      return 1;
    }
  };
}).call(this, jQuery);
