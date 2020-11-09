!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("lit-element/lit-element.js"),require("@lrnwebcomponents/schema-behaviors/schema-behaviors.js"),require("@lrnwebcomponents/oer-schema/lib/oerschema.js")):"function"==typeof define&&define.amd?define(["exports","lit-element/lit-element.js","@lrnwebcomponents/schema-behaviors/schema-behaviors.js","@lrnwebcomponents/oer-schema/lib/oerschema.js"],t):t((e=e||self).OerSchema={},e.litElement_js,e.schemaBehaviors_js,e.oerschema_js)}(this,function(e,t,r,n){"use strict";function o(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function i(e,t,r){return t&&o(e.prototype,t),r&&o(e,r),e}function c(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach(function(t){c(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function s(e){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function l(e,t){return(l=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function p(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function f(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var r,n=s(e);if(t){var o=s(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return p(this,r)}}function h(e,t,r){return(h="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,r){var n=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=s(e)););return e}(e,t);if(n){var o=Object.getOwnPropertyDescriptor(n,t);return o.get?o.get.call(r):o.value}})(e,t,r||e)}function y(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}function d(){var e=y(["\n        :host {\n          display: inline-block;\n        }\n      "]);return d=function(){return e},e}function m(){var e=y(['\n      <span property="oer:','">\n        <slot></slot> ',"\n      </span>\n    "]);return m=function(){return e},e}var b=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&l(e,t)}(c,r.SchemaBehaviors(t.LitElement));var o=f(c);function c(){var e;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),(e=o.call(this)).text="",e.oerProperty="name",e.typeof="Resource",e}return i(c,[{key:"render",value:function(){return t.html(m(),this.oerProperty,this.text)}}],[{key:"styles",get:function(){return[t.css(d())]}},{key:"tag",get:function(){return"oer-schema"}}]),i(c,[{key:"updated",value:function(e){var t=this;h(s(c.prototype),"updated",this)&&h(s(c.prototype),"updated",this).call(this,e),e.forEach(function(e,r){"relatedResource"==r&&(t._OERLink=t._generateforComponentLink(t.relatedResource))})}},{key:"_generateforComponentLink",value:function(e){if(document&&document.head){this._OERLink&&document.head.removeChild(this._OERLink);var t=document.createElement("link");return t.setAttribute("property","oer:forComponent"),t.setAttribute("content",this.relatedResource),document.head.appendChild(t),t}}}],[{key:"properties",get:function(){return a(a({},h(s(c),"properties",this)),{},{text:{type:String},oerProperty:{type:String,attribute:"oer-property"},typeof:{type:String},relatedResource:{type:String,attribute:"related-resource"}})}},{key:"haxProperties",get:function(){return{canScale:!1,canPosition:!1,canEditSource:!1,gizmo:{title:"Schema",description:"Schematized element area",icon:"hax:oerschema",color:"blue",groups:["Instructional"],handles:[{type:"inline",text:"text"}],meta:{author:"ELMS:LN",inlineOnly:!0}},settings:{quick:[{slot:"",title:"Text",inputMethod:"textfield",icon:"editor:title"}],configure:[{slot:"",title:"Text",inputMethod:"textfield",icon:"editor:title"},{property:"typeof",title:"Schema typeof",inputMethod:"select",allowNull:!0,options:(new n.OERSchema).types},{property:"oerProperty",title:"Schema property",description:"The OER Schema property this represents",inputMethod:"select",allowNull:!0,options:{name:"name",additionalType:"additionalType",description:"description",image:"image",mainEntityOfPage:"mainEntityOfPage",sameAs:"sameAs",uri:"uri"}},{property:"relatedResource",title:"Related resource",description:"A reference to the related Schema resource",inputMethod:"textfield",icon:"editor:title"}],advanced:[]},saveOptions:{unsetAttributes:["_oerlink"]}}}}]),c}();window.customElements.define(b.tag,b),e.OerSchemaElement=b,Object.defineProperty(e,"__esModule",{value:!0})});
