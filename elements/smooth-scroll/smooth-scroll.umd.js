!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("@polymer/polymer/polymer-element.js")):"function"==typeof define&&define.amd?define(["exports","@polymer/polymer/polymer-element.js"],t):t((e=e||self).SmoothScroll={},e.polymerElement_js)}(this,function(e,t){"use strict";function n(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function o(e){return(o=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function r(e,t){return(r=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function l(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}var i=function(e){function i(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i),l(this,o(i).apply(this,arguments))}var c,u,s;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&r(e,t)}(i,t.PolymerElement),c=i,s=[{key:"tag",get:function(){return"smooth-scroll"}}],(u=[{key:"scroll",value:function(e,t){var n={align:"top",delay:0,duration:300,scrollElement:window},o=Object.assign({},n,t),r=e.getBoundingClientRect(),l=(o.scrollElement.getBoundingClientRect(),o.scrollElement.getBoundingClientRect().bottom-o.scrollElement.getBoundingClientRect().top),i=r.bottom-r.top,c=o.scrollElement.scrollTop,u=e.getBoundingClientRect().top-o.scrollElement.getBoundingClientRect().top;switch(u-=l/2,o.align){case"center":u+=i/2;break;case"bottom":u+=i}var s=null;requestAnimationFrame(function e(t){null===s&&(s=t);var n,r,l,i,a=t-s,f=(n=a,r=c,l=u,i=o.duration,(n/=i/2)<1?l/2*n*n+r:-l/2*(--n*(n-2)-1)+r);o.scrollElement.scrollTop=f,a<o.duration&&requestAnimationFrame(e)})}}])&&n(c.prototype,u),s&&n(c,s),i}();window.customElements.define(i.tag,i),e.SmoothScroll=i,Object.defineProperty(e,"__esModule",{value:!0})});
//# sourceMappingURL=smooth-scroll.umd.js.map
