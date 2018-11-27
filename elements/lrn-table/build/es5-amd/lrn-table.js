define([
  "./node_modules/@polymer/polymer/polymer-legacy.js",
  "./node_modules/@lrnwebcomponents/csv-render/csv-render.js",
  "./node_modules/@lrnwebcomponents/hax-body-behaviors/lib/HAXWiring.js",
  "./node_modules/@lrnwebcomponents/schema-behaviors/schema-behaviors.js"
], function(_polymerLegacy, _csvRender, _HAXWiring, _schemaBehaviors) {
  "use strict";
  function _templateObject_1b594f10f1e611e8a1c981da2c4a55d2() {
    var data = babelHelpers.taggedTemplateLiteral([
      '\n    <style>\n      :host {\n        display: block;\n      }\n      .hidden-title {\n        display: none;\n      }\n    </style>\n    <div typeof="oer:SupportingMaterial">\n      <div class="hidden-title" property="oer:name">[[title]]</div>\n      <div property="oer:description">\n        <slot></slot>\n        <csv-render data-source="[[csvFile]]" caption="[[title]]" summary="[[description]]"></csv-render>\n      </div>\n    </div>\n'
    ]);
    _templateObject_1b594f10f1e611e8a1c981da2c4a55d2 = function _templateObject_1b594f10f1e611e8a1c981da2c4a55d2() {
      return data;
    };
    return data;
  }
  (0, _polymerLegacy.Polymer)({
    _template: (0, _polymerLegacy.html)(
      _templateObject_1b594f10f1e611e8a1c981da2c4a55d2()
    ),
    is: "lrn-table",
    behaviors: [HAXBehaviors.PropertiesBehaviors, SchemaBehaviors.Schema],
    properties: {
      title: { type: String },
      csvFile: { type: String },
      description: { type: String }
    },
    attached: function attached() {
      var props = {
        canScale: !0,
        canPosition: !0,
        canEditSource: !1,
        gizmo: {
          title: "CSV table",
          description:
            "This can generate a table from a CSV file no matter where it is located.",
          icon: "editor:border-all",
          color: "green",
          groups: ["Presentation", "Table", "Data"],
          handles: [{ type: "csv", source: "csvFile" }],
          meta: { author: "LRNWebComponents" }
        },
        settings: {
          quick: [
            {
              property: "csvFile",
              title: "Source",
              description: "The URL for this csv file.",
              inputMethod: "textfield",
              icon: "link",
              required: !0
            },
            {
              property: "title",
              title: "Title",
              description: "Title for the table to be generated.",
              inputMethod: "textfield",
              icon: "editor:title"
            },
            {
              property: "description",
              title: "Description",
              description:
                "More detailed description for improved accessibility of the table data.",
              inputMethod: "textfield",
              icon: "editor:short-text"
            }
          ],
          configure: [
            {
              property: "csvFile",
              title: "Source",
              description: "The URL for this csv file.",
              inputMethod: "textfield",
              required: !0
            },
            {
              property: "title",
              title: "Title",
              description: "Title for the table to be generated.",
              inputMethod: "textfield"
            },
            {
              property: "description",
              title: "Description",
              description:
                "More detailed description for improved accessibility of the table data.",
              inputMethod: "textfield"
            }
          ],
          advanced: []
        }
      };
      this.setHaxProperties(props);
    }
  });
});
