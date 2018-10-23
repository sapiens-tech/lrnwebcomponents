define([
  "exports",
  "./node_modules/@polymer/polymer/polymer-element.js",
  "./node_modules/@lrnwebcomponents/hax-body-behaviors/lib/HAXWiring.js"
], function(_exports, _polymerElement, _HAXWiring) {
  "use strict";
  Object.defineProperty(_exports, "__esModule", { value: !0 });
  _exports.ItemOverlayOps = void 0;
  function _templateObject_beed1bc0d6f211e897d59f1212735334() {
    var data = babelHelpers.taggedTemplateLiteral([
      "\n<style>:host {\n  display: block;\n}\n\n:host([hidden]) {\n  display: none;\n}\n</style>\n<slot></slot>"
    ]);
    _templateObject_beed1bc0d6f211e897d59f1212735334 = function() {
      return data;
    };
    return data;
  }
  var ItemOverlayOps = (function(_PolymerElement) {
    babelHelpers.inherits(ItemOverlayOps, _PolymerElement);
    function ItemOverlayOps() {
      babelHelpers.classCallCheck(this, ItemOverlayOps);
      return babelHelpers.possibleConstructorReturn(
        this,
        (
          ItemOverlayOps.__proto__ || Object.getPrototypeOf(ItemOverlayOps)
        ).apply(this, arguments)
      );
    }
    babelHelpers.createClass(
      ItemOverlayOps,
      [
        {
          key: "connectedCallback",
          value: function connectedCallback() {
            babelHelpers
              .get(
                ItemOverlayOps.prototype.__proto__ ||
                  Object.getPrototypeOf(ItemOverlayOps.prototype),
                "connectedCallback",
                this
              )
              .call(this);
            this.HAXWiring = new _HAXWiring.HAXWiring();
            this.HAXWiring.setHaxProperties(
              ItemOverlayOps.haxProperties,
              ItemOverlayOps.tag,
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
              _templateObject_beed1bc0d6f211e897d59f1212735334()
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
                title: "Item overlay-ops",
                description: "Automated conversion of item-overlay-ops/",
                icon: "icons:android",
                color: "green",
                groups: ["Overlay"],
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
            return "item-overlay-ops";
          }
        }
      ]
    );
    return ItemOverlayOps;
  })(_polymerElement.PolymerElement);
  _exports.ItemOverlayOps = ItemOverlayOps;
  window.customElements.define(ItemOverlayOps.tag, ItemOverlayOps);
});
