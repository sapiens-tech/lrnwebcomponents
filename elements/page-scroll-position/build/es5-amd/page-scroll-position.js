var PageScrollPosition = (function(_HTMLElement) {
  "use strict";
  babelHelpers.inherits(PageScrollPosition, _HTMLElement);
  function PageScrollPosition() {
    babelHelpers.classCallCheck(this, PageScrollPosition);
    return babelHelpers.possibleConstructorReturn(
      this,
      babelHelpers.getPrototypeOf(PageScrollPosition).apply(this, arguments)
    );
  }
  babelHelpers.createClass(PageScrollPosition, [
    {
      key: "attachedCallback",
      value: function attachedCallback() {
        var _this = this;
        this.value = 0;
        var element = document,
          valueChangedEvent = new CustomEvent("value-changed", {
            detail: { value: 0 }
          });
        this.dispatchEvent(valueChangedEvent);
        element.addEventListener("scroll", function() {
          var a = document.documentElement.scrollTop,
            b =
              document.documentElement.scrollHeight -
              document.documentElement.clientHeight,
            c = 100 * (a / b);
          _this.value = c;
          valueChangedEvent = new CustomEvent("value-changed", {
            detail: { value: _this.value }
          });
          _this.dispatchEvent(valueChangedEvent);
        });
      }
    }
  ]);
  return PageScrollPosition;
})(babelHelpers.wrapNativeSuper(HTMLElement));
window.customElements.define("page-scroll-position", PageScrollPosition);
