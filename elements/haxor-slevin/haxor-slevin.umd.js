!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports,require("@polymer/polymer/polymer-element.js"),require("@lrnwebcomponents/haxcms-elements/lib/core/HAXCMSThemeWiring.js"),require("@lrnwebcomponents/haxcms-elements/lib/core/haxcms-site-store.js"),require("mobx"),require("@lrnwebcomponents/simple-colors/simple-colors.js"),require("@lrnwebcomponents/haxcms-elements/lib/ui-components/query/site-query.js"),require("@polymer/iron-pages/iron-pages.js"),require("@polymer/iron-icon/iron-icon.js"),require("@polymer/polymer/lib/elements/dom-repeat.js")):"function"==typeof define&&define.amd?define(["exports","@polymer/polymer/polymer-element.js","@lrnwebcomponents/haxcms-elements/lib/core/HAXCMSThemeWiring.js","@lrnwebcomponents/haxcms-elements/lib/core/haxcms-site-store.js","mobx","@lrnwebcomponents/simple-colors/simple-colors.js","@lrnwebcomponents/haxcms-elements/lib/ui-components/query/site-query.js","@polymer/iron-pages/iron-pages.js","@polymer/iron-icon/iron-icon.js","@polymer/polymer/lib/elements/dom-repeat.js"],n):n((e=e||self).HaxorSlevin={},e.polymerElement_js,e.HAXCMSThemeWiring_js,e.haxcmsSiteStore_js,e.mobx)}(this,function(e,n,t,i,o){"use strict";function a(e,n){for(var t=0;t<n.length;t++){var i=n[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function s(e,n,t){return n&&a(e.prototype,n),t&&a(e,t),e}function r(e){return(r=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function l(e,n){return(l=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e})(e,n)}function p(e,n){return!n||"object"!=typeof n&&"function"!=typeof n?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):n}function c(e,n,t){return(c="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,n,t){var i=function(e,n){for(;!Object.prototype.hasOwnProperty.call(e,n)&&null!==(e=r(e)););return e}(e,n);if(i){var o=Object.getOwnPropertyDescriptor(i,n);return o.get?o.get.call(t):o.value}})(e,n,t||e)}function m(){var e,n,t=(e=['\n<style>:host {\n  display: block;\n  background-color: #FFFFFF;\n  color: rgba(0,0,0,.84);\n}\n\n:host([hidden]) {\n  display: none;\n}\n\n\n:host([edit-mode]) #slot {\n  display: none;\n}\n#slot {\n  min-height: 50vh;\n}\n#slot ::slotted(p) {\n  margin-top: 29px;\n  font-family: Georgia,Cambria,"Times New Roman",Times,serif;\n  letter-spacing: .01rem;\n  font-weight: 400;\n  font-style: normal;\n  font-size: 21px;\n  line-height: 1.58;\n  letter-spacing: -.003em;\n  margin-bottom: 0;\n}\n#slot ::slotted(h1,h2,h3,h4,h5,h6) {\n  font-family: "Lucida Grande","Lucida Sans Unicode","Lucida Sans",Geneva,Arial,sans-serif;\n  letter-spacing: -.02em;\n  font-style: normal;\n  letter-spacing: 0;\n  font-size: 34px;\n  line-height: 1.15;\n  letter-spacing: -.015em;\n  font-weight: 600;\n  margin-top: 53px;\n}\n#slot ::slotted(h2,h3) {\n  font-size: 34px;\n}\n.wrapper {\n  padding-bottom: 80px;\n}\n#home {\n  max-width: 1032px;\n  padding-left: 20px;\n  padding-right: 20px;\n  margin: 0 auto;\n}\n.contentcontainer-wrapper {\n  max-width: 740px;\n  margin: 0 auto;\n  box-sizing: border-box;\n  padding-left: 20px;\n  padding-right: 20px;\n}\nsimple-blog-card {\n  padding: 8px;\n  min-height: 100px;\n  min-width: 100px;\n}\n.simple-blog-card-wrapper {\n  margin: 0 auto;\n  width: 100%;\n}\n.evenly {\n  display: flex;\n  justify-content: space-evenly;\n}\nsimple-blog-card[size="micro"] {\n  padding: 4px;\n}\niron-pages {\n  padding-top: 64px;\n}\ndom-repeat {\n  padding-bottom: 16px;\n  min-height: 300px;\n}\napp-toolbar {\n  padding: 0 20px;\n  height: 54px;\n  max-width: 1032px;\n  margin: 0 auto;\n}\n.backbutton {\n  height: 54px;\n  border-radius: 0;\n  min-width: unset;\n  text-transform: unset;\n}\napp-header {\n  z-index: 100;\n  @apply --layout-fixed-top;\n  color: #FFFFFF;\n  box-shadow: 0 4px 12px 0 rgba(0,0,0,.15);\n  background-color: var(--haxcms-color);\n  --app-header-background-rear-layer: {\n    background-color: var(--haxcms-color);\n  };\n}\npaper-icon-button {\n  --paper-icon-button-ink-color: white;\n}\nsite-active-title {\n  --site-active-title-heading: {\n    font-size: 42px;\n    font-family: Georgia,Cambria,"Times New Roman",Times,serif;\n    font-weight: 400;\n    font-style: normal;\n    font-weight: 400;\n    line-height: 1.25;\n    letter-spacing: 0;\n  };\n}\n\n.social-float {\n  top: 160px;\n  position: fixed;\n  z-index: 99;\n  margin-left: -10vw;\n}\n.social-float ul {\n  padding: 0;\n  margin: 0;\n  list-style: none;\n}\n\nsocial-share-link {\n  --social-share-button-bg: var(--haxcms-color);\n  --social-share-button: {\n    padding: 8px;\n    border-radius: 50%;\n  }\n}\n\n.annoy-user {\n  background-color: rgba(255,255,255,.9);\n  display: block;\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  box-shadow: 0 -3px 10px 0 rgba(0,0,0,.0785);\n  right: 0;\n  padding: 10px 0;\n  height: 50px;\n  z-index: 100;\n}\niron-icon {\n  height: 40px;\n  width: 40px;\n  display: flex;\n  padding-right: 20px;\n}\n.annoy-user iron-icon {\n  color: black;\n}\n.annoy-user span {\n  flex: 1 1 auto;\n  height: 40px;\n  display: flex;\n  vertical-align: middle;\n  line-height: 40px;\n}\n.annoy-inner strong {\n  padding: 0 4px;\n}\n.annoy-user .rss {\n  margin-left: 50px;\n}\n.annoy-inner {\n  max-width:700px;\n  margin: 0 auto;\n  display: flex;\n}\n.subtitle {\n  font-family: "Lucida Grande","Lucida Sans Unicode","Lucida Sans",Geneva,Arial,sans-serif;\n  letter-spacing: -.02em;\n  font-weight: 300;\n  font-style: normal;\n  letter-spacing: 0;\n  font-size: 28px;\n  line-height: 1.22;\n  letter-spacing: -.012em;\n}\nsite-rss-button {\n  margin: 0 4px;\n  padding: 0;\n  --site-rss-color: #000000;\n  --site-rss-bg-color: var(--haxcms-color);\n  --site-rss-paper-button: {\n    padding: 0 4px;\n    margin: 0;\n  };\n}\n\n@media screen and (max-width: 800px) {\n  #contentcontainer, #home {\n    padding-left: 8px;\n    padding-right: 8px;\n  }\n  .evenly {\n    display: unset;\n    justify-content: unset;\n  }\n  simple-blog-card {\n    padding: 0;\n  }\n  .hide-small {\n    display: none;\n  }\n}</style>\n<style>\n  html,body {\n    background-color: #FFFFFF;\n  }\n  :root,html,body,a {\n    color: rgba(0,0,0,.84);\n  }\n  </style>\n\n<app-header reveals>\n  <app-toolbar>\n    <div>\n      <paper-button class="backbutton" on-click="_goBack">\n        <iron-icon icon="[[icon]]"></iron-icon>\n        <span class="hide-small">[[title]] - [[activeTitle]]</span>\n      </paper-button>\n    </div>\n    <div main-title>\n      <iron-image src="[[image]]" preload sizing="cover" style="height:46px;width:100%;margin: 4px 0 2px 0;"></iron-image>\n    </div>\n    <div>\n      <site-modal icon="icons:search" title="Search site" button-label="Search">\n        <site-search></site-search>\n      </site-modal>\n    </div>\n  </app-toolbar>\n</app-header>\n<div class="wrapper">\n  <iron-pages selected="[[selectedPage]]">\n    <div id="home">\n      <site-query result="{{__mainPosts}}" limit="2" sort=\'{"created": "ASC"}\'></site-query>\n      <div class="simple-blog-card-wrapper evenly">\n        <dom-repeat items="[[__mainPosts]]" as="post" mutable-data>\n          <template>\n            <simple-blog-card alt="[[post.metadata.fields.images.0.alt]]" color="[[color]]"\n              title="[[post.title]]"\n              size="large"\n              link="[[post.location]]"\n              image="[[_showImage(post.metadata.fields.images.0.src)]]"\n              author="[[author.name]]"\n              timestamp="[[post.created]]"\n              readtime="[[post.metadata.readtime]]"\n              authorimage="[[author.image]]"\n              placeholder="[[image]]"\n              authorlink="[[author.socialLink]]">\n              [[post.description]]\n            </simple-blog-card>\n          </template>\n        </dom-repeat>\n      </div>\n      <site-query result="{{__posts}}" start-index="2" limit="6" sort=\'{"created": "ASC"}\'></site-query>\n      <div class="simple-blog-card-wrapper">\n        <dom-repeat items="[[__posts]]" as="post" mutable-data>\n          <template>\n            <simple-blog-card \n            placeholder="[[image]]"\n            alt="[[post.metadata.fields.images.0.alt]]" color="[[color]]" title="[[post.title]]" size="medium"\n              link="[[post.location]]" image="[[_showImage(post.metadata.fields.images.0.src)]]" author="[[author.name]]"\n              timestamp="[[post.created]]" readtime="[[post.metadata.readtime]]" authorimage="[[author.image]]" authorlink="[[author.socialLink]]">\n              [[post.description]]\n            </simple-blog-card>\n          </template>\n        </dom-repeat>\n      </div>\n    </div>\n    <div class="contentcontainer-wrapper">\n      <div id="contentcontainer">\n        <site-active-title></site-active-title>\n        <h3 class="subtitle" hidden$="[[!subtitle]]">[[subtitle]]</h3>\n        <div id="slot">\n          <slot></slot>\n        </div>\n      </div>\n      <site-query result="{{__followUpPosts}}" limit="3" start-index="[[activeManifestIndexCounter]]"\n        sort=\'{"created": "ASC"}\'></site-query>\n      <div class="simple-blog-card-wrapper">\n        <dom-repeat items="[[__followUpPosts]]" as="post" mutable-data>\n          <template>\n            <simple-blog-card alt="[[post.metadata.fields.images.0.alt]]" color="[[color]]" title="[[post.title]]" size="small"\n              link="[[post.location]]" image="[[_showImage(post.metadata.fields.images.0.src)]]" author="[[author.name]]"\n              placeholder="[[image]]" timestamp="[[post.created]]" readtime="[[post.metadata.readtime]]"\n              authorimage="[[author.image]]" authorlink="[[author.socialLink]]">\n              [[post.description]]\n            </simple-blog-card>\n          </template>\n        </dom-repeat>\n      </div>\n      <div class="social-float hide-small">\n        <ul>\n          <li>\n            <social-share-link button-style mode="icon-only" message="[[shareMsg]]" type="Twitter">\n            </social-share-link>\n          </li>\n          <li>\n            <social-share-link button-style mode="icon-only" message="[[shareMsg]]" url="[[shareUrl]]" type="LinkedIn">\n            </social-share-link>\n          </li>\n          <li>\n            <social-share-link button-style mode="icon-only" url="[[shareUrl]]" message="[[shareMsg]]" type="Facebook">\n            </social-share-link>\n          </li>\n          <li>\n            <social-share-link button-style mode="icon-only" message="[[shareMsg]]" image="[[activeImage]]" url="[[shareUrl]]"\n              type="Pinterest">\n            </social-share-link>\n          </li>\n        </ul>\n      </div>\n      <div class="annoy-user hide-small">\n        <div class="annoy-inner">\n          <iron-icon icon="[[icon]]"></iron-icon>\n          <span>\n            Never miss a story from <strong>[[title]]</strong> use RSS today!\n          </span>\n          <span class="rss">\n            <site-rss-button type="atom"></site-rss-button>\n            <site-rss-button type="rss"></site-rss-button>\n          </span>\n        </div>\n      </div>\n    </div>\n  </iron-pages>\n</div>'],n||(n=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}})));return m=function(){return t},t}var d=function(e){function a(){var e;return function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,a),e=p(this,r(a).call(this)),import("@polymer/paper-button/paper-button.js"),import("@polymer/iron-image/iron-image.js"),import("@lrnwebcomponents/haxcms-elements/lib/ui-components/active-item/site-active-title.js"),import("@lrnwebcomponents/haxcms-elements/lib/ui-components/site/site-rss-button.js"),import("@lrnwebcomponents/simple-blog-card/simple-blog-card.js"),import("@polymer/app-layout/app-header/app-header.js"),import("@polymer/app-layout/app-toolbar/app-toolbar.js"),import("@lrnwebcomponents/social-share-link/social-share-link.js"),import("@lrnwebcomponents/haxcms-elements/lib/ui-components/site/site-search.js"),import("@lrnwebcomponents/haxcms-elements/lib/ui-components/layout/site-modal.js"),e}return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&l(e,n)}(a,t.HAXCMSTheme(n.PolymerElement)),s(a,[{key:"_getColor",value:function(e){if(e&&e.metadata&&e.metadata.hexCode)return e.metadata.hexCode}}],[{key:"template",get:function(){return n.html(m())}},{key:"properties",get:function(){return Object.assign(c(r(a),"properties",this),{manifest:{type:Object},color:{type:String,computed:"_getColor(manifest)"},selectedPage:{type:Number,reflectToAttribute:!0,value:0}})}},{key:"tag",get:function(){return"haxor-slevin"}}]),s(a,[{key:"_showImage",value:function(e){return e||!!this.image&&this.image}},{key:"connectedCallback",value:function(){var e=this;c(r(a.prototype),"connectedCallback",this).call(this),this.__disposer=[],o.autorun(function(n){var t=o.toJS(i.store.manifest);e.title=t.title,e.image=t.metadata.image,e.icon=t.metadata.icon,e.author=t.metadata.author,e.__disposer.push(n)}),o.autorun(function(n){e._noticeLocationChange(i.store.location),e.__disposer.push(n)}),o.autorun(function(n){e.activeManifestIndexCounter=o.toJS(i.store.activeManifestIndexCounter),e.__disposer.push(n)}),o.autorun(function(n){e.activeTitle=o.toJS(i.store.activeTitle),e.shareUrl=document.location.href,e.shareMsg=e.activeTitle+" "+e.shareUrl,i.store.activeItem&&i.store.activeItem.metadata&&i.store.activeItem.metadata.fields&&i.store.activeItem.metadata.fields.subtitle?e.subtitle=i.store.activeItem.metadata.fields.subtitle:e.subtitle=!1,i.store.activeItem&&i.store.activeItem.metadata&&i.store.activeItem.metadata.fields&&i.store.activeItem.metadata.fields.images&&i.store.activeItem.metadata.fields.images[0]&&i.store.activeItem.metadata.fields.images[0].src&&(e.activeImage=i.store.activeItem.metadata.fields.images[0].src),e.__disposer.push(n)})}},{key:"_noticeLocationChange",value:function(e){if(e&&void 0!==e.route){var n=e.route.name;"home"===n||"404"===n?this.selectedPage=0:(window.scrollTo({top:0,left:0}),this.selectedPage=1),setTimeout(function(){var e=document.createEvent("UIEvents");e.initUIEvent("resize",!0,!1,window,0),window.dispatchEvent(e)},50)}}},{key:"disconnectedCallback",value:function(){for(var e in this.__disposer)this.__disposer[e].dispose();c(r(a.prototype),"disconnectedCallback",this).call(this)}},{key:"_goBack",value:function(e){window.history.pushState(null,null,i.store.location.baseUrl),window.dispatchEvent(new PopStateEvent("popstate")),window.scrollTo({top:0,left:0});var n=new CustomEvent("json-outline-schema-active-item-changed",{bubbles:!0,cancelable:!0,detail:{}});this.dispatchEvent(n),this.selectedPage=0}}]),a}();window.customElements.define(d.tag,d),e.HaxorSlevin=d,Object.defineProperty(e,"__esModule",{value:!0})});
//# sourceMappingURL=haxor-slevin.umd.js.map
