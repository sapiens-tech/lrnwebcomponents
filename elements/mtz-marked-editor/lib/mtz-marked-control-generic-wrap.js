import "@polymer/polymer/polymer.js";
import "@polymer/iron-a11y-keys/iron-a11y-keys.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "./mtz-marked-control-wrapper-behavior.js";
import { Polymer } from "@polymer/polymer/lib/legacy/polymer-fn.js";
Polymer({
  _template: `
    <style>
      :host {
        display: inline-block;
      }
    </style>

    <paper-icon-button icon="[[icon]]" noink="[[noink]]" on-click="_handleCommand" alt="[[title]]"></paper-icon-button>

    <iron-a11y-keys keys="[[keys]]" on-keys-pressed="_handleCommand" target="[[__editor]]"></iron-a11y-keys>
`,

  is: "mtz-marked-control-generic-wrap",

  behaviors: [mtz.MarkedControlWrapperBehavior],

  properties: {
    title: String,
    icon: String,
    keys: String,
    noink: Boolean // Pass-through
  }
});
