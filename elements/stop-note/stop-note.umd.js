!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("lit-element/lit-element.js"),require("@lrnwebcomponents/schema-behaviors/schema-behaviors.js"),require("@lrnwebcomponents/utils/lib/remoteLinkBehavior.js"),require("@lrnwebcomponents/simple-icon/lib/simple-iconset.js"),require("@lrnwebcomponents/simple-icon/simple-icon.js")):"function"==typeof define&&define.amd?define(["exports","lit-element/lit-element.js","@lrnwebcomponents/schema-behaviors/schema-behaviors.js","@lrnwebcomponents/utils/lib/remoteLinkBehavior.js","@lrnwebcomponents/simple-icon/lib/simple-iconset.js","@lrnwebcomponents/simple-icon/simple-icon.js"],t):t((e=e||self).StopNote={},e.litElement_js,e.schemaBehaviors_js,e.remoteLinkBehavior_js,e.simpleIconset_js)}(this,function(e,t,n,o,r){"use strict";function i(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function s(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),e}function c(e){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function a(e,t){return(a=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function l(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function p(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var n,o=c(e);if(t){var r=c(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return l(this,n)}}function u(e,t,n){return(u="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var o=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=c(e)););return e}(e,t);if(o){var r=Object.getOwnPropertyDescriptor(o,t);return r.get?r.get.call(n):r.value}})(e,t,n||e)}function f(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}function d(){var e=f(['\n        :host {\n          display: block;\n          width: auto;\n          --background-color: #f7f7f7;\n          --accent-color: #d32f2f;\n          margin-bottom: 20px;\n        }\n\n        simple-icon {\n          --simple-icon-height: 100px;\n          --simple-icon-width: 100px;\n        }\n\n        :host([icon="stopnoteicons:stop-icon"]) {\n          --accent-color: #d8261c;\n        }\n\n        :host([icon="stopnoteicons:warning-icon"]) {\n          --accent-color: #ffeb3b;\n        }\n\n        :host([icon="stopnoteicons:confirm-icon"]) {\n          --accent-color: #81c784;\n        }\n\n        :host([icon="stopnoteicons:book-icon"]) {\n          --accent-color: #21a3db;\n        }\n\n        .container {\n          display: flex;\n          width: auto;\n        }\n\n        .message_wrap {\n          border-right: 7px solid var(--accent-color);\n          padding: 10px 25px;\n          flex: 1 1 auto;\n          background-color: var(--background-color);\n        }\n\n        .main_message {\n          font-size: 32px;\n          margin-top: 10px;\n        }\n\n        .secondary_message {\n          margin-top: 5px;\n          font-size: 19.2px;\n          float: left;\n        }\n\n        .link a {\n          margin-top: 5px;\n          font-size: 19.2px;\n          float: left;\n          clear: left;\n          text-decoration: none;\n          color: #2196f3;\n        }\n\n        .link a:hover {\n          color: #1976d2;\n        }\n\n        .svg {\n          display: flex;\n          justify-content: center;\n        }\n\n        .svg_wrap {\n          background-color: var(--accent-color);\n          padding: 5px;\n          width: auto;\n        }\n      ']);return d=function(){return e},e}function m(){var e=f(['\n                <div class="link">\n                  <a href="','" id="link"> More Information &gt; </a>\n                </div>\n              ']);return m=function(){return e},e}function h(){var e=f(['\n      <div class="container">\n        <div class="svg_wrap">\n          <div class="svg">\n            <simple-icon icon="','" no-colorize></simple-icon>\n          </div>\n        </div>\n        <div class="message_wrap">\n          <div class="main_message">','</div>\n          <div class="secondary_message"><slot name="message"></slot></div>\n          ',"\n        </div>\n      </div>\n    "]);return h=function(){return e},e}r.SimpleIconsetStore.registerIconset("stopnoteicons","".concat(r.pathResolver("undefined"==typeof document?new(require("url").URL)("file:"+__filename).href:document.currentScript&&document.currentScript.src||new URL("stop-note.umd.js",document.baseURI).href),"lib/svgs/"));var g=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&a(e,t)}(i,o.remoteLinkBehavior(n.SchemaBehaviors(t.LitElement)));var r=p(i);function i(){var e;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i),(e=r.call(this)).url=null,e.icon="stopnoteicons:stop-icon",e}return s(i,[{key:"render",value:function(){return t.html(h(),this.icon,this.title,this.url?t.html(m(),this.url):"")}}],[{key:"styles",get:function(){return[t.css(d())]}},{key:"tag",get:function(){return"stop-note"}}]),s(i,[{key:"updated",value:function(e){var t=this;u(c(i.prototype),"updated",this)&&u(c(i.prototype),"updated",this).call(this,e),e.forEach(function(e,n){"url"==n&&(t.remoteLinkURL=t[n])})}},{key:"firstUpdated",value:function(e){u(c(i.prototype),"firstUpdated",this)&&u(c(i.prototype),"firstUpdated",this).call(this,e),this.remoteLinkTarget=this.shadowRoot.querySelector("#link")}}],[{key:"properties",get:function(){return{title:{type:String},url:{type:String},icon:{type:String}}}},{key:"haxProperties",get:function(){return{canScale:!0,canPosition:!0,canEditSource:!1,gizmo:{title:"Stop Note",description:"A message to alert readers to specific directions.",icon:"icons:report",color:"orange",groups:["Education","Content"],handles:[{type:"text",title:"label"}],meta:{author:"ELMS:LN"}},settings:{quick:[{property:"title",title:"Title",description:"Enter title for stop-note.",inputMethod:"textfield",required:!0},{property:"url",title:"URL",description:"Enter an external url.",inputMethod:"textfield",required:!0}],configure:[{property:"title",title:"Title",description:"Enter title for stop-note.",inputMethod:"textfield",required:!0},{property:"url",title:"URL",description:"Enter an external url.",inputMethod:"haxupload",required:!0},{slot:"message",title:"Message",description:"Enter a message for stop-note.",inputMethod:"code-editor",required:!0},{property:"icon",title:"Action Icon",description:"Icon used for stop-note",inputMethod:"select",options:{"stopnoteicons:stop-icon":"Stop","stopnoteicons:warning-icon":"Warning","stopnoteicons:confirm-icon":"Confirmation","stopnoteicons:book-icon":"Notice"}}],advanced:[]},saveOptions:{unsetAttributes:["colors"]},demoSchema:[{tag:"stop-note",properties:{title:"Hold up there"},content:'<span slot="message"><strong>Read these important things!</strong>\n</span>\n'},{tag:"stop-note",properties:{title:"Warning",icon:"stopnoteicons:warning-icon"},content:'<span slot="message">You can write any warning message you want here.</span>\n'}]}}}]),i}();window.customElements.define(g.tag,g),e.StopNote=g,Object.defineProperty(e,"__esModule",{value:!0})});
