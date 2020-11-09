!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("lit-element/lit-element.js"),require("@polymer/iron-a11y-keys/iron-a11y-keys.js"),require("./lib/buttons/rich-text-editor-button-styles.js"),require("./lib/buttons/rich-text-editor-link.js"),require("./lib/buttons/rich-text-editor-image.js"),require("./lib/buttons/rich-text-editor-underline.js"),require("./lib/buttons/rich-text-editor-symbol-picker.js"),require("./lib/buttons/rich-text-editor-heading-picker.js"),require("./lib/buttons/rich-text-editor-more-button.js"),require("./lib/buttons/rich-text-editor-button.js"),require("@lrnwebcomponents/rich-text-editor/lib/rich-text-editor-styles.js"),require("@lrnwebcomponents/responsive-utility/responsive-utility.js"),require("@lrnwebcomponents/rich-text-editor/rich-text-editor.js"),require("@lrnwebcomponents/rich-text-editor/lib/singletons/rich-text-editor-selection.js"),require("@lrnwebcomponents/simple-icon/simple-icon.js"),require("@lrnwebcomponents/simple-icon/lib/simple-icons.js"),require("@lrnwebcomponents/simple-icon/lib/simple-icon-button.js"),require("@lrnwebcomponents/hax-iconset/lib/simple-hax-iconset.js"),require("@lrnwebcomponents/absolute-position-behavior/absolute-position-behavior.js")):"function"==typeof define&&define.amd?define(["exports","lit-element/lit-element.js","@polymer/iron-a11y-keys/iron-a11y-keys.js","./lib/buttons/rich-text-editor-button-styles.js","./lib/buttons/rich-text-editor-link.js","./lib/buttons/rich-text-editor-image.js","./lib/buttons/rich-text-editor-underline.js","./lib/buttons/rich-text-editor-symbol-picker.js","./lib/buttons/rich-text-editor-heading-picker.js","./lib/buttons/rich-text-editor-more-button.js","./lib/buttons/rich-text-editor-button.js","@lrnwebcomponents/rich-text-editor/lib/rich-text-editor-styles.js","@lrnwebcomponents/responsive-utility/responsive-utility.js","@lrnwebcomponents/rich-text-editor/rich-text-editor.js","@lrnwebcomponents/rich-text-editor/lib/singletons/rich-text-editor-selection.js","@lrnwebcomponents/simple-icon/simple-icon.js","@lrnwebcomponents/simple-icon/lib/simple-icons.js","@lrnwebcomponents/simple-icon/lib/simple-icon-button.js","@lrnwebcomponents/hax-iconset/lib/simple-hax-iconset.js","@lrnwebcomponents/absolute-position-behavior/absolute-position-behavior.js"],e):e((t=t||self).RichTextEditor={},t.litElement_js,null,t.richTextEditorButtonStyles_js,null,null,null,null,null,null,null,t.richTextEditorStyles_js)}(this,function(t,e,n,r,o,i,a,l,s,c,u,d){"use strict";function b(t,e,n,r,o,i,a){try{var l=t[i](a),s=l.value}catch(t){return void n(t)}l.done?e(s):Promise.resolve(s).then(r,o)}function h(t){return function(){var e=this,n=arguments;return new Promise(function(r,o){var i=t.apply(e,n);function a(t){b(i,r,o,a,l,"next",t)}function l(t){b(i,r,o,a,l,"throw",t)}a(void 0)})}}function p(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function y(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function g(t,e,n){return e&&y(t.prototype,e),n&&y(t,n),t}function m(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function f(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,r)}return n}function v(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?f(Object(n),!0).forEach(function(e){m(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}function x(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&k(t,e)}function _(t){return(_=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function k(t,e){return(k=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function w(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function E(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}();return function(){var n,r,o,i=_(t);if(e){var a=_(this).constructor;n=Reflect.construct(i,arguments,a)}else n=i.apply(this,arguments);return r=this,!(o=n)||"object"!=typeof o&&"function"!=typeof o?w(r):o}}function S(t,e,n){return(S="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=_(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(n):o.value}})(t,e,n||t)}function j(t,e){return e||(e=t.slice(0)),Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(e)}}))}function L(t){return function(t){if(Array.isArray(t))return O(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return O(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return O(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function O(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function C(){var t=j(["\n          :host,\n          html {\n            --rich-text-editor-bg: #fafafa;\n            --rich-text-editor-button-color: #444;\n            --rich-text-editor-border-color: #ddd;\n            --rich-text-editor-border: 1px solid\n              var(--rich-text-editor-border-color, #ddd);\n            --rich-text-editor-button-border: transparent;\n            --rich-text-editor-button-disabled-color: #666;\n            --rich-text-editor-button-disabled-bg: transparent;\n            --rich-text-editor-button-toggled-color: #222;\n            --rich-text-editor-button-toggled-bg: #ddd;\n            --rich-text-editor-button-hover-color: #000;\n            --rich-text-editor-button-hover-bg: #f0f0f0;\n            --rich-text-editor-picker-border: #fafafa;\n            --rich-text-editor-selection-bg: #b3d9ff;\n          }\n          .rich-text-editor-selection {\n            background-color: var(--rich-text-editor-selection-bg);\n          }\n        "]);return C=function(){return t},t}var T=function(t){return function(n){x(o,t);var r=E(o);function o(){return p(this,o),r.apply(this,arguments)}return g(o,null,[{key:"tag",get:function(){return"rich-text-editor-styles"}},{key:"styles",get:function(){return[e.css(C())]}}]),o}()},R=function(t){x(r,T(e.LitElement));var n=E(r);function r(){return p(this,r),n.apply(this,arguments)}return r}();function q(){var t=j(['\n          :host([hidden]) {\n            display: none;\n          }\n          #toolbar {\n            display: flex;\n            opacity: 1;\n            z-index: 1;\n            margin: 0;\n            align-items: stretch;\n            flex-wrap: wrap;\n            justify-content: flex-start;\n            background-color: var(--rich-text-editor-bg);\n            border: var(--rich-text-editor-border);\n            font-size: 12px;\n            transition: all 0.5s;\n          }\n          #toolbar[aria-hidden="true"] {\n            visibility: hidden;\n            opacity: 0;\n            height: 0;\n          }\n          #toolbar .group {\n            display: flex;\n            flex-wrap: nowrap;\n            justify-content: space-evenly;\n            align-items: stretch;\n            padding: 0 3px;\n          }\n          #toolbar .group:not(:last-of-type) {\n            margin-right: 3px;\n            border-right: var(--rich-text-editor-border);\n          }\n          #toolbar .button {\n            display: flex;\n            flex: 0 0 auto;\n            align-items: stretch;\n          }\n          #toolbar #morebutton {\n            flex: 1 0 auto;\n            justify-content: flex-end;\n          }\n          /* hide more button if all buttons are displayed */\n          #toolbar[responsive-size="xs"] #morebutton[collapse-max="xs"],\n          #toolbar[responsive-size="sm"] #morebutton[collapse-max*="s"],\n          #toolbar[responsive-size="md"] #morebutton:not([collapse-max*="l"]),\n          #toolbar[responsive-size="lg"] #morebutton:not([collapse-max="xl"]),\n          #toolbar[responsive-size="xl"] #morebutton,\n          /* hide buttons if they should be collaped until */\n          #toolbar[responsive-size="xs"][collapsed] *[collapsed-until*="m"],\n          #toolbar[responsive-size="xs"][collapsed] *[collapsed-until*="l"],\n          #toolbar[responsive-size="sm"][collapsed] *[collapsed-until="md"],\n          #toolbar[responsive-size="sm"][collapsed] *[collapsed-until*="l"],\n          #toolbar[responsive-size="md"][collapsed] *[collapsed-until*="l"],\n          #toolbar[responsive-size="lg"][collapsed] *[collapsed-until="xl"] {\n            display: none;\n          }\n        ']);return q=function(){return t},t}function U(){var t=j(["\n          :host([sticky]) {\n            position: sticky;\n            top: 0;\n          }\n        "]);return U=function(){return t},t}function B(){var t=j(['\n        <div\n          id="toolbar"\n          aria-live="polite"\n          aria-hidden="','"\n          ?collapsed="','"\n          @focus="','"\n        >\n          <rich-text-editor-more-button\n            id="morebutton"\n            class="button"\n            controls="toolbar"\n            icon="','"\n            label="','"\n            ?show-text-label="','"\n            ?label-toggled="','"\n            ?toggled="','"\n            @click="','"\n          >\n          </rich-text-editor-more-button>\n        </div>\n      ']);return B=function(){return t},t}function P(){var t=j([" "," "]);return P=function(){return t},t}window.customElements.define(R.tag,R),window.RichTextEditorStyleManager={},window.RichTextEditorStyleManager.instance=null,window.RichTextEditorStyleManager.requestAvailability=function(){return null==window.RichTextEditorStyleManager.instance&&(window.RichTextEditorStyleManager.instance=new R,document.head.append(window.RichTextEditorStyleManager.instance)),window.RichTextEditorStyleManager.instance};var K=function(t){return function(n){x(o,d.RichTextEditorStyles(t));var r=E(o);function o(){var t;return p(this,o),(t=r.call(this)).__selection=window.RichTextEditorSelection.requestAvailability(),t.canceled=!0,t.collapsed=!0,t.config=[{label:"History",type:"button-group",buttons:[{command:"undo",icon:"undo",label:"Undo",shortcutKeys:"ctrl+z",type:"rich-text-editor-button"},{command:"redo",icon:"redo",label:"Redo",shortcutKeys:"ctrl+shift+z",type:"rich-text-editor-button"}]},{label:"Basic Inline Operations",type:"button-group",buttons:[{label:"Format",type:"rich-text-editor-heading-picker"},{command:"bold",icon:"editor:format-bold",label:"Bold",shortcutKeys:"ctrl+b",toggles:!0,type:"rich-text-editor-button"},{command:"italic",icon:"editor:format-italic",label:"Italics",shortcutKeys:"ctrl+i",toggles:!0,type:"rich-text-editor-button"},{command:"removeFormat",icon:"editor:format-clear",label:"Erase Format",type:"rich-text-editor-button"}]},{label:"Links",type:"button-group",buttons:[{icon:"link",label:"Link",shortcutKeys:"ctrl+k",type:"rich-text-editor-link"}]},{label:"Clipboard Operations",type:"button-group",buttons:[{command:"cut",icon:"content-cut",label:"Cut",shortcutKeys:"ctrl+x",type:"rich-text-editor-button"},{command:"copy",icon:"content-copy",label:"Copy",shortcutKeys:"ctrl+c",type:"rich-text-editor-button"},{command:"paste",icon:"content-paste",label:"Paste",shortcutKeys:"ctrl+v",type:"rich-text-editor-button"}]},{collapsedUntil:"md",label:"Subscript and Superscript",type:"button-group",buttons:[{command:"subscript",icon:"mdextra:subscript",label:"Subscript",toggles:!0,type:"rich-text-editor-button"},{command:"superscript",icon:"mdextra:superscript",label:"Superscript",toggles:!0,type:"rich-text-editor-button"}]},{collapsedUntil:"sm",icon:"editor:functions",label:"Insert Symbol",symbolTypes:["symbols"],type:"rich-text-editor-symbol-picker"},{collapsedUntil:"sm",label:"Lists and Indents",type:"button-group",buttons:[{command:"insertOrderedList",icon:"editor:format-list-numbered",label:"Ordered List",toggles:!0,type:"rich-text-editor-button"},{command:"insertUnorderedList",icon:"editor:format-list-bulleted",label:"Unordered List",toggles:!0,type:"rich-text-editor-button"},{collapsedUntil:"lg",command:"formatBlock",commandVal:"blockquote",label:"Blockquote",icon:"editor:format-quote",shortcutKeys:"ctrl+'",type:"rich-text-editor-button"},{command:"indent",icon:"editor:format-indent-increase",event:"text-indent",label:"Increase Indent",shortcutKeys:"ctrl+]",type:"rich-text-editor-button"},{command:"outdent",event:"text-outdent",icon:"editor:format-indent-decrease",label:"Decrease Indent",shortcutKeys:"ctrl+[",type:"rich-text-editor-button"}]}],t.moreIcon="more-vert",t.moreLabel="More Buttons",t.moreLabelToggled="Fewer Buttons",t.moreShowTextLabel=!1,t.responsiveSize="xs",t.sticky=!1,t.__inlineWidgets=[],t.__shortcutKeys=[],t.__clipboard=document.createElement("textarea"),t.__clipboard.setAttribute("aria-hidden",!0),t.__clipboard.style.position="absolute",t.__clipboard.style.left="-9999px",t.__clipboard.style.top="0px",t.__clipboard.style.width="0px",t.__clipboard.style.height="0px",document.body.appendChild(t.__clipboard),window.addEventListener("paste",t._handlePaste.bind(w(t))),navigator.clipboard&&t.addEventListener("paste-button",t._handlePasteButton),t}return g(o,[{key:"render",value:function(){return e.html(P(),this.toolbarTemplate)}},{key:"toolbarTemplate",get:function(){return e.html(B(),this.controls?"false":"true",this.collapsed,this._addHighlight,this.moreIcon,this.moreLabel,this.moreShowTextLabel,this.moreLabelToggled,!this.collapsed,this._toggleMore)}}],[{key:"tag",get:function(){return"rich-text-editor-toolbar"}},{key:"stickyStyles",get:function(){return[e.css(U())]}},{key:"baseStyles",get:function(){return[].concat(L(S(_(o),"styles",this)),[e.css(q())])}},{key:"styles",get:function(){return[].concat(L(this.baseStyles),L(this.stickyStyles))}},{key:"properties",get:function(){return{canceled:{type:Object},collapsed:{name:"collapsed",type:Boolean,attribute:"collapsed"},config:{name:"config",type:Object,attribute:"config"},controls:{name:"controls",type:String,attribute:"controls"},editor:{name:"editor",type:Object,attribute:"editor"},id:{name:"id",type:String,attribute:"id",reflect:!0},moreIcon:{name:"moreIcon",type:String,attribute:"more-icon"},moreLabel:{name:"moreLabel",type:String,attribute:"more-label"},moreLabelToggled:{name:"moreLabelToggled",type:String,attribute:"more-label-toggled",value:"Fewer Buttons"},moreShowTextLabel:{name:"moreShowTextLabel",type:Boolean,attribute:"more-show-text-label"},responsiveSize:{name:"responsiveSize",type:String,attribute:"responsive-size",reflect:!0},savedSelection:{name:"savedSelection",type:Object},range:{name:"range",type:Object},sticky:{name:"sticky",type:Boolean,attribute:"sticky",reflect:!0},__buttons:{name:"__buttons",type:Array},__inlineWidgets:{name:"__inlineWidgets",type:Array},__selection:{type:Object},__shortcutKeys:{name:"__shortcutKeys",type:Array}}}}]),g(o,[{key:"firstUpdated",value:function(t){S(_(o.prototype),"firstUpdated",this).call(this,t),this.__buttons=this._getButtons(),window.ResponsiveUtility.requestAvailability(),window.dispatchEvent(new CustomEvent("responsive-element",{detail:{element:this.shadowRoot.querySelector("#toolbar")}}))}},{key:"updated",value:function(t){var e=this;S(_(o.prototype),"updated",this).call(this,t),t.forEach(function(t,n){"sticky"===n&&e._stickyChanged(e.sticky,t),"range"===n&&e._rangeChange()})}},{key:"connectedCallback",value:function(){S(_(o.prototype),"connectedCallback",this).call(this)}},{key:"_getButtons",value:function(){var t=this,e=this.shadowRoot&&this.shadowRoot.querySelector("#toolbar")?this.shadowRoot.querySelector("#toolbar"):void 0;if(e){var n=e.querySelector("#morebutton"),r=0,o=["xs","sm","md","lg","xl"],i=[];return e.innerHTML="",this.__shortcutKeys=[],this.config.forEach(function(a){if("button-group"===a.type){var l=document.createElement("div");l.setAttribute("class","group"),void 0!==a.collapsedUntil&&null!==a.collapsedUntil&&l.setAttribute("collapsed-until",a.collapsedUntil),r=Math.max(r,o.indexOf(a.collapsedUntil)),a.buttons.forEach(function(e){r=Math.max(r,o.indexOf(e.collapsedUntil)),(navigator.clipboard||"paste"!==e.command)&&i.push(t._addButton(e,l))}),e.appendChild(l)}else r=Math.max(r,o.indexOf(a.collapsedUntil)),(navigator.clipboard||"paste"!==a.command)&&i.push(t._addButton(a,e));e.appendChild(n),n.collapseMax=o[r]}),i}return[]}},{key:"disconnectedCallback",value:function(){S(_(o.prototype),"disconnectedCallback",this).call(this),this.dispatchEvent(new CustomEvent("deselect-rich-text-editor-editor",{bubbles:!0,cancelable:!0,composed:!0,detail:{toolbar:this,editor:this.editor}}))}},{key:"addEditableRegion",value:function(t){var e=this;t.addEventListener("mousedown",function(n){e.editTarget(t)}),t.addEventListener("focus",function(n){e.editTarget(t)}),t.addEventListener("keydown",function(n){e._handleShortcutKeys(t,n)}),t.addEventListener("blur",function(t){null!==t.relatedTarget&&"rich-text-editor"!==!t.relatedTarget.startsWith||e.editTarget(null)}),t.addEventListener("click",function(n){return e._handleEditorClick(t,n)})}},{key:"_handleEditorClick",value:function(t,e){if(t.contentEditable&&e.path[0]!==t){var n=this.buttons.filter(function(t){return t.tag===e.path[0].tagName.toLowerCase()}),r=!(!this.__selection||!this.__selection.range)&&this.__selection.range,o=!(!r||!r.startContainer)&&r.startContainer.childNodes[r.startOffset],i=!(!r||!r.endContainer)&&r.endContainer.childNodes[r.endOffset-1];n&&n[0]&&o===i&&o===e.path[0]?n[0]._buttonTap(e):n&&n[0]&&this.__selection.selectNode(e.path[0])}}},{key:"cancel",value:function(){this.editor.innerHTML=this.canceled,this.editTarget(null)}},{key:"editTarget",value:function(t){var e=this;this.editor!==t&&(this.editor&&(this.editor.contentEditable=!1,this.editor=null),this.dispatchEvent(new CustomEvent("select-rich-text-editor-editor",{bubbles:!0,cancelable:!0,composed:!0,detail:{toolbar:this,editor:this.editor}})),this.editor=t,t?(t.parentNode.insertBefore(this,t),this.canceled=t.innerHTML,this.editor.contentEditable=!0,this.controls=t.getAttribute("id"),this._removeHighlight()):this.controls=null,console.log("editor change"),this.buttons.forEach(function(n){n.target=t,n.controls=e.controls,n.range=null,n.range=e.range}))}},{key:"getRange",value:function(){var t=window.getSelection();return t.getRangeAt&&t.rangeCount?t.getRangeAt(0):t||void 0}},{key:"getSanitizeClipboard",value:function(t){var e="<body(.*\n)*>(.*\n)*</body>";return t.match(e)&&t.match(e).length>0&&(t=t.match(e)[0].replace(/<\?body(.*\n)*\>/i)),t}},{key:"makeEditableRegion",value:function(t){var e=document.createElement("rich-text-editor");t.parentNode.insertBefore(e,t),e.appendChild(t),this.addEditableRegion(e)}},{key:"pasteIntoRange",value:function(t,e){var n=document.createElement("div"),r=(window.getSelection(),t.commonAncestorContainer.parentNode.closest("[contenteditable=true]:not([disabled]),input:not([disabled]),textarea:not([disabled])"));if(this.editor=r){for(n.innerHTML=e,t&&t.extractContents&&t.extractContents(),t.insertNode(n);n.firstChild;)n.parentNode.insertBefore(n.firstChild,n);n.parentNode.removeChild(n)}}},{key:"removeEditableRegion",value:function(t){var e=this;t.removeEventListener("mouseout",function(t){e.getUpdatedSelection()}),t.removeEventListener("focus",function(n){e.editTarget(t)}),t.removeEventListener("mousedown",function(n){e.editTarget(t)}),t.removeEventListener("keydown",function(n){e._handleShortcutKeys(t,n)}),t.removeEventListener("blur",function(t){null!==t.relatedTarget&&"rich-text-editor"!==!t.relatedTarget.startsWith||e.editTarget(null),e.getUpdatedSelection()})}},{key:"_addButton",value:function(t,e){var n=this,r=document.createElement(t.type),o=r.shortcutKeys?r.shortcutKeys.replace(/ctrl\+[xcv]/g,""):"";for(var i in this.__shortcutKeys[o]=r,t)r[i]=t[i];return r.setAttribute("class","button"),r.addEventListener("deselect",function(t){console.log("button deselect",n.range,n.range.isCollapsed),n._removeHighlight(),console.log("button deselect 2",n.range,n.range.isCollapsed)}),r.inlineWidget&&this.push("__inlineWidgets",r.tag),e.appendChild(r),r}},{key:"_addHighlight",value:function(){console.log("_addHighlight",this.range),this.__selection&&this.__selection.addHighlight()}},{key:"_removeHighlight",value:function(){console.log("_removeHighlight",this.range),this.__selection&&this.__selection.removeHighlight()}},{key:"_handleKeyboardShortcuts",value:function(t){console.log("_handleKeyboardShortcuts",t)}},{key:"_handleShortcutKeys",value:function(t,e){if(t.contentEditable){var n=e.key;e.shiftKey&&(n="shift+"+n),e.altKey&&(n="alt+"+n),("MacIntel"===window.navigator.platform&&e.metaKey||e.ctrlKey)&&(n="ctrl+"+n),this.__shortcutKeys[n]&&this.__shortcutKeys[n]._keysPressed(e)}}},{key:"_handlePaste",value:function(t){var e="";t&&(t.clipboardData||t.originalEvent.clipboardData)?e=(t.originalEvent||t).clipboardData.getData("text/html"):window.clipboardData&&(e=window.clipboardData.getData("Text")),this.pasteIntoRange(this.__selection.getRange(),this.getSanitizeClipboard(e)),t.preventDefault()}},{key:"_handlePasteButton",value:function(t){var e=this;setTimeout(h(regeneratorRuntime.mark(function n(){var r,o,i;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return r=t.detail.range,o=window.getSelection(),n.next=4,navigator.clipboard.readText();case 4:i=n.sent,e.__clipboard.value=i,e.__clipboard.focus(),e.__clipboard.select(),document.execCommand("paste"),o.removeAllRanges(),o.addRange(r),e.pasteIntoRange(r,e.getSanitizeClipboard(e.__clipboard.value));case 12:case"end":return n.stop()}},n)})),2e3),t.preventDefault()}},{key:"_rangeChange",value:function(){var t=this;document.activeElement===this.editor&&(console.log("toolbar _rangeChange",this.range),this.buttons.forEach(function(e){e.range=null,e.range=t.range}))}},{key:"_stickyChanged",value:function(t,e){this.__breadcrumbs&&(this.__breadcrumbs.sticky=this.sticky)}},{key:"_toggleMore",value:function(t){this.collapsed=!this.collapsed}},{key:"buttons",get:function(){return this.__buttons}}]),o}()},A=function(t){x(r,K(e.LitElement));var n=E(r);function r(){return p(this,r),n.apply(this,arguments)}return r}();function I(){var t=j(["\n        :host #floating {\n          display: flex;\n        }\n      "]);return I=function(){return t},t}function z(){var t=j(['\n      <absolute-position-behavior\n        auto\n        id="floating"\n        fit-to-visible-bounds\n        for="','"\n        position="top"\n      >\n        ',"\n      </absolute-position-behavior>\n    "]);return z=function(){return t},t}window.customElements.define(A.tag,A);var M=function(t){x(r,K(e.LitElement));var n=E(r);function r(){var t;return p(this,r),(t=n.call(this)).sticky=!1,t.config=[{label:"Basic Inline Operations",type:"button-group",buttons:[{command:"bold",icon:"editor:format-bold",label:"Bold",toggles:!0,type:"rich-text-editor-button"},{command:"italic",icon:"editor:format-italic",label:"Italics",toggles:!0,type:"rich-text-editor-button"},{collapsedUntil:"md",command:"removeFormat",icon:"editor:format-clear",label:"Erase Format",type:"rich-text-editor-button"}]},{label:"Links",type:"button-group",buttons:[{command:"link",icon:"link",label:"Link",prompt:"href",toggledCommand:"unlink",toggledIcon:"mdextra:unlink",toggledLabel:"Unink",toggles:!0,type:"rich-text-editor-link"}]},{collapsedUntil:"md",label:"Subscript and Superscript",type:"button-group",buttons:[{command:"subscript",icon:"mdextra:subscript",label:"Subscript",toggles:!0,type:"rich-text-editor-button"},{command:"superscript",icon:"mdextra:superscript",label:"Superscript",toggles:!0,type:"rich-text-editor-button"}]},{collapsedUntil:"sm",label:"Lists and Indents",type:"button-group",buttons:[{command:"insertOrderedList",icon:"editor:format-list-numbered",label:"Ordered List",toggles:!0,type:"rich-text-editor-button"},{command:"insertUnorderedList",icon:"editor:format-list-bulleted",label:"Unordered List",toggles:!0,type:"rich-text-editor-button"}]}],t}return g(r,[{key:"render",value:function(){return e.html(z(),this.controls,S(_(r.prototype),"render",this).call(this))}}],[{key:"tag",get:function(){return"rich-text-editor-toolbar-mini"}},{key:"styles",get:function(){return[].concat(L(S(_(r),"baseStyles",this)),[e.css(I())])}}]),g(r,[{key:"updated",value:function(t){var e=this;S(_(r.prototype),"updated",this).call(this,t),t.forEach(function(t,n){"sticky"===n&&e.sticky&&(e.sticky=!1)})}}]),r}();function D(){var t=j(["\n        #button {\n          font-family: monospace;\n          display: inline-block;\n          text-align: center;\n          min-width: 30px;\n          line-height: 30px;\n          margin: 0;\n          padding: 2px 5px;\n        }\n      "]);return D=function(){return t},t}function N(){var t=j(['\n      <iron-a11y-keys\n        id="a11y"\n        .target="','"\n        keys="enter"\n        on-keys-pressed="_buttonTap"\n      >\n      </iron-a11y-keys>\n      <button\n        id="button"\n        class="rtebutton rtebreadcrumb"\n        controls="','"\n        @click="','"\n        tabindex="0"\n        part="button"\n      >\n        ',"\n      </button>\n    "]);return N=function(){return t},t}window.customElements.define(M.tag,M);var H=function(t){x(o,r.RichTextEditorButtonStyles(e.LitElement));var n=E(o);function o(){var t;return p(this,o),(t=n.call(this)).tag="",t.addEventListener("mousedown",function(t){t.preventDefault()}),t.addEventListener("keypress",function(t){t.preventDefault()}),t}return g(o,[{key:"render",value:function(){return e.html(N(),this.__a11y,this.controls,this._buttonTap,this.tag)}}],[{key:"tag",get:function(){return"rich-text-editor-breadcrumb"}},{key:"styles",get:function(){return[].concat(L(S(_(o),"styles",this)),[e.css(D())])}},{key:"properties",get:function(){return{controls:{type:String},tag:{type:String},target:{type:Object}}}}]),g(o,[{key:"connectedCallback",value:function(){S(_(o.prototype),"connectedCallback",this).call(this),this.__a11y=this.shadowRoot.querySelector("#button")}},{key:"_buttonTap",value:function(t){t.preventDefault(),this.dispatchEvent(new CustomEvent("breadcrumb-tap",{bubbles:!0,cancelable:!0,composed:!0,detail:this}))}}]),o}();function F(){var t=j(["\n        :host {\n          display: block;\n          background-color: var(--rich-text-editor-bg);\n          color: var(--rich-text-editor-button-color);\n          border: var(--rich-text-editor-border);\n          padding: 3px 10px;\n        }\n        :host([sticky]) {\n          position: sticky;\n          bottom: 0;\n        }\n        .selectednode {\n          background-color: var(--rich-text-editor-bg);\n        }\n      "]);return F=function(){return t},t}function W(){var t=j([' <span class="divider"> &gt; </span> ']);return W=function(){return t},t}function V(){var t=j(['\n              <rich-text-editor-breadcrumb\n                controls="','"\n                tag="','"\n                .target="','"\n              >\n              </rich-text-editor-breadcrumb>\n              ',"\n            "]);return V=function(){return t},t}function X(){var t=j(["\n      ","\n      ","\n    "]);return X=function(){return t},t}window.customElements.define(H.tag,H);var $=function(t){x(r,d.RichTextEditorStyles(e.LitElement));var n=E(r);function r(){var t;return p(this,r),(t=n.call(this)).hidden=!1,t.sticky=!1,t.label="Expand selection: ",t}return g(r,[{key:"render",value:function(){var t=this;return e.html(X(),this.label,this.ancestorNodes?(this.ancestorNodes||[]).map(function(n,r){return e.html(V(),t.controls,n.tag,n.target,r+1>=t.ancestorNodes.length?"":e.html(W()))}):"")}}],[{key:"tag",get:function(){return"rich-text-editor-breadcrumbs"}},{key:"styles",get:function(){return[].concat(L(S(_(r),"styles",this)),[e.css(F())])}},{key:"properties",get:function(){return{controls:{type:String},hidden:{type:Boolean,attribute:"hidden",reflect:!0},label:{type:String},range:{type:Object},sticky:{type:Boolean,reflect:!0}}}}]),g(r,[{key:"ancestorNodes",get:function(){var t=[],e=!1,n=!1;this.controls;for(this.range&&(e=this.range.commonAncestorContainer),e&&(n=e),this.hidden=!e;n&&"RICH-TEXT-EDITOR"!==n.nodeName;)t.unshift({tag:n.nodeName.toLowerCase(),target:n}),n=n.parentNode;return t}}]),r}();window.customElements.define($.tag,$);var G=function(t){x(r,K(e.LitElement));var n=E(r);function r(){var t;return p(this,r),(t=n.call(this)).breadcrumbsLabel="Expand selection: ",t.__breadcrumbs=document.createElement("rich-text-editor-breadcrumbs"),document.body.appendChild(t.__breadcrumbs),t.__breadcrumbs.addEventListener("breadcrumb-tap",t._handleBreadcrumb.bind(w(t))),t._stickyChanged(),t}return g(r,[{key:"render",value:function(){return S(_(r.prototype),"render",this).call(this)}}],[{key:"tag",get:function(){return"rich-text-editor-toolbar-full"}},{key:"styles",get:function(){return[].concat(L(S(_(r),"baseStyles",this)),L(S(_(r),"stickyStyles",this)))}},{key:"properties",get:function(){return v(v({},S(_(r),"properties",this)),{},{breadcrumbsLabel:{name:"breadcrumbsLabel",type:String,attribute:"breadcrumbs-label"}})}}]),g(r,[{key:"editTarget",value:function(t){S(_(r.prototype),"editTarget",this).call(this,t),t&&(this.__breadcrumbs.controls=t.getAttribute("id"),t.parentNode.insertBefore(this.__breadcrumbs,t.nextSibling),this.sticky?t.classList.remove("heightmax"):t.classList.add("heightmax"))}},{key:"_rangeChange",value:function(t){S(_(r.prototype),"_rangeChange",this).call(this,t),this.__breadcrumbs&&(this.__breadcrumbs.range=this.range)}},{key:"_handleBreadcrumb",value:function(t){console.log("_handleBreadcrumb",t.detail.target),t.detail.target&&(this.range.selectNode(t.detail.target),this._rangeChange(t))}},{key:"_preserveSelection",value:function(){console.log("_preserveSelection",this.__breadcrumbs.range),S(_(r.prototype),"_preserveSelection",this).call(this),this.__breadcrumbs&&(this.__breadcrumbs.range=temp)}}]),r}();function J(){var t=j(['\n:host([hidden]) {\n  display: none;\n}\n\n:host {\n  display: block;\n  min-height: 20px;\n  cursor: pointer;\n}\n\n:host([contenteditable="true"]) {\n  border: var(--rich-text-editor-border);\n  overflow: auto;\n}\n\n:host([contenteditable="true"]):focus-within,\n:host([contenteditable="true"]):focus {\n  padding: 2px;\n  margin-bottom: 2px;\n}\n\n:host(.heightmax[contenteditable="true"]) {\n  max-height: calc(100vh - 200px);\n  overflow-y: scroll;\n}\n\n:host(:empty) {\n  border: 1px dashed var(--rich-text-editor-border-color);\n}\n\n:host(:not([contenteditable="true"]):empty):before {\n  content: attr(placeholder);\n  padding: 0 5px;\n  display: block;\n  color: var(--rich-text-editor-button-disabled-color);\n}\n      ']);return J=function(){return t},t}function Q(){var t=j(["\n\n<slot></slot>"]);return Q=function(){return t},t}window.customElements.define(G.tag,G);var Y=function(t){x(r,T(e.LitElement));var n=E(r);function r(){var t;return p(this,r),(t=n.call(this)).placeholder="Click to edit",t.toolbar="",t.type="rich-text-editor-toolbar",t.id="",t}return g(r,[{key:"render",value:function(){return e.html(Q())}}],[{key:"styles",get:function(){return[].concat(L(S(_(r),"styles",this)),[e.css(J())])}},{key:"haxProperties",get:function(){return{canScale:!0,canPosition:!0,canEditSource:!1,gizmo:{title:"Rich text-editor",description:"a standalone rich text editor",icon:"icons:android",color:"green",groups:["Text"],handles:[{type:"todo:read-the-docs-for-usage"}],meta:{author:"nikkimk",owner:"Penn State University"}},settings:{quick:[],configure:[{property:"title",description:"",inputMethod:"textfield",required:!1,icon:"icons:android"}],advanced:[]}}}},{key:"properties",get:function(){return v(v({},S(_(r),"properties",this)),{},{id:{name:"id",type:String,reflect:!0,attribute:"id"},placeholder:{name:"placeholder",type:String,reflect:!0,attribute:"placeholder"},toolbar:{name:"toolbar",type:String,reflect:!0,attribute:"toolbar"},type:{name:"type",type:String,reflect:!0,attribute:"type"}})}},{key:"tag",get:function(){return"rich-text-editor"}}]),g(r,[{key:"connectedCallback",value:function(){S(_(r.prototype),"connectedCallback",this).call(this),this.id||(this.id=this._generateUUID()),this.getEditor(),window.RichTextEditorStyleManager.requestAvailability()}},{key:"getEditor",value:function(){var t=this.toolbar?"#"+this.toolbar:"",e=document.querySelector(this.type+t),n=t?document.querySelector(t):null,r=document.querySelector(this.type),o=e||n||r;this.toolbar||(this.toolbar=this._generateUUID()),o&&o.addEditableRegion||((o=document.createElement(this.type)).id=this.toolbar,this.parentNode.appendChild(o)),o.addEditableRegion(this)}},{key:"_getRange",value:function(){var t=window.getSelection();return t.getRangeAt&&t.rangeCount?t.getRangeAt(0):t||void 0}},{key:"_generateUUID",value:function(){var t=Math.floor(65536*(1+Math.random())).toString(16).substring(1);return"rte-"+"ss-s-s-s-sss".replace(/s/g,t)}}]),r}();window.customElements.define(Y.tag,Y),t.RichTextEditor=Y,Object.defineProperty(t,"__esModule",{value:!0})});
