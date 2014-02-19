/* HandleBars Helpers */
Handlebars.registerHelper('list', function(items, options) {
  var out = "<ul>";

  for(var i=0, l=items.length; i<l; i++) {
    out = out + "<li>" + options.fn(items[i]) + "</li>";
  }

  return out + "</ul>";
});


Handlebars.registerHelper('first', function(items, options) {
  return options.fn(items[0]);
});

Handlebars.registerHelper('range', function(items, options) {
  var out = "";
  var range = options.hash['range'].split(',');
  var start = parseInt(range[0]);
  var end = range[1] == null ? items.length - 1 : parseInt(range[1]);
  for (var i=start; i<items.length && i<=end; i++) {
    out = out + options.fn(items[i]);
  }

  return out;
});

Handlebars.registerHelper('each_with_index', function(context, options) {
  var fn = options.fn, inverse = options.inverse;
  var ret = "";

  if(context && context.length > 0) {
    for(var i=0, j=context.length; i<j; i++) {
      context[i].index = i;
      ret = ret + fn(context[i]);
    }
  } else {
    ret = inverse(this);
  }
  return ret;
});


/** A block helper. You can use the ifequal helper to conditionally render a block.
  * Eg:
  *   {{#ifequal value1 compare="value2"}}
  *     <div>...</div>
  *   {{else}}
  *     <div>...</div>
  *   {{/ifequal}}
  */
Handlebars.registerHelper('ifequal', function(context, options){
  if (context == options.hash.compare) {
    return options.fn(this);
  }
  return options.inverse(this);
});

/** A block helper. You can use the unlessequal helper to conditionally render a block.
  * Eg: 
  *   {{#unlessequal value1 compare="value2"}}
  *     <div>...</div>
  *   {{else}}
  *     <div>...</div>
  *   {{/unlessequal}}
  */
Handlebars.registerHelper('unlessequal', function(context, options){
  if (context == options.hash.compare) {
    return options.inverse(this);
  }
  return options.fn(this);
});

/**
 * If Greater Than
 * example:
 *   {{#ifgt value1 compare="value2"}}
 *     <div>...</div>
 *   {{else}}
 *     <div>...</div>
 *   {{/ifgt}}
 */
Handlebars.registerHelper('ifgt', function(context, options) {
  if (context > options.hash.compare)
    return options.fn(this);
  return options.inverse(this);
});

/**
 * I18n method for template
 * scope: I18n key, safe: html_safe, options: I18n options
 */
Handlebars.registerHelper('I18nt', function(scope, safe, options) {
  var s = I18n.t(scope, options);  
  return safe ? new Handlebars.SafeString(s) : s;
});
