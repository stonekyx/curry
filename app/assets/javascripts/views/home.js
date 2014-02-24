(function($) {
  /**
   * @class: HomeView implemets the page logic of home page.
   */
  Curry.Views.Home = Curry.Views.BaseView.extend({
    name: 'home',

    events: {
      // TODO: zanwen, should add <span> to toggle game start & end.
      'click .map': '_onGameStart',
      'blur .map': '_onGameEnd',
      'keydown .map': '_onEnterDirection',
      'keyup .map': '_onLoseDirection'
    },

    game: {},

    renderInternal: function() {
      if (Curry.Verifier.isAnonymousUser()) {
        this._container.html(this.renderTemplate('home/game'));
        // TODO: zanwen, need to handle params in a centralized way.
        this.game.player = new Curry.Models.GamePlayer({class_prefix: 'figure'});
      }
    },

    _onGameStart: function(event) {
      this._container.find('.map').attr('tabindex', 0);
      this._container.find('.map').focus();
      this.game._running = true;
      this.game.timer = setInterval(function(){}, 30);
    },
    _onGameEnd: function(evnet) {
      this._container.find('.map').removeAttr('tabindex');
      this.game._running = false;
      clearInterval(this.game.timer);
    },
    _onEnterDirection: function(event) {
      // Only one of 'W', 'A', 'S', 'D' can be pressed anytime.
      if (this.game._keypressing) return;

      this.game_keypressing = true;
      if (!Curry.Utils.isBlank(this.game.player.direction(event.keyCode))) {
        this._container.find('#player').attr('class', this.game.player.className);
      } else {
        this.game._keypressing = false;
      }
    },
    _onLoseDirection: function(event) {
      this.game._keypressing = false;
    }
  });
}).call(this, jQuery);
