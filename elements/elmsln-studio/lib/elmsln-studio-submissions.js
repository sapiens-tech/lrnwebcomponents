/**
 * Copyright 2020 The Pennsylvania State University
 * @license Apache-2.0, see License.md for full text.
 */
import { LitElement, html, css } from "lit-element/lit-element.js";
import { ElmslnStudioStyles } from "./elmsln-studio-styles.js";
import { ElmslnStudioUtilities } from "./elmsln-studio-utilities.js";
import "@polymer/iron-icons/communication-icons.js";
import "./elmsln-studio-submission-card.js";
import "@lrnwebcomponents/simple-fields/lib/simple-fields-field.js";

/**
 * `elmsln-studio-submissions`
 * Studio App for ELMS:LN
 *
 * @customElement elmsln-studio-submissions
 * @lit-html
 * @lit-element
 * @demo demo/submission.html
 */
class ElmslnStudioSubmissions extends ElmslnStudioUtilities(
  ElmslnStudioStyles(LitElement)
) {
  /**
   * Store the tag name to make it easier to obtain directly.
   * @notice function name must be here for tooling to operate correctly
   */
  static get tag() {
    return "elmsln-studio-submissions";
  }

  static get styles() {
    return [
      ...super.styles,
      css`
        :host {
          flex-wrap: wrap;
        }
        .filters {
          flex: 1 0 100%;
        }
        #layout {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
        }
        #layout > button {
          background-color: transparent;
          opacity: 0.25;
          transform: opacity 0.5s ease-in-out;
          height: calc(2 * var(--elmsln-studio-FontSize, 16px));
          width: calc(2 * var(--elmsln-studio-FontSize, 16px));
          flex: 1 0 auto;
          border: 1px solid #ddd;
          margin: 0;
          padding: 0;
        }
        #layout button:focus,
        #layout button:hover {
          opacity: 0.75;
        }
        #layout button[aria-pressed="true"] {
          opacity: 1;
        }
        #cards {
          margin: var(--elmsln-studio-margin, 20px)
            calc(-0.5 * var(--elmsln-studio-margin, 20px));
          display: flex;
          align-items: stretch;
          justify-content: flex-start;
          flex-wrap: wrap;
        }
        .no-submissions {
          font-weight: var(--elmsln-studio-FontWeightLight, 300);
          font-size: 22px;
          margin: calc(0.5 * var(--elmsln-studio-margin, 20px));
          padding: var(--elmsln-studio-margin, 20px);
          width: calc(100% - 2 * var(--elmsln-studio-margin, 20px));
          background-color: #e8e8e8;
          text-align: center;
        }
        elmsln-studio-submission-card {
          margin: calc(0.5 * var(--elmsln-studio-margin, 20px))
            calc(0.5 * var(--elmsln-studio-margin, 20px));
          flex: 0 0 calc(100% - var(--elmsln-studio-margin, 20px));
        }
        .feature {
          margin-top: var(--elmsln-studio-margin, 20px);
          height: calc(
            var(--accent-card-image-height, 200px) -
              var(--elmsln-studio-margin, 20px)
          );
          overflow: auto;
        }
        #secondary {
          margin-top: 0;
          --nav-card-linklist-margin-top: 0;
          --nav-card-linklist-left-size: 36px;
          --paper-avatar-width: var(--nav-card-linklist-left-size, 36px);
        }
        #secondary .filters {
          justify-content: flex-start;
        }
        .comments {
          color: #95989a;
        }
        nav-card {
          margin: calc(1.5 * var(--elmsln-studio-margin, 20px)) 0 0;
          --accent-card-footer-padding-left: 0;
          --accent-card-footer-padding-right: 0;
        }
        elmsln-studio-submission-card {
          position: relative;
          cursor: pointer;
        }
        elmsln-studio-submission-card
          > elmsln-studio-link:not([slot="assigmment"]) {
          z-index: 2;
          position: relative;
        }
        elmsln-studio-link[slot="assigmment"]:focus-within {
          text-decoration: underline;
        }
        elmsln-studio-link[slot="assigmment"]::after {
          content: " ";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          right: 0;
        }

        @media screen and (min-width: 500px) {
          elmsln-studio-submission-card {
            --accent-card-image-width: 50%;
          }
          .grid elmsln-studio-submission-card:not([horizontal]) {
            flex: 0 0 calc(50% - var(--elmsln-studio-margin, 20px));
          }
        }
        @media screen and (min-width: 900px) {
          :host {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
          }
          .grid elmsln-studio-submission-card:not([horizontal]) {
            flex: 0 0 calc(50% - var(--elmsln-studio-margin, 20px));
          }
          .filters > *,
          #layout > * {
            flex: 0 1 auto;
            margin: 0 calc(0.5 * var(--elmsln-studio-margin, 20px));
          }
          #layout > button {
            padding: 1px 6px;
            margin: 0 5px;
            border: 0px solid rgba(0, 0, 0, 0);
          }
        }
        @media screen and (min-width: 1200px) {
          .grid elmsln-studio-submission-card[horizontal] {
            flex: 0 0 calc(66.66666667% - var(--elmsln-studio-margin, 20px));
          }
          .grid elmsln-studio-submission-card:not([horizontal]) {
            flex: 0 0 calc(33.3333333333% - var(--elmsln-studio-margin, 20px));
          }
        }
        @media screen and (min-width: 1600px) {
          elmsln-studio-submission-card[horizontal] {
            --accent-card-image-width: 33.33333%;
            flex: 0 0 calc(75% - var(--elmsln-studio-margin, 20px));
          }
          elmsln-studio-submission-card:not([horizontal]) {
            flex: 0 0 calc(25% - var(--elmsln-studio-margin, 20px));
          }
          elmsln-studio-submission-card {
            --accent-card-image-width: 50%;
          }
        }
      `,
    ];
  }
  // render function
  render() {
    return html`
      <h1 class="sr-only">Submissions</h1>
      <div class="filters">
        <simple-fields-field
          inline
          label="Project:"
          .options="${this.projectOptions}"
          value="${this.projectFilter || ""}"
          @value-changed="${(e) => (this.projectFilter = e.detail.value)}"
        >
        </simple-fields-field>
        <simple-fields-field
          inline
          label="Assignment:"
          .options="${this.assignmentOptions}"
          value="${this.assignmentFilter || ""}"
          @value-changed="${(e) => (this.assignmentFilter = e.detail.value)}"
        >
        </simple-fields-field>
        <simple-fields-field
          inline
          label="Student:"
          .options="${this.studentOptions}"
          value="${this.studentFilter || ""}"
          @value-changed="${(e) => (this.studentFilter = e.detail.value)}"
        >
        </simple-fields-field>
        <div id="layout">
          <button
            aria-pressed="${this.list ? "true" : "false"}"
            @click="${(e) => (this.list = true)}"
          >
            <simple-icon icon="icons:view-list"></simple-icon>
            <span class="sr-only">display as list</span>
          </button>
          <button
            aria-pressed="${this.list ? "false" : "true"}"
            @click="${(e) => (this.list = false)}"
          >
            <simple-icon icon="icons:view-module"></simple-icon>
            <span class="sr-only">display as grid</span>
          </button>
        </div>
      </div>
      <div id="primary">
        ${!this.submissions
          ? this.loading("grey")
          : html`
              <div id="cards" class="${this.list ? "list" : "grid"}">
                <div
                  class="no-submissions"
                  ?hidden="${this.filteredSubmissions.length > 0}"
                >
                  No submissions for applied filters.
                </div>
                ${this.filteredSubmissions.map(
                  (s, i) => html`
                    <elmsln-studio-submission-card
                      id="accent-${i}"
                      href="${this.getActivityLink(s, true)}"
                      class="card submission-card"
                      image-src="${this.getCoverImage(s)}"
                      .image-alt="${s.imageAlt || undefined}"
                      ?horizontal="${s.feature || this.list ? true : false}"
                      .image-align="${this._getAlign(
                        s.imageGravity || undefined
                      )}"
                      .image-valign="${this._getValign(
                        s.imageGravity || undefined
                      )}"
                      .gravity="${s.imageGravity || undefined}"
                      no-border
                    >
                      <elmsln-studio-link
                        id="assignment-${s.id}"
                        slot="assigmment"
                        href="${this.getActivityLink(s, true)}"
                      >
                        ${s.assignment}
                      </elmsln-studio-link>
                      <elmsln-studio-link
                        id="student-${s.id}"
                        slot="student"
                        href="/submissions${!s.userId
                          ? ""
                          : `?student=${s.userId}`}"
                      >
                        ${[s.firstName, s.lastName].join(" ")}
                      </elmsln-studio-link>
                      <local-time
                        slot="datetime"
                        id="date-${s.id}"
                        datetime="${s.date}"
                        month="long"
                        day="numeric"
                        year="${this.list ? "numeric" : undefined}"
                      >
                        ${this.dateFormat(s.date, "short")}
                      </local-time>
                      <div slot="project" id="project-${s.id}">
                        ${s.project}
                      </div>
                      <div
                        slot="feature"
                        class="feature"
                        ?hidden="${!s.feature}"
                      >
                        ${s.feature}
                      </div>
                      <elmsln-studio-link
                        slot="feedback"
                        href="${this.getActivityLink(s)}"
                      >
                        Feedback
                        <span class="sr-only">(${s.feedback.length})</span>
                        <iron-icon
                          icon="${this.getFeedbackIcon(s.feedback.length)}"
                        ></iron-icon>
                      </elmsln-studio-link>
                    </elmsln-studio-submission-card>
                  `
                )}
              </div>
            `}
      </div>
      <div id="secondary">
        <nav-card flat no-border class="card">
          <span slot="heading">
            ${this.isFiltered ? "Related Comments" : "Recent Comments"}
          </span>
          ${!this.comments
            ? this.loading("grey", "body")
            : html`
                <div slot="body" ?hidden="${this.filteredComments.length > 0}">
                  ${this.isFiltered
                    ? "No comments for applied filters."
                    : "No comments."}
                </div>
                <div slot="linklist">
                  ${(this.filteredComments || [])
                    .slice(0, this.commentLoad)
                    .map(
                      (f) => html`
                        <nav-card-item
                          accent-color="${this.accentColor(this.fullName(f))}"
                          .avatar="${f.avatar}"
                          initials="${this.fullName(f)}"
                        >
                          <elmsln-studio-link
                            id="comment-${f.id}"
                            aria-describedby="comment-${f.id}-desc"
                            slot="label"
                            href="${this.getActivityLink(f)}"
                          >
                            ${this.getActivityTitle(f)}
                          </elmsln-studio-link>

                          <relative-time
                            id="comment-${f.id}"
                            slot="description"
                            datetime="${f.date}"
                          >
                            ${this.dateFormat(f.date, "long")}
                          </relative-time>
                        </nav-card-item>
                      `
                    )}
                </div>
                <button
                  class="load-more"
                  slot="footer"
                  ?disabled="${this.commentLoad >=
                  this.filteredComments.length}"
                  ?hidden="${this.commentLoad >= this.filteredComments.length}"
                  @click="${(e) => (this.commentLoad += 10)}"
                >
                  Load More ${this.commentLoad} /
                  ${this.filteredComments.length}
                </button>
              `}
        </nav-card>
      </div>
    `;
  }

  // properties available to the custom element for data binding
  static get properties() {
    return {
      ...super.properties,
      assignmentFilter: {
        type: String,
        attribute: "assignment-filter",
      },
      comments: {
        type: Array,
      },
      commentLoad: {
        type: Number,
        attribute: "comment-load",
      },
      list: {
        type: Boolean,
        attribute: "list",
      },
      projectFilter: {
        type: String,
        attribute: "project-filter",
      },
      studentFilter: {
        type: String,
        attribute: "student-filter",
      },
      submissions: {
        type: Array,
      },
    };
  }

  // life cycle
  constructor() {
    super();
    this.list = false;
    this.commentLoad = 15;
    this.tag = ElmslnStudioSubmissions.tag;
  }
  firstUpdated(changedProperties) {
    if (super.firstUpdated) super.firstUpdated(changedProperties);
    this.fetchData("submissions");
    this.fetchData("discussion");
  }
  updated(changedProperties) {
    if (super.updated) super.updated(changedProperties);
    changedProperties.forEach((oldValue, propName) => {
      if (
        [
          "comments",
          "assignmentFilter",
          "studentFilter",
          "projectFilter",
        ].includes(propName)
      )
        this.commentLoad = 15;
    });
  }
  get filteredComments() {
    return (this.comments || []).filter(
      (i) =>
        this._isFilteredStudent(i.creatorId) &&
        this._isFilteredAssignment(i.assignmentId) &&
        this._isFilteredProject(i.projectId)
    );
  }
  getCoverImage(submission) {
    let fileicons = "/components/@lrnwebcomponents/elmsln-studio/lib/fileicons",
      icons = [
        "ai",
        "css",
        "csv",
        "doc",
        "eps",
        "html",
        "js",
        "pdf",
        "ppt",
        "rtf",
        "url",
        "xls",
      ],
      images = ["png", "jpg", "jpeg", "gif", "svg"],
      assets = [...(submission.sources || []), ...(submission.links || [])],
      img = assets.filter((asset) => images.includes(asset.type || "file")),
      files = assets.filter((asset) => icons.includes(asset.type || "file")),
      cover = `${fileicons}/file.svg`;

    if (img && img[0]) {
      cover = img[0].src;
    } else if (files && files[0]) {
      cover = `${fileicons}/${files[0].type}.svg`;
    }
    return cover;
  }
  get isFiltered() {
    return (
      this.assignmentFilter !== "" ||
      this.studentFilter !== "" ||
      this.projectFilter !== ""
    );
  }
  get studentOptions() {
    let options = { "": "All" };
    (this.submissions || []).forEach(
      (i) => (options[i.userId] = this.fullName(i))
    );
    return options;
  }
  get assignmentOptions() {
    let options = { "": "All" };
    (this.submissions || [])
      .filter((i) => this._isFilteredProject(i.projectId))
      .forEach((i) => (options[i.assignmentId] = i.assignment));
    return options;
  }
  get projectOptions() {
    let options = { "": "All" };
    (this.submissions || [])
      .filter((i) => i.project)
      .forEach((i) => (options[i.projectId] = i.project));
    return options;
  }
  get filteredSubmissions() {
    return (this.submissions || []).filter((i) => {
      return (
        this._isFilteredStudent(i.userId) &&
        this._isFilteredAssignment(i.assignmentId) &&
        this._isFilteredProject(i.projectId)
      );
    });
  }
  get modalTitle() {
    let assign = [
        this.projectOptions[this.projectFilter],
        this.assignmentOptions[this.assignmentFilter],
      ]
        .filter((i) => !!i && i !== "All")
        .join(":"),
      title = [assign, this.studentOptions[this.studentFilter]]
        .filter((i) => !!i && i !== "All" && i !== "")
        .join(" by ");
    return title && title != "" ? title : "All Submissions";
  }

  loadMoreComments(e) {
    this.commentLoad += 10;
  }
  _isFilteredAssignment(assignment = "") {
    return this.assignmentFilter === "" || assignment === this.assignmentFilter;
  }
  _isFilteredProject(project = "") {
    return this.projectFilter === "" || project === this.projectFilter;
  }
  _isFilteredStudent(student = "") {
    return this.studentFilter === "" || student === this.studentFilter;
  }
}
customElements.define("elmsln-studio-submissions", ElmslnStudioSubmissions);
export { ElmslnStudioSubmissions };
