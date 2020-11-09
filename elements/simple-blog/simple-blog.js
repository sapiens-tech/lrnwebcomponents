import { html, css } from "lit-element/lit-element.js";
import { HAXCMSLitElementTheme } from "@lrnwebcomponents/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { store } from "@lrnwebcomponents/haxcms-elements/lib/core/haxcms-site-store.js";
import { autorun, toJS } from "mobx";
import { SimpleColorsSuper } from "@lrnwebcomponents/simple-colors/simple-colors.js";
import "@lrnwebcomponents/simple-blog/lib/simple-blog-post.js";
import "@polymer/iron-pages/iron-pages.js";
import "@lrnwebcomponents/anchor-behaviors/anchor-behaviors.js";
import "@lrnwebcomponents/simple-icon/simple-icon.js";
import "@lrnwebcomponents/simple-icon/lib/simple-icons.js";
import "@lrnwebcomponents/simple-icon/lib/simple-icon-button.js";

/**
 * `simple-blog`
 * `A simple blog and associated elements`
 * @demo demo/index.html
 * @element simple-blog
 */
class SimpleBlog extends SimpleColorsSuper(HAXCMSLitElementTheme) {
  /**
   * LitElement constructable styles enhancement
   */
  static get styles() {
    return [
      ...super.styles,
      css`
        html,
        body {
          background-color: #fafafa;
        }
        :host {
          display: block;
          font-family: "Roboto", "Noto", sans-serif;
          -webkit-font-smoothing: antialiased;
          font-size: 14px;
          background-color: #fafafa;
          font-family: "Open Sans", "MundoSans", helvetica neue, Arial,
            Helvetica, sans-serif;
          margin: 0;
          padding: 0;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-font-feature-settings: "liga=1, dlig=1";
          -ms-font-feature-settings: "liga", "dlig";
          -webkit-font-feature-settings: "liga", "dlig";
          -o-font-feature-settings: "liga", "dlig";
          font-feature-settings: "liga", "dlig";
        }
        #backbutton {
          position: fixed;
          top: 0px;
          left: 0px;
          padding: 2px;
          width: 40px;
          height: 40px;
          margin: 8px;
          z-index: 1000;
          color: black;
          background-color: rgba(250, 250, 250, 0.5);
          opacity: 0.5;
          border-radius: 50%;
          transition: all 0.6s linear;
        }
        #backbutton:focus,
        #backbutton:hover {
          opacity: 1;
          color: white;
          background-color: var(--haxcms-color, black);
        }
        iron-pages,
        iron-pages section {
          width: 100vw;
          height: 100vh;
        }
        simple-blog-post {
          transition: all 0.6s ease-in-out;
          visibility: hidden;
        }
        :host([selected-page="0"]) simple-blog-post {
          opacity: 0;
          visibility: hidden;
        }
        :host([selected-page="1"]) simple-blog-post {
          visibility: visible;
          opacity: 1;
        }
        a,
        a:active,
        a:hover,
        a:focus {
          color: inherit;
        }
      `,
    ];
  }
  /**
   * Store the tag name to make it easier to obtain directly.
   * @notice function name must be here for tooling to operate correctly
   */
  static get tag() {
    return "simple-blog";
  }
  // render function
  render() {
    return html`
      <iron-pages .selected="${this.selectedPage}">
        <section>
          <simple-blog-header></simple-blog-header>
          <simple-blog-listing></simple-blog-listing>
        </section>
        <section>
          <simple-icon-button
            id="backbutton"
            icon="icons:arrow-back"
            @click="${this._goBack}"
          ></simple-icon-button>
          <simple-tooltip
            for="backbutton"
            position="right"
            offset="14"
            animation-delay="0"
            >Back to listing
          </simple-tooltip>
          <simple-blog-post ?edit-mode="${this.editMode}"
            ><slot></slot
          ></simple-blog-post>
          <simple-blog-footer id="footer"></simple-blog-footer>
        </section>
      </iron-pages>
    `;
  }
  /**
   * Mix in an opened status
   */
  static get properties() {
    return {
      ...super.properties,
      selectedPage: {
        type: Number,
        reflect: true,
        attribute: "selected-page",
      },
    };
  }
  constructor() {
    super();
    this.__disposer = [];
    this.selectedPage = 0;
    setTimeout(() => {
      import("@lrnwebcomponents/simple-blog/lib/simple-blog-header.js");
      import("@lrnwebcomponents/simple-blog/lib/simple-blog-footer.js");
      import("@lrnwebcomponents/simple-blog/lib/simple-blog-listing.js");
    }, 0);
  }
  /**
   * LitElement ready
   */
  firstUpdated(changedProperties) {
    if (super.firstUpdated) {
      super.firstUpdated(changedProperties);
    }
    // bc of async rendering and this being in a shadow of a shadow
    // we need to pause to ensure its painted
    setTimeout(() => {
      this.contentContainer = this.shadowRoot
        .querySelector("simple-blog-post")
        .shadowRoot.querySelector("#contentcontainer");
    }, 0);
  }
  /**
   * attached life cycle
   */
  connectedCallback() {
    super.connectedCallback();
    autorun((reaction) => {
      this.activeId = toJS(store.activeId);
      this.__disposer.push(reaction);
    });
    autorun((reaction) => {
      let location = toJS(store.location);
      this._locationChanged(location);
      this.__disposer.push(reaction);
    });
  }
  /**
   * detatched life cycle
   */
  disconnectedCallback() {
    // clean up state
    for (var i in this.__disposer) {
      this.__disposer[i].dispose();
    }
    super.disconnectedCallback();
  }
  /**
   * Listen for router location changes
   */
  _locationChanged(location) {
    if (!location || typeof location.route === "undefined") return;
    const name = location.route.name;
    if (name === "home" || name === "404") {
      this.selectedPage = 0;
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
      });
      this.selectedPage = 1;
      // @todo hacky timing thing
      setTimeout(() => {
        // try scrolling to the target ID after content gets imported
        window.AnchorBehaviors.getTarget(store.themeElement);
      }, 1000);
    }
    setTimeout(() => {
      var evt = document.createEvent("UIEvents");
      evt.initUIEvent("resize", true, false, window, 0);
      window.dispatchEvent(evt);
    }, 50);
  }
  /**
   * Reset the active item to reset state
   */
  _goBack(e) {
    const prevActiveItemId = store.activeId;
    window.history.pushState(null, null, store.location.baseUrl);
    window.dispatchEvent(new PopStateEvent("popstate"));
    // should help account for starting on a page where popstate isn't set
    // and also generate data model mirroring
    if (prevActiveItemId) {
      setTimeout(() => {
        let active = this.shadowRoot
          .querySelector("simple-blog-listing")
          .shadowRoot.querySelector(
            'simple-blog-overview[item-id="' + prevActiveItemId + '"]'
          );
        if (active) {
          active.scrollIntoView(true);
          active.focus();
        }
      }, 100);
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
      });
    }
    const evt = new CustomEvent("json-outline-schema-active-item-changed", {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {},
    });
    this.dispatchEvent(evt);
    this.selectedPage = 0;
  }
}
window.customElements.define(SimpleBlog.tag, SimpleBlog);
export { SimpleBlog };
