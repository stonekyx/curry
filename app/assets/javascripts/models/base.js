(function($){
  /**
   * @class: BaseModel implements the basic functionality of a Model.
   */
  Curry.Models.BaseModel = Backbone.Model.extend({
    /* Local Variables */

    // The name will be used as a key to store the current model.
    name: 'base',

    // The readOnly is used to mark whether the model can be modified.
    readOnly: true,

    // AttachEvents for subclass to override to bind specific evnets.
    _attachEvents: function() {},

    /* The attributesMap is the map of a model.
     * 1. For readonly models:     it is used to define how to map the json response to the model attributes.
     * 2. For non-readonly models: it is used to define attributes the model should contain.
     * Each Model Class shoule override this 'attributesMap' in its own class defination.
     */
    attributesMap: [],

    /* Initialized Functions */

    // Override the Backbone.Model's constructor function to generate the attribute according to the attributeMap.
    constructor: function(attributes, options) {
      Backbone.Model.call(this, attributes, options);

      for (var i=0, len=this.attributesMap.length; i<len; i++) {
        var obj = this.attributesMap[i];
        var modelAttr = _.keys(obj)[0];
        var defaultVal = obj[modelAttr];
        var jsonVal = attributes[Curry.Utils.Str.decamelize(modelAttr, '_')];
        this[modelAttr] = Curry.Utils.isBlank(jsonVal) ? defaultVal : jsonVal;
      }

      this._attachEvents();
    }
  });
}).call(this, jQuery);
