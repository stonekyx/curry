(function($) {
  /**
   * @namespace JsonResource Helpers
   */
  Curry.Helpers.JsonResponser = {
    /*
     * Get  JSON response based on given url and data.
     */
    get: function(options) {
      var ao = Curry.Helpers.JsonResponser._getAjaxOptions(options.ajaxOptions);
      return Curry.Helpers.JsonResponser._ajax('GET', options.url, options.data, ao);
    },

    /*
     * Post JSON response based on given url and data.
     */
    post: function(options) {
      var ao = Curry.Helpers.JsonResponser._getAjaxOptions(options.ajaxOptions);
      return Curry.Helpers.JsonResponser._ajax('POST', options.url, options.data, ao);
    },

    _getAjaxOptions: function(options) {
      var ajaxOptions = {
        dataType: 'json'
      };

      return ajaxOptions;
    },

    _ajax: function(type, url, data, ajaxOptions) {
      var self = this;
      var dfd = $.Deferred(function(d) {
        var success = function(response) {
          d.resolveWith(this, [response]);
        };
        var errors  = function(jqXHR, textStatus) {
          d.rejectWith(this, [jqXHR, textStatus]);
        };

        d.call = function() {
          d._startTime = new Date();
          $.ajax(_.extend({
            type: type,
            url: url,
            data: data,
          }, ajaxOptions)).done(success).fail(errors);
        };

        return d.promise();
      });

      dfd.call();
      return dfd;
    }
  };
}).call(this, jQuery);
