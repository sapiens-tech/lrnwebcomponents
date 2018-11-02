!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(require("@polymer/polymer/polymer-legacy.js"),require("@polymer/iron-ajax/iron-ajax.js"),require("@lrnwebcomponents/hax-body-behaviors/lib/HAXWiring.js"),require("@lrnwebcomponents/schema-behaviors/schema-behaviors.js"),require("@lrnwebcomponents/citation-element/citation-element.js")):"function"==typeof define&&define.amd?define(["@polymer/polymer/polymer-legacy.js","@polymer/iron-ajax/iron-ajax.js","@lrnwebcomponents/hax-body-behaviors/lib/HAXWiring.js","@lrnwebcomponents/schema-behaviors/schema-behaviors.js","@lrnwebcomponents/citation-element/citation-element.js"],t):t(e.polymerLegacy_js)}(this,function(e){"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function n(){var e,t,i=(e=['\n    <custom-style>\n      <style>\n        :host {\n          display: block;\n          --wikipedia-query-body-height: 10em;\n        }\n        #result {\n          height: var(--wikipedia-query-body-height);\n          overflow: scroll;\n          border: 1px grey solid;\n          padding: .5em 1em;\n        }\n        citation-element {\n          background-color: #F8F8F8;\n          padding: 16px 8px;\n          font-size: 12px;\n        }\n      </style>\n    </custom-style>\n    <iron-ajax auto url$="https://en.wikipedia.org/w/api.php?origin=*&amp;action=query&amp;titles=[[search]]&amp;prop=extracts&amp;format=json" handle-as="json" on-response="handleResponse" debounce-duration="100" last-response="{{searchResponse}}"></iron-ajax>\n    <h3 hidden$="[[!showTitle]]">[[search]] Wikipedia article</h3>\n    <div id="result" hidden$="[[!__rendercontent]]"></div>\n    <citation-element hidden$="[[!__rendercontent]]" creator="{Wikipedia contributors}" scope="sibling" license="by-sa" title="[[search]] --- {Wikipedia}{,} The Free Encyclopedia" source="https://en.wikipedia.org/w/index.php?title=[[search]]" date="[[__now]]"></citation-element>\n'],t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}})));return n=function(){return i},i}e.Polymer({_template:e.html(n()),is:"wikipedia-query",behaviors:[HAXBehaviors.PropertiesBehaviors,SchemaBehaviors.Schema],properties:{showTitle:{type:Boolean,value:!0},search:{type:String,value:"Polymer (library)"},renderAs:{type:String,value:"content",observer:"_renderAsUpdated"},searchResponse:{type:Object}},attached:function(){var e=new Date(Date.now());this.__now=e.getDate()+"/"+e.getMonth()+"/"+e.getFullYear();this.setHaxProperties({canScale:!0,canPosition:!0,canEditSource:!1,gizmo:{title:"Wikipedia article",description:"This can display a wikipedia article in context in a variety of formats.",icon:"book",color:"green",groups:["Content","Creative Commons"],handles:[{type:"content",title:"search"}],meta:{author:"LRNWebComponents"}},settings:{quick:[{property:"search",title:"Search term",description:"Word to search wikipedia for.",inputMethod:"textfield",icon:"editor:title",required:!0},{property:"showTitle",title:"Show title",description:"Whether or not to render the title of the article.",inputMethod:"boolean",icon:"editor:title"}],configure:[{property:"search",title:"Search term",description:"Word to search wikipedia for.",inputMethod:"textfield",icon:"editor:title",required:!0}]},saveOptions:{wipeSlot:!0}})},_renderAsUpdated:function(e,n){"undefined"!==t(e)&&(this._resetRenderMethods(),this["__render"+e]=!0)},_validRenderMethods:function(){return["content"]},_resetRenderMethods:function(){for(var e=this._validRenderMethods(),t=0;t<e.length;t++)this["__render"+e[t]]=!1},handleResponse:function(e){for(var t in this.searchResponse.query.pages)if(this.searchResponse.query.pages.hasOwnProperty(t)){var n=this.searchResponse.query.pages[t];this.$.result.innerHTML=n.extract}}})});
//# sourceMappingURL=wikipedia-query.umd.js.map
