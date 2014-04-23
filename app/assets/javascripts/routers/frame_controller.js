(function($) {
  /**
   * @class: FrameController implements frame stuffs of all pages.
   */
  Curry.Routers.FrameController = Curry.Routers.BaseController.extend({
    name: 'frame',

    contextKey: 'banner',

    _templatePrefix: 'frame/',

    _frameList: ['header', 'footer'],

    index: function() {
      var self = this;
      _.each(this._frameList, function(fragment) {
        var frameViewClass = Curry.Views[Curry.Utils.Str.capitalize(fragment)];
        if (frameViewClass) {
          var frameView = new frameViewClass({template: self._templatePrefix + fragment, context: self.contextKey});
          $('#'+fragment+'-container').empty().append(frameView.render().el);
        }
      });
    }
  });
}).call(this, jQuery);
