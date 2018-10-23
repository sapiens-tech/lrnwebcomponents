define([
  "exports",
  "./node_modules/@polymer/polymer/polymer-element.js",
  "./node_modules/@lrnwebcomponents/hax-body-behaviors/lib/HAXWiring.js"
], function(_exports, _polymerElement, _HAXWiring) {
  "use strict";
  Object.defineProperty(_exports, "__esModule", { value: !0 });
  _exports.CsvRender = void 0;
  function _templateObject_60f91fe0d6ee11e891fb4d1366b1ca2b() {
    var data = babelHelpers.taggedTemplateLiteral([
      "\n<style>:host {\n  display: block;\n}\n\n:host([hidden]) {\n  display: none;\n}\n</style>\n<slot></slot>"
    ]);
    _templateObject_60f91fe0d6ee11e891fb4d1366b1ca2b = function() {
      return data;
    };
    return data;
  }
  var CsvRender = (function(_PolymerElement) {
    babelHelpers.inherits(CsvRender, _PolymerElement);
    function CsvRender() {
      babelHelpers.classCallCheck(this, CsvRender);
      return babelHelpers.possibleConstructorReturn(
        this,
        (CsvRender.__proto__ || Object.getPrototypeOf(CsvRender)).apply(
          this,
          arguments
        )
      );
    }
    babelHelpers.createClass(
      CsvRender,
      [
        {
          key: "connectedCallback",
          value: function connectedCallback() {
            babelHelpers
              .get(
                CsvRender.prototype.__proto__ ||
                  Object.getPrototypeOf(CsvRender.prototype),
                "connectedCallback",
                this
              )
              .call(this);
            this.HAXWiring = new _HAXWiring.HAXWiring();
            this.HAXWiring.setHaxProperties(
              CsvRender.haxProperties,
              CsvRender.tag,
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
              _templateObject_60f91fe0d6ee11e891fb4d1366b1ca2b()
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
                title: "Csv render",
                description: "Automated conversion of csv-render/",
                icon: "icons:android",
                color: "green",
                groups: ["Render"],
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
            return "csv-render";
          }
        }
      ]
    );
    return CsvRender;
  })(_polymerElement.PolymerElement);
  _exports.CsvRender = CsvRender;
  window.customElements.define(CsvRender.tag, CsvRender);
});
