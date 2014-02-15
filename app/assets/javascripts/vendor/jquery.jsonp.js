(function(){
  var callbacks = {};
  var jqXHRs = {};
  // replace the transport dealing with cro  domain requests, add the error callback
  $.ajaxTransport("+script", function(s, originalOptions, jqXHR) {
	// This transport only deals with cross domain requests
    if ( s.crossDomain ) {
      var script,
			head = document.head || document.getElementsByTagName( "head" )[0] || document.documentElement;
      
      return {
        send: function( _, callback ) {
          var id = "jsonpCallback_" + s.jsonpCallback;

          script = $("#" + id)[0];

          if (!script) {
            script = document.createElement( "script" );
            script.id = id;

            script.async = "async";

            if ( s.scriptCharset ) {
                script.charset = s.scriptCharset;
            }

            script.src = s.url;

            callbacks[id] = [callback];
            jqXHRs[id] = [jqXHR];

            var cleanup = function() {
              // Handle memory leak in IE
              script.onload = script.onreadystatechange = script.onerror = null;

              // Remove the script
              if(head && script.parentNode) {
                head.removeChild( script );
              }

              // Remove the references of callback and jqXHR
              callbacks[id] = [];
              jqXHRs[id] = [];

              // Dereference the script
              script = undefined;
            };

            // Attach error handlers according to options.error
            script.onerror = function() {
              Hulu.Utils.warn('jsonp error');
              var jsonpXHRs = jqXHRs[id];
              cleanup();
              for (var i = jsonpXHRs.length - 1; i >= 0; --i) {
                if(jsonpXHRs[i].abort) {
                  jsonpXHRs[i].abort('error');
                }
              }
            };

            // Attach handlers for all browsers
            script.onload = script.onreadystatechange = function(_, isAbort) {
              if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
                var jsonpCallbacks = callbacks[id];
                cleanup();
                // Callback if not abort
                if ( !isAbort ) {
                  for (var i = jsonpCallbacks.length - 1; i >= 0; --i) {
                    if(jQuery.isFunction(jsonpCallbacks[i])) {
                      jsonpCallbacks[i](200, 'success');
                    }
                  }
                }
              }
            };
            // Use insertBefore instead of appendChild  to circumvent an IE6 bug.
            // This arises when a base node is used (#2709 and #4378).
            head.insertBefore( script, head.firstChild );
          } else {
            callbacks[id].push(callback);
            jqXHRs[id].push(jqXHR);
          }
        },
      
        abort: function() {
          if ( script && script.onload ) {
            script.onload( 0, 1 );
          }
        }
      };
    }
  });
}).call(this);
