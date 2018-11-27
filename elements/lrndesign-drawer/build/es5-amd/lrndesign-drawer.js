define([
  "./node_modules/@polymer/polymer/polymer-legacy.js",
  "./node_modules/@polymer/app-layout/app-layout.js",
  "./node_modules/@polymer/paper-icon-button/paper-icon-button.js",
  "./node_modules/@polymer/paper-tooltip/paper-tooltip.js"
], function(_polymerLegacy, _appLayout, _paperIconButton, _paperTooltip) {
  "use strict";
  function _templateObject_677bede0f1e511e8a4d75f80edba0044() {
    var data = babelHelpers.taggedTemplateLiteral([
      '\n    <style>\n      :host {\n        display: block;\n        --lrndesign-drawer-width: 30%;\n      }\n      app-header {\n        z-index: 100;\n      }\n      app-drawer {\n        --app-drawer-width: var(--lrndesign-drawer-width);\n        --app-drawer-content-container: {\n          padding: 16px;\n          overflow-y: scroll;\n          margin-top: 112px;\n        }\n      }\n    </style>\n    <app-header>\n      <app-drawer opened="{{opened}}" align="{{align}}">\n        <slot></slot>\n      </app-drawer>\n    </app-header>\n    <paper-icon-button icon="[[icon]]" alt="[[alt]]" id="flyout-drawer"></paper-icon-button>\n    <paper-tooltip for="flyout-drawer">[[alt]]</paper-tooltip>\n'
    ]);
    _templateObject_677bede0f1e511e8a4d75f80edba0044 = function _templateObject_677bede0f1e511e8a4d75f80edba0044() {
      return data;
    };
    return data;
  }
  (0, _polymerLegacy.Polymer)({
    _template: (0, _polymerLegacy.html)(
      _templateObject_677bede0f1e511e8a4d75f80edba0044()
    ),
    is: "lrndesign-drawer",
    properties: {
      opened: { type: Boolean, value: !1 },
      icon: { type: String, value: "icon" },
      align: { type: String, value: "left" },
      alt: { type: String, value: "" }
    },
    ready: function ready() {
      var root = this,
        opened = this.opened;
      this.shadowRoot
        .querySelector("paper-icon-button")
        .addEventListener("click", function(e) {
          root.opened = !root.opened;
        });
    }
  });
});
