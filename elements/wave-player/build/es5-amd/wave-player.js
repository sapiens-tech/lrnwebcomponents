define([
  "meta",
  "./node_modules/@polymer/polymer/polymer-legacy.js",
  "./node_modules/@polymer/polymer/lib/utils/resolve-url.js",
  "./node_modules/@polymer/paper-material/paper-material.js",
  "./node_modules/@polymer/paper-fab/paper-fab.js",
  "./node_modules/@polymer/paper-icon-button/paper-icon-button.js",
  "./node_modules/@polymer/iron-icons/iron-icons.js",
  "./node_modules/@polymer/iron-icons/av-icons.js",
  "./node_modules/@lrnwebcomponents/hax-body-behaviors/lib/HAXWiring.js",
  "./node_modules/@lrnwebcomponents/schema-behaviors/schema-behaviors.js",
  "./node_modules/@lrnwebcomponents/es-global-bridge/es-global-bridge.js"
], function(
  meta,
  _polymerLegacy,
  _resolveUrl,
  _paperMaterial,
  _paperFab,
  _paperIconButton,
  _ironIcons,
  _avIcons,
  _HAXWiring,
  _schemaBehaviors,
  _esGlobalBridge
) {
  "use strict";
  meta = babelHelpers.interopRequireWildcard(meta);
  function _templateObject_f65a7bd0f1e511e8a2ae6d2f6e87455a() {
    var data = babelHelpers.taggedTemplateLiteral([
      '\n    <style>\n      :host {\n        height: 150px;\n        background-color: var(--dark-primary-color);\n        display: block;\n      }\n\n      paper-icon-button {\n        position: absolute;\n      }\n\n      .title,\n      .subtitle {\n        transition: all .5s ease;\n        padding: 10px 10px 10px 0;\n        left: 160px;\n        position: absolute;\n      }\n\n      .subtitle {\n        bottom: 0;\n      }\n\n      .controls {\n        height: 50px;\n        width: 100%;\n        top: 0;\n        background: var(--accent-color);\n        z-index: 20\n      }\n\n      paper-fab {\n        transition: all .5s ease;\n        top: -25px;\n        z-index: 25;\n        border-radius: 0;\n      }\n\n      .albuminfo {\n        position: relative;\n        transition: all .5s ease;\n        top: -156px;\n        margin-bottom: -150px;\n        z-index: 20;\n        height: 150px;\n        background-color: rgba(0, 0, 0, .4);\n        color: #fff;\n        font-family: Roboto, sans-serif;\n      }\n\n      .albuminfoActive {\n        top: -25;\n        height: 25px;\n        width: 100%;\n        margin-bottom: -19px;\n      }\n\n      .waveContainer {\n        top: -31px;\n        transition: all .5s ease;\n        background-color: var(--dark-primary-color);\n        transform: scaleY(1.5)\n      }\n\n      .circleAnimation {\n        border-radius: 50%;\n        overflow: auto;\n        -moz-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .4);\n        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .4)\n      }\n\n      .circleAnimation:active {\n        -moz-box-shadow: 0 8px 17px 0 rgba(0, 0, 0, .2);\n        box-shadow: 0 8px 17px 0 rgba(0, 0, 0, .2)\n      }\n\n      .playActive {\n        top: 0;\n        width: 100%;\n        height: 50px\n      }\n\n      .waveActive {\n        top: 0px;\n        transform: scaleY(1)\n      }\n\n      .centred,\n      .titleActive {\n        transform: scaleY(0);\n      }\n\n      .titleActive {\n        opacity: 0;\n      }\n\n      #playbutton {\n        transition: all .5s ease\n      }\n\n      .coverart {\n        transition: all .5s ease;\n        width: 150px;\n        height: 150px\n      }\n\n      .title {\n        font-size: 24px;\n      }\n\n      .coverartActive {\n        width: 25px;\n        height: 25px\n      }\n\n      .nameActive {\n        font-size: 19px;\n        padding: 3px 3px 3px 0;\n        left: 30px\n      }\n\n      .centred {\n        top: calc(50% - 20px);\n        left: calc(50% - 20px);\n        transition: all .3s ease\n      }\n\n      .left,\n      .middle,\n      .right {\n        transform: scale(1)\n      }\n\n      .left {\n        left: calc(25% - 20px)\n      }\n\n      .right {\n        left: calc(75% - 20px)\n      }\n\n      .hidden {\n        display: none\n      }\n\n      @media only screen and (max-width: 500px) {\n        .albuminfo {\n          width: 100%;\n        }\n      }\n    </style>\n    <paper-fab id="playbutton" class="circleAnimation" disabled="" icon="av:play-arrow" on-click="togglePlay"></paper-fab>\n    <paper-material id="controls" class="controls hidden" elevation="2">\n      <paper-icon-button class="centred middle" style="color: white;" icon="av:pause" on-click="togglePlay"></paper-icon-button>\n      <paper-icon-button id="replay" class="centred" style="color: white;" icon="av:replay-30" on-click="throwBack"></paper-icon-button>\n      <paper-icon-button id="mute" class="centred" style="color: white;" icon="av:volume-up" on-click="toggleMute"></paper-icon-button>\n    </paper-material>\n    <div id="container" class="waveContainer" elevation="0"></div>\n    <div id="albuminfo" class="albuminfo">\n      <img class="coverart" src="[[coverart]]">\n      <span class="title">[[title]]</span>\n      <span class="subtitle">[[subtitle]]</span>\n    </div>\n'
    ]);
    _templateObject_f65a7bd0f1e511e8a2ae6d2f6e87455a = function _templateObject_f65a7bd0f1e511e8a2ae6d2f6e87455a() {
      return data;
    };
    return data;
  }
  (0, _polymerLegacy.Polymer)({
    _template: (0, _polymerLegacy.html)(
      _templateObject_f65a7bd0f1e511e8a2ae6d2f6e87455a()
    ),
    is: "wave-player",
    behaviors: [HAXBehaviors.PropertiesBehaviors, SchemaBehaviors.Schema],
    properties: {
      src: { type: String, notify: !0, observer: "_srcChanged" },
      title: { type: String, value: "", notify: !0 },
      subtitle: { type: String, value: "", notify: !0 },
      coverart: { type: String, value: "", notify: !0 },
      wavesurfer: { type: Object },
      lean: { type: String, value: "left", notify: !0 },
      wavecolor: { type: String, value: "#ffffff", notify: !0 },
      progresscolor: { type: String, value: "#CFD8DC", notify: !0 }
    },
    _srcChanged: function _srcChanged(newValue, oldValue) {
      if (
        babelHelpers.typeof(newValue) !==
          ("undefined" === typeof void 0
            ? "undefined"
            : babelHelpers.typeof(void 0)) &&
        this.__wavesurfer
      ) {
        window.wavesurferobject.load(newValue);
      }
    },
    created: function created() {
      var name = "wavesurfer",
        basePath = (0, _resolveUrl.pathFromUrl)(meta.url),
        location = "".concat(basePath, "lib/wavesurfer.js/dist/wavesurfer.js");
      window.addEventListener(
        "es-bridge-".concat(name, "-loaded"),
        this._wavesurferLoaded.bind(this)
      );
      window.ESGlobalBridge.requestAvailability();
      window.ESGlobalBridge.instance.load(name, location);
    },
    attached: function attached() {
      var props = {
        canScale: !0,
        canPosition: !0,
        canEditSource: !1,
        gizmo: {
          title: "Audio player",
          description: "Audio that is just like spotify.",
          icon: "av:play-circle-filled",
          color: "purple",
          groups: ["Video", "Media"],
          handles: [
            {
              type: "audio",
              source: "src",
              title: "title",
              caption: "subtitle"
            }
          ],
          meta: { author: "LRNWebComponents" }
        },
        settings: {
          quick: [
            {
              property: "src",
              title: "Source",
              description: "The URL for this video.",
              inputMethod: "textfield",
              icon: "link",
              required: !0,
              validationType: "url"
            }
          ],
          configure: [
            {
              property: "src",
              title: "Source",
              description: "The URL for this video.",
              inputMethod: "textfield",
              icon: "link",
              required: !0,
              validationType: "url"
            },
            {
              property: "title",
              title: "Title",
              description: "A simple title",
              inputMethod: "textfield",
              icon: "av:video-label",
              required: !1,
              validationType: "text"
            }
          ],
          advanced: []
        }
      };
      this.setHaxProperties(props);
    },
    ready: function ready() {
      if ("right" === this.lean) {
        this.$.playbutton.style.right = "25";
        this.$.controls.style.right = "0";
      } else {
        this.$.playbutton.style.left = "25";
        this.$.controls.style.left = "0";
      }
      if ("" === this.name) {
        this.$.albuminfo.classList.add("hidden");
      }
      if ("" === this.coverart) {
        var basePath = (0, _resolveUrl.pathFromUrl)(meta.url);
        this.coverart = "".concat(basePath, "lib/art.jpg");
      }
    },
    _wavesurferLoaded: function _wavesurferLoaded() {
      this.__wavesurfer = !0;
      this.initWaveSurfer();
    },
    activateAnimation: function activateAnimation() {
      var self = this,
        waveStyle = this.$.container,
        buttonStyle = this.$.playbutton,
        controlsStyle = this.$.controls,
        muteStyle = this.$.mute,
        replayStyle = this.$.replay,
        albumStyle = this.$.albuminfo,
        coverartStyle = albumStyle.querySelector(".coverart"),
        nameStyle = albumStyle.querySelector(".title"),
        titleStyle = albumStyle.querySelector(".subtitle");
      buttonStyle.setAttribute("icon", "av:pause");
      buttonStyle.classList.remove("circleAnimation");
      buttonStyle.classList.add("playActive");
      albumStyle.classList.add("albuminfoActive");
      coverartStyle.classList.add("coverartActive");
      nameStyle.classList.add("nameActive");
      titleStyle.classList.add("titleActive");
      if ("right" === self.lean) {
        this.$.playbutton.style.right = "0";
      } else {
        this.$.playbutton.style.left = "0";
      }
      waveStyle.classList.add("waveActive");
      setTimeout(function() {
        controlsStyle.classList.remove("hidden");
        buttonStyle.classList.add("hidden");
      }, 500);
      setTimeout(function() {
        muteStyle.classList.add("right");
        replayStyle.classList.add("left");
      }, 600);
    },
    deactivateAnimation: function deactivateAnimation() {
      var self = this,
        waveStyle = this.$.container,
        buttonStyle = this.$.playbutton,
        controlsStyle = this.$.controls,
        muteStyle = this.$.mute,
        replayStyle = this.$.replay,
        albumStyle = this.$.albuminfo,
        coverartStyle = albumStyle.querySelector(".coverart"),
        nameStyle = albumStyle.querySelector(".title"),
        titleStyle = albumStyle.querySelector(".subtitle");
      muteStyle.classList.remove("right");
      replayStyle.classList.remove("left");
      setTimeout(function() {
        controlsStyle.classList.add("hidden");
        buttonStyle.classList.remove("hidden");
      }, 100);
      setTimeout(function() {
        buttonStyle.setAttribute("icon", "av:play-arrow");
        buttonStyle.classList.add("circleAnimation");
        buttonStyle.classList.remove("playActive");
        albumStyle.classList.remove("albuminfoActive");
        coverartStyle.classList.remove("coverartActive");
        nameStyle.classList.remove("nameActive");
        titleStyle.classList.remove("titleActive");
        if ("right" === self.lean) {
          buttonStyle.style.right = "25";
        } else {
          buttonStyle.style.left = "25";
        }
        waveStyle.classList.remove("waveActive");
      }, 200);
    },
    initWaveSurfer: function initWaveSurfer() {
      var _this = this;
      window.wavesurferobject = new WaveSurfer({
        container: this.$.container,
        waveColor: this.wavecolor,
        progressColor: this.progresscolor,
        fillParent: !0,
        height: 100
      });
      window.wavesurferobject.init();
      if (
        babelHelpers.typeof(this.src) !==
        ("undefined" === typeof void 0
          ? "undefined"
          : babelHelpers.typeof(void 0))
      ) {
        window.wavesurferobject.load(this.src);
      }
      window.wavesurferobject.on("ready", function() {
        _this.$.playbutton.removeAttribute("disabled");
      });
      window.wavesurferobject.on("finish", function() {
        _this.deactivateAnimation();
      });
    },
    togglePlay: function togglePlay(e) {
      window.wavesurferobject.playPause();
      var iconType = this.$.playbutton.getAttribute("icon");
      if ("av:play-arrow" === iconType) {
        this.activateAnimation();
      } else {
        this.deactivateAnimation();
      }
    },
    toggleMute: function toggleMute(e) {
      var muteStyle = this.$.mute,
        iconType = muteStyle.getAttribute("icon");
      window.wavesurferobject.toggleMute();
      if ("av:volume-up" === iconType) {
        muteStyle.setAttribute("icon", "av:volume-off");
      } else {
        muteStyle.setAttribute("icon", "av:volume-up");
      }
    },
    throwBack: function throwBack(e) {
      window.wavesurferobject.skipBackward(30);
    }
  });
});
