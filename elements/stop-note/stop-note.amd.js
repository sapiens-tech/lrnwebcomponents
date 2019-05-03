define(["exports","./node_modules/@polymer/polymer/polymer-element.js","./node_modules/@lrnwebcomponents/schema-behaviors/schema-behaviors.js","./node_modules/@lrnwebcomponents/hax-body-behaviors/lib/HAXWiring.js","./node_modules/@polymer/iron-icon/iron-icon.js","./lib/stop-icon.js"],function(_exports,_polymerElement,_schemaBehaviors,_HAXWiring,_ironIcon,_stopIcon){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.StopNote=void 0;function _templateObject_b0937da06d0911e9b49af365c318e8b0(){var data=babelHelpers.taggedTemplateLiteral(["\n      <style>\n        :host {\n          display: block;\n          width: auto;\n          --background-color: #f7f7f7;\n          --accent-color: #d32f2f;\n          margin-bottom: 20px;\n        }\n\n        iron-icon {\n          height: 100px;\n          width: 100px;\n        }\n\n        :host([icon=\"stopnoteicons:stop-icon\"]) {\n          --accent-color: #d8261c;\n        }\n\n        :host([icon=\"stopnoteicons:warning-icon\"]) {\n          --accent-color: #ffeb3b;\n        }\n\n        :host([icon=\"stopnoteicons:confirm-icon\"]) {\n          --accent-color: #81c784;\n        }\n\n        :host([icon=\"stopnoteicons:book-icon\"]) {\n          --accent-color: #21a3db;\n        }\n\n        .container {\n          display: flex;\n          width: auto;\n        }\n\n        .message_wrap {\n          border-right: 7px solid var(--accent-color);\n          padding: 10px 25px;\n          flex: 1 1 auto;\n          background-color: var(--background-color);\n        }\n\n        .main_message {\n          font-size: 32px;\n          margin-top: 10px;\n        }\n\n        .secondary_message {\n          margin-top: 5px;\n          font-size: 19.2px;\n          float: left;\n        }\n\n        .link a {\n          margin-top: 5px;\n          font-size: 19.2px;\n          float: left;\n          clear: left;\n          text-decoration: none;\n          color: #2196f3;\n        }\n\n        .link a:hover {\n          color: #1976d2;\n        }\n\n        .svg {\n          display: flex;\n          justify-content: center;\n        }\n\n        .svg_wrap {\n          background-color: var(--accent-color);\n          padding: 5px;\n          width: auto;\n        }\n      </style>\n      <div class=\"container\">\n        <div class=\"svg_wrap\">\n          <div class=\"svg\"><iron-icon icon=\"[[icon]]\"></iron-icon></div>\n        </div>\n        <div class=\"message_wrap\">\n          <div class=\"main_message\">[[title]]</div>\n          <div class=\"secondary_message\"><slot name=\"message\"></slot></div>\n          <div class=\"link\" hidden$=\"[[!url]]\">\n            <a href=\"[[url]]\" target$=\"[[_urlTarget(url)]]\"\n              >More Information &gt;</a\n            >\n          </div>\n        </div>\n      </div>\n    "],["\n      <style>\n        :host {\n          display: block;\n          width: auto;\n          --background-color: #f7f7f7;\n          --accent-color: #d32f2f;\n          margin-bottom: 20px;\n        }\n\n        iron-icon {\n          height: 100px;\n          width: 100px;\n        }\n\n        :host([icon=\"stopnoteicons:stop-icon\"]) {\n          --accent-color: #d8261c;\n        }\n\n        :host([icon=\"stopnoteicons:warning-icon\"]) {\n          --accent-color: #ffeb3b;\n        }\n\n        :host([icon=\"stopnoteicons:confirm-icon\"]) {\n          --accent-color: #81c784;\n        }\n\n        :host([icon=\"stopnoteicons:book-icon\"]) {\n          --accent-color: #21a3db;\n        }\n\n        .container {\n          display: flex;\n          width: auto;\n        }\n\n        .message_wrap {\n          border-right: 7px solid var(--accent-color);\n          padding: 10px 25px;\n          flex: 1 1 auto;\n          background-color: var(--background-color);\n        }\n\n        .main_message {\n          font-size: 32px;\n          margin-top: 10px;\n        }\n\n        .secondary_message {\n          margin-top: 5px;\n          font-size: 19.2px;\n          float: left;\n        }\n\n        .link a {\n          margin-top: 5px;\n          font-size: 19.2px;\n          float: left;\n          clear: left;\n          text-decoration: none;\n          color: #2196f3;\n        }\n\n        .link a:hover {\n          color: #1976d2;\n        }\n\n        .svg {\n          display: flex;\n          justify-content: center;\n        }\n\n        .svg_wrap {\n          background-color: var(--accent-color);\n          padding: 5px;\n          width: auto;\n        }\n      </style>\n      <div class=\"container\">\n        <div class=\"svg_wrap\">\n          <div class=\"svg\"><iron-icon icon=\"[[icon]]\"></iron-icon></div>\n        </div>\n        <div class=\"message_wrap\">\n          <div class=\"main_message\">[[title]]</div>\n          <div class=\"secondary_message\"><slot name=\"message\"></slot></div>\n          <div class=\"link\" hidden$=\"[[!url]]\">\n            <a href=\"[[url]]\" target\\$=\"[[_urlTarget(url)]]\"\n              >More Information &gt;</a\n            >\n          </div>\n        </div>\n      </div>\n    "]);_templateObject_b0937da06d0911e9b49af365c318e8b0=function _templateObject_b0937da06d0911e9b49af365c318e8b0(){return data};return data}/**
 * `stop-note`
 * `A note that directs people to an action item of different warning levels`
 * @demo demo/index.html
 * @microcopy - the mental model for this element
 * -
 */var StopNote=/*#__PURE__*/function(_SchemaBehaviors){babelHelpers.inherits(StopNote,_SchemaBehaviors);function StopNote(){babelHelpers.classCallCheck(this,StopNote);return babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(StopNote).apply(this,arguments))}babelHelpers.createClass(StopNote,[{key:"_iconChanged",/**
   * Update styles based on icon selected.
   */value:function _iconChanged(icon){this.updateStyles()}/**
   * Evaluates url for correct targeting.
   */},{key:"_urlTarget",value:function _urlTarget(url){if(url){var external=this._outsideLink(url);if(external){return"_blank"}}return!1}/**
   * Internal function to check if a url is external
   */},{key:"_outsideLink",value:function _outsideLink(url){if(0!=url.indexOf("http"))return!1;var loc=location.href,path=location.pathname,root=loc.substring(0,loc.indexOf(path));return 0!=url.indexOf(root)}},{key:"connectedCallback",/**
   * Attached to the DOM, now fire.
   */value:function connectedCallback(){babelHelpers.get(babelHelpers.getPrototypeOf(StopNote.prototype),"connectedCallback",this).call(this);this.HAXWiring=new _HAXWiring.HAXWiring;this.HAXWiring.setup(StopNote.haxProperties,StopNote.tag,this)}}],[{key:"template",get:function get(){return(0,_polymerElement.html)(_templateObject_b0937da06d0911e9b49af365c318e8b0())}},{key:"tag",get:function get(){return"stop-note"}},{key:"properties",get:function get(){return{/**
       * Title Message
       */title:{type:String,value:"Title",reflectToAttribute:!0},/**
       * url to additional resources
       */url:{type:String,value:null,reflectToAttribute:!0},/**
       * Icon selected
       */icon:{type:String,value:"stopnoteicons:stop-icon",observer:"_iconChanged",reflectToAttribute:!0}}}},{key:"haxProperties",get:function get(){return{canScale:!0,canPosition:!0,canEditSource:!1,gizmo:{title:"Stop Note",description:"A message to alert readers to specific directions.",icon:"icons:report",color:"orange",groups:["Video","Media"],handles:[{type:"text",title:"label"}],meta:{author:"LRNWebComponents"}},settings:{quick:[{property:"title",title:"Title",description:"Enter title for stop-note.",inputMethod:"textfield",required:!0},{property:"url",title:"URL",description:"Enter an external url.",inputMethod:"textfield",required:!0}],configure:[{property:"title",title:"Title",description:"Enter title for stop-note.",inputMethod:"textfield",required:!0},{property:"url",title:"URL",description:"Enter an external url.",inputMethod:"haxupload",required:!0},{slot:"message",title:"Message",description:"Enter a message for stop-note.",inputMethod:"code-editor",required:!0},{property:"icon",title:"Action Icon",description:"Icon used for stop-note",inputMethod:"iconpicker",options:["stopnoteicons:stop-icon","stopnoteicons:warning-icon","stopnoteicons:confirm-icon","stopnoteicons:book-icon"]}],advanced:[]}}}}]);return StopNote}((0,_schemaBehaviors.SchemaBehaviors)(_polymerElement.PolymerElement));_exports.StopNote=StopNote;window.customElements.define(StopNote.tag,StopNote)});