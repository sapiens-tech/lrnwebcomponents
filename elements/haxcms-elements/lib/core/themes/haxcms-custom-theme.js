/**
 * Copyright 2019 The Pennsylvania State University
 * @license Apache-2.0, see License.md for full text.
 */
import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import { microTask } from "@polymer/polymer/lib/utils/async.js";
import { updateStyles } from "@polymer/polymer/lib/mixins/element-mixin";
import { HAXCMSTheme } from "@lrnwebcomponents/haxcms-elements/lib/core/HAXCMSThemeWiring.js";
// @todo load the elements this theme needs dynamically
// we reference this but pull nothing in to get the dependency tree loaded in full
import "@lrnwebcomponents/haxcms-elements/lib/ui-components/templates/basic-template.js";
import "@lrnwebcomponents/simple-colors/simple-colors.js";
/**
 * `haxcms-custom-theme`
 * `This is a custom theme. Don't edit this file, edit yoursite/theme/theme.css and yoursite/theme/theme.html`
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class HAXCMSCustomTheme extends HAXCMSTheme(PolymerElement) {
  ready() {
    this.__counter = 0;
    super.ready();
    this.getCSS();
    this.getHTML();
  }
  /**
   * Get css
   */
  async getCSS() {
    return await fetch("theme/theme.css")
      .then(response => {
        return response.text();
      })
      .then(response => {
        const evt = new CustomEvent("haxcms-custom-theme-template-ready", {
          bubbles: true,
          cancelable: false,
          detail: {
            css: response
          }
        });
        this.dispatchEvent(evt);

        return response;
      });
  }
  /**
   * Get css
   */
  async getHTML() {
    return await fetch("theme/theme.html")
      .then(response => {
        return response.text();
      })
      .then(response => {
        const evt = new CustomEvent("haxcms-custom-theme-template-ready", {
          bubbles: true,
          cancelable: false,
          detail: {
            html: response
          }
        });
        this.dispatchEvent(evt);
        return response;
      });
  }
  constructor() {
    super();
    window.addEventListener(
      "haxcms-custom-theme-template-ready",
      this.templateReady.bind(this)
    );
  }
  connectedCallback() {
    super.connectedCallback();
  }
  // render function
  static get template() {
    return html`
      <slot></slot>
    `;
  }
  templateReady(e) {
    this.__counter++;
    if (e.detail.css) {
      this._css = e.detail.css;
    }
    if (e.detail.html) {
      this._html = e.detail.html;
    }
    if (this.__counter === 2) {
      let t = document.createElement("template");
      t.innerHTML = `
      <style include="simple-colors">
        /**
         * Hide the slotted content during edit mode. This must be here to work.
         */
        :host([edit-mode]) #slot {
          display: none;
        }
        ${this._css}
      </style>
      ${this._html}`;
      this.__instance = this._stampTemplate(t);
      while (this.shadowRoot.firstChild) {
        this.shadowRoot.removeChild(this.shadowRoot.firstChild);
      }
      this.shadowRoot.appendChild(this.__instance);
      microTask.run(() => {
        setTimeout(() => {
          this.updateStyles();
          updateStyles();
        }, 50);
      });
    }
  }
}
window.customElements.define("haxcms-custom-theme", HAXCMSCustomTheme);
export { HAXCMSCustomTheme };
