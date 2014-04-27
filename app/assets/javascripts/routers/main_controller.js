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
      'signup':  'SignupController.index',
      'thanks':  'SignupController.thanks',
      'message': 'MessageController.index',
      'contact': 'MessageController.contact',
      //TODO, zacky, need to add logic to handle browser backward action issue.
      'error': 'ErrorController.error',
      '*path': 'ErrorController.index'
    }
  });
}).call(this, jQuery);
