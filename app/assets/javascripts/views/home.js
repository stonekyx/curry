(function($) {

  /**
   * @class: GameView implements the game in home page.
   */
  Curry.Views.Game = Curry.Views.BaseView.extend({
    // _container points to div#container in js template home/game
    // el is div#main surrounding _container
    name: 'player',

    events: {
      // TODO: zanwen, should add <span> to toggle game start & end.
      'click .map': '_onGameStart',
      'blur .map': '_onGameEnd',
      'keydown .map': '_onEnterDirection',
      'keyup .map': '_onLoseDirection'
    },

    renderInternal: function() {
        this.$player = this._container.find('#player');
        this.$player.css('left', this.model.playerPos.left);
        this.$player.css('top', this.model.playerPos.top);
    },

    _onGameStart: function(event) {
      this._container.find('.map').attr('tabindex', 0);
      this._container.find('.map').focus();
      this._running = true;
      this.timer = setInterval(function(){}, 30);
    },
    _onGameEnd: function(evnet) {
      this._container.find('.map').removeAttr('tabindex');
      this._running = false;
      clearInterval(this.timer);
    },
    _onEnterDirection: function(event) {
      // Only one of 'W', 'A', 'S', 'D' can be pressed anytime.
      if (this._keypressing) return;

      this._keypressing = true;
      if (!Curry.Utils.isBlank(this.model.direction(event.keyCode))) {
        this.$player.attr('class', this.model.className);
        if((this.model.deltaTop || this.model.deltaLeft) &&
            !this.$player.is(':animated')) {
            this.$player.animate({
                top: this.model.deltaTop,
                left: this.model.deltaLeft,
            }, 100);
            switch(event.keyCode) {
                case Curry.Constants.keyCodes['W']:
                    this.model.playerPos.top -= 26;
                    break;
                case Curry.Constants.keyCodes['A']:
                    this.model.playerPos.left -= 26;
                    break;
                case Curry.Constants.keyCodes['S']:
                    this.model.playerPos.top += 26;
                    break;
                case Curry.Constants.keyCodes['D']:
                    this.model.playerPos.left += 26;
                    break;
            }
            for(var i=0; i<this.model.checkPoints.length; i++) {
                var elt = this.model.checkPoints[i];
                if(elt[0]*26==this.model.playerPos.top &&
                   elt[1]*26==this.model.playerPos.left) {
                    if(elt[2]===0) {
                        this.model.goalCount++;
                    }
                    elt[2] = 1;
                    if(this.model.goalCount >= this.model.checkPoints.length) {
                        alert('success');
                        break;
                    }
                }
            };
        }
      } else {
        this._keypressing = false;
      }
    },
    _onLoseDirection: function(event) {
      this._keypressing = false;
    }
  });

  /**
   * @class: HomeView implemets the page logic of home page.
   */
  Curry.Views.Home = Curry.Views.BaseView.extend({
    name: 'home',

    gameView: {},

    renderInternal: function() {
      if(Curry.Verifier.isAnonymousUser()) {
        this.gameView = new Curry.Views.Game({
            model: this.options.models.gamePlayer,
            template: 'home/game',
            context: 'game',
        });
        this._container.html(this.gameView.render().el);
      } // TODO: stone, consider other situations.
    },

  });
}).call(this, jQuery);
