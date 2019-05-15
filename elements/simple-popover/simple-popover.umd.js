!function(e,o){"object"==typeof exports&&"undefined"!=typeof module?o(exports,require("@polymer/polymer/polymer-element.js"),require("@lrnwebcomponents/hax-body-behaviors/lib/HAXWiring.js"),require("@lrnwebcomponents/absolute-position-behavior/absolute-position-behavior.js")):"function"==typeof define&&define.amd?define(["exports","@polymer/polymer/polymer-element.js","@lrnwebcomponents/hax-body-behaviors/lib/HAXWiring.js","@lrnwebcomponents/absolute-position-behavior/absolute-position-behavior.js"],o):o((e=e||self).SimplePopover={},e.polymerElement_js,e.HAXWiring_js,e.absolutePositionBehavior_js)}(this,function(e,o,n,t){"use strict";function r(e,o){for(var n=0;n<o.length;n++){var t=o[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function i(e){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function p(e,o){return(p=Object.setPrototypeOf||function(e,o){return e.__proto__=o,e})(e,o)}function s(e,o){return!o||"object"!=typeof o&&"function"!=typeof o?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):o}function l(e,o,n){return(l="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,o,n){var t=function(e,o){for(;!Object.prototype.hasOwnProperty.call(e,o)&&null!==(e=i(e)););return e}(e,o);if(t){var r=Object.getOwnPropertyDescriptor(t,o);return r.get?r.get.call(n):r.value}})(e,o,n||e)}function a(){var e,o,n=(e=['\n<style>:host {\n  display: flex;\n  align-items: center;\n  flex-direction: column-reverse;\n  --simple-popover-border-radius: 3px;\n  --simple-popover-color: #222;\n  --simple-popover-padding: 10px;\n  --simple-popover-background-color: white;\n  --simple-popover-border-color: #bbb;\n  --simple-popover-box-shadow:rgba(60, 64, 67, 0.3) 0px 4px 8px 3px;\n}\n:host([hidden]) {\n  display: none;\n}\n:host([position="left"]) {\n  flex-direction: row;\n}\n:host([position="right"]) {\n  flex-direction: row-reverse;\n}\n:host([position="top"]) {\n  flex-direction: column;\n}\n:host #content {\n  margin: 0 auto;\n  padding: var(--simple-popover-padding);\n  color: var(--simple-popover-color);\n  background-color: var(--simple-popover-background-color);\n  border: 1px solid var(--simple-popover-border-color);\n  min-height: 20px;\n  border-radius: var(--simple-popover-border-radius);\n  box-shadow: var(--simple-popover-box-shadow);\n  @apply --simple-popover-content;\n}\n:host #pointer {\n  margin: 0 auto;\n  width: 20px;\n  height: 20px;\n  position: relative;\n  overflow: hidden;\n  flex: 0 0 20px;\n  margin: 0 0 -1px;\n}\n:host([position="top"]) #pointer {\n  margin: -0.5px 0 0;\n} \n:host([position="left"]) #pointer {\n  margin: 0 0 0 -1px;\n} \n:host([position="right"]) #pointer {\n  margin: 0 -1px 0 0;\n} \n:host #pointer:after {\n  content: "";\n  position: absolute;\n  width: 10px;\n  height: 10px;\n  background-color: var(--simple-popover-background-color);\n  border: 1px solid var(--simple-popover-border-color);\n  transform: rotate(45deg); \n  top: 15px;\n  left: 5px;\n}\n:host([position="top"]) #pointer:after {\n  top: -6px;\n  left: 5px;\n} \n:host([position="right"]) #pointer:after {\n  top: 5px;\n  left: 15px;\n} \n:host([position="left"]) #pointer:after {\n  top: 5px;\n  left: -6px;\n} </style>\n<div id="content" role="alertdialog">\n  <slot></slot>\n</div>\n<div id="pointer"></div>'],o||(o=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(o)}})));return a=function(){return n},n}var c=function(e){function c(){return function(e,o){if(!(e instanceof o))throw new TypeError("Cannot call a class as a function")}(this,c),s(this,i(c).apply(this,arguments))}var u,d,f;return function(e,o){if("function"!=typeof o&&null!==o)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(o&&o.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),o&&p(e,o)}(c,t.AbsolutePositionBehavior),u=c,f=[{key:"template",get:function(){return o.html(a())}},{key:"haxProperties",get:function(){return{canScale:!0,canPosition:!0,canEditSource:!1,gizmo:{title:"Simple popover",description:"A popover alertdialog that is positioned next to a target element",icon:"icons:android",color:"green",groups:["Popover"],handles:[{type:"todo:read-the-docs-for-usage"}],meta:{author:"nikkimk",owner:"The Pennsylvania State University"}},settings:{quick:[],configure:[{property:"title",description:"",inputMethod:"textfield",required:!1,icon:"icons:android"}],advanced:[]}}}},{key:"properties",get:function(){return{offset:{type:Number,value:-10,readOnly:!0},target:{type:Object,observer:"updatePosition"}}}},{key:"tag",get:function(){return"simple-popover"}}],(d=[{key:"connectedCallback",value:function(){l(i(c.prototype),"connectedCallback",this).call(this),this.HAXWiring=new n.HAXWiring,this.HAXWiring.setup(c.haxProperties,c.tag,this)}}])&&r(u.prototype,d),f&&r(u,f),c}();window.customElements.define(c.tag,c),e.SimplePopover=c,Object.defineProperty(e,"__esModule",{value:!0})});
//# sourceMappingURL=simple-popover.umd.js.map