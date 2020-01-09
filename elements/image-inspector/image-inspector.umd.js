!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("lit-element/lit-element.js"),require("@lrnwebcomponents/exif-data/exif-data.js"),require("@lrnwebcomponents/lrnsys-button/lrnsys-button.js")):"function"==typeof define&&define.amd?define(["exports","lit-element/lit-element.js","@lrnwebcomponents/exif-data/exif-data.js","@lrnwebcomponents/lrnsys-button/lrnsys-button.js"],e):e((t=t||self).ImageInspector={},t.litElement_js)}(this,function(t,e){"use strict";function n(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function o(t,e,o){return e&&n(t.prototype,e),o&&n(t,o),t}function i(t){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function s(t,e){return(s=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function r(t,e){return!e||"object"!=typeof e&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function a(t,e){return e||(e=t.slice(0)),Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(e)}}))}function l(){var t=a(['\n      <app-toolbar>\n        <lrnsys-button\n          alt="Zoom in"\n          icon="zoom-in"\n          @click="','"\n          hover-class="','"\n        ></lrnsys-button>\n        <lrnsys-button\n          alt="Zoom out"\n          icon="zoom-out"\n          @click="','"\n          hover-class="','"\n        ></lrnsys-button>\n        <lrnsys-button\n          alt="Rotate right"\n          icon="image:rotate-right"\n          @click="','"\n          hover-class="','"\n        ></lrnsys-button>\n        <lrnsys-button\n          alt="Rotate left"\n          icon="image:rotate-left"\n          @click="','"\n          hover-class="','"\n        ></lrnsys-button>\n        <lrnsys-button\n          alt="Mirror image"\n          icon="image:flip"\n          @click="','"\n          hover-class="','"\n        ></lrnsys-button>\n        <lrnsys-button\n          alt="Open in new window"\n          icon="launch"\n          href="','"\n          target="_blank"\n          hover-class="','"\n        ></lrnsys-button>\n        <lrnsys-button\n          alt="EXIF Data"\n          icon="image:camera-roll"\n          @click="','"\n          hover-class="','"\n        ></lrnsys-button>\n        <slot name="toolbar"></slot>\n      </app-toolbar>\n      <exif-data\n        id="exif"\n        @click=','\n        no-events\n        ?no-left="','"\n        ><img src="','"\n      /></exif-data>\n      <img-pan-zoom id="img" src="','"></img-pan-zoom>\n      <slot></slot>\n    ']);return l=function(){return t},t}function c(){var t=a(["\n        :host {\n          display: block;\n          overflow: hidden;\n          --image-inspector-background: #dddddd;\n        }\n\n        app-toolbar {\n          width: 100%;\n          background: var(--image-inspector-background);\n          margin: 0 auto;\n          padding: 0;\n          z-index: 1;\n          display: flex;\n          text-align: center;\n          justify-content: space-evenly;\n        }\n\n        lrnsys-button {\n          display: inline-flex;\n        }\n\n        .top {\n          top: 0px;\n        }\n        .showData {\n          display: block;\n          z-index: 2;\n        }\n        exif-data {\n          margin: 0 auto;\n          justify-content: space-evenly;\n          position: absolute;\n          display: none;\n          margin: 0;\n          padding: 0;\n        }\n        exif-data img {\n          margin: 0;\n          opacity: 0;\n          padding: 0;\n          height: 500px;\n          pointer-events: none;\n        }\n      "]);return c=function(){return t},t}var u=function(t){function n(){var t;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),(t=r(this,i(n).call(this))).noLeft=!1,t.degrees=0,t.hoverClass="blue white-text",setTimeout(function(){import("@polymer/app-layout/app-layout.js"),import("@lrnwebcomponents/img-pan-zoom/img-pan-zoom.js"),import("@polymer/iron-icons/iron-icons.js"),import("@polymer/iron-icons/image-icons.js")},0),t}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&s(t,e)}(n,e.LitElement),o(n,null,[{key:"styles",get:function(){return[e.css(c())]}}]),o(n,[{key:"render",value:function(){return e.html(l(),this.zoomIn,this.hoverClass,this.zoomOut,this.hoverClass,this.rotateRight,this.hoverClass,this.rotateLeft,this.hoverClass,this.mirrorImage,this.hoverClass,this.src,this.hoverClass,this.exifDataEvent,this.hoverClass,this.hideData,this.noLeft,this.src,this.src)}},{key:"exifDataEvent",value:function(t){this.shadowRoot.querySelector("#exif").classList.contains("showData")?this.shadowRoot.querySelector("#exif").classList.remove("showData"):(this.shadowRoot.querySelector("#exif").updateExif(!0),this.shadowRoot.querySelector("#exif").classList.add("showData"))}},{key:"hideData",value:function(t){this.shadowRoot.querySelector("#exif").classList.remove("showData")}},{key:"firstUpdated",value:function(){this.__img=this.shadowRoot.querySelector("#img"),this.shadowRoot.querySelector("#exif").alignTarget=this.__img,this.shadowRoot.querySelector("#exif").alignTargetTop="0px"}},{key:"rotateRight",value:function(){this.degrees+=90,this.__img.style.transform="rotate("+this.degrees+"deg)",this.__img.classList.contains("top")?this.__img.classList.remove("top"):this.__img.classList.add("top")}},{key:"rotateLeft",value:function(){this.degrees+=-90,this.__img.style.transform="rotate("+this.degrees+"deg)",this.__img.classList.contains("top")?this.__img.classList.remove("top"):this.__img.classList.add("top")}},{key:"mirrorImage",value:function(){"scaleX(1)"===this.__img.style.transform?this.__img.style.transform="scaleX(-1)":this.__img.style.transform="scaleX(1)"}},{key:"zoomIn",value:function(){this.__img.zoomIn()}},{key:"zoomOut",value:function(){this.__img.zoomOut()}}],[{key:"tag",get:function(){return"image-inspector"}},{key:"properties",get:function(){return{noLeft:{type:Boolean,attribute:"no-left"},degrees:{type:Number,reflect:!0},src:{type:String},hoverClass:{type:String,attribute:"hover-class"}}}}]),n}();window.customElements.define(u.tag,u),t.ImageInspector=u,Object.defineProperty(t,"__esModule",{value:!0})});
//# sourceMappingURL=image-inspector.umd.js.map
