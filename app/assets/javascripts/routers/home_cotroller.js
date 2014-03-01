(function($) {
  /**
   * @class: HomeController implements routing stuffs in home page.
   */
  Curry.Routers.HomeController = Curry.Routers.BaseController.extend({
    name: 'home',

    // Context keys Collections
    CONTEXT: {
      HOME: 'home'
    },

    _template: 'home/index',

    _startAction: function(contextKey) {
      this._generatePageConfigs(contextKey);
      this._generatePageModels(this.pageConfigs);
      return this.swap(new Curry.Views.Home({template: this._template, context: contextKey, models: this.pageModels}));
    },

    _retrieveModelByKey: function(key) {
      var tempModel = null;
      if(key == 0) {
        tempModel = new Curry.Models.GamePlayer({class_prefix: 'figure'});
      }

      return tempModel;
    },

    _generatePageModels: function(configs) {
      this.pageModels['accessKey'] = configs.accessKey;
      this.pageModels['user'] = {};
      for (var i=0; i<Curry.Constants.groupNumLimit; i++) {
        if (this.pageModels.accessKey & 1 << i) {
          this.pageModels['user'][i] = this._retrieveModelByKey(i);
        }
      }

      return this.pageModels;
    },

    index: function() {
      this._startAction(this.CONTEXT.HOME);
    }
  });
}).call(this, jQuery);
