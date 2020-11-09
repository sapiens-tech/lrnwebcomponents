!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports,require("@lrnwebcomponents/paper-fab-speed-dial/lib/paper-fab-speed-dial-overlay.js"),require("@lrnwebcomponents/paper-fab-speed-dial/paper-fab-speed-dial.js"),require("@lrnwebcomponents/lrnapp-fab-menu/lib/lrnapp-fab-speed-dial-action.js"),require("lit-element/lit-element.js"),require("@lrnwebcomponents/simple-icon/simple-icon.js"),require("@lrnwebcomponents/simple-icon/lib/simple-icons.js"),require("@lrnwebcomponents/simple-icon/lib/simple-icon-button.js")):"function"==typeof define&&define.amd?define(["exports","@lrnwebcomponents/paper-fab-speed-dial/lib/paper-fab-speed-dial-overlay.js","@lrnwebcomponents/paper-fab-speed-dial/paper-fab-speed-dial.js","@lrnwebcomponents/lrnapp-fab-menu/lib/lrnapp-fab-speed-dial-action.js","lit-element/lit-element.js","@lrnwebcomponents/simple-icon/simple-icon.js","@lrnwebcomponents/simple-icon/lib/simple-icons.js","@lrnwebcomponents/simple-icon/lib/simple-icon-button.js"],n):n((e=e||self).LrnappFabMenu={},null,null,null,e.litElement_js)}(this,function(e,n,t,o,r){"use strict";function i(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function a(e){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function p(e,n){return(p=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e})(e,n)}function l(e,n){return!n||"object"!=typeof n&&"function"!=typeof n?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):n}function c(e){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var t,o=a(e);if(n){var r=a(this).constructor;t=Reflect.construct(o,arguments,r)}else t=o.apply(this,arguments);return l(this,t)}}function s(e,n){return n||(n=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}function u(){var e=s(["\n        :host {\n          display: block;\n        }\n        lrnapp-fab-speed-dial-action:not(:defined),\n        paper-fab-speed-dial-overlay:not(:defined),\n        paper-fab-speed-dial:not(:defined) {\n          display: none;\n        }\n        .open,\n        .overlay {\n          position: fixed;\n          bottom: var(--paper-fab-speed-dial-bottom, 16px);\n          right: var(--paper-fab-speed-dial-right, 16px);\n        }\n        .open {\n          --paper-fab-background: var(--paper-fab-speed-dial-background);\n          --paper-fab-keyboard-focus-background: var(\n            --paper-fab-speed-dial-keyboard-focus-background\n          );\n        }\n        .close {\n          --paper-fab-background: var(--paper-grey-500);\n          --paper-fab-keyboard-focus-background: var(--paper-grey-500);\n          margin-top: 20px;\n          display: inline-block;\n        }\n        .overlay {\n          text-align: right;\n        }\n      "]);return u=function(){return e},e}function f(){var e=s(['\n      <simple-icon-button\n        icon="','"\n        class="open"\n        @click="','"\n        ?hidden="','"\n        ?disabled="','"\n      ></simple-icon-button>\n\n      <paper-fab-speed-dial-overlay\n        class="overlay"\n        ?opened="','"\n        @opened-changed="','"\n        with-backdrop\n      >\n        <slot></slot>\n        <simple-icon-button\n          icon="close"\n          class="close"\n          @click="','"\n        ></simple-icon-button>\n      </paper-fab-speed-dial-overlay>\n    ']);return f=function(){return e},e}var d=function(e){!function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&p(e,n)}(l,r.LitElement);var n,t,o,a=c(l);function l(){var e;return function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,l),(e=a.call(this)).icon="add",e.disabled=!1,setTimeout(function(){},0),e}return n=l,o=[{key:"styles",get:function(){return[r.css(u())]}},{key:"tag",get:function(){return"lrnapp-fab-menu"}},{key:"properties",get:function(){return{icon:{type:String},opened:{type:Boolean},disabled:{type:Boolean}}}}],(t=[{key:"render",value:function(){return r.html(f(),this.icon,this.open,this.opened,this.disabled,this.opened,this.openedChangedEvent,this.close)}},{key:"openedChangedEvent",value:function(e){this.opened=e.detail.value}},{key:"updated",value:function(e){var n=this;e.forEach(function(e,t){"opened"==t&&n.dispatchEvent(new CustomEvent("opened-changed",{value:n[t]}))})}},{key:"open",value:function(e){e&&e.preventDefault(),this.opened=!0}},{key:"close",value:function(e){e&&e.preventDefault(),this.opened=!1}}])&&i(n.prototype,t),o&&i(n,o),l}();window.customElements.define(d.tag,d),e.LrnappFabMenu=d,Object.defineProperty(e,"__esModule",{value:!0})});
