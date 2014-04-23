// Define all Curry related events.

Curry.Events = {
  COLLECTION: _.clone(Backbone.Events),

  Views: {
    BEFORE_SWAP: 'BEFORE-SWAP',
    Header: {
      LOGGEDIN: 'LOGGED-IN',
      LOGGEDOUT: 'LOGGED-OUT'
    },
    Home: {
      GAMEOVER: 'GAME-OVER',
    }
  },

  APPLICATION: {
    READY: 'READY'
  },

  END: {}
};
