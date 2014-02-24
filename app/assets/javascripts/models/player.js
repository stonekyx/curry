(function($){
  /**
   * @class: HomeView implemets the page logic of home page.
   */
  Curry.Models.GamePlayer = Curry.Models.BaseModel.extend({
    name: 'gamePlayer',

    readOnly: false,

    attributesMap: [
      { classPrefix: null },
      { className:   null },
      { direction: function(keyCode) {
          var d = '';
          switch(keyCode) {
            case Curry.Constants.keyCodes['W']:
              d = 'up';
              break;
            case Curry.Constants.keyCodes['A']:
              d = 'left';
              break;
            case Curry.Constants.keyCodes['S']:
              d = 'down';
              break;
            case Curry.Constants.keyCodes['D']:
              d = 'right';
              break;
          }

          if (!Curry.Utils.isBlank(d)) {
            this.className = this.classPrefix + '-' + d;
          }
          return d;
        }
      },
    ],
  });
}).call(this, jQuery);
