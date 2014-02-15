(function() {
  // SR-2351, Fix continuous reload loop when { hashChange: false } in IE <= 7
  // latest backbone has fixed the bug, once backbone-rails gem update, we can remove the hack
  if ($.client.browser == "Explorer" && $.client.version <= 7) {
    Backbone.History.prototype.navigate = function(){
    };
  }
  /** Trigger one event, firing all bound callbacks safely, which means that
   *  it will catch the exceptions from each callback, and make sure other callback
   *  can be executed even some of them throw exceptions.
   *  @param {String} event Event to trigger
   *  @param {Function} [errorHandler=null] Function will be called when some callback throws
   *    exception. There will be 2 arguments: exception and data
   *  @param {Object} [data=null] Data to trigger the event
   */
  Backbone.Events.triggerSafe = function(event, errorHandler, data) {
    var node, calls, tail, args, all;
    if (!(calls = this._callbacks)) return this;
    all = calls.all;

    node = calls[event];
    if (node) {
      tail = node.tail;
      while ((node = node.next) !== tail) {
        try {
          node.callback.apply(node.context || this, [data]);
        } catch (ex) {
          if (errorHandler != null) {
            errorHandler.call(node.context || this, data)
          }
        }
      }
    }
    node = all;
    if (node) {
      tail = node.tail;
      args = [event].concat(data);
      while ((node = node.next) !== tail) {
        try {
          node.callback.apply(node.context || this, args);
        } catch (ex) {
          if (errorHandler != null) {
            errorHandler.call(node.context || this, event, data)
          }
        }
      }
    }

    return this;
  }

  // for google in page analytics
  Backbone.History.prototype.gaHash = /^gaso=.*$/;

  // Start the hash change handling, returning `true` if the current URL matches
  // an existing route, and `false` otherwise.
  // Note: this code is copied from backbone.js and only added hack for google analytics, see SR-5253
  Backbone.History.prototype.start = function(options) {
    if (Backbone.History.started) throw new Error("Backbone.history has already been started");
    Backbone.History.started = true;

    var routeStripper = /^[#\/]/;
    var isExplorer = /msie [\w.]+/;

    // Figure out the initial configuration. Do we need an iframe?
    // Is pushState desired ... is it available?
    this.options          = _.extend({}, {root: '/'}, this.options, options);
    this._wantsHashChange = this.options.hashChange !== false;
    this._wantsPushState  = !!this.options.pushState;
    this._hasPushState    = !!(this.options.pushState && window.history && window.history.pushState);
    var fragment          = this.getFragment();
    var docMode           = document.documentMode;
    var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));

    if (oldIE) {
      this.iframe = $('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo('body')[0].contentWindow;
      this.navigate(fragment);
    }

    // Depending on whether we're using pushState or hashes, and whether
    // 'onhashchange' is supported, determine how we check the URL state.
    if (this._hasPushState) {
      $(window).bind('popstate', this.checkUrl);
    } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
      $(window).bind('hashchange', this.checkUrl);
    } else if (this._wantsHashChange) {
      this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
    }

    // Determine if we need to change the base url, for a pushState link
    // opened by a non-pushState browser.
    this.fragment = fragment;
    var loc = window.location;
    var atRoot  = loc.pathname == this.options.root;

    // If we've started off with a route from a `pushState`-enabled browser,
    // but we're currently in a browser that doesn't support it...
    if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !atRoot) {
      this.fragment = this.getFragment(null, true);
      window.location.replace(this.options.root + '#' + this.fragment);
      // Return immediately as browser will do redirect to new url
      return true;

    // Or if we've started out with a hash-based route, but we're currently
    // in a browser where it could be `pushState`-based instead...
    } else if (this._wantsPushState && this._hasPushState && atRoot && loc.hash) {
      // (HACK, SR-5253) for in page google analytics
      var hash = this.getHash();
      if (!hash.match(this.gaHash)) {
        this.fragment = hash.replace(routeStripper, '');
        window.history.replaceState({}, document.title, loc.protocol + '//' + loc.host + this.options.root + this.fragment);
      }
    }

    if (!this.options.silent) {
      return this.loadUrl();
    }
  }

}).call(this);
