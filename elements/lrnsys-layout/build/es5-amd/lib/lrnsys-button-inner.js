define([
  "../node_modules/@polymer/polymer/polymer-legacy.js",
  "../node_modules/@lrnwebcomponents/paper-avatar/paper-avatar.js",
  "../node_modules/@lrnwebcomponents/lrn-icons/lrn-icons.js",
  "../node_modules/@polymer/iron-icons/iron-icons.js"
], function(_polymerLegacy, _paperAvatar, _lrnIcons, _ironIcons) {
  "use strict";
  function _templateObject_39d8ed10f1e611e8b229e5d6dee848e6() {
    var data = babelHelpers.taggedTemplateLiteral(
      [
        '\n    <style>\n      :host {\n        display: block;\n      }\n      :host > div > * {\n        vertical-align: middle;\n      }\n      .text-label {\n        margin-left: 8px;\n      }\n      .text-label-only {\n        margin-left: 0;\n      }\n    </style>\n    <div>\n      <template is="dom-if" if="[[avatar]]">\n        <paper-avatar src$="[[avatar]]"></paper-avatar>\n      </template>\n      <template is="dom-if" if="[[icon]]">\n        <lrn-icon icon="[[icon]]"></lrn-icon>\n      </template>\n      <template is="dom-if" if="[[text]]">\n        <span class$="[[_getTextLabelClass()]]">[[text]]</span>\n      </template>\n    </div>\n    <div><slot name="button"></slot><slot></slot></div>\n'
      ],
      [
        '\n    <style>\n      :host {\n        display: block;\n      }\n      :host > div > * {\n        vertical-align: middle;\n      }\n      .text-label {\n        margin-left: 8px;\n      }\n      .text-label-only {\n        margin-left: 0;\n      }\n    </style>\n    <div>\n      <template is="dom-if" if="[[avatar]]">\n        <paper-avatar src\\$="[[avatar]]"></paper-avatar>\n      </template>\n      <template is="dom-if" if="[[icon]]">\n        <lrn-icon icon="[[icon]]"></lrn-icon>\n      </template>\n      <template is="dom-if" if="[[text]]">\n        <span class\\$="[[_getTextLabelClass()]]">[[text]]</span>\n      </template>\n    </div>\n    <div><slot name="button"></slot><slot></slot></div>\n'
      ]
    );
    _templateObject_39d8ed10f1e611e8b229e5d6dee848e6 = function _templateObject_39d8ed10f1e611e8b229e5d6dee848e6() {
      return data;
    };
    return data;
  }
  (0, _polymerLegacy.Polymer)({
    _template: (0, _polymerLegacy.html)(
      _templateObject_39d8ed10f1e611e8b229e5d6dee848e6()
    ),
    is: "lrnsys-button-inner",
    properties: {
      icon: { type: String },
      avatar: { type: String },
      text: { type: String }
    },
    _getTextLabelClass: function _getTextLabelClass() {
      if (!this.avatar && !this.icon) {
        return "text-label-only";
      }
      return "text-label";
    }
  });
});
