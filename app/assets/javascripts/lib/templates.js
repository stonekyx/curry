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

/** An expression helper. It can invoke a item of array with a index param.
  * Eg:
  *   Assume list = ["item1", "item2"]
  *   Then expression {{itemofarray  list index=1}} will return "item2"
  */
Handlebars.registerHelper('itemofarray', function(context, options){
  var index = parseInt(options.hash.index);
  if (context instanceof Array && context.length > index) {
    return context[index];
  }
  return null;
});

/**
 * override helperMissing helper to help us find the missing attributes<br/>
 */
Handlebars.registerHelper('helperMissing', function (arg) {
  Hulu.Utils.warn("missing property " + arg + " in template " + this._templatePath);
  if (arguments.length == 2) {
    return undefined;
  } else {
    throw new Error("Could not find property '" + arg + "'");
  }
});

Handlebars.registerHelper('dayPicker', function(selected){
  var selectedDay = null;
  if(selected){
    try{
      var selectedDate = new Date(selected);
      selectedDay = selectedDate.getDate();
    }catch(error)
    {}
  }
  var html = "<select id='date_day'>";
  html += Hulu.Utils.getOptionsInRange(1, 31, selectedDay);
  html += "</select>";
  return new Handlebars.SafeString(html);
});

Handlebars.registerHelper('monthPicker', function(selected){
  var selectedMonth = null;
  if(selected){
    try{
      var selectedDate = new Date(selected);
      selectedMonth = selectedDate.getMonth() + 1;
    }catch(error)
    {}
  }
  var html = "<select id='date_month'>";
  html += Hulu.Utils.getOptionsInRange(1, 12, selectedMonth);
  html += "</select>";
  return new Handlebars.SafeString(html);
});

Handlebars.registerHelper('yearPicker', function(selected){
  var currentYear = new Date().getFullYear();
  var selectedYear = null;
  if(selected){
    try{
      var selectedDate = new Date(selected);
      selectedYear = selectedDate.getFullYear();
    }catch(error)
    {}
  }
  var html = "<select id='date_year'>";
  html += Hulu.Utils.getOptionsInRange(1900, currentYear, selectedYear || currentYear);
  html += "</select>";
  return new Handlebars.SafeString(html);
});

Handlebars.registerHelper("closeButton", function(data) {
  var alt = data.alt;
  if (alt === undefined) alt = I18n.translate("login.cancel");
  return new Handlebars.SafeString(Hulu.Utils.renderTemplate('shared/close_button', {alt: alt}));
});

/**
 * Don't escape string
 */
Handlebars.registerHelper('safeString', function(arg) {
  return new Handlebars.SafeString(arg);
});

/**
 * I18n method for template
 * scope: I18n key, safe: html_safe, options: I18n options
 */
Handlebars.registerHelper('I18nt', function(scope, safe, options) {
  var s = I18n.t(scope, options);  
  return safe ? new Handlebars.SafeString(s) : s;
});

/**
 * An render helper. It can help us render given text twice, and we can use one of them as a shadow of the other text
 */
Handlebars.registerHelper('shadow', function(text, options) {
  return new Handlebars.SafeString('<div class="shadow">' + text + '</div>' +
                                   '<div class="origin">' + text + '</div>');
});

Handlebars.registerHelper('beaconRegionAttr', function (name, zone, customName) {
  if(_.isObject(customName)) {
    customName = "";
  }
  return new Handlebars.SafeString(Hulu.Beacon.formatRegionAttrs(name, zone, customName, 'htmlstring'));
});

Handlebars.registerHelper('beaconThumbnailClickAttr', function (type, clickid, position, itemIndex) {
  var s = Hulu.Utils.Str.format("beacon-attr-type='{0}'", type) + " ";
  s += Hulu.Utils.Str.format("beacon-attr-clickid='{0}'", clickid) + " ";
  if(!isNaN(parseInt(position))) {
    s += Hulu.Utils.Str.format("beacon-attr-position='{0}'", position) + " ";
  }
  if(!isNaN(parseInt(itemIndex))) {
    s += Hulu.Utils.Str.format("beacon-attr-itemindex='{0}'", itemIndex) + " ";
  }
  return new Handlebars.SafeString(s);
});

Handlebars.registerHelper('beaconShareSiteAttr', function (site, src) {
  var s = Hulu.Utils.Str.format("beacon-attr-site='{0}'", site) + " ";
  s += Hulu.Utils.Str.format("beacon-attr-src='{0}'", src) + " ";
  return new Handlebars.SafeString(s);
});

Handlebars.registerHelper('beaconAttr', function (key, expression) {
  var value = expression != null ? Hulu.Beacon.evalAttr(expression.toString()) : '';
  return new Handlebars.SafeString(
    Hulu.Utils.Str.format("beacon-attr-{0}='{1}'", key, value)
  );
});

Handlebars.registerHelper('beaconContentAttr', function (videoType, showName, companyName) {
  var s = Hulu.Utils.Str.format("beacon-attr-video-type='{0}'", videoType) + " ";
  s += Hulu.Utils.Str.format("beacon-attr-show-name='{0}'", showName) + " ";
  s += Hulu.Utils.Str.format("beacon-attr-company-name='{0}'", companyName) + " ";
  return new Handlebars.SafeString(s);
});

Handlebars.registerHelper('beaconSearchPromoAttr', function (id, type, name) {
  var s = Hulu.Utils.Str.format("beacon-attr-promo-type='{0}'", type) + " ";
  s += Hulu.Utils.Str.format("beacon-attr-promo-id='{0}'", id) + " ";
  s += Hulu.Utils.Str.format("beacon-attr-promo-name='{0}'", name) + " ";
  return new Handlebars.SafeString(s);
});

Handlebars.registerHelper('beaconPublishAttr', function (type, item, target) {
  type = Hulu.Beacon.evalAttr(type);
  item = Hulu.Beacon.evalAttr(item);
  target = Hulu.Beacon.evalAttr(target);
  var s = Hulu.Utils.Str.format("beacon-attr-publishtype='{0}'", type) + " ";
  s += Hulu.Utils.Str.format("beacon-attr-publisheditem='{0}'", item) + " ";
  s += Hulu.Utils.Str.format("beacon-attr-publishtarget='{0}'", target) + " ";
  return new Handlebars.SafeString(s);
});

Handlebars.registerHelper('beaconPlusTrackingAttr', function(drivertype, driverid1, driverid2, driverid3) {
  drivertype = Hulu.Beacon.evalAttr(drivertype);
  var s = Hulu.Utils.Str.format("beacon-attr-drivertype='{0}'", drivertype) + " ";
  s += Hulu.Utils.Str.format("beacon-attr-driverid1='{0}'", driverid1) + " ";
  s += Hulu.Utils.Str.format("beacon-attr-driverid2='{0}'", driverid2) + " ";
  if (driverid3) {
    s += Hulu.Utils.Str.format("beacon-attr-driverid3='{0}'", driverid3) + " ";
  }
  return new Handlebars.SafeString(s);
});

Handlebars.registerHelper('didYouMean', function(sentence){
  return new Handlebars.SafeString(sentence.replace(/{word}/, "<div id=\"did-you-mean-terms\" />"));
});

Handlebars.registerHelper('mailtoHref', function(subject, body) {
  var url = "mailto:?";
  var params = [];
  if(subject) {
    params.push("subject=" + encodeURIComponent(subject));
  }
  if(body) {
    var newLine = "%0D%0A";
    var splitLines = body.split(newLine);
    _.each(splitLines, function(line, index) {
      splitLines[index] = encodeURIComponent(line);
    });
    params.push("body=" + splitLines.join(newLine));
  }
  url += params.join("&");
  var href = 'href="' + url + '"';
  return new Handlebars.SafeString(href);
});

Handlebars.registerHelper('displayCounts', function(count, oneKey, manyKey) {
  if(count <= 0) {
    return;
  }

  return new Handlebars.SafeString(count + ' ' + (count == 1 ? I18n.t(oneKey) : I18n.t(manyKey)));
});

Handlebars.registerHelper('spanIf', function(display) {
  if(display) {
    return new Handlebars.SafeString('<span>' + display + '</span>');
  }
});

Handlebars.registerHelper('longDateFormat', function(day, month, year) {
  if(day && month && year) {
    var date = new Date(year, month, day);
    return new Handlebars.SafeString(I18n.l("date.formats.long", moment(date).toDate()));
  }
}); 
