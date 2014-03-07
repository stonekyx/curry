// Define all Curry related events.

Curry.Events = {
  COLLECTION: _.clone(Backbone.Events),

  Views: {
    BEFORE_SWAP: 'BEFORE-SWAP',
    Home: {
      GAMEOVER: 'GAME-OVER',
    }
  },

  APPLICATION: {
    READY: 'READY'
  },

  END: {}
};
