define([
  "./node_modules/@polymer/polymer/polymer-legacy.js",
  "./lib/lrndesign-mapmenu-item.js",
  "./lib/lrndesign-mapmenu-submenu.js"
], function(_polymerLegacy, _lrndesignMapmenuItem, _lrndesignMapmenuSubmenu) {
  "use strict";
  function _templateObject_78b77060f1e611e88c7551f55180b4f0() {
    var data = babelHelpers.taggedTemplateLiteral([
      "\n    <style>\n      :host {\n        display: block;\n      }\n      #container {\n        padding: 16px 32px;\n      }\n      :host > ::slotted(lrndesign-mapmenu-submenu + lrndesign-mapmenu-submenu) {\n        margin-top: 16px;\n      }\n    </style>\n    <slot></slot>\n"
    ]);
    _templateObject_78b77060f1e611e88c7551f55180b4f0 = function _templateObject_78b77060f1e611e88c7551f55180b4f0() {
      return data;
    };
    return data;
  }
  (0, _polymerLegacy.Polymer)({
    _template: (0, _polymerLegacy.html)(
      _templateObject_78b77060f1e611e88c7551f55180b4f0()
    ),
    is: "lrndesign-mapmenu",
    properties: {}
  });
});
