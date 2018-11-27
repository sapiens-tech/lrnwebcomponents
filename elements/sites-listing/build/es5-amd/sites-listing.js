define([
  "./node_modules/@polymer/polymer/polymer-legacy.js",
  "./node_modules/@polymer/polymer/lib/legacy/polymer.dom.js",
  "./node_modules/@polymer/iron-ajax/iron-ajax.js",
  "./node_modules/@polymer/iron-list/iron-list.js",
  "./node_modules/@polymer/paper-button/paper-button.js",
  "./node_modules/@lrnwebcomponents/elmsln-loading/elmsln-loading.js",
  "./lib/site-card.js"
], function(
  _polymerLegacy,
  _polymerDom,
  _ironAjax,
  _ironList,
  _paperButton,
  _elmslnLoading,
  _siteCard
) {
  "use strict";
  function _templateObject_4c0c80a0f1e611e8b295e1b3bb30c303() {
    var data = babelHelpers.taggedTemplateLiteral(
      [
        '\n    <style>\n      :host {\n        height: 100vh;\n        display: flex;\n        flex-direction: column;\n      }\n      iron-list {\n        flex: 1 1 auto;\n      }\n      #loading {\n        width:100%;\n        z-index: 1000;\n        opacity: .8;\n        padding: 16px;\n        text-align: center;\n        align-content: center;\n        justify-content: center;\n        height: 100vh;\n        position: absolute;\n        background-color: rgba(250, 250, 250, .8);\n        transition: all linear .8s;\n        visibility: visible;\n      }\n      #loading div {\n        font-size: 32px;\n        font-weight: bold;\n        padding: 16px;\n      }\n      #loading[data-loading] {\n        background-color: rgba(0, 0, 0, 0);\n        opacity: 0;\n        visibility: hidden;\n      }\n      site-card {\n        padding: 16px;\n      }\n      paper-button.site-card-wrapper {\n        margin: 0;\n        padding: 0;\n      }\n    </style>\n    <iron-ajax auto="" loading="{{__loading}}" url="[[dataSource]]" handle-as="json" debounce-duration="250" last-response="{{sites}}"></iron-ajax>\n    <div id="loading" data-loading$="[[!__loading]]">\n      <elmsln-loading></elmsln-loading>\n      <div>Loading..</div>\n    </div>\n    <iron-list id="list" items="[[sites]]" as="site" grid="">\n      <template>\n        <paper-button on-focusin="_mouseEnter" on-focusout="_mouseLeave" data-site-id$="[[site.id]]" class="site-card-wrapper" on-tap="_siteClicked">\n          <site-card data-site-id$="[[site.id]]" size="[[size]]" image="[[site.image]]" icon="[[site.icon]]" name="[[site.name]]" title="[[site.title]]" elevation="2"></site-card>\n        </paper-button>\n      </template>\n    </iron-list>\n'
      ],
      [
        '\n    <style>\n      :host {\n        height: 100vh;\n        display: flex;\n        flex-direction: column;\n      }\n      iron-list {\n        flex: 1 1 auto;\n      }\n      #loading {\n        width:100%;\n        z-index: 1000;\n        opacity: .8;\n        padding: 16px;\n        text-align: center;\n        align-content: center;\n        justify-content: center;\n        height: 100vh;\n        position: absolute;\n        background-color: rgba(250, 250, 250, .8);\n        transition: all linear .8s;\n        visibility: visible;\n      }\n      #loading div {\n        font-size: 32px;\n        font-weight: bold;\n        padding: 16px;\n      }\n      #loading[data-loading] {\n        background-color: rgba(0, 0, 0, 0);\n        opacity: 0;\n        visibility: hidden;\n      }\n      site-card {\n        padding: 16px;\n      }\n      paper-button.site-card-wrapper {\n        margin: 0;\n        padding: 0;\n      }\n    </style>\n    <iron-ajax auto="" loading="{{__loading}}" url="[[dataSource]]" handle-as="json" debounce-duration="250" last-response="{{sites}}"></iron-ajax>\n    <div id="loading" data-loading\\$="[[!__loading]]">\n      <elmsln-loading></elmsln-loading>\n      <div>Loading..</div>\n    </div>\n    <iron-list id="list" items="[[sites]]" as="site" grid="">\n      <template>\n        <paper-button on-focusin="_mouseEnter" on-focusout="_mouseLeave" data-site-id\\$="[[site.id]]" class="site-card-wrapper" on-tap="_siteClicked">\n          <site-card data-site-id\\$="[[site.id]]" size="[[size]]" image="[[site.image]]" icon="[[site.icon]]" name="[[site.name]]" title="[[site.title]]" elevation="2"></site-card>\n        </paper-button>\n      </template>\n    </iron-list>\n'
      ]
    );
    _templateObject_4c0c80a0f1e611e8b295e1b3bb30c303 = function _templateObject_4c0c80a0f1e611e8b295e1b3bb30c303() {
      return data;
    };
    return data;
  }
  (0, _polymerLegacy.Polymer)({
    _template: (0, _polymerLegacy.html)(
      _templateObject_4c0c80a0f1e611e8b295e1b3bb30c303()
    ),
    is: "sites-listing",
    properties: {
      sites: { type: Array },
      size: { type: String, value: "large" },
      dataSource: { type: String }
    },
    _siteClicked: function _siteClicked(e) {
      var normalizedEvent = (0, _polymerDom.dom)(e),
        local = normalizedEvent.localTarget,
        active = local.getAttribute("data-site-id"),
        findSite = this.sites.filter(function(site) {
          if (site.id !== active) {
            return !1;
          }
          return !0;
        });
      if (0 < findSite.length) {
        findSite = findSite.pop();
      }
      if (
        babelHelpers.typeof(findSite.location) !==
        ("undefined" === typeof void 0
          ? "undefined"
          : babelHelpers.typeof(void 0))
      ) {
        window.location.href = findSite.location;
      }
    },
    _mouseEnter: function _mouseEnter(e) {
      var card = (0, _polymerDom.dom)(e.target).querySelectorAll(
        "site-card"
      )[0];
      card.__oldElevation = card.elevation;
      if (5 < card.elevation + 2) {
        card.elevation = 5;
      } else {
        card.elevation += 2;
      }
    },
    _mouseLeave: function _mouseLeave(e) {
      var card = (0, _polymerDom.dom)(e.target).querySelectorAll(
        "site-card"
      )[0];
      card.elevation = card.__oldElevation;
    }
  });
});
