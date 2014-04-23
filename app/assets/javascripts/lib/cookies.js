(function($) {
  /**
   * @namespace Cookies
   */
  window.Cookies = {
    /*
     * Get cookie value according to cookie key.
     * @param {string} key The key of queried cookie
     * @return {string} The value of related key
     */
    getCookieByKey: function(key) {
      var value = null;
      var config = LongIslandIcedTea[key];
      var decode = decodeURIComponent;

      if (!Curry.Utils.isBlank(config)) {
        var name = config['name'];
        _.find(document.cookie.split(';'), function(item) {
          var kv = item.split('=');
          if (kv.length == 2 && decode(Curry.Utils.Str.trim(kv[0])) == name) {
            value = decode(Curry.Utils.Str.trim(kv[1]));
            return true;
          }
        });
      }

      return value;
    },

    /*
     * Set cookie value according to cookie key.
     * @param {string} key The predefined cookie key
     * @param {string} value The cookie value to be set
     * @return {boolean} Whether the cookie is set successfully
     */
    setCookieByKey: function(key, value) {
      if (Curry.Utils.isUndefined(value) || Curry.Utils.isNull(value)) return false;

      var config = LongIslandIcedTea[key];
      var encode = encodeURIComponent;

      if (!Curry.Utils.isBlank(config)) {
        var name = config['name'];
        value = encode(name) + '=' + encode(value);

        var expires = new Date();
        var delta = Curry.Utils.isBlank(config['expires_in']) ? Curry.Constants.SITE.SESSIONAGE : config['expires_in'];
        var result = delta.match(/^([0-9]+)(s|m|h|d|mo|y)$/);
        switch (result[2]) {
          case 's':  expires.setSeconds(expires.getSeconds() + parseInt(result[0])); break;
          case 'm':  expires.setMinutes(expires.getMinutes() + parseInt(result[0])); break;
          case 'h':  expires.setHours(expires.getHours() + parseInt(result[0])); break;
          case 'd':  expires.setDate(expires.getDate() + parseInt(result[0])); break;
          case 'mo': expires.setMonth(expires.getMonth() + parseInt(result[0])); break;
          case 'y':  expires.setYear(expires.getYear() + parseInt(result[0])); break;
        }
        value += '; expires=' + expires.toUTCString();


        var path = Curry.Utils.isBlank(config['path']) ? '/' : config['path'];
        value += '; path=' + path;
        //TODO: zacky, should handle more propterties of the cookie.

        if (!Curry.Utils.isBlank(config['secure']) && config['secure']) {
          value += '; secure';
        }

        if (!Curry.Utils.isBlank(config['use_domain']) && config['use_domain']) {
          value += '; domain=' + Curry.Constants.SITE.COOKIEDOMAIN;
        }

        document.cookie = value;
        return true;
      }

      return false;
    },

    /*
     * Erase cookie value according to cookie key.
     * @param {string} key The predefined cookie key to be erased
     * @return {boolean} Whether the cookie is erased successfully
     */
    eraseCookieByKey: function(key) {
      var config = LongIslandIcedTea[key];

      if (!Curry.Utils.isBlank(config)) {
        return this.setCookieByKey(key, "");
      }

      return false;
    },

    /*
     * Erase all user cookies.
     * @return {boolean} Whether cookies are erased successfully
     */
    eraseUserCookies: function() {
      var self = this;
      var cookieKeys = _.keys(LongIslandIcedTea);
      _.each(cookieKeys, function(key) {
        if (!LongIslandIcedTea[key]['keep_on_logout']) {
          self.eraseCookieByKey(key);
        }
      });

      return true;
    }
  }
}).call(this, jQuery);
