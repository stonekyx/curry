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
              this.speedDown = -1;
              break;
            case Curry.Constants.keyCodes['A']:
              d = 'left';
              this.speedRight = -1;
              break;
            case Curry.Constants.keyCodes['S']:
              d = 'down';
              this.speedDown = 1;
              break;
            case Curry.Constants.keyCodes['D']:
              d = 'right';
              this.speedRight = 1;
              break;
          }

          if (!Curry.Utils.isBlank(d)) {
            this.className = this.classPrefix + '-' + d;
          }
          return d;
        }
      },
      { speedDown:  0 },
      { speedRight: 0 }
    ],
  });
}).call(this, jQuery);
