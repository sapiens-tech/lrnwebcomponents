!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(require("@polymer/polymer/polymer-legacy.js"),require("@lrnwebcomponents/materializecss-styles/materializecss-styles.js"),require("@lrnwebcomponents/hax-body-behaviors/hax-body-behaviors.js"),require("@lrnwebcomponents/schema-behaviors/schema-behaviors.js"),require("@lrnwebcomponents/chartist-render/chartist-render.js"),require("@lrnwebcomponents/simple-colors/simple-colors.js")):"function"==typeof define&&define.amd?define(["@polymer/polymer/polymer-legacy.js","@lrnwebcomponents/materializecss-styles/materializecss-styles.js","@lrnwebcomponents/hax-body-behaviors/hax-body-behaviors.js","@lrnwebcomponents/schema-behaviors/schema-behaviors.js","@lrnwebcomponents/chartist-render/chartist-render.js","@lrnwebcomponents/simple-colors/simple-colors.js"],t):t(e.polymerLegacy_js)}(this,function(e){"use strict";function t(){var e,r,i=(e=['\n    <style is="custom-style">\n      :host {\n        background-color: var(--simple-colors-background1, #ffffff);\n        overflow: visible;\n        display: block;\n      }\n      :host #wrapper {\n        margin: 0 auto;\n        position: relative;\n      }\n      :host #wrapper > * {\n        position: absolute;\n      }\n      :host #wrapper #chart {\n        left: 0;\n        top: 0;\n      }\n      :host #wrapper,\n      :host #wrapper #chart {\n        width: 250px;\n        height: 250px;\n      }\n      :host([size="xs"]) #wrapper,\n      :host([size="xs"]) #wrapper #chart {\n        width: 150px;\n        height: 150px;\n      }\n      :host([size="sm"]) #wrapper,\n      :host([size="sm"]) #wrapper #chart {\n        width: 200px;\n        height: 200px;\n      }\n      :host([size="lg"]) #wrapper,\n      :host([size="lg"]) #wrapper #chart {\n        width: 300px;\n        height: 300px;\n      }\n      :host([size="xl"]) #wrapper,\n      :host([size="xl"]) #wrapper #chart {\n        width: 400px;\n        height: 400px;\n      }\n      :host #wrapper > #image {\n        left: 20%;\n        top: 20%;\n        width: 60%;\n        height: 60%;\n        -webkit-clip-path: circle(50% at 50% 50%);\n        clip-path: circle(50% at 50% 50%);\n      }\n    </style>\n    <div id="wrapper">\n      <img id="image" alt$="[[imageAlt]]" aria-hidden="true" hidden$="[[!imageSrc]]" src$="[[imageSrc]]" style$="[[imageStyle]]">\n      <chartist-render id="chart" data$="[[data]]" chart-desc$="[[desc]]" chart-title="[[title]]" scale="ct-square" options$="[[options]]" title$="[[title]]" type="pie">\n      </chartist-render>\n    </div>\n'],(r=['\n    <style is="custom-style">\n      :host {\n        background-color: var(--simple-colors-background1, #ffffff);\n        overflow: visible;\n        display: block;\n      }\n      :host #wrapper {\n        margin: 0 auto;\n        position: relative;\n      }\n      :host #wrapper > * {\n        position: absolute;\n      }\n      :host #wrapper #chart {\n        left: 0;\n        top: 0;\n      }\n      :host #wrapper,\n      :host #wrapper #chart {\n        width: 250px;\n        height: 250px;\n      }\n      :host([size="xs"]) #wrapper,\n      :host([size="xs"]) #wrapper #chart {\n        width: 150px;\n        height: 150px;\n      }\n      :host([size="sm"]) #wrapper,\n      :host([size="sm"]) #wrapper #chart {\n        width: 200px;\n        height: 200px;\n      }\n      :host([size="lg"]) #wrapper,\n      :host([size="lg"]) #wrapper #chart {\n        width: 300px;\n        height: 300px;\n      }\n      :host([size="xl"]) #wrapper,\n      :host([size="xl"]) #wrapper #chart {\n        width: 400px;\n        height: 400px;\n      }\n      :host #wrapper > #image {\n        left: 20%;\n        top: 20%;\n        width: 60%;\n        height: 60%;\n        -webkit-clip-path: circle(50% at 50% 50%);\n        clip-path: circle(50% at 50% 50%);\n      }\n    </style>\n    <div id="wrapper">\n      <img id="image" alt\\$="[[imageAlt]]" aria-hidden="true" hidden\\$="[[!imageSrc]]" src\\$="[[imageSrc]]" style\\$="[[imageStyle]]">\n      <chartist-render id="chart" data\\$="[[data]]" chart-desc\\$="[[desc]]" chart-title="[[title]]" scale="ct-square" options\\$="[[options]]" title\\$="[[title]]" type="pie">\n      </chartist-render>\n    </div>\n'])||(r=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(r)}})));return t=function(){return i},i}e.Polymer({_template:e.html(t()),is:"progress-donut",behaviors:[HAXBehaviors.PropertiesBehaviors,simpleColorsBehaviors,SchemaBehaviors.Schema],listeners:{"chartist-render-draw":"_onCreated"},properties:{complete:{type:Array,value:[]},donutThickness:{type:Number},colors:{type:Array,value:null},data:{type:Array,computed:"_getData(complete)"},desc:{type:String,value:null},options:{type:Array,computed:"_getOptions(complete,total,size,colors,accentColor,dark)"},imageSrc:{type:String,value:null,reflectToAttribute:!0},imageAlt:{type:String,value:null,reflectToAttribute:!0},imageStyle:{type:String,computed:"_getImageStyle(size)"},size:{type:String,value:"md"},title:{type:String},total:{type:Number,value:100}},attached:function(){this.setHaxProperties({canScale:!0,canPosition:!0,canEditSource:!1,gizmo:{title:"Sample gizmo",description:"The user will be able to see this for selection in a UI.",icon:"av:play-circle-filled",color:"grey",groups:["Video","Media"],handles:[{type:"video",url:"source"}],meta:{author:"Your organization on github"}},settings:{quick:[{property:"title",title:"Title",description:"The title of the element",inputMethod:"textfield",icon:"editor:title"}],configure:[{property:"title",title:"Title",description:"The title of the element",inputMethod:"textfield",icon:"editor:title"}],advanced:[]}})},_getData:function(e){return{series:e}},_getImageStyle:function(e){var t="22%",r="56%";return"xs"===this.size?(t="32%",r="36%"):"sm"===this.size?(t="26%",r="48%"):"lg"===this.size?(t="20%",r="60%"):"xl"===this.size&&(t="17%",r="66%"),"left: "+t+"; top: "+t+"; width: "+r+"; height: "+r+";"},_getOptions:function(e,t,r,i,n,s){for(var o=0,a=0;a<e.length;a++)o+=parseFloat(e[a]);return{donut:!0,showLabel:!1,startAngle:0,total:Math.max(o,t)}},_onCreated:function(e){this.__chart=e.detail,this.makeChart(this.__chart)},makeChart:function(e){if(void 0!==e){var t=this.colors,r="10%",i=window.SimpleColorsUtility.hexCodes,n=null!==this.accentColor?this.accentColor.replace(/-([a-z])/g,function(e){return e[1].toUpperCase()}):null;return null!=t&&0!==t.length||(t=null!==n&&null!==i[n]?this.dark?[i[n][9],i[n][6],i[n][3],i[n][7],i[n][4]]:[i[n][0],i[n][3],i[n][5],i[n][2],i[n][4]]:this.dark?[i.orange[6],i.pink[4],i.purple[5],i.cyan[6],i.lime[5]]:[i.pink[5],i.deepPurple[4],i.blue[3],i.teal[4],i.yellow[5]]),"xs"===this.size?r="8%":"sm"===this.size?r="9%":"lg"===this.size?r="11%":"xl"===this.size&&(r="12%"),e.on("draw",function(e){if(e.element._node.style.strokeWidth=r,e.element._node.style.stroke=t[e.index%t.length],"slice"===e.type){var i=e.element._node.getTotalLength();e.element.attr({"stroke-dasharray":i+"px "+i+"px"});var n={"stroke-dashoffset":{id:"anim"+e.index,dur:500,from:-i+"px",to:"0px",easing:Chartist.Svg.Easing.easeOutQuint,fill:"freeze"}};0!==e.index&&(n["stroke-dashoffset"].begin="anim"+(e.index-1)+".end"),e.element.attr({"stroke-dashoffset":-i+"px"}),e.element.animate(n,!1)}}),e}}})});
//# sourceMappingURL=progress-donut.umd.js.map
