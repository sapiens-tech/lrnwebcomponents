!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("@polymer/polymer/polymer-element.js")):"function"==typeof define&&define.amd?define(["exports","@polymer/polymer/polymer-element.js"],t):t((e=e||self).PaperStepper={},e.polymerElement_js)}(this,function(e,t){"use strict";function n(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function o(e){return(o=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function r(e,t){return(r=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function u(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}var i=function(e){function i(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i),u(this,o(i).apply(this,arguments))}var l,a,p;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&r(e,t)}(i,t.PolymerElement),l=i,p=[{key:"tag",get:function(){return"paper-stepper"}},{key:"properties",get:function(){return{selected:{type:Number,notify:!0,value:0},progressBar:{type:Boolean,value:!1},backLabel:{type:String,value:"Back"},nextLabel:{type:String,value:"Next"},disablePrevious:{type:Boolean,value:!1},disableNext:{type:Boolean,value:!1},noButtons:{type:Boolean,value:!1}}}}],(a=[{key:"_tapPrevious",value:function(){this.$.selector.selectPrevious()}},{key:"_tapNext",value:function(){this.$.selector.selectNext()}},{key:"_getDisablePrevious",value:function(e,t){return e>0&&!t}},{key:"_getDisableNext",value:function(e,t,n){return e<t-1&&!n}},{key:"_computeProgressValue",value:function(e,t){return e+1}},{key:"_onItemsChanged",value:function(e){this._items=this.$.selector.items}}])&&n(l.prototype,a),p&&n(l,p),i}();window.customElements.define(i.tag,i),e.PaperStepper=i,Object.defineProperty(e,"__esModule",{value:!0})});
//# sourceMappingURL=paper-stepper.umd.js.map
