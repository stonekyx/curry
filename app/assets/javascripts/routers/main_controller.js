(function($) {
  /**
   * @class: MainController implements all the routing stuffs in js part.
   * @usage: There should be only one main router of whole application.
   */
  Curry.Routers.MainController = Curry.Routers.RouteController.extend({
    name: 'main',

    /**
     * Define the mappings from a Url to a certain action of a controller.
     * [URL] can be a specific url or url with params. => [ControllerClass].[Action]
     */
    routes: {
      '': 'HomeController.index',
      //TODO: zanwen, should verify the regex for ErrorController.
      '.*': 'ErrorController.error404'
    }
  });
}).call(this, jQuery);
