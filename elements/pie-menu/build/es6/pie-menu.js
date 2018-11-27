import {
  html,
  Polymer
} from "./node_modules/@polymer/polymer/polymer-legacy.js";
import { dom } from "./node_modules/@polymer/polymer/lib/legacy/polymer.dom.js";
import "./node_modules/@polymer/iron-icons/iron-icons.js";
Polymer({
  _template: html`
    <style>
      :host, 
      :host > div {
        width: 200px;
        height: 200px;
      }
      :host > div {
        position: relative;
      }
      :host > div > * {
        position: absolute;
        top: 0;
        left: 0;
      }
      :host > div svg [role="button"] {
        fill: transparent;
      }
      :host > div svg [role="button"]:focus,
      :host > div svg [role="button"]:hover {
        stroke: #017ec2;
        cursor: pointer;
        outline: none;
      }
      :host > div svg .outer-shapes,
      :host > div svg .inner-shape {
        fill: #fff;
        stroke: #ddd;
      }
      :host > div svg .outer-shapes.focus,
      :host > div svg .outer-shapes.hover,
      :host > div svg .inner-shape.focus,
      :host > div svg .inner-shape.hover {
        fill: #cef4ff;
      }
      :host > div .icon-container {
        color: black;
      }
      :host > div .icon-container.focus,
      :host > div .icon-container.hover {
        color: #017ec2;
      }
      :host > div .icon-container {
        text-align: center;
        height: 24px;
        width: 50px;
        top: 85px;
        left: 75px;
      }
      :host > div[data-hide-label-text="true"] .icon-container {
        width: 24px;
        top: 88px;
        left: 88px;
      }
      :host > div .icon-label {
        font-size: 10px;
        text-transform: lowercase;
      }
      :host > div[data-hide-label-text="true"] .icon-label {
        display: none;
      }
      :host > div > #top-icon {
        top: 16px;
      }
      :host > div[data-hide-label-text="true"] > #top-icon {
        top: 22px;
      }
      :host > div > #right-icon {
        left: 140px;
      }
      :host > div[data-hide-label-text="true"] > #right-icon {
        left: 153px;
      }
      :host > div > #bottom-icon {
        top: 147px;
      }
      :host > div[data-hide-label-text="true"] > #bottom-icon {
        top: 153px;
      }
      :host > div > #left-icon {
        left: 9px;
      }
      :host > div[data-hide-label-text="true"] > #left-icon {
        left: 22px;
      }
    </style>
    <div data-hide-label-text\$="[[hideLabelText]]">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 193.95 193.94">
        <path id="right-shape" data-button="right" class="outer-shapes" d="M165.54 28.4a97 97 0 0 1 0 137.14l-46-46a31.86 31.86 0 0 0 0-45z"></path>
        <path id="bottom-shape" data-button="bottom" class="outer-shapes" d="M165.54 165.54a97 97 0 0 1-137.14 0l46.05-46a31.84 31.84 0 0 0 45 0z"></path>
        <path id="left-shape" data-button="left" class="outer-shapes" d="M28.4 165.54a97 97 0 0 1 0-137.14l46.05 46.05a31.84 31.84 0 0 0 0 45z"></path>
        <path id="top-shape" data-button="top" class="outer-shapes" d="M28.4 28.4a97 97 0 0 1 137.14 0l-46 46.05a31.84 31.84 0 0 0-45 0z"></path>
        <circle id="center-shape" data-button="center" class="inner-shape" cx="96.97" cy="96.97" r="31.67"></circle>
      </svg>
      <div id="center-icon" data-button="center" class="icon-container">
        <iron-icon icon\$="[[centerIcon]]"></iron-icon>
        <div class="icon-label" aria-hidden="true">[[centerLabel]]</div>
      </div>
      <div id="top-icon" data-button="top" class="icon-container">
        <iron-icon icon\$="[[topIcon]]"></iron-icon>
        <div class="icon-label" aria-hidden="true">[[topLabel]]</div>
      </div>
      <div id="right-icon" data-button="right" class="icon-container">
        <iron-icon icon\$="[[rightIcon]]"></iron-icon>
        <div class="icon-label" aria-hidden="true">[[rightLabel]]</div>
      </div>
      <div id="bottom-icon" data-button="bottom" class="icon-container">
        <iron-icon icon\$="[[bottomIcon]]"></iron-icon>
        <div class="icon-label" aria-hidden="true">[[bottomLabel]]</div>
      </div>
      <div id="left-icon" data-button="left" class="icon-container">
        <iron-icon icon\$="[[leftIcon]]"></iron-icon>
        <div class="icon-label" aria-hidden="true">[[leftLabel]]</div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 193.95 193.94">
        <circle id="center-button" xlink:title\$="[[centerLabel]]" data-button="center" tabindex="0" on-tap="_itemTapped" on-keydown="_itemTapped" role="button" cx="96.97" cy="96.97" r="31.67"></circle>
        <path id="top-button" xlink:title\$="[[topLabel]]" data-button="top" role="button" tabindex="0" on-tap="_itemTapped" on-keydown="_itemTapped" d="M28.4 28.4a97 97 0 0 1 137.14 0l-46 46.05a31.84 31.84 0 0 0-45 0z"></path>
        <path id="right-button" xlink:title\$="[[rightLabel]]" data-button="right" role="button" tabindex="0" on-tap="_itemTapped" on-keydown="_itemTapped" d="M165.54 28.4a97 97 0 0 1 0 137.14l-46-46a31.86 31.86 0 0 0 0-45z"></path>
        <path id="bottom-button" xlink:title\$="[[bottomLabel]]" data-button="bottom" role="button" tabindex="0" on-tap="_itemTapped" on-keydown="_itemTapped" d="M165.54 165.54a97 97 0 0 1-137.14 0l46.05-46a31.84 31.84 0 0 0 45 0z"></path>
        <path id="left-button" xlink:title\$="[[leftLabel]]" data-button="left" role="button" tabindex="0" on-tap="_itemTapped" on-keydown="_itemTapped" d="M28.4 165.54a97 97 0 0 1 0-137.14l46.05 46.05a31.84 31.84 0 0 0 0 45z"></path>
      </svg>
    </div>
`,
  is: "pie-menu",
  properties: {
    hideLabelText: { type: String, value: "false" },
    centerLabel: { type: String, value: "Home" },
    topLabel: { type: String, value: "Option 1" },
    leftLabel: { type: String, value: "Option 2" },
    bottomLabel: { type: String, value: "Option 3" },
    rightLabel: { type: String, value: "Option 4" },
    centerIcon: { type: String, value: "icons:check-box-outline-blank" },
    topIcon: { type: String, value: "icons:check-box-outline-blank" },
    leftIcon: { type: String, value: "icons:check-box-outline-blank" },
    bottomIcon: { type: String, value: "icons:check-box-outline-blank" },
    rightIcon: { type: String, value: "icons:check-box-outline-blank" }
  },
  ready: function() {
    for (
      var buttons = this.querySelectorAll('[role="button"][data-button]'),
        i = 0;
      i < buttons.length;
      i++
    ) {
      this._addListenerAddState(this, buttons[i], "mouseover", "hover");
      this._addListenerAddState(this, buttons[i], "focus", "focus");
      this._addListenerRemoveState(this, buttons[i], "mouseout", "hover");
      this._addListenerRemoveState(this, buttons[i], "blur", "focus");
    }
  },
  _addListenerAddState: function(menu, button, action, state) {
    button.addEventListener(action, e => {
      for (
        var elements = menu._getButtonElements(menu, button), i = 0;
        i < elements.length;
        i++
      ) {
        elements[i].classList.add(state);
      }
    });
  },
  _addListenerRemoveState: function(menu, button, action, state) {
    button.addEventListener(action, e => {
      for (
        var elements = menu._getButtonElements(menu, button), i = 0;
        i < elements.length;
        i++
      ) {
        elements[i].classList.remove(state);
      }
    });
  },
  _getButtonElements: function(menu, button) {
    return menu.querySelectorAll(
      '[data-button="' + button.getAttribute("data-button") + '"]'
    );
  },
  _itemTapped: function(e) {
    var normalizedEvent = dom(e),
      localLink = normalizedEvent.localTarget;
    if (
      !(
        localLink.hasAttribute("role") &&
        "button" !== localLink.getAttribute("role")
      )
    ) {
      localLink = localLink.parentNode;
    }
    this.fire("pie-menu-selection", { option: localLink });
  }
});
