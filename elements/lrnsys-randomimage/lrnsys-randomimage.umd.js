!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("@polymer/polymer/polymer-element.js"),require("@lrnwebcomponents/random-image/random-image.js")):"function"==typeof define&&define.amd?define(["exports","@polymer/polymer/polymer-element.js","@lrnwebcomponents/random-image/random-image.js"],t):t((e=e||self).LrnsysRandomimage={},e.polymerElement_js)}(this,function(e,t){"use strict";function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function r(e){return(r=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function o(e,t){return(o=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function i(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function u(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var n,o=r(e);if(t){var u=r(this).constructor;n=Reflect.construct(o,arguments,u)}else n=o.apply(this,arguments);return i(this,n)}}function c(){var e,t,n=(e=['\n      <style>\n        :host {\n          display: block;\n        }\n      </style>\n      <div id="list">\n        <random-image images-list$="{{images}}"></random-image>\n      </div>\n      <button raised on-click="reload">Reload</button>\n    '],t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}})));return c=function(){return n},n}var a=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&o(e,t)}(l,t.PolymerElement);var r,i,a,f=u(l);function l(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,l),f.apply(this,arguments)}return r=l,a=[{key:"template",get:function(){return t.html(c())}},{key:"tag",get:function(){return"lrnsys-randomimage"}},{key:"properties",get:function(){return{images:{type:Object,notify:!0,value:function(){return[]}}}}}],(i=[{key:"reload",value:function(e){this.shadowRoot.querySelector("#list").innerHTML=this.shadowRoot.querySelector("#list").innerHTML}}])&&n(r.prototype,i),a&&n(r,a),l}();window.customElements.define(a.tag,a),e.LrnsysRandomimage=a,Object.defineProperty(e,"__esModule",{value:!0})});
