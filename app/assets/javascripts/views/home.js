(function($) {
  /**
   * @class: HomeView implemets the page logic of home page.
   */
  Curry.Views.Home = Curry.Views.BaseView.extend({
    name: 'home',

    renderInternal: function() {
      //TODO: zanwen, should render different templates according to users' identity.
      if (true) {
        $(this.el).find('#main').html(this.renderTemplate('home/game'));
      }
    }
  });
}).call(this, jQuery);
