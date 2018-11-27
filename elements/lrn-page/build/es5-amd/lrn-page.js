define([
  "./node_modules/@polymer/polymer/polymer-legacy.js",
  "./node_modules/@lrnwebcomponents/oer-schema/oer-schema.js"
], function(_polymerLegacy, _oerSchema) {
  "use strict";
  function _templateObject_14d278b0f1e611e8aee1737441ba78e4() {
    var data = babelHelpers.taggedTemplateLiteral([
      "\n    <style>\n      :host {\n        display: block;\n      }\n    </style>\n    <oer-schema>\n      <slot></slot>\n    </oer-schema>\n"
    ]);
    _templateObject_14d278b0f1e611e8aee1737441ba78e4 = function _templateObject_14d278b0f1e611e8aee1737441ba78e4() {
      return data;
    };
    return data;
  }
  (0, _polymerLegacy.Polymer)({
    _template: (0, _polymerLegacy.html)(
      _templateObject_14d278b0f1e611e8aee1737441ba78e4()
    ),
    is: "lrn-page"
  });
});
