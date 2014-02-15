(function($) {
    $.fn.getAttributes = function() {
      var el = this.get(0);
      var result = {};
      for (var i=0, attrs=el.attributes, l=attrs.length; i<l; i++){
        result[attrs.item(i).nodeName] = attrs.item(i).nodeValue;
      }
      return result;
    },

    $.fn.beaconAttr = function(key, value) {
      var el = this.get(0);
      if(!_.isNull(value) && !_.isUndefined(value)) {
        return $(el).attr('beacon-attr-' + key, value);
      }
      return $(el).attr('beacon-attr-' + key);
    },
    
    $.fn.removeBeaconAttr = function(key) {
      var el = this.get(0);
      return $(el).removeAttr('beacon-attr-' + key);
    }
})(jQuery);


(function($) {
  $.fn.exists = function () {
    return this.length !== 0;
  }
})(jQuery);
