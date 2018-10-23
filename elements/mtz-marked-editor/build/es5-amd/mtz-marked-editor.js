define([
  "exports",
  "./node_modules/@polymer/polymer/polymer-element.js",
  "./node_modules/@lrnwebcomponents/hax-body-behaviors/lib/HAXWiring.js"
], function(_exports, _polymerElement, _HAXWiring) {
  "use strict";
  Object.defineProperty(_exports, "__esModule", { value: !0 });
  _exports.MtzMarkedEditor = void 0;
  function _templateObject_e2bd4720d6ff11e8a6c6bd5f85eb3d20() {
    var data = babelHelpers.taggedTemplateLiteral([
      "\n<style>:host {\n  display: block;\n}\n\n:host([hidden]) {\n  display: none;\n}\n</style>\n<slot></slot>"
    ]);
    _templateObject_e2bd4720d6ff11e8a6c6bd5f85eb3d20 = function() {
      return data;
    };
    return data;
  }
  var MtzMarkedEditor = (function(_PolymerElement) {
    babelHelpers.inherits(MtzMarkedEditor, _PolymerElement);
    function MtzMarkedEditor() {
      babelHelpers.classCallCheck(this, MtzMarkedEditor);
      return babelHelpers.possibleConstructorReturn(
        this,
        (
          MtzMarkedEditor.__proto__ || Object.getPrototypeOf(MtzMarkedEditor)
        ).apply(this, arguments)
      );
    }
    babelHelpers.createClass(
      MtzMarkedEditor,
      [
        {
          key: "connectedCallback",
          value: function connectedCallback() {
            babelHelpers
              .get(
                MtzMarkedEditor.prototype.__proto__ ||
                  Object.getPrototypeOf(MtzMarkedEditor.prototype),
                "connectedCallback",
                this
              )
              .call(this);
            this.HAXWiring = new _HAXWiring.HAXWiring();
            this.HAXWiring.setHaxProperties(
              MtzMarkedEditor.haxProperties,
              MtzMarkedEditor.tag,
              this
            );
          }
        }
      ],
      [
        {
          key: "template",
          get: function get() {
            return (0, _polymerElement.html)(
              _templateObject_e2bd4720d6ff11e8a6c6bd5f85eb3d20()
            );
          }
        },
        {
          key: "haxProperties",
          get: function get() {
            return {
              canScale: !0,
              canPosition: !0,
              canEditSource: !1,
              gizmo: {
                title: "Mtz marked-editor",
                description: "Automated conversion of mtz-marked-editor/",
                icon: "icons:android",
                color: "green",
                groups: ["Marked"],
                handles: [{ type: "todo:read-the-docs-for-usage" }],
                meta: {
                  author: "btopro",
                  owner: "The Pennsylvania State University"
                }
              },
              settings: { quick: [], configure: [], advanced: [] }
            };
          }
        },
        {
          key: "properties",
          get: function get() {
            return {};
          }
        },
        {
          key: "tag",
          get: function get() {
            return "mtz-marked-editor";
          }
        }
      ]
    );
    return MtzMarkedEditor;
  })(_polymerElement.PolymerElement);
  _exports.MtzMarkedEditor = MtzMarkedEditor;
  window.customElements.define(MtzMarkedEditor.tag, MtzMarkedEditor);
});
