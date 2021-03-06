import { LitElement, html, css } from "lit-element/lit-element.js";
import "@lrnwebcomponents/simple-tooltip/simple-tooltip.js";
import { A11yMenuButtonItemBehaviors } from "@lrnwebcomponents/a11y-menu-button/lib/a11y-menu-button-item.js";
/**
 * `hax-toolbar-menu`
 * `An icon / button that has support for multiple options via drop down.`
 *
 * @microcopy - the mental model for this element
 * - panel - the flyout from left or right side that has elements that can be placed
 * - button - an item that expresses what interaction you will have with the content.
 *
 * @element hax-toolbar-menu-item
 * @extends A11yMenuButtonItemBehaviors
 */
class HaxToolbarMenuItem extends A11yMenuButtonItemBehaviors(LitElement) {
  constructor() {
    super();
  }

  static get styles() {
    return [
      ...super.styles,
      css`
        :host {
          --simple-toolbar-button-min-width: 100% !important;
          --simple-toolbar-button-border-color: var(
            --hax-toolbar-button-bg,
            #fff
          ) !important;
          --simple-toolbar-button-hover-bg: var(
            --hax-toolbar-menu-button-hover-bg,
            #c4ecff
          );
          --simple-toolbar-button-border-radius: var(
            --hax-toolbar-menu-button-border-radius,
            0
          );
        }
        :host ::slotted([danger]) {
          --simple-toolbar-button-hover-bg: var(
            --hax-toolbar-button-danger-color,
            #882222
          );
          --simple-toolbar-button-hover-border-color: var(
            --hax-toolbar-button-danger-color,
            #882222
          );
          --simple-toolbar-button-hover-color: var(
            --hax-toolbar-button-bg,
            #fff
          );
          z-index: 1001;
        }
        ::slotted(*) {
          --simple-toolbar-button-justify: flex-start;
          --simple-toolbar-button-label-white-space: nowrap;
          --simple-toolbar-button-padding: 0 var(--hax-tray-margin, 4px);
        }
      `,
    ];
  }

  render() {
    return html`
      <li role="none">
        <slot></slot>
      </li>
    `;
  }
  /**
   * allows link or button to get focus
   *
   * @memberof A11yMenuButtonItem
   */
  focus() {
    if (this.querySelector("[role=menuitem]"))
      this.querySelector("[role=menuitem]").focus();
  }
  static get tag() {
    return "hax-toolbar-menu-item";
  }
}
window.customElements.define(HaxToolbarMenuItem.tag, HaxToolbarMenuItem);
export { HaxToolbarMenuItem };
