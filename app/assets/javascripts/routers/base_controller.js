(function($) {
  /**
   * @class: BaseController implements the basic functionality of a Controller.
   * @usage: A specific controller is used to handle a specific url.
   *   1. Get the context of the application.
   *   2. Prepare the Model for View to render.
   *   3. Create the View.
   */

  Curry.Routers.BaseController = Support.SwappingRouter.extend({
    /* Local Variables */

    // The name will be used as a key to store controller history state.
    name: 'base',

    // The swapping router of the controller
    router: null,

    // The view name of the controller
    pageView: null,

    // Configs of current page
    pageConfigs: {},

    // Models of current page
    pageModels:  {},

    /* Page Data Functions */

    _generatePageConfigs: function(context) {},

    _checkValid: function() {
      return !Curry.Utils.isBlank(this.router);
    },

    /* Swapping Functions */

    // The entry of actions
    _actionHandler: function() {
      var actionCallback = this[arguments[0]];
      if (Curry.Utils.isBlank(actionCallback) || !Curry.Utils.isFunction(actionCallback)) {
        //TODO: zanwen, should throw exceptions here.
      }

      //TODO: zanwen, should handle query params here.
      var args = Array.prototype.slice.call(arguments).shift();
      actionCallback.apply(this);
    },

    // Swap to the given view. Should be invoked at the end of actions.
    swap: function(view) {
      if (!this._checkValid()) return false;
      if (view == null) {
        //TODO: zanwen, should throw exceptions here.
      }

      this.pageView = view.name;
      this.router.swap(view);
      return true;
    },

    swapToErrorPage: function(errorCode) {},

    // Update head data after page swapped.
    _updateHeadData: function(metadata) {},

    /* Register cirtical async task which will block the view transition until task is finished.
     *
     * @param {jQuery.Deferred|jQuery.Promise} [deferredTask] A async task represented by a deferred object.
     *   see <a href="http://api.jquery.com/category/deferred-object/">jQuery Deferred Object</a> for more details.
     * @param {function} [fallback] The fallback if task failed or timeout. It won't be invoked when task is done successfully.
     *   it's specified when task failed, and it won't cause the view transition error, but just call fallback and act as it's done.
     */
    registerCriticalTask: function(deferredTask, fallback) {
      if (this._checkValid()) {
        this.router.registerCriticalTask(deferredTask, fallback);
      }
    }
  });
}).call(this, jQuery);
