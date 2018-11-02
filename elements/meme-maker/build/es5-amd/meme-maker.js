define([
  "./node_modules/@polymer/polymer/polymer-legacy.js",
  "./node_modules/@lrnwebcomponents/hax-body-behaviors/lib/HAXWiring.js"
], function(_polymerLegacy) {
  "use strict";
  function _templateObject_316f7ef0dea911e8b948476c092a6838() {
    var data = babelHelpers.taggedTemplateLiteral([
      '\n    <style>\n      :host {\n        display: block;\n      }\n      * {\n        box-sizing: border-box;\n      }\n\n      figure {\n        position: relative;\n        width: 100%;\n        margin: 0;\n        padding: 0;\n\n        font-size: 20px;\n      }\n\n      img {\n        width: 100%;\n        height: auto;\n      }\n\n      .top-text,\n      .bottom-text {\n        position: absolute;\n        left: 0;\n        width: 100%;\n        padding: 3% 2%;\n\n        text-align: center;\n        text-transform: uppercase;\n        font-weight: 900;\n        font-family: "Impact", "Arial Black", "sans serif";\n        line-height: 1.2;\n\n        font-size: 36px;\n\n        color: white;\n        text-shadow:\n          -1px -1px 0 #000,\n          1px -1px 0 #000,\n          -1px 1px 0 #000,\n          1px 1px 0 #000;\n        letter-spacing: 2px;\n      }\n\n      .top-text { top: 0; }\n      .bottom-text { bottom: 0; }\n\n      @media (max-width: 600px) {\n\n        .top-text,\n        .bottom-text {\n          font-size: 20px;\n        }\n\n      }\n    </style>\n    <figure>\n      <img src="[[imageUrl]]" alt="[[alt]]">\n      <figcaption class="top-text">[[topText]]</figcaption>\n      <figcaption class="bottom-text">[[bottomText]]</figcaption>\n    </figure>\n'
    ]);
    _templateObject_316f7ef0dea911e8b948476c092a6838 = function() {
      return data;
    };
    return data;
  }
  (0, _polymerLegacy.Polymer)({
    _template: (0, _polymerLegacy.html)(
      _templateObject_316f7ef0dea911e8b948476c092a6838()
    ),
    is: "meme-maker",
    behaviors: [HAXBehaviors.PropertiesBehaviors],
    properties: {
      alt: { type: String },
      imageUrl: { type: String },
      topText: { type: String },
      bottomText: { type: String }
    },
    attached: function attached() {
      this.setHaxProperties({
        canScale: !0,
        canPosition: !0,
        canEditSource: !1,
        gizmo: {
          title: "Meme",
          description: "Make a meme out of an image",
          icon: "editor:title",
          color: "orange",
          groups: ["Content", "Text", "Meme", "Funny"],
          handles: [
            {
              type: "image",
              source: "imageUrl",
              title: "topText",
              author: "bottomText",
              alt: "alt"
            }
          ],
          meta: { author: "LRNWebComponents" }
        },
        settings: {
          quick: [
            {
              property: "topText",
              title: "Top text",
              description: "Top text of the meme.",
              inputMethod: "textfield",
              icon: "editor:title"
            },
            {
              property: "bottomText",
              title: "Bottom text",
              description: "The date this was accessed.",
              inputMethod: "textfield",
              icon: "editor:title"
            }
          ],
          configure: [
            {
              property: "imageUrl",
              title: "Source",
              description: "The source url for the element this is citing.",
              inputMethod: "textfield",
              icon: "link"
            },
            {
              property: "topText",
              title: "Top text",
              description: "Top text of the meme.",
              inputMethod: "textfield",
              icon: "editor:title"
            },
            {
              property: "bottomText",
              title: "Bottom text",
              description: "The date this was accessed.",
              inputMethod: "textfield",
              icon: "editor:title"
            }
          ],
          advanced: []
        }
      });
    }
  });
});
