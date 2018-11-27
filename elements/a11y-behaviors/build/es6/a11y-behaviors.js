window.A11yBehaviors = window.A11yBehaviors || {};
window.A11yBehaviors.A11y = {
  getTextContrastColor: function(bgColor) {
    let color = "";
    const colorBuffer = bgColor.replace("#", ""),
      rgb = parseInt(colorBuffer, 16),
      r = 255 & (rgb >> 16),
      g = 255 & (rgb >> 8),
      b = 255 & (rgb >> 0),
      luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    if (141 > luma) {
      color = "#ffffff";
    } else {
      color = "#000000";
    }
    return color;
  },
  computeTextPropContrast: function(textprop, bgprop) {
    if (this[bgprop].includes("#")) {
      const color = this.getTextContrastColor(this[bgprop]);
      this.set(textprop, color);
    }
  }
};
