!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("@polymer/polymer/polymer-element.js"),require("@lrnwebcomponents/simple-colors/simple-colors.js")):"function"==typeof define&&define.amd?define(["exports","@polymer/polymer/polymer-element.js","@lrnwebcomponents/simple-colors/simple-colors.js"],t):t((e=e||self).LrndesignAvatar={},e.polymerElement_js,e.simpleColors_js)}(this,function(e,t,r){"use strict";function n(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function o(e){return(o=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function l(e,t){return(l=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function i(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function a(){var e,t,r=(e=['\n    <style>\n      :host {\n        display: block;\n      }\n    </style>\n    <paper-avatar\n      label="[[label]]"\n      src="[[src]]"\n      two-chars="[[twoChars]]"\n      style$="background-color:[[hexColor]];"\n      jdenticon="[[jdenticon]]"\n    ></paper-avatar>'],t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}})));return a=function(){return r},r}var c=function(e){function c(){var e;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),e=i(this,o(c).call(this)),import("@lrnwebcomponents/paper-avatar/paper-avatar.js"),e}var s,u,p;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&l(e,t)}(c,t.PolymerElement),s=c,p=[{key:"template",get:function(){return t.html(a())}},{key:"tag",get:function(){return"lrndesign-avatar"}},{key:"properties",get:function(){return{label:{type:String,value:"lrndesign-avatar"},src:{type:String},twoChars:{type:Boolean,value:!1},hexColor:{type:String,computed:"_getHexColor(color)"},color:{type:String,value:"blue",reflectToAttribute:!0},jdenticon:{type:Boolean,value:!1}}}}],(u=[{key:"_getHexColor",value:function(e){var t=e.replace("-text",""),n=new r.SimpleColors;return n.colors[t]?n.colors[t][6]:"#000000"}}])&&n(s.prototype,u),p&&n(s,p),c}();window.customElements.define(c.tag,c),e.LrndesignAvatar=c,Object.defineProperty(e,"__esModule",{value:!0})});
//# sourceMappingURL=lrndesign-avatar.umd.js.map
