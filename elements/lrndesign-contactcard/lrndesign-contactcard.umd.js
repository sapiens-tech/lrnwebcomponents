!function(n,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("@lrnwebcomponents/simple-tooltip/simple-tooltip.js"),require("@polymer/polymer/polymer-element.js"),require("@lrnwebcomponents/simple-icon/simple-icon.js"),require("@lrnwebcomponents/simple-icon/lib/simple-icons.js"),require("@lrnwebcomponents/hax-iconset/lib/simple-hax-iconset.js")):"function"==typeof define&&define.amd?define(["exports","@lrnwebcomponents/simple-tooltip/simple-tooltip.js","@polymer/polymer/polymer-element.js","@lrnwebcomponents/simple-icon/simple-icon.js","@lrnwebcomponents/simple-icon/lib/simple-icons.js","@lrnwebcomponents/hax-iconset/lib/simple-hax-iconset.js"],t):t((n=n||self).LrndesignContactcard={},null,n.polymerElement_js)}(this,function(n,t,e){"use strict";function i(n,t){for(var e=0;e<t.length;e++){var i=t[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,i.key,i)}}function o(n){return(o=Object.setPrototypeOf?Object.getPrototypeOf:function(n){return n.__proto__||Object.getPrototypeOf(n)})(n)}function r(n,t){return(r=Object.setPrototypeOf||function(n,t){return n.__proto__=t,n})(n,t)}function c(n,t){return!t||"object"!=typeof t&&"function"!=typeof t?function(n){if(void 0===n)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}(n):t}function l(n){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(n){return!1}}();return function(){var e,i=o(n);if(t){var r=o(this).constructor;e=Reflect.construct(i,arguments,r)}else e=i.apply(this,arguments);return c(this,e)}}function a(){var n,t,e=(n=['\n      <style>\n        :host {\n          display: block;\n          --contactcard-icons-hover-color: gray;\n          --contactcard-icons-fill-color: #aeaeae;\n        }\n\n        .name {\n          text-align: center;\n          min-height: 16px;\n        }\n        .name div {\n          font-size: 24px;\n          margin-bottom: 12px;\n        }\n\n        #img_wrap {\n          display: flex;\n          justify-content: center;\n          align-items: flex-start;\n        }\n\n        .profile-image {\n          background-color: #aeaeae;\n          padding: 4px;\n          border-radius: 50%;\n          width: 50%;\n          min-height: 160px;\n          margin-top: 25px;\n        }\n\n        .position {\n          text-align: center;\n          font-style: italic;\n          font-size: 16px;\n          margin: -10px 0 10px;\n        }\n\n        .organization {\n          text-align: center;\n          font-size: 14px;\n          margin: -8px 0 10px;\n        }\n\n        #mail {\n          width: 35px;\n          height: 35px;\n          color: var(--contactcard-icons-fill-color);\n        }\n\n        #mail:hover,\n        #mail:focus {\n          color: var(--contactcard-icons-hover-color);\n        }\n\n        #phone {\n          width: 35px;\n          height: 35px;\n          color: var(--contactcard-icons-fill-color);\n        }\n\n        #phone:hover,\n        #phone:focus {\n          color: var(--contactcard-icons-hover-color);\n        }\n\n        #twitter {\n          width: 35px;\n          height: 35px;\n          color: var(--contactcard-icons-fill-color);\n        }\n        #twitter:hover,\n        #twitter:focus {\n          color: var(--contactcard-icons-hover-color);\n        }\n\n        #website {\n          width: 35px;\n          height: 35px;\n          color: var(--contactcard-icons-fill-color);\n        }\n        #website:hover,\n        #website:focus {\n          color: var(--contactcard-icons-hover-color);\n        }\n\n        #group_icons {\n          width: 70%;\n          margin-left: auto;\n          margin-right: auto;\n          margin-bottom: 10px;\n          border-top: 2px #aeaeae solid;\n          padding-top: 5px;\n        }\n\n        simple-icon {\n          margin-left: 8px;\n        }\n\n        .icons {\n          display: flex;\n          justify-content: center;\n          align-items: flext-start;\n          padding-top: 5px;\n        }\n\n        button {\n          padding: 0;\n          margin: 0 8px;\n          display: block;\n          min-width: 16px;\n        }\n      </style>\n      <div class="card">\n        <div id="img_wrap">\n          <img loading="lazy" class="profile-image" src="[[image]]" />\n        </div>\n        <div class="name">\n          <template is="dom-if" if="[[name]]">\n            <div>[[name]]</div>\n          </template>\n        </div>\n        <div class="position">[[position]]</div>\n        <div class="organization">[[organization]]</div>\n        <div id="group_icons">\n          <div class="icons">\n            <template is="dom-if" if="[[email]]">\n              <a tabindex="-1" href$="mailto:[[email]]">\n                <button id="mail" title$="Email address [[email]]">\n                  <simple-icon icon="mail" class="mail_icon"></simple-icon>\n                </button>\n              </a>\n              <simple-tooltip for="mail" position="bottom"\n                >Email</simple-tooltip\n              >\n            </template>\n            <template is="dom-if" if="[[phone]]">\n              <a tabindex="-1" href$="tel:[[phone]]">\n                <button id="phone" title$="Phone number [[phone]]">\n                  <simple-icon\n                    icon="maps:local-phone"\n                    class="phone_icon"\n                  ></simple-icon>\n                </button>\n              </a>\n              <simple-tooltip for="phone" position="bottom"\n                >Call</simple-tooltip\n              >\n            </template>\n            <template is="dom-if" if="[[website]]">\n              <a tabindex="-1" href$="[[website]]">\n                <button id="website" title$="Website address [[website]]">\n                  <simple-icon\n                    icon="hardware:desktop-windows"\n                    class="computer_icon"\n                  ></simple-icon>\n                </button>\n              </a>\n              <simple-tooltip for="website" position="bottom"\n                >Visit</simple-tooltip\n              >\n            </template>\n            <template is="dom-if" if="[[twitter]]">\n              <a tabindex="-1" href$="[[twitter]]">\n                <button id="twitter" title$="Twitter name [[twitter]]">\n                  <simple-icon\n                    icon="twitter"\n                    color="#aeaeae"\n                    size="35"\n                    class="twitter_icon"\n                  ></simple-icon>\n                </button>\n              </a>\n              <simple-tooltip for="twitter" position="bottom"\n                >Connect</simple-tooltip\n              >\n            </template>\n          </div>\n        </div>\n      </div>\n    '],t||(t=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(t)}})));return a=function(){return e},e}var s=function(n){!function(n,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),t&&r(n,t)}(p,e.PolymerElement);var t,o,c,s=l(p);function p(){return function(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}(this,p),s.call(this)}return t=p,c=[{key:"template",get:function(){return e.html(a())}},{key:"tag",get:function(){return"lrndesign-contactcard"}},{key:"properties",get:function(){return{image:{type:String},email:{type:String},name:{type:String},position:{type:String},organization:{type:String},phone:{type:String},website:{type:String},twitter:{type:String}}}}],(o=null)&&i(t.prototype,o),c&&i(t,c),p}();window.customElements.define(s.tag,s),n.LrndesignContactcard=s,Object.defineProperty(n,"__esModule",{value:!0})});
