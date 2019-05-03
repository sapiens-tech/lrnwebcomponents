define(["exports","./node_modules/@polymer/polymer/polymer-element.js","./node_modules/@lrnwebcomponents/hax-body-behaviors/lib/HAXWiring.js","./node_modules/@lrnwebcomponents/schema-behaviors/schema-behaviors.js","./node_modules/@lrnwebcomponents/simple-colors/simple-colors.js","./node_modules/@lrnwebcomponents/responsive-utility/responsive-utility.js"],function(_exports,_polymerElement,_HAXWiring,_schemaBehaviors,_simpleColors,_responsiveUtility){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.LrndesignTimeline=void 0;function _templateObject_05f9eff06d0911e9b412a979eb653006(){var data=babelHelpers.taggedTemplateLiteral(["\n<style>:host {\n  font-size: 14px;\n  font-weight: 100;\n  line-height: 160%;\n  display: block;\n  --lrndesign-timeline-color: var(--simple-colors-default-theme-grey-8, #444);\n  --lrndesign-timeline-color-print: #000;\n  --lrndesign-timeline-background: #f4f4f4;\n  --lrndesign-timeline-background-print: #fff;\n  --lrndesign-timeline-border: var(--simple-colors-default-theme-grey-5, #bbb);\n  --lrndesign-timeline-border-print: var(--simple-colors-fixed-theme-grey-5, #bbb);\n  --lrndesign-timeline-accent: #000;\n  --lrndesign-timeline-accent-background: #fff;\n  --lrndesign-timeline-accent-border: var(--simple-colors-default-theme-accent-8, #444);\n  --lrndesign-timeline-header: var(--simple-colors-default-theme-accent-1, #fff);\n  --lrndesign-timeline-header-accent: var(--simple-colors-default-theme-accent-8, #444);\n  --lrndesign-timeline-accent-print: var(--simple-colors-fixed-theme-accent-8, #444);\n}\n:host([dark]){\n  --lrndesign-timeline-background: #1b1b1b;\n}\n:host([hidden]) {\n  display: none;\n}\n:host #timeline {\n  display: block;\n  border-radius: 3px;\n  border: 1px solid var(--lrndesign-timeline-border-print);\n  border-left: 3px solid var(--lrndesign-timeline-accent-print);\n  background-color: var(--lrndesign-timeline-background-print);\n  color: var(--lrndesign-timeline-color-print);\n}\n:host #events {\n  padding: 0;\n  width: 100%;\n  min-height: 300px;\n}\n:host .heading {\n  margin: 0;\n  color: var(--lrndesign-timeline-accent-print);\n}\n:host .heading h2 {\n  font-size: 24px;\n  font-weight: 300;\n}\n:host .heading h2,\n:host .details,\n:host .media {\n  padding: 0 40px;\n}\n:host .details {\n  margin: 15px 0; \n}\n:host .media { \n  opacity: 1;\n  transition: opacity 0.5s;\n}\n:host .media, \n:host .media * { \n  margin: 0 auto;\n  max-width: 100%;\n  max-height: 260px;\n}\n@media screen {\n  :host #timeline {\n    color: var(--lrndesign-timeline-color);\n    background-color: var(--lrndesign-accent-background);\n    border: 1px solid var(--lrndesign-timeline-border);\n    border-left: 3px solid var(--lrndesign-timeline-accent-border);\n  }\n  :host([dark]) #timeline {\n    background-color: var(--lrndesign-timeline-background);\n  }\n  :host h2 {\n    color:  var(--lrndesign-timeline-header-accent);\n  }\n  :host(:not([timeline-size=\"xs\"])) #timeline {\n    background-color: var(--lrndesign-timeline-background);\n  }\n  :host(:not([timeline-size=\"xs\"])) h2 {\n    color: var(--lrndesign-timeline-header-accent);\n  }\n  :host(:not([timeline-size=\"xs\"])) #events {\n    height: 300px;\n    position: relative;\n    overflow-y: scroll;\n  }\n  :host(:not([timeline-size=\"xs\"])) .event {\n    position: static;\n    top: 0;\n  }\n  :host(:not([timeline-size=\"xs\"])) .event-overview {\n    padding: 0;\n    position: sticky;\n    top: 0;\n  }\n  :host(:not([timeline-size=\"xs\"])) .heading {\n    position: absolute;\n    top: 0;\n    padding: 10px 0;\n    overflow: hidden;\n    background-color: transparent;\n    width: calc(55% + 30px);\n  }\n  :host(:not([timeline-size=\"xs\"])) .event[has-media][selected] .heading {\n    z-index: 2;\n  }\n  :host(:not([timeline-size=\"xs\"])) .event[has-media] .heading:after {\n    content: ' ';\n    z-index: 200;\n    position: absolute;\n    top: 42px;\n    right: 30px;\n    width: 0; \n    padding: 0; \n    border-top: 0px solid transparent;\n    border-bottom: 0px solid transparent;\n    border-left: 0px solid transparent;\n    transition: all 0.3s;\n    transition-delay: 0.2s;\n  }\n  :host(:not([timeline-size=\"xs\"])) .event[has-media][selected] .heading:after {\n    top: 7px;\n    right: 0px;\n    border-top: 35px solid transparent;\n    border-bottom: 35px solid transparent; \n    border-left: 35px solid var(--lrndesign-timeline-header-accent);\n  }\n  :host(:not([timeline-size=\"xs\"])) .heading h2 {\n    margin: 7px 48px 0 20px;\n    padding: 0 20px;\n    line-height: 50px;\n    height: 50px;\n    background-color: var(--lrndesign-timeline-header-accent);\n    color:  var(--lrndesign-timeline-header);\n    opacity: 0.6;\n    transition: opacity 0.3s;\n  }\n  :host(:not([timeline-size=\"xs\"])) .event[selected] .heading h2 {\n    opacity: 1;\n  }\n  :host(:not([timeline-size=\"xs\"])) .event[has-media] .heading h2:after {\n    content: '';\n    position: absolute;\n    left: calc(100% - 48px);\n    top: 17px;\n    height: 50px;\n    width: 0px;\n    transition: all 0.3s;\n    background-color: var(--lrndesign-timeline-background);\n  }\n  :host(:not([timeline-size=\"xs\"])) .event[has-media][selected] .heading h2:after {\n    width: 13px;\n    background-color: var(--lrndesign-timeline-header-accent);\n  }\n  :host(:not([timeline-size=\"xs\"])) .media-outer {\n    display: flex;\n    align-items: center;\n    position: absolute;\n    right: 0;\n    width: 45%;\n    height: 300px;\n  }\n  :host(:not([timeline-size=\"xs\"])) .media {\n    display: flex;\n    padding: 20px 20px 20px 50px;\n    opacity: 0;\n    transition: opacity 0.3s delay 0.3s;\n  }\n  :host(:not([timeline-size=\"xs\"])) .event[selected] .media {\n    opacity: 1;\n    transition-delay: 0s;\n  }\n  :host(:not([timeline-size=\"xs\"])) .details {\n    padding: 67px 20px 20px;\n    margin: 0 20px;\n    width: calc(55% - 80px);\n    color: var(--lrndesign-timeline-color);\n    background-color: var(--lrndesign-timeline-background);\n    border: 1px solid var(--lrndesign-timeline-background);\n    border-radius: 3px;\n    transition: all 0.5s;\n  }\n  :host(:not([timeline-size=\"xs\"])) .event:last-of-type .details {\n    min-height: 180px;\n  }\n  :host(:not([timeline-size=\"xs\"])) .event[selected] .details {\n    color: var(--lrndesign-timeline-accent);\n    background-color:  var(--lrndesign-timeline-accent-background);\n    border: 1px solid var(--lrndesign-timeline-border);\n    box-shadow: 0 2px 2px var(--lrndesign-timeline-border);\n  }\n  :host(:not([timeline-size=\"xs\"])) .event:first-of-type[selected] .details {\n    border-top: 1px solid var(--lrndesign-timeline-background);\n  }\n  :host(:not([timeline-size=\"xs\"])) .event:last-of-type[selected] .details {\n    border-bottom: 1px solid var(--lrndesign-timeline-background);\n  }\n}</style>\n<style is=\"custom-style\" include=\"simple-colors\"></style>\n<article>\n  <h1 id=\"title\">[[title]]</h1>\n  <slot></slot>\n  <div id=\"timeline\">\n      <div id=\"events\" on-scroll=\"_onScroll\">\n        <template id=\"repeat\" is=\"dom-repeat\" items=\"[[__events]]\" as=\"event\" index-as=\"index\" restamp>\n          <section class=\"event\" has-media$=\"[[_isSet(event.imagesrc)]]\">\n            <div class=\"event-overview\">\n              <div class=\"heading\"><h2>[[event.heading]]</h2></div>\n              <div class=\"media-outer\">\n                <template is=\"dom-if\" if=\"[[_isSet(event.imagesrc)]]\" restamp>\n                  <div class=\"media\">\n                    <div><image alt$=\"[[event.imagealt]]\" src$=\"[[event.imagesrc]]\"/></div>\n                  </div>\n                </template>\n              </div>\n            </div>\n            <div class=\"details\">[[event.details]]</div>\n          </section>\n        </template>\n    </div>\n  </div>\n</article>"]);_templateObject_05f9eff06d0911e9b412a979eb653006=function _templateObject_05f9eff06d0911e9b412a979eb653006(){return data};return data}/**
 * `lrndesign-timeline`
 * `an element that displays events on a timeline`
 *
 * @microcopy - language worth noting:
 *  -
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */var LrndesignTimeline=/*#__PURE__*/function(_SimpleColors){babelHelpers.inherits(LrndesignTimeline,_SimpleColors);function LrndesignTimeline(){babelHelpers.classCallCheck(this,LrndesignTimeline);return babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(LrndesignTimeline).apply(this,arguments))}babelHelpers.createClass(LrndesignTimeline,[{key:"connectedCallback",/**
   * life cycle, element is afixed to the DOM
   */value:function connectedCallback(){var root=this;babelHelpers.get(babelHelpers.getPrototypeOf(LrndesignTimeline.prototype),"connectedCallback",this).call(this);this.HAXWiring=new _HAXWiring.HAXWiring;this.HAXWiring.setup(LrndesignTimeline.haxProperties,LrndesignTimeline.tag,this);window.ResponsiveUtility.requestAvailability();window.dispatchEvent(new CustomEvent("responsive-element",{detail:{element:root,attribute:"timeline-size",relativeToParent:!0,sm:600,md:900,lg:1200,xl:1600}}));this._checkScroll()}/**
   * checks the scroll of each event
   */},{key:"_checkScroll",value:function _checkScroll(){var root=this,events=root.shadowRoot.querySelectorAll(".event");if(1>events.length)root.$.repeat.render();events=root.shadowRoot.querySelectorAll(".event");events.forEach(function(event){var top=event.offsetTop,target=events[0].offsetTop+50+event.parentNode.scrollTop,bottom=event.offsetTop+event.offsetHeight;if(target>top&&target<bottom){event.setAttribute("selected",!0)}else{event.removeAttribute("selected")}})}/**
   * returns the media type for a given event, or false if there is no media
   *
   * @param {object} the event type to check
   * @param {object} the media type to check
   * @returns {string} the media type, or false if there is no media
   */},{key:"_isMediaType",value:function _isMediaType(event,type){return this._isSet(event.media)&&this._isSet(event.media.type)?event.media.type===type:!1}/**
   * returns true if an property is not null
   *
   * @param {object} the property to check
   * @returns {boolean} property !== undefined && property !== null
   */},{key:"_isSet",value:function _isSet(prop){return prop!==void 0&&null!==prop}/**
   * gets updated event data
   *
   * @param {array} the raw events array
   */},{key:"_updateEvents",value:function _updateEvents(events){events="string"===typeof events?JSON.parse(events):events;return events}/**
   * handles the scroll on the events side
   */},{key:"_onScroll",value:function _onScroll(e){this._checkScroll()}}],[{key:"template",// render function
get:function get(){return(0,_polymerElement.html)(_templateObject_05f9eff06d0911e9b412a979eb653006())}// haxProperty definition
},{key:"haxProperties",get:function get(){return{canScale:!1,canPosition:!1,canEditSource:!0,gizmo:{title:"Timeline",description:"A timeline of events with images and text",icon:"icons:timeline",color:"indigo",groups:["Content","Instructional","Media","Image"],handles:[{type:"image",source:"image"}],meta:{author:"LRNWebComponents"}},settings:{quick:[],configure:[{property:"title",title:"Timeline Title",description:"A title for the timeline.",inputMethod:"textfield"},{property:"accentColor",title:"Accent Color",description:"An optional accent color.",inputMethod:"colorpicker",icon:"editor:format-color-fill"},{property:"dark",title:"Dark Theme",description:"Enable Dark Theme",inputMethod:"boolean",icon:"icons:invert-colors"},{slot:"",title:"Timeline Description",description:"Optional text describing the timeline.",inputMethod:"textfield"},{property:"events",title:"Timeline Events",description:"The events in the timeline",inputMethod:"array",properties:[{property:"heading",title:"Event Heading",description:"The heading for the event.",inputMethod:"textfield",icon:"editor:title"},{property:"details",title:"Event Details",description:"The body text with details for the event.",inputMethod:"textfield",icon:"editor:title"},{property:"imagesrc",title:"Event Image",description:"The path of the image.",inputMethod:"haxupload",icon:"editor:title"},{property:"imagealt",title:"Event Image Alt Text",description:"The alt text of the image (for accessibility).",inputMethod:"alt",icon:"editor:title"}]}],advanced:[]}}}// properties available to the custom element for data binding
},{key:"properties",get:function get(){return{/**
   * the title of the timeline
   */title:{type:"String",value:null},/**
   * the events of the timeline, in the desired order, as in:```
[
  {
    "heading": "1855 - Penn State Charter",   //required, the main heading for the media, usually a date, time, or era
    "details": "",                            //optional, text describing the event
    "image": {                                //optional image for the event
      "src": "path/to/media.jpg",             //the alt text of the image
      "alt": "path/to/media.mp3",             //the url of the image
    },
    {...},
    {...},
  }
]```
   */events:{type:"Array",value:[],notify:!0},/**
   * the updated list of events
   */__events:{type:"Array",computed:"_updateEvents(events)",notify:!0},/**
   * the timline size, calculated by responsive utility
   */timelineSize:{type:"String",value:"xs",reflectToAttribute:!0}}}/**
   * Store the tag name to make it easier to obtain directly.
   * @notice function name must be here for tooling to operate correctly
   */},{key:"tag",get:function get(){return"lrndesign-timeline"}/**
   * gets simple-colors behaviors
   */},{key:"behaviors",get:function get(){return[_simpleColors.SimpleColors]}}]);return LrndesignTimeline}(_simpleColors.SimpleColors);_exports.LrndesignTimeline=LrndesignTimeline;window.customElements.define(LrndesignTimeline.tag,LrndesignTimeline)});