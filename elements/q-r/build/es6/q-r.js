import {
  html,
  Polymer
} from "./node_modules/@polymer/polymer/polymer-legacy.js";
import "./node_modules/@lrnwebcomponents/hax-body-behaviors/lib/HAXWiring.js";
import "./node_modules/webcomponent-qr-code/qr-code.js";
Polymer({
  _template: html`
    <style>
      :host {
        display: block;
      }
      #link {
        visibility: hidden;
        opacity: 0;
      }
    </style>
    <qr-code id="qr" data\$="[[data]]" modulesize\$="[[modulesize]]" margin\$="[[margin]]" format\$="[[format]]"></qr-code>
    <a href\$="[[data]]" id="link">[[title]]</a>
`,
  is: "q-r",
  behaviors: [HAXBehaviors.PropertiesBehaviors],
  properties: {
    data: { type: String },
    title: { type: String },
    modulesize: { type: Number, value: 4 },
    margin: { type: Number, value: 2 },
    format: { type: String, value: "png" }
  },
  attached: function() {
    this.setHaxProperties({
      canScale: !0,
      canPosition: !0,
      canEditSource: !1,
      gizmo: {
        title: "QR Code",
        description: "A code to scan from a smartphone.",
        icon: "hardware:developer-board",
        color: "grey",
        groups: ["QR"],
        handles: [
          { type: "video", source: "data", title: "title" },
          { type: "image", source: "data", title: "title" },
          { type: "link", source: "data", title: "title" }
        ],
        meta: { author: "LRNWebComponents" }
      },
      settings: {
        quick: [
          {
            property: "data",
            title: "QR data",
            description: "Source of the data for the QR code.",
            inputMethod: "textfield",
            icon: "hardware:developer-board"
          },
          {
            property: "title",
            title: "Alternate title",
            description:
              "An alternate title to go to the source of the QR code.",
            inputMethod: "textfield",
            icon: "editor:title"
          },
          {
            property: "modulesize",
            title: "Size",
            description: "Size of the QR code",
            inputMethod: "textfield",
            icon: "image:photo-size-select-small"
          },
          {
            property: "margin",
            title: "Margin",
            description: "Wrapper to the code.",
            inputMethod: "textfield",
            icon: "icons:settings-overscan"
          },
          {
            property: "format",
            title: "Output format",
            description: "Format to put it out.",
            inputMethod: "select",
            options: { png: "PNG", html: "HTML", svg: "SVG" },
            icon: "editor:bubble-chart"
          }
        ],
        configure: [
          {
            property: "data",
            title: "QR data",
            description: "Source of the data for the QR code.",
            inputMethod: "textfield",
            icon: "hardware:developer-board"
          },
          {
            property: "title",
            title: "Alternate title",
            description:
              "An alternate title to go to the source of the QR code.",
            inputMethod: "textfield",
            icon: "editor:title"
          },
          {
            property: "modulesize",
            title: "Size",
            description: "Size of the QR code",
            inputMethod: "number",
            icon: "image:photo-size-select-small"
          },
          {
            property: "margin",
            title: "Margin",
            description: "Wrapper to the code.",
            inputMethod: "number",
            icon: "icons:settings-overscan"
          },
          {
            property: "format",
            title: "Output format",
            description: "Format to put it out.",
            inputMethod: "select",
            options: { png: "PNG", html: "HTML", svg: "SVG" },
            icon: "editor:bubble-chart"
          }
        ],
        advanced: []
      }
    });
  }
});
