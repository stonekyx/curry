(function($){
  /**
   * @namespace Observer Lib
   */
  Curry.Observer = {
    /*
     * Whether current user is a anonymous user.
     * @return {Boolean} whether is a anonymous user
     */
    isAnonymousUser: function() {
      return true;
    },

    /*
     * Get group id from cookies
     * @return {Number} group id
     * group_id:
     *    1 means only for anonymous user,
     *    2 means only for devloper,
     *    4 means only for project manager
     *    (should move commets for group_id to cookies file)
     */
      getGroupId: function() {
        return 1;
      }
  }
}).call(this, jQuery);
