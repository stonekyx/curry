(function($){
  /**
   * @class: HomeView implemets the page logic of home page.
   */
  Curry.Models.GamePlayer = Curry.Models.BaseModel.extend({
    name: 'gamePlayer',

    readOnly: false,

    playerPos: {
        left: 0,
        top: 0
    },

    checkPoints: [],

    attributesMap: [
      { classPrefix: null },
      { className:   null },
      { direction: function(keyCode) {
          // TODO: stone, hard-coded values
          var d = '';
          this.deltaTop = "";
          this.deltaLeft = "";
          switch(keyCode) {
            case Curry.Constants.keyCodes['W']:
              d = 'up';
              if(this.playerPos.top >= 26) {
                  this.deltaTop = "-=26px";
                  this.deltaLeft = "";
              }
              break;
            case Curry.Constants.keyCodes['A']:
              d = 'left';
              if(this.playerPos.left >= 26) {
                  this.deltaTop = "";
                  this.deltaLeft = "-=26px";
              }
              break;
            case Curry.Constants.keyCodes['S']:
              d = 'down';
              if(this.playerPos.top < 260-26) {
                  this.deltaTop = "+=26px";
                  this.deltaLeft = "";
              }
              break;
            case Curry.Constants.keyCodes['D']:
              d = 'right';
              if(this.playerPos.left < 960-26) {
                  this.deltaTop = "";
                  this.deltaLeft = "+=26px";
              }
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
