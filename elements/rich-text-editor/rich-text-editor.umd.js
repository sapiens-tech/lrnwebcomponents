!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("@polymer/polymer/polymer-element.js"),require("@lrnwebcomponents/hax-body-behaviors/lib/HAXWiring.js"),require("@lrnwebcomponents/responsive-utility/responsive-utility.js"),require("@polymer/paper-button/paper-button.js"),require("@polymer/paper-tooltip/paper-tooltip.js"),require("@polymer/iron-icons/iron-icons.js"),require("@lrnwebcomponents/es-global-bridge/es-global-bridge.js"),require("@polymer/polymer/lib/utils/resolve-url.js"),require("@lrnwebcomponents/simple-picker/simple-picker.js"),require("@polymer/iron-icons/editor-icons.js"),require("@polymer/iron-resizable-behavior/iron-resizable-behavior.js"),require("@lrnwebcomponents/simple-popover/simple-popover.js"),require("@lrnwebcomponents/simple-fields/simple-fields.js"),require("@polymer/iron-icons/image-icons.js"),require("@lrnwebcomponents/md-extra-icons/md-extra-icons.js")):"function"==typeof define&&define.amd?define(["exports","@polymer/polymer/polymer-element.js","@lrnwebcomponents/hax-body-behaviors/lib/HAXWiring.js","@lrnwebcomponents/responsive-utility/responsive-utility.js","@polymer/paper-button/paper-button.js","@polymer/paper-tooltip/paper-tooltip.js","@polymer/iron-icons/iron-icons.js","@lrnwebcomponents/es-global-bridge/es-global-bridge.js","@polymer/polymer/lib/utils/resolve-url.js","@lrnwebcomponents/simple-picker/simple-picker.js","@polymer/iron-icons/editor-icons.js","@polymer/iron-resizable-behavior/iron-resizable-behavior.js","@lrnwebcomponents/simple-popover/simple-popover.js","@lrnwebcomponents/simple-fields/simple-fields.js","@polymer/iron-icons/image-icons.js","@lrnwebcomponents/md-extra-icons/md-extra-icons.js"],t):t((e=e||self).RichTextEditor={},e.polymerElement_js,null,null,null,null,null,null,e.resolveUrl_js)}(this,function(e,t,n,o,i,r,l,a,s){"use strict";function c(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function d(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function u(e,t,n){return t&&d(e.prototype,t),n&&d(e,n),e}function p(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&m(e,t)}function h(e){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function m(e,t){return(m=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function b(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function g(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?b(e):t}function y(e,t,n){return(y="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var o=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=h(e)););return e}(e,t);if(o){var i=Object.getOwnPropertyDescriptor(o,t);return i.get?i.get.call(n):i.value}})(e,t,n||e)}function f(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}function v(){var e=f(["\n  <style>\n    :host {\n      --rich-text-editor-bg: #fafafa;\n      --rich-text-editor-button-color: #444;\n      --rich-text-editor-border: 1px solid #ddd;\n      --rich-text-editor-button-border: transparent;\n      --rich-text-editor-button-disabled-color: #666;\n      --rich-text-editor-button-disabled-bg: transparent;\n      --rich-text-editor-button-toggled-color: #222;\n      --rich-text-editor-button-toggled-bg: #ddd;\n      --rich-text-editor-button-hover-color: #000;\n      --rich-text-editor-button-hover-bg: #f0f0f0;\n      --rich-text-editor-picker-border: #fafafa;\n      --rich-text-editor-selection-bg: #b3d9ff;\n    }\n    :host([hidden]) {\n      display: none;\n    }\n    :host(rich-text-editor-picker),\n    :host(rich-text-editor-emoji-picker),\n    :host(rich-text-editor-symbol-picker) {\n      --simple-picker-icon-transform: rotate(0deg);\n      --simple-picker-expanded-icon-transform: rotate(0deg);\n      --simple-picker-option: {\n        width: 24px;\n        max-width: 24px;\n      }\n    }\n    :host #collapse {\n      --a11y-collapse-margin: 0 3px;\n      --a11y-collapse-horizontal-padding: 10px;\n      --a11y-collapse-vertical-padding: 5px;\n      --a11y-collapse-border: var(--rich-text-editor-bg);\n      --a11y-collapse: {\n        position: relative;\n      }\n      --a11y-collapse-icon-rotated: {\n        transform: rotate(0deg);\n      }\n      --a11y-collapse-content: {\n        position: absolute;\n        top: 26px;\n        background: white;\n        z-index: 9999;\n      }\n      --a11y-collapse-content-expanded: {\n        border: 1px solid var(--rich-text-editor-button-color);\n        box-shadow: 0px 0px 1px #888;\n      }\n    }\n    :host paper-tooltip {\n      z-index: 99999;\n    }\n    :host #prompt:not([hidden]) {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      z-index: 9999;\n    }\n    :host #prompt paper-input {\n      width: 200px;\n      padding: 0;\n    }\n    :host .confirm-or-cancel {\n      min-width: 40px;\n    }\n    :host #button,\n    :host .rtebutton {\n      text-transform: unset;\n      padding: 0;\n      transition: all 0.5s;\n      min-width: 24px;\n      height: 24px;\n      color: var(--rich-text-editor-button-color);\n      border-color: var(--rich-text-editor-button-border);\n      --simple-picker-color: var(--rich-text-editor-button-color);\n      --simple-picker-background-color: var(--rich-text-editor-bg);\n      --simple-picker-sample-border-color: var(--rich-text-editor-bg);\n      --simple-picker-border-color: var(--rich-text-editor-button-color);\n      --simple-picker-icon-tranform: rotate(0deg);\n      --simple-picker-expanded-icon-tranform: rotate(-90deg);\n      --simple-picker-option-null: {\n        display: none;\n      }\n      --simple-picker-collapse: {\n        top: 26px;\n      }\n      --simple-picker-sample-null-label: {\n        display: none;\n      }\n      @apply --rich-text-editor-button;\n    }\n    :host([disabled]) #button,\n    :host([disabled]) .rtebutton {\n      cursor: not-allowed;\n      color: var(--rich-text-editor-button-disabled-color);\n      background-color: var(--rich-text-editor-button-disabled-bg);\n      @apply --rich-text-editor-button-disabled;\n    }\n    :host #button[toggled],\n    :host .rtebutton[toggled] {\n      color: var(--rich-text-editor-button-toggled-color);\n      background-color: var(--rich-text-editor-button-toggled-bg);\n      @apply --rich-text-editor-button-toggled;\n    }\n    :host #button:focus,\n    :host #button:hover,\n    :host .rtebutton:focus,\n    :host .rtebutton:hover {\n      color: var(--rich-text-editor-button-hover-color);\n      background-color: var(--rich-text-editor-button-hover-bg);\n    }\n    :host #button #icon:not([icon]),\n    :host .rtebutton #icon:not([icon]) {\n      display: none;\n    }\n    :host .offscreen {\n      position: absolute;\n      left: -999999px;\n      top: 0;\n      height: 0;\n      width: 0;\n      overflow: hidden;\n    }\n  </style>\n"]);return v=function(){return e},e}var x=document.createElement("dom-module"),k=t.html(v());function w(){var e=f(['\n      <style include="rich-text-editor-styles"></style>\n      <iron-a11y-keys\n        id="a11y"\n        target="[[__a11y]]"\n        keys="enter"\n        on-keys-pressed="_buttonTap"\n      >\n      </iron-a11y-keys>\n      <paper-button\n        id="button"\n        class="rtebutton"\n        disabled$="[[disabled]]"\n        controls="[[controls]]"\n        on-tap="_buttonTap"\n        tabindex="0"\n        toggled$="[[toggled]]"\n      >\n        <iron-icon\n          id="icon"\n          aria-hidden\n          icon$="[[_regOrToggled(icon,toggledIcon,toggled)]]"\n        >\n        </iron-icon>\n        <span id="label" class$="[[labelStyle]]"></span>\n      </paper-button>\n      <paper-tooltip id="tooltip" for="button"></paper-tooltip>\n    ']);return w=function(){return e},e}x.appendChild(k),x.register("rich-text-editor-styles");var _=function(e){function n(){return c(this,n),g(this,h(n).apply(this,arguments))}return p(n,t.PolymerElement),u(n,[{key:"ready",value:function(){y(h(n.prototype),"ready",this).call(this);this.addEventListener("mousedown",function(e){e.preventDefault()}),this.addEventListener("keydown",function(e){e.preventDefault()})}},{key:"connectedCallback",value:function(){y(h(n.prototype),"connectedCallback",this).call(this),this.__a11y=this.$.button}},{key:"disconnectedCallback",value:function(){y(h(n.prototype),"disconnectedCallback",this).call(this)}},{key:"doTextOperation",value:function(){var e=this.selection;this.toggled&&null!==this.toggledCommand?document.execCommand(this.toggledCommand,!1,this.toggledCommand||""):null!==this.command&&document.execCommand(this.command,!1,this.commandVal||""),this.selection=e}},{key:"_isToggled",value:function(e){var t=!(null===this.command||!this.toggles)&&document.queryCommandState(this.command),n=this._regOrToggled(this.label,this.toggledLabel,t);return void 0!==this.$.label&&(this.$.label.innerHTML=n),void 0!==this.$.tooltip&&(this.$.tooltip.innerHTML=n),t}},{key:"_getLabel",value:function(e){var t=!(null===this.command||!this.toggles)&&document.queryCommandState(this.command);return this._regOrToggled(this.label,this.toggledLabel,t)}},{key:"_buttonTap",value:function(e){e.preventDefault(),this.doTextOperation()}},{key:"_regOrToggled",value:function(e,t,n){return null!==t&&n?t:e}},{key:"_labelStyle",value:function(e,t){return null!=e&&""!==e&&!1===t?"offscreen":null}}],[{key:"template",get:function(){return t.html(w())}},{key:"properties",get:function(){return{command:{name:"command",type:"String",value:null},commandVal:{name:"commandVal",type:"Object",value:null,notify:!0},disabled:{name:"disabled",type:"Boolean",value:!1},icon:{name:"icon",type:"String",value:null},label:{name:"label",type:"String",value:null},labelStyle:{name:"labelStyle",type:"String",computed:"_labelStyle(icon,showTextLabel)",readOnly:!0},selection:{name:"selection",type:"Object",notify:!0,value:null},showTextLabel:{name:"showTextLabel",type:"Boolean",value:!1},toggled:{name:"toggled",type:"Boolean",computed:"_isToggled(selection)",notify:!0},__label:{name:"__label",type:"String",computed:"_getLabel(selection)",notify:!0},toggledCommand:{name:"toggledCommand",type:"String",value:null},toggledCommandVal:{name:"toggledCommandVal",type:"Object",value:null},toggledIcon:{name:"toggledIcon",type:"String",value:null},toggledLabel:{name:"toggledLabel",type:"String",value:null},toggles:{name:"toggles",type:"Boolean",value:!1},validCommands:{name:"validCommands",type:"Array",value:["backColor","bold","createLink","copy","cut","defaultParagraphSeparator","delete","fontName","fontSize","foreColor","formatBlock","forwardDelete","insertHorizontalRule","insertHTML","insertImage","insertLineBreak","insertOrderedList","insertParagraph","insertText","insertUnorderedList","justifyCenter","justifyFull","justifyLeft","justifyRight","outdent","paste","redo","selectAll","strikethrough","styleWithCss","superscript","undo","unlink","useCSS"],readOnly:!0}}}},{key:"tag",get:function(){return"rich-text-editor-button"}}]),n}();window.customElements.define(_.tag,_);var E=function(e){function t(){return c(this,t),g(this,h(t).apply(this,arguments))}return p(t,_),u(t,[{key:"_buttonTap",value:function(e){this.dispatchEvent(new CustomEvent("rich-text-more-button-tap",{detail:this}))}},{key:"_updateLabels",value:function(e){var t=this._regOrToggled(this.label,this.toggledLabel,e);this.$.label.innerHTML=t,this.$.tooltip.innerHTML=t}}],[{key:"properties",get:function(){return{toggled:{name:"toggled",type:"Boolean",value:!1,observer:"_updateLabels",reflectToAttribute:!0},collapseMax:{name:"collapseMax",type:"String",value:"xs",reflectToAttribute:!0}}}},{key:"tag",get:function(){return"rich-text-editor-more-button"}}]),t}();function j(){var e=f(['\n      <style include="rich-text-editor-styles"></style>\n      <simple-picker\n        id="button"\n        class="rtebutton"\n        disabled$="[[disabled]]"\n        controls="[[controls]]"\n        on-change="_pickerChange"\n        tabindex="0"\n        title-as-html$="[[titleAsHtml]]"\n        options="[[options]]"\n        value="{{value}}"\n      >\n        <span id="label" class$="[[labelStyle]]"></span>\n      </simple-picker>\n      <paper-tooltip id="tooltip" for="button"></paper-tooltip>\n    ']);return j=function(){return e},e}window.customElements.define(E.tag,E);var O=function(e){function n(){return c(this,n),g(this,h(n).apply(this,arguments))}return p(n,_),u(n,[{key:"_isToggled",value:function(e){if(null!==e&&"formatBlock"===this.command){var t=e.commonAncestorContainer.parentNode,n=[];this.options.forEach(function(e){e.forEach(function(e){n.push(e.value)})}),this.$.button.value=null!==t.closest(n.join(","))?t.closest(n.join(",")).tagName.toLowerCase():null}return!1}},{key:"_setOptions",value:function(){this.set("options",this._getPickerOptions(data,this.allowNull,this.icon))}},{key:"_pickerChange",value:function(e){var t=this.$.button.value;if(e.preventDefault(),null!==t&&void 0!==this.selection&&null!==this.selection){if(this.commandVal=this.$.button.value,this.command="formatBlock")this.doTextOperation();else if(this.command="insertNode"){var n=this.block?document.createElement(t):document.createTextNode(t);this.selection.extractContents(),this.selection.insertNode(n)}!0!==this.block&&(this.$.button.value=null,this.dispatchEvent(new CustomEvent("deselect",{detail:this})))}}},{key:"_getOptionData",value:function(e){return{alt:e.alt,icon:e.icon,style:e.style,value:e.value}}},{key:"_getPickerOptions",value:function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,o=!1===t&&null===n?[{alt:"null",icon:n,value:null}]:[],i=Math.sqrt(e.length)<11?Math.ceil(Math.sqrt(e.length)):10,r=0;r<e.length;r++){var l=Math.floor(r/i),a=r-l*i,s=this._getOptionData(e[r]);void 0!==o[l]&&null!==o[l]||(o[l]=[]),0===l&&!1===t&&null!==n&&(o[0][0]={alt:"null",icon:n,value:null},a++),o[l][a]=s}return o}}],[{key:"template",get:function(){return t.html(j())}},{key:"properties",get:function(){return{allowNull:{name:"allowNull",type:"Boolean",value:!1},command:{name:"command",type:"String",value:"insertHTML",readOnly:!0},icon:{name:"icon",type:"String",value:null},options:{name:"options",type:"Array",value:[],notify:!0},titleAsHtml:{name:"titleAsHtml",type:"Boolean",value:!1},value:{name:"value",type:"Object",value:null}}}},{key:"tag",get:function(){return"rich-text-editor-picker"}}]),n}();window.customElements.define(O.tag,O);var T=function(e){function t(){return c(this,t),g(this,h(t).apply(this,arguments))}return p(t,O),u(t,[{key:"_getBlockOptions",value:function(e){var t=[];return e.forEach(function(e){t.push([{alt:e.label,value:e.tag}])}),t}}],[{key:"properties",get:function(){return{allowNull:{name:"allowNull",type:"Boolean",value:!1},command:{name:"command",type:"String",value:"formatBlock",readOnly:!0},blocks:{name:"blocks",type:"Array",notify:!0,value:[{label:"Paragraph",tag:"p"},{label:"Heading 1",tag:"h1"},{label:"Heading 2",tag:"h2"},{label:"Heading 3",tag:"h3"},{label:"Heading 4",tag:"h4"},{label:"Heading 5",tag:"h5"},{label:"Heading 6",tag:"h6"},{label:"Preformatted",tag:"pre"}]},options:{name:"options",type:"Array",computed:"_getBlockOptions(blocks)",notify:!0},titleAsHtml:{name:"titleAsHtml",type:"Boolean",value:!1},block:{name:"block",type:"Boolean",value:!0,readOnly:!0}}}},{key:"tag",get:function(){return"rich-text-editor-heading-picker"}}]),t}();window.customElements.define(T.tag,T);var S=function(e){function t(){var e;return c(this,t),e=g(this,h(t).call(this)),import("@polymer/iron-icons/editor-icons.js"),e}return p(t,O),u(t,null,[{key:"properties",get:function(){return{icon:{name:"icon",type:"String",value:"editor:functions",readOnly:!0},optionsSrc:{name:"optionsSrc",type:"String",value:"data/symbols.js"},symbolTypes:{name:"symbolTypes",type:"Array",value:["symbols","math","characters","greek","misc"]},titleAsHtml:{name:"titleAsHtml",type:"Boolean",value:!0,readOnly:!0},value:{name:"value",type:"String",value:"null"}}}},{key:"tag",get:function(){return"rich-text-editor-symbol-picker"}}]),u(t,[{key:"connectedCallback",value:function(){y(h(t.prototype),"connectedCallback",this).call(this);var e=s.pathFromUrl(decodeURIComponent("undefined"!=typeof document?document.currentScript&&document.currentScript.src||document.baseURI:new("undefined"!=typeof URL?URL:require("url").URL)("file:"+__filename).href)),n=this.optionsSrc,o="".concat(e).concat(n);window.addEventListener("es-bridge-symbols-loaded",this._setOptions.bind(this)),window.ESGlobalBridge.requestAvailability(),window.ESGlobalBridge.instance.load("symbols",o)}},{key:"disconnectedCallback",value:function(){window.removeEventListener("es-bridge-symbols-loaded",this._setOptions.bind(this)),y(h(t.prototype),"disconnectedCallback",this).call(this)}},{key:"_setOptions",value:function(){var e=[];this.symbolTypes.forEach(function(t){e=e.concat(symbols[t])}),this.set("options",this._getPickerOptions(e,this.allowNull,this.icon))}},{key:"_getOptionData",value:function(e){return{value:e,alt:e,icon:null,style:null}}}]),t}();function C(){var e=f(['\n      <style include="rich-text-editor-styles">\n        :host {\n          --simple-popover-padding: 0 10px;\n          --paper-input-container-focus-color: var(\n            --rich-text-editor-focus-color,\n            #000\n          );\n          --paper-input-container-invalid-color: var(\n            --rich-text-editor-error-color,\n            #800\n          );\n        }\n        :host .actions {\n          text-align: right;\n        }\n        :host #cancel.rtebutton:focus,\n        :host #cancel.rtebutton:hover {\n          color: var(\n            --rich-text-editor-cancel-color,\n            var(--rich-text-editor-error-color)\n          );\n          background-color: var(\n            --rich-text-editor-cancel-hover-color,\n            var(--rich-text-editor-button-hover-bg)\n          );\n        }\n        :host #confirm.rtebutton:focus,\n        :host #confirm.rtebutton:hover {\n          color: var(\n            --rich-text-editor-confirm-color,\n            var(--rich-text-editor-focus-color)\n          );\n          background-color: var(\n            --rich-text-editor-confirm-hover-color,\n            var(--rich-text-editor-button-hover-bg)\n          );\n        }\n      </style>\n      <simple-popover id="prompt" hidden$="[[!target]]" for$="[[for]]" auto>\n        <form id="form">\n          <simple-fields\n            id="formfields"\n            fields="[[fields]]"\n            value="{{value}}"\n          ></simple-fields>\n          <div class="actions">\n            <iron-a11y-keys\n              id="a11ycancel"\n              target="[[__a11ycancel]]"\n              keys="enter"\n              on-keys-pressed="_cancel"\n            >\n            </iron-a11y-keys>\n            <paper-button\n              id="cancel"\n              class="rtebutton"\n              controls="[[__targetId]]"\n              on-tap="_cancel"\n              tabindex="0"\n            >\n              <iron-icon id="icon" aria-hidden icon="clear"> </iron-icon>\n              <span id="label" class="offscreen">Cancel</span>\n            </paper-button>\n            <paper-tooltip id="tooltip" for="cancel">Cancel</paper-tooltip>\n            <iron-a11y-keys\n              id="a11yconfirm"\n              target="[[__a11yconfirm]]"\n              keys="enter"\n              on-keys-pressed="_confirm"\n            >\n            </iron-a11y-keys>\n            <paper-button\n              id="confirm"\n              class="rtebutton"\n              controls="[[__targetId]]"\n              on-tap="_confirm"\n              tabindex="0"\n            >\n              <iron-icon id="icon" aria-hidden icon="check"> </iron-icon>\n              <span id="label" class="offscreen">OK</span>\n            </paper-button>\n            <paper-tooltip id="tooltip" for="confirm">OK</paper-tooltip>\n          </div>\n        </form>\n      </simple-popover>\n    ']);return C=function(){return e},e}window.customElements.define(S.tag,S),window.richTextEditorPrompt=window.richTextEditorPrompt||{},window.richTextEditorPrompt.requestAvailability=function(){return window.richTextEditorPrompt.instance||(window.richTextEditorPrompt.instance=document.createElement("rich-text-editor-prompt"),document.body.appendChild(window.richTextEditorPrompt.instance)),window.richTextEditorPrompt.instance};var L=function(e){function n(){var e;c(this,n);b(e=g(this,h(n).call(this)));return window.richTextEditorPrompt.instance?e:(window.richTextEditorPrompt.instance=b(e),g(e,b(e)))}return p(n,t.PolymerElement),u(n,null,[{key:"template",get:function(){return t.html(C())}},{key:"tag",get:function(){return"rich-text-editor-prompt"}},{key:"properties",get:function(){return{for:{type:String,value:null},selection:{type:Object,value:null},target:{type:Object,value:null},fields:{type:Array,value:null},value:{type:Object,value:null,observer:"_valueChanged"}}}}]),u(n,[{key:"connectedCallback",value:function(){y(h(n.prototype),"connectedCallback",this).call(this),this.__a11yconfirm=this.$.confirm,this.__a11ycancel=this.$.cancel}},{key:"_valueChanged",value:function(){console.log("_valueChanged")}},{key:"setTarget",value:function(e){this.clearTarget();var t=e.fields,n=e.value;this.target=e.target,this.set("fields",t),this.set("value",n),this.__el=e,this.for=e.target.getAttribute("id")}},{key:"clearTarget",value:function(){console.log("clearTarget",this.for),this.for&&(this.for=null,this.target=null,this.set("fields",null),this.set("value",null),this.__selection=null,this.__el=null)}},{key:"_cancel",value:function(e){e.preventDefault(),this.clearTarget()}},{key:"_confirm",value:function(e){e.preventDefault(),this.__el.value=this.value,this.__el.doTextOperation(),this.clearTarget()}}]),n}();window.customElements.define(L.tag,L);var A=function(e){function t(){return c(this,t),g(this,h(t).apply(this,arguments))}return p(t,_),u(t,[{key:"ready",value:function(){y(h(t.prototype),"ready",this).call(this),console.log(getComputedStyle(this).getPropertyValue("--rich-text-editor-picker-border")),this.__popover=window.richTextEditorPrompt.requestAvailability()}},{key:"_buttonTap",value:function(e){e.preventDefault(),this.getSelectionData(),this.__popover.setTarget(this)}},{key:"getSelectionData",value:function(){var e=this.selection.commonAncestorContainer,t="A"===e.tagName?e:e.parentNode;"A"===t.tagName?(this.value.link=t.getAttribute("href"),this.target=t):(this.target=document.createElement("a"),this.target.appendChild(this.selection.extractContents()),this.selection.insertNode(this.target)),this.target.getAttribute("id")||this.target.setAttribute("id","prompt"+Date.now()),this.__style=this.style,this.target.style.backgroundColor=getComputedStyle(this).getPropertyValue("--rich-text-editor-selection-bg"),this.value.text=this.target.innerHTML}},{key:"doTextOperation",value:function(){if(null!==this.value.link&&""!==this.value.link.trim())this.target.setAttribute("href",this.value.link.trim()),this.target.innerHTML=this.value.text,this.target.style=this.__style;else{for(var e=this.target.parentNode;this.target.firstChild;)e.insertBefore(this.target.firstChild,this.target);e.removeChild(this.target)}this.target=null,this.value={},this.dispatchEvent(new CustomEvent("deselect",{detail:this}))}}],[{key:"properties",get:function(){return{fields:{type:Array,value:[{property:"text",title:"Text",description:"The link text",inputMethod:"textfield"},{property:"link",title:"Link",description:"The link URL",inputMethod:"textfield"}]},prompt:{name:"prompt",type:String,value:"Value"},target:{name:"target",type:Object,value:null},value:{type:Object,value:{link:null}}}}},{key:"tag",get:function(){return"rich-text-editor-link"}}]),t}();function P(){var e=f(['\n<style>:host {\n  display: block;\n  width: 100%;\n  margin: 0;\n  padding: 0;\n  z-index: 9999;\n  @apply --rich-text-editor;\n}\n:host([sticky]) {\n  position: sticky;\n  top: 0;\n}\n:host #toolbar {\n  display: flex;\n  opacity: 1;\n  margin: 0;\n  align-items: stretch;\n  flex-wrap: wrap;\n  justify-content: flex-start;\n  background-color: var(--rich-text-editor-bg);\n  border: var(--rich-text-editor-border);\n  font-size: 12px;\n  transition: all 0.5s;\n  @apply --rich-text-editor-toolbar;\n} \n:host #toolbar[aria-hidden]{\n  visibility: hidden;\n  opacity: 0;\n  height: 0;\n}\n:host #toolbar .group {\n  display: flex;\n  flex-wrap: nowrap;\n  justify-content: space-evenly;\n  align-items: stretch;\n  padding: 0 3px;\n  @apply --rich-text-editor-toolbar-group;\n}\n:host #toolbar .group:not(:last-of-type) {\n  margin-right: 3px;\n  border-right: var(--rich-text-editor-border);\n  @apply --rich-text-editor-toolbar-divider;\n}\n:host #toolbar .button {\n  display: flex;\n  flex: 0 0 auto;\n  align-items: stretch;\n  margin: 3px;\n}\n:host #toolbar #morebutton {\n  flex: 1 0 auto;\n  justify-content: flex-end;\n}\n\n:host([responsive-size="xs"]) #morebutton[collapse-max="xs"],\n:host([responsive-size="sm"]) #morebutton[collapse-max*="s"],\n:host([responsive-size="md"]) #morebutton:not([collapse-max*="l"]),\n:host([responsive-size="lg"]) #morebutton:not([collapse-max="xl"]),\n:host([responsive-size="xl"]) #morebutton,\n\n:host([responsive-size="xs"]) #toolbar[collapsed] *[collapsed-until*="m"],\n:host([responsive-size="xs"]) #toolbar[collapsed] *[collapsed-until*="l"],\n:host([responsive-size="sm"]) #toolbar[collapsed] *[collapsed-until="md"],\n:host([responsive-size="sm"]) #toolbar[collapsed] *[collapsed-until*="l"],\n:host([responsive-size="md"]) #toolbar[collapsed] *[collapsed-until*="l"],\n:host([responsive-size="lg"]) #toolbar[collapsed] *[collapsed-until="xl"] {\n  display: none;\n}</style>\n<style include="rich-text-editor-styles"></style>\n<div id="toolbar" aria-hidden$="[[!controls]]" collapsed$="[[collapsed]]">\n  <rich-text-editor-more-button\n    id="morebutton"\n    class="button"\n    controls="toolbar"\n    icon="more-vert"\n    label="More buttons"\n    label-toggled="Fewer buttons"\n    toggled$="[[!collapsed]]"\n    on-tap="_toggleMore">\n  </rich-text-editor-more-button>  \n</div>']);return P=function(){return e},e}window.customElements.define(A.tag,A);var U=function(e){function n(){return c(this,n),g(this,h(n).apply(this,arguments))}return p(n,t.PolymerElement),u(n,[{key:"connectedCallback",value:function(){y(h(n.prototype),"connectedCallback",this).call(this);var e=this;window.ResponsiveUtility.requestAvailability(),window.dispatchEvent(new CustomEvent("responsive-element",{detail:{element:e,attribute:"responsive-size",relativeToParent:!0}})),document.designMode="on",document.addEventListener("selectionchange",function(t){e.getUpdatedSelection()})}},{key:"disconnectedCallback",value:function(){y(h(n.prototype),"disconnectedCallback",this).call(this);var e=this;document.removeEventListener("selectionchange",function(t){e.getUpdatedSelection()})}},{key:"cancel",value:function(){this.editableElement.innerHTML=this.canceled,this.editTarget(null)}},{key:"editTarget",value:function(e){void 0!==e.getAttribute("id")&&null!==e.getAttribute("id")||e.setAttribute("id",this._generateUUID()),this.editableElement!==e&&(null!==this.editableElement&&(this.editableElement.contentEditable=!1,this.editableElement=null),e.parentNode.insertBefore(this,e),this.editableElement=e,this.canceled=e.innerHTML,this.editableElement.contentEditable=!0,this.controls=e.getAttribute("id"))}},{key:"getUpdatedSelection",value:function(){console.log("selectionchange");var e=this;e.selection=void 0===e.editableElement||null===e.editableElement?null:e.editableElement.getSelection?e.editableElement.getSelection():e._getRange(),this.buttons.forEach(function(t){t.selection=null,t.selection=e.selection})}},{key:"removeEditableRegion",value:function(e){for(var t=this,n=0;n<this.editableElements.length;n++){var o=this.editableElements[n];o[0]===e&&(o[0].removeEventListener("click",function(n){t.editTarget(e)}),e.removeEventListener("blur",function(e){t.getUpdatedSelection()}),e.removeEventListener("mouseout",function(e){t.getUpdatedSelection()}),o[1].disconnect(),this.set("editableElements",this.editableElements.splice(n,1)))}}},{key:"addEditableRegion",value:function(e){var t=this,n=new MutationObserver(function(e){t.getUpdatedSelection()});e.addEventListener("click",function(n){t.editTarget(e)}),e.addEventListener("blur",function(e){t.getUpdatedSelection()}),e.addEventListener("mouseout",function(e){t.getUpdatedSelection()}),n.observe(e,{attributes:!1,childList:!0,subtree:!0,characterData:!1}),t.push("editableElements",[e,n])}},{key:"_addButton",value:function(e,t){var n=this,o=document.createElement(e.type);for(var i in e)o[i]=e[i];return o.setAttribute("class","button"),o.addEventListener("deselect",function(e){console.log("deselect"),n._getRange().collapse(!1)}),t.appendChild(o),o}},{key:"_generateUUID",value:function(){return"ss-s-s-s-sss".replace(/s/g,this._uuidPart)}},{key:"_getButtons",value:function(e){var t=this,n=t.$.toolbar,o=this.$.morebutton,i=0,r=["xs","sm","md","lg","xl"],l=[];return n.innerHTML="",e.forEach(function(e){if("button-group"===e.type){var a=document.createElement("div");a.setAttribute("class","group"),void 0!==e.collapsedUntil&&null!==e.collapsedUntil&&a.setAttribute("collapsed-until",e.collapsedUntil),i=Math.max(i,r.indexOf(e.collapsedUntil)),e.buttons.forEach(function(e){i=Math.max(i,r.indexOf(e.collapsedUntil)),l.push(t._addButton(e,a))}),n.appendChild(a)}else i=Math.max(i,r.indexOf(e.collapsedUntil)),l.push(t._addButton(e,n));n.appendChild(o),o.collapseMax=r[i]}),l}},{key:"_getRange",value:function(){var e=window.getSelection();return e.getRangeAt&&e.rangeCount?e.getRangeAt(0):e||void 0}},{key:"_preserveSelection",value:function(){var e=window.getSelection(),t=this.selection;this.buttons.forEach(function(e){e.selection=t}),e.removeAllRanges(),e.addRange(t)}},{key:"_toggleMore",value:function(e){this.collapsed=!this.collapsed}},{key:"_uuidPart",value:function(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}}],[{key:"template",get:function(){return t.html(P())}},{key:"haxProperties",get:function(){return{canScale:!0,canPosition:!0,canEditSource:!1,gizmo:{title:"Rich text-editor",description:"a standalone rich text editor",icon:"icons:android",color:"green",groups:["Text"],handles:[{type:"todo:read-the-docs-for-usage"}],meta:{author:"nikkimk",owner:"Penn State University"}},settings:{quick:[],configure:[{property:"title",description:"",inputMethod:"textfield",required:!1,icon:"icons:android"}],advanced:[]}}}},{key:"properties",get:function(){return{buttons:{name:"buttons",type:"Array",computed:"_getButtons(config)"},canceled:{name:"canceled",type:"Object",value:!0},collapsed:{name:"collapsed",type:"Boolean",value:!0},config:{name:"config",type:"Object",value:[{label:"History",type:"button-group",buttons:[{command:"undo",icon:"undo",label:"Undo",type:"rich-text-editor-button"},{command:"redo",icon:"redo",label:"Redo",type:"rich-text-editor-button"}]},{label:"Basic Inline Operations",type:"button-group",buttons:[{label:"Heading",type:"rich-text-editor-heading-picker"},{command:"bold",icon:"editor:format-bold",label:"Bold",toggles:!0,type:"rich-text-editor-button"},{command:"italic",icon:"editor:format-italic",label:"Italics",toggles:!0,type:"rich-text-editor-button"},{command:"removeFormat",icon:"editor:format-clear",label:"Erase Format",type:"rich-text-editor-button"}]},{label:"Links",type:"button-group",buttons:[{command:"link",icon:"link",label:"Link",prompt:"href",toggledCommand:"unlink",toggledIcon:"mdextra:unlink",toggledLabel:"Unink",toggles:!0,type:"rich-text-editor-link"}]},{label:"Clipboard Operations",type:"button-group",buttons:[{command:"cut",icon:"content-cut",label:"Cut",type:"rich-text-editor-button"},{command:"copy",icon:"content-copy",label:"Copy",type:"rich-text-editor-button"},{command:"paste",icon:"content-paste",label:"Paste",type:"rich-text-editor-button"}]},{collapsedUntil:"md",label:"Subscript and Superscript",type:"button-group",buttons:[{command:"subscript",icon:"mdextra:subscript",label:"Subscript",toggles:!0,type:"rich-text-editor-button"},{command:"superscript",icon:"mdextra:superscript",label:"Superscript",toggles:!0,type:"rich-text-editor-button"}]},{collapsedUntil:"sm",icon:"editor:functions",label:"Insert Symbol",symbolTypes:["symbols"],type:"rich-text-editor-symbol-picker"},{collapsedUntil:"sm",label:"Lists and Indents",type:"button-group",buttons:[{command:"insertOrderedList",icon:"editor:format-list-numbered",label:"Ordered List",toggles:!0,type:"rich-text-editor-button"},{command:"insertUnorderedList",icon:"editor:format-list-bulleted",label:"Unordered List",toggles:!0,type:"rich-text-editor-button"},{collapsedUntil:"lg",command:"formatBlock",commandVal:"blockquote",label:"Blockquote",icon:"editor:format-quote",type:"rich-text-editor-button"},{label:"Increase Indent",icon:"editor:format-indent-increase",event:"text-indent",command:"indent",type:"rich-text-editor-button"},{label:"Decrease Indent",icon:"editor:format-indent-decrease",event:"text-outdent",command:"outdent",type:"rich-text-editor-button"}]}]},controls:{name:"controls",type:"String",value:null},editableElements:{name:"editableElements",type:"Array",value:[]},editableElement:{name:"editableElement",type:"Object",value:null},responsiveSize:{name:"responsiveSize",type:"String",value:"xs",reflectToAttribute:!0},savedSelection:{name:"savedSelection",type:"Object",value:null},selection:{name:"selection",type:"Object",value:null},sticky:{name:"sticky",type:"Boolean",value:!1,reflectToAttribute:!0}}}},{key:"tag",get:function(){return"rich-text-editor"}}]),n}();window.customElements.define(U.tag,U),e.RichTextEditor=U,Object.defineProperty(e,"__esModule",{value:!0})});
//# sourceMappingURL=rich-text-editor.umd.js.map
