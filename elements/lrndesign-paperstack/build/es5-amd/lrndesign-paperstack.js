define([
  "./node_modules/@polymer/polymer/polymer-legacy.js",
  "./node_modules/@polymer/iron-icon/iron-icon.js",
  "./node_modules/@lrnwebcomponents/materializecss-styles/materializecss-styles.js",
  "./node_modules/@lrnwebcomponents/hax-body-behaviors/lib/HAXWiring.js",
  "./node_modules/@lrnwebcomponents/a11y-behaviors/a11y-behaviors.js",
  "./node_modules/@lrnwebcomponents/lrn-icons/lrn-icons.js"
], function(
  _polymerLegacy,
  _ironIcon,
  _materializecssStyles,
  _HAXWiring,
  _a11yBehaviors,
  _lrnIcons
) {
  "use strict";
  function _templateObject_34084750f1e611e8b029f1323031cf20() {
    var data = babelHelpers.taggedTemplateLiteral([
      '\n    <style include="materializecss-styles">\n      :host {\n        display: block;\n      }\n      /* Example card */\n      .egletter p {\n        position: relative;\n        z-index: 3;\n        line-height: 24px;\n      }\n\n      .egletter ul {\n        position: relative;\n        z-index: 3;\n        line-height: 24px;\n      }\n\n      .egletter span {\n        font-family: cursive;\n        margin: 0 auto;\n        position: relative;\n        z-index: 3;\n        line-height: 64px;\n      }\n\n      iron-icon {\n        display: block;\n        font-size: 12px;\n        height: 40px;\n        width: 40px;\n        padding: 4px;\n      }\n\n      .icon-container {\n        float: left;\n        width: 48px;\n        height: 48px;\n        margin-right: 8px;\n      }\n\n      .egletter span {\n        line-height: 48px;\n      }\n\n      .egletter {\n        min-height: 160px;\n        padding: 12px 24px;\n        position: relative;\n        width: 80%;\n        z-index: 4;\n        margin-bottom: 48px;\n      }\n\n      .egletter:before,\n      .egletter:after {\n        content: "";\n        height: 98%;\n        position: absolute;\n        width: 100%;\n        z-index: -1;\n      }\n\n      .egletter:before {\n        background: #fafafa;\n        box-shadow: 0 0 .5rem rgba(0, 0, 0, 0.2);\n        left: -.32px;\n        top: .32px;\n        transform: rotate(-2.5deg);\n      }\n\n      .egletter:after {\n        background: #ffffff;\n        box-shadow: 0 0 .32px rgba(0, 0, 0, 0.2);\n        right: -.32px;\n        top: 1.6px;\n        transform: rotate(1.4deg);\n      }\n    </style>\n    <div class="egletter">\n      <div class$="icon-container circle [[color]]">\n        <iron-icon icon="[[icon]]" class$="[[textColor]]"></iron-icon>\n      </div>\n      <span>[[title]]</span>\n      <p><slot></slot></p>\n    </div>\n'
    ]);
    _templateObject_34084750f1e611e8b029f1323031cf20 = function _templateObject_34084750f1e611e8b029f1323031cf20() {
      return data;
    };
    return data;
  }
  (0, _polymerLegacy.Polymer)({
    _template: (0, _polymerLegacy.html)(
      _templateObject_34084750f1e611e8b029f1323031cf20()
    ),
    is: "lrndesign-paperstack",
    behaviors: [
      HAXBehaviors.PropertiesBehaviors,
      A11yBehaviors.A11y,
      MaterializeCSSBehaviors.ColorBehaviors
    ],
    properties: {
      title: { type: String, value: "Title" },
      icon: { type: String, value: "lrn:assignment" },
      colorCode: {
        type: String,
        value: "#000000",
        observer: "_colorCodeChange"
      },
      color: { type: String, computed: '_computeColorClass(colorCode, "bg")' },
      textCodeColor: { type: String, value: "#ffffff" },
      textColor: { type: String, computed: "_computeColorClass(textCodeColor)" }
    },
    attached: function attached() {
      var props = {
        canScale: !0,
        canPosition: !0,
        canEditSource: !1,
        gizmo: {
          title: "Paper stack",
          description: "A stack of papers",
          icon: "icons:content-copy",
          color: "grey",
          groups: ["Video", "Media"],
          handles: [],
          meta: { author: "LRNWebComponents" }
        },
        settings: {
          quick: [
            {
              property: "title",
              title: "Title",
              description: "Title of the cards",
              inputMethod: "textfield",
              icon: "editor:title"
            }
          ],
          configure: [
            {
              property: "title",
              title: "Title",
              description: "Title of the cards",
              inputMethod: "boolean"
            },
            {
              property: "colorCode",
              title: "Color",
              description: "Color of the card",
              inputMethod: "colorpicker"
            },
            {
              property: "icon",
              title: "Icon",
              description: "Icon for the card",
              inputMethod: "iconpicker"
            },
            {
              slot: "",
              title: "Contents",
              description: "card contents",
              inputMethod: "code-editor"
            }
          ],
          advanced: []
        }
      };
      this.setHaxProperties(props);
    },
    _computeColorClass: function _computeColorClass(color, bg) {
      if (null != color && "#ffffff" == color.toLowerCase()) {
        if ("bg" == bg) {
          return "white";
        }
        return "white-text";
      } else if (null != color && "#000000" == color) {
        if ("bg" == bg) {
          return "black";
        }
        return "black-text";
      } else if (null != color && "#" == color.substring(0, 1)) {
        return this._colorTransform(color.toLowerCase(), "", "");
      }
    },
    _colorCodeChange: function _colorCodeChange(newValue, oldValue) {
      if (
        babelHelpers.typeof(newValue) !==
          ("undefined" === typeof void 0
            ? "undefined"
            : babelHelpers.typeof(void 0)) &&
        null != newValue
      ) {
        this.computeTextPropContrast("textCodeColor", "colorCode");
      }
    }
  });
});
