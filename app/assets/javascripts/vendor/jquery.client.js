(function() {
    
    var BrowserDetect = {
      init: function () {
        this.browser = this.searchString(this.dataBrowser) || "Unknown";
        this.version = this.searchVersion(navigator.userAgent)
          || this.searchVersion(navigator.appVersion)
          || "Unknown";
        this.OS = this.searchString(this.dataOS) || "Unknown";
        this.OSVersion = this.searchOSVersion(navigator.userAgent) || "Unknown";
      },
      searchString: function (data) {
        for (var i=0;i<data.length;i++)	{
          var dataString = data[i].string;
          var dataProp = data[i].prop;
          this.versionSearchString = data[i].versionSearch || data[i].identity;
          if (dataString) {
            if (dataString.indexOf(data[i].subString) != -1)
              return data[i].identity;
          }
          else if (dataProp)
            return data[i].identity;
        }
      },
      searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
      },
      searchOSVersion: function(str) {
        var ver = null;
        
        // Reference: http://www.useragentstring.com/pages/Browserlist/
        if (/^Mozilla\/\d+\.\d+ \(([^)]+)\)/.test(str)) {
          var osStr = RegExp.$1;
          if (/Windows NT ([^;]+)/.test(osStr)) {
            ver = RegExp.$1;
          }
          else if (/Mac OS X ([^;]+)/.test(osStr)) {
            ver = RegExp.$1;
          }
          else
             ver = osStr;
        }
        return ver;
      },
      dataBrowser: [
        {
          string: navigator.userAgent,
          subString: "Chrome",
          identity: "Chrome"
        },
        { //Chrome for iOS
          string: navigator.userAgent,
          subString: "CriOS",
          identity: "Chrome",
          versionSearch: "CriOS"
        },
        { //Silk
          string: navigator.userAgent,
          subString: "Silk",
          identity: "Silk"
        },
        { 	string: navigator.userAgent,
          subString: "OmniWeb",
          versionSearch: "OmniWeb/",
          identity: "OmniWeb"
        },
        {
          string: navigator.vendor,
          subString: "Apple",
          identity: "Safari",
          versionSearch: "Version"
        },
        {
          prop: window.opera,
          identity: "Opera"
        },
        {
          string: navigator.vendor,
          subString: "iCab",
          identity: "iCab"
        },
        {
          string: navigator.vendor,
          subString: "KDE",
          identity: "Konqueror"
        },
        {
          string: navigator.userAgent,
          subString: "Firefox",
          identity: "Firefox"
        },
        {
          string: navigator.vendor,
          subString: "Camino",
          identity: "Camino"
        },
        {		// for newer Netscapes (6+)
          string: navigator.userAgent,
          subString: "Netscape",
          identity: "Netscape"
        },
        {
          string: navigator.userAgent,
          subString: "MSIE",
          identity: "Explorer",
          versionSearch: "MSIE"
        },
        {
          string: navigator.userAgent,
          subString: "Trident",
          identity: "Explorer",
          versionSearch: "rv"
        },
        {
          string: navigator.userAgent,
          subString: "Gecko",
          identity: "Mozilla",
          versionSearch: "rv"
        },
        { 		// for older Netscapes (4-)
          string: navigator.userAgent,
          subString: "Mozilla",
          identity: "Netscape",
          versionSearch: "Mozilla"
        }
      ],
      dataOS : [
        {
          string: navigator.platform,
          subString: "Win",
          identity: "Windows"
        },
        {
          string: navigator.platform,
          subString: "Mac",
          identity: "Mac"
        },
        {
          string: navigator.userAgent,
          subString: "iPhone",
          identity: "iPhone/iPod"
        },
        {
          string: navigator.userAgent,
          subString: "iPad",
          identity: "iPad"
        },
        {
          string: navigator.platform,
          subString: "Linux",
          identity: "Linux"
        }
      ]
    
    };
    
    BrowserDetect.init();
    
    var client = {
      os: BrowserDetect.OS,
      osVersion: BrowserDetect.OSVersion,
      browser: BrowserDetect.browser,
      version: BrowserDetect.version
    };
    
    // Align logic to jQuery.browser
    if (client.browser != 'Unknown') {
      client[client.browser.toLowerCase()] = true;
    }
    
    if (client.chrome || client.safari) {
      client.webkit = true;
      client.safari = true;
    } else if (client.firefox) {
      client.mozilla = true;
    } else if (client.explorer) {
      client.msie = true;
    }
    
    window.$.client = client;
})();
