!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("lit-element/lit-element.js"),require("@lrnwebcomponents/schema-behaviors/schema-behaviors.js"),require("@lrnwebcomponents/es-global-bridge/es-global-bridge.js")):"function"==typeof define&&define.amd?define(["exports","lit-element/lit-element.js","@lrnwebcomponents/schema-behaviors/schema-behaviors.js","@lrnwebcomponents/es-global-bridge/es-global-bridge.js"],t):t((e=e||self).WavePlayer={},e.litElement_js,e.schemaBehaviors_js)}(this,function(e,t,n){"use strict";function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function r(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function i(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,o)}return n}function c(e){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function l(e,t){return(l=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function u(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function p(e,t,n){return(p="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var o=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=c(e)););return e}(e,t);if(o){var r=Object.getOwnPropertyDescriptor(o,t);return r.get?r.get.call(n):r.value}})(e,t,n||e)}function d(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}function f(){var e=d(["\n        :host {\n          height: 150px;\n          background-color: var(--dark-primary-color);\n          display: block;\n        }\n\n        paper-icon-button {\n          position: absolute;\n        }\n\n        .title,\n        .subtitle {\n          transition: all 0.5s ease;\n          padding: 10px 10px 10px 0;\n          left: 160px;\n          position: absolute;\n        }\n\n        .subtitle {\n          bottom: 0;\n        }\n\n        .controls {\n          height: 50px;\n          width: 100%;\n          top: 0;\n          background: var(--accent-color);\n          z-index: 20;\n        }\n\n        paper-fab {\n          transition: all 0.5s ease;\n          top: -25px;\n          z-index: 25;\n          border-radius: 0;\n        }\n\n        .albuminfo {\n          position: relative;\n          transition: all 0.5s ease;\n          top: -156px;\n          margin-bottom: -150px;\n          z-index: 20;\n          height: 150px;\n          background-color: rgba(0, 0, 0, 0.4);\n          color: #fff;\n          font-family: Roboto, sans-serif;\n        }\n\n        .albuminfoActive {\n          top: -25;\n          height: 25px;\n          width: 100%;\n          margin-bottom: -19px;\n        }\n\n        .waveContainer {\n          top: -31px;\n          transition: all 0.5s ease;\n          background-color: var(--dark-primary-color);\n          transform: scaleY(1.5);\n        }\n\n        .circleAnimation {\n          border-radius: 50%;\n          overflow: auto;\n          -moz-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.4);\n          box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.4);\n        }\n\n        .circleAnimation:active {\n          -moz-box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2);\n          box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2);\n        }\n\n        .playActive {\n          top: 0;\n          width: 100%;\n          height: 50px;\n        }\n\n        .waveActive {\n          top: 0px;\n          transform: scaleY(1);\n        }\n\n        .centred,\n        .titleActive {\n          transform: scaleY(0);\n        }\n\n        .titleActive {\n          opacity: 0;\n        }\n\n        #playbutton {\n          transition: all 0.5s ease;\n        }\n\n        .coverart {\n          transition: all 0.5s ease;\n          width: 150px;\n          height: 150px;\n        }\n\n        .title {\n          font-size: 24px;\n        }\n\n        .coverartActive {\n          width: 25px;\n          height: 25px;\n        }\n\n        .nameActive {\n          font-size: 19px;\n          padding: 3px 3px 3px 0;\n          left: 30px;\n        }\n\n        .centred {\n          top: calc(50% - 20px);\n          left: calc(50% - 20px);\n          transition: all 0.3s ease;\n        }\n\n        .left,\n        .middle,\n        .right {\n          transform: scale(1);\n        }\n\n        .left {\n          left: calc(25% - 20px);\n        }\n\n        .right {\n          left: calc(75% - 20px);\n        }\n        .hidden {\n          display: none;\n        }\n        @media only screen and (max-width: 500px) {\n          .albuminfo {\n            width: 100%;\n          }\n        }\n      "]);return f=function(){return e},e}function h(){var e=d(['\n      <paper-fab\n        id="playbutton"\n        class="circleAnimation"\n        disabled=""\n        icon="av:play-arrow"\n        @click="','"\n      ></paper-fab>\n      <paper-material id="controls" class="controls hidden" elevation="2">\n        <paper-icon-button\n          class="centred middle"\n          style="color: white;"\n          icon="av:pause"\n          @click="','"\n        ></paper-icon-button>\n        <paper-icon-button\n          id="replay"\n          class="centred"\n          style="color: white;"\n          icon="av:replay-30"\n          @click="','"\n        ></paper-icon-button>\n        <paper-icon-button\n          id="mute"\n          class="centred"\n          style="color: white;"\n          icon="av:volume-up"\n          @click="','"\n        ></paper-icon-button>\n      </paper-material>\n      <div id="container" class="waveContainer" elevation="0"></div>\n      <div id="albuminfo" class="albuminfo">\n        <img loading="lazy" class="coverart" src="','" />\n        <span class="title">','</span>\n        <span class="subtitle">',"</span>\n      </div>\n    "]);return h=function(){return e},e}var v=function(e){function r(){var e,t,n;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,r),t=this,(e=!(n=c(r).call(this))||"object"!=typeof n&&"function"!=typeof n?u(t):n).title="",e.subtitle="",e.coverart="",e.lean="left",e.wavecolor="#ffffff",e.progresscolor="#CFD8DC",setTimeout(function(){import("@polymer/paper-material/paper-material.js"),import("@polymer/paper-fab/paper-fab.js"),import("@polymer/paper-icon-button/paper-icon-button.js"),import("@polymer/iron-icons/iron-icons.js"),import("@polymer/iron-icons/av-icons.js")},0);var o=e.pathFromUrl(decodeURIComponent("undefined"!=typeof document?document.currentScript&&document.currentScript.src||document.baseURI:new("undefined"!=typeof URL?URL:require("url").URL)("file:"+__filename).href)),i="".concat(o,"lib/wavesurfer.js/dist/wavesurfer.js");return window.addEventListener("es-bridge-wavesurfer-loaded",e._wavesurferLoaded.bind(u(e))),window.ESGlobalBridge.requestAvailability(),window.ESGlobalBridge.instance.load("wavesurfer",i),e}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&l(e,t)}(r,n.SchemaBehaviors(t.LitElement)),i(r,[{key:"render",value:function(){return t.html(h(),this.togglePlay,this.togglePlay,this.throwBack,this.toggleMute,this.coverart,this.title,this.subtitle)}},{key:"updated",value:function(e){var t=this;e.forEach(function(e,n){if(["src","title","subtitle","coverart","lean","wavecolor","progresscolor"].includes(n)){var o="".concat(n.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g,"$1-$2").toLowerCase(),"-changed");t.dispatchEvent(new CustomEvent(o,{detail:{value:t[n]}}))}"src"==n&&t._srcChanged(t[n],e)})}},{key:"_srcChanged",value:function(e,t){"undefined"!==o(e)&&this.__wavesurfer&&window.wavesurferobject.load(e)}}],[{key:"styles",get:function(){return[t.css(f())]}},{key:"tag",get:function(){return"wave-player"}},{key:"properties",get:function(){return function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach(function(t){a(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({},p(c(r),"properties",this),{src:{type:String},title:{type:String},subtitle:{type:String},coverart:{type:String},wavesurfer:{type:Object},lean:{type:String},wavecolor:{type:String},progresscolor:{type:String}})}}]),i(r,[{key:"disconnectedCallback",value:function(){window.removeEventListener("es-bridge-wavesurfer-loaded",this._wavesurferLoaded.bind(this)),p(c(r.prototype),"disconnectedCallback",this).call(this)}},{key:"firstUpdated",value:function(){if("right"===this.lean?(this.shadowRoot.querySelector("#playbutton").style.right="25",this.shadowRoot.querySelector("#controls").style.right="0"):(this.shadowRoot.querySelector("#playbutton").style.left="25",this.shadowRoot.querySelector("#controls").style.left="0"),""===this.name&&this.shadowRoot.querySelector("#albuminfo").classList.add("hidden"),""===this.coverart){var e=this.pathFromUrl(decodeURIComponent("undefined"!=typeof document?document.currentScript&&document.currentScript.src||document.baseURI:new("undefined"!=typeof URL?URL:require("url").URL)("file:"+__filename).href));this.coverart="".concat(e,"lib/art.jpg")}}},{key:"pathFromUrl",value:function(e){return e.substring(0,e.lastIndexOf("/")+1)}},{key:"_wavesurferLoaded",value:function(){this.__wavesurfer=!0,window.removeEventListener("es-bridge-wavesurfer-loaded",this._wavesurferLoaded.bind(this)),this.initWaveSurfer()}},{key:"activateAnimation",value:function(){var e=this.shadowRoot.querySelector("#container"),t=this.shadowRoot.querySelector("#playbutton"),n=this.shadowRoot.querySelector("#controls"),o=this.shadowRoot.querySelector("#mute"),r=this.shadowRoot.querySelector("#replay"),i=this.shadowRoot.querySelector("#albuminfo"),a=i.querySelector(".coverart"),s=i.querySelector(".title"),c=i.querySelector(".subtitle");t.setAttribute("icon","av:pause"),t.classList.remove("circleAnimation"),t.classList.add("playActive"),i.classList.add("albuminfoActive"),a.classList.add("coverartActive"),s.classList.add("nameActive"),c.classList.add("titleActive"),"right"===this.lean?this.shadowRoot.querySelector("#playbutton").style.right="0":this.shadowRoot.querySelector("#playbutton").style.left="0",e.classList.add("waveActive"),setTimeout(function(){n.classList.remove("hidden"),t.classList.add("hidden")},500),setTimeout(function(){o.classList.add("right"),r.classList.add("left")},600)}},{key:"deactivateAnimation",value:function(){var e=this,t=this.shadowRoot.querySelector("#container"),n=this.shadowRoot.querySelector("#playbutton"),o=this.shadowRoot.querySelector("#controls"),r=this.shadowRoot.querySelector("#mute"),i=this.shadowRoot.querySelector("#replay"),a=this.shadowRoot.querySelector("#albuminfo"),s=a.querySelector(".coverart"),c=a.querySelector(".title"),l=a.querySelector(".subtitle");r.classList.remove("right"),i.classList.remove("left"),setTimeout(function(){o.classList.add("hidden"),n.classList.remove("hidden")},100),setTimeout(function(){n.setAttribute("icon","av:play-arrow"),n.classList.add("circleAnimation"),n.classList.remove("playActive"),a.classList.remove("albuminfoActive"),s.classList.remove("coverartActive"),c.classList.remove("nameActive"),l.classList.remove("titleActive"),"right"===e.lean?n.style.right="25":n.style.left="25",t.classList.remove("waveActive")},200)}},{key:"initWaveSurfer",value:function(){var e=this;window.wavesurferobject=new WaveSurfer({container:this.shadowRoot.querySelector("#container"),waveColor:this.wavecolor,progressColor:this.progresscolor,fillParent:!0,height:100}),window.wavesurferobject.init(),"undefined"!==o(this.src)&&window.wavesurferobject.load(this.src),window.wavesurferobject.on("ready",function(){e.shadowRoot.querySelector("#playbutton").removeAttribute("disabled")}),window.wavesurferobject.on("finish",function(){e.deactivateAnimation()})}},{key:"togglePlay",value:function(e){window.wavesurferobject.playPause(),"av:play-arrow"===this.shadowRoot.querySelector("#playbutton").getAttribute("icon")?this.activateAnimation():this.deactivateAnimation()}},{key:"toggleMute",value:function(e){var t=this.shadowRoot.querySelector("#mute"),n=t.getAttribute("icon");window.wavesurferobject.toggleMute(),"av:volume-up"===n?t.setAttribute("icon","av:volume-off"):t.setAttribute("icon","av:volume-up")}},{key:"throwBack",value:function(e){window.wavesurferobject.skipBackward(30)}}],[{key:"haxProperties",get:function(){return{canScale:!0,canPosition:!0,canEditSource:!1,gizmo:{title:"Audio player",description:"Audio that is just like spotify.",icon:"av:play-circle-filled",color:"purple",groups:["Video","Media"],handles:[{type:"audio",source:"src",title:"title",caption:"subtitle"}],meta:{author:"ELMS:LN"}},settings:{quick:[{property:"src",title:"Source",description:"The URL for this video.",inputMethod:"textfield",icon:"link",required:!0,validationType:"url"}],configure:[{property:"src",title:"Source",description:"The URL for this video.",inputMethod:"textfield",icon:"link",required:!0,validationType:"url"},{property:"title",title:"Title",description:"A simple title",inputMethod:"textfield",icon:"av:video-label",required:!1,validationType:"text"}],advanced:[]}}}}]),r}();window.customElements.define(v.tag,v),e.WavePlayer=v,Object.defineProperty(e,"__esModule",{value:!0})});
//# sourceMappingURL=wave-player.umd.js.map
