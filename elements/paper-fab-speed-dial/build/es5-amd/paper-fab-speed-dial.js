define([
  "./node_modules/@polymer/polymer/polymer-legacy.js",
  "./lib/paper-fab-speed-dial-overlay.js"
], function(_polymerLegacy, _paperFabSpeedDialOverlay) {
  "use strict";
  (0, _polymerLegacy.Polymer)({
    is: "paper-fab-speed-dial",
    properties: {
      icon: { type: String, value: "add" },
      opened: { type: Boolean, notify: !0 },
      disabled: { type: Boolean, value: !1 }
    },
    open: function open(e) {
      if (e) {
        e.preventDefault();
      }
      this.opened = !0;
    },
    close: function close(e) {
      if (e) {
        e.preventDefault();
      }
      this.opened = !1;
    }
  });
});
