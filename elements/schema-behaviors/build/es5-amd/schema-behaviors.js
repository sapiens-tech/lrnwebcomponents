window.SchemaBehaviors = window.SchemaBehaviors || {};
window.SchemaBehaviors.Schema = {
  properties: {
    schemaResourceID: { type: String, value: "" },
    schemaMap: {
      type: Object,
      value: {
        prefix: {
          oer: "http://oerschema.org/",
          schema: "http://schema.org/",
          dc: "http://purl.org/dc/terms/",
          foaf: "http://xmlns.com/foaf/0.1/",
          cc: "http://creativecommons.org/ns#",
          bib: "http://bib.schema.org"
        }
      },
      observer: "_schemaMapChanged"
    }
  },
  generateResourceID: function generateResourceID() {
    function idPart() {
      return Math.floor(65536 * (1 + Math.random()))
        .toString(16)
        .substring(1);
    }
    return (
      "#" +
      idPart() +
      idPart() +
      "-" +
      idPart() +
      "-" +
      idPart() +
      "-" +
      idPart()
    );
  },
  _schemaMapChanged: function _schemaMapChanged(newValue, oldValue) {
    if (
      babelHelpers.typeof(newValue) !==
      ("undefined" === typeof void 0
        ? "undefined"
        : babelHelpers.typeof(void 0))
    ) {
      this.schemaResourceID = this.getAttribute("resource");
      if ("" == this.schemaResourceID || null == this.schemaResourceID) {
        this.schemaResourceID = this.generateResourceID();
        this.setAttribute("resource", this.schemaResourceID);
      }
      var prefixes = newValue.prefix,
        prefix = "";
      for (var property in prefixes) {
        if (prefixes.hasOwnProperty(property)) {
          prefix += property + ":" + prefixes[property] + " ";
        }
      }
      if ("" != prefix) {
        this.setAttribute("prefix", prefix);
      }
    }
  }
};
