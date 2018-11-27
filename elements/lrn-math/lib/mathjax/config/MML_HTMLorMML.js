/*
 *  /MathJax/config/MML_HTMLorMML.js
 *  
 *  Copyright (c) 2010-2018 The MathJax Consortium
 *
 *  Part of the MathJax library.
 *  See http://www.mathjax.org for details.
 * 
 *  Licensed under the Apache License, Version 2.0;
 *  you may not use this file except in compliance with the License.
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 */

MathJax.Hub.Config({ delayJaxRegistration: true });

MathJax.Ajax.Preloading(
  "[MathJax]/jax/input/MathML/config.js",
  "[MathJax]/jax/output/HTML-CSS/config.js",
  "[MathJax]/jax/output/NativeMML/config.js",
  "[MathJax]/jax/output/PreviewHTML/config.js",
  "[MathJax]/config/MMLorHTML.js",
  "[MathJax]/extensions/mml2jax.js",
  "[MathJax]/extensions/MathEvents.js",
  "[MathJax]/extensions/MathZoom.js",
  "[MathJax]/extensions/MathMenu.js",
  "[MathJax]/jax/element/mml/jax.js",
  "[MathJax]/extensions/toMathML.js",
  "[MathJax]/jax/input/MathML/jax.js",
  "[MathJax]/jax/output/PreviewHTML/jax.js",
  "[MathJax]/extensions/fast-preview.js",
  "[MathJax]/extensions/AssistiveMML.js",
  "[MathJax]/extensions/a11y/accessibility-menu.js"
);

MathJax.Hub.Config({
  extensions: ["[a11y]/accessibility-menu.js"]
});

MathJax.InputJax.MathML = MathJax.InputJax({
  id: "MathML",
  version: "2.7.5",
  directory: MathJax.InputJax.directory + "/MathML",
  extensionDir: MathJax.InputJax.extensionDir + "/MathML",
  entityDir: MathJax.InputJax.directory + "/MathML/entities",
  config: { useMathMLspacing: false }
});
MathJax.InputJax.MathML.Register("math/mml");
MathJax.InputJax.MathML.loadComplete("config.js");
MathJax.OutputJax["HTML-CSS"] = MathJax.OutputJax({
  id: "HTML-CSS",
  version: "2.7.5",
  directory: MathJax.OutputJax.directory + "/HTML-CSS",
  extensionDir: MathJax.OutputJax.extensionDir + "/HTML-CSS",
  autoloadDir: MathJax.OutputJax.directory + "/HTML-CSS/autoload",
  fontDir: MathJax.OutputJax.directory + "/HTML-CSS/fonts",
  webfontDir: MathJax.OutputJax.fontDir + "/HTML-CSS",
  config: {
    noReflows: true,
    matchFontHeight: true,
    scale: 100,
    minScaleAdjust: 50,
    availableFonts: ["STIX", "TeX"],
    preferredFont: "TeX",
    webFont: "TeX",
    imageFont: "TeX",
    undefinedFamily: "STIXGeneral,'Arial Unicode MS',serif",
    mtextFontInherit: false,
    EqnChunk: MathJax.Hub.Browser.isMobile ? 10 : 50,
    EqnChunkFactor: 1.5,
    EqnChunkDelay: 100,
    linebreaks: { automatic: false, width: "container" },
    styles: {
      ".MathJax_Display": { "text-align": "center", margin: "1em 0em" },
      ".MathJax .merror": {
        "background-color": "#FFFF88",
        color: "#CC0000",
        border: "1px solid #CC0000",
        padding: "1px 3px",
        "font-style": "normal",
        "font-size": "90%"
      },
      ".MathJax .MJX-monospace": { "font-family": "monospace" },
      ".MathJax .MJX-sans-serif": { "font-family": "sans-serif" },
      "#MathJax_Tooltip": {
        "background-color": "InfoBackground",
        color: "InfoText",
        border: "1px solid black",
        "box-shadow": "2px 2px 5px #AAAAAA",
        "-webkit-box-shadow": "2px 2px 5px #AAAAAA",
        "-moz-box-shadow": "2px 2px 5px #AAAAAA",
        "-khtml-box-shadow": "2px 2px 5px #AAAAAA",
        filter:
          "progid:DXImageTransform.Microsoft.dropshadow(OffX=2, OffY=2, Color='gray', Positive='true')",
        padding: "3px 4px",
        "z-index": 401
      }
    }
  }
});
if (MathJax.Hub.Browser.isMSIE && document.documentMode >= 9) {
  delete MathJax.OutputJax["HTML-CSS"].config.styles["#MathJax_Tooltip"].filter;
}
if (!MathJax.Hub.config.delayJaxRegistration) {
  MathJax.OutputJax["HTML-CSS"].Register("jax/mml");
}
MathJax.Hub.Register.StartupHook("End Config", [
  function(b, c) {
    var a = b.Insert(
      {
        minBrowserVersion: {
          Firefox: 3,
          Opera: 9.52,
          MSIE: 6,
          Chrome: 0.3,
          Safari: 2,
          Konqueror: 4
        },
        inlineMathDelimiters: ["$", "$"],
        displayMathDelimiters: ["$$", "$$"],
        multilineDisplay: true,
        minBrowserTranslate: function(f) {
          var e = b.getJaxFor(f),
            k = ["[Math]"],
            j;
          var h = document.createElement("span", {
            className: "MathJax_Preview"
          });
          if (e.inputJax === "TeX") {
            if (e.root.Get("displaystyle")) {
              j = a.displayMathDelimiters;
              k = [j[0] + e.originalText + j[1]];
              if (a.multilineDisplay) {
                k = k[0].split(/\n/);
              }
            } else {
              j = a.inlineMathDelimiters;
              k = [
                j[0] +
                  e.originalText.replace(/^\s+/, "").replace(/\s+$/, "") +
                  j[1]
              ];
            }
          }
          for (var g = 0, d = k.length; g < d; g++) {
            h.appendChild(document.createTextNode(k[g]));
            if (g < d - 1) {
              h.appendChild(document.createElement("br"));
            }
          }
          f.parentNode.insertBefore(h, f);
        }
      },
      b.config["HTML-CSS"] || {}
    );
    if (
      b.Browser.version !== "0.0" &&
      !b.Browser.versionAtLeast(a.minBrowserVersion[b.Browser] || 0)
    ) {
      c.Translate = a.minBrowserTranslate;
      b.Config({ showProcessingMessages: false });
      MathJax.Message.Set(
        ["MathJaxNotSupported", "Your browser does not support MathJax"],
        null,
        4000
      );
      b.Startup.signal.Post("MathJax not supported");
    }
  },
  MathJax.Hub,
  MathJax.OutputJax["HTML-CSS"]
]);
MathJax.OutputJax["HTML-CSS"].loadComplete("config.js");
MathJax.OutputJax.NativeMML = MathJax.OutputJax({
  id: "NativeMML",
  version: "2.7.5",
  directory: MathJax.OutputJax.directory + "/NativeMML",
  extensionDir: MathJax.OutputJax.extensionDir + "/NativeMML",
  config: {
    matchFontHeight: true,
    scale: 100,
    minScaleAdjust: 50,
    styles: {
      "div.MathJax_MathML": { "text-align": "center", margin: ".75em 0px" }
    }
  }
});
if (!MathJax.Hub.config.delayJaxRegistration) {
  MathJax.OutputJax.NativeMML.Register("jax/mml");
}
MathJax.OutputJax.NativeMML.loadComplete("config.js");
MathJax.OutputJax.PreviewHTML = MathJax.OutputJax({
  id: "PreviewHTML",
  version: "2.7.5",
  directory: MathJax.OutputJax.directory + "/PreviewHTML",
  extensionDir: MathJax.OutputJax.extensionDir + "/PreviewHTML",
  noFastPreview: true,
  config: {
    scale: 100,
    minScaleAdjust: 50,
    mtextFontInherit: false,
    linebreaks: { automatic: false, width: "container" }
  }
});
if (!MathJax.Hub.config.delayJaxRegistration) {
  MathJax.OutputJax.PreviewHTML.Register("jax/mml");
}
MathJax.OutputJax.PreviewHTML.loadComplete("config.js");
(function(c, g) {
  var f = "2.7.0";
  var a = MathJax.Hub.CombineConfig("MMLorHTML", {
    prefer: {
      MSIE: "MML",
      Firefox: "HTML",
      Opera: "HTML",
      Chrome: "HTML",
      Safari: "HTML",
      other: "HTML"
    }
  });
  var e = {
    Firefox: 3,
    Opera: 9.52,
    MSIE: 6,
    Chrome: 0.3,
    Safari: 2,
    Konqueror: 4
  };
  var b = g.version === "0.0" || g.versionAtLeast(e[g] || 0);
  var d =
    (g.isFirefox && g.versionAtLeast("1.5")) ||
    (g.isMSIE && g.hasMathPlayer) ||
    (g.isSafari && g.versionAtLeast("5.0")) ||
    (g.isOpera && g.versionAtLeast("9.52"));
  c.Register.StartupHook("End Config", function() {
    var h =
      a.prefer && typeof a.prefer === "object"
        ? a.prefer[MathJax.Hub.Browser] || a.prefer.other || "HTML"
        : a.prefer;
    if (b || d) {
      if (d && (h === "MML" || !b)) {
        if (MathJax.OutputJax.NativeMML) {
          MathJax.OutputJax.NativeMML.Register("jax/mml");
        } else {
          c.config.jax.unshift("output/NativeMML");
        }
        c.Startup.signal.Post("NativeMML output selected");
      } else {
        if (MathJax.OutputJax["HTML-CSS"]) {
          MathJax.OutputJax["HTML-CSS"].Register("jax/mml");
        } else {
          c.config.jax.unshift("output/HTML-CSS");
        }
        c.Startup.signal.Post("HTML-CSS output selected");
      }
    } else {
      c.PreProcess.disabled = true;
      c.prepareScripts.disabled = true;
      MathJax.Message.Set(
        ["MathJaxNotSupported", "Your browser does not support MathJax"],
        null,
        4000
      );
      c.Startup.signal.Post("MathJax not supported");
    }
  });
})(MathJax.Hub, MathJax.Hub.Browser);
MathJax.Ajax.loadComplete("[MathJax]/config/MMLorHTML.js");
MathJax.Extension.mml2jax = {
  version: "2.7.5",
  config: { preview: "mathml" },
  MMLnamespace: "http://www.w3.org/1998/Math/MathML",
  PreProcess: function(e) {
    if (!this.configured) {
      this.config = MathJax.Hub.CombineConfig("mml2jax", this.config);
      if (this.config.Augment) {
        MathJax.Hub.Insert(this, this.config.Augment);
      }
      this.InitBrowser();
      this.configured = true;
    }
    if (typeof e === "string") {
      e = document.getElementById(e);
    }
    if (!e) {
      e = document.body;
    }
    var h = [];
    this.PushMathElements(h, e, "math");
    this.PushMathElements(h, e, "math", this.MMLnamespace);
    var d, b;
    if (typeof document.namespaces !== "undefined") {
      try {
        for (d = 0, b = document.namespaces.length; d < b; d++) {
          var f = document.namespaces[d];
          if (f.urn === this.MMLnamespace) {
            this.PushMathElements(h, e, f.name + ":math");
          }
        }
      } catch (g) {}
    } else {
      var c = document.getElementsByTagName("html")[0];
      if (c) {
        for (d = 0, b = c.attributes.length; d < b; d++) {
          var a = c.attributes[d];
          if (
            a.nodeName.substr(0, 6) === "xmlns:" &&
            a.nodeValue === this.MMLnamespace
          ) {
            this.PushMathElements(h, e, a.nodeName.substr(6) + ":math");
          }
        }
      }
    }
    this.ProcessMathArray(h);
  },
  PushMathElements: function(f, d, a, c) {
    var h,
      g = MathJax.Hub.config.preRemoveClass;
    if (c) {
      if (!d.getElementsByTagNameNS) {
        return;
      }
      h = d.getElementsByTagNameNS(c, a);
    } else {
      h = d.getElementsByTagName(a);
    }
    for (var e = 0, b = h.length; e < b; e++) {
      var j = h[e].parentNode;
      if (j && j.className !== g && !j.isMathJax && !h[e].prefix === !c) {
        f.push(h[e]);
      }
    }
  },
  ProcessMathArray: function(c) {
    var b,
      a = c.length;
    if (a) {
      if (this.MathTagBug) {
        for (b = 0; b < a; b++) {
          if (c[b].nodeName === "MATH") {
            this.ProcessMathFlattened(c[b]);
          } else {
            this.ProcessMath(c[b]);
          }
        }
      } else {
        for (b = 0; b < a; b++) {
          this.ProcessMath(c[b]);
        }
      }
    }
  },
  ProcessMath: function(e) {
    var d = e.parentNode;
    if (!d || d.className === MathJax.Hub.config.preRemoveClass) {
      return;
    }
    var a = document.createElement("script");
    a.type = "math/mml";
    d.insertBefore(a, e);
    if (this.AttributeBug) {
      var b = this.OuterHTML(e);
      if (this.CleanupHTML) {
        b = b
          .replace(/<\?import .*?>/i, "")
          .replace(/<\?xml:namespace .*?\/>/i, "");
        b = b.replace(/&nbsp;/g, "&#xA0;");
      }
      MathJax.HTML.setScript(a, b);
      d.removeChild(e);
    } else {
      var c = MathJax.HTML.Element("span");
      c.appendChild(e);
      MathJax.HTML.setScript(a, c.innerHTML);
    }
    if (this.config.preview !== "none") {
      this.createPreview(e, a);
    }
  },
  ProcessMathFlattened: function(f) {
    var d = f.parentNode;
    if (!d || d.className === MathJax.Hub.config.preRemoveClass) {
      return;
    }
    var b = document.createElement("script");
    b.type = "math/mml";
    d.insertBefore(b, f);
    var c = "",
      e,
      a = f;
    while (f && f.nodeName !== "/MATH") {
      e = f;
      f = f.nextSibling;
      c += this.NodeHTML(e);
      e.parentNode.removeChild(e);
    }
    if (f && f.nodeName === "/MATH") {
      f.parentNode.removeChild(f);
    }
    b.text = c + "</math>";
    if (this.config.preview !== "none") {
      this.createPreview(a, b);
    }
  },
  NodeHTML: function(e) {
    var c, b, a;
    if (e.nodeName === "#text") {
      c = this.quoteHTML(e.nodeValue);
    } else {
      if (e.nodeName === "#comment") {
        c = "<!--" + e.nodeValue + "-->";
      } else {
        c = "<" + e.nodeName.toLowerCase();
        for (b = 0, a = e.attributes.length; b < a; b++) {
          var d = e.attributes[b];
          if (d.specified && d.nodeName.substr(0, 10) !== "_moz-math-") {
            c +=
              " " +
              d.nodeName.toLowerCase().replace(/xmlns:xmlns/, "xmlns") +
              "=";
            var f = d.nodeValue;
            if (f == null && d.nodeName === "style" && e.style) {
              f = e.style.cssText;
            }
            c += '"' + this.quoteHTML(f) + '"';
          }
        }
        c += ">";
        if (e.outerHTML != null && e.outerHTML.match(/(.<\/[A-Z]+>|\/>)$/)) {
          for (b = 0, a = e.childNodes.length; b < a; b++) {
            c += this.OuterHTML(e.childNodes[b]);
          }
          c += "</" + e.nodeName.toLowerCase() + ">";
        }
      }
    }
    return c;
  },
  OuterHTML: function(d) {
    if (d.nodeName.charAt(0) === "#") {
      return this.NodeHTML(d);
    }
    if (!this.AttributeBug) {
      return d.outerHTML;
    }
    var c = this.NodeHTML(d);
    for (var b = 0, a = d.childNodes.length; b < a; b++) {
      c += this.OuterHTML(d.childNodes[b]);
    }
    c += "</" + d.nodeName.toLowerCase() + ">";
    return c;
  },
  quoteHTML: function(a) {
    if (a == null) {
      a = "";
    }
    return a
      .replace(/&/g, "&#x26;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;");
  },
  createPreview: function(g, f) {
    var e = this.config.preview;
    if (e === "none") {
      return;
    }
    var i = false;
    var c = MathJax.Hub.config.preRemoveClass;
    if ((f.previousSibling || {}).className === c) {
      return;
    }
    if (e === "mathml") {
      i = true;
      if (this.MathTagBug) {
        e = "alttext";
      } else {
        e = g.cloneNode(true);
      }
    }
    if (e === "alttext" || e === "altimg") {
      i = true;
      var d = this.filterPreview(g.getAttribute("alttext"));
      if (e === "alttext") {
        if (d != null) {
          e = MathJax.HTML.TextNode(d);
        } else {
          e = null;
        }
      } else {
        var a = g.getAttribute("altimg");
        if (a != null) {
          var b = {
            width: g.getAttribute("altimg-width"),
            height: g.getAttribute("altimg-height")
          };
          e = MathJax.HTML.Element("img", { src: a, alt: d, style: b });
        } else {
          e = null;
        }
      }
    }
    if (e) {
      var h;
      if (i) {
        h = MathJax.HTML.Element("span", { className: c });
        h.appendChild(e);
      } else {
        h = MathJax.HTML.Element("span", { className: c }, e);
      }
      f.parentNode.insertBefore(h, f);
    }
  },
  filterPreview: function(a) {
    return a;
  },
  InitBrowser: function() {
    var b = MathJax.HTML.Element("span", {
      id: "<",
      className: "mathjax",
      innerHTML: "<math><mi>x</mi><mspace /></math>"
    });
    var a = b.outerHTML || "";
    this.AttributeBug =
      a !== "" &&
      !(
        a.match(/id="&lt;"/) &&
        a.match(/class="mathjax"/) &&
        a.match(/<\/math>/)
      );
    this.MathTagBug = b.childNodes.length > 1;
    this.CleanupHTML = MathJax.Hub.Browser.isMSIE;
  }
};
MathJax.Hub.Register.PreProcessor(["PreProcess", MathJax.Extension.mml2jax], 5);
MathJax.Ajax.loadComplete("[MathJax]/extensions/mml2jax.js");
(function(d, h, l, g, m, b, j) {
  var p = "2.7.5";
  var i = MathJax.Extension;
  var c = (i.MathEvents = { version: p });
  var k = d.config.menuSettings;
  var o = {
    hover: 500,
    frame: {
      x: 3.5,
      y: 5,
      bwidth: 1,
      bcolor: "#A6D",
      hwidth: "15px",
      hcolor: "#83A"
    },
    button: { x: -6, y: -3, wx: -2 },
    fadeinInc: 0.2,
    fadeoutInc: 0.05,
    fadeDelay: 50,
    fadeoutStart: 400,
    fadeoutDelay: 15 * 1000,
    styles: {
      ".MathJax_Hover_Frame": {
        "border-radius": ".25em",
        "-webkit-border-radius": ".25em",
        "-moz-border-radius": ".25em",
        "-khtml-border-radius": ".25em",
        "box-shadow": "0px 0px 15px #83A",
        "-webkit-box-shadow": "0px 0px 15px #83A",
        "-moz-box-shadow": "0px 0px 15px #83A",
        "-khtml-box-shadow": "0px 0px 15px #83A",
        border: "1px solid #A6D ! important",
        display: "inline-block",
        position: "absolute"
      },
      ".MathJax_Menu_Button .MathJax_Hover_Arrow": {
        position: "absolute",
        cursor: "pointer",
        display: "inline-block",
        border: "2px solid #AAA",
        "border-radius": "4px",
        "-webkit-border-radius": "4px",
        "-moz-border-radius": "4px",
        "-khtml-border-radius": "4px",
        "font-family": "'Courier New',Courier",
        "font-size": "9px",
        color: "#F0F0F0"
      },
      ".MathJax_Menu_Button .MathJax_Hover_Arrow span": {
        display: "block",
        "background-color": "#AAA",
        border: "1px solid",
        "border-radius": "3px",
        "line-height": 0,
        padding: "4px"
      },
      ".MathJax_Hover_Arrow:hover": {
        color: "white!important",
        border: "2px solid #CCC!important"
      },
      ".MathJax_Hover_Arrow:hover span": {
        "background-color": "#CCC!important"
      }
    }
  };
  var n = (c.Event = {
    LEFTBUTTON: 0,
    RIGHTBUTTON: 2,
    MENUKEY: "altKey",
    KEY: {
      RETURN: 13,
      ESCAPE: 27,
      SPACE: 32,
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40
    },
    Mousedown: function(q) {
      return n.Handler(q, "Mousedown", this);
    },
    Mouseup: function(q) {
      return n.Handler(q, "Mouseup", this);
    },
    Mousemove: function(q) {
      return n.Handler(q, "Mousemove", this);
    },
    Mouseover: function(q) {
      return n.Handler(q, "Mouseover", this);
    },
    Mouseout: function(q) {
      return n.Handler(q, "Mouseout", this);
    },
    Click: function(q) {
      return n.Handler(q, "Click", this);
    },
    DblClick: function(q) {
      return n.Handler(q, "DblClick", this);
    },
    Menu: function(q) {
      return n.Handler(q, "ContextMenu", this);
    },
    Handler: function(t, r, s) {
      if (l.loadingMathMenu) {
        return n.False(t);
      }
      var q = b[s.jaxID];
      if (!t) {
        t = window.event;
      }
      t.isContextMenu = r === "ContextMenu";
      if (q[r]) {
        return q[r](t, s);
      }
      if (i.MathZoom) {
        return i.MathZoom.HandleEvent(t, r, s);
      }
    },
    False: function(q) {
      if (!q) {
        q = window.event;
      }
      if (q) {
        if (q.preventDefault) {
          q.preventDefault();
        } else {
          q.returnValue = false;
        }
        if (q.stopPropagation) {
          q.stopPropagation();
        }
        q.cancelBubble = true;
      }
      return false;
    },
    Keydown: function(r, q) {
      if (!r) {
        r = window.event;
      }
      if (r.keyCode === n.KEY.SPACE) {
        n.ContextMenu(r, this);
      }
    },
    ContextMenu: function(t, E, w) {
      var B = b[E.jaxID],
        v = B.getJaxFromMath(E);
      var F = (B.config.showMathMenu != null ? B : d).config.showMathMenu;
      if (!F || (k.context !== "MathJax" && !w)) {
        return;
      }
      if (c.msieEventBug) {
        t = window.event || t;
      }
      n.ClearSelection();
      f.ClearHoverTimer();
      if (v.hover) {
        if (v.hover.remove) {
          clearTimeout(v.hover.remove);
          delete v.hover.remove;
        }
        v.hover.nofade = true;
      }
      var u = MathJax.Menu;
      var G, D;
      if (u) {
        if (u.loadingDomain) {
          return n.False(t);
        }
        G = m.loadDomain("MathMenu");
        if (!G) {
          u.jax = v;
          var r = u.menu.Find("Show Math As").submenu;
          r.items[0].name = v.sourceMenuTitle;
          r.items[0].format = v.sourceMenuFormat || "MathML";
          r.items[1].name = j[v.inputJax].sourceMenuTitle;
          r.items[5].disabled = !j[v.inputJax].annotationEncoding;
          var A = r.items[2];
          A.disabled = true;
          var q = A.submenu.items;
          annotationList = MathJax.Hub.Config.semanticsAnnotations;
          for (var z = 0, y = q.length; z < y; z++) {
            var s = q[z].name[1];
            if (v.root && v.root.getAnnotation(s) !== null) {
              A.disabled = false;
              q[z].hidden = false;
            } else {
              q[z].hidden = true;
            }
          }
          var x = u.menu.Find("Math Settings", "MathPlayer");
          x.hidden = !(v.outputJax === "NativeMML" && d.Browser.hasMathPlayer);
          return u.menu.Post(t);
        }
        u.loadingDomain = true;
        D = function() {
          delete u.loadingDomain;
        };
      } else {
        if (l.loadingMathMenu) {
          return n.False(t);
        }
        l.loadingMathMenu = true;
        G = l.Require("[MathJax]/extensions/MathMenu.js");
        D = function() {
          delete l.loadingMathMenu;
          if (!MathJax.Menu) {
            MathJax.Menu = {};
          }
        };
      }
      var C = {
        pageX: t.pageX,
        pageY: t.pageY,
        clientX: t.clientX,
        clientY: t.clientY
      };
      g.Queue(G, D, ["ContextMenu", n, C, E, w]);
      return n.False(t);
    },
    AltContextMenu: function(s, r) {
      var t = b[r.jaxID];
      var q = (t.config.showMathMenu != null ? t : d).config.showMathMenu;
      if (q) {
        q = (t.config.showMathMenuMSIE != null ? t : d).config.showMathMenuMSIE;
        if (k.context === "MathJax" && !k.mpContext && q) {
          if (!c.noContextMenuBug || s.button !== n.RIGHTBUTTON) {
            return;
          }
        } else {
          if (!s[n.MENUKEY] || s.button !== n.LEFTBUTTON) {
            return;
          }
        }
        return t.ContextMenu(s, r, true);
      }
    },
    ClearSelection: function() {
      if (c.safariContextMenuBug) {
        setTimeout("window.getSelection().empty()", 0);
      }
      if (document.selection) {
        setTimeout("document.selection.empty()", 0);
      }
    },
    getBBox: function(s) {
      s.appendChild(c.topImg);
      var r = c.topImg.offsetTop,
        t = s.offsetHeight - r,
        q = s.offsetWidth;
      s.removeChild(c.topImg);
      return { w: q, h: r, d: t };
    }
  });
  var f = (c.Hover = {
    Mouseover: function(s, r) {
      if (k.discoverable || k.zoom === "Hover") {
        var u = s.fromElement || s.relatedTarget,
          t = s.toElement || s.target;
        if (
          u &&
          t &&
          (d.isMathJaxNode(u) !== d.isMathJaxNode(t) ||
            d.getJaxFor(u) !== d.getJaxFor(t))
        ) {
          var q = this.getJaxFromMath(r);
          if (q.hover) {
            f.ReHover(q);
          } else {
            f.HoverTimer(q, r);
          }
          return n.False(s);
        }
      }
    },
    Mouseout: function(s, r) {
      if (k.discoverable || k.zoom === "Hover") {
        var u = s.fromElement || s.relatedTarget,
          t = s.toElement || s.target;
        if (
          u &&
          t &&
          (d.isMathJaxNode(u) !== d.isMathJaxNode(t) ||
            d.getJaxFor(u) !== d.getJaxFor(t))
        ) {
          var q = this.getJaxFromMath(r);
          if (q.hover) {
            f.UnHover(q);
          } else {
            f.ClearHoverTimer();
          }
          return n.False(s);
        }
      }
    },
    Mousemove: function(s, r) {
      if (k.discoverable || k.zoom === "Hover") {
        var q = this.getJaxFromMath(r);
        if (q.hover) {
          return;
        }
        if (f.lastX == s.clientX && f.lastY == s.clientY) {
          return;
        }
        f.lastX = s.clientX;
        f.lastY = s.clientY;
        f.HoverTimer(q, r);
        return n.False(s);
      }
    },
    HoverTimer: function(q, r) {
      this.ClearHoverTimer();
      this.hoverTimer = setTimeout(g(["Hover", this, q, r]), o.hover);
    },
    ClearHoverTimer: function() {
      if (this.hoverTimer) {
        clearTimeout(this.hoverTimer);
        delete this.hoverTimer;
      }
    },
    Hover: function(q, u) {
      if (i.MathZoom && i.MathZoom.Hover({}, u)) {
        return;
      }
      var t = b[q.outputJax],
        v = t.getHoverSpan(q, u),
        y = t.getHoverBBox(q, v, u),
        w = (t.config.showMathMenu != null ? t : d).config.showMathMenu;
      var A = o.frame.x,
        z = o.frame.y,
        x = o.frame.bwidth;
      if (c.msieBorderWidthBug) {
        x = 0;
      }
      q.hover = { opacity: 0, id: q.inputID + "-Hover" };
      var r = h.Element(
        "span",
        {
          id: q.hover.id,
          isMathJax: true,
          style: {
            display: "inline-block",
            width: 0,
            height: 0,
            position: "relative"
          }
        },
        [
          [
            "span",
            {
              className: "MathJax_Hover_Frame",
              isMathJax: true,
              style: {
                display: "inline-block",
                position: "absolute",
                top: this.Px(-y.h - z - x - (y.y || 0)),
                left: this.Px(-A - x + (y.x || 0)),
                width: this.Px(y.w + 2 * A),
                height: this.Px(y.h + y.d + 2 * z),
                opacity: 0,
                filter: "alpha(opacity=0)"
              }
            }
          ]
        ]
      );
      var s = h.Element(
        "span",
        {
          isMathJax: true,
          id: q.hover.id + "Menu",
          className: "MathJax_Menu_Button",
          style: {
            display: "inline-block",
            "z-index": 1,
            width: 0,
            height: 0,
            position: "relative"
          }
        },
        [
          [
            "span",
            {
              className: "MathJax_Hover_Arrow",
              isMathJax: true,
              math: u,
              onclick: this.HoverMenu,
              jax: t.id,
              style: {
                left: this.Px(y.w + A + x + (y.x || 0) + o.button.x),
                top: this.Px(-y.h - z - x - (y.y || 0) - o.button.y),
                opacity: 0,
                filter: "alpha(opacity=0)"
              }
            },
            [["span", { isMathJax: true }, "\u25BC"]]
          ]
        ]
      );
      if (y.width) {
        r.style.width = s.style.width = y.width;
        r.style.marginRight = s.style.marginRight = "-" + y.width;
        r.firstChild.style.width = y.width;
        s.firstChild.style.left = "";
        s.firstChild.style.right = this.Px(o.button.wx);
      }
      v.parentNode.insertBefore(r, v);
      if (w) {
        v.parentNode.insertBefore(s, v);
      }
      if (v.style) {
        v.style.position = "relative";
      }
      this.ReHover(q);
    },
    ReHover: function(q) {
      if (q.hover.remove) {
        clearTimeout(q.hover.remove);
      }
      q.hover.remove = setTimeout(g(["UnHover", this, q]), o.fadeoutDelay);
      this.HoverFadeTimer(q, o.fadeinInc);
    },
    UnHover: function(q) {
      if (!q.hover.nofade) {
        this.HoverFadeTimer(q, -o.fadeoutInc, o.fadeoutStart);
      }
    },
    HoverFade: function(q) {
      delete q.hover.timer;
      q.hover.opacity = Math.max(0, Math.min(1, q.hover.opacity + q.hover.inc));
      q.hover.opacity = Math.floor(1000 * q.hover.opacity) / 1000;
      var s = document.getElementById(q.hover.id),
        r = document.getElementById(q.hover.id + "Menu");
      s.firstChild.style.opacity = q.hover.opacity;
      s.firstChild.style.filter =
        "alpha(opacity=" + Math.floor(100 * q.hover.opacity) + ")";
      if (r) {
        r.firstChild.style.opacity = q.hover.opacity;
        r.firstChild.style.filter = s.style.filter;
      }
      if (q.hover.opacity === 1) {
        return;
      }
      if (q.hover.opacity > 0) {
        this.HoverFadeTimer(q, q.hover.inc);
        return;
      }
      s.parentNode.removeChild(s);
      if (r) {
        r.parentNode.removeChild(r);
      }
      if (q.hover.remove) {
        clearTimeout(q.hover.remove);
      }
      delete q.hover;
    },
    HoverFadeTimer: function(q, s, r) {
      q.hover.inc = s;
      if (!q.hover.timer) {
        q.hover.timer = setTimeout(g(["HoverFade", this, q]), r || o.fadeDelay);
      }
    },
    HoverMenu: function(q) {
      if (!q) {
        q = window.event;
      }
      return b[this.jax].ContextMenu(q, this.math, true);
    },
    ClearHover: function(q) {
      if (q.hover.remove) {
        clearTimeout(q.hover.remove);
      }
      if (q.hover.timer) {
        clearTimeout(q.hover.timer);
      }
      f.ClearHoverTimer();
      delete q.hover;
    },
    Px: function(q) {
      if (Math.abs(q) < 0.006) {
        return "0px";
      }
      return q.toFixed(2).replace(/\.?0+$/, "") + "px";
    },
    getImages: function() {
      if (k.discoverable) {
        var q = new Image();
        q.src = o.button.src;
      }
    }
  });
  var a = (c.Touch = {
    last: 0,
    delay: 500,
    start: function(r) {
      var q = new Date().getTime();
      var s = q - a.last < a.delay && a.up;
      a.last = q;
      a.up = false;
      if (s) {
        a.timeout = setTimeout(a.menu, a.delay, r, this);
        r.preventDefault();
      }
    },
    end: function(r) {
      var q = new Date().getTime();
      a.up = q - a.last < a.delay;
      if (a.timeout) {
        clearTimeout(a.timeout);
        delete a.timeout;
        a.last = 0;
        a.up = false;
        r.preventDefault();
        return n.Handler(r.touches[0] || r.touch, "DblClick", this);
      }
    },
    menu: function(r, q) {
      delete a.timeout;
      a.last = 0;
      a.up = false;
      return n.Handler(r.touches[0] || r.touch, "ContextMenu", q);
    }
  });
  d.Browser.Select({
    MSIE: function(q) {
      var s = document.documentMode || 0;
      var r = q.versionAtLeast("8.0");
      c.msieBorderWidthBug = document.compatMode === "BackCompat";
      c.msieEventBug = q.isIE9;
      c.msieAlignBug = !r || s < 8;
      if (s < 9) {
        n.LEFTBUTTON = 1;
      }
    },
    Safari: function(q) {
      c.safariContextMenuBug = true;
    },
    Opera: function(q) {
      c.operaPositionBug = true;
    },
    Konqueror: function(q) {
      c.noContextMenuBug = true;
    }
  });
  c.topImg = c.msieAlignBug
    ? h.Element("img", {
        style: { width: 0, height: 0, position: "relative" },
        src: "about:blank"
      })
    : h.Element("span", {
        style: { width: 0, height: 0, display: "inline-block" }
      });
  if (c.operaPositionBug) {
    c.topImg.style.border = "1px solid";
  }
  c.config = o = d.CombineConfig("MathEvents", o);
  var e = function() {
    var q = o.styles[".MathJax_Hover_Frame"];
    q.border = o.frame.bwidth + "px solid " + o.frame.bcolor + " ! important";
    q["box-shadow"] = q["-webkit-box-shadow"] = q["-moz-box-shadow"] = q[
      "-khtml-box-shadow"
    ] = "0px 0px " + o.frame.hwidth + " " + o.frame.hcolor;
  };
  g.Queue(
    d.Register.StartupHook("End Config", {}),
    [e],
    ["getImages", f],
    ["Styles", l, o.styles],
    ["Post", d.Startup.signal, "MathEvents Ready"],
    ["loadComplete", l, "[MathJax]/extensions/MathEvents.js"]
  );
})(
  MathJax.Hub,
  MathJax.HTML,
  MathJax.Ajax,
  MathJax.Callback,
  MathJax.Localization,
  MathJax.OutputJax,
  MathJax.InputJax
);
(function(a, d, f, c, j) {
  var k = "2.7.5";
  var i = a.CombineConfig("MathZoom", {
    styles: {
      "#MathJax_Zoom": {
        position: "absolute",
        "background-color": "#F0F0F0",
        overflow: "auto",
        display: "block",
        "z-index": 301,
        padding: ".5em",
        border: "1px solid black",
        margin: 0,
        "font-weight": "normal",
        "font-style": "normal",
        "text-align": "left",
        "text-indent": 0,
        "text-transform": "none",
        "line-height": "normal",
        "letter-spacing": "normal",
        "word-spacing": "normal",
        "word-wrap": "normal",
        "white-space": "nowrap",
        float: "none",
        "-webkit-box-sizing": "content-box",
        "-moz-box-sizing": "content-box",
        "box-sizing": "content-box",
        "box-shadow": "5px 5px 15px #AAAAAA",
        "-webkit-box-shadow": "5px 5px 15px #AAAAAA",
        "-moz-box-shadow": "5px 5px 15px #AAAAAA",
        "-khtml-box-shadow": "5px 5px 15px #AAAAAA",
        filter:
          "progid:DXImageTransform.Microsoft.dropshadow(OffX=2, OffY=2, Color='gray', Positive='true')"
      },
      "#MathJax_ZoomOverlay": {
        position: "absolute",
        left: 0,
        top: 0,
        "z-index": 300,
        display: "inline-block",
        width: "100%",
        height: "100%",
        border: 0,
        padding: 0,
        margin: 0,
        "background-color": "white",
        opacity: 0,
        filter: "alpha(opacity=0)"
      },
      "#MathJax_ZoomFrame": {
        position: "relative",
        display: "inline-block",
        height: 0,
        width: 0
      },
      "#MathJax_ZoomEventTrap": {
        position: "absolute",
        left: 0,
        top: 0,
        "z-index": 302,
        display: "inline-block",
        border: 0,
        padding: 0,
        margin: 0,
        "background-color": "white",
        opacity: 0,
        filter: "alpha(opacity=0)"
      }
    }
  });
  var e, b, g;
  MathJax.Hub.Register.StartupHook("MathEvents Ready", function() {
    g = MathJax.Extension.MathEvents.Event;
    e = MathJax.Extension.MathEvents.Event.False;
    b = MathJax.Extension.MathEvents.Hover;
  });
  var h = (MathJax.Extension.MathZoom = {
    version: k,
    settings: a.config.menuSettings,
    scrollSize: 18,
    HandleEvent: function(n, l, m) {
      if (h.settings.CTRL && !n.ctrlKey) {
        return true;
      }
      if (h.settings.ALT && !n.altKey) {
        return true;
      }
      if (h.settings.CMD && !n.metaKey) {
        return true;
      }
      if (h.settings.Shift && !n.shiftKey) {
        return true;
      }
      if (!h[l]) {
        return true;
      }
      return h[l](n, m);
    },
    Click: function(m, l) {
      if (this.settings.zoom === "Click") {
        return this.Zoom(m, l);
      }
    },
    DblClick: function(m, l) {
      if (
        this.settings.zoom === "Double-Click" ||
        this.settings.zoom === "DoubleClick"
      ) {
        return this.Zoom(m, l);
      }
    },
    Hover: function(m, l) {
      if (this.settings.zoom === "Hover") {
        this.Zoom(m, l);
        return true;
      }
      return false;
    },
    Zoom: function(o, u) {
      this.Remove();
      b.ClearHoverTimer();
      g.ClearSelection();
      var s = MathJax.OutputJax[u.jaxID];
      var p = s.getJaxFromMath(u);
      if (p.hover) {
        b.UnHover(p);
      }
      var q = this.findContainer(u);
      var l = Math.floor(0.85 * q.clientWidth),
        t = Math.max(
          document.body.clientHeight,
          document.documentElement.clientHeight
        );
      if (this.getOverflow(q) !== "visible") {
        t = Math.min(q.clientHeight, t);
      }
      t = Math.floor(0.85 * t);
      var n = d.Element("span", { id: "MathJax_ZoomFrame" }, [
        ["span", { id: "MathJax_ZoomOverlay", onmousedown: this.Remove }],
        [
          "span",
          {
            id: "MathJax_Zoom",
            onclick: this.Remove,
            style: { visibility: "hidden", fontSize: this.settings.zscale }
          },
          [
            [
              "span",
              { style: { display: "inline-block", "white-space": "nowrap" } }
            ]
          ]
        ]
      ]);
      var z = n.lastChild,
        w = z.firstChild,
        r = n.firstChild;
      u.parentNode.insertBefore(n, u);
      u.parentNode.insertBefore(u, n);
      if (w.addEventListener) {
        w.addEventListener("mousedown", this.Remove, true);
      }
      var m = z.offsetWidth || z.clientWidth;
      l -= m;
      t -= m;
      z.style.maxWidth = l + "px";
      z.style.maxHeight = t + "px";
      if (this.msieTrapEventBug) {
        var y = d.Element("span", {
          id: "MathJax_ZoomEventTrap",
          onmousedown: this.Remove
        });
        n.insertBefore(y, z);
      }
      if (this.msieZIndexBug) {
        var v = d.addElement(document.body, "img", {
          src: "about:blank",
          id: "MathJax_ZoomTracker",
          width: 0,
          height: 0,
          style: { width: 0, height: 0, position: "relative" }
        });
        n.style.position = "relative";
        n.style.zIndex = i.styles["#MathJax_ZoomOverlay"]["z-index"];
        n = v;
      }
      var x = s.Zoom(p, w, u, l, t);
      if (this.msiePositionBug) {
        if (this.msieSizeBug) {
          z.style.height = x.zH + "px";
          z.style.width = x.zW + "px";
        }
        if (z.offsetHeight > t) {
          z.style.height = t + "px";
          z.style.width = x.zW + this.scrollSize + "px";
        }
        if (z.offsetWidth > l) {
          z.style.width = l + "px";
          z.style.height = x.zH + this.scrollSize + "px";
        }
      }
      if (this.operaPositionBug) {
        z.style.width = Math.min(l, x.zW) + "px";
      }
      if (
        z.offsetWidth > m &&
        z.offsetWidth - m < l &&
        z.offsetHeight - m < t
      ) {
        z.style.overflow = "visible";
      }
      this.Position(z, x);
      if (this.msieTrapEventBug) {
        y.style.height = z.clientHeight + "px";
        y.style.width = z.clientWidth + "px";
        y.style.left = parseFloat(z.style.left) + z.clientLeft + "px";
        y.style.top = parseFloat(z.style.top) + z.clientTop + "px";
      }
      z.style.visibility = "";
      if (this.settings.zoom === "Hover") {
        r.onmouseover = this.Remove;
      }
      if (window.addEventListener) {
        addEventListener("resize", this.Resize, false);
      } else {
        if (window.attachEvent) {
          attachEvent("onresize", this.Resize);
        } else {
          this.onresize = window.onresize;
          window.onresize = this.Resize;
        }
      }
      a.signal.Post(["math zoomed", p]);
      return e(o);
    },
    Position: function(p, r) {
      p.style.display = "none";
      var q = this.Resize(),
        m = q.x,
        s = q.y,
        l = r.mW;
      p.style.display = "";
      var o = -l - Math.floor((p.offsetWidth - l) / 2),
        n = r.Y;
      p.style.left = Math.max(o, 10 - m) + "px";
      p.style.top = Math.max(n, 10 - s) + "px";
      if (!h.msiePositionBug) {
        h.SetWH();
      }
    },
    Resize: function(m) {
      if (h.onresize) {
        h.onresize(m);
      }
      var q = document.getElementById("MathJax_ZoomFrame"),
        l = document.getElementById("MathJax_ZoomOverlay");
      var o = h.getXY(q),
        n = h.findContainer(q);
      if (h.getOverflow(n) !== "visible") {
        l.scroll_parent = n;
        var p = h.getXY(n);
        o.x -= p.x;
        o.y -= p.y;
        p = h.getBorder(n);
        o.x -= p.x;
        o.y -= p.y;
      }
      l.style.left = -o.x + "px";
      l.style.top = -o.y + "px";
      if (h.msiePositionBug) {
        setTimeout(h.SetWH, 0);
      } else {
        h.SetWH();
      }
      return o;
    },
    SetWH: function() {
      var l = document.getElementById("MathJax_ZoomOverlay");
      if (!l) {
        return;
      }
      l.style.display = "none";
      var m = l.scroll_parent || document.documentElement || document.body;
      l.style.width = m.scrollWidth + "px";
      l.style.height = Math.max(m.clientHeight, m.scrollHeight) + "px";
      l.style.display = "";
    },
    findContainer: function(l) {
      l = l.parentNode;
      while (
        l.parentNode &&
        l !== document.body &&
        h.getOverflow(l) === "visible"
      ) {
        l = l.parentNode;
      }
      return l;
    },
    getOverflow: window.getComputedStyle
      ? function(l) {
          return getComputedStyle(l).overflow;
        }
      : function(l) {
          return (l.currentStyle || { overflow: "visible" }).overflow;
        },
    getBorder: function(o) {
      var m = { thin: 1, medium: 2, thick: 3 };
      var n = window.getComputedStyle
        ? getComputedStyle(o)
        : o.currentStyle || { borderLeftWidth: 0, borderTopWidth: 0 };
      var l = n.borderLeftWidth,
        p = n.borderTopWidth;
      if (m[l]) {
        l = m[l];
      } else {
        l = parseInt(l);
      }
      if (m[p]) {
        p = m[p];
      } else {
        p = parseInt(p);
      }
      return { x: l, y: p };
    },
    getXY: function(o) {
      var l = 0,
        n = 0,
        m;
      m = o;
      while (m.offsetParent) {
        l += m.offsetLeft;
        m = m.offsetParent;
      }
      if (h.operaPositionBug) {
        o.style.border = "1px solid";
      }
      m = o;
      while (m.offsetParent) {
        n += m.offsetTop;
        m = m.offsetParent;
      }
      if (h.operaPositionBug) {
        o.style.border = "";
      }
      return { x: l, y: n };
    },
    Remove: function(n) {
      var p = document.getElementById("MathJax_ZoomFrame");
      if (p) {
        var o = MathJax.OutputJax[p.previousSibling.jaxID];
        var l = o.getJaxFromMath(p.previousSibling);
        a.signal.Post(["math unzoomed", l]);
        p.parentNode.removeChild(p);
        p = document.getElementById("MathJax_ZoomTracker");
        if (p) {
          p.parentNode.removeChild(p);
        }
        if (h.operaRefreshBug) {
          var m = d.addElement(document.body, "div", {
            style: {
              position: "fixed",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "white",
              opacity: 0
            },
            id: "MathJax_OperaDiv"
          });
          document.body.removeChild(m);
        }
        if (window.removeEventListener) {
          removeEventListener("resize", h.Resize, false);
        } else {
          if (window.detachEvent) {
            detachEvent("onresize", h.Resize);
          } else {
            window.onresize = h.onresize;
            delete h.onresize;
          }
        }
      }
      return e(n);
    }
  });
  a.Browser.Select({
    MSIE: function(l) {
      var n = document.documentMode || 0;
      var m = n >= 9;
      h.msiePositionBug = !m;
      h.msieSizeBug =
        l.versionAtLeast("7.0") &&
        (!document.documentMode || n === 7 || n === 8);
      h.msieZIndexBug = n <= 7;
      h.msieInlineBlockAlignBug = n <= 7;
      h.msieTrapEventBug = !window.addEventListener;
      if (document.compatMode === "BackCompat") {
        h.scrollSize = 52;
      }
      if (m) {
        delete i.styles["#MathJax_Zoom"].filter;
      }
    },
    Opera: function(l) {
      h.operaPositionBug = true;
      h.operaRefreshBug = true;
    }
  });
  h.topImg = h.msieInlineBlockAlignBug
    ? d.Element("img", {
        style: { width: 0, height: 0, position: "relative" },
        src: "about:blank"
      })
    : d.Element("span", {
        style: { width: 0, height: 0, display: "inline-block" }
      });
  if (h.operaPositionBug || h.msieTopBug) {
    h.topImg.style.border = "1px solid";
  }
  MathJax.Callback.Queue(
    ["StartupHook", MathJax.Hub.Register, "Begin Styles", {}],
    ["Styles", f, i.styles],
    ["Post", a.Startup.signal, "MathZoom Ready"],
    ["loadComplete", f, "[MathJax]/extensions/MathZoom.js"]
  );
})(
  MathJax.Hub,
  MathJax.HTML,
  MathJax.Ajax,
  MathJax.OutputJax["HTML-CSS"],
  MathJax.OutputJax.NativeMML
);
(function(f, o, q, e, r) {
  var p = "2.7.5";
  var d = MathJax.Callback.Signal("menu");
  MathJax.Extension.MathMenu = { version: p, signal: d };
  var t = function(u) {
    return MathJax.Localization._.apply(
      MathJax.Localization,
      [["MathMenu", u]].concat([].slice.call(arguments, 1))
    );
  };
  var i = MathJax.Object.isArray;
  var a = f.Browser.isPC,
    l = f.Browser.isMSIE,
    m = (document.documentMode || 0) > 8;
  var j = a ? null : "5px";
  var s = f.CombineConfig("MathMenu", {
    delay: 150,
    showRenderer: true,
    showMathPlayer: true,
    showFontMenu: false,
    showContext: false,
    showDiscoverable: false,
    showLocale: true,
    showLocaleURL: false,
    semanticsAnnotations: {
      TeX: ["TeX", "LaTeX", "application/x-tex"],
      StarMath: ["StarMath 5.0"],
      Maple: ["Maple"],
      ContentMathML: ["MathML-Content", "application/mathml-content+xml"],
      OpenMath: ["OpenMath"]
    },
    windowSettings: {
      status: "no",
      toolbar: "no",
      locationbar: "no",
      menubar: "no",
      directories: "no",
      personalbar: "no",
      resizable: "yes",
      scrollbars: "yes",
      width: 400,
      height: 300,
      left: Math.round((screen.width - 400) / 2),
      top: Math.round((screen.height - 300) / 3)
    },
    styles: {
      "#MathJax_About": {
        position: "fixed",
        left: "50%",
        width: "auto",
        "text-align": "center",
        border: "3px outset",
        padding: "1em 2em",
        "background-color": "#DDDDDD",
        color: "black",
        cursor: "default",
        "font-family": "message-box",
        "font-size": "120%",
        "font-style": "normal",
        "text-indent": 0,
        "text-transform": "none",
        "line-height": "normal",
        "letter-spacing": "normal",
        "word-spacing": "normal",
        "word-wrap": "normal",
        "white-space": "nowrap",
        float: "none",
        "z-index": 201,
        "border-radius": "15px",
        "-webkit-border-radius": "15px",
        "-moz-border-radius": "15px",
        "-khtml-border-radius": "15px",
        "box-shadow": "0px 10px 20px #808080",
        "-webkit-box-shadow": "0px 10px 20px #808080",
        "-moz-box-shadow": "0px 10px 20px #808080",
        "-khtml-box-shadow": "0px 10px 20px #808080",
        filter:
          "progid:DXImageTransform.Microsoft.dropshadow(OffX=2, OffY=2, Color='gray', Positive='true')"
      },
      "#MathJax_About.MathJax_MousePost": { outline: "none" },
      ".MathJax_Menu": {
        position: "absolute",
        "background-color": "white",
        color: "black",
        width: "auto",
        padding: a ? "2px" : "5px 0px",
        border: "1px solid #CCCCCC",
        margin: 0,
        cursor: "default",
        font: "menu",
        "text-align": "left",
        "text-indent": 0,
        "text-transform": "none",
        "line-height": "normal",
        "letter-spacing": "normal",
        "word-spacing": "normal",
        "word-wrap": "normal",
        "white-space": "nowrap",
        float: "none",
        "z-index": 201,
        "border-radius": j,
        "-webkit-border-radius": j,
        "-moz-border-radius": j,
        "-khtml-border-radius": j,
        "box-shadow": "0px 10px 20px #808080",
        "-webkit-box-shadow": "0px 10px 20px #808080",
        "-moz-box-shadow": "0px 10px 20px #808080",
        "-khtml-box-shadow": "0px 10px 20px #808080",
        filter:
          "progid:DXImageTransform.Microsoft.dropshadow(OffX=2, OffY=2, Color='gray', Positive='true')"
      },
      ".MathJax_MenuItem": {
        padding: a ? "2px 2em" : "1px 2em",
        background: "transparent"
      },
      ".MathJax_MenuArrow": {
        position: "absolute",
        right: ".5em",
        "padding-top": ".25em",
        color: "#666666",
        "font-family": l ? "'Arial unicode MS'" : null,
        "font-size": ".75em"
      },
      ".MathJax_MenuActive .MathJax_MenuArrow": { color: "white" },
      ".MathJax_MenuArrow.RTL": { left: ".5em", right: "auto" },
      ".MathJax_MenuCheck": {
        position: "absolute",
        left: ".7em",
        "font-family": l ? "'Arial unicode MS'" : null
      },
      ".MathJax_MenuCheck.RTL": { right: ".7em", left: "auto" },
      ".MathJax_MenuRadioCheck": {
        position: "absolute",
        left: a ? "1em" : ".7em"
      },
      ".MathJax_MenuRadioCheck.RTL": {
        right: a ? "1em" : ".7em",
        left: "auto"
      },
      ".MathJax_MenuLabel": {
        padding: a ? "2px 2em 4px 1.33em" : "1px 2em 3px 1.33em",
        "font-style": "italic"
      },
      ".MathJax_MenuRule": {
        "border-top": a ? "1px solid #CCCCCC" : "1px solid #DDDDDD",
        margin: a ? "4px 1px 0px" : "4px 3px"
      },
      ".MathJax_MenuDisabled": { color: "GrayText" },
      ".MathJax_MenuActive": {
        "background-color": a ? "Highlight" : "#606872",
        color: a ? "HighlightText" : "white"
      },
      ".MathJax_MenuDisabled:focus, .MathJax_MenuLabel:focus": {
        "background-color": "#E8E8E8"
      },
      ".MathJax_ContextMenu:focus": { outline: "none" },
      ".MathJax_ContextMenu .MathJax_MenuItem:focus": { outline: "none" },
      "#MathJax_AboutClose": { top: ".2em", right: ".2em" },
      ".MathJax_Menu .MathJax_MenuClose": { top: "-10px", left: "-10px" },
      ".MathJax_MenuClose": {
        position: "absolute",
        cursor: "pointer",
        display: "inline-block",
        border: "2px solid #AAA",
        "border-radius": "18px",
        "-webkit-border-radius": "18px",
        "-moz-border-radius": "18px",
        "-khtml-border-radius": "18px",
        "font-family": "'Courier New',Courier",
        "font-size": "24px",
        color: "#F0F0F0"
      },
      ".MathJax_MenuClose span": {
        display: "block",
        "background-color": "#AAA",
        border: "1.5px solid",
        "border-radius": "18px",
        "-webkit-border-radius": "18px",
        "-moz-border-radius": "18px",
        "-khtml-border-radius": "18px",
        "line-height": 0,
        padding: "8px 0 6px"
      },
      ".MathJax_MenuClose:hover": {
        color: "white!important",
        border: "2px solid #CCC!important"
      },
      ".MathJax_MenuClose:hover span": { "background-color": "#CCC!important" },
      ".MathJax_MenuClose:hover:focus": { outline: "none" }
    }
  });
  var n, k, b;
  f.Register.StartupHook("MathEvents Ready", function() {
    n = MathJax.Extension.MathEvents.Event.False;
    k = MathJax.Extension.MathEvents.Hover;
    b = MathJax.Extension.MathEvents.Event.KEY;
  });
  var h = MathJax.Object.Subclass(
    {
      Keydown: function(u, v) {
        switch (u.keyCode) {
          case b.ESCAPE:
            this.Remove(u, v);
            break;
          case b.RIGHT:
            this.Right(u, v);
            break;
          case b.LEFT:
            this.Left(u, v);
            break;
          case b.UP:
            this.Up(u, v);
            break;
          case b.DOWN:
            this.Down(u, v);
            break;
          case b.RETURN:
          case b.SPACE:
            this.Space(u, v);
            break;
          default:
            return;
            break;
        }
        return n(u);
      },
      Escape: function(u, v) {},
      Right: function(u, v) {},
      Left: function(u, v) {},
      Up: function(u, v) {},
      Down: function(u, v) {},
      Space: function(u, v) {}
    },
    {}
  );
  var g = (MathJax.Menu = h.Subclass(
    {
      version: p,
      items: [],
      posted: false,
      title: null,
      margin: 5,
      Init: function(u) {
        this.items = [].slice.call(arguments, 0);
      },
      With: function(u) {
        if (u) {
          f.Insert(this, u);
        }
        return this;
      },
      Post: function(M, E, B) {
        if (!M) {
          M = window.event || {};
        }
        var I = document.getElementById("MathJax_MenuFrame");
        if (!I) {
          I = g.Background(this);
          delete c.lastItem;
          delete c.lastMenu;
          delete g.skipUp;
          d.Post(["post", g.jax]);
          g.isRTL = MathJax.Localization.fontDirection() === "rtl";
        }
        var v = o.Element("div", {
          onmouseup: g.Mouseup,
          ondblclick: n,
          ondragstart: n,
          onselectstart: n,
          oncontextmenu: n,
          menuItem: this,
          className: "MathJax_Menu",
          onkeydown: g.Keydown,
          role: "menu"
        });
        if (M.type === "contextmenu" || M.type === "mouseover") {
          v.className += " MathJax_ContextMenu";
        }
        if (!B) {
          MathJax.Localization.setCSS(v);
        }
        for (var N = 0, K = this.items.length; N < K; N++) {
          this.items[N].Create(v);
        }
        if (g.isMobile) {
          o.addElement(
            v,
            "span",
            {
              className: "MathJax_MenuClose",
              menu: E,
              ontouchstart: g.Close,
              ontouchend: n,
              onmousedown: g.Close,
              onmouseup: n
            },
            [["span", {}, "\u00D7"]]
          );
        }
        I.appendChild(v);
        this.posted = true;
        if (v.offsetWidth) {
          v.style.width = v.offsetWidth + 2 + "px";
        }
        var H = M.pageX,
          F = M.pageY;
        var u = document.body.getBoundingClientRect();
        var C = window.getComputedStyle
          ? window.getComputedStyle(document.body)
          : { marginLeft: "0px" };
        var A = u.right - Math.min(0, u.left) + parseFloat(C.marginLeft);
        if (!H && !F && "clientX" in M) {
          H =
            M.clientX +
            document.body.scrollLeft +
            document.documentElement.scrollLeft;
          F =
            M.clientY +
            document.body.scrollTop +
            document.documentElement.scrollTop;
        }
        if (!E) {
          var L = g.CurrentNode() || M.target;
          if ((M.type === "keydown" || (!H && !F)) && L) {
            var P = window.pageXOffset || document.documentElement.scrollLeft;
            var O = window.pageYOffset || document.documentElement.scrollTop;
            var w = L.getBoundingClientRect();
            H = (w.right + w.left) / 2 + P;
            F = (w.bottom + w.top) / 2 + O;
          }
          if (H + v.offsetWidth > A - this.margin) {
            H = A - v.offsetWidth - this.margin;
          }
          if (g.isMobile) {
            H = Math.max(5, H - Math.floor(v.offsetWidth / 2));
            F -= 20;
          }
          g.skipUp = M.isContextMenu;
        } else {
          var z = "left",
            J = E.offsetWidth;
          H = g.isMobile ? 30 : J - 2;
          F = 0;
          while (E && E !== I) {
            H += E.offsetLeft;
            F += E.offsetTop;
            E = E.parentNode;
          }
          if (!g.isMobile) {
            if (
              (g.isRTL && H - J - v.offsetWidth > this.margin) ||
              (!g.isRTL && H + v.offsetWidth > A - this.margin)
            ) {
              z = "right";
              H = Math.max(this.margin, H - J - v.offsetWidth + 6);
            }
          }
          if (!a) {
            v.style["borderRadiusTop" + z] = 0;
            v.style["WebkitBorderRadiusTop" + z] = 0;
            v.style["MozBorderRadiusTop" + z] = 0;
            v.style["KhtmlBorderRadiusTop" + z] = 0;
          }
        }
        v.style.left = H + "px";
        v.style.top = F + "px";
        if (document.selection && document.selection.empty) {
          document.selection.empty();
        }
        var G = window.pageXOffset || document.documentElement.scrollLeft;
        var D = window.pageYOffset || document.documentElement.scrollTop;
        g.Focus(v);
        if (M.type === "keydown") {
          g.skipMouseoverFromKey = true;
          setTimeout(function() {
            delete g.skipMouseoverFromKey;
          }, s.delay);
        }
        window.scrollTo(G, D);
        return n(M);
      },
      Remove: function(u, v) {
        d.Post(["unpost", g.jax]);
        var w = document.getElementById("MathJax_MenuFrame");
        if (w) {
          w.parentNode.removeChild(w);
          if (this.msieFixedPositionBug) {
            detachEvent("onresize", g.Resize);
          }
        }
        if (g.jax.hover) {
          delete g.jax.hover.nofade;
          k.UnHover(g.jax);
        }
        g.Unfocus(v);
        if (u.type === "mousedown") {
          g.CurrentNode().blur();
        }
        return n(u);
      },
      Find: function(u) {
        return this.FindN(1, u, [].slice.call(arguments, 1));
      },
      FindId: function(u) {
        return this.FindN(0, u, [].slice.call(arguments, 1));
      },
      FindN: function(y, v, x) {
        for (var w = 0, u = this.items.length; w < u; w++) {
          if (this.items[w].name[y] === v) {
            if (x.length) {
              if (!this.items[w].submenu) {
                return null;
              }
              return this.items[w].submenu.FindN(y, x[0], x.slice(1));
            }
            return this.items[w];
          }
        }
        return null;
      },
      IndexOf: function(u) {
        return this.IndexOfN(1, u);
      },
      IndexOfId: function(u) {
        return this.IndexOfN(0, u);
      },
      IndexOfN: function(x, v) {
        for (var w = 0, u = this.items.length; w < u; w++) {
          if (this.items[w].name[x] === v) {
            return w;
          }
        }
        return null;
      },
      Right: function(u, v) {
        g.Right(u, v);
      },
      Left: function(u, v) {
        g.Left(u, v);
      },
      Up: function(v, w) {
        var u = w.lastChild;
        u.menuItem.Activate(v, u);
      },
      Down: function(v, w) {
        var u = w.firstChild;
        u.menuItem.Activate(v, u);
      },
      Space: function(u, v) {
        this.Remove(u, v);
      }
    },
    {
      config: s,
      Remove: function(u) {
        return g.Event(u, this, "Remove");
      },
      Mouseover: function(u) {
        return g.Event(u, this, "Mouseover");
      },
      Mouseout: function(u) {
        return g.Event(u, this, "Mouseout");
      },
      Mousedown: function(u) {
        return g.Event(u, this, "Mousedown");
      },
      Mouseup: function(u) {
        return g.Event(u, this, "Mouseup");
      },
      Keydown: function(u) {
        return g.Event(u, this, "Keydown");
      },
      Touchstart: function(u) {
        return g.Event(u, this, "Touchstart");
      },
      Touchend: function(u) {
        return g.Event(u, this, "Touchend");
      },
      Close: function(u) {
        return g.Event(
          u,
          this.menu || this.parentNode,
          this.menu ? "Touchend" : "Remove"
        );
      },
      Event: function(w, y, u, x) {
        if (g.skipMouseover && u === "Mouseover" && !x) {
          return n(w);
        }
        if (g.skipMouseoverFromKey && u === "Mouseover") {
          delete g.skipMouseoverFromKey;
          return n(w);
        }
        if (g.skipUp) {
          if (u.match(/Mouseup|Touchend/)) {
            delete g.skipUp;
            return n(w);
          }
          if (u === "Touchstart" || (u === "Mousedown" && !g.skipMousedown)) {
            delete g.skipUp;
          }
        }
        if (!w) {
          w = window.event;
        }
        var v = y.menuItem;
        if (v && v[u]) {
          return v[u](w, y);
        }
        return null;
      },
      BGSTYLE: {
        position: "absolute",
        left: 0,
        top: 0,
        "z-index": 200,
        width: "100%",
        height: "100%",
        border: 0,
        padding: 0,
        margin: 0
      },
      Background: function(v) {
        var w = o.addElement(
          document.body,
          "div",
          { style: this.BGSTYLE, id: "MathJax_MenuFrame" },
          [
            [
              "div",
              { style: this.BGSTYLE, menuItem: v, onmousedown: this.Remove }
            ]
          ]
        );
        var u = w.firstChild;
        if (g.msieBackgroundBug) {
          u.style.backgroundColor = "white";
          u.style.filter = "alpha(opacity=0)";
        }
        if (g.msieFixedPositionBug) {
          w.width = w.height = 0;
          this.Resize();
          attachEvent("onresize", this.Resize);
        } else {
          u.style.position = "fixed";
        }
        return w;
      },
      Resize: function() {
        setTimeout(g.SetWH, 0);
      },
      SetWH: function() {
        var u = document.getElementById("MathJax_MenuFrame");
        if (u) {
          u = u.firstChild;
          u.style.width = u.style.height = "1px";
          u.style.width = document.body.scrollWidth + "px";
          u.style.height = document.body.scrollHeight + "px";
        }
      },
      posted: false,
      active: null,
      GetNode: function(u) {
        var v = document.getElementById(u.inputID + "-Frame");
        return v.isMathJax ? v : v.firstChild;
      },
      CurrentNode: function() {
        return g.GetNode(g.jax);
      },
      AllNodes: function() {
        var v = MathJax.Hub.getAllJax();
        var w = [];
        for (var x = 0, u; (u = v[x]); x++) {
          w.push(g.GetNode(u));
        }
        return w;
      },
      ActiveNode: function() {
        return g.active;
      },
      FocusNode: function(u) {
        g.active = u;
        u.focus();
      },
      Focus: function(u) {
        !g.posted ? g.Activate(u) : (g.ActiveNode().tabIndex = -1);
        u.tabIndex = 0;
        g.FocusNode(u);
      },
      Activate: function(u, v) {
        g.UnsetTabIndex();
        g.posted = true;
      },
      Unfocus: function() {
        g.ActiveNode().tabIndex = -1;
        g.SetTabIndex();
        g.FocusNode(g.CurrentNode());
        g.posted = false;
      },
      MoveHorizontal: function(y, z, w) {
        if (!y.shiftKey) {
          return;
        }
        var v = g.AllNodes();
        var u = v.length;
        if (u === 0) {
          return;
        }
        var x = v[g.Mod(w(g.IndexOf(v, g.CurrentNode())), u)];
        if (x === g.CurrentNode()) {
          return;
        }
        g.menu.Remove(y, z);
        g.jax = MathJax.Hub.getJaxFor(x);
        g.FocusNode(x);
        g.menu.Post(null);
      },
      Right: function(u, v) {
        g.MoveHorizontal(u, v, function(w) {
          return w + 1;
        });
      },
      Left: function(u, v) {
        g.MoveHorizontal(u, v, function(w) {
          return w - 1;
        });
      },
      UnsetTabIndex: function() {
        var v = g.AllNodes();
        for (var w = 0, u; (u = v[w]); w++) {
          if (u.tabIndex > 0) {
            u.oldTabIndex = u.tabIndex;
          }
          u.tabIndex = -1;
        }
      },
      SetTabIndex: function() {
        var v = g.AllNodes();
        for (var w = 0, u; (u = v[w]); w++) {
          if (u.oldTabIndex !== undefined) {
            u.tabIndex = u.oldTabIndex;
            delete u.oldTabIndex;
          } else {
            u.tabIndex = f.getTabOrder(u);
          }
        }
      },
      Mod: function(u, v) {
        return ((u % v) + v) % v;
      },
      IndexOf: Array.prototype.indexOf
        ? function(u, v, w) {
            return u.indexOf(v, w);
          }
        : function(u, x, y) {
            for (var w = y || 0, v = u.length; w < v; w++) {
              if (x === u[w]) {
                return w;
              }
            }
            return -1;
          },
      saveCookie: function() {
        o.Cookie.Set("menu", this.cookie);
      },
      getCookie: function() {
        this.cookie = o.Cookie.Get("menu");
      }
    }
  ));
  MathJax.Menu.NAV = h;
  var c = (g.ITEM = h.Subclass(
    {
      name: "",
      node: null,
      menu: null,
      Attributes: function(u) {
        return f.Insert(
          {
            onmouseup: g.Mouseup,
            ondragstart: n,
            onselectstart: n,
            onselectend: n,
            ontouchstart: g.Touchstart,
            ontouchend: g.Touchend,
            className: "MathJax_MenuItem",
            role: this.role,
            menuItem: this
          },
          u
        );
      },
      Create: function(w) {
        if (!this.hidden) {
          var v = this.Attributes();
          var u = this.Label(v, w);
          o.addElement(w, "div", v, u);
        }
      },
      Name: function() {
        return t(this.name[0], this.name[1]);
      },
      Mouseover: function(u, v) {
        if (v.parentNode === g.ActiveNode().parentNode) {
          this.Deactivate(g.ActiveNode());
        }
        this.Activate(u, v);
      },
      Mouseout: function(u, v) {
        this.Deactivate(v);
      },
      Mouseup: function(u, v) {
        return this.Remove(u, v);
      },
      DeactivateSubmenus: function(z) {
        var y = document.getElementById("MathJax_MenuFrame").childNodes,
          v = c.GetMenuNode(z).childNodes;
        for (var w = 0, u = v.length; w < u; w++) {
          var x = v[w].menuItem;
          if (x && x.submenu && x.submenu.posted && x !== z.menuItem) {
            x.Deactivate(v[w]);
          }
        }
        this.RemoveSubmenus(z, y);
      },
      RemoveSubmenus: function(w, v) {
        v = v || document.getElementById("MathJax_MenuFrame").childNodes;
        var u = v.length - 1;
        while (u >= 0 && c.GetMenuNode(w).menuItem !== v[u].menuItem) {
          v[u].menuItem.posted = false;
          v[u].parentNode.removeChild(v[u]);
          u--;
        }
      },
      Touchstart: function(u, v) {
        return this.TouchEvent(u, v, "Mousedown");
      },
      Touchend: function(u, v) {
        return this.TouchEvent(u, v, "Mouseup");
      },
      TouchEvent: function(v, w, u) {
        if (this !== c.lastItem) {
          if (c.lastMenu) {
            g.Event(v, c.lastMenu, "Mouseout");
          }
          g.Event(v, w, "Mouseover", true);
          c.lastItem = this;
          c.lastMenu = w;
        }
        if (this.nativeTouch) {
          return null;
        }
        g.Event(v, w, u);
        return false;
      },
      Remove: function(u, v) {
        v = v.parentNode.menuItem;
        return v.Remove(u, v);
      },
      With: function(u) {
        if (u) {
          f.Insert(this, u);
        }
        return this;
      },
      isRTL: function() {
        return g.isRTL;
      },
      rtlClass: function() {
        return this.isRTL() ? " RTL" : "";
      }
    },
    {
      GetMenuNode: function(u) {
        return u.parentNode;
      }
    }
  ));
  g.ENTRY = g.ITEM.Subclass({
    role: "menuitem",
    Attributes: function(u) {
      u = f.Insert(
        {
          onmouseover: g.Mouseover,
          onmouseout: g.Mouseout,
          onmousedown: g.Mousedown,
          onkeydown: g.Keydown,
          "aria-disabled": !!this.disabled
        },
        u
      );
      u = this.SUPER(arguments).Attributes.call(this, u);
      if (this.disabled) {
        u.className += " MathJax_MenuDisabled";
      }
      return u;
    },
    MoveVertical: function(u, E, w) {
      var x = c.GetMenuNode(E);
      var D = [];
      for (var z = 0, C = x.menuItem.items, y; (y = C[z]); z++) {
        if (!y.hidden) {
          D.push(y);
        }
      }
      var B = g.IndexOf(D, this);
      if (B === -1) {
        return;
      }
      var A = D.length;
      var v = x.childNodes;
      do {
        B = g.Mod(w(B), A);
      } while (D[B].hidden || !v[B].role || v[B].role === "separator");
      this.Deactivate(E);
      D[B].Activate(u, v[B]);
    },
    Up: function(v, u) {
      this.MoveVertical(v, u, function(w) {
        return w - 1;
      });
    },
    Down: function(v, u) {
      this.MoveVertical(v, u, function(w) {
        return w + 1;
      });
    },
    Right: function(v, u) {
      this.MoveHorizontal(v, u, g.Right, !this.isRTL());
    },
    Left: function(v, u) {
      this.MoveHorizontal(v, u, g.Left, this.isRTL());
    },
    MoveHorizontal: function(A, z, u, B) {
      var x = c.GetMenuNode(z);
      if (x.menuItem === g.menu && A.shiftKey) {
        u(A, z);
      }
      if (B) {
        return;
      }
      if (x.menuItem !== g.menu) {
        this.Deactivate(z);
      }
      var v = x.previousSibling.childNodes;
      var y = v.length;
      while (y--) {
        var w = v[y];
        if (w.menuItem.submenu && w.menuItem.submenu === x.menuItem) {
          g.Focus(w);
          break;
        }
      }
      this.RemoveSubmenus(z);
    },
    Space: function(u, v) {
      this.Mouseup(u, v);
    },
    Activate: function(u, v) {
      this.Deactivate(v);
      if (!this.disabled) {
        v.className += " MathJax_MenuActive";
      }
      this.DeactivateSubmenus(v);
      g.Focus(v);
    },
    Deactivate: function(u) {
      u.className = u.className.replace(/ MathJax_MenuActive/, "");
    }
  });
  g.ITEM.COMMAND = g.ENTRY.Subclass({
    action: function() {},
    Init: function(u, w, v) {
      if (!i(u)) {
        u = [u, u];
      }
      this.name = u;
      this.action = w;
      this.With(v);
    },
    Label: function(u, v) {
      return [this.Name()];
    },
    Mouseup: function(u, v) {
      if (!this.disabled) {
        this.Remove(u, v);
        d.Post(["command", this]);
        this.action.call(this, u);
      }
      return n(u);
    }
  });
  g.ITEM.SUBMENU = g.ENTRY.Subclass({
    submenu: null,
    marker: "\u25BA",
    markerRTL: "\u25C4",
    Attributes: function(u) {
      u = f.Insert({ "aria-haspopup": "true" }, u);
      u = this.SUPER(arguments).Attributes.call(this, u);
      return u;
    },
    Init: function(u, w) {
      if (!i(u)) {
        u = [u, u];
      }
      this.name = u;
      var v = 1;
      if (!(w instanceof g.ITEM)) {
        this.With(w), v++;
      }
      this.submenu = g.apply(g, [].slice.call(arguments, v));
    },
    Label: function(u, v) {
      this.submenu.posted = false;
      return [
        this.Name() + " ",
        [
          "span",
          { className: "MathJax_MenuArrow" + this.rtlClass() },
          [this.isRTL() ? this.markerRTL : this.marker]
        ]
      ];
    },
    Timer: function(u, v) {
      this.ClearTimer();
      u = { type: u.type, clientX: u.clientX, clientY: u.clientY };
      this.timer = setTimeout(e(["Mouseup", this, u, v]), s.delay);
    },
    ClearTimer: function() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
    },
    Touchend: function(v, x) {
      var w = this.submenu.posted;
      var u = this.SUPER(arguments).Touchend.apply(this, arguments);
      if (w) {
        this.Deactivate(x);
        delete c.lastItem;
        delete c.lastMenu;
      }
      return u;
    },
    Mouseout: function(u, v) {
      if (!this.submenu.posted) {
        this.Deactivate(v);
      }
      this.ClearTimer();
    },
    Mouseover: function(u, v) {
      this.Activate(u, v);
    },
    Mouseup: function(u, v) {
      if (!this.disabled) {
        if (!this.submenu.posted) {
          this.ClearTimer();
          this.submenu.Post(u, v, this.ltr);
          g.Focus(v);
        } else {
          this.DeactivateSubmenus(v);
        }
      }
      return n(u);
    },
    Activate: function(u, v) {
      if (!this.disabled) {
        this.Deactivate(v);
        v.className += " MathJax_MenuActive";
      }
      if (!this.submenu.posted) {
        this.DeactivateSubmenus(v);
        if (!g.isMobile) {
          this.Timer(u, v);
        }
      }
      g.Focus(v);
    },
    MoveVertical: function(w, v, u) {
      this.ClearTimer();
      this.SUPER(arguments).MoveVertical.apply(this, arguments);
    },
    MoveHorizontal: function(w, y, v, x) {
      if (!x) {
        this.SUPER(arguments).MoveHorizontal.apply(this, arguments);
        return;
      }
      if (this.disabled) {
        return;
      }
      if (!this.submenu.posted) {
        this.Activate(w, y);
        return;
      }
      var u = c.GetMenuNode(y).nextSibling.childNodes;
      if (u.length > 0) {
        this.submenu.items[0].Activate(w, u[0]);
      }
    }
  });
  g.ITEM.RADIO = g.ENTRY.Subclass({
    variable: null,
    marker: a ? "\u25CF" : "\u2713",
    role: "menuitemradio",
    Attributes: function(v) {
      var u = s.settings[this.variable] === this.value ? "true" : "false";
      v = f.Insert({ "aria-checked": u }, v);
      v = this.SUPER(arguments).Attributes.call(this, v);
      return v;
    },
    Init: function(v, u, w) {
      if (!i(v)) {
        v = [v, v];
      }
      this.name = v;
      this.variable = u;
      this.With(w);
      if (this.value == null) {
        this.value = this.name[0];
      }
    },
    Label: function(v, w) {
      var u = { className: "MathJax_MenuRadioCheck" + this.rtlClass() };
      if (s.settings[this.variable] !== this.value) {
        u = { style: { display: "none" } };
      }
      return [["span", u, [this.marker]], " " + this.Name()];
    },
    Mouseup: function(x, y) {
      if (!this.disabled) {
        var z = y.parentNode.childNodes;
        for (var v = 0, u = z.length; v < u; v++) {
          var w = z[v].menuItem;
          if (w && w.variable === this.variable) {
            z[v].firstChild.style.display = "none";
          }
        }
        y.firstChild.display = "";
        s.settings[this.variable] = this.value;
        g.cookie[this.variable] = s.settings[this.variable];
        g.saveCookie();
        d.Post(["radio button", this]);
      }
      this.Remove(x, y);
      if (this.action && !this.disabled) {
        this.action.call(g, this);
      }
      return n(x);
    }
  });
  g.ITEM.CHECKBOX = g.ENTRY.Subclass({
    variable: null,
    marker: "\u2713",
    role: "menuitemcheckbox",
    Attributes: function(v) {
      var u = s.settings[this.variable] ? "true" : "false";
      v = f.Insert({ "aria-checked": u }, v);
      v = this.SUPER(arguments).Attributes.call(this, v);
      return v;
    },
    Init: function(v, u, w) {
      if (!i(v)) {
        v = [v, v];
      }
      this.name = v;
      this.variable = u;
      this.With(w);
    },
    Label: function(v, w) {
      var u = { className: "MathJax_MenuCheck" + this.rtlClass() };
      if (!s.settings[this.variable]) {
        u = { style: { display: "none" } };
      }
      return [["span", u, [this.marker]], " " + this.Name()];
    },
    Mouseup: function(u, v) {
      if (!this.disabled) {
        v.firstChild.display = s.settings[this.variable] ? "none" : "";
        s.settings[this.variable] = !s.settings[this.variable];
        g.cookie[this.variable] = s.settings[this.variable];
        g.saveCookie();
        d.Post(["checkbox", this]);
      }
      this.Remove(u, v);
      if (this.action && !this.disabled) {
        this.action.call(g, this);
      }
      return n(u);
    }
  });
  g.ITEM.LABEL = g.ENTRY.Subclass({
    role: "menuitem",
    Init: function(u, v) {
      if (!i(u)) {
        u = [u, u];
      }
      this.name = u;
      this.With(v);
    },
    Label: function(u, v) {
      u.className += " MathJax_MenuLabel";
      return [this.Name()];
    },
    Activate: function(u, v) {
      this.Deactivate(v);
      g.Focus(v);
    },
    Mouseup: function(u, v) {}
  });
  g.ITEM.RULE = g.ITEM.Subclass({
    role: "separator",
    Attributes: function(u) {
      u = f.Insert({ "aria-orientation": "vertical" }, u);
      u = this.SUPER(arguments).Attributes.call(this, u);
      return u;
    },
    Label: function(u, v) {
      u.className += " MathJax_MenuRule";
      return null;
    }
  });
  g.About = function(y) {
    var v = g.About.GetFont();
    var A = g.About.GetFormat();
    var u = ["MathJax.js v" + MathJax.fileversion, ["br"]];
    u.push([
      "div",
      { style: { "border-top": "groove 2px", margin: ".25em 0" } }
    ]);
    g.About.GetJax(u, MathJax.InputJax, ["InputJax", "%1 Input Jax v%2"]);
    g.About.GetJax(u, MathJax.OutputJax, ["OutputJax", "%1 Output Jax v%2"]);
    g.About.GetJax(u, MathJax.ElementJax, ["ElementJax", "%1 Element Jax v%2"]);
    u.push([
      "div",
      { style: { "border-top": "groove 2px", margin: ".25em 0" } }
    ]);
    g.About.GetJax(
      u,
      MathJax.Extension,
      ["Extension", "%1 Extension v%2"],
      true
    );
    u.push(
      ["div", { style: { "border-top": "groove 2px", margin: ".25em 0" } }],
      [
        "center",
        {},
        [
          f.Browser +
            " v" +
            f.Browser.version +
            (A ? " \u2014 " + t(A.replace(/ /g, ""), A) : "")
        ]
      ]
    );
    g.About.div = g.Background(g.About);
    var x = o.addElement(
      g.About.div,
      "div",
      { id: "MathJax_About", tabIndex: 0, onkeydown: g.About.Keydown },
      [
        ["b", { style: { fontSize: "120%" } }, ["MathJax"]],
        " v" + MathJax.version,
        ["br"],
        t(v.replace(/ /g, ""), "using " + v),
        ["br"],
        ["br"],
        [
          "span",
          {
            style: {
              display: "inline-block",
              "text-align": "left",
              "font-size": "80%",
              "max-height": "20em",
              overflow: "auto",
              "background-color": "#E4E4E4",
              padding: ".4em .6em",
              border: "1px inset"
            },
            tabIndex: 0
          },
          u
        ],
        ["br"],
        ["br"],
        ["a", { href: "http://www.mathjax.org/" }, ["www.mathjax.org"]],
        [
          "span",
          {
            className: "MathJax_MenuClose",
            id: "MathJax_AboutClose",
            onclick: g.About.Remove,
            onkeydown: g.About.Keydown,
            tabIndex: 0,
            role: "button",
            "aria-label": t("CloseAboutDialog", "Close about MathJax dialog")
          },
          [["span", {}, "\u00D7"]]
        ]
      ]
    );
    if (y.type === "mouseup") {
      x.className += " MathJax_MousePost";
    }
    x.focus();
    MathJax.Localization.setCSS(x);
    var z = document.documentElement || {};
    var w = window.innerHeight || z.clientHeight || z.scrollHeight || 0;
    if (g.prototype.msieAboutBug) {
      x.style.width = "20em";
      x.style.position = "absolute";
      x.style.left =
        Math.floor((document.documentElement.scrollWidth - x.offsetWidth) / 2) +
        "px";
      x.style.top =
        Math.floor((w - x.offsetHeight) / 3) + document.body.scrollTop + "px";
    } else {
      x.style.marginLeft = Math.floor(-x.offsetWidth / 2) + "px";
      x.style.top = Math.floor((w - x.offsetHeight) / 3) + "px";
    }
  };
  g.About.Remove = function(u) {
    if (g.About.div) {
      document.body.removeChild(g.About.div);
      delete g.About.div;
    }
  };
  (g.About.Keydown = function(u) {
    if (
      u.keyCode === b.ESCAPE ||
      (this.id === "MathJax_AboutClose" &&
        (u.keyCode === b.SPACE || u.keyCode === b.RETURN))
    ) {
      g.About.Remove(u);
      g.CurrentNode().focus();
      n(u);
    }
  }),
    (g.About.GetJax = function(v, A, y, x) {
      var z = [];
      for (var B in A) {
        if (A.hasOwnProperty(B) && A[B]) {
          if ((x && A[B].version) || (A[B].isa && A[B].isa(A))) {
            z.push(t(y[0], y[1], A[B].id || B, A[B].version));
          }
        }
      }
      z.sort();
      for (var w = 0, u = z.length; w < u; w++) {
        v.push(z[w], ["br"]);
      }
      return v;
    });
  g.About.GetFont = function() {
    var u = MathJax.Hub.outputJax["jax/mml"][0] || {};
    var v =
      {
        SVG: "web SVG",
        CommonHTML: "web TeX",
        "HTML-CSS": u.imgFonts
          ? "image"
          : (u.webFonts ? "web" : "local") + " " + u.fontInUse
      }[u.id] || "generic";
    return v + " fonts";
  };
  g.About.GetFormat = function() {
    var u = MathJax.Hub.outputJax["jax/mml"][0] || {};
    if (u.id !== "HTML-CSS" || !u.webFonts || u.imgFonts) {
      return;
    }
    return u.allowWebFonts.replace(/otf/, "woff or otf") + " fonts";
  };
  g.Help = function(u) {
    q.Require("[MathJax]/extensions/HelpDialog.js", function() {
      MathJax.Extension.Help.Dialog({ type: u.type });
    });
  };
  g.ShowSource = function(y) {
    if (!y) {
      y = window.event;
    }
    var x = { screenX: y.screenX, screenY: y.screenY };
    if (!g.jax) {
      return;
    }
    if (this.format === "MathML") {
      var v = MathJax.ElementJax.mml;
      if (v && typeof v.mbase.prototype.toMathML !== "undefined") {
        try {
          g.ShowSource.Text(g.jax.root.toMathML("", g.jax), y);
        } catch (w) {
          if (!w.restart) {
            throw w;
          }
          e.After([this, g.ShowSource, x], w.restart);
        }
      } else {
        if (!q.loadingToMathML) {
          q.loadingToMathML = true;
          g.ShowSource.Window(y);
          e.Queue(
            q.Require("[MathJax]/extensions/toMathML.js"),
            function() {
              delete q.loadingToMathML;
              if (!v.mbase.prototype.toMathML) {
                v.mbase.prototype.toMathML = function() {};
              }
            },
            [this, g.ShowSource, x]
          );
          return;
        }
      }
    } else {
      if (this.format === "Error") {
        g.ShowSource.Text(g.jax.errorText, y);
      } else {
        if (s.semanticsAnnotations[this.format]) {
          var u = g.jax.root.getAnnotation(this.format);
          if (u.data[0]) {
            g.ShowSource.Text(u.data[0].toString());
          }
        } else {
          if (g.jax.originalText == null) {
            alert(t("NoOriginalForm", "No original form available"));
            return;
          }
          g.ShowSource.Text(g.jax.originalText, y);
        }
      }
    }
  };
  g.ShowSource.Window = function(v) {
    if (!g.ShowSource.w) {
      var w = [],
        u = s.windowSettings;
      for (var x in u) {
        if (u.hasOwnProperty(x)) {
          w.push(x + "=" + u[x]);
        }
      }
      g.ShowSource.w = window.open("", "_blank", w.join(","));
    }
    return g.ShowSource.w;
  };
  g.ShowSource.Text = function(z, x) {
    var u = g.ShowSource.Window(x);
    delete g.ShowSource.w;
    z = z.replace(/^\s*/, "").replace(/\s*$/, "");
    z = z
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    var y = t("EqSource", "MathJax Equation Source");
    if (g.isMobile) {
      u.document.open();
      u.document.write(
        "<html><head><meta name='viewport' content='width=device-width, initial-scale=1.0' /><title>" +
          y +
          "</title></head><body style='font-size:85%'>"
      );
      u.document.write("<pre>" + z + "</pre>");
      u.document.write(
        "<hr><input type='button' value='" +
          t("Close", "Close") +
          "' onclick='window.close()' />"
      );
      u.document.write("</body></html>");
      u.document.close();
    } else {
      u.document.open();
      u.document.write(
        "<html><head><title>" +
          y +
          "</title></head><body style='font-size:85%'>"
      );
      u.document.write("<table><tr><td><pre>" + z + "</pre></td></tr></table>");
      u.document.write("</body></html>");
      u.document.close();
      var v = u.document.body.firstChild;
      setTimeout(function() {
        var B = u.outerHeight - u.innerHeight || 30,
          A = u.outerWidth - u.innerWidth || 30,
          w,
          E;
        A = Math.max(
          140,
          Math.min(Math.floor(0.5 * screen.width), v.offsetWidth + A + 25)
        );
        B = Math.max(
          40,
          Math.min(Math.floor(0.5 * screen.height), v.offsetHeight + B + 25)
        );
        if (g.prototype.msieHeightBug) {
          B += 35;
        }
        u.resizeTo(A, B);
        var D;
        try {
          D = x.screenX;
        } catch (C) {}
        if (x && D != null) {
          w = Math.max(
            0,
            Math.min(x.screenX - Math.floor(A / 2), screen.width - A - 20)
          );
          E = Math.max(
            0,
            Math.min(x.screenY - Math.floor(B / 2), screen.height - B - 20)
          );
          u.moveTo(w, E);
        }
      }, 50);
    }
  };
  g.Scale = function() {
    var z = ["CommonHTML", "HTML-CSS", "SVG", "NativeMML", "PreviewHTML"],
      u = z.length,
      y = 100,
      w,
      v;
    for (w = 0; w < u; w++) {
      v = r[z[w]];
      if (v) {
        y = v.config.scale;
        break;
      }
    }
    var x = prompt(
      t("ScaleMath", "Scale all mathematics (compared to surrounding text) by"),
      y + "%"
    );
    if (x) {
      if (x.match(/^\s*\d+(\.\d*)?\s*%?\s*$/)) {
        x = parseFloat(x);
        if (x) {
          if (x !== y) {
            for (w = 0; w < u; w++) {
              v = r[z[w]];
              if (v) {
                v.config.scale = x;
              }
            }
            g.cookie.scale = f.config.scale = x;
            g.saveCookie();
            f.Queue(["Rerender", f]);
          }
        } else {
          alert(t("NonZeroScale", "The scale should not be zero"));
        }
      } else {
        alert(
          t("PercentScale", "The scale should be a percentage (e.g., 120%%)")
        );
      }
    }
  };
  g.Zoom = function() {
    if (!MathJax.Extension.MathZoom) {
      q.Require("[MathJax]/extensions/MathZoom.js");
    }
  };
  g.Renderer = function() {
    var v = f.outputJax["jax/mml"];
    if (v[0] !== s.settings.renderer) {
      var y = f.Browser,
        x,
        u = g.Renderer.Messages,
        w;
      switch (s.settings.renderer) {
        case "NativeMML":
          if (!s.settings.warnedMML) {
            if (y.isChrome && y.version.substr(0, 3) !== "24.") {
              x = u.MML.WebKit;
            } else {
              if (y.isSafari && !y.versionAtLeast("5.0")) {
                x = u.MML.WebKit;
              } else {
                if (y.isMSIE) {
                  if (!y.hasMathPlayer) {
                    x = u.MML.MSIE;
                  }
                } else {
                  if (y.isEdge) {
                    x = u.MML.WebKit;
                  } else {
                    x = u.MML[y];
                  }
                }
              }
            }
            w = "warnedMML";
          }
          break;
        case "SVG":
          if (!s.settings.warnedSVG) {
            if (y.isMSIE && !m) {
              x = u.SVG.MSIE;
            }
          }
          break;
      }
      if (x) {
        x = t(x[0], x[1]);
        x += "\n\n";
        x += t(
          "SwitchAnyway",
          "Switch the renderer anyway?\n\n(Press OK to switch, CANCEL to continue with the current renderer)"
        );
        g.cookie.renderer = v[0].id;
        g.saveCookie();
        if (!confirm(x)) {
          g.cookie.renderer = s.settings.renderer = o.Cookie.Get(
            "menu"
          ).renderer;
          g.saveCookie();
          return;
        }
        if (w) {
          g.cookie.warned = s.settings.warned = true;
        }
        g.cookie.renderer = s.settings.renderer;
        g.saveCookie();
      }
      f.Queue(
        ["setRenderer", f, s.settings.renderer, "jax/mml"],
        ["Rerender", f]
      );
    }
  };
  g.Renderer.Messages = {
    MML: {
      WebKit: [
        "WebkitNativeMMLWarning",
        "Your browser doesn't seem to support MathML natively, so switching to MathML output may cause the mathematics on the page to become unreadable."
      ],
      MSIE: [
        "MSIENativeMMLWarning",
        "Internet Explorer requires the MathPlayer plugin in order to process MathML output."
      ],
      Opera: [
        "OperaNativeMMLWarning",
        "Opera's support for MathML is limited, so switching to MathML output may cause some expressions to render poorly."
      ],
      Safari: [
        "SafariNativeMMLWarning",
        "Your browser's native MathML does not implement all the features used by MathJax, so some expressions may not render properly."
      ],
      Firefox: [
        "FirefoxNativeMMLWarning",
        "Your browser's native MathML does not implement all the features used by MathJax, so some expressions may not render properly."
      ]
    },
    SVG: {
      MSIE: [
        "MSIESVGWarning",
        "SVG is not implemented in Internet Explorer prior to IE9 or when it is emulating IE8 or below. Switching to SVG output will cause the mathematics to not display properly."
      ]
    }
  };
  g.AssistiveMML = function(w, u) {
    var v = MathJax.Extension.AssistiveMML;
    if (!v) {
      if (!u) {
        q.Require("[MathJax]/extensions/AssistiveMML.js", [
          "AssistiveMML",
          g,
          w,
          true
        ]);
      }
      return;
    }
    MathJax.Hub.Queue([
      (s.settings.assistiveMML ? "Add" : "Remove") + "AssistiveMathML",
      v
    ]);
  };
  g.Font = function() {
    var u = r["HTML-CSS"];
    if (!u) {
      return;
    }
    document.location.reload();
  };
  g.Locale = function() {
    MathJax.Localization.setLocale(s.settings.locale);
    MathJax.Hub.Queue(["Reprocess", MathJax.Hub]);
  };
  g.LoadLocale = function() {
    var u = prompt(t("LoadURL", "Load translation data from this URL:"));
    if (u) {
      if (!u.match(/\.js$/)) {
        alert(
          t(
            "BadURL",
            "The URL should be for a javascript file that defines MathJax translation data.  Javascript file names should end with '.js'"
          )
        );
      }
      q.Require(u, function(v) {
        if (v != q.STATUS.OK) {
          alert(t("BadData", "Failed to load translation data from %1", u));
        }
      });
    }
  };
  g.MPEvents = function(w) {
    var v = s.settings.discoverable,
      u = g.MPEvents.Messages;
    if (!m) {
      if (s.settings.mpMouse && !confirm(t.apply(t, u.IE8warning))) {
        delete g.cookie.mpContext;
        delete s.settings.mpContext;
        delete g.cookie.mpMouse;
        delete s.settings.mpMouse;
        g.saveCookie();
        return;
      }
      s.settings.mpContext = s.settings.mpMouse;
      g.cookie.mpContext = g.cookie.mpMouse = s.settings.mpMouse;
      g.saveCookie();
      MathJax.Hub.Queue(["Rerender", MathJax.Hub]);
    } else {
      if (!v && w.name[1] === "Menu Events" && s.settings.mpContext) {
        alert(t.apply(t, u.IE9warning));
      }
    }
  };
  g.MPEvents.Messages = {
    IE8warning: [
      "IE8warning",
      "This will disable the MathJax menu and zoom features, but you can Alt-Click on an expression to obtain the MathJax menu instead.\n\nReally change the MathPlayer settings?"
    ],
    IE9warning: [
      "IE9warning",
      "The MathJax contextual menu will be disabled, but you can Alt-Click on an expression to obtain the MathJax menu instead."
    ]
  };
  f.Browser.Select({
    MSIE: function(u) {
      var v = document.compatMode === "BackCompat";
      var w = u.versionAtLeast("8.0") && document.documentMode > 7;
      g.Augment({
        margin: 20,
        msieBackgroundBug: (document.documentMode || 0) < 9,
        msieFixedPositionBug: v || !w,
        msieAboutBug: v,
        msieHeightBug: (document.documentMode || 0) < 9
      });
      if (m) {
        delete s.styles["#MathJax_About"].filter;
        delete s.styles[".MathJax_Menu"].filter;
      }
    },
    Firefox: function(u) {
      g.skipMouseover = u.isMobile && u.versionAtLeast("6.0");
      g.skipMousedown = u.isMobile;
    }
  });
  g.isMobile = f.Browser.isMobile;
  g.noContextMenu = f.Browser.noContextMenu;
  g.CreateLocaleMenu = function() {
    if (!g.menu) {
      return;
    }
    var z = g.menu.Find("Language").submenu,
      w = z.items;
    var v = [],
      B = MathJax.Localization.strings;
    for (var A in B) {
      if (B.hasOwnProperty(A)) {
        v.push(A);
      }
    }
    v = v.sort();
    z.items = [];
    for (var x = 0, u = v.length; x < u; x++) {
      var y = B[v[x]].menuTitle;
      if (y) {
        y += " (" + v[x] + ")";
      } else {
        y = v[x];
      }
      z.items.push(c.RADIO([v[x], y], "locale", { action: g.Locale }));
    }
    z.items.push(w[w.length - 2], w[w.length - 1]);
  };
  g.CreateAnnotationMenu = function() {
    if (!g.menu) {
      return;
    }
    var w = g.menu.Find("Show Math As", "Annotation").submenu;
    var v = s.semanticsAnnotations;
    for (var u in v) {
      if (v.hasOwnProperty(u)) {
        w.items.push(
          c.COMMAND([u, u], g.ShowSource, {
            hidden: true,
            nativeTouch: true,
            format: u
          })
        );
      }
    }
  };
  f.Register.StartupHook("End Config", function() {
    s.settings = f.config.menuSettings;
    if (typeof s.settings.showRenderer !== "undefined") {
      s.showRenderer = s.settings.showRenderer;
    }
    if (typeof s.settings.showFontMenu !== "undefined") {
      s.showFontMenu = s.settings.showFontMenu;
    }
    if (typeof s.settings.showContext !== "undefined") {
      s.showContext = s.settings.showContext;
    }
    g.getCookie();
    g.menu = g(
      c.SUBMENU(
        ["Show", "Show Math As"],
        c.COMMAND(["MathMLcode", "MathML Code"], g.ShowSource, {
          nativeTouch: true,
          format: "MathML"
        }),
        c.COMMAND(["Original", "Original Form"], g.ShowSource, {
          nativeTouch: true
        }),
        c.SUBMENU(["Annotation", "Annotation"], { disabled: true }),
        c.RULE(),
        c.CHECKBOX(["texHints", "Show TeX hints in MathML"], "texHints"),
        c.CHECKBOX(
          ["semantics", "Add original form as annotation"],
          "semantics"
        )
      ),
      c.RULE(),
      c.SUBMENU(
        ["Settings", "Math Settings"],
        c.SUBMENU(
          ["ZoomTrigger", "Zoom Trigger"],
          c.RADIO(["Hover", "Hover"], "zoom", { action: g.Zoom }),
          c.RADIO(["Click", "Click"], "zoom", { action: g.Zoom }),
          c.RADIO(["DoubleClick", "Double-Click"], "zoom", { action: g.Zoom }),
          c.RADIO(["NoZoom", "No Zoom"], "zoom", { value: "None" }),
          c.RULE(),
          c.LABEL(["TriggerRequires", "Trigger Requires:"]),
          c.CHECKBOX(
            f.Browser.isMac ? ["Option", "Option"] : ["Alt", "Alt"],
            "ALT"
          ),
          c.CHECKBOX(["Command", "Command"], "CMD", {
            hidden: !f.Browser.isMac
          }),
          c.CHECKBOX(["Control", "Control"], "CTRL", {
            hidden: f.Browser.isMac
          }),
          c.CHECKBOX(["Shift", "Shift"], "Shift")
        ),
        c.SUBMENU(
          ["ZoomFactor", "Zoom Factor"],
          c.RADIO("125%", "zscale"),
          c.RADIO("133%", "zscale"),
          c.RADIO("150%", "zscale"),
          c.RADIO("175%", "zscale"),
          c.RADIO("200%", "zscale"),
          c.RADIO("250%", "zscale"),
          c.RADIO("300%", "zscale"),
          c.RADIO("400%", "zscale")
        ),
        c.RULE(),
        c.SUBMENU(
          ["Renderer", "Math Renderer"],
          { hidden: !s.showRenderer },
          c.RADIO(["HTML-CSS", "HTML-CSS"], "renderer", { action: g.Renderer }),
          c.RADIO(["CommonHTML", "Common HTML"], "renderer", {
            action: g.Renderer,
            value: "CommonHTML"
          }),
          c.RADIO(["PreviewHTML", "Preview HTML"], "renderer", {
            action: g.Renderer,
            value: "PreviewHTML"
          }),
          c.RADIO(["MathML", "MathML"], "renderer", {
            action: g.Renderer,
            value: "NativeMML"
          }),
          c.RADIO(["SVG", "SVG"], "renderer", { action: g.Renderer }),
          c.RADIO(["PlainSource", "Plain Source"], "renderer", {
            action: g.Renderer,
            value: "PlainSource"
          }),
          c.RULE(),
          c.CHECKBOX(["FastPreview", "Fast Preview"], "FastPreview")
        ),
        c.SUBMENU(
          "MathPlayer",
          {
            hidden: !f.Browser.isMSIE || !s.showMathPlayer,
            disabled: !f.Browser.hasMathPlayer
          },
          c.LABEL(["MPHandles", "Let MathPlayer Handle:"]),
          c.CHECKBOX(["MenuEvents", "Menu Events"], "mpContext", {
            action: g.MPEvents,
            hidden: !m
          }),
          c.CHECKBOX(["MouseEvents", "Mouse Events"], "mpMouse", {
            action: g.MPEvents,
            hidden: !m
          }),
          c.CHECKBOX(["MenuAndMouse", "Mouse and Menu Events"], "mpMouse", {
            action: g.MPEvents,
            hidden: m
          })
        ),
        c.SUBMENU(
          ["FontPrefs", "Font Preference"],
          { hidden: !s.showFontMenu },
          c.LABEL(["ForHTMLCSS", "For HTML-CSS:"]),
          c.RADIO(["Auto", "Auto"], "font", { action: g.Font }),
          c.RULE(),
          c.RADIO(["TeXLocal", "TeX (local)"], "font", { action: g.Font }),
          c.RADIO(["TeXWeb", "TeX (web)"], "font", { action: g.Font }),
          c.RADIO(["TeXImage", "TeX (image)"], "font", { action: g.Font }),
          c.RULE(),
          c.RADIO(["STIXLocal", "STIX (local)"], "font", { action: g.Font }),
          c.RADIO(["STIXWeb", "STIX (web)"], "font", { action: g.Font }),
          c.RULE(),
          c.RADIO(["AsanaMathWeb", "Asana Math (web)"], "font", {
            action: g.Font
          }),
          c.RADIO(["GyrePagellaWeb", "Gyre Pagella (web)"], "font", {
            action: g.Font
          }),
          c.RADIO(["GyreTermesWeb", "Gyre Termes (web)"], "font", {
            action: g.Font
          }),
          c.RADIO(["LatinModernWeb", "Latin Modern (web)"], "font", {
            action: g.Font
          }),
          c.RADIO(["NeoEulerWeb", "Neo Euler (web)"], "font", {
            action: g.Font
          })
        ),
        c.SUBMENU(
          ["ContextMenu", "Contextual Menu"],
          { hidden: !s.showContext },
          c.RADIO(["MathJax", "MathJax"], "context"),
          c.RADIO(["Browser", "Browser"], "context")
        ),
        c.COMMAND(["Scale", "Scale All Math ..."], g.Scale),
        c
          .RULE()
          .With({ hidden: !s.showDiscoverable, name: ["", "discover_rule"] }),
        c.CHECKBOX(["Discoverable", "Highlight on Hover"], "discoverable", {
          hidden: !s.showDiscoverable
        })
      ),
      c.SUBMENU(
        ["Accessibility", "Accessibility"],
        c.CHECKBOX(["AssistiveMML", "Assistive MathML"], "assistiveMML", {
          action: g.AssistiveMML
        }),
        c.CHECKBOX(["InTabOrder", "Include in Tab Order"], "inTabOrder")
      ),
      c.SUBMENU(
        ["Locale", "Language"],
        { hidden: !s.showLocale, ltr: true },
        c.RADIO("en", "locale", { action: g.Locale }),
        c
          .RULE()
          .With({ hidden: !s.showLocaleURL, name: ["", "localURL_rule"] }),
        c.COMMAND(["LoadLocale", "Load from URL ..."], g.LoadLocale, {
          hidden: !s.showLocaleURL
        })
      ),
      c.RULE(),
      c.COMMAND(["About", "About MathJax"], g.About),
      c.COMMAND(["Help", "MathJax Help"], g.Help)
    );
    if (g.isMobile) {
      (function() {
        var v = s.settings;
        var u = g.menu.Find("Math Settings", "Zoom Trigger").submenu;
        u.items[0].disabled = u.items[1].disabled = true;
        if (v.zoom === "Hover" || v.zoom == "Click") {
          v.zoom = "None";
        }
        u.items = u.items.slice(0, 4);
        if (navigator.appVersion.match(/[ (]Android[) ]/)) {
          g.ITEM.SUBMENU.Augment({ marker: "\u00BB" });
        }
      })();
    }
    g.CreateLocaleMenu();
    g.CreateAnnotationMenu();
  });
  g.showRenderer = function(u) {
    g.cookie.showRenderer = s.showRenderer = u;
    g.saveCookie();
    g.menu.Find("Math Settings", "Math Renderer").hidden = !u;
  };
  g.showMathPlayer = function(u) {
    g.cookie.showMathPlayer = s.showMathPlayer = u;
    g.saveCookie();
    g.menu.Find("Math Settings", "MathPlayer").hidden = !u;
  };
  g.showFontMenu = function(u) {
    g.cookie.showFontMenu = s.showFontMenu = u;
    g.saveCookie();
    g.menu.Find("Math Settings", "Font Preference").hidden = !u;
  };
  g.showContext = function(u) {
    g.cookie.showContext = s.showContext = u;
    g.saveCookie();
    g.menu.Find("Math Settings", "Contextual Menu").hidden = !u;
  };
  g.showDiscoverable = function(u) {
    g.cookie.showDiscoverable = s.showDiscoverable = u;
    g.saveCookie();
    g.menu.Find("Math Settings", "Highlight on Hover").hidden = !u;
    g.menu.Find("Math Settings", "discover_rule").hidden = !u;
  };
  g.showLocale = function(u) {
    g.cookie.showLocale = s.showLocale = u;
    g.saveCookie();
    g.menu.Find("Language").hidden = !u;
  };
  MathJax.Hub.Register.StartupHook("HTML-CSS Jax Ready", function() {
    if (!MathJax.OutputJax["HTML-CSS"].config.imageFont) {
      g.menu.Find(
        "Math Settings",
        "Font Preference",
        "TeX (image)"
      ).disabled = true;
    }
  });
  e.Queue(
    f.Register.StartupHook("End Config", {}),
    ["Styles", q, s.styles],
    ["Post", f.Startup.signal, "MathMenu Ready"],
    ["loadComplete", q, "[MathJax]/extensions/MathMenu.js"]
  );
})(
  MathJax.Hub,
  MathJax.HTML,
  MathJax.Ajax,
  MathJax.CallBack,
  MathJax.OutputJax
);
MathJax.ElementJax.mml = MathJax.ElementJax(
  { mimeType: "jax/mml" },
  {
    id: "mml",
    version: "2.7.5",
    directory: MathJax.ElementJax.directory + "/mml",
    extensionDir: MathJax.ElementJax.extensionDir + "/mml",
    optableDir: MathJax.ElementJax.directory + "/mml/optable"
  }
);
MathJax.ElementJax.mml.Augment(
  {
    Init: function() {
      if (arguments.length === 1 && arguments[0].type === "math") {
        this.root = arguments[0];
      } else {
        this.root = MathJax.ElementJax.mml.math.apply(this, arguments);
      }
      if (this.root.attr && this.root.attr.mode) {
        if (!this.root.display && this.root.attr.mode === "display") {
          this.root.display = "block";
          this.root.attrNames.push("display");
        }
        delete this.root.attr.mode;
        for (var b = 0, a = this.root.attrNames.length; b < a; b++) {
          if (this.root.attrNames[b] === "mode") {
            this.root.attrNames.splice(b, 1);
            break;
          }
        }
      }
    }
  },
  {
    INHERIT: "_inherit_",
    AUTO: "_auto_",
    SIZE: {
      INFINITY: "infinity",
      SMALL: "small",
      NORMAL: "normal",
      BIG: "big"
    },
    COLOR: { TRANSPARENT: "transparent" },
    VARIANT: {
      NORMAL: "normal",
      BOLD: "bold",
      ITALIC: "italic",
      BOLDITALIC: "bold-italic",
      DOUBLESTRUCK: "double-struck",
      FRAKTUR: "fraktur",
      BOLDFRAKTUR: "bold-fraktur",
      SCRIPT: "script",
      BOLDSCRIPT: "bold-script",
      SANSSERIF: "sans-serif",
      BOLDSANSSERIF: "bold-sans-serif",
      SANSSERIFITALIC: "sans-serif-italic",
      SANSSERIFBOLDITALIC: "sans-serif-bold-italic",
      MONOSPACE: "monospace",
      INITIAL: "initial",
      TAILED: "tailed",
      LOOPED: "looped",
      STRETCHED: "stretched",
      CALIGRAPHIC: "-tex-caligraphic",
      OLDSTYLE: "-tex-oldstyle"
    },
    FORM: { PREFIX: "prefix", INFIX: "infix", POSTFIX: "postfix" },
    LINEBREAK: {
      AUTO: "auto",
      NEWLINE: "newline",
      NOBREAK: "nobreak",
      GOODBREAK: "goodbreak",
      BADBREAK: "badbreak"
    },
    LINEBREAKSTYLE: {
      BEFORE: "before",
      AFTER: "after",
      DUPLICATE: "duplicate",
      INFIXLINBREAKSTYLE: "infixlinebreakstyle"
    },
    INDENTALIGN: {
      LEFT: "left",
      CENTER: "center",
      RIGHT: "right",
      AUTO: "auto",
      ID: "id",
      INDENTALIGN: "indentalign"
    },
    INDENTSHIFT: { INDENTSHIFT: "indentshift" },
    LINETHICKNESS: { THIN: "thin", MEDIUM: "medium", THICK: "thick" },
    NOTATION: {
      LONGDIV: "longdiv",
      ACTUARIAL: "actuarial",
      RADICAL: "radical",
      BOX: "box",
      ROUNDEDBOX: "roundedbox",
      CIRCLE: "circle",
      LEFT: "left",
      RIGHT: "right",
      TOP: "top",
      BOTTOM: "bottom",
      UPDIAGONALSTRIKE: "updiagonalstrike",
      DOWNDIAGONALSTRIKE: "downdiagonalstrike",
      UPDIAGONALARROW: "updiagonalarrow",
      VERTICALSTRIKE: "verticalstrike",
      HORIZONTALSTRIKE: "horizontalstrike",
      PHASORANGLE: "phasorangle",
      MADRUWB: "madruwb"
    },
    ALIGN: {
      TOP: "top",
      BOTTOM: "bottom",
      CENTER: "center",
      BASELINE: "baseline",
      AXIS: "axis",
      LEFT: "left",
      RIGHT: "right"
    },
    LINES: { NONE: "none", SOLID: "solid", DASHED: "dashed" },
    SIDE: {
      LEFT: "left",
      RIGHT: "right",
      LEFTOVERLAP: "leftoverlap",
      RIGHTOVERLAP: "rightoverlap"
    },
    WIDTH: { AUTO: "auto", FIT: "fit" },
    ACTIONTYPE: {
      TOGGLE: "toggle",
      STATUSLINE: "statusline",
      TOOLTIP: "tooltip",
      INPUT: "input"
    },
    LENGTH: {
      VERYVERYTHINMATHSPACE: "veryverythinmathspace",
      VERYTHINMATHSPACE: "verythinmathspace",
      THINMATHSPACE: "thinmathspace",
      MEDIUMMATHSPACE: "mediummathspace",
      THICKMATHSPACE: "thickmathspace",
      VERYTHICKMATHSPACE: "verythickmathspace",
      VERYVERYTHICKMATHSPACE: "veryverythickmathspace",
      NEGATIVEVERYVERYTHINMATHSPACE: "negativeveryverythinmathspace",
      NEGATIVEVERYTHINMATHSPACE: "negativeverythinmathspace",
      NEGATIVETHINMATHSPACE: "negativethinmathspace",
      NEGATIVEMEDIUMMATHSPACE: "negativemediummathspace",
      NEGATIVETHICKMATHSPACE: "negativethickmathspace",
      NEGATIVEVERYTHICKMATHSPACE: "negativeverythickmathspace",
      NEGATIVEVERYVERYTHICKMATHSPACE: "negativeveryverythickmathspace"
    },
    OVERFLOW: {
      LINBREAK: "linebreak",
      SCROLL: "scroll",
      ELIDE: "elide",
      TRUNCATE: "truncate",
      SCALE: "scale"
    },
    UNIT: {
      EM: "em",
      EX: "ex",
      PX: "px",
      IN: "in",
      CM: "cm",
      MM: "mm",
      PT: "pt",
      PC: "pc"
    },
    TEXCLASS: {
      ORD: 0,
      OP: 1,
      BIN: 2,
      REL: 3,
      OPEN: 4,
      CLOSE: 5,
      PUNCT: 6,
      INNER: 7,
      VCENTER: 8,
      NONE: -1
    },
    TEXCLASSNAMES: [
      "ORD",
      "OP",
      "BIN",
      "REL",
      "OPEN",
      "CLOSE",
      "PUNCT",
      "INNER",
      "VCENTER"
    ],
    skipAttributes: { texClass: true, useHeight: true, texprimestyle: true },
    copyAttributes: {
      displaystyle: 1,
      scriptlevel: 1,
      open: 1,
      close: 1,
      form: 1,
      actiontype: 1,
      fontfamily: true,
      fontsize: true,
      fontweight: true,
      fontstyle: true,
      color: true,
      background: true,
      id: true,
      class: 1,
      href: true,
      style: true
    },
    copyAttributeNames: [
      "displaystyle",
      "scriptlevel",
      "open",
      "close",
      "form",
      "actiontype",
      "fontfamily",
      "fontsize",
      "fontweight",
      "fontstyle",
      "color",
      "background",
      "id",
      "class",
      "href",
      "style"
    ],
    nocopyAttributes: {
      fontfamily: true,
      fontsize: true,
      fontweight: true,
      fontstyle: true,
      color: true,
      background: true,
      id: true,
      class: true,
      href: true,
      style: true,
      xmlns: true
    },
    Error: function(d, e) {
      var c = this.merror(d),
        b = MathJax.Localization.fontDirection(),
        a = MathJax.Localization.fontFamily();
      if (e) {
        c = c.With(e);
      }
      if (b || a) {
        c = this.mstyle(c);
        if (b) {
          c.dir = b;
        }
        if (a) {
          c.style.fontFamily = "font-family: " + a;
        }
      }
      return c;
    }
  }
);
(function(a) {
  a.mbase = MathJax.Object.Subclass(
    {
      type: "base",
      isToken: false,
      defaults: {
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        dir: a.INHERIT
      },
      noInherit: {},
      noInheritAttribute: { texClass: true },
      getRemoved: {},
      linebreakContainer: false,
      Init: function() {
        this.data = [];
        if (
          this.inferRow &&
          !(arguments.length === 1 && arguments[0].inferred)
        ) {
          this.Append(a.mrow().With({ inferred: true, notParent: true }));
        }
        this.Append.apply(this, arguments);
      },
      With: function(e) {
        for (var f in e) {
          if (e.hasOwnProperty(f)) {
            this[f] = e[f];
          }
        }
        return this;
      },
      Append: function() {
        if (this.inferRow && this.data.length) {
          this.data[0].Append.apply(this.data[0], arguments);
        } else {
          for (var f = 0, e = arguments.length; f < e; f++) {
            this.SetData(this.data.length, arguments[f]);
          }
        }
      },
      SetData: function(e, f) {
        if (f != null) {
          if (!(f instanceof a.mbase)) {
            f = this.isToken || this.isChars ? a.chars(f) : a.mtext(f);
          }
          f.parent = this;
          f.setInherit(this.inheritFromMe ? this : this.inherit);
        }
        this.data[e] = f;
      },
      Parent: function() {
        var e = this.parent;
        while (e && e.notParent) {
          e = e.parent;
        }
        return e;
      },
      Get: function(f, k, l) {
        if (!l) {
          if (this[f] != null) {
            return this[f];
          }
          if (this.attr && this.attr[f] != null) {
            return this.attr[f];
          }
        }
        var g = this.Parent();
        if (g && g["adjustChild_" + f] != null) {
          return g["adjustChild_" + f](this.childPosition(), k);
        }
        var j = this.inherit;
        var e = j;
        while (j) {
          var i = j[f];
          if (i == null && j.attr) {
            i = j.attr[f];
          }
          if (j.removedStyles && j.getRemoved[f] && i == null) {
            i = j.removedStyles[j.getRemoved[f]];
          }
          if (i != null && j.noInheritAttribute && !j.noInheritAttribute[f]) {
            var h = j.noInherit[this.type];
            if (!(h && h[f])) {
              return i;
            }
          }
          e = j;
          j = j.inherit;
        }
        if (!k) {
          if (this.defaults[f] === a.AUTO) {
            return this.autoDefault(f);
          }
          if (this.defaults[f] !== a.INHERIT && this.defaults[f] != null) {
            return this.defaults[f];
          }
          if (e) {
            return e.defaults[f];
          }
        }
        return null;
      },
      hasValue: function(e) {
        return this.Get(e, true) != null;
      },
      getValues: function() {
        var f = {};
        for (var g = 0, e = arguments.length; g < e; g++) {
          f[arguments[g]] = this.Get(arguments[g]);
        }
        return f;
      },
      adjustChild_scriptlevel: function(f, e) {
        return this.Get("scriptlevel", e);
      },
      adjustChild_displaystyle: function(f, e) {
        return this.Get("displaystyle", e);
      },
      adjustChild_texprimestyle: function(f, e) {
        return this.Get("texprimestyle", e);
      },
      hasMMLspacing: function() {
        return false;
      },
      childPosition: function() {
        var h = this,
          g = h.parent;
        while (g.notParent) {
          h = g;
          g = h.parent;
        }
        for (var f = 0, e = g.data.length; f < e; f++) {
          if (g.data[f] === h) {
            return f;
          }
        }
        return null;
      },
      setInherit: function(g) {
        if (g !== this.inherit && this.inherit == null) {
          this.inherit = g;
          for (var f = 0, e = this.data.length; f < e; f++) {
            if (this.data[f] && this.data[f].setInherit) {
              this.data[f].setInherit(g);
            }
          }
        }
      },
      setTeXclass: function(e) {
        this.getPrevClass(e);
        return typeof this.texClass !== "undefined" ? this : e;
      },
      getPrevClass: function(e) {
        if (e) {
          this.prevClass = e.Get("texClass");
          this.prevLevel = e.Get("scriptlevel");
        }
      },
      updateTeXclass: function(e) {
        if (e) {
          this.prevClass = e.prevClass;
          delete e.prevClass;
          this.prevLevel = e.prevLevel;
          delete e.prevLevel;
          this.texClass = e.Get("texClass");
        }
      },
      texSpacing: function() {
        var f = this.prevClass != null ? this.prevClass : a.TEXCLASS.NONE;
        var e = this.Get("texClass") || a.TEXCLASS.ORD;
        if (f === a.TEXCLASS.NONE || e === a.TEXCLASS.NONE) {
          return "";
        }
        if (f === a.TEXCLASS.VCENTER) {
          f = a.TEXCLASS.ORD;
        }
        if (e === a.TEXCLASS.VCENTER) {
          e = a.TEXCLASS.ORD;
        }
        var g = this.TEXSPACE[f][e];
        if ((this.prevLevel > 0 || this.Get("scriptlevel") > 0) && g >= 0) {
          return "";
        }
        return this.TEXSPACELENGTH[Math.abs(g)];
      },
      TEXSPACELENGTH: [
        "",
        a.LENGTH.THINMATHSPACE,
        a.LENGTH.MEDIUMMATHSPACE,
        a.LENGTH.THICKMATHSPACE
      ],
      TEXSPACE: [
        [0, -1, 2, 3, 0, 0, 0, 1],
        [-1, -1, 0, 3, 0, 0, 0, 1],
        [2, 2, 0, 0, 2, 0, 0, 2],
        [3, 3, 0, 0, 3, 0, 0, 3],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, -1, 2, 3, 0, 0, 0, 1],
        [1, 1, 0, 1, 1, 1, 1, 1],
        [1, -1, 2, 3, 1, 0, 1, 1]
      ],
      autoDefault: function(e) {
        return "";
      },
      isSpacelike: function() {
        return false;
      },
      isEmbellished: function() {
        return false;
      },
      Core: function() {
        return this;
      },
      CoreMO: function() {
        return this;
      },
      childIndex: function(g) {
        if (g == null) {
          return;
        }
        for (var f = 0, e = this.data.length; f < e; f++) {
          if (g === this.data[f]) {
            return f;
          }
        }
      },
      CoreIndex: function() {
        return (this.inferRow ? this.data[0] || this : this).childIndex(
          this.Core()
        );
      },
      hasNewline: function() {
        if (this.isEmbellished()) {
          return this.CoreMO().hasNewline();
        }
        if (this.isToken || this.linebreakContainer) {
          return false;
        }
        for (var f = 0, e = this.data.length; f < e; f++) {
          if (this.data[f] && this.data[f].hasNewline()) {
            return true;
          }
        }
        return false;
      },
      array: function() {
        if (this.inferred) {
          return this.data;
        } else {
          return [this];
        }
      },
      toString: function() {
        return this.type + "(" + this.data.join(",") + ")";
      },
      getAnnotation: function() {
        return null;
      }
    },
    {
      childrenSpacelike: function() {
        for (var f = 0, e = this.data.length; f < e; f++) {
          if (!this.data[f].isSpacelike()) {
            return false;
          }
        }
        return true;
      },
      childEmbellished: function() {
        return this.data[0] && this.data[0].isEmbellished();
      },
      childCore: function() {
        return this.inferRow && this.data[0]
          ? this.data[0].Core()
          : this.data[0];
      },
      childCoreMO: function() {
        return this.data[0] ? this.data[0].CoreMO() : null;
      },
      setChildTeXclass: function(e) {
        if (this.data[0]) {
          e = this.data[0].setTeXclass(e);
          this.updateTeXclass(this.data[0]);
        }
        return e;
      },
      setBaseTeXclasses: function(g) {
        this.getPrevClass(g);
        this.texClass = null;
        if (this.data[0]) {
          if (this.isEmbellished() || this.data[0].isa(a.mi)) {
            g = this.data[0].setTeXclass(g);
            this.updateTeXclass(this.Core());
          } else {
            this.data[0].setTeXclass();
            g = this;
          }
        } else {
          g = this;
        }
        for (var f = 1, e = this.data.length; f < e; f++) {
          if (this.data[f]) {
            this.data[f].setTeXclass();
          }
        }
        return g;
      },
      setSeparateTeXclasses: function(g) {
        this.getPrevClass(g);
        for (var f = 0, e = this.data.length; f < e; f++) {
          if (this.data[f]) {
            this.data[f].setTeXclass();
          }
        }
        if (this.isEmbellished()) {
          this.updateTeXclass(this.Core());
        }
        return this;
      }
    }
  );
  a.mi = a.mbase.Subclass({
    type: "mi",
    isToken: true,
    texClass: a.TEXCLASS.ORD,
    defaults: {
      mathvariant: a.AUTO,
      mathsize: a.INHERIT,
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      dir: a.INHERIT
    },
    autoDefault: function(f) {
      if (f === "mathvariant") {
        var e = (this.data[0] || "").toString();
        return e.length === 1 ||
          (e.length === 2 &&
            e.charCodeAt(0) >= 55296 &&
            e.charCodeAt(0) < 56320)
          ? a.VARIANT.ITALIC
          : a.VARIANT.NORMAL;
      }
      return "";
    },
    setTeXclass: function(f) {
      this.getPrevClass(f);
      var e = this.data.join("");
      if (
        e.length > 1 &&
        e.match(/^[a-z][a-z0-9]*$/i) &&
        this.texClass === a.TEXCLASS.ORD
      ) {
        this.texClass = a.TEXCLASS.OP;
        this.autoOP = true;
      }
      return this;
    }
  });
  a.mn = a.mbase.Subclass({
    type: "mn",
    isToken: true,
    texClass: a.TEXCLASS.ORD,
    defaults: {
      mathvariant: a.INHERIT,
      mathsize: a.INHERIT,
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      dir: a.INHERIT
    }
  });
  a.mo = a.mbase.Subclass({
    type: "mo",
    isToken: true,
    defaults: {
      mathvariant: a.INHERIT,
      mathsize: a.INHERIT,
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      dir: a.INHERIT,
      form: a.AUTO,
      fence: a.AUTO,
      separator: a.AUTO,
      lspace: a.AUTO,
      rspace: a.AUTO,
      stretchy: a.AUTO,
      symmetric: a.AUTO,
      maxsize: a.AUTO,
      minsize: a.AUTO,
      largeop: a.AUTO,
      movablelimits: a.AUTO,
      accent: a.AUTO,
      linebreak: a.LINEBREAK.AUTO,
      lineleading: a.INHERIT,
      linebreakstyle: a.AUTO,
      linebreakmultchar: a.INHERIT,
      indentalign: a.INHERIT,
      indentshift: a.INHERIT,
      indenttarget: a.INHERIT,
      indentalignfirst: a.INHERIT,
      indentshiftfirst: a.INHERIT,
      indentalignlast: a.INHERIT,
      indentshiftlast: a.INHERIT,
      texClass: a.AUTO
    },
    defaultDef: {
      form: a.FORM.INFIX,
      fence: false,
      separator: false,
      lspace: a.LENGTH.THICKMATHSPACE,
      rspace: a.LENGTH.THICKMATHSPACE,
      stretchy: false,
      symmetric: false,
      maxsize: a.SIZE.INFINITY,
      minsize: "0em",
      largeop: false,
      movablelimits: false,
      accent: false,
      linebreak: a.LINEBREAK.AUTO,
      lineleading: "1ex",
      linebreakstyle: "before",
      indentalign: a.INDENTALIGN.AUTO,
      indentshift: "0",
      indenttarget: "",
      indentalignfirst: a.INDENTALIGN.INDENTALIGN,
      indentshiftfirst: a.INDENTSHIFT.INDENTSHIFT,
      indentalignlast: a.INDENTALIGN.INDENTALIGN,
      indentshiftlast: a.INDENTSHIFT.INDENTSHIFT,
      texClass: a.TEXCLASS.REL
    },
    SPACE_ATTR: { lspace: 1, rspace: 2 },
    useMMLspacing: 3,
    hasMMLspacing: function() {
      if (this.useMMLspacing) {
        return true;
      }
      return this.form && (this.OPTABLE[this.form] || {})[this.data.join("")];
    },
    autoDefault: function(g, n) {
      var l = this.def;
      if (!l) {
        if (g === "form") {
          return this.getForm();
        }
        var k = this.data.join("");
        var f = [this.Get("form"), a.FORM.INFIX, a.FORM.POSTFIX, a.FORM.PREFIX];
        for (var h = 0, e = f.length; h < e; h++) {
          var j = this.OPTABLE[f[h]][k];
          if (j) {
            l = this.makeDef(j);
            break;
          }
        }
        if (!l) {
          l = this.CheckRange(k);
        }
        if (!l && n) {
          l = {};
        } else {
          if (!l) {
            l = MathJax.Hub.Insert({}, this.defaultDef);
          }
          if (this.parent) {
            this.def = l;
          } else {
            l = MathJax.Hub.Insert({}, l);
          }
          l.form = f[0];
        }
      }
      this.useMMLspacing &= ~(this.SPACE_ATTR[g] || 0);
      if (l[g] != null) {
        return l[g];
      } else {
        if (!n) {
          return this.defaultDef[g];
        }
      }
      return "";
    },
    CheckRange: function(j) {
      var k = j.charCodeAt(0);
      if (k >= 55296 && k < 56320) {
        k = ((k - 55296) << 10) + (j.charCodeAt(1) - 56320) + 65536;
      }
      for (
        var g = 0, e = this.RANGES.length;
        g < e && this.RANGES[g][0] <= k;
        g++
      ) {
        if (k <= this.RANGES[g][1]) {
          if (this.RANGES[g][3]) {
            var f = a.optableDir + "/" + this.RANGES[g][3] + ".js";
            this.RANGES[g][3] = null;
            MathJax.Hub.RestartAfter(MathJax.Ajax.Require(f));
          }
          var h = a.TEXCLASSNAMES[this.RANGES[g][2]];
          h = this.OPTABLE.infix[j] = a.mo.OPTYPES[h === "BIN" ? "BIN3" : h];
          return this.makeDef(h);
        }
      }
      return null;
    },
    makeDef: function(f) {
      if (f[2] == null) {
        f[2] = this.defaultDef.texClass;
      }
      if (!f[3]) {
        f[3] = {};
      }
      var e = MathJax.Hub.Insert({}, f[3]);
      e.lspace = this.SPACE[f[0]];
      e.rspace = this.SPACE[f[1]];
      e.texClass = f[2];
      if (
        e.texClass === a.TEXCLASS.REL &&
        (this.movablelimits || this.data.join("").match(/^[a-z]+$/i))
      ) {
        e.texClass = a.TEXCLASS.OP;
      }
      return e;
    },
    getForm: function() {
      var e = this,
        g = this.parent,
        f = this.Parent();
      while (f && f.isEmbellished()) {
        e = g;
        g = f.parent;
        f = f.Parent();
      }
      if (g && g.type === "mrow" && g.NonSpaceLength() !== 1) {
        if (g.FirstNonSpace() === e) {
          return a.FORM.PREFIX;
        }
        if (g.LastNonSpace() === e) {
          return a.FORM.POSTFIX;
        }
      }
      return a.FORM.INFIX;
    },
    isEmbellished: function() {
      return true;
    },
    hasNewline: function() {
      return this.Get("linebreak") === a.LINEBREAK.NEWLINE;
    },
    CoreParent: function() {
      var e = this;
      while (e && e.isEmbellished() && e.CoreMO() === this && !e.isa(a.math)) {
        e = e.Parent();
      }
      return e;
    },
    CoreText: function(e) {
      if (!e) {
        return "";
      }
      if (e.isEmbellished()) {
        return e.CoreMO().data.join("");
      }
      while (
        (((e.isa(a.mrow) ||
          e.isa(a.TeXAtom) ||
          e.isa(a.mstyle) ||
          e.isa(a.mphantom)) &&
          e.data.length === 1) ||
          e.isa(a.munderover)) &&
        e.data[0]
      ) {
        e = e.data[0];
      }
      if (!e.isToken) {
        return "";
      } else {
        return e.data.join("");
      }
    },
    remapChars: {
      "*": "\u2217",
      '"': "\u2033",
      "\u00B0": "\u2218",
      "\u00B2": "2",
      "\u00B3": "3",
      "\u00B4": "\u2032",
      "\u00B9": "1"
    },
    remap: function(f, e) {
      f = f.replace(/-/g, "\u2212");
      if (e) {
        f = f.replace(/'/g, "\u2032").replace(/`/g, "\u2035");
        if (f.length === 1) {
          f = e[f] || f;
        }
      }
      return f;
    },
    setTeXclass: function(f) {
      var e = this.getValues("form", "lspace", "rspace", "fence");
      if (this.hasMMLspacing()) {
        this.texClass = a.TEXCLASS.NONE;
        return this;
      }
      if (e.fence && !this.texClass) {
        if (e.form === a.FORM.PREFIX) {
          this.texClass = a.TEXCLASS.OPEN;
        }
        if (e.form === a.FORM.POSTFIX) {
          this.texClass = a.TEXCLASS.CLOSE;
        }
      }
      this.texClass = this.Get("texClass");
      if (this.data.join("") === "\u2061") {
        if (f) {
          f.texClass = a.TEXCLASS.OP;
          f.fnOP = true;
        }
        this.texClass = this.prevClass = a.TEXCLASS.NONE;
        return f;
      }
      return this.adjustTeXclass(f);
    },
    adjustTeXclass: function(f) {
      if (this.texClass === a.TEXCLASS.NONE) {
        return f;
      }
      if (f) {
        if (
          f.autoOP &&
          (this.texClass === a.TEXCLASS.BIN || this.texClass === a.TEXCLASS.REL)
        ) {
          f.texClass = a.TEXCLASS.ORD;
        }
        this.prevClass = f.texClass || a.TEXCLASS.ORD;
        this.prevLevel = f.Get("scriptlevel");
      } else {
        this.prevClass = a.TEXCLASS.NONE;
      }
      if (
        this.texClass === a.TEXCLASS.BIN &&
        (this.prevClass === a.TEXCLASS.NONE ||
          this.prevClass === a.TEXCLASS.BIN ||
          this.prevClass === a.TEXCLASS.OP ||
          this.prevClass === a.TEXCLASS.REL ||
          this.prevClass === a.TEXCLASS.OPEN ||
          this.prevClass === a.TEXCLASS.PUNCT)
      ) {
        this.texClass = a.TEXCLASS.ORD;
      } else {
        if (
          this.prevClass === a.TEXCLASS.BIN &&
          (this.texClass === a.TEXCLASS.REL ||
            this.texClass === a.TEXCLASS.CLOSE ||
            this.texClass === a.TEXCLASS.PUNCT)
        ) {
          f.texClass = this.prevClass = a.TEXCLASS.ORD;
        } else {
          if (this.texClass === a.TEXCLASS.BIN) {
            var g = this,
              e = this.parent;
            while (
              e &&
              e.parent &&
              e.isEmbellished() &&
              (e.data.length === 1 || (e.type !== "mrow" && e.Core() === g))
            ) {
              g = e;
              e = e.parent;
            }
            if (e.data[e.data.length - 1] === g) {
              this.texClass = a.TEXCLASS.ORD;
            }
          }
        }
      }
      return this;
    }
  });
  a.mtext = a.mbase.Subclass({
    type: "mtext",
    isToken: true,
    isSpacelike: function() {
      return true;
    },
    texClass: a.TEXCLASS.ORD,
    defaults: {
      mathvariant: a.INHERIT,
      mathsize: a.INHERIT,
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      dir: a.INHERIT
    }
  });
  a.mspace = a.mbase.Subclass({
    type: "mspace",
    isToken: true,
    isSpacelike: function() {
      return true;
    },
    defaults: {
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      width: "0em",
      height: "0ex",
      depth: "0ex",
      linebreak: a.LINEBREAK.AUTO
    },
    hasDimAttr: function() {
      return (
        this.hasValue("width") ||
        this.hasValue("height") ||
        this.hasValue("depth")
      );
    },
    hasNewline: function() {
      return (
        !this.hasDimAttr() && this.Get("linebreak") === a.LINEBREAK.NEWLINE
      );
    }
  });
  a.ms = a.mbase.Subclass({
    type: "ms",
    isToken: true,
    texClass: a.TEXCLASS.ORD,
    defaults: {
      mathvariant: a.INHERIT,
      mathsize: a.INHERIT,
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      dir: a.INHERIT,
      lquote: '"',
      rquote: '"'
    }
  });
  a.mglyph = a.mbase.Subclass({
    type: "mglyph",
    isToken: true,
    texClass: a.TEXCLASS.ORD,
    defaults: {
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      alt: "",
      src: "",
      width: a.AUTO,
      height: a.AUTO,
      valign: "0em"
    }
  });
  a.mrow = a.mbase.Subclass({
    type: "mrow",
    isSpacelike: a.mbase.childrenSpacelike,
    inferred: false,
    notParent: false,
    isEmbellished: function() {
      var f = false;
      for (var g = 0, e = this.data.length; g < e; g++) {
        if (this.data[g] == null) {
          continue;
        }
        if (this.data[g].isEmbellished()) {
          if (f) {
            return false;
          }
          f = true;
          this.core = g;
        } else {
          if (!this.data[g].isSpacelike()) {
            return false;
          }
        }
      }
      return f;
    },
    NonSpaceLength: function() {
      var g = 0;
      for (var f = 0, e = this.data.length; f < e; f++) {
        if (this.data[f] && !this.data[f].isSpacelike()) {
          g++;
        }
      }
      return g;
    },
    FirstNonSpace: function() {
      for (var f = 0, e = this.data.length; f < e; f++) {
        if (this.data[f] && !this.data[f].isSpacelike()) {
          return this.data[f];
        }
      }
      return null;
    },
    LastNonSpace: function() {
      for (var e = this.data.length - 1; e >= 0; e--) {
        if (this.data[0] && !this.data[e].isSpacelike()) {
          return this.data[e];
        }
      }
      return null;
    },
    Core: function() {
      if (!this.isEmbellished() || typeof this.core === "undefined") {
        return this;
      }
      return this.data[this.core];
    },
    CoreMO: function() {
      if (!this.isEmbellished() || typeof this.core === "undefined") {
        return this;
      }
      return this.data[this.core].CoreMO();
    },
    toString: function() {
      if (this.inferred) {
        return "[" + this.data.join(",") + "]";
      }
      return this.SUPER(arguments).toString.call(this);
    },
    setTeXclass: function(g) {
      var f,
        e = this.data.length;
      if ((this.open || this.close) && (!g || !g.fnOP)) {
        this.getPrevClass(g);
        g = null;
        for (f = 0; f < e; f++) {
          if (this.data[f]) {
            g = this.data[f].setTeXclass(g);
          }
        }
        if (!this.hasOwnProperty("texClass")) {
          this.texClass = a.TEXCLASS.INNER;
        }
        return this;
      } else {
        for (f = 0; f < e; f++) {
          if (this.data[f]) {
            g = this.data[f].setTeXclass(g);
          }
        }
        if (this.data[0]) {
          this.updateTeXclass(this.data[0]);
        }
        return g;
      }
    },
    getAnnotation: function(e) {
      if (this.data.length != 1) {
        return null;
      }
      return this.data[0].getAnnotation(e);
    }
  });
  a.mfrac = a.mbase.Subclass({
    type: "mfrac",
    num: 0,
    den: 1,
    linebreakContainer: true,
    isEmbellished: a.mbase.childEmbellished,
    Core: a.mbase.childCore,
    CoreMO: a.mbase.childCoreMO,
    defaults: {
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      linethickness: a.LINETHICKNESS.MEDIUM,
      numalign: a.ALIGN.CENTER,
      denomalign: a.ALIGN.CENTER,
      bevelled: false
    },
    adjustChild_displaystyle: function(e) {
      return false;
    },
    adjustChild_scriptlevel: function(f) {
      var e = this.Get("scriptlevel");
      if (!this.Get("displaystyle") || e > 0) {
        e++;
      }
      return e;
    },
    adjustChild_texprimestyle: function(e) {
      if (e == this.den) {
        return true;
      }
      return this.Get("texprimestyle");
    },
    setTeXclass: a.mbase.setSeparateTeXclasses
  });
  a.msqrt = a.mbase.Subclass({
    type: "msqrt",
    inferRow: true,
    linebreakContainer: true,
    texClass: a.TEXCLASS.ORD,
    setTeXclass: a.mbase.setSeparateTeXclasses,
    adjustChild_texprimestyle: function(e) {
      return true;
    }
  });
  a.mroot = a.mbase.Subclass({
    type: "mroot",
    linebreakContainer: true,
    texClass: a.TEXCLASS.ORD,
    adjustChild_displaystyle: function(e) {
      if (e === 1) {
        return false;
      }
      return this.Get("displaystyle");
    },
    adjustChild_scriptlevel: function(f) {
      var e = this.Get("scriptlevel");
      if (f === 1) {
        e += 2;
      }
      return e;
    },
    adjustChild_texprimestyle: function(e) {
      if (e === 0) {
        return true;
      }
      return this.Get("texprimestyle");
    },
    setTeXclass: a.mbase.setSeparateTeXclasses
  });
  a.mstyle = a.mbase.Subclass({
    type: "mstyle",
    isSpacelike: a.mbase.childrenSpacelike,
    isEmbellished: a.mbase.childEmbellished,
    Core: a.mbase.childCore,
    CoreMO: a.mbase.childCoreMO,
    inferRow: true,
    defaults: {
      scriptlevel: a.INHERIT,
      displaystyle: a.INHERIT,
      scriptsizemultiplier: Math.sqrt(1 / 2),
      scriptminsize: "8pt",
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      dir: a.INHERIT,
      infixlinebreakstyle: a.LINEBREAKSTYLE.BEFORE,
      decimalseparator: "."
    },
    adjustChild_scriptlevel: function(g) {
      var f = this.scriptlevel;
      if (f == null) {
        f = this.Get("scriptlevel");
      } else {
        if (String(f).match(/^ *[-+]/)) {
          var e = this.Get("scriptlevel", null, true);
          f = e + parseInt(f);
        }
      }
      return f;
    },
    inheritFromMe: true,
    noInherit: {
      mpadded: {
        width: true,
        height: true,
        depth: true,
        lspace: true,
        voffset: true
      },
      mtable: { width: true, height: true, depth: true, align: true }
    },
    getRemoved: {
      fontfamily: "fontFamily",
      fontweight: "fontWeight",
      fontstyle: "fontStyle",
      fontsize: "fontSize"
    },
    setTeXclass: a.mbase.setChildTeXclass
  });
  a.merror = a.mbase.Subclass({
    type: "merror",
    inferRow: true,
    linebreakContainer: true,
    texClass: a.TEXCLASS.ORD
  });
  a.mpadded = a.mbase.Subclass({
    type: "mpadded",
    inferRow: true,
    isSpacelike: a.mbase.childrenSpacelike,
    isEmbellished: a.mbase.childEmbellished,
    Core: a.mbase.childCore,
    CoreMO: a.mbase.childCoreMO,
    defaults: {
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      width: "",
      height: "",
      depth: "",
      lspace: 0,
      voffset: 0
    },
    setTeXclass: a.mbase.setChildTeXclass
  });
  a.mphantom = a.mbase.Subclass({
    type: "mphantom",
    texClass: a.TEXCLASS.ORD,
    inferRow: true,
    isSpacelike: a.mbase.childrenSpacelike,
    isEmbellished: a.mbase.childEmbellished,
    Core: a.mbase.childCore,
    CoreMO: a.mbase.childCoreMO,
    setTeXclass: a.mbase.setChildTeXclass
  });
  a.mfenced = a.mbase.Subclass({
    type: "mfenced",
    defaults: {
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      open: "(",
      close: ")",
      separators: ","
    },
    addFakeNodes: function() {
      var f = this.getValues("open", "close", "separators");
      f.open = f.open.replace(/[ \t\n\r]/g, "");
      f.close = f.close.replace(/[ \t\n\r]/g, "");
      f.separators = f.separators.replace(/[ \t\n\r]/g, "");
      if (f.open !== "") {
        this.SetData(
          "open",
          a
            .mo(f.open)
            .With({
              fence: true,
              form: a.FORM.PREFIX,
              texClass: a.TEXCLASS.OPEN
            })
        );
      }
      if (f.separators !== "") {
        while (f.separators.length < this.data.length) {
          f.separators += f.separators.charAt(f.separators.length - 1);
        }
        for (var g = 1, e = this.data.length; g < e; g++) {
          if (this.data[g]) {
            this.SetData(
              "sep" + g,
              a.mo(f.separators.charAt(g - 1)).With({ separator: true })
            );
          }
        }
      }
      if (f.close !== "") {
        this.SetData(
          "close",
          a
            .mo(f.close)
            .With({
              fence: true,
              form: a.FORM.POSTFIX,
              texClass: a.TEXCLASS.CLOSE
            })
        );
      }
    },
    texClass: a.TEXCLASS.OPEN,
    setTeXclass: function(g) {
      this.addFakeNodes();
      this.getPrevClass(g);
      if (this.data.open) {
        g = this.data.open.setTeXclass(g);
      }
      if (this.data[0]) {
        g = this.data[0].setTeXclass(g);
      }
      for (var f = 1, e = this.data.length; f < e; f++) {
        if (this.data["sep" + f]) {
          g = this.data["sep" + f].setTeXclass(g);
        }
        if (this.data[f]) {
          g = this.data[f].setTeXclass(g);
        }
      }
      if (this.data.close) {
        g = this.data.close.setTeXclass(g);
      }
      this.updateTeXclass(this.data.open);
      this.texClass = a.TEXCLASS.INNER;
      return g;
    }
  });
  a.menclose = a.mbase.Subclass({
    type: "menclose",
    inferRow: true,
    linebreakContainer: true,
    defaults: {
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      notation: a.NOTATION.LONGDIV,
      texClass: a.TEXCLASS.ORD
    },
    setTeXclass: a.mbase.setSeparateTeXclasses
  });
  a.msubsup = a.mbase.Subclass({
    type: "msubsup",
    base: 0,
    sub: 1,
    sup: 2,
    isEmbellished: a.mbase.childEmbellished,
    Core: a.mbase.childCore,
    CoreMO: a.mbase.childCoreMO,
    defaults: {
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      subscriptshift: "",
      superscriptshift: "",
      texClass: a.AUTO
    },
    autoDefault: function(e) {
      if (e === "texClass") {
        return this.isEmbellished() ? this.CoreMO().Get(e) : a.TEXCLASS.ORD;
      }
      return 0;
    },
    adjustChild_displaystyle: function(e) {
      if (e > 0) {
        return false;
      }
      return this.Get("displaystyle");
    },
    adjustChild_scriptlevel: function(f) {
      var e = this.Get("scriptlevel");
      if (f > 0) {
        e++;
      }
      return e;
    },
    adjustChild_texprimestyle: function(e) {
      if (e === this.sub) {
        return true;
      }
      return this.Get("texprimestyle");
    },
    setTeXclass: a.mbase.setBaseTeXclasses
  });
  a.msub = a.msubsup.Subclass({ type: "msub" });
  a.msup = a.msubsup.Subclass({ type: "msup", sub: 2, sup: 1 });
  a.mmultiscripts = a.msubsup.Subclass({
    type: "mmultiscripts",
    adjustChild_texprimestyle: function(e) {
      if (e % 2 === 1) {
        return true;
      }
      return this.Get("texprimestyle");
    }
  });
  a.mprescripts = a.mbase.Subclass({ type: "mprescripts" });
  a.none = a.mbase.Subclass({ type: "none" });
  a.munderover = a.mbase.Subclass({
    type: "munderover",
    base: 0,
    under: 1,
    over: 2,
    sub: 1,
    sup: 2,
    ACCENTS: ["", "accentunder", "accent"],
    linebreakContainer: true,
    isEmbellished: a.mbase.childEmbellished,
    Core: a.mbase.childCore,
    CoreMO: a.mbase.childCoreMO,
    defaults: {
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      accent: a.AUTO,
      accentunder: a.AUTO,
      align: a.ALIGN.CENTER,
      texClass: a.AUTO,
      subscriptshift: "",
      superscriptshift: ""
    },
    autoDefault: function(e) {
      if (e === "texClass") {
        return this.isEmbellished() ? this.CoreMO().Get(e) : a.TEXCLASS.ORD;
      }
      if (e === "accent" && this.data[this.over]) {
        return this.data[this.over].CoreMO().Get("accent");
      }
      if (e === "accentunder" && this.data[this.under]) {
        return this.data[this.under].CoreMO().Get("accent");
      }
      return false;
    },
    adjustChild_displaystyle: function(e) {
      if (e > 0) {
        return false;
      }
      return this.Get("displaystyle");
    },
    adjustChild_scriptlevel: function(g) {
      var f = this.Get("scriptlevel");
      var e =
        this.data[this.base] &&
        !this.Get("displaystyle") &&
        this.data[this.base].CoreMO().Get("movablelimits");
      if (g == this.under && (e || !this.Get("accentunder"))) {
        f++;
      }
      if (g == this.over && (e || !this.Get("accent"))) {
        f++;
      }
      return f;
    },
    adjustChild_texprimestyle: function(e) {
      if (e === this.base && this.data[this.over]) {
        return true;
      }
      return this.Get("texprimestyle");
    },
    setTeXclass: a.mbase.setBaseTeXclasses
  });
  a.munder = a.munderover.Subclass({ type: "munder" });
  a.mover = a.munderover.Subclass({
    type: "mover",
    over: 1,
    under: 2,
    sup: 1,
    sub: 2,
    ACCENTS: ["", "accent", "accentunder"]
  });
  a.mtable = a.mbase.Subclass({
    type: "mtable",
    defaults: {
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      align: a.ALIGN.AXIS,
      rowalign: a.ALIGN.BASELINE,
      columnalign: a.ALIGN.CENTER,
      groupalign: "{left}",
      alignmentscope: true,
      columnwidth: a.WIDTH.AUTO,
      width: a.WIDTH.AUTO,
      rowspacing: "1ex",
      columnspacing: ".8em",
      rowlines: a.LINES.NONE,
      columnlines: a.LINES.NONE,
      frame: a.LINES.NONE,
      framespacing: "0.4em 0.5ex",
      equalrows: false,
      equalcolumns: false,
      displaystyle: false,
      side: a.SIDE.RIGHT,
      minlabelspacing: "0.8em",
      texClass: a.TEXCLASS.ORD,
      useHeight: 1
    },
    adjustChild_displaystyle: function() {
      return this.displaystyle != null
        ? this.displaystyle
        : this.defaults.displaystyle;
    },
    inheritFromMe: true,
    noInherit: {
      mover: { align: true },
      munder: { align: true },
      munderover: { align: true },
      mtable: {
        align: true,
        rowalign: true,
        columnalign: true,
        groupalign: true,
        alignmentscope: true,
        columnwidth: true,
        width: true,
        rowspacing: true,
        columnspacing: true,
        rowlines: true,
        columnlines: true,
        frame: true,
        framespacing: true,
        equalrows: true,
        equalcolumns: true,
        displaystyle: true,
        side: true,
        minlabelspacing: true,
        texClass: true,
        useHeight: 1
      }
    },
    linebreakContainer: true,
    Append: function() {
      for (var f = 0, e = arguments.length; f < e; f++) {
        if (
          !(
            arguments[f] instanceof a.mtr ||
            arguments[f] instanceof a.mlabeledtr
          )
        ) {
          arguments[f] = a.mtr(arguments[f]);
        }
      }
      this.SUPER(arguments).Append.apply(this, arguments);
    },
    setTeXclass: a.mbase.setSeparateTeXclasses
  });
  a.mtr = a.mbase.Subclass({
    type: "mtr",
    defaults: {
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      rowalign: a.INHERIT,
      columnalign: a.INHERIT,
      groupalign: a.INHERIT
    },
    inheritFromMe: true,
    noInherit: {
      mrow: { rowalign: true, columnalign: true, groupalign: true },
      mtable: { rowalign: true, columnalign: true, groupalign: true }
    },
    linebreakContainer: true,
    Append: function() {
      for (var f = 0, e = arguments.length; f < e; f++) {
        if (!(arguments[f] instanceof a.mtd)) {
          arguments[f] = a.mtd(arguments[f]);
        }
      }
      this.SUPER(arguments).Append.apply(this, arguments);
    },
    setTeXclass: a.mbase.setSeparateTeXclasses
  });
  a.mtd = a.mbase.Subclass({
    type: "mtd",
    inferRow: true,
    linebreakContainer: true,
    isEmbellished: a.mbase.childEmbellished,
    Core: a.mbase.childCore,
    CoreMO: a.mbase.childCoreMO,
    defaults: {
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      rowspan: 1,
      columnspan: 1,
      rowalign: a.INHERIT,
      columnalign: a.INHERIT,
      groupalign: a.INHERIT
    },
    setTeXclass: a.mbase.setSeparateTeXclasses
  });
  a.maligngroup = a.mbase.Subclass({
    type: "maligngroup",
    isSpacelike: function() {
      return true;
    },
    defaults: {
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      groupalign: a.INHERIT
    },
    inheritFromMe: true,
    noInherit: { mrow: { groupalign: true }, mtable: { groupalign: true } }
  });
  a.malignmark = a.mbase.Subclass({
    type: "malignmark",
    defaults: {
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      edge: a.SIDE.LEFT
    },
    isSpacelike: function() {
      return true;
    }
  });
  a.mlabeledtr = a.mtr.Subclass({ type: "mlabeledtr" });
  a.maction = a.mbase.Subclass({
    type: "maction",
    defaults: {
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      actiontype: a.ACTIONTYPE.TOGGLE,
      selection: 1
    },
    selected: function() {
      return this.data[this.Get("selection") - 1] || a.NULL;
    },
    isEmbellished: function() {
      return this.selected().isEmbellished();
    },
    isSpacelike: function() {
      return this.selected().isSpacelike();
    },
    Core: function() {
      return this.selected().Core();
    },
    CoreMO: function() {
      return this.selected().CoreMO();
    },
    setTeXclass: function(f) {
      if (this.Get("actiontype") === a.ACTIONTYPE.TOOLTIP && this.data[1]) {
        this.data[1].setTeXclass();
      }
      var e = this.selected();
      f = e.setTeXclass(f);
      this.updateTeXclass(e);
      return f;
    }
  });
  a.semantics = a.mbase.Subclass({
    type: "semantics",
    notParent: true,
    isEmbellished: a.mbase.childEmbellished,
    Core: a.mbase.childCore,
    CoreMO: a.mbase.childCoreMO,
    defaults: { definitionURL: null, encoding: null },
    setTeXclass: a.mbase.setChildTeXclass,
    getAnnotation: function(g) {
      var l = MathJax.Hub.config.MathMenu.semanticsAnnotations[g];
      if (l) {
        for (var h = 0, e = this.data.length; h < e; h++) {
          var k = this.data[h].Get("encoding");
          if (k) {
            for (var f = 0, o = l.length; f < o; f++) {
              if (l[f] === k) {
                return this.data[h];
              }
            }
          }
        }
      }
      return null;
    }
  });
  a.annotation = a.mbase.Subclass({
    type: "annotation",
    isChars: true,
    linebreakContainer: true,
    defaults: {
      definitionURL: null,
      encoding: null,
      cd: "mathmlkeys",
      name: "",
      src: null
    }
  });
  a["annotation-xml"] = a.mbase.Subclass({
    type: "annotation-xml",
    linebreakContainer: true,
    defaults: {
      definitionURL: null,
      encoding: null,
      cd: "mathmlkeys",
      name: "",
      src: null
    }
  });
  a.math = a.mstyle.Subclass({
    type: "math",
    defaults: {
      mathvariant: a.VARIANT.NORMAL,
      mathsize: a.SIZE.NORMAL,
      mathcolor: "",
      mathbackground: a.COLOR.TRANSPARENT,
      dir: "ltr",
      scriptlevel: 0,
      displaystyle: a.AUTO,
      display: "inline",
      maxwidth: "",
      overflow: a.OVERFLOW.LINEBREAK,
      altimg: "",
      "altimg-width": "",
      "altimg-height": "",
      "altimg-valign": "",
      alttext: "",
      cdgroup: "",
      scriptsizemultiplier: Math.sqrt(1 / 2),
      scriptminsize: "8px",
      infixlinebreakstyle: a.LINEBREAKSTYLE.BEFORE,
      lineleading: "1ex",
      indentshift: "auto",
      indentalign: a.INDENTALIGN.AUTO,
      indentalignfirst: a.INDENTALIGN.INDENTALIGN,
      indentshiftfirst: a.INDENTSHIFT.INDENTSHIFT,
      indentalignlast: a.INDENTALIGN.INDENTALIGN,
      indentshiftlast: a.INDENTSHIFT.INDENTSHIFT,
      decimalseparator: ".",
      texprimestyle: false
    },
    autoDefault: function(e) {
      if (e === "displaystyle") {
        return this.Get("display") === "block";
      }
      return "";
    },
    linebreakContainer: true,
    setTeXclass: a.mbase.setChildTeXclass,
    getAnnotation: function(e) {
      if (this.data.length != 1) {
        return null;
      }
      return this.data[0].getAnnotation(e);
    }
  });
  a.chars = a.mbase.Subclass({
    type: "chars",
    Append: function() {
      this.data.push.apply(this.data, arguments);
    },
    value: function() {
      return this.data.join("");
    },
    toString: function() {
      return this.data.join("");
    }
  });
  a.entity = a.mbase.Subclass({
    type: "entity",
    Append: function() {
      this.data.push.apply(this.data, arguments);
    },
    value: function() {
      if (this.data[0].substr(0, 2) === "#x") {
        return parseInt(this.data[0].substr(2), 16);
      } else {
        if (this.data[0].substr(0, 1) === "#") {
          return parseInt(this.data[0].substr(1));
        } else {
          return 0;
        }
      }
    },
    toString: function() {
      var e = this.value();
      if (e <= 65535) {
        return String.fromCharCode(e);
      }
      e -= 65536;
      return (
        String.fromCharCode((e >> 10) + 55296) +
        String.fromCharCode((e & 1023) + 56320)
      );
    }
  });
  a.xml = a.mbase.Subclass({
    type: "xml",
    Init: function() {
      this.div = document.createElement("div");
      return this.SUPER(arguments).Init.apply(this, arguments);
    },
    Append: function() {
      for (var f = 0, e = arguments.length; f < e; f++) {
        var g = this.Import(arguments[f]);
        this.data.push(g);
        this.div.appendChild(g);
      }
    },
    Import: function(j) {
      if (document.importNode) {
        return document.importNode(j, true);
      }
      var f, g, e;
      if (j.nodeType === 1) {
        f = document.createElement(j.nodeName);
        for (g = 0, e = j.attributes.length; g < e; g++) {
          var h = j.attributes[g];
          if (h.specified && h.nodeValue != null && h.nodeValue != "") {
            f.setAttribute(h.nodeName, h.nodeValue);
          }
          if (h.nodeName === "style") {
            f.style.cssText = h.nodeValue;
          }
        }
        if (j.className) {
          f.className = j.className;
        }
      } else {
        if (j.nodeType === 3 || j.nodeType === 4) {
          f = document.createTextNode(j.nodeValue);
        } else {
          if (j.nodeType === 8) {
            f = document.createComment(j.nodeValue);
          } else {
            return document.createTextNode("");
          }
        }
      }
      for (g = 0, e = j.childNodes.length; g < e; g++) {
        f.appendChild(this.Import(j.childNodes[g]));
      }
      return f;
    },
    value: function() {
      return this.div;
    },
    toString: function() {
      return this.div.innerHTML;
    }
  });
  a.TeXAtom = a.mbase.Subclass({
    type: "texatom",
    linebreakContainer: true,
    inferRow: true,
    notParent: true,
    texClass: a.TEXCLASS.ORD,
    Core: a.mbase.childCore,
    CoreMO: a.mbase.childCoreMO,
    isEmbellished: a.mbase.childEmbellished,
    setTeXclass: function(e) {
      this.data[0].setTeXclass();
      return this.adjustTeXclass(e);
    },
    adjustTeXclass: a.mo.prototype.adjustTeXclass
  });
  a.NULL = a.mbase().With({ type: "null" });
  var b = a.TEXCLASS;
  var d = {
    ORD: [0, 0, b.ORD],
    ORD11: [1, 1, b.ORD],
    ORD21: [2, 1, b.ORD],
    ORD02: [0, 2, b.ORD],
    ORD55: [5, 5, b.ORD],
    OP: [1, 2, b.OP, { largeop: true, movablelimits: true, symmetric: true }],
    OPFIXED: [1, 2, b.OP, { largeop: true, movablelimits: true }],
    INTEGRAL: [0, 1, b.OP, { largeop: true, symmetric: true }],
    INTEGRAL2: [1, 2, b.OP, { largeop: true, symmetric: true }],
    BIN3: [3, 3, b.BIN],
    BIN4: [4, 4, b.BIN],
    BIN01: [0, 1, b.BIN],
    BIN5: [5, 5, b.BIN],
    TALLBIN: [4, 4, b.BIN, { stretchy: true }],
    BINOP: [4, 4, b.BIN, { largeop: true, movablelimits: true }],
    REL: [5, 5, b.REL],
    REL1: [1, 1, b.REL, { stretchy: true }],
    REL4: [4, 4, b.REL],
    RELSTRETCH: [5, 5, b.REL, { stretchy: true }],
    RELACCENT: [5, 5, b.REL, { accent: true }],
    WIDEREL: [5, 5, b.REL, { accent: true, stretchy: true }],
    OPEN: [0, 0, b.OPEN, { fence: true, stretchy: true, symmetric: true }],
    CLOSE: [0, 0, b.CLOSE, { fence: true, stretchy: true, symmetric: true }],
    INNER: [0, 0, b.INNER],
    PUNCT: [0, 3, b.PUNCT],
    ACCENT: [0, 0, b.ORD, { accent: true }],
    WIDEACCENT: [0, 0, b.ORD, { accent: true, stretchy: true }]
  };
  a.mo.Augment(
    {
      SPACE: [
        "0em",
        "0.1111em",
        "0.1667em",
        "0.2222em",
        "0.2667em",
        "0.3333em"
      ],
      RANGES: [
        [32, 127, b.REL, "BasicLatin"],
        [160, 255, b.ORD, "Latin1Supplement"],
        [256, 383, b.ORD],
        [384, 591, b.ORD],
        [688, 767, b.ORD, "SpacingModLetters"],
        [768, 879, b.ORD, "CombDiacritMarks"],
        [880, 1023, b.ORD, "GreekAndCoptic"],
        [7680, 7935, b.ORD],
        [8192, 8303, b.PUNCT, "GeneralPunctuation"],
        [8304, 8351, b.ORD],
        [8352, 8399, b.ORD],
        [8400, 8447, b.ORD, "CombDiactForSymbols"],
        [8448, 8527, b.ORD, "LetterlikeSymbols"],
        [8528, 8591, b.ORD],
        [8592, 8703, b.REL, "Arrows"],
        [8704, 8959, b.BIN, "MathOperators"],
        [8960, 9215, b.ORD, "MiscTechnical"],
        [9312, 9471, b.ORD],
        [9472, 9631, b.ORD],
        [9632, 9727, b.ORD, "GeometricShapes"],
        [9984, 10175, b.ORD, "Dingbats"],
        [10176, 10223, b.ORD, "MiscMathSymbolsA"],
        [10224, 10239, b.REL, "SupplementalArrowsA"],
        [10496, 10623, b.REL, "SupplementalArrowsB"],
        [10624, 10751, b.ORD, "MiscMathSymbolsB"],
        [10752, 11007, b.BIN, "SuppMathOperators"],
        [11008, 11263, b.ORD, "MiscSymbolsAndArrows"],
        [119808, 120831, b.ORD]
      ],
      OPTABLE: {
        prefix: {
          "\u2200": d.ORD21,
          "\u2202": d.ORD21,
          "\u2203": d.ORD21,
          "\u2207": d.ORD21,
          "\u220F": d.OP,
          "\u2210": d.OP,
          "\u2211": d.OP,
          "\u2212": d.BIN01,
          "\u2213": d.BIN01,
          "\u221A": [1, 1, b.ORD, { stretchy: true }],
          "\u2220": d.ORD,
          "\u222B": d.INTEGRAL,
          "\u222E": d.INTEGRAL,
          "\u22C0": d.OP,
          "\u22C1": d.OP,
          "\u22C2": d.OP,
          "\u22C3": d.OP,
          "\u2308": d.OPEN,
          "\u230A": d.OPEN,
          "\u27E8": d.OPEN,
          "\u27EE": d.OPEN,
          "\u2A00": d.OP,
          "\u2A01": d.OP,
          "\u2A02": d.OP,
          "\u2A04": d.OP,
          "\u2A06": d.OP,
          "\u00AC": d.ORD21,
          "\u00B1": d.BIN01,
          "(": d.OPEN,
          "+": d.BIN01,
          "-": d.BIN01,
          "[": d.OPEN,
          "{": d.OPEN,
          "|": d.OPEN
        },
        postfix: {
          "!": [1, 0, b.CLOSE],
          "&": d.ORD,
          "\u2032": d.ORD02,
          "\u203E": d.WIDEACCENT,
          "\u2309": d.CLOSE,
          "\u230B": d.CLOSE,
          "\u23DE": d.WIDEACCENT,
          "\u23DF": d.WIDEACCENT,
          "\u266D": d.ORD02,
          "\u266E": d.ORD02,
          "\u266F": d.ORD02,
          "\u27E9": d.CLOSE,
          "\u27EF": d.CLOSE,
          ˆ: d.WIDEACCENT,
          ˇ: d.WIDEACCENT,
          ˉ: d.WIDEACCENT,
          ˊ: d.ACCENT,
          ˋ: d.ACCENT,
          "\u02D8": d.ACCENT,
          "\u02D9": d.ACCENT,
          "\u02DC": d.WIDEACCENT,
          "\u0302": d.WIDEACCENT,
          "\u00A8": d.ACCENT,
          "\u00AF": d.WIDEACCENT,
          ")": d.CLOSE,
          "]": d.CLOSE,
          "^": d.WIDEACCENT,
          _: d.WIDEACCENT,
          "`": d.ACCENT,
          "|": d.CLOSE,
          "}": d.CLOSE,
          "~": d.WIDEACCENT
        },
        infix: {
          "": d.ORD,
          "%": [3, 3, b.ORD],
          "\u2022": d.BIN4,
          "\u2026": d.INNER,
          "\u2044": d.TALLBIN,
          "\u2061": d.ORD,
          "\u2062": d.ORD,
          "\u2063": [0, 0, b.ORD, { linebreakstyle: "after", separator: true }],
          "\u2064": d.ORD,
          "\u2190": d.WIDEREL,
          "\u2191": d.RELSTRETCH,
          "\u2192": d.WIDEREL,
          "\u2193": d.RELSTRETCH,
          "\u2194": d.WIDEREL,
          "\u2195": d.RELSTRETCH,
          "\u2196": d.RELSTRETCH,
          "\u2197": d.RELSTRETCH,
          "\u2198": d.RELSTRETCH,
          "\u2199": d.RELSTRETCH,
          "\u21A6": d.WIDEREL,
          "\u21A9": d.WIDEREL,
          "\u21AA": d.WIDEREL,
          "\u21BC": d.WIDEREL,
          "\u21BD": d.WIDEREL,
          "\u21C0": d.WIDEREL,
          "\u21C1": d.WIDEREL,
          "\u21CC": d.WIDEREL,
          "\u21D0": d.WIDEREL,
          "\u21D1": d.RELSTRETCH,
          "\u21D2": d.WIDEREL,
          "\u21D3": d.RELSTRETCH,
          "\u21D4": d.WIDEREL,
          "\u21D5": d.RELSTRETCH,
          "\u2208": d.REL,
          "\u2209": d.REL,
          "\u220B": d.REL,
          "\u2212": d.BIN4,
          "\u2213": d.BIN4,
          "\u2215": d.TALLBIN,
          "\u2216": d.BIN4,
          "\u2217": d.BIN4,
          "\u2218": d.BIN4,
          "\u2219": d.BIN4,
          "\u221D": d.REL,
          "\u2223": d.REL,
          "\u2225": d.REL,
          "\u2227": d.BIN4,
          "\u2228": d.BIN4,
          "\u2229": d.BIN4,
          "\u222A": d.BIN4,
          "\u223C": d.REL,
          "\u2240": d.BIN4,
          "\u2243": d.REL,
          "\u2245": d.REL,
          "\u2248": d.REL,
          "\u224D": d.REL,
          "\u2250": d.REL,
          "\u2260": d.REL,
          "\u2261": d.REL,
          "\u2264": d.REL,
          "\u2265": d.REL,
          "\u226A": d.REL,
          "\u226B": d.REL,
          "\u227A": d.REL,
          "\u227B": d.REL,
          "\u2282": d.REL,
          "\u2283": d.REL,
          "\u2286": d.REL,
          "\u2287": d.REL,
          "\u228E": d.BIN4,
          "\u2291": d.REL,
          "\u2292": d.REL,
          "\u2293": d.BIN4,
          "\u2294": d.BIN4,
          "\u2295": d.BIN4,
          "\u2296": d.BIN4,
          "\u2297": d.BIN4,
          "\u2298": d.BIN4,
          "\u2299": d.BIN4,
          "\u22A2": d.REL,
          "\u22A3": d.REL,
          "\u22A4": d.ORD55,
          "\u22A5": d.REL,
          "\u22A8": d.REL,
          "\u22C4": d.BIN4,
          "\u22C5": d.BIN4,
          "\u22C6": d.BIN4,
          "\u22C8": d.REL,
          "\u22EE": d.ORD55,
          "\u22EF": d.INNER,
          "\u22F1": [5, 5, b.INNER],
          "\u25B3": d.BIN4,
          "\u25B5": d.BIN4,
          "\u25B9": d.BIN4,
          "\u25BD": d.BIN4,
          "\u25BF": d.BIN4,
          "\u25C3": d.BIN4,
          "\u2758": d.REL,
          "\u27F5": d.WIDEREL,
          "\u27F6": d.WIDEREL,
          "\u27F7": d.WIDEREL,
          "\u27F8": d.WIDEREL,
          "\u27F9": d.WIDEREL,
          "\u27FA": d.WIDEREL,
          "\u27FC": d.WIDEREL,
          "\u2A2F": d.BIN4,
          "\u2A3F": d.BIN4,
          "\u2AAF": d.REL,
          "\u2AB0": d.REL,
          "\u00B1": d.BIN4,
          "\u00B7": d.BIN4,
          "\u00D7": d.BIN4,
          "\u00F7": d.BIN4,
          "*": d.BIN3,
          "+": d.BIN4,
          ",": [0, 3, b.PUNCT, { linebreakstyle: "after", separator: true }],
          "-": d.BIN4,
          ".": [3, 3, b.ORD],
          "/": d.ORD11,
          ":": [1, 2, b.REL],
          ";": [0, 3, b.PUNCT, { linebreakstyle: "after", separator: true }],
          "<": d.REL,
          "=": d.REL,
          ">": d.REL,
          "?": [1, 1, b.CLOSE],
          "\\": d.ORD,
          "^": d.ORD11,
          _: d.ORD11,
          "|": [2, 2, b.ORD, { fence: true, stretchy: true, symmetric: true }],
          "#": d.ORD,
          $: d.ORD,
          "\u002E": [0, 3, b.PUNCT, { separator: true }],
          ʹ: d.ORD,
          "\u0300": d.ACCENT,
          "\u0301": d.ACCENT,
          "\u0303": d.WIDEACCENT,
          "\u0304": d.ACCENT,
          "\u0306": d.ACCENT,
          "\u0307": d.ACCENT,
          "\u0308": d.ACCENT,
          "\u030C": d.ACCENT,
          "\u0332": d.WIDEACCENT,
          "\u0338": d.REL4,
          "\u2015": [0, 0, b.ORD, { stretchy: true }],
          "\u2017": [0, 0, b.ORD, { stretchy: true }],
          "\u2020": d.BIN3,
          "\u2021": d.BIN3,
          "\u20D7": d.ACCENT,
          ℑ: d.ORD,
          ℓ: d.ORD,
          ℘: d.ORD,
          ℜ: d.ORD,
          "\u2205": d.ORD,
          "\u221E": d.ORD,
          "\u2305": d.BIN3,
          "\u2306": d.BIN3,
          "\u2322": d.REL4,
          "\u2323": d.REL4,
          "\u2329": d.OPEN,
          "\u232A": d.CLOSE,
          "\u23AA": d.ORD,
          "\u23AF": [0, 0, b.ORD, { stretchy: true }],
          "\u23B0": d.OPEN,
          "\u23B1": d.CLOSE,
          "\u2500": d.ORD,
          "\u25EF": d.BIN3,
          "\u2660": d.ORD,
          "\u2661": d.ORD,
          "\u2662": d.ORD,
          "\u2663": d.ORD,
          "\u3008": d.OPEN,
          "\u3009": d.CLOSE,
          "\uFE37": d.WIDEACCENT,
          "\uFE38": d.WIDEACCENT
        }
      }
    },
    { OPTYPES: d }
  );
  var c = a.mo.prototype.OPTABLE;
  c.infix["^"] = d.WIDEREL;
  c.infix._ = d.WIDEREL;
  c.prefix["\u2223"] = d.OPEN;
  c.prefix["\u2225"] = d.OPEN;
  c.postfix["\u2223"] = d.CLOSE;
  c.postfix["\u2225"] = d.CLOSE;
})(MathJax.ElementJax.mml);
MathJax.ElementJax.mml.loadComplete("jax.js");
MathJax.Hub.Register.LoadHook("[MathJax]/jax/element/mml/jax.js", function() {
  var c = "2.7.5";
  var a = MathJax.ElementJax.mml,
    b = MathJax.Hub.config.menuSettings;
  a.mbase.Augment({
    toMathML: function(l) {
      var h = this.inferred && this.parent.inferRow;
      if (l == null) {
        l = "";
      }
      var f = this.type,
        e = this.toMathMLattributes();
      if (f === "mspace") {
        return l + "<" + f + e + " />";
      }
      var k = [],
        j = this.isToken ? "" : l + (h ? "" : "  ");
      for (var g = 0, d = this.data.length; g < d; g++) {
        if (this.data[g]) {
          k.push(this.data[g].toMathML(j));
        } else {
          if (!this.isToken && !this.isChars) {
            k.push(j + "<mrow />");
          }
        }
      }
      if (this.isToken || this.isChars) {
        return l + "<" + f + e + ">" + k.join("") + "</" + f + ">";
      }
      if (h) {
        return k.join("\n");
      }
      if (k.length === 0 || (k.length === 1 && k[0] === "")) {
        return l + "<" + f + e + " />";
      }
      return l + "<" + f + e + ">\n" + k.join("\n") + "\n" + l + "</" + f + ">";
    },
    toMathMLattributes: function() {
      var j =
        this.type === "mstyle" ? a.math.prototype.defaults : this.defaults;
      var h = this.attrNames || a.copyAttributeNames,
        g = a.skipAttributes,
        l = a.copyAttributes;
      var e = [];
      if (this.type === "math" && (!this.attr || !("xmlns" in this.attr))) {
        e.push('xmlns="http://www.w3.org/1998/Math/MathML"');
      }
      if (!this.attrNames) {
        for (var k in j) {
          if (!g[k] && !l[k] && j.hasOwnProperty(k)) {
            if (this[k] != null && this[k] !== j[k]) {
              if (this.Get(k, null, 1) !== this[k]) {
                e.push(k + '="' + this.toMathMLattribute(this[k]) + '"');
              }
            }
          }
        }
      }
      for (var f = 0, d = h.length; f < d; f++) {
        if (l[h[f]] === 1 && !j.hasOwnProperty(h[f])) {
          continue;
        }
        value = (this.attr || {})[h[f]];
        if (value == null) {
          value = this[h[f]];
        }
        if (value != null) {
          e.push(h[f] + '="' + this.toMathMLquote(value) + '"');
        }
      }
      this.toMathMLclass(e);
      if (e.length) {
        return " " + e.join(" ");
      } else {
        return "";
      }
    },
    toMathMLclass: function(d) {
      var f = [];
      if (this["class"]) {
        f.push(this["class"]);
      }
      if (this.isa(a.TeXAtom) && b.texHints) {
        var e = [
          "ORD",
          "OP",
          "BIN",
          "REL",
          "OPEN",
          "CLOSE",
          "PUNCT",
          "INNER",
          "VCENTER"
        ][this.texClass];
        if (e) {
          f.push("MJX-TeXAtom-" + e);
          if (e === "OP" && !this.movablelimits) {
            f.push("MJX-fixedlimits");
          }
        }
      }
      if (this.mathvariant && this.toMathMLvariants[this.mathvariant]) {
        f.push("MJX" + this.mathvariant);
      }
      if (this.variantForm) {
        f.push("MJX-variant");
      }
      if (f.length) {
        d.unshift('class="' + this.toMathMLquote(f.join(" ")) + '"');
      }
    },
    toMathMLattribute: function(d) {
      if (
        typeof d === "string" &&
        d.replace(/ /g, "").match(/^(([-+])?(\d+(\.\d*)?|\.\d+))mu$/)
      ) {
        return (
          (RegExp.$2 || "") +
          ((1 / 18) * RegExp.$3).toFixed(3).replace(/\.?0+$/, "") +
          "em"
        );
      } else {
        if (this.toMathMLvariants[d]) {
          return this.toMathMLvariants[d];
        }
      }
      return this.toMathMLquote(d);
    },
    toMathMLvariants: {
      "-tex-caligraphic": a.VARIANT.SCRIPT,
      "-tex-caligraphic-bold": a.VARIANT.BOLDSCRIPT,
      "-tex-oldstyle": a.VARIANT.NORMAL,
      "-tex-oldstyle-bold": a.VARIANT.BOLD,
      "-tex-mathit": a.VARIANT.ITALIC
    },
    toMathMLquote: function(f) {
      f = String(f).split("");
      for (var g = 0, d = f.length; g < d; g++) {
        var k = f[g].charCodeAt(0);
        if (k <= 55295 || 57344 <= k) {
          if (k > 126 || (k < 32 && k !== 10 && k !== 13 && k !== 9)) {
            f[g] = "&#x" + k.toString(16).toUpperCase() + ";";
          } else {
            var j = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[
              f[g]
            ];
            if (j) {
              f[g] = j;
            }
          }
        } else {
          if (g + 1 < d) {
            var h = f[g + 1].charCodeAt(0);
            var e = ((k - 55296) << 10) + (h - 56320) + 65536;
            f[g] = "&#x" + e.toString(16).toUpperCase() + ";";
            f[g + 1] = "";
            g++;
          } else {
            f[g] = "";
          }
        }
      }
      return f.join("");
    }
  });
  a.math.Augment({
    toMathML: function(d, e) {
      var g;
      if (d == null) {
        d = "";
      }
      if (e && e.originalText && b.semantics) {
        g = MathJax.InputJax[e.inputJax].annotationEncoding;
      }
      var n = this.data[0] && this.data[0].data.length > 1;
      var p = this.type,
        k = this.toMathMLattributes();
      var j = [],
        o = d + (g ? "  " + (n ? "  " : "") : "") + "  ";
      for (var h = 0, f = this.data.length; h < f; h++) {
        if (this.data[h]) {
          j.push(this.data[h].toMathML(o));
        } else {
          j.push(o + "<mrow />");
        }
      }
      if (j.length === 0 || (j.length === 1 && j[0] === "")) {
        if (!g) {
          return "<" + p + k + " />";
        }
        j.push(o + "<mrow />");
      }
      if (g) {
        if (n) {
          j.unshift(d + "    <mrow>");
          j.push(d + "    </mrow>");
        }
        j.unshift(d + "  <semantics>");
        var l = e.originalText.replace(/[&<>]/g, function(i) {
          return { ">": "&gt;", "<": "&lt;", "&": "&amp;" }[i];
        });
        j.push(
          d +
            '    <annotation encoding="' +
            this.toMathMLquote(g) +
            '">' +
            l +
            "</annotation>"
        );
        j.push(d + "  </semantics>");
      }
      return d + "<" + p + k + ">\n" + j.join("\n") + "\n" + d + "</" + p + ">";
    }
  });
  a.msubsup.Augment({
    toMathML: function(j) {
      var f = this.type;
      if (this.data[this.sup] == null) {
        f = "msub";
      }
      if (this.data[this.sub] == null) {
        f = "msup";
      }
      var e = this.toMathMLattributes();
      delete this.data[0].inferred;
      var h = [];
      for (var g = 0, d = this.data.length; g < d; g++) {
        if (this.data[g]) {
          h.push(this.data[g].toMathML(j + "  "));
        }
      }
      return j + "<" + f + e + ">\n" + h.join("\n") + "\n" + j + "</" + f + ">";
    }
  });
  a.munderover.Augment({
    toMathML: function(k) {
      var f = this.type;
      var j = this.data[this.base];
      if (j && j.isa(a.TeXAtom) && j.movablelimits && !j.Get("displaystyle")) {
        type = "msubsup";
        if (this.data[this.under] == null) {
          f = "msup";
        }
        if (this.data[this.over] == null) {
          f = "msub";
        }
      } else {
        if (this.data[this.under] == null) {
          f = "mover";
        }
        if (this.data[this.over] == null) {
          f = "munder";
        }
      }
      var e = this.toMathMLattributes();
      delete this.data[0].inferred;
      var h = [];
      for (var g = 0, d = this.data.length; g < d; g++) {
        if (this.data[g]) {
          h.push(this.data[g].toMathML(k + "  "));
        }
      }
      return k + "<" + f + e + ">\n" + h.join("\n") + "\n" + k + "</" + f + ">";
    }
  });
  a.TeXAtom.Augment({
    toMathML: function(e) {
      var d = this.toMathMLattributes();
      if (!d && this.data[0].data.length === 1) {
        return e.substr(2) + this.data[0].toMathML(e);
      }
      return (
        e +
        "<mrow" +
        d +
        ">\n" +
        this.data[0].toMathML(e + "  ") +
        "\n" +
        e +
        "</mrow>"
      );
    }
  });
  a.chars.Augment({
    toMathML: function(d) {
      return (d || "") + this.toMathMLquote(this.toString());
    }
  });
  a.entity.Augment({
    toMathML: function(d) {
      return (
        (d || "") +
        "&" +
        this.toMathMLquote(this.data[0]) +
        ";<!-- " +
        this.toString() +
        " -->"
      );
    }
  });
  a.xml.Augment({
    toMathML: function(d) {
      return (d || "") + this.toString();
    }
  });
  MathJax.Hub.Register.StartupHook("TeX mathchoice Ready", function() {
    a.TeXmathchoice.Augment({
      toMathML: function(d) {
        return this.Core().toMathML(d);
      }
    });
  });
  MathJax.Hub.Startup.signal.Post("toMathML Ready");
});
MathJax.Ajax.loadComplete("[MathJax]/extensions/toMathML.js");
(function(c, d) {
  var a;
  var b = function(e) {
    return MathJax.Localization._.apply(
      MathJax.Localization,
      [["MathML", e]].concat([].slice.call(arguments, 1))
    );
  };
  c.Parse = MathJax.Object.Subclass(
    {
      Init: function(f, e) {
        this.Parse(f, e);
      },
      Parse: function(h, e) {
        var j;
        if (typeof h !== "string") {
          j = h.parentNode;
        } else {
          j = c.ParseXML(this.preProcessMath.call(this, h));
          if (j == null) {
            c.Error(["ErrorParsingMathML", "Error parsing MathML"]);
          }
        }
        var g = j.getElementsByTagName("parsererror")[0];
        if (g) {
          c.Error([
            "ParsingError",
            "Error parsing MathML: %1",
            g.textContent.replace(
              /This page.*?errors:|XML Parsing Error: |Below is a rendering of the page.*/g,
              ""
            )
          ]);
        }
        if (j.childNodes.length !== 1) {
          c.Error([
            "MathMLSingleElement",
            "MathML must be formed by a single element"
          ]);
        }
        if (j.firstChild.nodeName.toLowerCase() === "html") {
          var f = j.getElementsByTagName("h1")[0];
          if (f && f.textContent === "XML parsing error" && f.nextSibling) {
            c.Error([
              "ParsingError",
              "Error parsing MathML: %1",
              String(f.nextSibling.nodeValue).replace(
                /fatal parsing error: /,
                ""
              )
            ]);
          }
        }
        if (
          j.firstChild.nodeName.toLowerCase().replace(/^[a-z]+:/, "") !== "math"
        ) {
          c.Error([
            "MathMLRootElement",
            "MathML must be formed by a <math> element, not %1",
            "<" + j.firstChild.nodeName + ">"
          ]);
        }
        var i = { math: j.firstChild, script: e };
        c.DOMfilterHooks.Execute(i);
        this.mml = this.MakeMML(i.math);
      },
      MakeMML: function(h) {
        var i = String(h.getAttribute("class") || "");
        var f,
          g = h.nodeName.toLowerCase().replace(/^[a-z]+:/, "");
        var e = i.match(/(^| )MJX-TeXAtom-([^ ]*)/);
        if (e) {
          f = this.TeXAtom(e[2], e[2] === "OP" && !i.match(/MJX-fixedlimits/));
        } else {
          if (!(a[g] && a[g].isa && a[g].isa(a.mbase))) {
            MathJax.Hub.signal.Post(["MathML Jax - unknown node type", g]);
            return a.Error(b("UnknownNodeType", "Unknown node type: %1", g));
          } else {
            f = a[g]();
          }
        }
        this.AddAttributes(f, h);
        this.CheckClass(f, f["class"]);
        this.AddChildren(f, h);
        if (c.config.useMathMLspacing) {
          f.useMMLspacing = 8;
        }
        return f;
      },
      TeXAtom: function(g, f) {
        var e = a.TeXAtom().With({ texClass: a.TEXCLASS[g] });
        if (f) {
          e.movesupsub = e.movablelimits = true;
        }
        return e;
      },
      CheckClass: function(f, h) {
        h = (h || "").split(/ /);
        var j = [];
        for (var g = 0, e = h.length; g < e; g++) {
          if (h[g].substr(0, 4) === "MJX-") {
            if (h[g] === "MJX-arrow") {
              if (!f.notation.match("/" + a.NOTATION.UPDIAGONALARROW + "/")) {
                f.notation += " " + a.NOTATION.UPDIAGONALARROW;
              }
            } else {
              if (h[g] === "MJX-variant") {
                f.variantForm = true;
                if (!MathJax.Extension["TeX/AMSsymbols"]) {
                  MathJax.Hub.RestartAfter(
                    MathJax.Ajax.Require(
                      "[MathJax]/extensions/TeX/AMSsymbols.js"
                    )
                  );
                }
              } else {
                if (h[g].substr(0, 11) !== "MJX-TeXAtom") {
                  f.mathvariant = h[g].substr(3);
                  if (
                    f.mathvariant === "-tex-caligraphic-bold" ||
                    f.mathvariant === "-tex-oldstyle-bold"
                  ) {
                    if (!MathJax.Extension["TeX/boldsymbol"]) {
                      MathJax.Hub.RestartAfter(
                        MathJax.Ajax.Require(
                          "[MathJax]/extensions/TeX/boldsymbol.js"
                        )
                      );
                    }
                  }
                }
              }
            }
          } else {
            j.push(h[g]);
          }
        }
        if (j.length) {
          f["class"] = j.join(" ");
        } else {
          delete f["class"];
        }
      },
      AddAttributes: function(g, j) {
        g.attr = {};
        g.attrNames = [];
        for (var h = 0, e = j.attributes.length; h < e; h++) {
          var f = j.attributes[h].name;
          if (f == "xlink:href") {
            f = "href";
          }
          if (f.match(/:/)) {
            continue;
          }
          if (f.match(/^_moz-math-((column|row)(align|line)|font-style)$/)) {
            continue;
          }
          var k = j.attributes[h].value;
          k = this.filterAttribute(f, k);
          var l = g.type === "mstyle" ? a.math.prototype.defaults : g.defaults;
          if (k != null) {
            var n = k.toLowerCase();
            if (n === "true" || n === "false") {
              if (
                typeof l[f] === "boolean" ||
                l[f] === a.INHERIT ||
                g.type === "math" ||
                g.type === "mstyle" ||
                (l[f] === a.AUTO &&
                  (g.defaultDef == null ||
                    typeof g.defaultDef[f] === "boolean"))
              ) {
                k = n === "true";
              }
            }
            if (l[f] != null || a.copyAttributes[f]) {
              g[f] = k;
            } else {
              g.attr[f] = k;
            }
            g.attrNames.push(f);
          }
        }
      },
      filterAttribute: function(e, f) {
        return f;
      },
      AddChildren: function(e, g) {
        for (var k = 0, j = g.childNodes.length; k < j; k++) {
          var f = g.childNodes[k];
          if (f.nodeName === "#comment") {
            continue;
          }
          if (f.nodeName === "#text") {
            if ((e.isToken || e.isChars) && !e.mmlSelfClosing) {
              var o = f.nodeValue;
              if (e.isToken) {
                o = o.replace(/&([a-z][a-z0-9]*);/gi, this.replaceEntity);
                o = this.trimSpace(o);
              }
              e.Append(a.chars(o));
            } else {
              if (f.nodeValue.match(/\S/)) {
                c.Error([
                  "UnexpectedTextNode",
                  "Unexpected text node: %1",
                  "'" + f.nodeValue + "'"
                ]);
              }
            }
          } else {
            if (e.type === "annotation-xml") {
              e.Append(a.xml(f));
            } else {
              var h = this.MakeMML(f);
              e.Append(h);
              if (h.mmlSelfClosing && h.data.length) {
                e.Append.apply(e, h.data);
                h.data = [];
              }
            }
          }
        }
        if (e.type === "mrow" && e.data.length >= 2) {
          var l = e.data[0],
            n = e.data[e.data.length - 1];
          if (
            l.type === "mo" &&
            l.Get("fence") &&
            n.type === "mo" &&
            n.Get("fence")
          ) {
            if (l.data[0]) {
              e.open = l.data.join("");
            }
            if (n.data[0]) {
              e.close = n.data.join("");
            }
          }
        }
      },
      preProcessMath: function(f) {
        if (f.match(/^<[a-z]+:/i) && !f.match(/^<[^<>]* xmlns:/)) {
          f = f.replace(
            /^<([a-z]+)(:math)/i,
            '<$1$2 xmlns:$1="http://www.w3.org/1998/Math/MathML"'
          );
        }
        var e = f.match(/^(<math( ('.*?'|".*?"|[^>])+)>)/i);
        if (e && e[2].match(/ (?!xmlns=)[a-z]+=\"http:/i)) {
          f =
            e[1].replace(
              / (?!xmlns=)([a-z]+=(['"])http:.*?\2)/gi,
              " xmlns:$1 $1"
            ) + f.substr(e[0].length);
        }
        if (f.match(/^<math[ >]/i) && !f.match(/^<[^<>]* xmlns=/)) {
          f = f.replace(
            /^<(math)/i,
            '<math xmlns="http://www.w3.org/1998/Math/MathML"'
          );
        }
        f = f.replace(
          /^\s*(?:\/\/)?<!(--)?\[CDATA\[((.|\n)*)(\/\/)?\]\]\1>\s*$/,
          "$2"
        );
        return f.replace(/&([a-z][a-z0-9]*);/gi, this.replaceEntity);
      },
      trimSpace: function(e) {
        return e
          .replace(/[\t\n\r]/g, " ")
          .replace(/^ +/, "")
          .replace(/ +$/, "")
          .replace(/  +/g, " ");
      },
      replaceEntity: function(g, f) {
        if (f.match(/^(lt|amp|quot)$/)) {
          return g;
        }
        if (c.Parse.Entity[f]) {
          return c.Parse.Entity[f];
        }
        var h = f.charAt(0).toLowerCase();
        var e = f.match(/^[a-zA-Z](fr|scr|opf)$/);
        if (e) {
          h = e[1];
        }
        if (!c.Parse.loaded[h]) {
          c.Parse.loaded[h] = true;
          MathJax.Hub.RestartAfter(
            MathJax.Ajax.Require(c.entityDir + "/" + h + ".js")
          );
        }
        return g;
      }
    },
    { loaded: [] }
  );
  c.Augment({
    sourceMenuTitle: ["OriginalMathML", "Original MathML"],
    prefilterHooks: MathJax.Callback.Hooks(true),
    DOMfilterHooks: MathJax.Callback.Hooks(true),
    postfilterHooks: MathJax.Callback.Hooks(true),
    Translate: function(e) {
      if (!this.ParseXML) {
        this.ParseXML = this.createParser();
      }
      var f,
        h,
        i = { script: e };
      if (
        e.firstChild &&
        e.firstChild.nodeName.toLowerCase().replace(/^[a-z]+:/, "") === "math"
      ) {
        i.math = e.firstChild;
      } else {
        h = MathJax.HTML.getScript(e);
        if (d.isMSIE) {
          h = h.replace(/(&nbsp;)+$/, "");
        }
        i.math = h;
      }
      var j = this.prefilterHooks.Execute(i);
      if (j) {
        return j;
      }
      h = i.math;
      try {
        f = c.Parse(h, e).mml;
      } catch (g) {
        if (!g.mathmlError) {
          throw g;
        }
        f = this.formatError(g, h, e);
      }
      i.math = a(f);
      return this.postfilterHooks.Execute(i) || i.math;
    },
    prefilterMath: function(f, e) {
      return f;
    },
    prefilterMathML: function(f, e) {
      return f;
    },
    formatError: function(h, g, e) {
      var f = h.message.replace(/\n.*/, "");
      MathJax.Hub.signal.Post(["MathML Jax - parse error", f, g, e]);
      return a.Error(f);
    },
    Error: function(e) {
      if (MathJax.Object.isArray(e)) {
        e = b.apply(b, e);
      }
      throw MathJax.Hub.Insert(Error(e), { mathmlError: true });
    },
    parseDOM: function(e) {
      return this.parser.parseFromString(e, "text/xml");
    },
    parseMS: function(e) {
      return this.parser.loadXML(e) ? this.parser : null;
    },
    parseDIV: function(e) {
      this.div.innerHTML =
        "<div>" + e.replace(/<([a-z]+)([^>]*)\/>/g, "<$1$2></$1>") + "</div>";
      var f = this.div.firstChild;
      this.div.innerHTML = "";
      return f;
    },
    parseError: function(e) {
      return null;
    },
    createMSParser: function() {
      var j = null;
      var f = [
        "MSXML2.DOMDocument.6.0",
        "MSXML2.DOMDocument.5.0",
        "MSXML2.DOMDocument.4.0",
        "MSXML2.DOMDocument.3.0",
        "MSXML2.DOMDocument.2.0",
        "Microsoft.XMLDOM"
      ];
      for (var g = 0, e = f.length; g < e && !j; g++) {
        try {
          j = new ActiveXObject(f[g]);
        } catch (h) {}
      }
      return j;
    },
    createParser: function() {
      if (window.DOMParser) {
        this.parser = new DOMParser();
        return this.parseDOM;
      } else {
        if (window.ActiveXObject) {
          this.parser = this.createMSParser();
          if (!this.parser) {
            MathJax.Localization.Try(this.parserCreationError);
            return this.parseError;
          }
          this.parser.async = false;
          return this.parseMS;
        }
      }
      this.div = MathJax.Hub.Insert(document.createElement("div"), {
        style: {
          visibility: "hidden",
          overflow: "hidden",
          height: "1px",
          position: "absolute",
          top: 0
        }
      });
      if (!document.body.firstChild) {
        document.body.appendChild(this.div);
      } else {
        document.body.insertBefore(this.div, document.body.firstChild);
      }
      return this.parseDIV;
    },
    parserCreationError: function() {
      alert(
        b(
          "CantCreateXMLParser",
          "MathJax can't create an XML parser for MathML.  Check that\nthe 'Script ActiveX controls marked safe for scripting' security\nsetting is enabled (use the Internet Options item in the Tools\nmenu, and select the Security panel, then press the Custom Level\nbutton to check this).\n\nMathML equations will not be able to be processed by MathJax."
        )
      );
    },
    Startup: function() {
      a = MathJax.ElementJax.mml;
      a.mspace.Augment({ mmlSelfClosing: true });
      a.none.Augment({ mmlSelfClosing: true });
      a.mprescripts.Augment({ mmlSelfClosing: true });
      a.maligngroup.Augment({ mmlSelfClosing: true });
      a.malignmark.Augment({ mmlSelfClosing: true });
    }
  });
  c.prefilterHooks.Add(function(e) {
    e.math =
      typeof e.math === "string"
        ? c.prefilterMath(e.math, e.script)
        : c.prefilterMathML(e.math, e.script);
  });
  c.Parse.Entity = {
    ApplyFunction: "\u2061",
    Backslash: "\u2216",
    Because: "\u2235",
    Breve: "\u02D8",
    Cap: "\u22D2",
    CenterDot: "\u00B7",
    CircleDot: "\u2299",
    CircleMinus: "\u2296",
    CirclePlus: "\u2295",
    CircleTimes: "\u2297",
    Congruent: "\u2261",
    ContourIntegral: "\u222E",
    Coproduct: "\u2210",
    Cross: "\u2A2F",
    Cup: "\u22D3",
    CupCap: "\u224D",
    Dagger: "\u2021",
    Del: "\u2207",
    Delta: "\u0394",
    Diamond: "\u22C4",
    DifferentialD: "\u2146",
    DotEqual: "\u2250",
    DoubleDot: "\u00A8",
    DoubleRightTee: "\u22A8",
    DoubleVerticalBar: "\u2225",
    DownArrow: "\u2193",
    DownLeftVector: "\u21BD",
    DownRightVector: "\u21C1",
    DownTee: "\u22A4",
    Downarrow: "\u21D3",
    Element: "\u2208",
    EqualTilde: "\u2242",
    Equilibrium: "\u21CC",
    Exists: "\u2203",
    ExponentialE: "\u2147",
    FilledVerySmallSquare: "\u25AA",
    ForAll: "\u2200",
    Gamma: "\u0393",
    Gg: "\u22D9",
    GreaterEqual: "\u2265",
    GreaterEqualLess: "\u22DB",
    GreaterFullEqual: "\u2267",
    GreaterLess: "\u2277",
    GreaterSlantEqual: "\u2A7E",
    GreaterTilde: "\u2273",
    Hacek: "\u02C7",
    Hat: "\u005E",
    HumpDownHump: "\u224E",
    HumpEqual: "\u224F",
    Im: "\u2111",
    ImaginaryI: "\u2148",
    Integral: "\u222B",
    Intersection: "\u22C2",
    InvisibleComma: "\u2063",
    InvisibleTimes: "\u2062",
    Lambda: "\u039B",
    Larr: "\u219E",
    LeftAngleBracket: "\u27E8",
    LeftArrow: "\u2190",
    LeftArrowRightArrow: "\u21C6",
    LeftCeiling: "\u2308",
    LeftDownVector: "\u21C3",
    LeftFloor: "\u230A",
    LeftRightArrow: "\u2194",
    LeftTee: "\u22A3",
    LeftTriangle: "\u22B2",
    LeftTriangleEqual: "\u22B4",
    LeftUpVector: "\u21BF",
    LeftVector: "\u21BC",
    Leftarrow: "\u21D0",
    Leftrightarrow: "\u21D4",
    LessEqualGreater: "\u22DA",
    LessFullEqual: "\u2266",
    LessGreater: "\u2276",
    LessSlantEqual: "\u2A7D",
    LessTilde: "\u2272",
    Ll: "\u22D8",
    Lleftarrow: "\u21DA",
    LongLeftArrow: "\u27F5",
    LongLeftRightArrow: "\u27F7",
    LongRightArrow: "\u27F6",
    Longleftarrow: "\u27F8",
    Longleftrightarrow: "\u27FA",
    Longrightarrow: "\u27F9",
    Lsh: "\u21B0",
    MinusPlus: "\u2213",
    NestedGreaterGreater: "\u226B",
    NestedLessLess: "\u226A",
    NotDoubleVerticalBar: "\u2226",
    NotElement: "\u2209",
    NotEqual: "\u2260",
    NotExists: "\u2204",
    NotGreater: "\u226F",
    NotGreaterEqual: "\u2271",
    NotLeftTriangle: "\u22EA",
    NotLeftTriangleEqual: "\u22EC",
    NotLess: "\u226E",
    NotLessEqual: "\u2270",
    NotPrecedes: "\u2280",
    NotPrecedesSlantEqual: "\u22E0",
    NotRightTriangle: "\u22EB",
    NotRightTriangleEqual: "\u22ED",
    NotSubsetEqual: "\u2288",
    NotSucceeds: "\u2281",
    NotSucceedsSlantEqual: "\u22E1",
    NotSupersetEqual: "\u2289",
    NotTilde: "\u2241",
    NotVerticalBar: "\u2224",
    Omega: "\u03A9",
    OverBar: "\u203E",
    OverBrace: "\u23DE",
    PartialD: "\u2202",
    Phi: "\u03A6",
    Pi: "\u03A0",
    PlusMinus: "\u00B1",
    Precedes: "\u227A",
    PrecedesEqual: "\u2AAF",
    PrecedesSlantEqual: "\u227C",
    PrecedesTilde: "\u227E",
    Product: "\u220F",
    Proportional: "\u221D",
    Psi: "\u03A8",
    Rarr: "\u21A0",
    Re: "\u211C",
    ReverseEquilibrium: "\u21CB",
    RightAngleBracket: "\u27E9",
    RightArrow: "\u2192",
    RightArrowLeftArrow: "\u21C4",
    RightCeiling: "\u2309",
    RightDownVector: "\u21C2",
    RightFloor: "\u230B",
    RightTee: "\u22A2",
    RightTeeArrow: "\u21A6",
    RightTriangle: "\u22B3",
    RightTriangleEqual: "\u22B5",
    RightUpVector: "\u21BE",
    RightVector: "\u21C0",
    Rightarrow: "\u21D2",
    Rrightarrow: "\u21DB",
    Rsh: "\u21B1",
    Sigma: "\u03A3",
    SmallCircle: "\u2218",
    Sqrt: "\u221A",
    Square: "\u25A1",
    SquareIntersection: "\u2293",
    SquareSubset: "\u228F",
    SquareSubsetEqual: "\u2291",
    SquareSuperset: "\u2290",
    SquareSupersetEqual: "\u2292",
    SquareUnion: "\u2294",
    Star: "\u22C6",
    Subset: "\u22D0",
    SubsetEqual: "\u2286",
    Succeeds: "\u227B",
    SucceedsEqual: "\u2AB0",
    SucceedsSlantEqual: "\u227D",
    SucceedsTilde: "\u227F",
    SuchThat: "\u220B",
    Sum: "\u2211",
    Superset: "\u2283",
    SupersetEqual: "\u2287",
    Supset: "\u22D1",
    Therefore: "\u2234",
    Theta: "\u0398",
    Tilde: "\u223C",
    TildeEqual: "\u2243",
    TildeFullEqual: "\u2245",
    TildeTilde: "\u2248",
    UnderBar: "\u005F",
    UnderBrace: "\u23DF",
    Union: "\u22C3",
    UnionPlus: "\u228E",
    UpArrow: "\u2191",
    UpDownArrow: "\u2195",
    UpTee: "\u22A5",
    Uparrow: "\u21D1",
    Updownarrow: "\u21D5",
    Upsilon: "\u03A5",
    Vdash: "\u22A9",
    Vee: "\u22C1",
    VerticalBar: "\u2223",
    VerticalTilde: "\u2240",
    Vvdash: "\u22AA",
    Wedge: "\u22C0",
    Xi: "\u039E",
    acute: "\u00B4",
    aleph: "\u2135",
    alpha: "\u03B1",
    amalg: "\u2A3F",
    and: "\u2227",
    ang: "\u2220",
    angmsd: "\u2221",
    angsph: "\u2222",
    ape: "\u224A",
    backprime: "\u2035",
    backsim: "\u223D",
    backsimeq: "\u22CD",
    beta: "\u03B2",
    beth: "\u2136",
    between: "\u226C",
    bigcirc: "\u25EF",
    bigodot: "\u2A00",
    bigoplus: "\u2A01",
    bigotimes: "\u2A02",
    bigsqcup: "\u2A06",
    bigstar: "\u2605",
    bigtriangledown: "\u25BD",
    bigtriangleup: "\u25B3",
    biguplus: "\u2A04",
    blacklozenge: "\u29EB",
    blacktriangle: "\u25B4",
    blacktriangledown: "\u25BE",
    blacktriangleleft: "\u25C2",
    bowtie: "\u22C8",
    boxdl: "\u2510",
    boxdr: "\u250C",
    boxminus: "\u229F",
    boxplus: "\u229E",
    boxtimes: "\u22A0",
    boxul: "\u2518",
    boxur: "\u2514",
    bsol: "\u005C",
    bull: "\u2022",
    cap: "\u2229",
    check: "\u2713",
    chi: "\u03C7",
    circ: "\u02C6",
    circeq: "\u2257",
    circlearrowleft: "\u21BA",
    circlearrowright: "\u21BB",
    circledR: "\u00AE",
    circledS: "\u24C8",
    circledast: "\u229B",
    circledcirc: "\u229A",
    circleddash: "\u229D",
    clubs: "\u2663",
    colon: "\u003A",
    comp: "\u2201",
    ctdot: "\u22EF",
    cuepr: "\u22DE",
    cuesc: "\u22DF",
    cularr: "\u21B6",
    cup: "\u222A",
    curarr: "\u21B7",
    curlyvee: "\u22CE",
    curlywedge: "\u22CF",
    dagger: "\u2020",
    daleth: "\u2138",
    ddarr: "\u21CA",
    deg: "\u00B0",
    delta: "\u03B4",
    digamma: "\u03DD",
    div: "\u00F7",
    divideontimes: "\u22C7",
    dot: "\u02D9",
    doteqdot: "\u2251",
    dotplus: "\u2214",
    dotsquare: "\u22A1",
    dtdot: "\u22F1",
    ecir: "\u2256",
    efDot: "\u2252",
    egs: "\u2A96",
    ell: "\u2113",
    els: "\u2A95",
    empty: "\u2205",
    epsi: "\u03B5",
    epsiv: "\u03F5",
    erDot: "\u2253",
    eta: "\u03B7",
    eth: "\u00F0",
    flat: "\u266D",
    fork: "\u22D4",
    frown: "\u2322",
    gEl: "\u2A8C",
    gamma: "\u03B3",
    gap: "\u2A86",
    gimel: "\u2137",
    gnE: "\u2269",
    gnap: "\u2A8A",
    gne: "\u2A88",
    gnsim: "\u22E7",
    gt: "\u003E",
    gtdot: "\u22D7",
    harrw: "\u21AD",
    hbar: "\u210F",
    hellip: "\u2026",
    hookleftarrow: "\u21A9",
    hookrightarrow: "\u21AA",
    imath: "\u0131",
    infin: "\u221E",
    intcal: "\u22BA",
    iota: "\u03B9",
    jmath: "\u0237",
    kappa: "\u03BA",
    kappav: "\u03F0",
    lEg: "\u2A8B",
    lambda: "\u03BB",
    lap: "\u2A85",
    larrlp: "\u21AB",
    larrtl: "\u21A2",
    lbrace: "\u007B",
    lbrack: "\u005B",
    le: "\u2264",
    leftleftarrows: "\u21C7",
    leftthreetimes: "\u22CB",
    lessdot: "\u22D6",
    lmoust: "\u23B0",
    lnE: "\u2268",
    lnap: "\u2A89",
    lne: "\u2A87",
    lnsim: "\u22E6",
    longmapsto: "\u27FC",
    looparrowright: "\u21AC",
    lowast: "\u2217",
    loz: "\u25CA",
    lt: "\u003C",
    ltimes: "\u22C9",
    ltri: "\u25C3",
    macr: "\u00AF",
    malt: "\u2720",
    mho: "\u2127",
    mu: "\u03BC",
    multimap: "\u22B8",
    nLeftarrow: "\u21CD",
    nLeftrightarrow: "\u21CE",
    nRightarrow: "\u21CF",
    nVDash: "\u22AF",
    nVdash: "\u22AE",
    natur: "\u266E",
    nearr: "\u2197",
    nharr: "\u21AE",
    nlarr: "\u219A",
    not: "\u00AC",
    nrarr: "\u219B",
    nu: "\u03BD",
    nvDash: "\u22AD",
    nvdash: "\u22AC",
    nwarr: "\u2196",
    omega: "\u03C9",
    omicron: "\u03BF",
    or: "\u2228",
    osol: "\u2298",
    period: "\u002E",
    phi: "\u03C6",
    phiv: "\u03D5",
    pi: "\u03C0",
    piv: "\u03D6",
    prap: "\u2AB7",
    precnapprox: "\u2AB9",
    precneqq: "\u2AB5",
    precnsim: "\u22E8",
    prime: "\u2032",
    psi: "\u03C8",
    rarrtl: "\u21A3",
    rbrace: "\u007D",
    rbrack: "\u005D",
    rho: "\u03C1",
    rhov: "\u03F1",
    rightrightarrows: "\u21C9",
    rightthreetimes: "\u22CC",
    ring: "\u02DA",
    rmoust: "\u23B1",
    rtimes: "\u22CA",
    rtri: "\u25B9",
    scap: "\u2AB8",
    scnE: "\u2AB6",
    scnap: "\u2ABA",
    scnsim: "\u22E9",
    sdot: "\u22C5",
    searr: "\u2198",
    sect: "\u00A7",
    sharp: "\u266F",
    sigma: "\u03C3",
    sigmav: "\u03C2",
    simne: "\u2246",
    smile: "\u2323",
    spades: "\u2660",
    sub: "\u2282",
    subE: "\u2AC5",
    subnE: "\u2ACB",
    subne: "\u228A",
    supE: "\u2AC6",
    supnE: "\u2ACC",
    supne: "\u228B",
    swarr: "\u2199",
    tau: "\u03C4",
    theta: "\u03B8",
    thetav: "\u03D1",
    tilde: "\u02DC",
    times: "\u00D7",
    triangle: "\u25B5",
    triangleq: "\u225C",
    upsi: "\u03C5",
    upuparrows: "\u21C8",
    veebar: "\u22BB",
    vellip: "\u22EE",
    weierp: "\u2118",
    xi: "\u03BE",
    yen: "\u00A5",
    zeta: "\u03B6",
    zigrarr: "\u21DD"
  };
  c.loadComplete("jax.js");
})(MathJax.InputJax.MathML, MathJax.Hub.Browser);
(function(i, b, e, g) {
  var h;
  var j, a, d;
  var f = "'Times New Roman',Times,STIXGeneral,serif";
  var m = {
    ".MJXp-script": { "font-size": ".8em" },
    ".MJXp-right": {
      "-webkit-transform-origin": "right",
      "-moz-transform-origin": "right",
      "-ms-transform-origin": "right",
      "-o-transform-origin": "right",
      "transform-origin": "right"
    },
    ".MJXp-bold": { "font-weight": "bold" },
    ".MJXp-italic": { "font-style": "italic" },
    ".MJXp-scr": { "font-family": "MathJax_Script," + f },
    ".MJXp-frak": { "font-family": "MathJax_Fraktur," + f },
    ".MJXp-sf": { "font-family": "MathJax_SansSerif," + f },
    ".MJXp-cal": { "font-family": "MathJax_Caligraphic," + f },
    ".MJXp-mono": { "font-family": "MathJax_Typewriter," + f },
    ".MJXp-largeop": { "font-size": "150%" },
    ".MJXp-largeop.MJXp-int": { "vertical-align": "-.2em" },
    ".MJXp-math": {
      display: "inline-block",
      "line-height": "1.2",
      "text-indent": "0",
      "font-family": f,
      "white-space": "nowrap",
      "border-collapse": "collapse"
    },
    ".MJXp-display": {
      display: "block",
      "text-align": "center",
      margin: "1em 0"
    },
    ".MJXp-math span": { display: "inline-block" },
    ".MJXp-box": { display: "block!important", "text-align": "center" },
    ".MJXp-box:after": { content: '" "' },
    ".MJXp-rule": { display: "block!important", "margin-top": ".1em" },
    ".MJXp-char": { display: "block!important" },
    ".MJXp-mo": { margin: "0 .15em" },
    ".MJXp-mfrac": { margin: "0 .125em", "vertical-align": ".25em" },
    ".MJXp-denom": { display: "inline-table!important", width: "100%" },
    ".MJXp-denom > *": { display: "table-row!important" },
    ".MJXp-surd": { "vertical-align": "top" },
    ".MJXp-surd > *": { display: "block!important" },
    ".MJXp-script-box > * ": { display: "table!important", height: "50%" },
    ".MJXp-script-box > * > *": {
      display: "table-cell!important",
      "vertical-align": "top"
    },
    ".MJXp-script-box > *:last-child > *": { "vertical-align": "bottom" },
    ".MJXp-script-box > * > * > *": { display: "block!important" },
    ".MJXp-mphantom": { visibility: "hidden" },
    ".MJXp-munderover, .MJXp-munder": { display: "inline-table!important" },
    ".MJXp-over": { display: "inline-block!important", "text-align": "center" },
    ".MJXp-over > *": { display: "block!important" },
    ".MJXp-munderover > *, .MJXp-munder > *": {
      display: "table-row!important"
    },
    ".MJXp-mtable": { "vertical-align": ".25em", margin: "0 .125em" },
    ".MJXp-mtable > *": {
      display: "inline-table!important",
      "vertical-align": "middle"
    },
    ".MJXp-mtr": { display: "table-row!important" },
    ".MJXp-mtd": {
      display: "table-cell!important",
      "text-align": "center",
      padding: ".5em 0 0 .5em"
    },
    ".MJXp-mtr > .MJXp-mtd:first-child": { "padding-left": 0 },
    ".MJXp-mtr:first-child > .MJXp-mtd": { "padding-top": 0 },
    ".MJXp-mlabeledtr": { display: "table-row!important" },
    ".MJXp-mlabeledtr > .MJXp-mtd:first-child": { "padding-left": 0 },
    ".MJXp-mlabeledtr:first-child > .MJXp-mtd": { "padding-top": 0 },
    ".MJXp-merror": {
      "background-color": "#FFFF88",
      color: "#CC0000",
      border: "1px solid #CC0000",
      padding: "1px 3px",
      "font-style": "normal",
      "font-size": "90%"
    }
  };
  (function() {
    for (var n = 0; n < 10; n++) {
      var o = "scaleX(." + n + ")";
      m[".MJXp-scale" + n] = {
        "-webkit-transform": o,
        "-moz-transform": o,
        "-ms-transform": o,
        "-o-transform": o,
        transform: o
      };
    }
  })();
  var k = 1000000;
  var c = "V",
    l = "H";
  g.Augment({
    settings: b.config.menuSettings,
    config: { styles: m },
    hideProcessedMath: false,
    maxStretchyParts: 1000,
    Config: function() {
      if (!this.require) {
        this.require = [];
      }
      this.SUPER(arguments).Config.call(this);
      var n = this.settings;
      if (n.scale) {
        this.config.scale = n.scale;
      }
      this.require.push(MathJax.OutputJax.extensionDir + "/MathEvents.js");
    },
    Startup: function() {
      j = MathJax.Extension.MathEvents.Event;
      a = MathJax.Extension.MathEvents.Touch;
      d = MathJax.Extension.MathEvents.Hover;
      this.ContextMenu = j.ContextMenu;
      this.Mousedown = j.AltContextMenu;
      this.Mouseover = d.Mouseover;
      this.Mouseout = d.Mouseout;
      this.Mousemove = d.Mousemove;
      var n = e.addElement(document.body, "div", { style: { width: "5in" } });
      this.pxPerInch = n.offsetWidth / 5;
      n.parentNode.removeChild(n);
      return i.Styles(this.config.styles, ["InitializePHTML", this]);
    },
    InitializePHTML: function() {},
    preTranslate: function(p) {
      var s = p.jax[this.id],
        t,
        q = s.length,
        u,
        r,
        v,
        o,
        n;
      for (t = 0; t < q; t++) {
        u = s[t];
        if (!u.parentNode) {
          continue;
        }
        r = u.previousSibling;
        if (
          r &&
          String(r.className).match(
            /^MathJax(_PHTML)?(_Display)?( MathJax_Process(ing|ed))?$/
          )
        ) {
          r.parentNode.removeChild(r);
        }
        n = u.MathJax.elementJax;
        if (!n) {
          continue;
        }
        n.PHTML = { display: n.root.Get("display") === "block" };
        v = o = e.Element("span", {
          className: "MathJax_PHTML",
          id: n.inputID + "-Frame",
          isMathJax: true,
          jaxID: this.id,
          oncontextmenu: j.Menu,
          onmousedown: j.Mousedown,
          onmouseover: j.Mouseover,
          onmouseout: j.Mouseout,
          onmousemove: j.Mousemove,
          onclick: j.Click,
          ondblclick: j.DblClick,
          onkeydown: j.Keydown,
          tabIndex: b.getTabOrder(n)
        });
        if (b.Browser.noContextMenu) {
          v.ontouchstart = a.start;
          v.ontouchend = a.end;
        }
        if (n.PHTML.display) {
          o = e.Element("div", { className: "MathJax_PHTML_Display" });
          o.appendChild(v);
        }
        o.className += " MathJax_Processing";
        u.parentNode.insertBefore(o, u);
      }
    },
    Translate: function(o, s) {
      if (!o.parentNode) {
        return;
      }
      var n = o.MathJax.elementJax,
        r = n.root,
        p = document.getElementById(n.inputID + "-Frame"),
        t = n.PHTML.display ? p.parentNode : p;
      this.initPHTML(r, p);
      try {
        r.toPreviewHTML(p);
      } catch (q) {
        if (q.restart) {
          while (p.firstChild) {
            p.removeChild(p.firstChild);
          }
        }
        throw q;
      }
      t.className = t.className.split(/ /)[0];
      if (this.hideProcessedMath) {
        t.className += " MathJax_Processed";
        if (o.MathJax.preview) {
          n.PHTML.preview = o.MathJax.preview;
          delete o.MathJax.preview;
        }
      }
    },
    postTranslate: function(s) {
      var o = s.jax[this.id];
      if (!this.hideProcessedMath) {
        return;
      }
      for (var q = 0, n = o.length; q < n; q++) {
        var p = o[q];
        if (p && p.MathJax.elementJax) {
          p.previousSibling.className = p.previousSibling.className.split(
            / /
          )[0];
          var r = p.MathJax.elementJax.PHTML;
          if (r.preview) {
            r.preview.innerHTML = "";
            p.MathJax.preview = r.preview;
            delete r.preview;
          }
        }
      }
    },
    getJaxFromMath: function(n) {
      if (n.parentNode.className.match(/MathJax_PHTML_Display/)) {
        n = n.parentNode;
      }
      do {
        n = n.nextSibling;
      } while (n && n.nodeName.toLowerCase() !== "script");
      return b.getJaxFor(n);
    },
    getHoverSpan: function(n, o) {
      return n.root.PHTMLspanElement();
    },
    getHoverBBox: function(n, q, r) {
      var s = n.root.PHTML,
        p = n.PHTML.outerEm;
      var o = { w: s.w * p, h: s.h * p, d: s.d * p };
      if (s.width) {
        o.width = s.width;
      }
      return o;
    },
    Zoom: function(o, u, s, n, r) {
      u.className = "MathJax";
      this.idPostfix = "-zoom";
      o.root.toPHTML(u, u);
      this.idPostfix = "";
      u.style.position = "absolute";
      if (!width) {
        s.style.position = "absolute";
      }
      var t = u.offsetWidth,
        q = u.offsetHeight,
        v = s.offsetHeight,
        p = s.offsetWidth;
      if (p === 0) {
        p = s.parentNode.offsetWidth;
      }
      u.style.position = s.style.position = "";
      return { Y: -j.getBBox(u).h, mW: p, mH: v, zW: t, zH: q };
    },
    initPHTML: function(o, n) {},
    Remove: function(n) {
      var o = document.getElementById(n.inputID + "-Frame");
      if (o) {
        if (n.PHTML.display) {
          o = o.parentNode;
        }
        o.parentNode.removeChild(o);
      }
      delete n.PHTML;
    },
    ID: 0,
    idPostfix: "",
    GetID: function() {
      this.ID++;
      return this.ID;
    },
    VARIANT: {
      bold: "MJXp-bold",
      italic: "MJXp-italic",
      "bold-italic": "MJXp-bold MJXp-italic",
      script: "MJXp-scr",
      "bold-script": "MJXp-scr MJXp-bold",
      fraktur: "MJXp-frak",
      "bold-fraktur": "MJXp-frak MJXp-bold",
      monospace: "MJXp-mono",
      "sans-serif": "MJXp-sf",
      "-tex-caligraphic": "MJXp-cal"
    },
    MATHSPACE: {
      veryverythinmathspace: 1 / 18,
      verythinmathspace: 2 / 18,
      thinmathspace: 3 / 18,
      mediummathspace: 4 / 18,
      thickmathspace: 5 / 18,
      verythickmathspace: 6 / 18,
      veryverythickmathspace: 7 / 18,
      negativeveryverythinmathspace: -1 / 18,
      negativeverythinmathspace: -2 / 18,
      negativethinmathspace: -3 / 18,
      negativemediummathspace: -4 / 18,
      negativethickmathspace: -5 / 18,
      negativeverythickmathspace: -6 / 18,
      negativeveryverythickmathspace: -7 / 18,
      thin: 0.08,
      medium: 0.1,
      thick: 0.15,
      infinity: k
    },
    TeX: { x_height: 0.430554 },
    pxPerInch: 72,
    em: 16,
    DELIMITERS: {
      "(": { dir: c },
      "{": { dir: c, w: 0.58 },
      "[": { dir: c },
      "|": { dir: c, w: 0.275 },
      ")": { dir: c },
      "}": { dir: c, w: 0.58 },
      "]": { dir: c },
      "/": { dir: c },
      "\\": { dir: c },
      "\u2223": { dir: c, w: 0.275 },
      "\u2225": { dir: c, w: 0.55 },
      "\u230A": { dir: c, w: 0.5 },
      "\u230B": { dir: c, w: 0.5 },
      "\u2308": { dir: c, w: 0.5 },
      "\u2309": { dir: c, w: 0.5 },
      "\u27E8": { dir: c, w: 0.5 },
      "\u27E9": { dir: c, w: 0.5 },
      "\u2191": { dir: c, w: 0.65 },
      "\u2193": { dir: c, w: 0.65 },
      "\u21D1": { dir: c, w: 0.75 },
      "\u21D3": { dir: c, w: 0.75 },
      "\u2195": { dir: c, w: 0.65 },
      "\u21D5": { dir: c, w: 0.75 },
      "\u27EE": { dir: c, w: 0.275 },
      "\u27EF": { dir: c, w: 0.275 },
      "\u23B0": { dir: c, w: 0.6 },
      "\u23B1": { dir: c, w: 0.6 }
    },
    REMAPACCENT: {
      "\u20D7": "\u2192",
      "'": "\u02CB",
      "`": "\u02CA",
      ".": "\u02D9",
      "^": "\u02C6",
      "-": "\u02C9",
      "~": "\u02DC",
      "\u00AF": "\u02C9",
      "\u00B0": "\u02DA",
      "\u00B4": "\u02CA",
      "\u0300": "\u02CB",
      "\u0301": "\u02CA",
      "\u0302": "\u02C6",
      "\u0303": "\u02DC",
      "\u0304": "\u02C9",
      "\u0305": "\u02C9",
      "\u0306": "\u02D8",
      "\u0307": "\u02D9",
      "\u0308": "\u00A8",
      "\u030C": "\u02C7"
    },
    REMAPACCENTUNDER: {},
    length2em: function(r, p) {
      if (typeof r !== "string") {
        r = r.toString();
      }
      if (r === "") {
        return "";
      }
      if (r === h.SIZE.NORMAL) {
        return 1;
      }
      if (r === h.SIZE.BIG) {
        return 2;
      }
      if (r === h.SIZE.SMALL) {
        return 0.71;
      }
      if (this.MATHSPACE[r]) {
        return this.MATHSPACE[r];
      }
      var o = r.match(
        /^\s*([-+]?(?:\.\d+|\d+(?:\.\d*)?))?(pt|em|ex|mu|px|pc|in|mm|cm|%)?/
      );
      var n = parseFloat(o[1] || "1"),
        q = o[2];
      if (p == null) {
        p = 1;
      }
      if (q === "em") {
        return n;
      }
      if (q === "ex") {
        return n * this.TeX.x_height;
      }
      if (q === "%") {
        return (n / 100) * p;
      }
      if (q === "px") {
        return n / this.em;
      }
      if (q === "pt") {
        return n / 10;
      }
      if (q === "pc") {
        return n * 1.2;
      }
      if (q === "in") {
        return (n * this.pxPerInch) / this.em;
      }
      if (q === "cm") {
        return (n * this.pxPerInch) / this.em / 2.54;
      }
      if (q === "mm") {
        return (n * this.pxPerInch) / this.em / 25.4;
      }
      if (q === "mu") {
        return n / 18;
      }
      return n * p;
    },
    Em: function(n) {
      if (Math.abs(n) < 0.001) {
        return "0em";
      }
      return n.toFixed(3).replace(/\.?0+$/, "") + "em";
    },
    arrayEntry: function(n, o) {
      return n[Math.max(0, Math.min(o, n.length - 1))];
    }
  });
  MathJax.Hub.Register.StartupHook("mml Jax Ready", function() {
    h = MathJax.ElementJax.mml;
    h.mbase.Augment({
      toPreviewHTML: function(o, n) {
        return this.PHTMLdefaultSpan(o, n);
      },
      PHTMLdefaultSpan: function(q, o) {
        if (!o) {
          o = {};
        }
        q = this.PHTMLcreateSpan(q);
        this.PHTMLhandleStyle(q);
        this.PHTMLhandleColor(q);
        if (this.isToken) {
          this.PHTMLhandleToken(q);
        }
        for (var p = 0, n = this.data.length; p < n; p++) {
          this.PHTMLaddChild(q, p, o);
        }
        return q;
      },
      PHTMLaddChild: function(p, o, n) {
        var q = this.data[o];
        if (q) {
          if (n.childSpans) {
            p = e.addElement(p, "span", { className: n.className });
          }
          q.toPreviewHTML(p);
          if (!n.noBBox) {
            this.PHTML.w += q.PHTML.w + q.PHTML.l + q.PHTML.r;
            if (q.PHTML.h > this.PHTML.h) {
              this.PHTML.h = q.PHTML.h;
            }
            if (q.PHTML.d > this.PHTML.d) {
              this.PHTML.d = q.PHTML.d;
            }
            if (q.PHTML.t > this.PHTML.t) {
              this.PHTML.t = q.PHTML.t;
            }
            if (q.PHTML.b > this.PHTML.b) {
              this.PHTML.b = q.PHTML.b;
            }
          }
        } else {
          if (n.forceChild) {
            e.addElement(p, "span");
          }
        }
      },
      PHTMLstretchChild: function(q, p, s) {
        var r = this.data[q];
        if (r && r.PHTMLcanStretch("Vertical", p, s)) {
          var t = this.PHTML,
            o = r.PHTML,
            n = o.w;
          r.PHTMLstretchV(p, s);
          t.w += o.w - n;
          if (o.h > t.h) {
            t.h = o.h;
          }
          if (o.d > t.d) {
            t.d = o.d;
          }
        }
      },
      PHTMLcreateSpan: function(n) {
        if (!this.PHTML) {
          this.PHTML = {};
        }
        this.PHTML = { w: 0, h: 0, d: 0, l: 0, r: 0, t: 0, b: 0 };
        if (this.inferred) {
          return n;
        }
        if (this.type === "mo" && this.data.join("") === "\u222B") {
          g.lastIsInt = true;
        } else {
          if (
            this.type !== "mspace" ||
            this.width !== "negativethinmathspace"
          ) {
            g.lastIsInt = false;
          }
        }
        if (!this.PHTMLspanID) {
          this.PHTMLspanID = g.GetID();
        }
        var o = this.id || "MJXp-Span-" + this.PHTMLspanID;
        return e.addElement(n, "span", {
          className: "MJXp-" + this.type,
          id: o
        });
      },
      PHTMLspanElement: function() {
        if (!this.PHTMLspanID) {
          return null;
        }
        return document.getElementById(
          this.id || "MJXp-Span-" + this.PHTMLspanID
        );
      },
      PHTMLhandleToken: function(o) {
        var n = this.getValues("mathvariant");
        if (n.mathvariant !== h.VARIANT.NORMAL) {
          o.className += " " + g.VARIANT[n.mathvariant];
        }
      },
      PHTMLhandleStyle: function(n) {
        if (this.style) {
          n.style.cssText = this.style;
        }
      },
      PHTMLhandleColor: function(n) {
        if (this.mathcolor) {
          n.style.color = this.mathcolor;
        }
        if (this.mathbackground) {
          n.style.backgroundColor = this.mathbackground;
        }
      },
      PHTMLhandleScriptlevel: function(n) {
        var o = this.Get("scriptlevel");
        if (o) {
          n.className += " MJXp-script";
        }
      },
      PHTMLhandleText: function(y, A) {
        var v, p;
        var z = 0,
          o = 0,
          q = 0;
        for (var s = 0, r = A.length; s < r; s++) {
          p = A.charCodeAt(s);
          v = A.charAt(s);
          if (p >= 55296 && p < 56319) {
            s++;
            p = ((p - 55296) << 10) + (A.charCodeAt(s) - 56320) + 65536;
          }
          var t = 0.7,
            u = 0.22,
            x = 0.5;
          if (p < 127) {
            if (v.match(/[A-Za-ehik-or-xz0-9]/)) {
              u = 0;
            }
            if (v.match(/[A-HK-Z]/)) {
              x = 0.67;
            } else {
              if (v.match(/[IJ]/)) {
                x = 0.36;
              }
            }
            if (v.match(/[acegm-su-z]/)) {
              t = 0.45;
            } else {
              if (v.match(/[ij]/)) {
                t = 0.75;
              }
            }
            if (v.match(/[ijlt]/)) {
              x = 0.28;
            }
          }
          if (g.DELIMITERS[v]) {
            x = g.DELIMITERS[v].w || 0.4;
          }
          if (t > z) {
            z = t;
          }
          if (u > o) {
            o = u;
          }
          q += x;
        }
        if (!this.CHML) {
          this.PHTML = {};
        }
        this.PHTML = { h: 0.9, d: 0.3, w: q, l: 0, r: 0, t: z, b: o };
        e.addText(y, A);
      },
      PHTMLbboxFor: function(o) {
        if (this.data[o] && this.data[o].PHTML) {
          return this.data[o].PHTML;
        }
        return { w: 0, h: 0, d: 0, l: 0, r: 0, t: 0, b: 0 };
      },
      PHTMLcanStretch: function(q, o, p) {
        if (this.isEmbellished()) {
          var n = this.Core();
          if (n && n !== this) {
            return n.PHTMLcanStretch(q, o, p);
          }
        }
        return false;
      },
      PHTMLstretchV: function(n, o) {},
      PHTMLstretchH: function(n) {},
      CoreParent: function() {
        var n = this;
        while (
          n &&
          n.isEmbellished() &&
          n.CoreMO() === this &&
          !n.isa(h.math)
        ) {
          n = n.Parent();
        }
        return n;
      },
      CoreText: function(n) {
        if (!n) {
          return "";
        }
        if (n.isEmbellished()) {
          return n.CoreMO().data.join("");
        }
        while (
          (n.isa(h.mrow) ||
            n.isa(h.TeXAtom) ||
            n.isa(h.mstyle) ||
            n.isa(h.mphantom)) &&
          n.data.length === 1 &&
          n.data[0]
        ) {
          n = n.data[0];
        }
        if (!n.isToken) {
          return "";
        } else {
          return n.data.join("");
        }
      }
    });
    h.chars.Augment({
      toPreviewHTML: function(n) {
        var o = this.toString().replace(/[\u2061-\u2064]/g, "");
        this.PHTMLhandleText(n, o);
      }
    });
    h.entity.Augment({
      toPreviewHTML: function(n) {
        var o = this.toString().replace(/[\u2061-\u2064]/g, "");
        this.PHTMLhandleText(n, o);
      }
    });
    h.math.Augment({
      toPreviewHTML: function(n) {
        n = this.PHTMLdefaultSpan(n);
        if (this.Get("display") === "block") {
          n.className += " MJXp-display";
        }
        return n;
      }
    });
    h.mo.Augment({
      toPreviewHTML: function(o) {
        o = this.PHTMLdefaultSpan(o);
        this.PHTMLadjustAccent(o);
        var n = this.getValues(
          "lspace",
          "rspace",
          "scriptlevel",
          "displaystyle",
          "largeop"
        );
        if (n.scriptlevel === 0) {
          this.PHTML.l = g.length2em(n.lspace);
          this.PHTML.r = g.length2em(n.rspace);
          o.style.marginLeft = g.Em(this.PHTML.l);
          o.style.marginRight = g.Em(this.PHTML.r);
        } else {
          this.PHTML.l = 0.15;
          this.PHTML.r = 0.1;
        }
        if (n.displaystyle && n.largeop) {
          var p = e.Element("span", { className: "MJXp-largeop" });
          p.appendChild(o.firstChild);
          o.appendChild(p);
          this.PHTML.h *= 1.2;
          this.PHTML.d *= 1.2;
          if (this.data.join("") === "\u222B") {
            p.className += " MJXp-int";
          }
        }
        return o;
      },
      PHTMLadjustAccent: function(p) {
        var o = this.CoreParent();
        if (
          o &&
          o.isa(h.munderover) &&
          this.CoreText(o.data[o.base]).length === 1
        ) {
          var q = o.data[o.over],
            n = o.data[o.under];
          var s = this.data.join(""),
            r;
          if (q && this === q.CoreMO() && o.Get("accent")) {
            r = g.REMAPACCENT[s];
          } else {
            if (n && this === n.CoreMO() && o.Get("accentunder")) {
              r = g.REMAPACCENTUNDER[s];
            }
          }
          if (r) {
            s = p.innerHTML = r;
          }
          if (s.match(/[\u02C6-\u02DC\u00A8]/)) {
            this.PHTML.acc = -0.52;
          } else {
            if (s === "\u2192") {
              this.PHTML.acc = -0.15;
              this.PHTML.vec = true;
            }
          }
        }
      },
      PHTMLcanStretch: function(q, o, p) {
        if (!this.Get("stretchy")) {
          return false;
        }
        var r = this.data.join("");
        if (r.length > 1) {
          return false;
        }
        r = g.DELIMITERS[r];
        var n = r && r.dir === q.substr(0, 1);
        if (n) {
          n =
            this.PHTML.h !== o ||
            this.PHTML.d !== p ||
            (this.Get("minsize", true) || this.Get("maxsize", true));
        }
        return n;
      },
      PHTMLstretchV: function(p, u) {
        var o = this.PHTMLspanElement(),
          t = this.PHTML;
        var n = this.getValues("symmetric", "maxsize", "minsize");
        if (n.symmetric) {
          l = 2 * Math.max(p - 0.25, u + 0.25);
        } else {
          l = p + u;
        }
        n.maxsize = g.length2em(n.maxsize, t.h + t.d);
        n.minsize = g.length2em(n.minsize, t.h + t.d);
        l = Math.max(n.minsize, Math.min(n.maxsize, l));
        var s = l / (t.h + t.d - 0.3);
        var q = e.Element("span", { style: { "font-size": g.Em(s) } });
        if (s > 1.25) {
          var r = Math.ceil((1.25 / s) * 10);
          q.className = "MJXp-right MJXp-scale" + r;
          q.style.marginLeft = g.Em(t.w * (r / 10 - 1) + 0.07);
          t.w *= (s * r) / 10;
        }
        q.appendChild(o.firstChild);
        o.appendChild(q);
        if (n.symmetric) {
          o.style.verticalAlign = g.Em(0.25 * (1 - s));
        }
      }
    });
    h.mspace.Augment({
      toPreviewHTML: function(q) {
        q = this.PHTMLdefaultSpan(q);
        var o = this.getValues("height", "depth", "width");
        var n = g.length2em(o.width),
          p = g.length2em(o.height),
          s = g.length2em(o.depth);
        var r = this.PHTML;
        r.w = n;
        r.h = p;
        r.d = s;
        if (n < 0) {
          if (!g.lastIsInt) {
            q.style.marginLeft = g.Em(n);
          }
          n = 0;
        }
        q.style.width = g.Em(n);
        q.style.height = g.Em(p + s);
        if (s) {
          q.style.verticalAlign = g.Em(-s);
        }
        return q;
      }
    });
    h.mpadded.Augment({
      toPreviewHTML: function(u) {
        u = this.PHTMLdefaultSpan(u, {
          childSpans: true,
          className: "MJXp-box",
          forceChild: true
        });
        var o = u.firstChild;
        var v = this.getValues("width", "height", "depth", "lspace", "voffset");
        var s = this.PHTMLdimen(v.lspace);
        var q = 0,
          n = 0,
          t = s.len,
          r = -s.len,
          p = 0;
        if (v.width !== "") {
          s = this.PHTMLdimen(v.width, "w", 0);
          if (s.pm) {
            r += s.len;
          } else {
            u.style.width = g.Em(s.len);
          }
        }
        if (v.height !== "") {
          s = this.PHTMLdimen(v.height, "h", 0);
          if (!s.pm) {
            q += -this.PHTMLbboxFor(0).h;
          }
          q += s.len;
        }
        if (v.depth !== "") {
          s = this.PHTMLdimen(v.depth, "d", 0);
          if (!s.pm) {
            n += -this.PHTMLbboxFor(0).d;
            p += -s.len;
          }
          n += s.len;
        }
        if (v.voffset !== "") {
          s = this.PHTMLdimen(v.voffset);
          q -= s.len;
          n += s.len;
          p += s.len;
        }
        if (q) {
          o.style.marginTop = g.Em(q);
        }
        if (n) {
          o.style.marginBottom = g.Em(n);
        }
        if (t) {
          o.style.marginLeft = g.Em(t);
        }
        if (r) {
          o.style.marginRight = g.Em(r);
        }
        if (p) {
          u.style.verticalAlign = g.Em(p);
        }
        return u;
      },
      PHTMLdimen: function(q, r, n) {
        if (n == null) {
          n = -k;
        }
        q = String(q);
        var o = q.match(/width|height|depth/);
        var p = o ? this.PHTML[o[0].charAt(0)] : r ? this.PHTML[r] : 0;
        return { len: g.length2em(q, p) || 0, pm: !!q.match(/^[-+]/) };
      }
    });
    h.munderover.Augment({
      toPreviewHTML: function(r) {
        var t = this.getValues(
          "displaystyle",
          "accent",
          "accentunder",
          "align"
        );
        var n = this.data[this.base];
        if (
          !t.displaystyle &&
          n != null &&
          (n.movablelimits || n.CoreMO().Get("movablelimits"))
        ) {
          r = h.msubsup.prototype.toPreviewHTML.call(this, r);
          r.className = r.className.replace(/munderover/, "msubsup");
          return r;
        }
        r = this.PHTMLdefaultSpan(r, {
          childSpans: true,
          className: "",
          noBBox: true
        });
        var p = this.PHTMLbboxFor(this.over),
          v = this.PHTMLbboxFor(this.under),
          u = this.PHTMLbboxFor(this.base),
          s = this.PHTML,
          o = p.acc;
        if (this.data[this.over]) {
          if (r.lastChild.firstChild) {
            r.lastChild.firstChild.style.marginLeft = p.l = r.lastChild.firstChild.style.marginRight = p.r = 0;
          }
          var q = e.Element("span", {}, [["span", { className: "MJXp-over" }]]);
          q.firstChild.appendChild(r.lastChild);
          if (r.childNodes.length > (this.data[this.under] ? 1 : 0)) {
            q.firstChild.appendChild(r.firstChild);
          }
          this.data[this.over].PHTMLhandleScriptlevel(q.firstChild.firstChild);
          if (o != null) {
            if (p.vec) {
              q.firstChild.firstChild.firstChild.style.fontSize = "60%";
              p.h *= 0.6;
              p.d *= 0.6;
              p.w *= 0.6;
            }
            o = o - p.d + 0.1;
            if (u.t != null) {
              o += u.t - u.h;
            }
            q.firstChild.firstChild.style.marginBottom = g.Em(o);
          }
          if (r.firstChild) {
            r.insertBefore(q, r.firstChild);
          } else {
            r.appendChild(q);
          }
        }
        if (this.data[this.under]) {
          if (r.lastChild.firstChild) {
            r.lastChild.firstChild.style.marginLeft = v.l = r.lastChild.firstChild.marginRight = v.r = 0;
          }
          this.data[this.under].PHTMLhandleScriptlevel(r.lastChild);
        }
        s.w = Math.max(0.8 * p.w, 0.8 * v.w, u.w);
        s.h = 0.8 * (p.h + p.d + (o || 0)) + u.h;
        s.d = u.d + 0.8 * (v.h + v.d);
        return r;
      }
    });
    h.msubsup.Augment({
      toPreviewHTML: function(q) {
        q = this.PHTMLdefaultSpan(q, { noBBox: true });
        if (!this.data[this.base]) {
          if (q.firstChild) {
            q.insertBefore(e.Element("span"), q.firstChild);
          } else {
            q.appendChild(e.Element("span"));
          }
        }
        var s = this.data[this.base],
          p = this.data[this.sub],
          n = this.data[this.sup];
        if (!s) {
          s = { bbox: { h: 0.8, d: 0.2 } };
        }
        q.firstChild.style.marginRight = ".05em";
        var o = Math.max(0.4, s.PHTML.h - 0.4),
          u = Math.max(0.2, s.PHTML.d + 0.1);
        var t = this.PHTML;
        if (n && p) {
          var r = e.Element(
            "span",
            {
              className: "MJXp-script-box",
              style: {
                height: g.Em(o + n.PHTML.h * 0.8 + u + p.PHTML.d * 0.8),
                "vertical-align": g.Em(-u - p.PHTML.d * 0.8)
              }
            },
            [
              [
                "span",
                {},
                [
                  [
                    "span",
                    {},
                    [
                      [
                        "span",
                        {
                          style: { "margin-bottom": g.Em(-(n.PHTML.d - 0.05)) }
                        }
                      ]
                    ]
                  ]
                ]
              ],
              [
                "span",
                {},
                [
                  [
                    "span",
                    {},
                    [
                      [
                        "span",
                        { style: { "margin-top": g.Em(-(n.PHTML.h - 0.05)) } }
                      ]
                    ]
                  ]
                ]
              ]
            ]
          );
          p.PHTMLhandleScriptlevel(r.firstChild);
          n.PHTMLhandleScriptlevel(r.lastChild);
          r.firstChild.firstChild.firstChild.appendChild(q.lastChild);
          r.lastChild.firstChild.firstChild.appendChild(q.lastChild);
          q.appendChild(r);
          t.h = Math.max(s.PHTML.h, n.PHTML.h * 0.8 + o);
          t.d = Math.max(s.PHTML.d, p.PHTML.d * 0.8 + u);
          t.w = s.PHTML.w + Math.max(n.PHTML.w, p.PHTML.w) + 0.07;
        } else {
          if (n) {
            q.lastChild.style.verticalAlign = g.Em(o);
            n.PHTMLhandleScriptlevel(q.lastChild);
            t.h = Math.max(s.PHTML.h, n.PHTML.h * 0.8 + o);
            t.d = Math.max(s.PHTML.d, n.PHTML.d * 0.8 - o);
            t.w = s.PHTML.w + n.PHTML.w + 0.07;
          } else {
            if (p) {
              q.lastChild.style.verticalAlign = g.Em(-u);
              p.PHTMLhandleScriptlevel(q.lastChild);
              t.h = Math.max(s.PHTML.h, p.PHTML.h * 0.8 - u);
              t.d = Math.max(s.PHTML.d, p.PHTML.d * 0.8 + u);
              t.w = s.PHTML.w + p.PHTML.w + 0.07;
            }
          }
        }
        return q;
      }
    });
    h.mfrac.Augment({
      toPreviewHTML: function(r) {
        r = this.PHTMLdefaultSpan(r, {
          childSpans: true,
          className: "MJXp-box",
          forceChild: true,
          noBBox: true
        });
        var o = this.getValues("linethickness", "displaystyle");
        if (!o.displaystyle) {
          if (this.data[0]) {
            this.data[0].PHTMLhandleScriptlevel(r.firstChild);
          }
          if (this.data[1]) {
            this.data[1].PHTMLhandleScriptlevel(r.lastChild);
          }
        }
        var n = e.Element("span", { className: "MJXp-box" }, [
          [
            "span",
            { className: "MJXp-denom" },
            [
              [
                "span",
                {},
                [["span", { className: "MJXp-rule", style: { height: "1em" } }]]
              ],
              ["span"]
            ]
          ]
        ]);
        n.firstChild.lastChild.appendChild(r.lastChild);
        r.appendChild(n);
        var s = this.PHTMLbboxFor(0),
          p = this.PHTMLbboxFor(1),
          v = this.PHTML;
        v.w = Math.max(s.w, p.w) * 0.8;
        v.h = s.h + s.d + 0.1 + 0.25;
        v.d = p.h + p.d - 0.25;
        v.l = v.r = 0.125;
        o.linethickness = Math.max(0, g.length2em(o.linethickness || "0", 0));
        if (o.linethickness) {
          var u = n.firstChild.firstChild.firstChild;
          var q = g.Em(o.linethickness);
          u.style.borderTop = "none";
          u.style.borderBottom =
            (o.linethickness < 0.15 ? "1px" : q) + " solid";
          u.style.margin = q + " 0";
          q = o.linethickness;
          n.style.marginTop = g.Em(3 * q - 1.2);
          r.style.verticalAlign = g.Em(1.5 * q + 0.1);
          v.h += 1.5 * q - 0.1;
          v.d += 1.5 * q;
        } else {
          n.style.marginTop = "-.7em";
        }
        return r;
      }
    });
    h.msqrt.Augment({
      toPreviewHTML: function(n) {
        n = this.PHTMLdefaultSpan(n, {
          childSpans: true,
          className: "MJXp-box",
          forceChild: true,
          noBBox: true
        });
        this.PHTMLlayoutRoot(n, n.firstChild);
        return n;
      },
      PHTMLlayoutRoot: function(u, n) {
        var v = this.PHTMLbboxFor(0);
        var q = Math.ceil((v.h + v.d + 0.14) * 100),
          w = g.Em(14 / q);
        var r = e.Element("span", { className: "MJXp-surd" }, [
          [
            "span",
            { style: { "font-size": q + "%", "margin-top": w } },
            ["\u221A"]
          ]
        ]);
        var s = e.Element("span", { className: "MJXp-root" }, [
          [
            "span",
            { className: "MJXp-rule", style: { "border-top": ".08em solid" } }
          ]
        ]);
        var p = ((1.2 / 2.2) * q) / 100;
        if (q > 150) {
          var o = Math.ceil((150 / q) * 10);
          r.firstChild.className = "MJXp-right MJXp-scale" + o;
          r.firstChild.style.marginLeft = g.Em(((p * (o / 10 - 1)) / q) * 100);
          p = (p * o) / 10;
          s.firstChild.style.borderTopWidth = g.Em(0.08 / Math.sqrt(o / 10));
        }
        s.appendChild(n);
        u.appendChild(r);
        u.appendChild(s);
        this.PHTML.h = v.h + 0.18;
        this.PHTML.d = v.d;
        this.PHTML.w = v.w + p;
        return u;
      }
    });
    h.mroot.Augment({
      toPreviewHTML: function(q) {
        q = this.PHTMLdefaultSpan(q, {
          childSpans: true,
          className: "MJXp-box",
          forceChild: true,
          noBBox: true
        });
        var p = this.PHTMLbboxFor(1),
          n = q.removeChild(q.lastChild);
        var t = this.PHTMLlayoutRoot(e.Element("span"), q.firstChild);
        n.className = "MJXp-script";
        var u = parseInt(t.firstChild.firstChild.style.fontSize);
        var o = 0.55 * (u / 120) + p.d * 0.8,
          s = -0.6 * (u / 120);
        if (u > 150) {
          s *= (0.95 * Math.ceil((150 / u) * 10)) / 10;
        }
        n.style.marginRight = g.Em(s);
        n.style.verticalAlign = g.Em(o);
        if (-s > p.w * 0.8) {
          n.style.marginLeft = g.Em(-s - p.w * 0.8);
        }
        q.appendChild(n);
        q.appendChild(t);
        this.PHTML.w += Math.max(0, p.w * 0.8 + s);
        this.PHTML.h = Math.max(this.PHTML.h, p.h * 0.8 + o);
        return q;
      },
      PHTMLlayoutRoot: h.msqrt.prototype.PHTMLlayoutRoot
    });
    h.mfenced.Augment({
      toPreviewHTML: function(q) {
        q = this.PHTMLcreateSpan(q);
        this.PHTMLhandleStyle(q);
        this.PHTMLhandleColor(q);
        this.addFakeNodes();
        this.PHTMLaddChild(q, "open", {});
        for (var p = 0, n = this.data.length; p < n; p++) {
          this.PHTMLaddChild(q, "sep" + p, {});
          this.PHTMLaddChild(q, p, {});
        }
        this.PHTMLaddChild(q, "close", {});
        var o = this.PHTML.h,
          r = this.PHTML.d;
        this.PHTMLstretchChild("open", o, r);
        for (p = 0, n = this.data.length; p < n; p++) {
          this.PHTMLstretchChild("sep" + p, o, r);
          this.PHTMLstretchChild(p, o, r);
        }
        this.PHTMLstretchChild("close", o, r);
        return q;
      }
    });
    h.mrow.Augment({
      toPreviewHTML: function(q) {
        q = this.PHTMLdefaultSpan(q);
        var p = this.PHTML.h,
          r = this.PHTML.d;
        for (var o = 0, n = this.data.length; o < n; o++) {
          this.PHTMLstretchChild(o, p, r);
        }
        return q;
      }
    });
    h.mstyle.Augment({
      toPreviewHTML: function(n) {
        n = this.PHTMLdefaultSpan(n);
        this.PHTMLhandleScriptlevel(n);
        return n;
      }
    });
    h.TeXAtom.Augment({
      toPreviewHTML: function(n) {
        n = this.PHTMLdefaultSpan(n);
        n.className = "MJXp-mrow";
        return n;
      }
    });
    h.mtable.Augment({
      toPreviewHTML: function(E) {
        E = this.PHTMLdefaultSpan(E, { noBBox: true });
        var r = this.getValues(
          "columnalign",
          "rowalign",
          "columnspacing",
          "rowspacing",
          "columnwidth",
          "equalcolumns",
          "equalrows",
          "columnlines",
          "rowlines",
          "frame",
          "framespacing",
          "align",
          "width"
        );
        var u = MathJax.Hub.SplitList,
          F,
          A,
          D,
          z;
        var N = u(r.columnspacing),
          w = u(r.rowspacing),
          L = u(r.columnalign),
          t = u(r.rowalign);
        for (F = 0, A = N.length; F < A; F++) {
          N[F] = g.length2em(N[F]);
        }
        for (F = 0, A = w.length; F < A; F++) {
          w[F] = g.length2em(w[F]);
        }
        var K = e.Element("span");
        while (E.firstChild) {
          K.appendChild(E.firstChild);
        }
        E.appendChild(K);
        var y = 0,
          s = 0;
        for (F = 0, A = this.data.length; F < A; F++) {
          var v = this.data[F];
          if (v) {
            var J = g.arrayEntry(w, F - 1),
              C = g.arrayEntry(t, F);
            var x = v.PHTML,
              q = v.PHTMLspanElement();
            q.style.verticalAlign = C;
            var B = v.type === "mlabeledtr" ? 1 : 0;
            for (D = 0, z = v.data.length; D < z - B; D++) {
              var p = v.data[D + B];
              if (p) {
                var M = g.arrayEntry(N, D - 1),
                  G = g.arrayEntry(L, D);
                var I = p.PHTMLspanElement();
                if (D) {
                  x.w += M;
                  I.style.paddingLeft = g.Em(M);
                }
                if (F) {
                  I.style.paddingTop = g.Em(J);
                }
                I.style.textAlign = G;
              }
            }
            y += x.h + x.d;
            if (F) {
              y += J;
            }
            if (x.w > s) {
              s = x.w;
            }
          }
        }
        var o = this.PHTML;
        o.w = s;
        o.h = y / 2 + 0.25;
        o.d = y / 2 - 0.25;
        o.l = o.r = 0.125;
        return E;
      }
    });
    h.mlabeledtr.Augment({
      PHTMLdefaultSpan: function(q, o) {
        if (!o) {
          o = {};
        }
        q = this.PHTMLcreateSpan(q);
        this.PHTMLhandleStyle(q);
        this.PHTMLhandleColor(q);
        if (this.isToken) {
          this.PHTMLhandleToken(q);
        }
        for (var p = 1, n = this.data.length; p < n; p++) {
          this.PHTMLaddChild(q, p, o);
        }
        return q;
      }
    });
    h.semantics.Augment({
      toPreviewHTML: function(n) {
        n = this.PHTMLcreateSpan(n);
        if (this.data[0]) {
          this.data[0].toPreviewHTML(n);
          MathJax.Hub.Insert(this.data[0].PHTML || {}, this.PHTML);
        }
        return n;
      }
    });
    h.annotation.Augment({ toPreviewHTML: function(n) {} });
    h["annotation-xml"].Augment({ toPreviewHTML: function(n) {} });
    MathJax.Hub.Register.StartupHook("onLoad", function() {
      setTimeout(MathJax.Callback(["loadComplete", g, "jax.js"]), 0);
    });
  });
  MathJax.Hub.Register.StartupHook("End Cookie", function() {
    if (b.config.menuSettings.zoom !== "None") {
      i.Require("[MathJax]/extensions/MathZoom.js");
    }
  });
})(MathJax.Ajax, MathJax.Hub, MathJax.HTML, MathJax.OutputJax.PreviewHTML);
(function(b, g, f) {
  var c = b.config.menuSettings;
  var e = MathJax.OutputJax;
  var a = f.isMSIE && (document.documentMode || 0) < 8;
  var d = (MathJax.Extension["fast-preview"] = {
    version: "2.7.5",
    enabled: true,
    config: b.CombineConfig("fast-preview", {
      Chunks: { EqnChunk: 10000, EqnChunkFactor: 1, EqnChunkDelay: 0 },
      color: "inherit!important",
      updateTime: 30,
      updateDelay: 6,
      messageStyle: "none",
      disabled: f.isMSIE && !f.versionAtLeast("8.0")
    }),
    Config: function() {
      if (b.config["CHTML-preview"]) {
        MathJax.Hub.Config({ "fast-preview": b.config["CHTML-preview"] });
      }
      var m, j, k, h, l;
      var i = this.config;
      if (!i.disabled && c.FastPreview == null) {
        b.Config({ menuSettings: { FastPreview: true } });
      }
      if (c.FastPreview) {
        MathJax.Ajax.Styles({
          ".MathJax_Preview .MJXf-math": { color: i.color }
        });
        b.Config({ "HTML-CSS": i.Chunks, CommonHTML: i.Chunks, SVG: i.Chunks });
      }
      b.Register.MessageHook("Begin Math Output", function() {
        if (!h && d.Active()) {
          m = b.processUpdateTime;
          j = b.processUpdateDelay;
          k = b.config.messageStyle;
          b.processUpdateTime = i.updateTime;
          b.processUpdateDelay = i.updateDelay;
          b.Config({ messageStyle: i.messageStyle });
          MathJax.Message.Clear(0, 0);
          l = true;
        }
      });
      b.Register.MessageHook("End Math Output", function() {
        if (!h && l) {
          b.processUpdateTime = m;
          b.processUpdateDelay = j;
          b.Config({ messageStyle: k });
          h = true;
        }
      });
    },
    Disable: function() {
      this.enabled = false;
    },
    Enable: function() {
      this.enabled = true;
    },
    Active: function() {
      return (
        c.FastPreview && this.enabled && !(e[c.renderer] || {}).noFastPreview
      );
    },
    Preview: function(h) {
      if (!this.Active() || !h.script.parentNode) {
        return;
      }
      var i = h.script.MathJax.preview || h.script.previousSibling;
      if (!i || i.className !== MathJax.Hub.config.preRemoveClass) {
        i = g.Element("span", { className: MathJax.Hub.config.preRemoveClass });
        h.script.parentNode.insertBefore(i, h.script);
        h.script.MathJax.preview = i;
      }
      i.innerHTML = "";
      i.style.color = a ? "black" : "inherit";
      return this.postFilter(i, h);
    },
    postFilter: function(j, i) {
      if (!i.math.root.toPreviewHTML) {
        var h = MathJax.Callback.Queue();
        h.Push(
          [
            "Require",
            MathJax.Ajax,
            "[MathJax]/jax/output/PreviewHTML/config.js"
          ],
          ["Require", MathJax.Ajax, "[MathJax]/jax/output/PreviewHTML/jax.js"]
        );
        b.RestartAfter(h.Push({}));
      }
      i.math.root.toPreviewHTML(j);
    },
    Register: function(h) {
      b.Register.StartupHook(h + " Jax Require", function() {
        var i = MathJax.InputJax[h];
        i.postfilterHooks.Add(
          ["Preview", MathJax.Extension["fast-preview"]],
          50
        );
      });
    }
  });
  d.Register("TeX");
  d.Register("MathML");
  d.Register("AsciiMath");
  b.Register.StartupHook("End Config", ["Config", d]);
  b.Startup.signal.Post("fast-preview Ready");
})(MathJax.Hub, MathJax.HTML, MathJax.Hub.Browser);
MathJax.Ajax.loadComplete("[MathJax]/extensions/fast-preview.js");
(function(a, e, b, f) {
  var c = b.config.menuSettings;
  var d = (MathJax.Extension.AssistiveMML = {
    version: "2.7.5",
    config: b.CombineConfig("AssistiveMML", {
      disabled: false,
      styles: {
        ".MJX_Assistive_MathML": {
          position: "absolute!important",
          top: 0,
          left: 0,
          clip:
            b.Browser.isMSIE && (document.documentMode || 0) < 8
              ? "rect(1px 1px 1px 1px)"
              : "rect(1px, 1px, 1px, 1px)",
          padding: "1px 0 0 0!important",
          border: "0!important",
          height: "1px!important",
          width: "1px!important",
          overflow: "hidden!important",
          display: "block!important",
          "-webkit-touch-callout": "none",
          "-webkit-user-select": "none",
          "-khtml-user-select": "none",
          "-moz-user-select": "none",
          "-ms-user-select": "none",
          "user-select": "none"
        },
        ".MJX_Assistive_MathML.MJX_Assistive_MathML_Block": {
          width: "100%!important"
        }
      }
    }),
    Config: function() {
      if (!this.config.disabled && c.assistiveMML == null) {
        b.Config({ menuSettings: { assistiveMML: true } });
      }
      a.Styles(this.config.styles);
      b.Register.MessageHook("End Math", function(g) {
        if (c.assistiveMML) {
          return d.AddAssistiveMathML(g[1]);
        }
      });
    },
    AddAssistiveMathML: function(g) {
      var h = { jax: b.getAllJax(g), i: 0, callback: MathJax.Callback({}) };
      this.HandleMML(h);
      return h.callback;
    },
    RemoveAssistiveMathML: function(k) {
      var h = b.getAllJax(k),
        l;
      for (var j = 0, g = h.length; j < g; j++) {
        l = document.getElementById(h[j].inputID + "-Frame");
        if (l && l.getAttribute("data-mathml")) {
          l.removeAttribute("data-mathml");
          if (
            l.lastChild &&
            l.lastChild.className.match(/MJX_Assistive_MathML/)
          ) {
            l.removeChild(l.lastChild);
          }
        }
      }
    },
    HandleMML: function(l) {
      var g = l.jax.length,
        h,
        i,
        n,
        j;
      while (l.i < g) {
        h = l.jax[l.i];
        n = document.getElementById(h.inputID + "-Frame");
        if (
          h.outputJax !== "NativeMML" &&
          h.outputJax !== "PlainSource" &&
          n &&
          !n.getAttribute("data-mathml")
        ) {
          try {
            i = h.root
              .toMathML("")
              .replace(/\n */g, "")
              .replace(/<!--.*?-->/g, "");
          } catch (k) {
            if (!k.restart) {
              throw k;
            }
            return MathJax.Callback.After(["HandleMML", this, l], k.restart);
          }
          n.setAttribute("data-mathml", i);
          j = f.addElement(n, "span", {
            isMathJax: true,
            unselectable: "on",
            className:
              "MJX_Assistive_MathML" +
              (h.root.Get("display") === "block"
                ? " MJX_Assistive_MathML_Block"
                : "")
          });
          try {
            j.innerHTML = i;
          } catch (k) {}
          n.style.position = "relative";
          n.setAttribute("role", "presentation");
          n.firstChild.setAttribute("aria-hidden", "true");
          j.setAttribute("role", "presentation");
        }
        l.i++;
      }
      l.callback();
    }
  });
  b.Startup.signal.Post("AssistiveMML Ready");
})(MathJax.Ajax, MathJax.Callback, MathJax.Hub, MathJax.HTML);
MathJax.Callback.Queue(
  ["Require", MathJax.Ajax, "[MathJax]/extensions/toMathML.js"],
  ["loadComplete", MathJax.Ajax, "[MathJax]/extensions/AssistiveMML.js"],
  function() {
    MathJax.Hub.Register.StartupHook("End Config", [
      "Config",
      MathJax.Extension.AssistiveMML
    ]);
  }
);
!(function(a, b) {
  var c,
    d,
    e = a.config.menuSettings,
    f = Function.prototype.bind
      ? function(a, b) {
          return a.bind(b);
        }
      : function(a, b) {
          return function() {
            a.apply(b, arguments);
          };
        },
    g =
      Object.keys ||
      function(a) {
        var b = [];
        for (var c in a) a.hasOwnProperty(c) && b.push(c);
        return b;
      },
    h = MathJax.Ajax.config.path;
  h.a11y || (h.a11y = a.config.root + "/extensions/a11y");
  var i = (b["accessibility-menu"] = {
      version: "1.5.0",
      prefix: "",
      defaults: {},
      modules: [],
      MakeOption: function(a) {
        return i.prefix + a;
      },
      GetOption: function(a) {
        return e[i.MakeOption(a)];
      },
      AddDefaults: function() {
        for (var a, b = g(i.defaults), c = 0; (a = b[c]); c++) {
          var d = i.MakeOption(a);
          void 0 === e[d] && (e[d] = i.defaults[a]);
        }
      },
      AddMenu: function() {
        for (
          var a, b = Array(this.modules.length), e = 0;
          (a = this.modules[e]);
          e++
        )
          b[e] = a.placeHolder;
        var f = d.FindId("Accessibility");
        if (f)
          b.unshift(c.RULE()), f.submenu.items.push.apply(f.submenu.items, b);
        else {
          var g = (d.FindId("Settings", "Renderer") || {}).submenu;
          g &&
            (b.unshift(c.RULE()),
            b.unshift(g.items.pop()),
            b.unshift(g.items.pop())),
            b.unshift("Accessibility");
          var f = c.SUBMENU.apply(c.SUBMENU, b),
            h = d.IndexOfId("Locale");
          h ? d.items.splice(h, 0, f) : d.items.push(c.RULE(), f);
        }
      },
      Register: function(a) {
        (i.defaults[a.option] = !1), i.modules.push(a);
      },
      Startup: function() {
        (c = MathJax.Menu.ITEM), (d = MathJax.Menu.menu);
        for (var a, b = 0; (a = this.modules[b]); b++) a.CreateMenu();
        this.AddMenu();
      },
      LoadExtensions: function() {
        for (var b, c = [], d = 0; (b = this.modules[d]); d++)
          e[b.option] && c.push(b.module);
        return c.length ? a.Startup.loadArray(c) : null;
      }
    }),
    j = (MathJax.Extension.ModuleLoader = MathJax.Object.Subclass({
      option: "",
      name: ["", ""],
      module: "",
      placeHolder: null,
      submenu: !1,
      extension: null,
      Init: function(a, b, c, d, e) {
        (this.option = a),
          (this.name = [b.replace(/ /g, ""), b]),
          (this.module = c),
          (this.extension = d),
          (this.submenu = e || !1);
      },
      CreateMenu: function() {
        var a = f(this.Load, this);
        this.submenu
          ? (this.placeHolder = c.SUBMENU(
              this.name,
              c.CHECKBOX(["Activate", "Activate"], i.MakeOption(this.option), {
                action: a
              }),
              c.RULE(),
              c.COMMAND(["OptionsWhenActive", "(Options when Active)"], null, {
                disabled: !0
              })
            ))
          : (this.placeHolder = c.CHECKBOX(
              this.name,
              i.MakeOption(this.option),
              { action: a }
            ));
      },
      Load: function() {
        a.Queue(["Require", MathJax.Ajax, this.module, ["Enable", this]]);
      },
      Enable: function(a) {
        var b = MathJax.Extension[this.extension];
        b && (b.Enable(!0, !0), MathJax.Menu.saveCookie());
      }
    }));
  i.Register(
    j("collapsible", "Collapsible Math", "[a11y]/collapsible.js", "collapsible")
  ),
    i.Register(
      j(
        "autocollapse",
        "Auto Collapse",
        "[a11y]/auto-collapse.js",
        "auto-collapse"
      )
    ),
    i.Register(j("explorer", "Explorer", "[a11y]/explorer.js", "explorer", !0)),
    i.AddDefaults(),
    a.Register.StartupHook(
      "End Extensions",
      function() {
        a.Register.StartupHook(
          "MathMenu Ready",
          function() {
            i.Startup(), a.Startup.signal.Post("Accessibility Menu Ready");
          },
          5
        );
      },
      5
    ),
    MathJax.Hub.Register.StartupHook("End Cookie", function() {
      MathJax.Callback.Queue(
        ["LoadExtensions", i],
        ["loadComplete", MathJax.Ajax, "[a11y]/accessibility-menu.js"]
      );
    });
})(MathJax.Hub, MathJax.Extension);
MathJax.Ajax.loadComplete("[MathJax]/config/MML_HTMLorMML.js");
