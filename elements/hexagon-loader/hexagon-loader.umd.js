!function(n,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("@polymer/polymer/polymer-element.js"),require("@polymer/polymer/lib/elements/dom-repeat.js")):"function"==typeof define&&define.amd?define(["exports","@polymer/polymer/polymer-element.js","@polymer/polymer/lib/elements/dom-repeat.js"],t):t((n=n||self).HexagonLoader={},n.polymerElement_js)}(this,function(n,t){"use strict";function e(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function i(n,t){for(var e=0;e<t.length;e++){var i=t[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,i.key,i)}}function a(n,t,e){return t&&i(n.prototype,t),e&&i(n,e),n}function o(n,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),t&&l(n,t)}function s(n){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(n){return n.__proto__||Object.getPrototypeOf(n)})(n)}function l(n,t){return(l=Object.setPrototypeOf||function(n,t){return n.__proto__=t,n})(n,t)}function r(n,t,e){return(r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(n){return!1}}()?Reflect.construct:function(n,t,e){var i=[null];i.push.apply(i,t);var a=new(Function.bind.apply(n,i));return e&&l(a,e.prototype),a}).apply(null,arguments)}function m(n){var t="function"==typeof Map?new Map:void 0;return(m=function(n){if(null===n||(e=n,-1===Function.toString.call(e).indexOf("[native code]")))return n;var e;if("function"!=typeof n)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(n))return t.get(n);t.set(n,i)}function i(){return r(n,arguments,s(this).constructor)}return i.prototype=Object.create(n.prototype,{constructor:{value:i,enumerable:!1,writable:!0,configurable:!0}}),l(i,n)})(n)}function p(n,t){return!t||"object"!=typeof t&&"function"!=typeof t?function(n){if(void 0===n)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}(n):t}function f(n,t,e){return(f="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(n,t,e){var i=function(n,t){for(;!Object.prototype.hasOwnProperty.call(n,t)&&null!==(n=s(n)););return n}(n,t);if(i){var a=Object.getOwnPropertyDescriptor(i,t);return a.get?a.get.call(e):a.value}})(n,t,e||n)}var c=function(n){function t(){var n,i=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return e(this,t),(n=p(this,s(t).call(this))).tag=t.tag,n._queue=[],n.template=document.createElement("template"),n.attachShadow({mode:"open"}),i||n.render(),n}return o(t,m(HTMLElement)),a(t,[{key:"html",get:function(){return"\n<style>\n:host {\n  display: inline-flex;\n  position: relative;\n  height: 36px;\n  width: 36px;\n}\n\n:host div,\n:host div:before,\n:host div:after {\n background-color: var(--hexagon-color, orange);\n}\n\ndiv {\n  width: 30px;\n  height: 18px;\n  margin: 9px 3px;\n  position: absolute;\n  color: var(--hexagon-color, orange);\n}\ndiv:before, div:after {\n  content: '';\n  position: absolute;\n  width: 30px;\n  height: 18px;\n}\ndiv:before {\n  -webkit-transform: rotate(60deg);\n          transform: rotate(60deg);\n}\ndiv:after {\n  -webkit-transform: rotate(-60deg);\n          transform: rotate(-60deg);\n}\n</style>\n    <div></div>"}}],[{key:"tag",get:function(){return"hex-a-gon"}}]),a(t,[{key:"connectedCallback",value:function(){window.ShadyCSS&&window.ShadyCSS.styleElement(this),this._queue.length&&this._processQueue()}},{key:"_copyAttribute",value:function(n,t){var e=this.shadowRoot.querySelectorAll(t),i=this.getAttribute(n),a=null==i?"removeAttribute":"setAttribute",o=!0,s=!1,l=void 0;try{for(var r,m=e[Symbol.iterator]();!(o=(r=m.next()).done);o=!0){r.value[a](n,i)}}catch(n){s=!0,l=n}finally{try{o||null==m.return||m.return()}finally{if(s)throw l}}}},{key:"_queueAction",value:function(n){this._queue.push(n)}},{key:"_processQueue",value:function(){var n=this;this._queue.forEach(function(t){n["_".concat(t.type)](t.data)}),this._queue=[]}},{key:"_setProperty",value:function(n){var t=n.name,e=n.value;this[t]=e}},{key:"render",value:function(){this.shadowRoot.innerHTML=null,this.template.innerHTML=this.html,window.ShadyCSS&&window.ShadyCSS.prepareTemplate(this.template,this.tag),this.shadowRoot.appendChild(this.template.content.cloneNode(!0))}}]),t}();function u(){var n,t,e=(n=['\n<style>:host {\n  display: none;\n}\n:host([hidden]) {\n  display: none;\n}\n:host([loading]) {\n  display: block;\n}\n:host([size="small"]) {\n  transform: scale(.5, .5);\n  -webkit-transform: scale(.5, .5);\n  -moz-transform: scale(.5, .5);\n  -ms-transform: scale(.5, .5);\n  -o-transform: scale(.5, .5);\n}\n:host([size="large"]) {\n  transform: scale(1.25, 1.25);\n  -webkit-transform: scale(1.25, 1.25);\n  -moz-transform: scale(1.25, 1.25);\n  -ms-transform: scale(1.25, 1.25);\n  -o-transform: scale(1.25, 1.25);\n}\n:host([size="epic"]) {\n  transform: scale(2.5, 2.5);\n  -webkit-transform: scale(2.5, 2.5);\n  -moz-transform: scale(2.5, 2.5);\n  -ms-transform: scale(2.5, 2.5);\n  -o-transform: scale(2.5, 2.5);\n}\n\ndiv {\n  position: relative;\n  width: 255px;\n  height: 232.5px;\n  margin: 0 auto;\n}\n\nhex-a-gon {\n  display: none;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 30px;\n  height: 18px;\n  color: #9fb475;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  -webkit-transform-origin: 0 0;\n          transform-origin: 0 0;\n}\n\nhex-a-gon:nth-of-type(1) {\n  display: block;\n  margin-left: -56.25px;\n  margin-top: -97.875px;\n  -webkit-animation: scaleIt 1.5s ease-in-out infinite both;\n          animation: scaleIt 1.5s ease-in-out infinite both;\n  -webkit-animation-delay: 0s;\n          animation-delay: 0s;\n}\nhex-a-gon:nth-of-type(2) {\n  display: block;\n  margin-left: -18.75px;\n  margin-top: -97.875px;\n  -webkit-animation: scaleIt 1.5s ease-in-out infinite both;\n          animation: scaleIt 1.5s ease-in-out infinite both;\n  -webkit-animation-delay: 0.05s;\n          animation-delay: 0.05s;\n}\nhex-a-gon:nth-of-type(3) {\n  display: block;\n  margin-left: 18.75px;\n  margin-top: -97.875px;\n  -webkit-animation: scaleIt 1.5s ease-in-out infinite both;\n          animation: scaleIt 1.5s ease-in-out infinite both;\n  -webkit-animation-delay: 0.1s;\n          animation-delay: 0.1s;\n}\nhex-a-gon:nth-of-type(4) {\n  display: block;\n  margin-left: 56.25px;\n  margin-top: -97.875px;\n  -webkit-animation: scaleIt 1.5s ease-in-out infinite both;\n          animation: scaleIt 1.5s ease-in-out infinite both;\n  -webkit-animation-delay: 0.15s;\n          animation-delay: 0.15s;\n}\nhex-a-gon:nth-of-type(5) {\n  display: block;\n  margin-left: -75px;\n  margin-top: -65.25px;\n  -webkit-animation: scaleIt 1.5s ease-in-out infinite both;\n          animation: scaleIt 1.5s ease-in-out infinite both;\n  -webkit-animation-delay: 0s;\n          animation-delay: 0s;\n}\nhex-a-gon:nth-of-type(6) {\n  display: block;\n  margin-left: -37.5px;\n  margin-top: -65.25px;\n  -webkit-animation: scaleIt 1.5s ease-in-out infinite both;\n          animation: scaleIt 1.5s ease-in-out infinite both;\n  -webkit-animation-delay: 0.05s;\n          animation-delay: 0.05s;\n}\nhex-a-gon:nth-of-type(7) {\n  display: block;\n  margin-left: 0px;\n  margin-top: -65.25px;\n  -webkit-animation: scaleIt 1.5s ease-in-out infinite both;\n          animation: scaleIt 1.5s ease-in-out infinite both;\n  -webkit-animation-delay: 0.1s;\n          animation-delay: 0.1s;\n}\nhex-a-gon:nth-of-type(8) {\n  display: block;\n  margin-left: 37.5px;\n  margin-top: -65.25px;\n  -webkit-animation: scaleIt 1.5s ease-in-out infinite both;\n          animation: scaleIt 1.5s ease-in-out infinite both;\n  -webkit-animation-delay: 0.15s;\n          animation-delay: 0.15s;\n}\nhex-a-gon:nth-of-type(9) {\n  display: block;\n  margin-left: 75px;\n  margin-top: -65.25px;\n  -webkit-animation: scaleIt 1.5s ease-in-out infinite both;\n          animation: scaleIt 1.5s ease-in-out infinite both;\n  -webkit-animation-delay: 0.2s;\n          animation-delay: 0.2s;\n}\nhex-a-gon:nth-of-type(10) {\n  display: block;\n  margin-left: -93.75px;\n  margin-top: -32.625px;\n  -webkit-animation: scaleIt 1.5s ease-in-out infinite both;\n          animation: scaleIt 1.5s ease-in-out infinite both;\n  -webkit-animation-delay: 0s;\n          animation-delay: 0s;\n}\nhex-a-gon:nth-of-type(11) {\n  display: block;\n  margin-left: -56.25px;\n  margin-top: -32.625px;\n  -webkit-animation: scaleIt 1.5s ease-in-out infinite both;\n          animation: scaleIt 1.5s ease-in-out infinite both;\n  -webkit-animation-delay: 0.05s;\n          animation-delay: 0.05s;\n}\nhex-a-gon:nth-of-type(12) {\n  display: block;\n  margin-left: -18.75px;\n  margin-top: -32.625px;\n  -webkit-animation: scaleIt 1.5s ease-in-out infinite both;\n          animation: scaleIt 1.5s ease-in-out infinite both;\n  -webkit-animation-delay: 0.1s;\n          animation-delay: 0.1s;\n}\nhex-a-gon:nth-of-type(13) {\n  display: block;\n  margin-left: 18.75px;\n  margin-top: -32.625px;\n  -webkit-animation: scaleIt 1.5s ease-in-out infinite both;\n          animation: scaleIt 1.5s ease-in-out infinite both;\n  -webkit-animation-delay: 0.15s;\n          animation-delay: 0.15s;\n}\nhex-a-gon:nth-of-type(14) {\n  display: block;\n  margin-left: 56.25px;\n  margin-top: -32.625px;\n  -webkit-animation: scaleIt 1.5s ease-in-out infinite both;\n          animation: scaleIt 1.5s ease-in-out infinite both;\n  -webkit-animation-delay: 0.2s;\n          animation-delay: 0.2s;\n}\nhex-a-gon:nth-of-type(15) {\n  display: block;\n  margin-left: 93.75px;\n  margin-top: -32.625px;\n  -webkit-animation: scaleIt 1.5s ease-in-out infinite both;\n          animation: scaleIt 1.5s ease-in-out infinite both;\n  -webkit-animation-delay: 0.25s;\n          animation-delay: 0.25s;\n}\nhex-a-gon:nth-of-type(16) {\n  display: block;\n  margin-left: -112.5px;\n  margin-top: 0px;\n  -webkit-animation: scaleIt 1.5s ease-in-out infinite both;\n          animation: scaleIt 1.5s ease-in-out infinite both;\n  -webkit-animation-delay: 0s;\n          animation-delay: 0s;\n}\nhex-a-gon:nth-of-type(17) {\n  display: block;\n  margin-left: -75px;\n  margin-top: 0px;\n  -webkit-animation: scaleIt 1.5s ease-in-out infinite both;\n          animation: scaleIt 1.5s ease-in-out infinite both;\n  -webkit-animation-delay: 0.05s;\n          animation-delay: 0.05s;\n}\nhex-a-gon:nth-of-type(18) {\n  display: block;\n  margin-left: -37.5px;\n  margin-top: 0px;\n  -webkit-animation: scaleIt 1.5s ease-in-out infinite both;\n          animation: scaleIt 1.5s ease-in-out infinite both;\n  -webkit-animation-delay: 0.1s;\n          animation-delay: 0.1s;\n}\nhex-a-gon:nth-of-type(19) {\n  display: block;\n  margin-left: 0px;\n  margin-top: 0px;\n  -webkit-animation: scaleIt 1.5s ease-in-out infinite both;\n          animation: scaleIt 1.5s ease-in-out infinite both;\n  -webkit-animation-delay: 0.15s;\n          animation-delay: 0.15s;\n}\nhex-a-gon:nth-of-type(20) {\n  display: block;\n  margin-left: 37.5px;\n  margin-top: 0px;\n  -webkit-animation: scaleIt 1.5s ease-in-out infinite both;\n          animation: scaleIt 1.5s ease-in-out infinite both;\n  -webkit-animation-delay: 0.2s;\n          animation-delay: 0.2s;\n}\nhex-a-gon:nth-of-type(21) {\n  display: block;\n  margin-left: 75px;\n  margin-top: 0px;\n  -webkit-animation: scaleIt 1.5s ease-in-out infinite both;\n          animation: scaleIt 1.5s ease-in-out infinite both;\n  -webkit-animation-delay: 0.25s;\n          animation-delay: 0.25s;\n}\nhex-a-gon:nth-of-type(22) {\n  display: block;\n  margin-left: 112.5px;\n  margin-top: 0px;\n  -webkit-animation: scaleIt 1.5s ease-in-out infinite both;\n          animation: scaleIt 1.5s ease-in-out infinite both;\n  -webkit-animation-delay: 0.3s;\n          animation-delay: 0.3s;\n}\nhex-a-gon:nth-of-type(23) {\n  display: block;\n  margin-left: -93.75px;\n  margin-top: 32.625px;\n  -webkit-animation: scaleIt 1.5s ease-in-out infinite both;\n          animation: scaleIt 1.5s ease-in-out infinite both;\n  -webkit-animation-delay: 0s;\n          animation-delay: 0s;\n}\nhex-a-gon:nth-of-type(24) {\n  display: block;\n  margin-left: -56.25px;\n  margin-top: 32.625px;\n  -webkit-animation: scaleIt 1.5s ease-in-out infinite both;\n          animation: scaleIt 1.5s ease-in-out infinite both;\n  -webkit-animation-delay: 0.05s;\n          animation-delay: 0.05s;\n}\nhex-a-gon:nth-of-type(25) {\n  display: block;\n  margin-left: -18.75px;\n  margin-top: 32.625px;\n  -webkit-animation: scaleIt 1.5s ease-in-out infinite both;\n          animation: scaleIt 1.5s ease-in-out infinite both;\n  -webkit-animation-delay: 0.1s;\n          animation-delay: 0.1s;\n}\nhex-a-gon:nth-of-type(26) {\n  display: block;\n  margin-left: 18.75px;\n  margin-top: 32.625px;\n  -webkit-animation: scaleIt 1.5s ease-in-out infinite both;\n          animation: scaleIt 1.5s ease-in-out infinite both;\n  -webkit-animation-delay: 0.15s;\n          animation-delay: 0.15s;\n}\nhex-a-gon:nth-of-type(27) {\n  display: block;\n  margin-left: 56.25px;\n  margin-top: 32.625px;\n  -webkit-animation: scaleIt 1.5s ease-in-out infinite both;\n          animation: scaleIt 1.5s ease-in-out infinite both;\n  -webkit-animation-delay: 0.2s;\n          animation-delay: 0.2s;\n}\nhex-a-gon:nth-of-type(28) {\n  display: block;\n  margin-left: 93.75px;\n  margin-top: 32.625px;\n  -webkit-animation: scaleIt 1.5s ease-in-out infinite both;\n          animation: scaleIt 1.5s ease-in-out infinite both;\n  -webkit-animation-delay: 0.25s;\n          animation-delay: 0.25s;\n}\nhex-a-gon:nth-of-type(29) {\n  display: block;\n  margin-left: -75px;\n  margin-top: 65.25px;\n  -webkit-animation: scaleIt 1.5s ease-in-out infinite both;\n          animation: scaleIt 1.5s ease-in-out infinite both;\n  -webkit-animation-delay: 0s;\n          animation-delay: 0s;\n}\nhex-a-gon:nth-of-type(30) {\n  display: block;\n  margin-left: -37.5px;\n  margin-top: 65.25px;\n  -webkit-animation: scaleIt 1.5s ease-in-out infinite both;\n          animation: scaleIt 1.5s ease-in-out infinite both;\n  -webkit-animation-delay: 0.05s;\n          animation-delay: 0.05s;\n}\nhex-a-gon:nth-of-type(31) {\n  display: block;\n  margin-left: 0px;\n  margin-top: 65.25px;\n  -webkit-animation: scaleIt 1.5s ease-in-out infinite both;\n          animation: scaleIt 1.5s ease-in-out infinite both;\n  -webkit-animation-delay: 0.1s;\n          animation-delay: 0.1s;\n}\nhex-a-gon:nth-of-type(32) {\n  display: block;\n  margin-left: 37.5px;\n  margin-top: 65.25px;\n  -webkit-animation: scaleIt 1.5s ease-in-out infinite both;\n          animation: scaleIt 1.5s ease-in-out infinite both;\n  -webkit-animation-delay: 0.15s;\n          animation-delay: 0.15s;\n}\nhex-a-gon:nth-of-type(33) {\n  display: block;\n  margin-left: 75px;\n  margin-top: 65.25px;\n  -webkit-animation: scaleIt 1.5s ease-in-out infinite both;\n          animation: scaleIt 1.5s ease-in-out infinite both;\n  -webkit-animation-delay: 0.2s;\n          animation-delay: 0.2s;\n}\nhex-a-gon:nth-of-type(34) {\n  display: block;\n  margin-left: -56.25px;\n  margin-top: 97.875px;\n  -webkit-animation: scaleIt 1.5s ease-in-out infinite both;\n          animation: scaleIt 1.5s ease-in-out infinite both;\n  -webkit-animation-delay: 0s;\n          animation-delay: 0s;\n}\nhex-a-gon:nth-of-type(35) {\n  display: block;\n  margin-left: -18.75px;\n  margin-top: 97.875px;\n  -webkit-animation: scaleIt 1.5s ease-in-out infinite both;\n          animation: scaleIt 1.5s ease-in-out infinite both;\n  -webkit-animation-delay: 0.05s;\n          animation-delay: 0.05s;\n}\nhex-a-gon:nth-of-type(36) {\n  display: block;\n  margin-left: 18.75px;\n  margin-top: 97.875px;\n  -webkit-animation: scaleIt 1.5s ease-in-out infinite both;\n          animation: scaleIt 1.5s ease-in-out infinite both;\n  -webkit-animation-delay: 0.1s;\n          animation-delay: 0.1s;\n}\nhex-a-gon:nth-of-type(37) {\n  display: block;\n  margin-left: 56.25px;\n  margin-top: 97.875px;\n  -webkit-animation: scaleIt 1.5s ease-in-out infinite both;\n          animation: scaleIt 1.5s ease-in-out infinite both;\n  -webkit-animation-delay: 0.15s;\n          animation-delay: 0.15s;\n}\n\n@-webkit-keyframes scaleIt {\n  25%,100% {\n    -webkit-transform: scale(1) translate(-50%, -50%);\n            transform: scale(1) translate(-50%, -50%);\n  }\n  50% {\n    -webkit-transform: scale(0) translate(-50%, -50%);\n            transform: scale(0) translate(-50%, -50%);\n  }\n}\n\n@keyframes scaleIt {\n  25%,100% {\n    -webkit-transform: scale(1) translate(-50%, -50%);\n            transform: scale(1) translate(-50%, -50%);\n  }\n  50% {\n    -webkit-transform: scale(0) translate(-50%, -50%);\n            transform: scale(0) translate(-50%, -50%);\n  }\n}</style>\n<div>\n    <template is="dom-repeat" items="[[items]]">\n        <hex-a-gon></hex-a-gon>\n    </template>\n</div>'],t||(t=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(t)}})));return u=function(){return e},e}window.customElements.define(c.tag,c);var b=function(n){function i(){return e(this,i),p(this,s(i).apply(this,arguments))}return o(i,t.PolymerElement),a(i,[{key:"connectedCallback",value:function(){f(s(i.prototype),"connectedCallback",this).call(this);for(var n=[],t=0;t<this.itemCount;t++)n.push("");this.set("items",n)}},{key:"_colorChanged",value:function(n,t){n&&this.updateStyles({"--hexagon-color":n})}}],[{key:"template",get:function(){return t.html(u())}},{key:"properties",get:function(){return{color:{name:"color",type:"String",observer:"_colorChanged",reflectToAttribute:!0},size:{name:"size",type:"String",reflectToAttribute:!0},loading:{name:"loading",type:"Boolean",reflectToAttribute:!0},itemCount:{name:"itemCount",type:"Number",value:37}}}},{key:"tag",get:function(){return"hexagon-loader"}}]),i}();window.customElements.define(b.tag,b),n.HexagonLoader=b,Object.defineProperty(n,"__esModule",{value:!0})});
//# sourceMappingURL=hexagon-loader.umd.js.map
