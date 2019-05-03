define(["exports","require","./node_modules/lit-element/lit-element.js","./node_modules/@polymer/paper-card/paper-card.js","./node_modules/@lrnwebcomponents/absolute-position-behavior/absolute-position-behavior.js"],function(_exports,_require,_litElement,_paperCard,_absolutePositionBehavior){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.SimpleBlogCard=void 0;_require=babelHelpers.interopRequireWildcard(_require);function _templateObject2_bd6b39c06d6b11e9a4e145961fad7e37(){var data=babelHelpers.taggedTemplateLiteral(["\n        :host {\n          display: inline-block;\n          --simple-blog-card-author-link: #03a87c;\n        }\n\n        :host([hidden]) {\n          display: none;\n        }\n        .card-micro {\n          width: 100px;\n        }\n        .card-small {\n          width: 200px;\n        }\n        .card-medium {\n          width: 300px;\n        }\n        .card-large {\n          width: 400px;\n        }\n        .card-xlarge {\n          width: 600px;\n        }\n        a {\n          text-decoration: none;\n        }\n        .teaser {\n          margin-top: 7px;\n        }\n        .teaser,\n        .teaser ::slotted(*) {\n          color: var(--simple-blog-card-text, rgba(0, 0, 0, 0.54));\n          line-height: 1.2;\n          font-size: 20px;\n          word-break: all;\n        }\n        paper-card:not(:defined) {\n          display: none;\n        }\n        paper-card {\n          --iron-image-height: 250px;\n        }\n        .card-content {\n          height: 125px;\n          overflow: hidden;\n        }\n        .card-micro {\n          --iron-image-height: 50px;\n        }\n        .card-small {\n          --iron-image-height: 100px;\n        }\n        .card-medium {\n          --iron-image-height: 150px;\n        }\n        .card-large {\n          --iron-image-height: 200px;\n          height: 100px;\n        }\n        .card-micro .card-content {\n          height: 25px;\n        }\n        .card-small .card-content {\n          height: 50px;\n        }\n        .card-medium .card-content {\n          height: 75px;\n        }\n        .card-large .card-content {\n          height: 100px;\n        }\n        paper-card h3 {\n          font-size: 26px;\n          line-height: 1.1;\n          letter-spacing: 0;\n          font-weight: 600;\n          color: var(--simple-blog-card-header, black);\n          text-decoration: none;\n          padding-bottom: 2px;\n          padding-top: 5px;\n          margin: 0;\n          font-family: \"Lucida Grande\", \"Lucida Sans Unicode\", \"Lucida Sans\",\n            Geneva, Arial, sans-serif;\n          display: -webkit-box;\n          -webkit-line-clamp: 3;\n          -webkit-box-orient: vertical;\n          overflow: hidden;\n          word-break: break-word;\n          word-wrap: break-word;\n          text-overflow: ellipsis;\n        }\n        paper-avatar {\n          -webkit-box-flex: 0;\n          -webkit-flex: 0 0 auto;\n          -ms-flex: 0 0 auto;\n          flex: 0 0 auto;\n          display: inline-block;\n        }\n        .reading-time:after {\n          content: attr(title);\n        }\n        .author-block {\n          line-height: 1.4;\n          font-size: 15px;\n          display: -webkit-box;\n          display: -webkit-flex;\n          display: -ms-flexbox;\n          display: flex;\n          -webkit-box-align: center;\n          -webkit-align-items: center;\n          -ms-flex-align: center;\n          align-items: center;\n        }\n        .author-info {\n          font-size: 16px;\n          line-height: 1.4;\n          padding-left: 10px;\n          text-rendering: auto;\n        }\n        .author-info a {\n          color: var(--simple-blog-card-author-link);\n        }\n        .post-details {\n          font-size: 15px;\n          color: var(--simple-blog-card-text, rgba(0, 0, 0, 0.54));\n        }\n        .post-details .dot {\n          padding-right: 0.3em;\n          padding-left: 0.3em;\n        }\n        .box {\n          outline: 1px solid black;\n        }\n        absolute-position-behavior {\n          display: none;\n        }\n        .show {\n          display: unset;\n        }\n      "]);_templateObject2_bd6b39c06d6b11e9a4e145961fad7e37=function _templateObject2_bd6b39c06d6b11e9a4e145961fad7e37(){return data};return data}function _templateObject_bd6b39c06d6b11e9a4e145961fad7e37(){var data=babelHelpers.taggedTemplateLiteral(["\n<style>\n:host {\n  display:block;\n}\n</style>\n<paper-card\n  .alt=\"","\"\n  image=\"","\"\n  .elevation=\"","\"\n  animated-shadow\n  preload-image\n  .placeholder-image=\"","\"\n  class=\"card-","\">\n  <div class=\"card-content\">\n    <a href=\"","\">\n      <h3>","</h3>\n      <div class=\"teaser\">\n        <slot></slot>\n      </div>\n    </a>\n  </div>\n  <div class=\"card-actions\">\n    <div id=\"author\" class=\"author-block\"\n    @mouseover=","\n    @focusin=","\n    @mouseout=","\n    @focusout=","\n    >\n      <paper-avatar\n        .label=\"","\"\n        .src=\"","\">\n      </paper-avatar>\n      <div class=\"author-info\">\n        <a .href=\"","\">","</a>\n        <div class=\"post-details\">\n          <simple-datetime format=\"M jS\" .timestamp=\"","\" unix>\n          </simple-datetime>\n          <span class=\"dot\">&#183</span>\n          <span class=\"reading-time\" .title=\""," min read\"></span>\n        </div>\n      </div>\n    </div>\n  </div>\n</paper-card>\n<absolute-position-behavior for=\"author\" poisition=\"top\">\n  <div class=\"box\">\n    <paper-avatar .label=\"","\" .src=\"","\">\n    </paper-avatar>\n    <h5 class=\"author-name\">","</h5>\n    <div class=\"author-bio\">","</div>\n  </div>\n</absolute-position-behavior>"]);_templateObject_bd6b39c06d6b11e9a4e145961fad7e37=function _templateObject_bd6b39c06d6b11e9a4e145961fad7e37(){return data};return data}/**
 * `simple-blog-card`
 * `a card commonly found on a blogging website`
 *
 * @microcopy - language worth noting:
 *  -
 *
 * @customElement
 * @lit-html
 * @lit-element
 * @demo demo/index.html
 */var SimpleBlogCard=/*#__PURE__*/function(_LitElement){babelHelpers.inherits(SimpleBlogCard,_LitElement);babelHelpers.createClass(SimpleBlogCard,[{key:"render",// render function
value:function render(){return(0,_litElement.html)(_templateObject_bd6b39c06d6b11e9a4e145961fad7e37(),this.alt,this.image,this.shadow,this.placeholder,this.size,this.link,this.title,this.showDetails,this.showDetails,this.hideDetails,this.hideDetails,this.author,this.authorimage,this.authorlink,this.author,this.timestamp,this.readtime,this.author,this.authorimage,this.author,this.authorbio)}// properties available to the custom element for data binding
},{key:"tag",/**
   * Store the tag name to make it easier to obtain directly.
   * @notice function name must be here for tooling to operate correctly
   */value:function tag(){return"simple-blog-card"}}],[{key:"properties",get:function get(){return{title:{name:"title",type:"String"},author:{name:"author",type:"String"},authorimage:{name:"authorimage",type:"String"},authorlink:{name:"authorlink",type:"String"},readtime:{name:"readtime",type:"Number"},timestamp:{name:"timestamp",type:"Number"},image:{name:"image",type:"String"},link:{name:"link",type:"String"},shadow:{name:"shadow",type:"Number"},size:{name:"size",type:"String"},placeholder:{name:"placeholder",type:"String"},alt:{name:"alt",type:"String"}}}},{key:"styles",get:function get(){return[(0,_litElement.css)(_templateObject2_bd6b39c06d6b11e9a4e145961fad7e37())]}// life cycle
}]);function SimpleBlogCard(){var _this;babelHelpers.classCallCheck(this,SimpleBlogCard);_this=babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(SimpleBlogCard).call(this));_this.placeholder="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBYRXhpZgAATU0AKgAAAAgAAgESAAMAAAABAAEAAIdpAAQAAAABAAAAJgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAAqADAAQAAAABAAAAAgAAAAD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/8AAEQgAAgACAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMAHBwcHBwcMBwcMEQwMDBEXERERERcdFxcXFxcdIx0dHR0dHSMjIyMjIyMjKioqKioqMTExMTE3Nzc3Nzc3Nzc3P/bAEMBIiQkODQ4YDQ0YOacgJzm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5v/dAAQAAf/aAAwDAQACEQMRAD8AiooooA//2Q==";_this.size="medium";_this.shadow=0;new Promise(function(res,rej){return _require.default(["@lrnwebcomponents/paper-avatar/paper-avatar.js"],res,rej)});new Promise(function(res,rej){return _require.default(["time-elements/dist/time-elements.js"],res,rej)});return _this}babelHelpers.createClass(SimpleBlogCard,[{key:"update",value:function update(changedProperties){var _this2=this;babelHelpers.get(babelHelpers.getPrototypeOf(SimpleBlogCard.prototype),"update",this).call(this);changedProperties.forEach(function(oldValue,propName){if("image"==propName){// fallback to placeholder if set to empty
if(!_this2.image){_this2.image=_this2.placeholder}}})}},{key:"connectedCallback",value:function connectedCallback(){babelHelpers.get(babelHelpers.getPrototypeOf(SimpleBlogCard.prototype),"connectedCallback",this).call(this);if(!this.image){this.image=this.placeholder}this.addEventListener("mouseover",this.hoverState.bind(this));this.addEventListener("mouseout",this.hoverStateOff.bind(this))}},{key:"disconnectedCallback",value:function disconnectedCallback(){babelHelpers.get(babelHelpers.getPrototypeOf(SimpleBlogCard.prototype),"disconnectedCallback",this).call(this);this.removeEventListener("mouseover",this.hoverState.bind(this));this.removeEventListener("mouseout",this.hoverStateOff.bind(this))}},{key:"showDetails",value:function showDetails(e){/*this.shadowRoot
      .querySelector("absolute-position-behavior")
      .classList.add("show");*/}},{key:"hideDetails",value:function hideDetails(e){/*this.shadowRoot
      .querySelector("absolute-position-behavior")
      .classList.remove("show");*/}},{key:"hoverState",value:function hoverState(e){this.shadow=1}},{key:"hoverStateOff",value:function hoverStateOff(e){this.shadow=0}}]);return SimpleBlogCard}(_litElement.LitElement);_exports.SimpleBlogCard=SimpleBlogCard;customElements.define("simple-blog-card",SimpleBlogCard)});