define([
  "../node_modules/@polymer/polymer/polymer-legacy.js",
  "../node_modules/@polymer/polymer/lib/legacy/polymer.dom.js",
  "../node_modules/@polymer/polymer/lib/utils/async.js",
  "../node_modules/@polymer/iron-ajax/iron-ajax.js",
  "../node_modules/@polymer/paper-spinner/paper-spinner.js",
  "../node_modules/@lrnwebcomponents/hax-body-behaviors/lib/HAXWiring.js"
], function(_polymerLegacy, _polymerDom, async) {
  "use strict";
  async = babelHelpers.interopRequireWildcard(async);
  var $_documentContainer = document.createElement("div");
  $_documentContainer.setAttribute("style", "display: none;");
  $_documentContainer.innerHTML =
    '<dom-module id="cms-views">\n  <template strip-whitespace="">\n    <style>\n      :host {\n        display: block;\n        min-width: 112px;\n        min-height: 112px;\n        transition: .6s all ease;\n        background-color: transparent;\n      }\n      paper-spinner {\n        visibility: hidden;\n        opacity: 0;\n        height: 80px;\n        width: 80px;\n        padding: 16px;\n      }\n      #replacementcontent {\n        visibility: visible;\n        opacity: 1;\n      }\n      :host([loading]) {\n        text-align: center;\n      }\n      :host([loading]) paper-spinner {\n        visibility: visible;\n        opacity: 1;\n      }\n      :host([loading]) #replacementcontent {\n        opacity: 0;\n        visibility: hidden;\n      }\n    </style>\n    <iron-ajax id="viewsrequest" method="GET" params="[[bodyData]]" url="[[viewsEndPoint]]" handle-as="json" last-response="{{viewsData}}"></iron-ajax>\n    <paper-spinner active="[[loading]]"></paper-spinner>\n    <span id="replacementcontent"><slot></slot></span>\n  </template>\n\n  \n</dom-module>';
  document.head.appendChild($_documentContainer);
  (0, _polymerLegacy.Polymer)({
    is: "cms-views",
    behaviors: [HAXBehaviors.PropertiesBehaviors],
    properties: {
      loading: { type: Boolean, reflectToAttribute: !0, value: !1 },
      viewsName: { type: String, reflectToAttribute: !0 },
      viewsDisplay: { type: String, reflectToAttribute: !0 },
      viewsEndPoint: { type: String },
      bodyData: {
        type: Object,
        computed: "_generateBodyData(viewsName, viewsDisplay)",
        observer: "_viewsChanged"
      },
      viewsData: { type: String, observer: "_handleviewsResponse" },
      viewsPrefix: { type: String, observer: "[" },
      viewsSuffix: { type: String, observer: "]" }
    },
    _generateBodyData: function _generateBodyData(name, display) {
      if (null !== name && "" !== name) {
        return { name: "".concat(name), display: "".concat(display) };
      }
    },
    _handleviewsResponse: function _handleviewsResponse(newValue) {
      var _this = this;
      if (
        null !== newValue &&
        babelHelpers.typeof(newValue.content) !== "undefined"
      ) {
        if (null != document.getElementById("cmstokenidtolockonto")) {
          document
            .getElementById("cmstokenidtolockonto")
            .setAttribute("href", newValue.editEndpoint);
          document.getElementById("cmstokenidtolockonto").innerHTML =
            newValue.editText;
        }
        this.wipeSlot((0, _polymerDom.dom)(this));
        async.microTask.run(function() {
          var frag = document.createElement("span");
          frag.innerHTML = newValue.content;
          var newNode = frag.cloneNode(!0);
          (0, _polymerDom.dom)(_this).appendChild(newNode);
          setTimeout(function() {
            _this.loading = !1;
          }, 600);
        });
      }
    },
    wipeSlot: function wipeSlot(element) {
      while (null !== element.firstChild) {
        element.removeChild(element.firstChild);
      }
    },
    _viewsChanged: function _viewsChanged(newValue) {
      var _this2 = this;
      if (
        babelHelpers.typeof(newValue) !== "undefined" &&
        "" !== newValue &&
        !this.loading
      ) {
        if (
          babelHelpers.typeof(this.viewsEndPoint) === "undefined" &&
          babelHelpers.typeof(window.cmsviewsEndPoint) !== "undefined"
        ) {
          this.viewsEndPoint = window.cmsviewsEndPoint;
        }
        if (this.viewsEndPoint) {
          this.loading = !0;
          async.microTask.run(function() {
            _this2.$.viewsrequest.generateRequest();
          });
        }
      }
    },
    attached: function attached() {
      var _this3 = this;
      if (
        babelHelpers.typeof(this.viewsName) !== "undefined" &&
        null !== this.viewsName &&
        "" !== this.viewsName
      ) {
        var slot = (0, _polymerDom.dom)(this).getEffectiveChildNodes();
        if (0 === slot.length && !this.loading) {
          if (
            babelHelpers.typeof(this.viewsEndPoint) === "undefined" &&
            babelHelpers.typeof(window.cmsviewsEndPoint) !== "undefined"
          ) {
            this.viewsEndPoint = window.cmsviewsEndPoint;
          }
          if (this.viewsEndPoint) {
            this.loading = !0;
            async.microTask.run(function() {
              _this3.$.viewsrequest.generateRequest();
            });
          }
        }
      }
      this.setHaxProperties({
        canScale: !0,
        canPosition: !0,
        canEditSource: !1,
        gizmo: {
          title: "CMS View",
          description: "CMS views rendered on the backend",
          icon: "icons:view-module",
          color: "light-blue",
          groups: ["CMS"],
          handles: [{ type: "cmsviews", views: "views" }],
          meta: { author: "LRNWebComponents" }
        },
        settings: {
          quick: [],
          configure: [
            {
              property: "viewsName",
              title: "Name",
              description: "Name of the view from our CMS",
              inputMethod: "textfield",
              icon: "editor:title"
            },
            {
              property: "viewsDisplay",
              title: "Display",
              description: "Display within that view from our CMS",
              inputMethod: "textfield",
              icon: "editor:title"
            }
          ],
          advanced: []
        },
        saveOptions: {
          wipeSlot: !0,
          unsetAttributes: [
            "loading",
            "views-data",
            "body-data",
            "views-end-point"
          ]
        }
      });
    },
    postProcessgetHaxJSONSchema: function postProcessgetHaxJSONSchema(schema) {
      schema.properties.__editThis = {
        type: "string",
        component: {
          name: "a",
          properties: {
            id: "cmstokenidtolockonto",
            href: "",
            target: "_blank"
          },
          slot: "Edit this view"
        }
      };
      return schema;
    }
  });
});
