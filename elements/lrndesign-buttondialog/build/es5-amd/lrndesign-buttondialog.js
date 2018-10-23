define([
  "exports",
  "./node_modules/@polymer/polymer/polymer-element.js",
  "./node_modules/@lrnwebcomponents/hax-body-behaviors/lib/HAXWiring.js"
], function(_exports, _polymerElement, _HAXWiring) {
  "use strict";
  Object.defineProperty(_exports, "__esModule", { value: !0 });
  _exports.LrndesignButtondialog = void 0;
  function _templateObject_3c32f9c0d6f711e8842841efe8c3e8d6() {
    var data = babelHelpers.taggedTemplateLiteral([
      "\n<style>:host {\n  display: block;\n}\n\n:host([hidden]) {\n  display: none;\n}\n</style>\n<slot></slot>"
    ]);
    _templateObject_3c32f9c0d6f711e8842841efe8c3e8d6 = function() {
      return data;
    };
    return data;
  }
  var LrndesignButtondialog = (function(_PolymerElement) {
    babelHelpers.inherits(LrndesignButtondialog, _PolymerElement);
    function LrndesignButtondialog() {
      babelHelpers.classCallCheck(this, LrndesignButtondialog);
      return babelHelpers.possibleConstructorReturn(
        this,
        (
          LrndesignButtondialog.__proto__ ||
          Object.getPrototypeOf(LrndesignButtondialog)
        ).apply(this, arguments)
      );
    }
    babelHelpers.createClass(
      LrndesignButtondialog,
      [
        {
          key: "connectedCallback",
          value: function connectedCallback() {
            babelHelpers
              .get(
                LrndesignButtondialog.prototype.__proto__ ||
                  Object.getPrototypeOf(LrndesignButtondialog.prototype),
                "connectedCallback",
                this
              )
              .call(this);
            this.HAXWiring = new _HAXWiring.HAXWiring();
            this.HAXWiring.setHaxProperties(
              LrndesignButtondialog.haxProperties,
              LrndesignButtondialog.tag,
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
              _templateObject_3c32f9c0d6f711e8842841efe8c3e8d6()
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
                title: "Lrndesign buttondialog",
                description: "Automated conversion of lrndesign-buttondialog/",
                icon: "icons:android",
                color: "green",
                groups: ["Buttondialog"],
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
            return "lrndesign-buttondialog";
          }
        }
      ]
    );
    return LrndesignButtondialog;
  })(_polymerElement.PolymerElement);
  _exports.LrndesignButtondialog = LrndesignButtondialog;
  window.customElements.define(
    LrndesignButtondialog.tag,
    LrndesignButtondialog
  );
});
