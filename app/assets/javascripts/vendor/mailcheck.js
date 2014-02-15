/*
 * Mailcheck https://github.com/Kicksend/mailcheck
 * Author
 * Derrick Ko (@derrickko)
 *
 * License
 * Copyright (c) 2012 Receivd, Inc.
 *
 * Licensed under the MIT License.
 *
 * v 1.1
 */

var Kicksend = {
  mailcheck : {
    threshold: 2,
 
    defaultDomains: ["gmail.com", "yahoo.co.jp", "docomo.ne.jp", "ezweb.ne.jp", "i.softbank.jp", "hotmail.com", 
    "hotmail.co.jp", "softbank.ne.jp", "nifty.com", "me.com", "ybb.ne.jp", "yahoo.com", "icloud.com", "live.jp", "mail.goo.ne.jp", 
    "mac.com", "jcom.home.ne.jp", "msn.com", "ozzio.jp", "bma.biglobe.ne.jp", "excite.co.jp", "aol.com", "hb.tp1.jp", 
    "tbz.t-com.ne.jp", "outlook.com", "infoseek.jp", "sjsu.edu", "sdsu.edu", "homesc.com", "ae.auone-net.jp", "outlook.jp", "qq.com", "t.vodafone.ne.jp", "gaia.eonet.ne.jp", 
    "mopera.net", "ymail.com", "nifty.ne.jp", "ares.eonet.ne.jp", "leto.eonet.ne.jp", "maia.eonet.ne.jp", "ac.auone-net.jp", 
    "zeus.eonet.ne.jp", "nike.eonet.ne.jp", "iris.eonet.ne.jp", "livedoor.com", "yahoo.ne.jp", "naver.com", "goo.jp", "gol.com", 
    "yahoo.com.tw", "emobile.ne.jp", "i.softbank.ne.jp", "live.com", "comcast.net", "sbcglobal.net", "att.net", "verizon.net", 
    "cox.net", "bellsouth.net", "rocketmail.com", "aim.com", "charter.net", "earthlink.net", "optonline.net", "windstream.net", 
    "juno.com", "roadrunner.com", "mail.com", "frontier.com", "q.com", "embarqmail.com", "centurylink.net", "mchsi.com", 
    "suddenlink.net", "cfl.rr.com", "insightbb.com", "us.army.mil", "asu.edu", "cableone.net", "netscape.net", "umich.edu", 
    "umn.edu", "netzero.com", "netzero.net", "tampabay.rr.com", "nc.rr.com", "nyu.edu", "email.phoenix.edu", "gmx.com", 
    "frontiernet.net", "pacbell.net", "msu.edu", "osu.edu", "wi.rr.com", "mindspring.com", "rochester.rr.com", "ufl.edu", 
    "centurytel.net", "tds.net", "kent.edu", "vt.edu", "liberty.edu", "indiana.edu", "facebook.com", "cornell.edu", "email.vccs.edu", 
    "psu.edu", "carolina.rr.com", "email.com", "mail.usf.edu", "excite.com", "wisc.edu", "colorado.edu", "email.arizona.edu", 
    "knights.ucf.edu", "uga.edu", "austin.rr.com", "yahoo.co.uk", "googlemail.com", "virginia.edu", "columbia.edu", "ptd.net", 
    "bresnan.net", "triad.rr.com", "usc.edu", "fuse.net", "ncsu.edu", "ucdavis.edu", "ameritech.net", "nycap.rr.com", "ucla.edu", 
    "swbell.net", "ohio.edu", "crimson.ua.edu", "purdue.edu", "wowway.com", "bu.edu", "ivytech.edu", "prodigy.net", "hawaii.edu", 
    "twcny.rr.com", "zoominternet.net", "utk.edu", "txstate.edu", "kc.rr.com", "mail.missouri.edu", "okstate.edu", "uw.edu", "cinci.rr.com", 
    "berkeley.edu", "neo.rr.com", "utexas.edu", "hawaii.rr.com", "woh.rr.com", "hotmail.co.uk", "yahoo.fr", "ou.edu", 
    "uwm.edu", "satx.rr.com", "tx.rr.com", "ttu.edu", "temple.edu", "vcu.edu", "inbox.com", "uiowa.edu", "my.fsu.edu", "columbus.rr.com", 
    "rcn.com", "auburn.edu", "maricopa.edu", "myfairpoint.net", "maine.rr.com", "optimum.net", "illinois.edu", "nau.edu", "fiu.edu", 
    "nyc.rr.com", "sc.rr.com", "uoregon.edu", "yahoo.ca", "email.sc.edu", "clear.net", "baylor.edu", "maine.edu", 
    "mail.uc.edu", "syr.edu", "byui.edu", "ucsd.edu", "iastate.edu", "tamu.edu", "kctcs.edu", "clearwire.net", "stanford.edu", 
    "uky.edu", "stny.rr.com", "uark.edu", "cmich.edu", "mail.gvsu.edu", "buffalo.edu", "student.gsu.edu", "ku.edu", "u.washington.edu", 
    "uci.edu", "unm.edu", "new.rr.com", "usa.net", "knology.net", "pdx.edu", "duke.edu", "lycos.com", "ksu.edu", "lsu.edu", "snet.net", 
    "muohio.edu", "fsu.edu", "buckeyemail.osu.edu", "mix.wvu.edu", "georgetown.edu", "appstate.edu", "email.itt-tech.edu", "usa.com", 
    "bsu.edu", "yahoo.es", "ca.rr.com", "pitt.edu", "hotmail.ca", "emich.edu", "google.com", "myway.com", "mavs.uta.edu", "utah.edu", 
    "odu.edu", "gci.net", "email.wsu.edu", "uncc.edu", "my.unt.edu", "udel.edu", "nmsu.edu", "vanderbilt.edu", "rams.colostate.edu", 
    "clemson.edu", "cs.com", "csu.fullerton.edu", "email.unc.edu", "umail.iu.edu", "aggiemail.usu.edu", "stu.aii.edu", "pcc.edu", 
    "wmich.edu", "ec.rr.com", "peoplepc.com", "uncg.edu", "zips.uakron.edu", "u.boisestate.edu", "iupui.edu", "yahoo.co.in", "yale.edu", 
    "msstate.edu", "u.northwestern.edu", "atlanticbb.net", "vandals.uidaho.edu", "comcast.com", "san.rr.com", "att.com", "uab.edu", 
    "hughes.net", "drexel.edu", "surewest.net", "bc.edu", "zoomtown.com", "tulane.edu", "topper.wku.edu", "isu.edu", "pobox.com", 
    "my.csun.edu", "socal.rr.com", "siu.edu", "onid.orst.edu", "gmu.edu", "uic.edu", "twc.com", "g.austincc.edu", "gwmail.gwu.edu", 
    "uchicago.edu", "husky.neu.edu", "umd.edu", "gatech.edu", "fullsail.edu", "memphis.edu", "mit.edu", "students.ecu.edu", "uh.edu", 
    "student.cccs.edu", "yahoo.com.mx", "calpoly.edu", "ilstu.edu", "bex.net", "dukes.jmu.edu", "uconn.edu", "georgiasouthern.edu", 
    "bgsu.edu", "mtmail.mtsu.edu", "tigers.lsu.edu", "case.edu", "slu.edu", "comporium.net", "mail.utexas.edu", "goldmail.etsu.edu", 
    "live.unc.edu", "mail.ru", "loop.colum.edu", "jhu.edu", "wayne.edu", "gmx.de", "metrocast.net", "students.kennesaw.edu", "ucr.edu", 
    "wright.edu", "adelphia.net", "jacks.sdstate.edu", "umail.ucsb.edu", "ucsc.edu", "unlv.nevada.edu", "rediffmail.com", "radford.edu", 
    "d.umn.edu", "wildblue.net", "wavecable.com", "uvm.edu", "shsu.edu", "luc.edu", "nd.edu", "post.harvard.edu", "huskers.unl.edu", 
    "microsoft.com", "tcu.edu", "live.missouristate.edu", "valdosta.edu", "rit.edu", "neo.tamu.edu", "mediacombb.net"],

    defaultTopLevelDomains: ["co.jp", "co.uk", "com", "net", "org", "info", "edu", "gov", "mil"],

    run: function(opts) {
      opts.domains = opts.domains || Kicksend.mailcheck.defaultDomains;
      opts.topLevelDomains = opts.topLevelDomains || Kicksend.mailcheck.defaultTopLevelDomains;
      opts.distanceFunction = opts.distanceFunction || Kicksend.sift3Distance;

      var result = Kicksend.mailcheck.suggest(encodeURI(opts.email), opts.domains, opts.topLevelDomains, opts.distanceFunction);

      if (result) {
        if (opts.suggested) {
          opts.suggested(result);
        }
      } else {
        if (opts.empty) {
          opts.empty();
        }
      }
    },

    suggest: function(email, domains, topLevelDomains, distanceFunction) {
      email = email.toLowerCase();

      var emailParts = this.splitEmail(email);

      var closestDomain = this.findClosestDomain(emailParts.domain, domains, distanceFunction);

      if (closestDomain) {
        if (closestDomain != emailParts.domain) {
          // The email address closely matches one of the supplied domains; return a suggestion
          return { address: emailParts.address, domain: closestDomain, full: emailParts.address + "@" + closestDomain };
        }
      } else {
        // The email address does not closely match one of the supplied domains
        var closestTopLevelDomain = this.findClosestDomain(emailParts.topLevelDomain, topLevelDomains);
        if (emailParts.domain && closestTopLevelDomain && closestTopLevelDomain != emailParts.topLevelDomain) {
          // The email address may have a mispelled top-level domain; return a suggestion
          var domain = emailParts.domain;
          closestDomain = domain.substring(0, domain.lastIndexOf(emailParts.topLevelDomain)) + closestTopLevelDomain;
          return { address: emailParts.address, domain: closestDomain, full: emailParts.address + "@" + closestDomain };
        }
      }
      /* The email address exactly matches one of the supplied domains, does not closely
       * match any domain and does not appear to simply have a mispelled top-level domain,
       * or is an invalid email address; do not return a suggestion.
       */
      return false;
    },

    findClosestDomain: function(domain, domains, distanceFunction) {
      var dist;
      var minDist = 99;
      var closestDomain = null;

      if (!domain || !domains) {
        return false;
      }
      if(!distanceFunction) {
        distanceFunction = this.sift3Distance;
      }

      for (var i = 0; i < domains.length; i++) {
        if (domain === domains[i]) {
          return domain;
        }
        dist = distanceFunction(domain, domains[i]);
        if (dist < minDist) {
          minDist = dist;
          closestDomain = domains[i];
        }
      }

      if (minDist <= this.threshold && closestDomain !== null) {
        return closestDomain;
      } else {
        return false;
      }
    },

    sift3Distance: function(s1, s2) {
      // sift3: http://siderite.blogspot.com/2007/04/super-fast-and-accurate-string-distance.html
      if (s1 == null || s1.length === 0) {
        if (s2 == null || s2.length === 0) {
          return 0;
        } else {
          return s2.length;
        }
      }

      if (s2 == null || s2.length === 0) {
        return s1.length;
      }

      var c = 0;
      var offset1 = 0;
      var offset2 = 0;
      var lcs = 0;
      var maxOffset = 5;

      while ((c + offset1 < s1.length) && (c + offset2 < s2.length)) {
        if (s1.charAt(c + offset1) == s2.charAt(c + offset2)) {
          lcs++;
        } else {
          offset1 = 0;
          offset2 = 0;
          for (var i = 0; i < maxOffset; i++) {
            if ((c + i < s1.length) && (s1.charAt(c + i) == s2.charAt(c))) {
              offset1 = i;
              break;
            }
            if ((c + i < s2.length) && (s1.charAt(c) == s2.charAt(c + i))) {
              offset2 = i;
              break;
            }
          }
        }
        c++;
      }
      return (s1.length + s2.length) /2 - lcs;
    },

    splitEmail: function(email) {
      var parts = email.split('@');

      if (parts.length < 2) {
        return false;
      }

      for (var i = 0; i < parts.length; i++) {
        if (parts[i] === '') {
          return false;
        }
      }

      var domain = parts.pop();
      var domainParts = domain.split('.');
      var tld = '';

      if (domainParts.length == 0) {
        // The address does not have a top-level domain
        return false;
      } else if (domainParts.length == 1) {
        // The address has only a top-level domain (valid under RFC)
        tld = domainParts[0];
      } else {
        // The address has a domain and a top-level domain
        for (var i = 1; i < domainParts.length; i++) {
          tld += domainParts[i] + '.';
        }
        if (domainParts.length >= 2) {
          tld = tld.substring(0, tld.length - 1);
        }
      }

      return {
        topLevelDomain: tld,
        domain: domain,
        address: parts.join('@')
      }
    }
  }
};

// Export the mailcheck object if we're in a CommonJS env (e.g. Node).
// Modeled off of Underscore.js.
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Kicksend.mailcheck;
}

if (typeof window !== 'undefined' && window.jQuery) {
  (function($){
    $.fn.mailcheck = function(opts) {
      var self = this;
      if (opts.suggested) {
        var oldSuggested = opts.suggested;
        opts.suggested = function(result) {
          oldSuggested(self, result);
        };
      }

      if (opts.empty) {
        var oldEmpty = opts.empty;
        opts.empty = function() {
          oldEmpty.call(null, self);
        };
      }

      opts.email = this.val();
      Kicksend.mailcheck.run(opts);
    }
  })(jQuery);
}