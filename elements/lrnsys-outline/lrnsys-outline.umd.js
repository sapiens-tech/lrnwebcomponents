!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("@lrnwebcomponents/lrnsys-outline/lib/lrnsys-outline-item.js"),require("@polymer/paper-input/paper-input.js"),require("@polymer/polymer/polymer-element.js"),require("@polymer/polymer/lib/utils/async.js"),require("@lrnwebcomponents/simple-modal/simple-modal.js"),require("@lrnwebcomponents/simple-icon/simple-icon.js"),require("@lrnwebcomponents/simple-icon/lib/simple-icons.js"),require("@lrnwebcomponents/simple-icon/lib/simple-icon-button.js")):"function"==typeof define&&define.amd?define(["exports","@lrnwebcomponents/lrnsys-outline/lib/lrnsys-outline-item.js","@polymer/paper-input/paper-input.js","@polymer/polymer/polymer-element.js","@polymer/polymer/lib/utils/async.js","@lrnwebcomponents/simple-modal/simple-modal.js","@lrnwebcomponents/simple-icon/simple-icon.js","@lrnwebcomponents/simple-icon/lib/simple-icons.js","@lrnwebcomponents/simple-icon/lib/simple-icon-button.js"],t):t((e=e||self).LrnsysOutline={},null,null,e.polymerElement_js,e.async)}(this,function(e,t,i,n,s){"use strict";function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function r(e){return(r=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function a(e,t){return(a=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function d(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function m(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var i,n=r(e);if(t){var s=r(this).constructor;i=Reflect.construct(n,arguments,s)}else i=n.apply(this,arguments);return d(this,i)}}function u(e,t,i){return(u="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,i){var n=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=r(e)););return e}(e,t);if(n){var s=Object.getOwnPropertyDescriptor(n,t);return s.get?s.get.call(i):s.value}})(e,t,i||e)}function c(){var e,t,i=(e=['\n      <style>\n        :host {\n          display: block;\n        }\n        :host kbd {\n          display: inline-block;\n          background: #333;\n          color: white;\n          border-radius: 4px;\n          margin: 4px 4px 4px 0;\n          padding: 8px;\n          font-family: Verdana, Geneva, Tahoma, sans-serif;\n          font-size: 85%;\n        }\n      </style>\n      <div id="itemslist">\n        <template is="dom-repeat" items="{{items}}" as="item">\n          <lrnsys-outline-item\n            disable-down="[[item.disableDown]]"\n            disable-left="[[item.disableLeft]]"\n            disable-right="[[item.disableRight]]"\n            disable-up="[[item.disableUp]]"\n            id$="[[item.id]]"\n            index$="[[item.index]]"\n            indent-level="{{item.indent}}"\n            parent="{{item.parent}}"\n            title="{{item.title}}"\n          >\n          </lrnsys-outline-item>\n        </template>\n      </div>\n    '],t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}})));return c=function(){return i},i}var h=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&a(e,t)}(p,n.PolymerElement);var t,i,d,h=m(p);function p(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,p),h.call(this)}return t=p,d=[{key:"template",get:function(){return n.html(c())}},{key:"tag",get:function(){return"lrnsys-outline"}},{key:"properties",get:function(){return{data:{type:Array,value:null},items:{type:Array,value:null,notify:!0},activeItem:{type:Object,notify:!0}}}}],(i=[{key:"connectedCallback",value:function(){u(r(p.prototype),"connectedCallback",this).call(this),window.SimpleModal.requestAvailability(),this.addEventListener("delete-item",this._handleRemoveItem.bind(this)),this.addEventListener("indent-item",this._handleIndentItem.bind(this)),this.addEventListener("add-item",this._handleAddItem.bind(this)),this.addEventListener("move-item",this._handleMoveItem.bind(this)),this.addEventListener("change-item",this._handleChangeItem.bind(this)),this.addEventListener("focus-item",this._handleFocusItem.bind(this)),this.addEventListener("blur-item",this._handleBlurItem.bind(this))}},{key:"disconnectedCallback",value:function(){this.removeEventListener("delete-item",this._handleRemoveItem.bind(this)),this.removeEventListener("indent-item",this._handleIndentItem.bind(this)),this.removeEventListener("add-item",this._handleAddItem.bind(this)),this.removeEventListener("move-item",this._handleMoveItem.bind(this)),this.removeEventListener("change-item",this._handleChangeItem.bind(this)),this.removeEventListener("focus-item",this._handleFocusItem.bind(this)),this.removeEventListener("blur-item",this._handleBlurItem.bind(this)),u(r(p.prototype),"disconnectedCallback",this).call(this)}},{key:"ready",value:function(){u(r(p.prototype),"ready",this).call(this),(null===this.data||this.data.length<1)&&(this.__tempid=void 0===this.__tempid?0:this.__tempid+1,this.data=[{id:"outline-item-"+this.__tempid,title:"",order:0,parent:null}]),this.setData(this.data)}},{key:"setData",value:function(e){if(void 0!==e&&e.length>0){var t=-1;for(var i in e){var n=parseInt(this._getIndent(e,i));this.__tempid=void 0===this.__tempid?0:this.__tempid+1,e[i].index=parseInt(i),e[i].indent=n,e[i].prevSibling=this._getSibling(parseInt(i),n,!0),e[i].nextSibling=this._getSibling(parseInt(i),n,!1),e[i].disableUp=null===e[i].prevSibling,e[i].disableDown=null===e[i].nextSibling,e[i].disableLeft=0===n,e[i].disableRight=n>t,e[i].id=void 0===e[i].id?"outline-item-"+this.__tempid:e[i].id,t=n}}this.set("items",[]),this.set("items",e)}},{key:"getData",value:function(){for(var e in this.items)this.items[e].order=this._getOrder(this.items[e]),this.notifyPath("items.".concat(e,".order"));return this.items}},{key:"addItem",value:function(e){var t=this,i=e.item,n=e.new,l=this.items.findIndex(function(e){return e.id===i.id})+1;this.__tempid=this.__tempid+1,this.splice("items",l,0,{id:"outline-item-"+this.__tempid,title:n,indent:i.indent,parent:i.parent}),this.items[l].indentLevel=i.indent,this.notifyPath("items.".concat(l,".indentLevel")),this.setData(this.items),void 0!==this.__focusedItem&&null!==this.__focusedItem&&s.microTask.run(function(){setTimeout(function(){t.__focusedItem=i.nextElementSibling,t.__focusedItem.focus()},50)})}},{key:"removeItem",value:function(e){var t=this.items.findIndex(function(t){return t.id===e.id}),i=document.createElement("button");i.raised=!0,i.addEventListener("click",this._deleteItemConfirm.bind(this)),i.appendChild(document.createTextNode("Yes, delete"));var n=new CustomEvent("simple-modal-show",{bubbles:!0,cancelable:!0,detail:{title:"Do you really want to delete ".concat(this.items[t].title,"?"),elements:{buttons:i},styles:{"--simple-modal-width":"75vw","--simple-modal-max-width":"75vw","--simple-modal-min-height":"50vh"},invokedBy:e.shadowRoot.querySelector("#delete"),clone:!1}});this.dispatchEvent(n)}},{key:"_deleteItemConfirm",value:function(e){var t=this,i=this.items.findIndex(function(e){return e.id===t.activeItem.id});this.activeItem.classList.add("collapse-to-remove");var n=new CustomEvent("simple-modal-hide",{bubbles:!0,cancelable:!0,detail:{}});this.dispatchEvent(n),setTimeout(function(){for(var e in t.__focusedItem=t.activeItem.previousElementSibling,t.items)t.items[e].parent==t.items[i].id&&(t.items[e].parent=t.items[i].parent);t.activeItem.classList.remove("collapse-to-remove"),t.splice("items",i,1),void 0!==t.__focusedItem&&null!==t.__focusedItem&&s.microTask.run(function(){setTimeout(function(){t.__focusedItem.focus()},50)})},300)}},{key:"moveItem",value:function(e,t){var i=this,n=e.index,l=this._getLastChild(e),o=l-n+1,r=t?this.items[n].prevSibling:this._getLastChild(this.items[l+1])-o+1;if(r>-1&&r<this.items.length&&(t&&!e.disableUp||!t&&!e.disableDown)){var a=this.splice("items",n,o);this.splice("items",r,0,a),this.__focusedItem=this.shadowRoot.querySelector("#itemslist").querySelectorAll("lrnsys-outline-item")[r],this.setData(this.items),void 0!==this.__focusedItem&&null!==this.__focusedItem&&s.microTask.run(function(){setTimeout(function(){i.__focusedItem.focus()},50)})}}},{key:"_adjustIndent",value:function(e,t){if(t>0&&!e.disableRight||t<0&&!e.disableLeft){var i=parseInt(e.index),n=e.indent,s=e.indent+t,o=i+1,r=null!==e.prevSibling&&"undefined"!==l(e.prevSibling)?e.prevSibling.id:null,a=this._getItemById(e.parent)&&this._getItemById(e.parent).parent?this._getItemById(e.parent).parent.id:null;for(e.indent=s,e.parent=t>0?r:a,e.prevSibling=this._getSibling(i,s,!0),e.nextSibling=this._getSibling(i,s,!1),e.disableUp=null===e.prevSibling,e.disableDown=null===e.nextSibling,e.disableLeft=0===s,e.disableRight=null===this.items[i-1]||"undefined"===l(this.items[i-1])||s>this.items[i-1].indentLevel,this.set("items.".concat(i),e),this.notifyPath("items.".concat(i,".*"));null!==this.items[o]&&void 0!==this.items[o]&&n<this.items[o].indentLevel;)this.items[o].indentLevel=this.items[o].indentLevel+t,this.notifyPath("items.".concat(o,".indentLevel")),o++,next=this.items[o]}}},{key:"_getLastChild",value:function(e){var t=null!=e?this._getSibling(e.index,e.indent,!1):null;return null!=t?t-1:"undefined"!==l(e)&&null!==e.parent&&null!==e.parent&&null!==this._getItemById(e.parent)?this._getLastChild(this._getItemById(e.parent)):this.items.length-1}},{key:"_getIndent",value:function(e,t){if("undefined"!==l(e[t].parent)){var i=e.findIndex(function(i){return i.id===e[t].parent});if(-1!==i&&"undefined"!==l(e[i])&&void 0!==e[i].indent)return e[i].indent+1}return 0}},{key:"_getOrder",value:function(e){var t=0,i=0;for(var n in this.items)this.items[n].parent==e.parent&&this.items[n].id==e.id?i=t:this.items[n].parent==e.parent&&t++;return i}},{key:"_getSibling",value:function(e,t,i){var n=i?-1:1,s=e+n,o=null;if(null!==this.items)for(;s<this.items.length&&s>-1;)null===o&&"undefined"!==l(this.items[s])&&"undefined"!==l(this.items[e])&&this.items[s].parent===this.items[e].parent&&(o=s),s+=n;return o}},{key:"_getItemById",value:function(e,t){var i=this.items.findIndex(function(t){return t.id===e});return t=void 0===t?0:t,void 0!==this.items[i+t]?this.items[i+t]:null}},{key:"_handleAddItem",value:function(e){this.addItem(e.detail)}},{key:"_handleRemoveItem",value:function(e){this.activeItem=e.detail.item,this.removeItem(e.detail.item)}},{key:"_handleMoveItem",value:function(e){this.activeItem=e.detail.item,this.moveItem(e.detail.item,e.detail.moveUp,e.detail.byGroup)}},{key:"_handleFocusItem",value:function(e){(e.detail.moveUp?e.detail.item.previousElementSibling:e.detail.item.nextElementSibling).setSelection()}},{key:"_handleIndentItem",value:function(e){var t=e.detail.increase?1:-1;this._adjustIndent(this._getItemById(e.detail.item.id),t),this.setData(this.items)}},{key:"_handleChangeItem",value:function(e){if(null!=this._getItemById(e.detail.item.id)){var t=this.items.findIndex(function(t){return t.id===e.detail.item.id});"undefined"!==l(this.items[t])&&(this.items[t].title=e.detail.value,this.notifyPath("items.".concat(t,".title")))}}},{key:"_handleFocusItem",value:function(e){this.__focusedItem=e.srcElement}},{key:"_handleBlurItem",value:function(e){}}])&&o(t.prototype,i),d&&o(t,d),p}();window.customElements.define(h.tag,h),e.LrnsysOutline=h,Object.defineProperty(e,"__esModule",{value:!0})});
