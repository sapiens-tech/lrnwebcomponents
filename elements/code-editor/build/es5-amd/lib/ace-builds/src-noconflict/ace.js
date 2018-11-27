(function() {
  var ACE_NAMESPACE = "ace",
    global = (function() {
      return this;
    })();
  if (!global && "undefined" != typeof window) global = window;
  if (!ACE_NAMESPACE) return;
  var define = function define(module, deps, payload) {
    if ("string" !== typeof module) {
      if (define.original) define.original.apply(this, arguments);
      else {
        console.error("dropping module because define wasn't a string.");
        console.trace();
      }
      return;
    }
    if (2 == arguments.length) payload = deps;
    if (!define.modules[module]) {
      define.payloads[module] = payload;
      define.modules[module] = null;
    }
  };
  define.modules = {};
  define.payloads = {};
  var _require = function _require(parentId, module, callback) {
      if ("string" === typeof module) {
        var payload = lookup(parentId, module);
        if (payload != void 0) {
          callback && callback();
          return payload;
        }
      } else if ("[object Array]" === Object.prototype.toString.call(module)) {
        for (var params = [], i = 0, l = module.length, dep; i < l; ++i) {
          dep = lookup(parentId, module[i]);
          if (dep == void 0 && require.original) return;
          params.push(dep);
        }
        return (callback && callback.apply(null, params)) || !0;
      }
    },
    require = function require(module, callback) {
      var packagedModule = _require("", module, callback);
      if (packagedModule == void 0 && require.original)
        return require.original.apply(this, arguments);
      return packagedModule;
    },
    normalizeModule = function normalizeModule(parentId, moduleName) {
      if (-1 !== moduleName.indexOf("!")) {
        var chunks = moduleName.split("!");
        return (
          normalizeModule(parentId, chunks[0]) +
          "!" +
          normalizeModule(parentId, chunks[1])
        );
      }
      if ("." == moduleName.charAt(0)) {
        var base = parentId
          .split("/")
          .slice(0, -1)
          .join("/");
        moduleName = base + "/" + moduleName;
        while (-1 !== moduleName.indexOf(".") && previous != moduleName) {
          var previous = moduleName;
          moduleName = moduleName
            .replace(/\/\.\//, "/")
            .replace(/[^\/]+\/\.\.\//, "");
        }
      }
      return moduleName;
    },
    lookup = function lookup(parentId, moduleName) {
      moduleName = normalizeModule(parentId, moduleName);
      var module = define.modules[moduleName];
      if (!module) {
        module = define.payloads[moduleName];
        if ("function" === typeof module) {
          var exports = {},
            mod = { id: moduleName, uri: "", exports: exports, packaged: !0 },
            req = function req(module, callback) {
              return _require(moduleName, module, callback);
            },
            returnValue = module(req, exports, mod);
          exports = returnValue || mod.exports;
          define.modules[moduleName] = exports;
          delete define.payloads[moduleName];
        }
        module = define.modules[moduleName] = exports || module;
      }
      return module;
    };
  function exportAce(ns) {
    var root = global;
    if (ns) {
      if (!global[ns]) global[ns] = {};
      root = global[ns];
    }
    if (!root.define || !root.define.packaged) {
      define.original = root.define;
      root.define = define;
      root.define.packaged = !0;
    }
    if (!root.require || !root.require.packaged) {
      require.original = root.require;
      root.require = require;
      root.require.packaged = !0;
    }
  }
  exportAce(ACE_NAMESPACE);
})();
ace.define("ace/lib/regexp", ["require", "exports", "module"], function(
  require,
  exports,
  module
) {
  "use strict";
  var _Stringprototype = String.prototype,
    real = {
      exec: RegExp.prototype.exec,
      test: RegExp.prototype.test,
      match: _Stringprototype.match,
      replace: _Stringprototype.replace,
      split: _Stringprototype.split
    },
    compliantExecNpcg = void 0 === real.exec.call(/()??/, "")[1],
    compliantLastIndexIncrement = (function() {
      var x = /^/g;
      real.test.call(x, "");
      return !x.lastIndex;
    })();
  if (compliantLastIndexIncrement && compliantExecNpcg) return;
  RegExp.prototype.exec = function(str) {
    var match = real.exec.apply(this, arguments),
      name,
      r2;
    if ("string" == typeof str && match) {
      if (!compliantExecNpcg && 1 < match.length && -1 < indexOf(match, "")) {
        r2 = RegExp(
          this.source,
          real.replace.call(getNativeFlags(this), "g", "")
        );
        real.replace.call(str.slice(match.index), r2, function() {
          for (var i = 1; i < arguments.length - 2; i++) {
            if (arguments[i] === void 0) match[i] = void 0;
          }
        });
      }
      if (this._xregexp && this._xregexp.captureNames) {
        for (var i = 1; i < match.length; i++) {
          name = this._xregexp.captureNames[i - 1];
          if (name) match[name] = match[i];
        }
      }
      if (
        !compliantLastIndexIncrement &&
        this.global &&
        !match[0].length &&
        this.lastIndex > match.index
      )
        this.lastIndex--;
    }
    return match;
  };
  if (!compliantLastIndexIncrement) {
    RegExp.prototype.test = function(str) {
      var match = real.exec.call(this, str);
      if (
        match &&
        this.global &&
        !match[0].length &&
        this.lastIndex > match.index
      )
        this.lastIndex--;
      return !!match;
    };
  }
  function getNativeFlags(regex) {
    return (
      (regex.global ? "g" : "") +
      (regex.ignoreCase ? "i" : "") +
      (regex.multiline ? "m" : "") +
      (regex.extended ? "x" : "") +
      (regex.sticky ? "y" : "")
    );
  }
  function indexOf(array, item, from) {
    if (Array.prototype.indexOf) return array.indexOf(item, from);
    for (var i = from || 0; i < array.length; i++) {
      if (array[i] === item) return i;
    }
    return -1;
  }
});
ace.define("ace/lib/es5-shim", ["require", "exports", "module"], function(
  require,
  exports,
  module
) {
  var _Mathabs = Math.abs,
    _Mathmin = Math.min,
    _Mathmax = Math.max,
    _Stringprototype2 = String.prototype;
  function Empty() {}
  if (!Function.prototype.bind) {
    Function.prototype.bind = function bind(that) {
      var target = this;
      if ("function" != typeof target) {
        throw new TypeError(
          "Function.prototype.bind called on incompatible " + target
        );
      }
      var args = slice.call(arguments, 1),
        bound = function bound() {
          if (babelHelpers.instanceof(this, bound)) {
            var result = target.apply(this, args.concat(slice.call(arguments)));
            if (Object(result) === result) {
              return result;
            }
            return this;
          } else {
            return target.apply(that, args.concat(slice.call(arguments)));
          }
        };
      if (target.prototype) {
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
      }
      return bound;
    };
  }
  var call = Function.prototype.call,
    prototypeOfArray = Array.prototype,
    prototypeOfObject = Object.prototype,
    slice = prototypeOfArray.slice,
    _toString = call.bind(prototypeOfObject.toString),
    owns = call.bind(prototypeOfObject.hasOwnProperty),
    defineGetter,
    defineSetter,
    lookupGetter,
    lookupSetter,
    supportsAccessors;
  if ((supportsAccessors = owns(prototypeOfObject, "__defineGetter__"))) {
    defineGetter = call.bind(prototypeOfObject.__defineGetter__);
    defineSetter = call.bind(prototypeOfObject.__defineSetter__);
    lookupGetter = call.bind(prototypeOfObject.__lookupGetter__);
    lookupSetter = call.bind(prototypeOfObject.__lookupSetter__);
  }
  if (2 != [1, 2].splice(0).length) {
    if (
      (function() {
        function makeArray(l) {
          var a = Array(l + 2);
          a[0] = a[1] = 0;
          return a;
        }
        var array = [],
          lengthBefore;
        array.splice.apply(array, makeArray(20));
        array.splice.apply(array, makeArray(26));
        lengthBefore = array.length;
        array.splice(5, 0, "XXX");
        lengthBefore + 1 == array.length;
        if (lengthBefore + 1 == array.length) {
          return !0;
        }
      })()
    ) {
      var array_splice = Array.prototype.splice;
      Array.prototype.splice = function(start, deleteCount) {
        if (!arguments.length) {
          return [];
        } else {
          return array_splice.apply(
            this,
            [
              void 0 === start ? 0 : start,
              void 0 === deleteCount ? this.length - start : deleteCount
            ].concat(slice.call(arguments, 2))
          );
        }
      };
    } else {
      Array.prototype.splice = function(pos, removeCount) {
        var length = this.length;
        if (0 < pos) {
          if (pos > length) pos = length;
        } else if (void 0 == pos) {
          pos = 0;
        } else if (0 > pos) {
          pos = _Mathmax(length + pos, 0);
        }
        if (!(pos + removeCount < length)) removeCount = length - pos;
        var removed = this.slice(pos, pos + removeCount),
          insert = slice.call(arguments, 2),
          add = insert.length;
        if (pos === length) {
          if (add) {
            this.push.apply(this, insert);
          }
        } else {
          var remove = _Mathmin(removeCount, length - pos),
            tailOldPos = pos + remove,
            tailNewPos = tailOldPos + add - remove,
            tailCount = length - tailOldPos,
            lengthAfterRemove = length - remove;
          if (tailNewPos < tailOldPos) {
            for (var i = 0; i < tailCount; ++i) {
              this[tailNewPos + i] = this[tailOldPos + i];
            }
          } else if (tailNewPos > tailOldPos) {
            for (i = tailCount; i--; ) {
              this[tailNewPos + i] = this[tailOldPos + i];
            }
          }
          if (add && pos === lengthAfterRemove) {
            this.length = lengthAfterRemove;
            this.push.apply(this, insert);
          } else {
            this.length = lengthAfterRemove + add;
            for (i = 0; i < add; ++i) {
              this[pos + i] = insert[i];
            }
          }
        }
        return removed;
      };
    }
  }
  if (!Array.isArray) {
    Array.isArray = function isArray(obj) {
      return "[object Array]" == _toString(obj);
    };
  }
  var boxedString = Object("a"),
    splitString = "a" != boxedString[0] || !(0 in boxedString);
  if (!Array.prototype.forEach) {
    Array.prototype.forEach = function forEach(fun) {
      var object = toObject(this),
        self =
          splitString && "[object String]" == _toString(this)
            ? this.split("")
            : object,
        thisp = arguments[1],
        i = -1,
        length = self.length >>> 0;
      if ("[object Function]" != _toString(fun)) {
        throw new TypeError();
      }
      while (++i < length) {
        if (i in self) {
          fun.call(thisp, self[i], i, object);
        }
      }
    };
  }
  if (!Array.prototype.map) {
    Array.prototype.map = function map(fun) {
      var object = toObject(this),
        self =
          splitString && "[object String]" == _toString(this)
            ? this.split("")
            : object,
        length = self.length >>> 0,
        result = Array(length),
        thisp = arguments[1];
      if ("[object Function]" != _toString(fun)) {
        throw new TypeError(fun + " is not a function");
      }
      for (var i = 0; i < length; i++) {
        if (i in self) result[i] = fun.call(thisp, self[i], i, object);
      }
      return result;
    };
  }
  if (!Array.prototype.filter) {
    Array.prototype.filter = function filter(fun) {
      var object = toObject(this),
        self =
          splitString && "[object String]" == _toString(this)
            ? this.split("")
            : object,
        length = self.length >>> 0,
        result = [],
        value,
        thisp = arguments[1];
      if ("[object Function]" != _toString(fun)) {
        throw new TypeError(fun + " is not a function");
      }
      for (var i = 0; i < length; i++) {
        if (i in self) {
          value = self[i];
          if (fun.call(thisp, value, i, object)) {
            result.push(value);
          }
        }
      }
      return result;
    };
  }
  if (!Array.prototype.every) {
    Array.prototype.every = function every(fun) {
      var object = toObject(this),
        self =
          splitString && "[object String]" == _toString(this)
            ? this.split("")
            : object,
        length = self.length >>> 0,
        thisp = arguments[1];
      if ("[object Function]" != _toString(fun)) {
        throw new TypeError(fun + " is not a function");
      }
      for (var i = 0; i < length; i++) {
        if (i in self && !fun.call(thisp, self[i], i, object)) {
          return !1;
        }
      }
      return !0;
    };
  }
  if (!Array.prototype.some) {
    Array.prototype.some = function some(fun) {
      var object = toObject(this),
        self =
          splitString && "[object String]" == _toString(this)
            ? this.split("")
            : object,
        length = self.length >>> 0,
        thisp = arguments[1];
      if ("[object Function]" != _toString(fun)) {
        throw new TypeError(fun + " is not a function");
      }
      for (var i = 0; i < length; i++) {
        if (i in self && fun.call(thisp, self[i], i, object)) {
          return !0;
        }
      }
      return !1;
    };
  }
  if (!Array.prototype.reduce) {
    Array.prototype.reduce = function reduce(fun) {
      var object = toObject(this),
        self =
          splitString && "[object String]" == _toString(this)
            ? this.split("")
            : object,
        length = self.length >>> 0;
      if ("[object Function]" != _toString(fun)) {
        throw new TypeError(fun + " is not a function");
      }
      if (!length && 1 == arguments.length) {
        throw new TypeError("reduce of empty array with no initial value");
      }
      var i = 0,
        result;
      if (2 <= arguments.length) {
        result = arguments[1];
      } else {
        do {
          if (i in self) {
            result = self[i++];
            break;
          }
          if (++i >= length) {
            throw new TypeError("reduce of empty array with no initial value");
          }
        } while (!0);
      }
      for (; i < length; i++) {
        if (i in self) {
          result = fun.call(void 0, result, self[i], i, object);
        }
      }
      return result;
    };
  }
  if (!Array.prototype.reduceRight) {
    Array.prototype.reduceRight = function reduceRight(fun) {
      var object = toObject(this),
        self =
          splitString && "[object String]" == _toString(this)
            ? this.split("")
            : object,
        length = self.length >>> 0;
      if ("[object Function]" != _toString(fun)) {
        throw new TypeError(fun + " is not a function");
      }
      if (!length && 1 == arguments.length) {
        throw new TypeError("reduceRight of empty array with no initial value");
      }
      var result,
        i = length - 1;
      if (2 <= arguments.length) {
        result = arguments[1];
      } else {
        do {
          if (i in self) {
            result = self[i--];
            break;
          }
          if (0 > --i) {
            throw new TypeError(
              "reduceRight of empty array with no initial value"
            );
          }
        } while (!0);
      }
      do {
        if (i in this) {
          result = fun.call(void 0, result, self[i], i, object);
        }
      } while (i--);
      return result;
    };
  }
  if (!Array.prototype.indexOf || -1 != [0, 1].indexOf(1, 2)) {
    Array.prototype.indexOf = function indexOf(sought) {
      var self =
          splitString && "[object String]" == _toString(this)
            ? this.split("")
            : toObject(this),
        length = self.length >>> 0;
      if (!length) {
        return -1;
      }
      var i = 0;
      if (1 < arguments.length) {
        i = toInteger(arguments[1]);
      }
      i = 0 <= i ? i : _Mathmax(0, length + i);
      for (; i < length; i++) {
        if (i in self && self[i] === sought) {
          return i;
        }
      }
      return -1;
    };
  }
  if (!Array.prototype.lastIndexOf || -1 != [0, 1].lastIndexOf(0, -3)) {
    Array.prototype.lastIndexOf = function lastIndexOf(sought) {
      var self =
          splitString && "[object String]" == _toString(this)
            ? this.split("")
            : toObject(this),
        length = self.length >>> 0;
      if (!length) {
        return -1;
      }
      var i = length - 1;
      if (1 < arguments.length) {
        i = _Mathmin(i, toInteger(arguments[1]));
      }
      i = 0 <= i ? i : length - _Mathabs(i);
      for (; 0 <= i; i--) {
        if (i in self && sought === self[i]) {
          return i;
        }
      }
      return -1;
    };
  }
  if (!Object.getPrototypeOf) {
    Object.getPrototypeOf = function getPrototypeOf(object) {
      return (
        object.__proto__ ||
        (object.constructor ? object.constructor.prototype : prototypeOfObject)
      );
    };
  }
  if (!Object.getOwnPropertyDescriptor) {
    var ERR_NON_OBJECT =
      "Object.getOwnPropertyDescriptor called on a " + "non-object: ";
    Object.getOwnPropertyDescriptor = function getOwnPropertyDescriptor(
      object,
      property
    ) {
      if (
        ("object" != babelHelpers.typeof(object) &&
          "function" != typeof object) ||
        null === object
      )
        throw new TypeError(ERR_NON_OBJECT + object);
      if (!owns(object, property)) return;
      var descriptor, getter, setter;
      descriptor = { enumerable: !0, configurable: !0 };
      if (supportsAccessors) {
        var prototype = object.__proto__;
        object.__proto__ = prototypeOfObject;
        var getter = lookupGetter(object, property),
          setter = lookupSetter(object, property);
        object.__proto__ = prototype;
        if (getter || setter) {
          if (getter) descriptor.get = getter;
          if (setter) descriptor.set = setter;
          return descriptor;
        }
      }
      descriptor.value = object[property];
      return descriptor;
    };
  }
  if (!Object.getOwnPropertyNames) {
    Object.getOwnPropertyNames = function getOwnPropertyNames(object) {
      return Object.keys(object);
    };
  }
  if (!Object.create) {
    var createEmpty;
    if (null === Object.prototype.__proto__) {
      createEmpty = function createEmpty() {
        return { __proto__: null };
      };
    } else {
      createEmpty = function createEmpty() {
        var empty = {};
        for (var i in empty) {
          empty[i] = null;
        }
        empty.constructor = empty.hasOwnProperty = empty.propertyIsEnumerable = empty.isPrototypeOf = empty.toLocaleString = empty.toString = empty.valueOf = empty.__proto__ = null;
        return empty;
      };
    }
    Object.create = function create(prototype, properties) {
      var object;
      if (null === prototype) {
        object = createEmpty();
      } else {
        if ("object" != babelHelpers.typeof(prototype))
          throw new TypeError(
            "typeof prototype[" +
              babelHelpers.typeof(prototype) +
              "] != 'object'"
          );
        var Type = function Type() {};
        Type.prototype = prototype;
        object = new Type();
        object.__proto__ = prototype;
      }
      if (void 0 !== properties) Object.defineProperties(object, properties);
      return object;
    };
  }
  function doesDefinePropertyWork(object) {
    try {
      Object.defineProperty(object, "sentinel", {});
      return "sentinel" in object;
    } catch (exception) {}
  }
  if (Object.defineProperty) {
    var definePropertyWorksOnObject = doesDefinePropertyWork({}),
      definePropertyWorksOnDom =
        "undefined" == typeof document ||
        doesDefinePropertyWork(document.createElement("div"));
    if (!definePropertyWorksOnObject || !definePropertyWorksOnDom) {
      var definePropertyFallback = Object.defineProperty;
    }
  }
  if (!Object.defineProperty || definePropertyFallback) {
    var ERR_NON_OBJECT_DESCRIPTOR = "Property description must be an object: ",
      ERR_NON_OBJECT_TARGET = "Object.defineProperty called on non-object: ",
      ERR_ACCESSORS_NOT_SUPPORTED =
        "getters & setters can not be defined " + "on this javascript engine";
    Object.defineProperty = function defineProperty(
      object,
      property,
      descriptor
    ) {
      if (
        ("object" != babelHelpers.typeof(object) &&
          "function" != typeof object) ||
        null === object
      )
        throw new TypeError(ERR_NON_OBJECT_TARGET + object);
      if (
        ("object" != babelHelpers.typeof(descriptor) &&
          "function" != typeof descriptor) ||
        null === descriptor
      )
        throw new TypeError(ERR_NON_OBJECT_DESCRIPTOR + descriptor);
      if (definePropertyFallback) {
        try {
          return definePropertyFallback.call(
            Object,
            object,
            property,
            descriptor
          );
        } catch (exception) {}
      }
      if (owns(descriptor, "value")) {
        if (
          supportsAccessors &&
          (lookupGetter(object, property) || lookupSetter(object, property))
        ) {
          var prototype = object.__proto__;
          object.__proto__ = prototypeOfObject;
          delete object[property];
          object[property] = descriptor.value;
          object.__proto__ = prototype;
        } else {
          object[property] = descriptor.value;
        }
      } else {
        if (!supportsAccessors)
          throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
        if (owns(descriptor, "get"))
          defineGetter(object, property, descriptor.get);
        if (owns(descriptor, "set"))
          defineSetter(object, property, descriptor.set);
      }
      return object;
    };
  }
  if (!Object.defineProperties) {
    Object.defineProperties = function defineProperties(object, properties) {
      for (var property in properties) {
        if (owns(properties, property))
          Object.defineProperty(object, property, properties[property]);
      }
      return object;
    };
  }
  if (!Object.seal) {
    Object.seal = function seal(object) {
      return object;
    };
  }
  if (!Object.freeze) {
    Object.freeze = function freeze(object) {
      return object;
    };
  }
  try {
    Object.freeze(function() {});
  } catch (exception) {
    Object.freeze = (function freeze(freezeObject) {
      return function freeze(object) {
        if ("function" == typeof object) {
          return object;
        } else {
          return freezeObject(object);
        }
      };
    })(Object.freeze);
  }
  if (!Object.preventExtensions) {
    Object.preventExtensions = function preventExtensions(object) {
      return object;
    };
  }
  if (!Object.isSealed) {
    Object.isSealed = function isSealed(object) {
      return !1;
    };
  }
  if (!Object.isFrozen) {
    Object.isFrozen = function isFrozen(object) {
      return !1;
    };
  }
  if (!Object.isExtensible) {
    Object.isExtensible = function isExtensible(object) {
      if (Object(object) === object) {
        throw new TypeError();
      }
      var name = "";
      while (owns(object, name)) {
        name += "?";
      }
      object[name] = !0;
      var returnValue = owns(object, name);
      delete object[name];
      return returnValue;
    };
  }
  if (!Object.keys) {
    var hasDontEnumBug = !0,
      dontEnums = [
        "toString",
        "toLocaleString",
        "valueOf",
        "hasOwnProperty",
        "isPrototypeOf",
        "propertyIsEnumerable",
        "constructor"
      ],
      dontEnumsLength = dontEnums.length;
    for (var key in { toString: null }) {
      hasDontEnumBug = !1;
    }
    Object.keys = function keys(object) {
      if (
        ("object" != babelHelpers.typeof(object) &&
          "function" != typeof object) ||
        null === object
      ) {
        throw new TypeError("Object.keys called on a non-object");
      }
      var keys = [];
      for (var name in object) {
        if (owns(object, name)) {
          keys.push(name);
        }
      }
      if (hasDontEnumBug) {
        for (var i = 0, ii = dontEnumsLength, dontEnum; i < ii; i++) {
          dontEnum = dontEnums[i];
          if (owns(object, dontEnum)) {
            keys.push(dontEnum);
          }
        }
      }
      return keys;
    };
  }
  if (!Date.now) {
    Date.now = function now() {
      return new Date().getTime();
    };
  }
  var ws =
    "\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003" +
    "\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028" +
    "\u2029\uFEFF";
  if (!_Stringprototype2.trim || ws.trim()) {
    ws = "[" + ws + "]";
    var trimBeginRegexp = new RegExp("^" + ws + ws + "*"),
      trimEndRegexp = new RegExp(ws + ws + "*$");
    _Stringprototype2.trim = function trim() {
      return (this + "")
        .replace(trimBeginRegexp, "")
        .replace(trimEndRegexp, "");
    };
  }
  function toInteger(n) {
    n = +n;
    if (n !== n) {
      n = 0;
    } else if (0 !== n && n !== 1 / 0 && n !== -(1 / 0)) {
      n = (0 < n || -1) * Math.floor(_Mathabs(n));
    }
    return n;
  }
  function isPrimitive(input) {
    var type = babelHelpers.typeof(input);
    return (
      null === input ||
      "undefined" === type ||
      "boolean" === type ||
      "number" === type ||
      "string" === type
    );
  }
  function toPrimitive(input) {
    var val, valueOf, toString;
    if (isPrimitive(input)) {
      return input;
    }
    valueOf = input.valueOf;
    if ("function" === typeof valueOf) {
      val = valueOf.call(input);
      if (isPrimitive(val)) {
        return val;
      }
    }
    toString = input.toString;
    if ("function" === typeof toString) {
      val = toString.call(input);
      if (isPrimitive(val)) {
        return val;
      }
    }
    throw new TypeError();
  }
  var toObject = function toObject(o) {
    if (null == o) {
      throw new TypeError("can't convert " + o + " to object");
    }
    return Object(o);
  };
});
ace.define(
  "ace/lib/fixoldbrowsers",
  ["require", "exports", "module", "ace/lib/regexp", "ace/lib/es5-shim"],
  function(require, exports, module) {
    "use strict";
    require("./regexp");
    require("./es5-shim");
    if ("undefined" != typeof Element && !Element.prototype.remove) {
      Object.defineProperty(Element.prototype, "remove", {
        enumerable: !1,
        writable: !0,
        configurable: !0,
        value: function value() {
          this.parentNode && this.parentNode.removeChild(this);
        }
      });
    }
  }
);
ace.define("ace/lib/useragent", ["require", "exports", "module"], function(
  require,
  exports,
  module
) {
  "use strict";
  exports.OS = { LINUX: "LINUX", MAC: "MAC", WINDOWS: "WINDOWS" };
  exports.getOS = function() {
    if (exports.isMac) {
      return exports.OS.MAC;
    } else if (exports.isLinux) {
      return exports.OS.LINUX;
    } else {
      return exports.OS.WINDOWS;
    }
  };
  if (
    "object" !=
    ("undefined" === typeof navigator
      ? "undefined"
      : babelHelpers.typeof(navigator))
  )
    return;
  var os = (navigator.platform.match(/mac|win|linux/i) || [
      "other"
    ])[0].toLowerCase(),
    ua = navigator.userAgent;
  exports.isWin = "win" == os;
  exports.isMac = "mac" == os;
  exports.isLinux = "linux" == os;
  exports.isIE =
    "Microsoft Internet Explorer" == navigator.appName ||
    0 <= navigator.appName.indexOf("MSAppHost")
      ? parseFloat(
          (ua.match(
            /(?:MSIE |Trident\/[0-9]+[\.0-9]+;.*rv:)([0-9]+[\.0-9]+)/
          ) || [])[1]
        )
      : parseFloat(
          (ua.match(/(?:Trident\/[0-9]+[\.0-9]+;.*rv:)([0-9]+[\.0-9]+)/) ||
            [])[1]
        );
  exports.isOldIE = exports.isIE && 9 > exports.isIE;
  exports.isGecko = exports.isMozilla = ua.match(/ Gecko\/\d+/);
  exports.isOpera =
    window.opera &&
    "[object Opera]" == Object.prototype.toString.call(window.opera);
  exports.isWebKit = parseFloat(ua.split("WebKit/")[1]) || void 0;
  exports.isChrome = parseFloat(ua.split(" Chrome/")[1]) || void 0;
  exports.isEdge = parseFloat(ua.split(" Edge/")[1]) || void 0;
  exports.isAIR = 0 <= ua.indexOf("AdobeAIR");
  exports.isIPad = 0 <= ua.indexOf("iPad");
  exports.isAndroid = 0 <= ua.indexOf("Android");
  exports.isChromeOS = 0 <= ua.indexOf(" CrOS ");
  exports.isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
  if (exports.isIOS) exports.isMac = !0;
  exports.isMobile = exports.isIPad || exports.isAndroid;
});
ace.define(
  "ace/lib/dom",
  ["require", "exports", "module", "ace/lib/useragent"],
  function(require, exports, module) {
    "use strict";
    var _Mathround = Math.round,
      useragent = require("./useragent"),
      XHTML_NS = "http://www.w3.org/1999/xhtml";
    exports.buildDom = function buildDom(arr, parent, refs) {
      if ("string" == typeof arr && arr) {
        var txt = document.createTextNode(arr);
        if (parent) parent.appendChild(txt);
        return txt;
      }
      if (!Array.isArray(arr)) return arr;
      if ("string" != typeof arr[0] || !arr[0]) {
        for (var els = [], i = 0, ch; i < arr.length; i++) {
          ch = buildDom(arr[i], parent, refs);
          ch && els.push(ch);
        }
        return els;
      }
      var el = document.createElement(arr[0]),
        options = arr[1],
        childIndex = 1;
      if (
        options &&
        "object" == babelHelpers.typeof(options) &&
        !Array.isArray(options)
      )
        childIndex = 2;
      for (var i = childIndex; i < arr.length; i++) {
        buildDom(arr[i], el, refs);
      }
      if (2 == childIndex) {
        Object.keys(options).forEach(function(n) {
          var val = options[n];
          if ("class" === n) {
            el.className = Array.isArray(val) ? val.join(" ") : val;
          } else if ("function" == typeof val || "value" == n) {
            el[n] = val;
          } else if ("ref" === n) {
            if (refs) refs[val] = el;
          } else if (null != val) {
            el.setAttribute(n, val);
          }
        });
      }
      if (parent) parent.appendChild(el);
      return el;
    };
    exports.getDocumentHead = function(doc) {
      if (!doc) doc = document;
      return (
        doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement
      );
    };
    exports.createElement = function(tag, ns) {
      return document.createElementNS
        ? document.createElementNS(ns || XHTML_NS, tag)
        : document.createElement(tag);
    };
    exports.removeChildren = function(element) {
      element.innerHTML = "";
    };
    exports.createTextNode = function(textContent, element) {
      var doc = element ? element.ownerDocument : document;
      return doc.createTextNode(textContent);
    };
    exports.createFragment = function(element) {
      var doc = element ? element.ownerDocument : document;
      return doc.createDocumentFragment();
    };
    exports.hasCssClass = function(el, name) {
      var classes = (el.className + "").split(/\s+/g);
      return -1 !== classes.indexOf(name);
    };
    exports.addCssClass = function(el, name) {
      if (!exports.hasCssClass(el, name)) {
        el.className += " " + name;
      }
    };
    exports.removeCssClass = function(el, name) {
      var classes = el.className.split(/\s+/g);
      while (!0) {
        var index = classes.indexOf(name);
        if (-1 == index) {
          break;
        }
        classes.splice(index, 1);
      }
      el.className = classes.join(" ");
    };
    exports.toggleCssClass = function(el, name) {
      var classes = el.className.split(/\s+/g),
        add = !0;
      while (!0) {
        var index = classes.indexOf(name);
        if (-1 == index) {
          break;
        }
        add = !1;
        classes.splice(index, 1);
      }
      if (add) classes.push(name);
      el.className = classes.join(" ");
      return add;
    };
    exports.setCssClass = function(node, className, include) {
      if (include) {
        exports.addCssClass(node, className);
      } else {
        exports.removeCssClass(node, className);
      }
    };
    exports.hasCssString = function(id, doc) {
      var index = 0,
        sheets;
      doc = doc || document;
      if ((sheets = doc.querySelectorAll("style"))) {
        while (index < sheets.length) {
          if (sheets[index++].id === id) return !0;
        }
      }
    };
    exports.importCssString = function importCssString(cssText, id, container) {
      var root =
          container && container.getRootNode
            ? container.getRootNode()
            : document,
        doc = root.ownerDocument || root;
      if (id && exports.hasCssString(id, root)) return null;
      if (id) cssText += "\n/*# sourceURL=ace/css/" + id + " */";
      var style = exports.createElement("style");
      style.appendChild(doc.createTextNode(cssText));
      if (id) style.id = id;
      if (root == doc) root = exports.getDocumentHead(doc);
      root.insertBefore(style, root.firstChild);
    };
    exports.importCssStylsheet = function(uri, doc) {
      exports.buildDom(
        ["link", { rel: "stylesheet", href: uri }],
        exports.getDocumentHead(doc)
      );
    };
    exports.scrollbarWidth = function(document) {
      var inner = exports.createElement("ace_inner");
      inner.style.width = "100%";
      inner.style.minWidth = "0px";
      inner.style.height = "200px";
      inner.style.display = "block";
      var outer = exports.createElement("ace_outer"),
        style = outer.style;
      style.position = "absolute";
      style.left = "-10000px";
      style.overflow = "hidden";
      style.width = "200px";
      style.minWidth = "0px";
      style.height = "150px";
      style.display = "block";
      outer.appendChild(inner);
      var body = document.documentElement;
      body.appendChild(outer);
      var noScrollbar = inner.offsetWidth;
      style.overflow = "scroll";
      var withScrollbar = inner.offsetWidth;
      if (noScrollbar == withScrollbar) {
        withScrollbar = outer.clientWidth;
      }
      body.removeChild(outer);
      return noScrollbar - withScrollbar;
    };
    if ("undefined" == typeof document) {
      exports.importCssString = function() {};
    }
    exports.computedStyle = function(element, style) {
      return window.getComputedStyle(element, "") || {};
    };
    exports.setStyle = function(styles, property, value) {
      if (styles[property] !== value) {
        styles[property] = value;
      }
    };
    exports.HAS_CSS_ANIMATION = !1;
    exports.HAS_CSS_TRANSFORMS = !1;
    exports.HI_DPI = useragent.isWin
      ? "undefined" !== typeof window && 1.5 <= window.devicePixelRatio
      : !0;
    if ("undefined" !== typeof document) {
      var div = document.createElement("div");
      if (exports.HI_DPI && div.style.transform !== void 0)
        exports.HAS_CSS_TRANSFORMS = !0;
      if (!useragent.isEdge && "undefined" !== typeof div.style.animationName)
        exports.HAS_CSS_ANIMATION = !0;
      div = null;
    }
    if (exports.HAS_CSS_TRANSFORMS) {
      exports.translate = function(element, tx, ty) {
        element.style.transform =
          "translate(" + _Mathround(tx) + "px, " + _Mathround(ty) + "px)";
      };
    } else {
      exports.translate = function(element, tx, ty) {
        element.style.top = _Mathround(ty) + "px";
        element.style.left = _Mathround(tx) + "px";
      };
    }
  }
);
ace.define("ace/lib/oop", ["require", "exports", "module"], function(
  require,
  exports,
  module
) {
  "use strict";
  exports.inherits = function(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    });
  };
  exports.mixin = function(obj, mixin) {
    for (var key in mixin) {
      obj[key] = mixin[key];
    }
    return obj;
  };
  exports.implement = function(proto, mixin) {
    exports.mixin(proto, mixin);
  };
});
ace.define(
  "ace/lib/keys",
  ["require", "exports", "module", "ace/lib/fixoldbrowsers", "ace/lib/oop"],
  function(require, exports, module) {
    "use strict";
    require("./fixoldbrowsers");
    var oop = require("./oop"),
      Keys = (function() {
        var ret = {
            MODIFIER_KEYS: { 16: "Shift", 17: "Ctrl", 18: "Alt", 224: "Meta" },
            KEY_MODS: {
              ctrl: 1,
              alt: 2,
              option: 2,
              shift: 4,
              super: 8,
              meta: 8,
              command: 8,
              cmd: 8
            },
            FUNCTION_KEYS: {
              8: "Backspace",
              9: "Tab",
              13: "Return",
              19: "Pause",
              27: "Esc",
              32: "Space",
              33: "PageUp",
              34: "PageDown",
              35: "End",
              36: "Home",
              37: "Left",
              38: "Up",
              39: "Right",
              40: "Down",
              44: "Print",
              45: "Insert",
              46: "Delete",
              96: "Numpad0",
              97: "Numpad1",
              98: "Numpad2",
              99: "Numpad3",
              100: "Numpad4",
              101: "Numpad5",
              102: "Numpad6",
              103: "Numpad7",
              104: "Numpad8",
              105: "Numpad9",
              "-13": "NumpadEnter",
              112: "F1",
              113: "F2",
              114: "F3",
              115: "F4",
              116: "F5",
              117: "F6",
              118: "F7",
              119: "F8",
              120: "F9",
              121: "F10",
              122: "F11",
              123: "F12",
              144: "Numlock",
              145: "Scrolllock"
            },
            PRINTABLE_KEYS: {
              32: " ",
              48: "0",
              49: "1",
              50: "2",
              51: "3",
              52: "4",
              53: "5",
              54: "6",
              55: "7",
              56: "8",
              57: "9",
              59: ";",
              61: "=",
              65: "a",
              66: "b",
              67: "c",
              68: "d",
              69: "e",
              70: "f",
              71: "g",
              72: "h",
              73: "i",
              74: "j",
              75: "k",
              76: "l",
              77: "m",
              78: "n",
              79: "o",
              80: "p",
              81: "q",
              82: "r",
              83: "s",
              84: "t",
              85: "u",
              86: "v",
              87: "w",
              88: "x",
              89: "y",
              90: "z",
              107: "+",
              109: "-",
              110: ".",
              186: ";",
              187: "=",
              188: ",",
              189: "-",
              190: ".",
              191: "/",
              192: "`",
              219: "[",
              220: "\\",
              221: "]",
              222: "'",
              111: "/",
              106: "*"
            }
          },
          name,
          i;
        for (i in ret.FUNCTION_KEYS) {
          name = ret.FUNCTION_KEYS[i].toLowerCase();
          ret[name] = parseInt(i, 10);
        }
        for (i in ret.PRINTABLE_KEYS) {
          name = ret.PRINTABLE_KEYS[i].toLowerCase();
          ret[name] = parseInt(i, 10);
        }
        oop.mixin(ret, ret.MODIFIER_KEYS);
        oop.mixin(ret, ret.PRINTABLE_KEYS);
        oop.mixin(ret, ret.FUNCTION_KEYS);
        ret.enter = ret["return"];
        ret.escape = ret.esc;
        ret.del = ret["delete"];
        ret[173] = "-";
        (function() {
          for (
            var mods = ["cmd", "ctrl", "alt", "shift"],
              i = Math.pow(2, mods.length);
            i--;

          ) {
            ret.KEY_MODS[i] =
              mods
                .filter(function(x) {
                  return i & ret.KEY_MODS[x];
                })
                .join("-") + "-";
          }
        })();
        ret.KEY_MODS[0] = "";
        ret.KEY_MODS[-1] = "input-";
        return ret;
      })();
    oop.mixin(exports, Keys);
    exports.keyCodeToString = function(keyCode) {
      var keyString = Keys[keyCode];
      if ("string" != typeof keyString)
        keyString = String.fromCharCode(keyCode);
      return keyString.toLowerCase();
    };
  }
);
ace.define(
  "ace/lib/event",
  ["require", "exports", "module", "ace/lib/keys", "ace/lib/useragent"],
  function(require, exports, module) {
    "use strict";
    var _Mathabs2 = Math.abs,
      keys = require("./keys"),
      useragent = require("./useragent"),
      pressedKeys = null,
      ts = 0;
    exports.addListener = function(elem, type, callback) {
      if (elem.addEventListener) {
        return elem.addEventListener(type, callback, !1);
      }
      if (elem.attachEvent) {
        var wrapper = function wrapper() {
          callback.call(elem, window.event);
        };
        callback._wrapper = wrapper;
        elem.attachEvent("on" + type, wrapper);
      }
    };
    exports.removeListener = function(elem, type, callback) {
      if (elem.removeEventListener) {
        return elem.removeEventListener(type, callback, !1);
      }
      if (elem.detachEvent) {
        elem.detachEvent("on" + type, callback._wrapper || callback);
      }
    };
    exports.stopEvent = function(e) {
      exports.stopPropagation(e);
      exports.preventDefault(e);
      return !1;
    };
    exports.stopPropagation = function(e) {
      if (e.stopPropagation) e.stopPropagation();
      else e.cancelBubble = !0;
    };
    exports.preventDefault = function(e) {
      if (e.preventDefault) e.preventDefault();
      else e.returnValue = !1;
    };
    exports.getButton = function(e) {
      if ("dblclick" == e.type) return 0;
      if (
        "contextmenu" == e.type ||
        (useragent.isMac && e.ctrlKey && !e.altKey && !e.shiftKey)
      )
        return 2;
      if (e.preventDefault) {
        return e.button;
      } else {
        return { 1: 0, 2: 2, 4: 1 }[e.button];
      }
    };
    exports.capture = function(el, eventHandler, releaseCaptureHandler) {
      function onMouseUp(e) {
        eventHandler && eventHandler(e);
        releaseCaptureHandler && releaseCaptureHandler(e);
        exports.removeListener(document, "mousemove", eventHandler, !0);
        exports.removeListener(document, "mouseup", onMouseUp, !0);
        exports.removeListener(document, "dragstart", onMouseUp, !0);
      }
      exports.addListener(document, "mousemove", eventHandler, !0);
      exports.addListener(document, "mouseup", onMouseUp, !0);
      exports.addListener(document, "dragstart", onMouseUp, !0);
      return onMouseUp;
    };
    exports.addTouchMoveListener = function(el, callback) {
      var startx, starty;
      exports.addListener(el, "touchstart", function(e) {
        var touches = e.touches,
          touchObj = touches[0];
        startx = touchObj.clientX;
        starty = touchObj.clientY;
      });
      exports.addListener(el, "touchmove", function(e) {
        var touches = e.touches;
        if (1 < touches.length) return;
        var touchObj = touches[0];
        e.wheelX = startx - touchObj.clientX;
        e.wheelY = starty - touchObj.clientY;
        startx = touchObj.clientX;
        starty = touchObj.clientY;
        callback(e);
      });
    };
    exports.addMouseWheelListener = function(el, callback) {
      if ("onmousewheel" in el) {
        exports.addListener(el, "mousewheel", function(e) {
          var factor = 8;
          if (e.wheelDeltaX !== void 0) {
            e.wheelX = -e.wheelDeltaX / factor;
            e.wheelY = -e.wheelDeltaY / factor;
          } else {
            e.wheelX = 0;
            e.wheelY = -e.wheelDelta / factor;
          }
          callback(e);
        });
      } else if ("onwheel" in el) {
        exports.addListener(el, "wheel", function(e) {
          var factor = 0.35;
          switch (e.deltaMode) {
            case e.DOM_DELTA_PIXEL:
              e.wheelX = e.deltaX * factor || 0;
              e.wheelY = e.deltaY * factor || 0;
              break;
            case e.DOM_DELTA_LINE:
            case e.DOM_DELTA_PAGE:
              e.wheelX = 5 * (e.deltaX || 0);
              e.wheelY = 5 * (e.deltaY || 0);
              break;
          }
          callback(e);
        });
      } else {
        exports.addListener(el, "DOMMouseScroll", function(e) {
          if (e.axis && e.axis == e.HORIZONTAL_AXIS) {
            e.wheelX = 5 * (e.detail || 0);
            e.wheelY = 0;
          } else {
            e.wheelX = 0;
            e.wheelY = 5 * (e.detail || 0);
          }
          callback(e);
        });
      }
    };
    exports.addMultiMouseDownListener = function(
      elements,
      timeouts,
      eventHandler,
      callbackName
    ) {
      var clicks = 0,
        startX,
        startY,
        timer,
        eventNames = { 2: "dblclick", 3: "tripleclick", 4: "quadclick" };
      function onMousedown(e) {
        if (0 !== exports.getButton(e)) {
          clicks = 0;
        } else if (1 < e.detail) {
          clicks++;
          if (4 < clicks) clicks = 1;
        } else {
          clicks = 1;
        }
        if (useragent.isIE) {
          var isNewClick =
            5 < _Mathabs2(e.clientX - startX) ||
            5 < _Mathabs2(e.clientY - startY);
          if (!timer || isNewClick) clicks = 1;
          if (timer) clearTimeout(timer);
          timer = setTimeout(function() {
            timer = null;
          }, timeouts[clicks - 1] || 600);
          if (1 == clicks) {
            startX = e.clientX;
            startY = e.clientY;
          }
        }
        e._clicks = clicks;
        eventHandler[callbackName]("mousedown", e);
        if (4 < clicks) clicks = 0;
        else if (1 < clicks)
          return eventHandler[callbackName](eventNames[clicks], e);
      }
      function onDblclick(e) {
        clicks = 2;
        if (timer) clearTimeout(timer);
        timer = setTimeout(function() {
          timer = null;
        }, timeouts[clicks - 1] || 600);
        eventHandler[callbackName]("mousedown", e);
        eventHandler[callbackName](eventNames[clicks], e);
      }
      if (!Array.isArray(elements)) elements = [elements];
      elements.forEach(function(el) {
        exports.addListener(el, "mousedown", onMousedown);
        if (useragent.isOldIE) exports.addListener(el, "dblclick", onDblclick);
      });
    };
    var getModifierHash =
      useragent.isMac && useragent.isOpera && !("KeyboardEvent" in window)
        ? function(e) {
            return (
              0 |
              (e.metaKey ? 1 : 0) |
              (e.altKey ? 2 : 0) |
              (e.shiftKey ? 4 : 0) |
              (e.ctrlKey ? 8 : 0)
            );
          }
        : function(e) {
            return (
              0 |
              (e.ctrlKey ? 1 : 0) |
              (e.altKey ? 2 : 0) |
              (e.shiftKey ? 4 : 0) |
              (e.metaKey ? 8 : 0)
            );
          };
    exports.getModifierString = function(e) {
      return keys.KEY_MODS[getModifierHash(e)];
    };
    function normalizeCommandKeys(callback, e, keyCode) {
      var hashId = getModifierHash(e);
      if (!useragent.isMac && pressedKeys) {
        if (
          e.getModifierState &&
          (e.getModifierState("OS") || e.getModifierState("Win"))
        )
          hashId |= 8;
        if (pressedKeys.altGr) {
          if (3 != (3 & hashId)) pressedKeys.altGr = 0;
          else return;
        }
        if (18 === keyCode || 17 === keyCode) {
          var location = "location" in e ? e.location : e.keyLocation;
          if (17 === keyCode && 1 === location) {
            if (1 == pressedKeys[keyCode]) ts = e.timeStamp;
          } else if (18 === keyCode && 3 === hashId && 2 === location) {
            var dt = e.timeStamp - ts;
            if (50 > dt) pressedKeys.altGr = !0;
          }
        }
      }
      if (keyCode in keys.MODIFIER_KEYS) {
        keyCode = -1;
      }
      if (8 & hashId && 91 <= keyCode && 93 >= keyCode) {
        keyCode = -1;
      }
      if (!hashId && 13 === keyCode) {
        var location = "location" in e ? e.location : e.keyLocation;
        if (3 === location) {
          callback(e, hashId, -keyCode);
          if (e.defaultPrevented) return;
        }
      }
      if (useragent.isChromeOS && 8 & hashId) {
        callback(e, hashId, keyCode);
        if (e.defaultPrevented) return;
        else hashId &= ~8;
      }
      if (
        !hashId &&
        !(keyCode in keys.FUNCTION_KEYS) &&
        !(keyCode in keys.PRINTABLE_KEYS)
      ) {
        return !1;
      }
      return callback(e, hashId, keyCode);
    }
    exports.addCommandKeyListener = function(el, callback) {
      var addListener = exports.addListener;
      if (
        useragent.isOldGecko ||
        (useragent.isOpera && !("KeyboardEvent" in window))
      ) {
        var lastKeyDownKeyCode = null;
        addListener(el, "keydown", function(e) {
          lastKeyDownKeyCode = e.keyCode;
        });
        addListener(el, "keypress", function(e) {
          return normalizeCommandKeys(callback, e, lastKeyDownKeyCode);
        });
      } else {
        var lastDefaultPrevented = null;
        addListener(el, "keydown", function(e) {
          pressedKeys[e.keyCode] = (pressedKeys[e.keyCode] || 0) + 1;
          var result = normalizeCommandKeys(callback, e, e.keyCode);
          lastDefaultPrevented = e.defaultPrevented;
          return result;
        });
        addListener(el, "keypress", function(e) {
          if (
            lastDefaultPrevented &&
            (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey)
          ) {
            exports.stopEvent(e);
            lastDefaultPrevented = null;
          }
        });
        addListener(el, "keyup", function(e) {
          pressedKeys[e.keyCode] = null;
        });
        if (!pressedKeys) {
          resetPressedKeys();
          addListener(window, "focus", resetPressedKeys);
        }
      }
    };
    function resetPressedKeys() {
      pressedKeys = Object.create(null);
    }
    if (
      "object" ==
        ("undefined" === typeof window
          ? "undefined"
          : babelHelpers.typeof(window)) &&
      window.postMessage &&
      !useragent.isOldIE
    ) {
      var postMessageId = 1;
      exports.nextTick = function(callback, win) {
        win = win || window;
        var messageName = "zero-timeout-message-" + postMessageId++,
          listener = function listener(e) {
            if (e.data == messageName) {
              exports.stopPropagation(e);
              exports.removeListener(win, "message", listener);
              callback();
            }
          };
        exports.addListener(win, "message", listener);
        win.postMessage(messageName, "*");
      };
    }
    exports.$idleBlocked = !1;
    exports.onIdle = function(cb, timeout) {
      return setTimeout(function handler() {
        if (!exports.$idleBlocked) {
          cb();
        } else {
          setTimeout(handler, 100);
        }
      }, timeout);
    };
    exports.$idleBlockId = null;
    exports.blockIdle = function(delay) {
      if (exports.$idleBlockId) clearTimeout(exports.$idleBlockId);
      exports.$idleBlocked = !0;
      exports.$idleBlockId = setTimeout(function() {
        exports.$idleBlocked = !1;
      }, delay || 100);
    };
    exports.nextFrame =
      "object" ==
        ("undefined" === typeof window
          ? "undefined"
          : babelHelpers.typeof(window)) &&
      (window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame);
    if (exports.nextFrame) exports.nextFrame = exports.nextFrame.bind(window);
    else
      exports.nextFrame = function(callback) {
        setTimeout(callback, 17);
      };
  }
);
ace.define("ace/range", ["require", "exports", "module"], function(
  require,
  exports,
  module
) {
  "use strict";
  var comparePoints = function comparePoints(p1, p2) {
      return p1.row - p2.row || p1.column - p2.column;
    },
    Range = function Range(startRow, startColumn, endRow, endColumn) {
      this.start = { row: startRow, column: startColumn };
      this.end = { row: endRow, column: endColumn };
    };
  (function() {
    this.isEqual = function(range) {
      return (
        this.start.row === range.start.row &&
        this.end.row === range.end.row &&
        this.start.column === range.start.column &&
        this.end.column === range.end.column
      );
    };
    this.toString = function() {
      return (
        "Range: [" +
        this.start.row +
        "/" +
        this.start.column +
        "] -> [" +
        this.end.row +
        "/" +
        this.end.column +
        "]"
      );
    };
    this.contains = function(row, column) {
      return 0 == this.compare(row, column);
    };
    this.compareRange = function(range) {
      var cmp,
        end = range.end,
        start = range.start;
      cmp = this.compare(end.row, end.column);
      if (1 == cmp) {
        cmp = this.compare(start.row, start.column);
        if (1 == cmp) {
          return 2;
        } else if (0 == cmp) {
          return 1;
        } else {
          return 0;
        }
      } else if (-1 == cmp) {
        return -2;
      } else {
        cmp = this.compare(start.row, start.column);
        if (-1 == cmp) {
          return -1;
        } else if (1 == cmp) {
          return 42;
        } else {
          return 0;
        }
      }
    };
    this.comparePoint = function(p) {
      return this.compare(p.row, p.column);
    };
    this.containsRange = function(range) {
      return (
        0 == this.comparePoint(range.start) && 0 == this.comparePoint(range.end)
      );
    };
    this.intersects = function(range) {
      var cmp = this.compareRange(range);
      return -1 == cmp || 0 == cmp || 1 == cmp;
    };
    this.isEnd = function(row, column) {
      return this.end.row == row && this.end.column == column;
    };
    this.isStart = function(row, column) {
      return this.start.row == row && this.start.column == column;
    };
    this.setStart = function(row, column) {
      if ("object" == babelHelpers.typeof(row)) {
        this.start.column = row.column;
        this.start.row = row.row;
      } else {
        this.start.row = row;
        this.start.column = column;
      }
    };
    this.setEnd = function(row, column) {
      if ("object" == babelHelpers.typeof(row)) {
        this.end.column = row.column;
        this.end.row = row.row;
      } else {
        this.end.row = row;
        this.end.column = column;
      }
    };
    this.inside = function(row, column) {
      if (0 == this.compare(row, column)) {
        if (this.isEnd(row, column) || this.isStart(row, column)) {
          return !1;
        } else {
          return !0;
        }
      }
      return !1;
    };
    this.insideStart = function(row, column) {
      if (0 == this.compare(row, column)) {
        if (this.isEnd(row, column)) {
          return !1;
        } else {
          return !0;
        }
      }
      return !1;
    };
    this.insideEnd = function(row, column) {
      if (0 == this.compare(row, column)) {
        if (this.isStart(row, column)) {
          return !1;
        } else {
          return !0;
        }
      }
      return !1;
    };
    this.compare = function(row, column) {
      if (!this.isMultiLine()) {
        if (row === this.start.row) {
          return column < this.start.column
            ? -1
            : column > this.end.column
              ? 1
              : 0;
        }
      }
      if (row < this.start.row) return -1;
      if (row > this.end.row) return 1;
      if (this.start.row === row) return column >= this.start.column ? 0 : -1;
      if (this.end.row === row) return column <= this.end.column ? 0 : 1;
      return 0;
    };
    this.compareStart = function(row, column) {
      if (this.start.row == row && this.start.column == column) {
        return -1;
      } else {
        return this.compare(row, column);
      }
    };
    this.compareEnd = function(row, column) {
      if (this.end.row == row && this.end.column == column) {
        return 1;
      } else {
        return this.compare(row, column);
      }
    };
    this.compareInside = function(row, column) {
      if (this.end.row == row && this.end.column == column) {
        return 1;
      } else if (this.start.row == row && this.start.column == column) {
        return -1;
      } else {
        return this.compare(row, column);
      }
    };
    this.clipRows = function(firstRow, lastRow) {
      if (this.end.row > lastRow) var end = { row: lastRow + 1, column: 0 };
      else if (this.end.row < firstRow) var end = { row: firstRow, column: 0 };
      if (this.start.row > lastRow) var start = { row: lastRow + 1, column: 0 };
      else if (this.start.row < firstRow)
        var start = { row: firstRow, column: 0 };
      return Range.fromPoints(start || this.start, end || this.end);
    };
    this.extend = function(row, column) {
      var cmp = this.compare(row, column);
      if (0 == cmp) return this;
      else if (-1 == cmp) var start = { row: row, column: column };
      else var end = { row: row, column: column };
      return Range.fromPoints(start || this.start, end || this.end);
    };
    this.isEmpty = function() {
      return (
        this.start.row === this.end.row && this.start.column === this.end.column
      );
    };
    this.isMultiLine = function() {
      return this.start.row !== this.end.row;
    };
    this.clone = function() {
      return Range.fromPoints(this.start, this.end);
    };
    this.collapseRows = function() {
      if (0 == this.end.column)
        return new Range(
          this.start.row,
          0,
          Math.max(this.start.row, this.end.row - 1),
          0
        );
      else return new Range(this.start.row, 0, this.end.row, 0);
    };
    this.toScreenRange = function(session) {
      var screenPosStart = session.documentToScreenPosition(this.start),
        screenPosEnd = session.documentToScreenPosition(this.end);
      return new Range(
        screenPosStart.row,
        screenPosStart.column,
        screenPosEnd.row,
        screenPosEnd.column
      );
    };
    this.moveBy = function(row, column) {
      this.start.row += row;
      this.start.column += column;
      this.end.row += row;
      this.end.column += column;
    };
  }.call(Range.prototype));
  Range.fromPoints = function(start, end) {
    return new Range(start.row, start.column, end.row, end.column);
  };
  Range.comparePoints = comparePoints;
  Range.comparePoints = function(p1, p2) {
    return p1.row - p2.row || p1.column - p2.column;
  };
  exports.Range = Range;
});
ace.define("ace/lib/lang", ["require", "exports", "module"], function(
  require,
  exports,
  module
) {
  "use strict";
  exports.last = function(a) {
    return a[a.length - 1];
  };
  exports.stringReverse = function(string) {
    return string
      .split("")
      .reverse()
      .join("");
  };
  exports.stringRepeat = function(string, count) {
    var result = "";
    while (0 < count) {
      if (1 & count) result += string;
      if ((count >>= 1)) string += string;
    }
    return result;
  };
  var trimBeginRegexp = /^\s\s*/,
    trimEndRegexp = /\s\s*$/;
  exports.stringTrimLeft = function(string) {
    return string.replace(trimBeginRegexp, "");
  };
  exports.stringTrimRight = function(string) {
    return string.replace(trimEndRegexp, "");
  };
  exports.copyObject = function(obj) {
    var copy = {};
    for (var key in obj) {
      copy[key] = obj[key];
    }
    return copy;
  };
  exports.copyArray = function(array) {
    for (var copy = [], i = 0, l = array.length; i < l; i++) {
      if (array[i] && "object" == babelHelpers.typeof(array[i]))
        copy[i] = this.copyObject(array[i]);
      else copy[i] = array[i];
    }
    return copy;
  };
  exports.deepCopy = function deepCopy(obj) {
    if ("object" !== babelHelpers.typeof(obj) || !obj) return obj;
    var copy;
    if (Array.isArray(obj)) {
      copy = [];
      for (var key = 0; key < obj.length; key++) {
        copy[key] = deepCopy(obj[key]);
      }
      return copy;
    }
    if ("[object Object]" !== Object.prototype.toString.call(obj)) return obj;
    copy = {};
    for (var key in obj) {
      copy[key] = deepCopy(obj[key]);
    }
    return copy;
  };
  exports.arrayToMap = function(arr) {
    for (var map = {}, i = 0; i < arr.length; i++) {
      map[arr[i]] = 1;
    }
    return map;
  };
  exports.createMap = function(props) {
    var map = Object.create(null);
    for (var i in props) {
      map[i] = props[i];
    }
    return map;
  };
  exports.arrayRemove = function(array, value) {
    for (var i = 0; i <= array.length; i++) {
      if (value === array[i]) {
        array.splice(i, 1);
      }
    }
  };
  exports.escapeRegExp = function(str) {
    return str.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1");
  };
  exports.escapeHTML = function(str) {
    return ("" + str)
      .replace(/&/g, "&#38;")
      .replace(/"/g, "&#34;")
      .replace(/'/g, "&#39;")
      .replace(/</g, "&#60;");
  };
  exports.getMatchOffsets = function(string, regExp) {
    var matches = [];
    string.replace(regExp, function(str) {
      matches.push({
        offset: arguments[arguments.length - 2],
        length: str.length
      });
    });
    return matches;
  };
  exports.deferredCall = function(fcn) {
    var timer = null,
      callback = function callback() {
        timer = null;
        fcn();
      },
      deferred = function deferred(timeout) {
        deferred.cancel();
        timer = setTimeout(callback, timeout || 0);
        return deferred;
      };
    deferred.schedule = deferred;
    deferred.call = function() {
      this.cancel();
      fcn();
      return deferred;
    };
    deferred.cancel = function() {
      clearTimeout(timer);
      timer = null;
      return deferred;
    };
    deferred.isPending = function() {
      return timer;
    };
    return deferred;
  };
  exports.delayedCall = function(fcn, defaultTimeout) {
    var timer = null,
      callback = function callback() {
        timer = null;
        fcn();
      },
      _self = function _self(timeout) {
        if (null == timer)
          timer = setTimeout(callback, timeout || defaultTimeout);
      };
    _self.delay = function(timeout) {
      timer && clearTimeout(timer);
      timer = setTimeout(callback, timeout || defaultTimeout);
    };
    _self.schedule = _self;
    _self.call = function() {
      this.cancel();
      fcn();
    };
    _self.cancel = function() {
      timer && clearTimeout(timer);
      timer = null;
    };
    _self.isPending = function() {
      return timer;
    };
    return _self;
  };
});
ace.define(
  "ace/keyboard/textinput_ios",
  [
    "require",
    "exports",
    "module",
    "ace/lib/event",
    "ace/lib/useragent",
    "ace/lib/dom",
    "ace/lib/lang",
    "ace/lib/keys"
  ],
  function(require, exports, module) {
    "use strict";
    var event = require("../lib/event"),
      useragent = require("../lib/useragent"),
      dom = require("../lib/dom"),
      lang = require("../lib/lang"),
      KEYS = require("../lib/keys"),
      MODS = KEYS.KEY_MODS,
      BROKEN_SETDATA = 18 > useragent.isChrome,
      USE_IE_MIME_TYPE = useragent.isIE,
      TextInput = function TextInput(parentNode, host) {
        var self = this,
          text = dom.createElement("textarea");
        text.className = useragent.isIOS
          ? "ace_text-input ace_text-input-ios"
          : "ace_text-input";
        if (useragent.isTouchPad)
          text.setAttribute("x-palm-disable-auto-cap", !0);
        text.setAttribute("wrap", "off");
        text.setAttribute("autocorrect", "off");
        text.setAttribute("autocapitalize", "off");
        text.setAttribute("spellcheck", !1);
        text.style.opacity = "0";
        parentNode.insertBefore(text, parentNode.firstChild);
        var PLACEHOLDER = "\n aaaa a\n",
          copied = !1,
          cut = !1,
          pasted = !1,
          inComposition = !1,
          tempStyle = "",
          isSelectionEmpty = !0;
        try {
          var isFocused = document.activeElement === text;
        } catch (e) {}
        event.addListener(text, "blur", function(e) {
          host.onBlur(e);
          isFocused = !1;
        });
        event.addListener(text, "focus", function(e) {
          isFocused = !0;
          host.onFocus(e);
          resetSelection();
        });
        this.focus = function() {
          if (tempStyle) return text.focus();
          text.style.position = "fixed";
          text.focus();
        };
        this.blur = function() {
          text.blur();
        };
        this.isFocused = function() {
          return isFocused;
        };
        var syncSelection = lang.delayedCall(function() {
            isFocused && resetSelection(isSelectionEmpty);
          }),
          syncValue = lang.delayedCall(function() {
            if (!inComposition) {
              text.value = PLACEHOLDER;
              isFocused && resetSelection();
            }
          });
        function resetSelection(isEmpty) {
          if (inComposition) return;
          inComposition = !0;
          if (inputHandler) {
            selectionStart = 0;
            selectionEnd = isEmpty ? 0 : text.value.length - 1;
          } else {
            var selectionStart = 4,
              selectionEnd = 5;
          }
          try {
            text.setSelectionRange(selectionStart, selectionEnd);
          } catch (e) {}
          inComposition = !1;
        }
        function resetValue() {
          if (inComposition) return;
          text.value = PLACEHOLDER;
          if (useragent.isWebKit) syncValue.schedule();
        }
        useragent.isWebKit ||
          host.addEventListener("changeSelection", function() {
            if (host.selection.isEmpty() != isSelectionEmpty) {
              isSelectionEmpty = !isSelectionEmpty;
              syncSelection.schedule();
            }
          });
        resetValue();
        if (isFocused) host.onFocus();
        var isAllSelected = function isAllSelected(text) {
            return (
              0 === text.selectionStart &&
              text.selectionEnd === text.value.length
            );
          },
          onSelect = function onSelect(e) {
            if (isAllSelected(text)) {
              host.selectAll();
              resetSelection();
            } else if (inputHandler) {
              resetSelection(host.selection.isEmpty());
            }
          },
          inputHandler = null;
        this.setInputHandler = function(cb) {
          inputHandler = cb;
        };
        this.getInputHandler = function() {
          return inputHandler;
        };
        var afterContextMenu = !1,
          sendText = function sendText(data) {
            if (4 === text.selectionStart && 5 === text.selectionEnd) {
              return;
            }
            if (inputHandler) {
              data = inputHandler(data);
              inputHandler = null;
            }
            if (pasted) {
              resetSelection();
              if (data) host.onPaste(data);
              pasted = !1;
            } else if (
              data == PLACEHOLDER.substr(0) &&
              4 === text.selectionStart
            ) {
              if (afterContextMenu) host.execCommand("del", { source: "ace" });
              else host.execCommand("backspace", { source: "ace" });
            } else if (!copied) {
              if (
                data.substring(0, 9) == PLACEHOLDER &&
                data.length > PLACEHOLDER.length
              )
                data = data.substr(9);
              else if (data.substr(0, 4) == PLACEHOLDER.substr(0, 4))
                data = data.substr(4, data.length - PLACEHOLDER.length + 1);
              else if (data.charAt(data.length - 1) == PLACEHOLDER.charAt(0))
                data = data.slice(0, -1);
              if (data == PLACEHOLDER.charAt(0)) {
              } else if (data.charAt(data.length - 1) == PLACEHOLDER.charAt(0))
                data = data.slice(0, -1);
              if (data) host.onTextInput(data);
            }
            if (copied) {
              copied = !1;
            }
            if (afterContextMenu) afterContextMenu = !1;
          },
          onInput = function onInput(e) {
            if (inComposition) return;
            var data = text.value;
            sendText(data);
            resetValue();
          },
          handleClipboardData = function handleClipboardData(
            e,
            data,
            forceIEMime
          ) {
            var clipboardData = e.clipboardData || window.clipboardData;
            if (!clipboardData || BROKEN_SETDATA) return;
            var mime = USE_IE_MIME_TYPE || forceIEMime ? "Text" : "text/plain";
            try {
              if (data) {
                return !1 !== clipboardData.setData(mime, data);
              } else {
                return clipboardData.getData(mime);
              }
            } catch (e) {
              if (!forceIEMime) return handleClipboardData(e, data, !0);
            }
          },
          doCopy = function doCopy(e, isCut) {
            var data = host.getCopyText();
            if (!data) return event.preventDefault(e);
            if (handleClipboardData(e, data)) {
              if (useragent.isIOS) {
                cut = isCut;
                text.value = "\n aa" + data + "a a\n";
                text.setSelectionRange(4, 4 + data.length);
                copied = { value: data };
              }
              isCut ? host.onCut() : host.onCopy();
              if (!useragent.isIOS) event.preventDefault(e);
            } else {
              copied = !0;
              text.value = data;
              text.select();
              setTimeout(function() {
                copied = !1;
                resetValue();
                resetSelection();
                isCut ? host.onCut() : host.onCopy();
              });
            }
          },
          onCut = function onCut(e) {
            doCopy(e, !0);
          },
          onCopy = function onCopy(e) {
            doCopy(e, !1);
          },
          onPaste = function onPaste(e) {
            var data = handleClipboardData(e);
            if ("string" == typeof data) {
              if (data) host.onPaste(data, e);
              if (useragent.isIE) setTimeout(resetSelection);
              event.preventDefault(e);
            } else {
              text.value = "";
              pasted = !0;
            }
          };
        event.addCommandKeyListener(text, host.onCommandKey.bind(host));
        event.addListener(text, "select", onSelect);
        event.addListener(text, "input", onInput);
        event.addListener(text, "cut", onCut);
        event.addListener(text, "copy", onCopy);
        event.addListener(text, "paste", onPaste);
        var onCompositionStart = function onCompositionStart(e) {
            if (inComposition || !host.onCompositionStart || host.$readOnly)
              return;
            inComposition = {};
            inComposition.canUndo = host.session.$undoManager;
            host.onCompositionStart();
            setTimeout(onCompositionUpdate, 0);
            host.on("mousedown", onCompositionEnd);
            if (inComposition.canUndo && !host.selection.isEmpty()) {
              host.insert("");
              host.session.markUndoGroup();
              host.selection.clearSelection();
            }
            host.session.markUndoGroup();
          },
          onCompositionUpdate = function onCompositionUpdate() {
            if (!inComposition || !host.onCompositionUpdate || host.$readOnly)
              return;
            var val = text.value.replace(/\x01/g, "");
            if (inComposition.lastValue === val) return;
            host.onCompositionUpdate(val);
            if (inComposition.lastValue) host.undo();
            if (inComposition.canUndo) inComposition.lastValue = val;
            if (inComposition.lastValue) {
              var r = host.selection.getRange();
              host.insert(inComposition.lastValue);
              host.session.markUndoGroup();
              inComposition.range = host.selection.getRange();
              host.selection.setRange(r);
              host.selection.clearSelection();
            }
          },
          onCompositionEnd = function onCompositionEnd(e) {
            if (!host.onCompositionEnd || host.$readOnly) return;
            var c = inComposition;
            inComposition = !1;
            var timer = setTimeout(function() {
              timer = null;
              var str = text.value.replace(/\x01/g, "");
              if (inComposition) return;
              else if (str == c.lastValue) resetValue();
              else if (!c.lastValue && str) {
                resetValue();
                sendText(str);
              }
            });
            inputHandler = function compositionInputHandler(str) {
              if (timer) clearTimeout(timer);
              str = str.replace(/\x01/g, "");
              if (str == c.lastValue) return "";
              if (c.lastValue && timer) host.undo();
              return str;
            };
            host.onCompositionEnd();
            host.removeListener("mousedown", onCompositionEnd);
            if ("compositionend" == e.type && c.range) {
              host.selection.setRange(c.range);
            }
            var needsOnInput =
              (!!useragent.isChrome && 53 <= useragent.isChrome) ||
              (!!useragent.isWebKit && 603 <= useragent.isWebKit);
            if (needsOnInput) {
              onInput();
            }
          },
          syncComposition = lang.delayedCall(onCompositionUpdate, 50);
        event.addListener(text, "compositionstart", onCompositionStart);
        event.addListener(text, "compositionupdate", function() {
          syncComposition.schedule();
        });
        event.addListener(text, "keyup", function() {
          syncComposition.schedule();
        });
        event.addListener(text, "keydown", function() {
          syncComposition.schedule();
        });
        event.addListener(text, "compositionend", onCompositionEnd);
        this.getElement = function() {
          return text;
        };
        this.setReadOnly = function(readOnly) {
          text.readOnly = readOnly;
        };
        this.onContextMenu = function(e) {
          afterContextMenu = !0;
          resetSelection(host.selection.isEmpty());
          host._emit("nativecontextmenu", { target: host, domEvent: e });
          this.moveToMouse(e, !0);
        };
        this.moveToMouse = function(e, bringToFront) {
          if (!tempStyle) tempStyle = text.style.cssText;
          text.style.cssText =
            (bringToFront ? "z-index:100000;" : "") +
            "height:" +
            text.style.height +
            ";" +
            (useragent.isIE ? "opacity:0.1;" : "");
          var rect = host.container.getBoundingClientRect(),
            style = dom.computedStyle(host.container),
            top = rect.top + (parseInt(style.borderTopWidth) || 0),
            left = rect.left + (parseInt(rect.borderLeftWidth) || 0),
            maxTop = rect.bottom - top - text.clientHeight - 2,
            move = function move(e) {
              text.style.left = e.clientX - left - 2 + "px";
              text.style.top = Math.min(e.clientY - top - 2, maxTop) + "px";
            };
          move(e);
          if ("mousedown" != e.type) return;
          if (host.renderer.$keepTextAreaAtCursor)
            host.renderer.$keepTextAreaAtCursor = null;
          clearTimeout(closeTimeout);
          if (useragent.isWin)
            event.capture(host.container, move, onContextMenuClose);
        };
        this.onContextMenuClose = onContextMenuClose;
        var closeTimeout;
        function onContextMenuClose() {
          clearTimeout(closeTimeout);
          closeTimeout = setTimeout(function() {
            if (tempStyle) {
              text.style.cssText = tempStyle;
              tempStyle = "";
            }
            if (null == host.renderer.$keepTextAreaAtCursor) {
              host.renderer.$keepTextAreaAtCursor = !0;
              host.renderer.$moveTextAreaToCursor();
            }
          }, 0);
        }
        var onContextMenu = function onContextMenu(e) {
          host.textInput.onContextMenu(e);
          onContextMenuClose();
        };
        event.addListener(text, "mouseup", onContextMenu);
        event.addListener(text, "mousedown", function(e) {
          e.preventDefault();
          onContextMenuClose();
        });
        event.addListener(host.renderer.scroller, "contextmenu", onContextMenu);
        event.addListener(text, "contextmenu", onContextMenu);
        if (useragent.isIOS) {
          var typingResetTimeout = null,
            typing = !1;
          parentNode.addEventListener("keydown", function(e) {
            if (typingResetTimeout) clearTimeout(typingResetTimeout);
            typing = !0;
          });
          parentNode.addEventListener("keyup", function(e) {
            typingResetTimeout = setTimeout(function() {
              typing = !1;
            }, 100);
          });
          var detectArrowKeys = function detectArrowKeys(e) {
            if (document.activeElement !== text) return;
            if (typing) return;
            if (cut) {
              return setTimeout(function() {
                cut = !1;
              }, 100);
            }
            var selectionStart = text.selectionStart,
              selectionEnd = text.selectionEnd;
            text.setSelectionRange(4, 5);
            if (selectionStart == selectionEnd) {
              switch (selectionStart) {
                case 0:
                  host.onCommandKey(null, 0, KEYS.up);
                  break;
                case 1:
                  host.onCommandKey(null, 0, KEYS.home);
                  break;
                case 2:
                  host.onCommandKey(null, MODS.option, KEYS.left);
                  break;
                case 4:
                  host.onCommandKey(null, 0, KEYS.left);
                  break;
                case 5:
                  host.onCommandKey(null, 0, KEYS.right);
                  break;
                case 7:
                  host.onCommandKey(null, MODS.option, KEYS.right);
                  break;
                case 8:
                  host.onCommandKey(null, 0, KEYS.end);
                  break;
                case 9:
                  host.onCommandKey(null, 0, KEYS.down);
                  break;
              }
            } else {
              switch (selectionEnd) {
                case 6:
                  host.onCommandKey(null, MODS.shift, KEYS.right);
                  break;
                case 7:
                  host.onCommandKey(null, MODS.shift | MODS.option, KEYS.right);
                  break;
                case 8:
                  host.onCommandKey(null, MODS.shift, KEYS.end);
                  break;
                case 9:
                  host.onCommandKey(null, MODS.shift, KEYS.down);
                  break;
              }
              switch (selectionStart) {
                case 0:
                  host.onCommandKey(null, MODS.shift, KEYS.up);
                  break;
                case 1:
                  host.onCommandKey(null, MODS.shift, KEYS.home);
                  break;
                case 2:
                  host.onCommandKey(null, MODS.shift | MODS.option, KEYS.left);
                  break;
                case 3:
                  host.onCommandKey(null, MODS.shift, KEYS.left);
                  break;
              }
            }
          };
          document.addEventListener("selectionchange", detectArrowKeys);
          host.on("destroy", function() {
            document.removeEventListener("selectionchange", detectArrowKeys);
          });
        }
      };
    exports.TextInput = TextInput;
  }
);
ace.define(
  "ace/keyboard/textinput",
  [
    "require",
    "exports",
    "module",
    "ace/lib/event",
    "ace/lib/useragent",
    "ace/lib/dom",
    "ace/lib/lang",
    "ace/keyboard/textinput_ios"
  ],
  function(require, exports, module) {
    "use strict";
    var event = require("../lib/event"),
      useragent = require("../lib/useragent"),
      dom = require("../lib/dom"),
      lang = require("../lib/lang"),
      BROKEN_SETDATA = 18 > useragent.isChrome,
      USE_IE_MIME_TYPE = useragent.isIE,
      HAS_FOCUS_ARGS = 63 < useragent.isChrome,
      MAX_LINE_LENGTH = 400,
      TextInputIOS = require("./textinput_ios").TextInput,
      TextInput = function TextInput(parentNode, host) {
        if (useragent.isIOS) return TextInputIOS.call(this, parentNode, host);
        var text = dom.createElement("textarea");
        text.className = "ace_text-input";
        text.setAttribute("wrap", "off");
        text.setAttribute("autocorrect", "off");
        text.setAttribute("autocapitalize", "off");
        text.setAttribute("spellcheck", !1);
        text.style.opacity = "0";
        parentNode.insertBefore(text, parentNode.firstChild);
        var copied = !1,
          pasted = !1,
          inComposition = !1,
          sendingText = !1,
          tempStyle = "",
          isSelectionEmpty = !0,
          copyWithEmptySelection = !1;
        if (!useragent.isMobile) text.style.fontSize = "1px";
        var commandMode = !1,
          ignoreFocusEvents = !1,
          lastValue = "",
          lastSelectionStart = 0,
          lastSelectionEnd = 0;
        try {
          var isFocused = document.activeElement === text;
        } catch (e) {}
        event.addListener(text, "blur", function(e) {
          if (ignoreFocusEvents) return;
          host.onBlur(e);
          isFocused = !1;
        });
        event.addListener(text, "focus", function(e) {
          if (ignoreFocusEvents) return;
          isFocused = !0;
          host.onFocus(e);
          resetSelection();
        });
        this.$focusScroll = !1;
        this.focus = function() {
          if (tempStyle || HAS_FOCUS_ARGS || "browser" == this.$focusScroll)
            return text.focus({ preventScroll: !0 });
          if (!document.documentElement.contains(text)) return;
          var top = text.style.top;
          text.style.position = "fixed";
          text.style.top = "0px";
          var isTransformed = 0 != text.getBoundingClientRect().top,
            ancestors = [];
          if (isTransformed) {
            var t = text.parentElement;
            while (t && 1 == t.nodeType) {
              ancestors.push(t);
              t.setAttribute("ace_nocontext", !0);
              if (!t.parentElement && t.getRootNode) t = t.getRootNode().host;
              else t = t.parentElement;
            }
          }
          text.focus({ preventScroll: !0 });
          if (isTransformed) {
            ancestors.forEach(function(p) {
              p.removeAttribute("ace_nocontext");
            });
          }
          setTimeout(function() {
            text.style.position = "";
            if ("0px" == text.style.top) text.style.top = top;
          }, 0);
        };
        this.blur = function() {
          text.blur();
        };
        this.isFocused = function() {
          return isFocused;
        };
        host.on("beforeEndOperation", function() {
          if (host.curOp && "insertstring" == host.curOp.command.name) return;
          if (inComposition) {
            lastValue = text.value = "";
            onCompositionEnd();
          }
          resetSelection();
        });
        function resetSelection() {
          if (inComposition || sendingText) return;
          if (!isFocused && !afterContextMenu) return;
          inComposition = !0;
          var selection = host.selection,
            range = selection.getRange(),
            row = selection.cursor.row,
            selectionStart = range.start.column,
            selectionEnd = range.end.column,
            line = host.session.getLine(row);
          if (range.start.row != row) {
            var prevLine = host.session.getLine(row - 1);
            selectionStart = range.start.row < row - 1 ? 0 : selectionStart;
            selectionEnd += prevLine.length + 1;
            line = prevLine + "\n" + line;
          } else if (range.end.row != row) {
            var nextLine = host.session.getLine(row + 1);
            selectionEnd =
              range.end.row > row + 1 ? nextLine.length : selectionEnd;
            selectionEnd += line.length + 1;
            line = line + "\n" + nextLine;
          }
          if (line.length > MAX_LINE_LENGTH) {
            if (
              selectionStart < MAX_LINE_LENGTH &&
              selectionEnd < MAX_LINE_LENGTH
            ) {
              line = line.slice(0, MAX_LINE_LENGTH);
            } else {
              line = "\n";
              selectionStart = 0;
              selectionEnd = 1;
            }
          }
          var newValue = line + "\n\n";
          if (newValue != lastValue) {
            text.value = lastValue = newValue;
            lastSelectionStart = lastSelectionEnd = newValue.length;
          }
          if (afterContextMenu) {
            lastSelectionStart = text.selectionStart;
            lastSelectionEnd = text.selectionEnd;
          }
          if (
            lastSelectionEnd != selectionEnd ||
            lastSelectionStart != selectionStart
          ) {
            try {
              text.setSelectionRange(selectionStart, selectionEnd);
              lastSelectionStart = selectionStart;
              lastSelectionEnd = selectionEnd;
            } catch (e) {}
          }
          inComposition = !1;
        }
        if (isFocused) host.onFocus();
        var isAllSelected = function isAllSelected(text) {
            return (
              0 === text.selectionStart &&
              text.selectionEnd >= lastValue.length &&
              text.value === lastValue &&
              lastValue &&
              text.selectionEnd !== lastSelectionEnd
            );
          },
          onSelect = function onSelect(e) {
            if (inComposition) return;
            if (copied) {
              copied = !1;
            } else if (isAllSelected(text)) {
              host.selectAll();
              resetSelection();
            }
          },
          inputHandler = null;
        this.setInputHandler = function(cb) {
          inputHandler = cb;
        };
        this.getInputHandler = function() {
          return inputHandler;
        };
        var afterContextMenu = !1,
          sendText = function sendText(value, fromInput) {
            if (afterContextMenu) afterContextMenu = !1;
            if (pasted) {
              resetSelection();
              if (value) host.onPaste(value);
              pasted = !1;
              return "";
            } else {
              var selectionStart = text.selectionStart,
                selectionEnd = text.selectionEnd,
                extendLeft = lastSelectionStart,
                extendRight = lastValue.length - lastSelectionEnd,
                inserted = value,
                restoreStart = value.length - selectionStart,
                restoreEnd = value.length - selectionEnd,
                i = 0;
              while (0 < extendLeft && lastValue[i] == value[i]) {
                i++;
                extendLeft--;
              }
              inserted = inserted.slice(i);
              i = 1;
              while (
                0 < extendRight &&
                lastValue.length - i > lastSelectionStart - 1 &&
                lastValue[lastValue.length - i] == value[value.length - i]
              ) {
                i++;
                extendRight--;
              }
              restoreStart -= i - 1;
              restoreEnd -= i - 1;
              inserted = inserted.slice(0, inserted.length - i + 1);
              if (
                !fromInput &&
                restoreStart == inserted.length &&
                !extendLeft &&
                !extendRight &&
                !restoreEnd
              )
                return "";
              sendingText = !0;
              if (
                (inserted &&
                  !extendLeft &&
                  !extendRight &&
                  !restoreStart &&
                  !restoreEnd) ||
                commandMode
              ) {
                host.onTextInput(inserted);
              } else {
                host.onTextInput(inserted, {
                  extendLeft: extendLeft,
                  extendRight: extendRight,
                  restoreStart: restoreStart,
                  restoreEnd: restoreEnd
                });
              }
              sendingText = !1;
              lastValue = value;
              lastSelectionStart = selectionStart;
              lastSelectionEnd = selectionEnd;
              return inserted;
            }
          },
          onInput = function onInput(e) {
            if (inComposition) return onCompositionUpdate();
            var data = text.value,
              inserted = sendText(data, !0);
            if (data.length > MAX_LINE_LENGTH + 100 || /\n/.test(inserted))
              resetSelection();
          },
          handleClipboardData = function handleClipboardData(
            e,
            data,
            forceIEMime
          ) {
            var clipboardData = e.clipboardData || window.clipboardData;
            if (!clipboardData || BROKEN_SETDATA) return;
            var mime = USE_IE_MIME_TYPE || forceIEMime ? "Text" : "text/plain";
            try {
              if (data) {
                return !1 !== clipboardData.setData(mime, data);
              } else {
                return clipboardData.getData(mime);
              }
            } catch (e) {
              if (!forceIEMime) return handleClipboardData(e, data, !0);
            }
          },
          doCopy = function doCopy(e, isCut) {
            var data = host.getCopyText();
            if (!data) return event.preventDefault(e);
            if (handleClipboardData(e, data)) {
              isCut ? host.onCut() : host.onCopy();
              event.preventDefault(e);
            } else {
              copied = !0;
              text.value = data;
              text.select();
              setTimeout(function() {
                copied = !1;
                resetSelection();
                isCut ? host.onCut() : host.onCopy();
              });
            }
          },
          onCut = function onCut(e) {
            doCopy(e, !0);
          },
          onCopy = function onCopy(e) {
            doCopy(e, !1);
          },
          onPaste = function onPaste(e) {
            var data = handleClipboardData(e);
            if ("string" == typeof data) {
              if (data) host.onPaste(data, e);
              if (useragent.isIE) setTimeout(resetSelection);
              event.preventDefault(e);
            } else {
              text.value = "";
              pasted = !0;
            }
          };
        event.addCommandKeyListener(text, host.onCommandKey.bind(host));
        event.addListener(text, "select", onSelect);
        event.addListener(text, "input", onInput);
        event.addListener(text, "cut", onCut);
        event.addListener(text, "copy", onCopy);
        event.addListener(text, "paste", onPaste);
        if (!("oncut" in text) || !("oncopy" in text) || !("onpaste" in text)) {
          event.addListener(parentNode, "keydown", function(e) {
            if ((useragent.isMac && !e.metaKey) || !e.ctrlKey) return;
            switch (e.keyCode) {
              case 67:
                onCopy(e);
                break;
              case 86:
                onPaste(e);
                break;
              case 88:
                onCut(e);
                break;
            }
          });
        }
        var onCompositionStart = function onCompositionStart(e) {
            if (inComposition || !host.onCompositionStart || host.$readOnly)
              return;
            inComposition = {};
            if (commandMode) return;
            setTimeout(onCompositionUpdate, 0);
            host.on("mousedown", cancelComposition);
            var range = host.getSelectionRange();
            range.end.row = range.start.row;
            range.end.column = range.start.column;
            inComposition.markerRange = range;
            inComposition.selectionStart = lastSelectionStart;
            host.onCompositionStart(inComposition);
            if (inComposition.useTextareaForIME) {
              text.value = "";
              lastValue = "";
              lastSelectionStart = 0;
              lastSelectionEnd = 0;
            } else {
              if (text.msGetInputContext)
                inComposition.context = text.msGetInputContext();
              if (text.getInputContext)
                inComposition.context = text.getInputContext();
            }
          },
          onCompositionUpdate = function onCompositionUpdate() {
            if (!inComposition || !host.onCompositionUpdate || host.$readOnly)
              return;
            if (commandMode) return cancelComposition();
            if (inComposition.useTextareaForIME) {
              host.onCompositionUpdate(text.value);
            } else {
              var data = text.value;
              sendText(data);
              if (inComposition.markerRange) {
                if (inComposition.context) {
                  inComposition.markerRange.start.column = inComposition.selectionStart =
                    inComposition.context.compositionStartOffset;
                }
                inComposition.markerRange.end.column =
                  inComposition.markerRange.start.column +
                  lastSelectionEnd -
                  inComposition.selectionStart;
              }
            }
          },
          onCompositionEnd = function onCompositionEnd(e) {
            if (!host.onCompositionEnd || host.$readOnly) return;
            inComposition = !1;
            host.onCompositionEnd();
            host.off("mousedown", cancelComposition);
            if (e) onInput();
          };
        function cancelComposition() {
          ignoreFocusEvents = !0;
          text.blur();
          text.focus();
          ignoreFocusEvents = !1;
        }
        var syncComposition = lang
          .delayedCall(onCompositionUpdate, 50)
          .schedule.bind(null, null);
        function onKeyup(e) {
          if (27 == e.keyCode && text.value.length < text.selectionStart) {
            if (!inComposition) lastValue = text.value;
            lastSelectionStart = lastSelectionEnd = -1;
            resetSelection();
          }
          syncComposition();
        }
        event.addListener(text, "compositionstart", onCompositionStart);
        event.addListener(text, "compositionupdate", onCompositionUpdate);
        event.addListener(text, "keyup", onKeyup);
        event.addListener(text, "keydown", syncComposition);
        event.addListener(text, "compositionend", onCompositionEnd);
        this.getElement = function() {
          return text;
        };
        this.setCommandMode = function(value) {
          commandMode = value;
          text.readOnly = !1;
        };
        this.setReadOnly = function(readOnly) {
          if (!commandMode) text.readOnly = readOnly;
        };
        this.setCopyWithEmptySelection = function(value) {
          copyWithEmptySelection = value;
        };
        this.onContextMenu = function(e) {
          afterContextMenu = !0;
          resetSelection();
          host._emit("nativecontextmenu", { target: host, domEvent: e });
          this.moveToMouse(e, !0);
        };
        this.moveToMouse = function(e, bringToFront) {
          if (!tempStyle) tempStyle = text.style.cssText;
          text.style.cssText =
            (bringToFront ? "z-index:100000;" : "") +
            (useragent.isIE ? "opacity:0.1;" : "") +
            "text-indent: -" +
            0.5 *
              ((lastSelectionStart + lastSelectionEnd) *
                host.renderer.characterWidth) +
            "px;";
          var rect = host.container.getBoundingClientRect(),
            style = dom.computedStyle(host.container),
            top = rect.top + (parseInt(style.borderTopWidth) || 0),
            left = rect.left + (parseInt(rect.borderLeftWidth) || 0),
            maxTop = rect.bottom - top - text.clientHeight - 2,
            move = function move(e) {
              text.style.left = e.clientX - left - 2 + "px";
              text.style.top = Math.min(e.clientY - top - 2, maxTop) + "px";
            };
          move(e);
          if ("mousedown" != e.type) return;
          if (host.renderer.$keepTextAreaAtCursor)
            host.renderer.$keepTextAreaAtCursor = null;
          clearTimeout(closeTimeout);
          if (useragent.isWin)
            event.capture(host.container, move, onContextMenuClose);
        };
        this.onContextMenuClose = onContextMenuClose;
        var closeTimeout;
        function onContextMenuClose() {
          clearTimeout(closeTimeout);
          closeTimeout = setTimeout(function() {
            if (tempStyle) {
              text.style.cssText = tempStyle;
              tempStyle = "";
            }
            if (null == host.renderer.$keepTextAreaAtCursor) {
              host.renderer.$keepTextAreaAtCursor = !0;
              host.renderer.$moveTextAreaToCursor();
            }
          }, 0);
        }
        var onContextMenu = function onContextMenu(e) {
          host.textInput.onContextMenu(e);
          onContextMenuClose();
        };
        event.addListener(text, "mouseup", onContextMenu);
        event.addListener(text, "mousedown", function(e) {
          e.preventDefault();
          onContextMenuClose();
        });
        event.addListener(host.renderer.scroller, "contextmenu", onContextMenu);
        event.addListener(text, "contextmenu", onContextMenu);
      };
    exports.TextInput = TextInput;
  }
);
ace.define(
  "ace/mouse/default_handlers",
  ["require", "exports", "module", "ace/lib/useragent"],
  function(require, exports, module) {
    "use strict";
    var _Mathpow = Math.pow,
      _Mathabs3 = Math.abs,
      useragent = require("../lib/useragent"),
      DRAG_OFFSET = 0,
      SCROLL_COOLDOWN_T = 250;
    function DefaultHandlers(mouseHandler) {
      mouseHandler.$clickSelection = null;
      var editor = mouseHandler.editor;
      editor.setDefaultHandler(
        "mousedown",
        this.onMouseDown.bind(mouseHandler)
      );
      editor.setDefaultHandler(
        "dblclick",
        this.onDoubleClick.bind(mouseHandler)
      );
      editor.setDefaultHandler(
        "tripleclick",
        this.onTripleClick.bind(mouseHandler)
      );
      editor.setDefaultHandler(
        "quadclick",
        this.onQuadClick.bind(mouseHandler)
      );
      editor.setDefaultHandler(
        "mousewheel",
        this.onMouseWheel.bind(mouseHandler)
      );
      editor.setDefaultHandler(
        "touchmove",
        this.onTouchMove.bind(mouseHandler)
      );
      var exports = [
        "select",
        "startSelect",
        "selectEnd",
        "selectAllEnd",
        "selectByWordsEnd",
        "selectByLinesEnd",
        "dragWait",
        "dragWaitEnd",
        "focusWait"
      ];
      exports.forEach(function(x) {
        mouseHandler[x] = this[x];
      }, this);
      mouseHandler.selectByLines = this.extendSelectionBy.bind(
        mouseHandler,
        "getLineRange"
      );
      mouseHandler.selectByWords = this.extendSelectionBy.bind(
        mouseHandler,
        "getWordRange"
      );
    }
    (function() {
      this.onMouseDown = function(ev) {
        var inSelection = ev.inSelection(),
          pos = ev.getDocumentPosition();
        this.mousedownEvent = ev;
        var editor = this.editor,
          button = ev.getButton();
        if (0 !== button) {
          var selectionRange = editor.getSelectionRange(),
            selectionEmpty = selectionRange.isEmpty();
          if (selectionEmpty || 1 == button)
            editor.selection.moveToPosition(pos);
          if (2 == button) {
            editor.textInput.onContextMenu(ev.domEvent);
            if (!useragent.isMozilla) ev.preventDefault();
          }
          return;
        }
        this.mousedownEvent.time = Date.now();
        if (inSelection && !editor.isFocused()) {
          editor.focus();
          if (
            this.$focusTimeout &&
            !this.$clickSelection &&
            !editor.inMultiSelectMode
          ) {
            this.setState("focusWait");
            this.captureMouse(ev);
            return;
          }
        }
        this.captureMouse(ev);
        this.startSelect(pos, 1 < ev.domEvent._clicks);
        return ev.preventDefault();
      };
      this.startSelect = function(pos, waitForClickSelection) {
        pos =
          pos || this.editor.renderer.screenToTextCoordinates(this.x, this.y);
        var editor = this.editor;
        if (!this.mousedownEvent) return;
        if (this.mousedownEvent.getShiftKey())
          editor.selection.selectToPosition(pos);
        else if (!waitForClickSelection) editor.selection.moveToPosition(pos);
        if (!waitForClickSelection) this.select();
        if (editor.renderer.scroller.setCapture) {
          editor.renderer.scroller.setCapture();
        }
        editor.setStyle("ace_selecting");
        this.setState("select");
      };
      this.select = function() {
        var anchor,
          editor = this.editor,
          cursor = editor.renderer.screenToTextCoordinates(this.x, this.y);
        if (this.$clickSelection) {
          var cmp = this.$clickSelection.comparePoint(cursor);
          if (-1 == cmp) {
            anchor = this.$clickSelection.end;
          } else if (1 == cmp) {
            anchor = this.$clickSelection.start;
          } else {
            var orientedRange = calcRangeOrientation(
              this.$clickSelection,
              cursor
            );
            cursor = orientedRange.cursor;
            anchor = orientedRange.anchor;
          }
          editor.selection.setSelectionAnchor(anchor.row, anchor.column);
        }
        editor.selection.selectToPosition(cursor);
        editor.renderer.scrollCursorIntoView();
      };
      this.extendSelectionBy = function(unitName) {
        var anchor,
          editor = this.editor,
          cursor = editor.renderer.screenToTextCoordinates(this.x, this.y),
          range = editor.selection[unitName](cursor.row, cursor.column);
        if (this.$clickSelection) {
          var cmpStart = this.$clickSelection.comparePoint(range.start),
            cmpEnd = this.$clickSelection.comparePoint(range.end);
          if (-1 == cmpStart && 0 >= cmpEnd) {
            anchor = this.$clickSelection.end;
            if (
              range.end.row != cursor.row ||
              range.end.column != cursor.column
            )
              cursor = range.start;
          } else if (1 == cmpEnd && 0 <= cmpStart) {
            anchor = this.$clickSelection.start;
            if (
              range.start.row != cursor.row ||
              range.start.column != cursor.column
            )
              cursor = range.end;
          } else if (-1 == cmpStart && 1 == cmpEnd) {
            cursor = range.end;
            anchor = range.start;
          } else {
            var orientedRange = calcRangeOrientation(
              this.$clickSelection,
              cursor
            );
            cursor = orientedRange.cursor;
            anchor = orientedRange.anchor;
          }
          editor.selection.setSelectionAnchor(anchor.row, anchor.column);
        }
        editor.selection.selectToPosition(cursor);
        editor.renderer.scrollCursorIntoView();
      };
      this.selectEnd = this.selectAllEnd = this.selectByWordsEnd = this.selectByLinesEnd = function() {
        this.$clickSelection = null;
        this.editor.unsetStyle("ace_selecting");
        if (this.editor.renderer.scroller.releaseCapture) {
          this.editor.renderer.scroller.releaseCapture();
        }
      };
      this.focusWait = function() {
        var distance = calcDistance(
            this.mousedownEvent.x,
            this.mousedownEvent.y,
            this.x,
            this.y
          ),
          time = Date.now();
        if (
          distance > DRAG_OFFSET ||
          time - this.mousedownEvent.time > this.$focusTimeout
        )
          this.startSelect(this.mousedownEvent.getDocumentPosition());
      };
      this.onDoubleClick = function(ev) {
        var pos = ev.getDocumentPosition(),
          editor = this.editor,
          session = editor.session,
          range = session.getBracketRange(pos);
        if (range) {
          if (range.isEmpty()) {
            range.start.column--;
            range.end.column++;
          }
          this.setState("select");
        } else {
          range = editor.selection.getWordRange(pos.row, pos.column);
          this.setState("selectByWords");
        }
        this.$clickSelection = range;
        this.select();
      };
      this.onTripleClick = function(ev) {
        var pos = ev.getDocumentPosition(),
          editor = this.editor;
        this.setState("selectByLines");
        var range = editor.getSelectionRange();
        if (range.isMultiLine() && range.contains(pos.row, pos.column)) {
          this.$clickSelection = editor.selection.getLineRange(range.start.row);
          this.$clickSelection.end = editor.selection.getLineRange(
            range.end.row
          ).end;
        } else {
          this.$clickSelection = editor.selection.getLineRange(pos.row);
        }
        this.select();
      };
      this.onQuadClick = function(ev) {
        var editor = this.editor;
        editor.selectAll();
        this.$clickSelection = editor.getSelectionRange();
        this.setState("selectAll");
      };
      this.onMouseWheel = function(ev) {
        if (ev.getAccelKey()) return;
        if (ev.getShiftKey() && ev.wheelY && !ev.wheelX) {
          ev.wheelX = ev.wheelY;
          ev.wheelY = 0;
        }
        var editor = this.editor;
        if (!this.$lastScroll)
          this.$lastScroll = { t: 0, vx: 0, vy: 0, allowed: 0 };
        var prevScroll = this.$lastScroll,
          t = ev.domEvent.timeStamp,
          dt = t - prevScroll.t,
          vx = dt ? ev.wheelX / dt : prevScroll.vx,
          vy = dt ? ev.wheelY / dt : prevScroll.vy;
        if (dt < SCROLL_COOLDOWN_T) {
          vx = (vx + prevScroll.vx) / 2;
          vy = (vy + prevScroll.vy) / 2;
        }
        var direction = _Mathabs3(vx / vy),
          canScroll = !1;
        if (
          1 <= direction &&
          editor.renderer.isScrollableBy(ev.wheelX * ev.speed, 0)
        )
          canScroll = !0;
        if (
          1 >= direction &&
          editor.renderer.isScrollableBy(0, ev.wheelY * ev.speed)
        )
          canScroll = !0;
        if (canScroll) {
          prevScroll.allowed = t;
        } else if (t - prevScroll.allowed < SCROLL_COOLDOWN_T) {
          var isSlower =
            _Mathabs3(vx) <= 1.1 * _Mathabs3(prevScroll.vx) &&
            _Mathabs3(vy) <= 1.1 * _Mathabs3(prevScroll.vy);
          if (isSlower) {
            canScroll = !0;
            prevScroll.allowed = t;
          } else {
            prevScroll.allowed = 0;
          }
        }
        prevScroll.t = t;
        prevScroll.vx = vx;
        prevScroll.vy = vy;
        if (canScroll) {
          editor.renderer.scrollBy(ev.wheelX * ev.speed, ev.wheelY * ev.speed);
          return ev.stop();
        }
      };
      this.onTouchMove = function(ev) {
        this.editor._emit("mousewheel", ev);
      };
    }.call(DefaultHandlers.prototype));
    exports.DefaultHandlers = DefaultHandlers;
    function calcDistance(ax, ay, bx, by) {
      return Math.sqrt(_Mathpow(bx - ax, 2) + _Mathpow(by - ay, 2));
    }
    function calcRangeOrientation(range, cursor) {
      if (range.start.row == range.end.row)
        var cmp = 2 * cursor.column - range.start.column - range.end.column;
      else if (
        range.start.row == range.end.row - 1 &&
        !range.start.column &&
        !range.end.column
      )
        var cmp = cursor.column - 4;
      else var cmp = 2 * cursor.row - range.start.row - range.end.row;
      if (0 > cmp) return { cursor: range.start, anchor: range.end };
      else return { cursor: range.end, anchor: range.start };
    }
  }
);
ace.define(
  "ace/tooltip",
  ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom"],
  function(require, exports, module) {
    "use strict";
    var oop = require("./lib/oop"),
      dom = require("./lib/dom");
    function Tooltip(parentNode) {
      this.isOpen = !1;
      this.$element = null;
      this.$parentNode = parentNode;
    }
    (function() {
      this.$init = function() {
        this.$element = dom.createElement("div");
        this.$element.className = "ace_tooltip";
        this.$element.style.display = "none";
        this.$parentNode.appendChild(this.$element);
        return this.$element;
      };
      this.getElement = function() {
        return this.$element || this.$init();
      };
      this.setText = function(text) {
        this.getElement().textContent = text;
      };
      this.setHtml = function(html) {
        this.getElement().innerHTML = html;
      };
      this.setPosition = function(x, y) {
        this.getElement().style.left = x + "px";
        this.getElement().style.top = y + "px";
      };
      this.setClassName = function(className) {
        dom.addCssClass(this.getElement(), className);
      };
      this.show = function(text, x, y) {
        if (null != text) this.setText(text);
        if (null != x && null != y) this.setPosition(x, y);
        if (!this.isOpen) {
          this.getElement().style.display = "block";
          this.isOpen = !0;
        }
      };
      this.hide = function() {
        if (this.isOpen) {
          this.getElement().style.display = "none";
          this.isOpen = !1;
        }
      };
      this.getHeight = function() {
        return this.getElement().offsetHeight;
      };
      this.getWidth = function() {
        return this.getElement().offsetWidth;
      };
      this.destroy = function() {
        this.isOpen = !1;
        if (this.$element && this.$element.parentNode) {
          this.$element.parentNode.removeChild(this.$element);
        }
      };
    }.call(Tooltip.prototype));
    exports.Tooltip = Tooltip;
  }
);
ace.define(
  "ace/mouse/default_gutter_handler",
  [
    "require",
    "exports",
    "module",
    "ace/lib/dom",
    "ace/lib/oop",
    "ace/lib/event",
    "ace/tooltip"
  ],
  function(require, exports, module) {
    "use strict";
    var dom = require("../lib/dom"),
      oop = require("../lib/oop"),
      event = require("../lib/event"),
      Tooltip = require("../tooltip").Tooltip;
    function GutterHandler(mouseHandler) {
      var editor = mouseHandler.editor,
        gutter = editor.renderer.$gutterLayer,
        tooltip = new GutterTooltip(editor.container);
      mouseHandler.editor.setDefaultHandler("guttermousedown", function(e) {
        if (!editor.isFocused() || 0 != e.getButton()) return;
        var gutterRegion = gutter.getRegion(e);
        if ("foldWidgets" == gutterRegion) return;
        var row = e.getDocumentPosition().row,
          selection = editor.session.selection;
        if (e.getShiftKey()) selection.selectTo(row, 0);
        else {
          if (2 == e.domEvent.detail) {
            editor.selectAll();
            return e.preventDefault();
          }
          mouseHandler.$clickSelection = editor.selection.getLineRange(row);
        }
        mouseHandler.setState("selectByLines");
        mouseHandler.captureMouse(e);
        return e.preventDefault();
      });
      var tooltipTimeout, mouseEvent, tooltipAnnotation;
      function showTooltip() {
        var row = mouseEvent.getDocumentPosition().row,
          annotation = gutter.$annotations[row];
        if (!annotation) return hideTooltip();
        var maxRow = editor.session.getLength();
        if (row == maxRow) {
          var screenRow = editor.renderer.pixelToScreenCoordinates(
              0,
              mouseEvent.y
            ).row,
            pos = mouseEvent.$pos;
          if (
            screenRow > editor.session.documentToScreenRow(pos.row, pos.column)
          )
            return hideTooltip();
        }
        if (tooltipAnnotation == annotation) return;
        tooltipAnnotation = annotation.text.join("<br/>");
        tooltip.setHtml(tooltipAnnotation);
        tooltip.show();
        editor._signal("showGutterTooltip", tooltip);
        editor.on("mousewheel", hideTooltip);
        if (mouseHandler.$tooltipFollowsMouse) {
          moveTooltip(mouseEvent);
        } else {
          var gutterElement = mouseEvent.domEvent.target,
            rect = gutterElement.getBoundingClientRect(),
            style = tooltip.getElement().style;
          style.left = rect.right + "px";
          style.top = rect.bottom + "px";
        }
      }
      function hideTooltip() {
        if (tooltipTimeout) tooltipTimeout = clearTimeout(tooltipTimeout);
        if (tooltipAnnotation) {
          tooltip.hide();
          tooltipAnnotation = null;
          editor._signal("hideGutterTooltip", tooltip);
          editor.removeEventListener("mousewheel", hideTooltip);
        }
      }
      function moveTooltip(e) {
        tooltip.setPosition(e.x, e.y);
      }
      mouseHandler.editor.setDefaultHandler("guttermousemove", function(e) {
        var target = e.domEvent.target || e.domEvent.srcElement;
        if (dom.hasCssClass(target, "ace_fold-widget")) return hideTooltip();
        if (tooltipAnnotation && mouseHandler.$tooltipFollowsMouse)
          moveTooltip(e);
        mouseEvent = e;
        if (tooltipTimeout) return;
        tooltipTimeout = setTimeout(function() {
          tooltipTimeout = null;
          if (mouseEvent && !mouseHandler.isMousePressed) showTooltip();
          else hideTooltip();
        }, 50);
      });
      event.addListener(editor.renderer.$gutter, "mouseout", function(e) {
        mouseEvent = null;
        if (!tooltipAnnotation || tooltipTimeout) return;
        tooltipTimeout = setTimeout(function() {
          tooltipTimeout = null;
          hideTooltip();
        }, 50);
      });
      editor.on("changeSession", hideTooltip);
    }
    function GutterTooltip(parentNode) {
      Tooltip.call(this, parentNode);
    }
    oop.inherits(GutterTooltip, Tooltip);
    (function() {
      this.setPosition = function(x, y) {
        var windowWidth =
            window.innerWidth || document.documentElement.clientWidth,
          windowHeight =
            window.innerHeight || document.documentElement.clientHeight,
          width = this.getWidth(),
          height = this.getHeight();
        x += 15;
        y += 15;
        if (x + width > windowWidth) {
          x -= x + width - windowWidth;
        }
        if (y + height > windowHeight) {
          y -= 20 + height;
        }
        Tooltip.prototype.setPosition.call(this, x, y);
      };
    }.call(GutterTooltip.prototype));
    exports.GutterHandler = GutterHandler;
  }
);
ace.define(
  "ace/mouse/mouse_event",
  ["require", "exports", "module", "ace/lib/event", "ace/lib/useragent"],
  function(require, exports, module) {
    "use strict";
    var event = require("../lib/event"),
      useragent = require("../lib/useragent"),
      MouseEvent = (exports.MouseEvent = function(domEvent, editor) {
        this.domEvent = domEvent;
        this.editor = editor;
        this.x = this.clientX = domEvent.clientX;
        this.y = this.clientY = domEvent.clientY;
        this.$pos = null;
        this.$inSelection = null;
        this.propagationStopped = !1;
        this.defaultPrevented = !1;
      });
    (function() {
      this.stopPropagation = function() {
        event.stopPropagation(this.domEvent);
        this.propagationStopped = !0;
      };
      this.preventDefault = function() {
        event.preventDefault(this.domEvent);
        this.defaultPrevented = !0;
      };
      this.stop = function() {
        this.stopPropagation();
        this.preventDefault();
      };
      this.getDocumentPosition = function() {
        if (this.$pos) return this.$pos;
        this.$pos = this.editor.renderer.screenToTextCoordinates(
          this.clientX,
          this.clientY
        );
        return this.$pos;
      };
      this.inSelection = function() {
        if (null !== this.$inSelection) return this.$inSelection;
        var editor = this.editor,
          selectionRange = editor.getSelectionRange();
        if (selectionRange.isEmpty()) this.$inSelection = !1;
        else {
          var pos = this.getDocumentPosition();
          this.$inSelection = selectionRange.contains(pos.row, pos.column);
        }
        return this.$inSelection;
      };
      this.getButton = function() {
        return event.getButton(this.domEvent);
      };
      this.getShiftKey = function() {
        return this.domEvent.shiftKey;
      };
      this.getAccelKey = useragent.isMac
        ? function() {
            return this.domEvent.metaKey;
          }
        : function() {
            return this.domEvent.ctrlKey;
          };
    }.call(MouseEvent.prototype));
  }
);
ace.define(
  "ace/mouse/dragdrop_handler",
  [
    "require",
    "exports",
    "module",
    "ace/lib/dom",
    "ace/lib/event",
    "ace/lib/useragent"
  ],
  function(require, exports, module) {
    "use strict";
    var _Mathpow2 = Math.pow,
      _Mathmin2 = Math.min,
      dom = require("../lib/dom"),
      event = require("../lib/event"),
      useragent = require("../lib/useragent"),
      AUTOSCROLL_DELAY = 200,
      SCROLL_CURSOR_DELAY = 200,
      SCROLL_CURSOR_HYSTERESIS = 5;
    function DragdropHandler(mouseHandler) {
      var editor = mouseHandler.editor,
        blankImage = dom.createElement("img");
      blankImage.src =
        "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
      if (useragent.isOpera)
        blankImage.style.cssText =
          "width:1px;height:1px;position:fixed;top:0;left:0;z-index:2147483647;opacity:0;";
      var exports = [
        "dragWait",
        "dragWaitEnd",
        "startDrag",
        "dragReadyEnd",
        "onMouseDrag"
      ];
      exports.forEach(function(x) {
        mouseHandler[x] = this[x];
      }, this);
      editor.addEventListener("mousedown", this.onMouseDown.bind(mouseHandler));
      var mouseTarget = editor.container,
        dragSelectionMarker,
        x,
        y,
        timerId,
        range,
        dragCursor,
        counter = 0,
        dragOperation,
        isInternal,
        autoScrollStartTime,
        cursorMovedTime,
        cursorPointOnCaretMoved;
      this.onDragStart = function(e) {
        if (this.cancelDrag || !mouseTarget.draggable) {
          var self = this;
          setTimeout(function() {
            self.startSelect();
            self.captureMouse(e);
          }, 0);
          return e.preventDefault();
        }
        range = editor.getSelectionRange();
        var dataTransfer = e.dataTransfer;
        dataTransfer.effectAllowed = editor.getReadOnly() ? "copy" : "copyMove";
        if (useragent.isOpera) {
          editor.container.appendChild(blankImage);
          blankImage.scrollTop = 0;
        }
        dataTransfer.setDragImage &&
          dataTransfer.setDragImage(blankImage, 0, 0);
        if (useragent.isOpera) {
          editor.container.removeChild(blankImage);
        }
        dataTransfer.clearData();
        dataTransfer.setData("Text", editor.session.getTextRange());
        isInternal = !0;
        this.setState("drag");
      };
      this.onDragEnd = function(e) {
        mouseTarget.draggable = !1;
        isInternal = !1;
        this.setState(null);
        if (!editor.getReadOnly()) {
          var dropEffect = e.dataTransfer.dropEffect;
          if (!dragOperation && "move" == dropEffect)
            editor.session.remove(editor.getSelectionRange());
          editor.renderer.$cursorLayer.setBlinking(!0);
        }
        this.editor.unsetStyle("ace_dragging");
        this.editor.renderer.setCursorStyle("");
      };
      this.onDragEnter = function(e) {
        if (editor.getReadOnly() || !canAccept(e.dataTransfer)) return;
        x = e.clientX;
        y = e.clientY;
        if (!dragSelectionMarker) addDragMarker();
        counter++;
        e.dataTransfer.dropEffect = dragOperation = getDropEffect(e);
        return event.preventDefault(e);
      };
      this.onDragOver = function(e) {
        if (editor.getReadOnly() || !canAccept(e.dataTransfer)) return;
        x = e.clientX;
        y = e.clientY;
        if (!dragSelectionMarker) {
          addDragMarker();
          counter++;
        }
        if (null !== onMouseMoveTimer) onMouseMoveTimer = null;
        e.dataTransfer.dropEffect = dragOperation = getDropEffect(e);
        return event.preventDefault(e);
      };
      this.onDragLeave = function(e) {
        counter--;
        if (0 >= counter && dragSelectionMarker) {
          clearDragMarker();
          dragOperation = null;
          return event.preventDefault(e);
        }
      };
      this.onDrop = function(e) {
        if (!dragCursor) return;
        var dataTransfer = e.dataTransfer;
        if (isInternal) {
          switch (dragOperation) {
            case "move":
              if (range.contains(dragCursor.row, dragCursor.column)) {
                range = { start: dragCursor, end: dragCursor };
              } else {
                range = editor.moveText(range, dragCursor);
              }
              break;
            case "copy":
              range = editor.moveText(range, dragCursor, !0);
              break;
          }
        } else {
          var dropData = dataTransfer.getData("Text");
          range = {
            start: dragCursor,
            end: editor.session.insert(dragCursor, dropData)
          };
          editor.focus();
          dragOperation = null;
        }
        clearDragMarker();
        return event.preventDefault(e);
      };
      event.addListener(
        mouseTarget,
        "dragstart",
        this.onDragStart.bind(mouseHandler)
      );
      event.addListener(
        mouseTarget,
        "dragend",
        this.onDragEnd.bind(mouseHandler)
      );
      event.addListener(
        mouseTarget,
        "dragenter",
        this.onDragEnter.bind(mouseHandler)
      );
      event.addListener(
        mouseTarget,
        "dragover",
        this.onDragOver.bind(mouseHandler)
      );
      event.addListener(
        mouseTarget,
        "dragleave",
        this.onDragLeave.bind(mouseHandler)
      );
      event.addListener(mouseTarget, "drop", this.onDrop.bind(mouseHandler));
      function scrollCursorIntoView(cursor, prevCursor) {
        var now = Date.now(),
          vMovement = !prevCursor || cursor.row != prevCursor.row,
          hMovement = !prevCursor || cursor.column != prevCursor.column;
        if (!cursorMovedTime || vMovement || hMovement) {
          editor.moveCursorToPosition(cursor);
          cursorMovedTime = now;
          cursorPointOnCaretMoved = { x: x, y: y };
        } else {
          var distance = calcDistance(
            cursorPointOnCaretMoved.x,
            cursorPointOnCaretMoved.y,
            x,
            y
          );
          if (distance > SCROLL_CURSOR_HYSTERESIS) {
            cursorMovedTime = null;
          } else if (now - cursorMovedTime >= SCROLL_CURSOR_DELAY) {
            editor.renderer.scrollCursorIntoView();
            cursorMovedTime = null;
          }
        }
      }
      function autoScroll(cursor, prevCursor) {
        var now = Date.now(),
          lineHeight = editor.renderer.layerConfig.lineHeight,
          characterWidth = editor.renderer.layerConfig.characterWidth,
          editorRect = editor.renderer.scroller.getBoundingClientRect(),
          offsets = {
            x: { left: x - editorRect.left, right: editorRect.right - x },
            y: { top: y - editorRect.top, bottom: editorRect.bottom - y }
          },
          nearestXOffset = _Mathmin2(offsets.x.left, offsets.x.right),
          nearestYOffset = _Mathmin2(offsets.y.top, offsets.y.bottom),
          scrollCursor = { row: cursor.row, column: cursor.column };
        if (2 >= nearestXOffset / characterWidth) {
          scrollCursor.column += offsets.x.left < offsets.x.right ? -3 : +2;
        }
        if (1 >= nearestYOffset / lineHeight) {
          scrollCursor.row += offsets.y.top < offsets.y.bottom ? -1 : +1;
        }
        var vScroll = cursor.row != scrollCursor.row,
          hScroll = cursor.column != scrollCursor.column,
          vMovement = !prevCursor || cursor.row != prevCursor.row;
        if (vScroll || (hScroll && !vMovement)) {
          if (!autoScrollStartTime) autoScrollStartTime = now;
          else if (now - autoScrollStartTime >= AUTOSCROLL_DELAY)
            editor.renderer.scrollCursorIntoView(scrollCursor);
        } else {
          autoScrollStartTime = null;
        }
      }
      function onDragInterval() {
        var prevCursor = dragCursor;
        dragCursor = editor.renderer.screenToTextCoordinates(x, y);
        scrollCursorIntoView(dragCursor, prevCursor);
        autoScroll(dragCursor, prevCursor);
      }
      function addDragMarker() {
        range = editor.selection.toOrientedRange();
        dragSelectionMarker = editor.session.addMarker(
          range,
          "ace_selection",
          editor.getSelectionStyle()
        );
        editor.clearSelection();
        if (editor.isFocused()) editor.renderer.$cursorLayer.setBlinking(!1);
        clearInterval(timerId);
        onDragInterval();
        timerId = setInterval(onDragInterval, 20);
        counter = 0;
        event.addListener(document, "mousemove", onMouseMove);
      }
      function clearDragMarker() {
        clearInterval(timerId);
        editor.session.removeMarker(dragSelectionMarker);
        dragSelectionMarker = null;
        editor.selection.fromOrientedRange(range);
        if (editor.isFocused() && !isInternal)
          editor.renderer.$cursorLayer.setBlinking(!editor.getReadOnly());
        range = null;
        dragCursor = null;
        counter = 0;
        autoScrollStartTime = null;
        cursorMovedTime = null;
        event.removeListener(document, "mousemove", onMouseMove);
      }
      var onMouseMoveTimer = null;
      function onMouseMove() {
        if (null == onMouseMoveTimer) {
          onMouseMoveTimer = setTimeout(function() {
            if (null != onMouseMoveTimer && dragSelectionMarker)
              clearDragMarker();
          }, 20);
        }
      }
      function canAccept(dataTransfer) {
        var types = dataTransfer.types;
        return (
          !types ||
          Array.prototype.some.call(types, function(type) {
            return "text/plain" == type || "Text" == type;
          })
        );
      }
      function getDropEffect(e) {
        var copyAllowed = ["copy", "copymove", "all", "uninitialized"],
          moveAllowed = [
            "move",
            "copymove",
            "linkmove",
            "all",
            "uninitialized"
          ],
          copyModifierState = useragent.isMac ? e.altKey : e.ctrlKey,
          effectAllowed = "uninitialized";
        try {
          effectAllowed = e.dataTransfer.effectAllowed.toLowerCase();
        } catch (e) {}
        var dropEffect = "none";
        if (copyModifierState && 0 <= copyAllowed.indexOf(effectAllowed))
          dropEffect = "copy";
        else if (0 <= moveAllowed.indexOf(effectAllowed)) dropEffect = "move";
        else if (0 <= copyAllowed.indexOf(effectAllowed)) dropEffect = "copy";
        return dropEffect;
      }
    }
    (function() {
      this.dragWait = function() {
        var interval = Date.now() - this.mousedownEvent.time;
        if (interval > this.editor.getDragDelay()) this.startDrag();
      };
      this.dragWaitEnd = function() {
        var target = this.editor.container;
        target.draggable = !1;
        this.startSelect(this.mousedownEvent.getDocumentPosition());
        this.selectEnd();
      };
      this.dragReadyEnd = function(e) {
        this.editor.renderer.$cursorLayer.setBlinking(
          !this.editor.getReadOnly()
        );
        this.editor.unsetStyle("ace_dragging");
        this.editor.renderer.setCursorStyle("");
        this.dragWaitEnd();
      };
      this.startDrag = function() {
        this.cancelDrag = !1;
        var editor = this.editor,
          target = editor.container;
        target.draggable = !0;
        editor.renderer.$cursorLayer.setBlinking(!1);
        editor.setStyle("ace_dragging");
        var cursorStyle = useragent.isWin ? "default" : "move";
        editor.renderer.setCursorStyle(cursorStyle);
        this.setState("dragReady");
      };
      this.onMouseDrag = function(e) {
        var target = this.editor.container;
        if (useragent.isIE && "dragReady" == this.state) {
          var distance = calcDistance(
            this.mousedownEvent.x,
            this.mousedownEvent.y,
            this.x,
            this.y
          );
          if (3 < distance) target.dragDrop();
        }
        if ("dragWait" === this.state) {
          var distance = calcDistance(
            this.mousedownEvent.x,
            this.mousedownEvent.y,
            this.x,
            this.y
          );
          if (0 < distance) {
            target.draggable = !1;
            this.startSelect(this.mousedownEvent.getDocumentPosition());
          }
        }
      };
      this.onMouseDown = function(e) {
        if (!this.$dragEnabled) return;
        this.mousedownEvent = e;
        var editor = this.editor,
          inSelection = e.inSelection(),
          button = e.getButton(),
          clickCount = e.domEvent.detail || 1;
        if (1 === clickCount && 0 === button && inSelection) {
          if (
            e.editor.inMultiSelectMode &&
            (e.getAccelKey() || e.getShiftKey())
          )
            return;
          this.mousedownEvent.time = Date.now();
          var eventTarget = e.domEvent.target || e.domEvent.srcElement;
          if ("unselectable" in eventTarget) eventTarget.unselectable = "on";
          if (editor.getDragDelay()) {
            if (useragent.isWebKit) {
              this.cancelDrag = !0;
              var mouseTarget = editor.container;
              mouseTarget.draggable = !0;
            }
            this.setState("dragWait");
          } else {
            this.startDrag();
          }
          this.captureMouse(e, this.onMouseDrag.bind(this));
          e.defaultPrevented = !0;
        }
      };
    }.call(DragdropHandler.prototype));
    function calcDistance(ax, ay, bx, by) {
      return Math.sqrt(_Mathpow2(bx - ax, 2) + _Mathpow2(by - ay, 2));
    }
    exports.DragdropHandler = DragdropHandler;
  }
);
ace.define(
  "ace/lib/net",
  ["require", "exports", "module", "ace/lib/dom"],
  function(require, exports, module) {
    "use strict";
    var dom = require("./dom");
    exports.get = function(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, !0);
      xhr.onreadystatechange = function() {
        if (4 === xhr.readyState) {
          callback(xhr.responseText);
        }
      };
      xhr.send(null);
    };
    exports.loadScript = function(path, callback) {
      var head = dom.getDocumentHead(),
        s = document.createElement("script");
      s.src = path;
      head.appendChild(s);
      s.onload = s.onreadystatechange = function(_, isAbort) {
        if (
          isAbort ||
          !s.readyState ||
          "loaded" == s.readyState ||
          "complete" == s.readyState
        ) {
          s = s.onload = s.onreadystatechange = null;
          if (!isAbort) callback();
        }
      };
    };
    exports.qualifyURL = function(url) {
      var a = document.createElement("a");
      a.href = url;
      return a.href;
    };
  }
);
ace.define("ace/lib/event_emitter", ["require", "exports", "module"], function(
  require,
  exports,
  module
) {
  "use strict";
  var EventEmitter = {},
    stopPropagation = function stopPropagation() {
      this.propagationStopped = !0;
    },
    preventDefault = function preventDefault() {
      this.defaultPrevented = !0;
    };
  EventEmitter._emit = EventEmitter._dispatchEvent = function(eventName, e) {
    this._eventRegistry || (this._eventRegistry = {});
    this._defaultHandlers || (this._defaultHandlers = {});
    var listeners = this._eventRegistry[eventName] || [],
      defaultHandler = this._defaultHandlers[eventName];
    if (!listeners.length && !defaultHandler) return;
    if ("object" != babelHelpers.typeof(e) || !e) e = {};
    if (!e.type) e.type = eventName;
    if (!e.stopPropagation) e.stopPropagation = stopPropagation;
    if (!e.preventDefault) e.preventDefault = preventDefault;
    listeners = listeners.slice();
    for (var i = 0; i < listeners.length; i++) {
      listeners[i](e, this);
      if (e.propagationStopped) break;
    }
    if (defaultHandler && !e.defaultPrevented) return defaultHandler(e, this);
  };
  EventEmitter._signal = function(eventName, e) {
    var listeners = (this._eventRegistry || {})[eventName];
    if (!listeners) return;
    listeners = listeners.slice();
    for (var i = 0; i < listeners.length; i++) {
      listeners[i](e, this);
    }
  };
  EventEmitter.once = function(eventName, callback) {
    var _self = this;
    callback &&
      this.addEventListener(eventName, function newCallback() {
        _self.removeEventListener(eventName, newCallback);
        callback.apply(null, arguments);
      });
  };
  EventEmitter.setDefaultHandler = function(eventName, callback) {
    var handlers = this._defaultHandlers;
    if (!handlers) handlers = this._defaultHandlers = { _disabled_: {} };
    if (handlers[eventName]) {
      var old = handlers[eventName],
        disabled = handlers._disabled_[eventName];
      if (!disabled) handlers._disabled_[eventName] = disabled = [];
      disabled.push(old);
      var i = disabled.indexOf(callback);
      if (-1 != i) disabled.splice(i, 1);
    }
    handlers[eventName] = callback;
  };
  EventEmitter.removeDefaultHandler = function(eventName, callback) {
    var handlers = this._defaultHandlers;
    if (!handlers) return;
    var disabled = handlers._disabled_[eventName];
    if (handlers[eventName] == callback) {
      if (disabled) this.setDefaultHandler(eventName, disabled.pop());
    } else if (disabled) {
      var i = disabled.indexOf(callback);
      if (-1 != i) disabled.splice(i, 1);
    }
  };
  EventEmitter.on = EventEmitter.addEventListener = function(
    eventName,
    callback,
    capturing
  ) {
    this._eventRegistry = this._eventRegistry || {};
    var listeners = this._eventRegistry[eventName];
    if (!listeners) listeners = this._eventRegistry[eventName] = [];
    if (-1 == listeners.indexOf(callback))
      listeners[capturing ? "unshift" : "push"](callback);
    return callback;
  };
  EventEmitter.off = EventEmitter.removeListener = EventEmitter.removeEventListener = function(
    eventName,
    callback
  ) {
    this._eventRegistry = this._eventRegistry || {};
    var listeners = this._eventRegistry[eventName];
    if (!listeners) return;
    var index = listeners.indexOf(callback);
    if (-1 !== index) listeners.splice(index, 1);
  };
  EventEmitter.removeAllListeners = function(eventName) {
    if (this._eventRegistry) this._eventRegistry[eventName] = [];
  };
  exports.EventEmitter = EventEmitter;
});
ace.define(
  "ace/lib/app_config",
  ["require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter"],
  function(require, exports, module) {
    "no use strict";
    var oop = require("./oop"),
      EventEmitter = require("./event_emitter").EventEmitter,
      optionsProvider = {
        setOptions: function setOptions(optList) {
          Object.keys(optList).forEach(function(key) {
            this.setOption(key, optList[key]);
          }, this);
        },
        getOptions: function getOptions(optionNames) {
          var result = {};
          if (!optionNames) {
            var options = this.$options;
            optionNames = Object.keys(options).filter(function(key) {
              return !options[key].hidden;
            });
          } else if (!Array.isArray(optionNames)) {
            result = optionNames;
            optionNames = Object.keys(result);
          }
          optionNames.forEach(function(key) {
            result[key] = this.getOption(key);
          }, this);
          return result;
        },
        setOption: function setOption(name, value) {
          if (this["$" + name] === value) return;
          var opt = this.$options[name];
          if (!opt) {
            return warn('misspelled option "' + name + '"');
          }
          if (opt.forwardTo)
            return (
              this[opt.forwardTo] && this[opt.forwardTo].setOption(name, value)
            );
          if (!opt.handlesSet) this["$" + name] = value;
          if (opt && opt.set) opt.set.call(this, value);
        },
        getOption: function getOption(name) {
          var opt = this.$options[name];
          if (!opt) {
            return warn('misspelled option "' + name + '"');
          }
          if (opt.forwardTo)
            return this[opt.forwardTo] && this[opt.forwardTo].getOption(name);
          return opt && opt.get ? opt.get.call(this) : this["$" + name];
        }
      };
    function warn(message) {
      if ("undefined" != typeof console && console.warn)
        console.warn.apply(console, arguments);
    }
    function reportError(msg, data) {
      var e = new Error(msg);
      e.data = data;
      if (
        "object" ==
          ("undefined" === typeof console
            ? "undefined"
            : babelHelpers.typeof(console)) &&
        console.error
      )
        console.error(e);
      setTimeout(function() {
        throw e;
      });
    }
    var AppConfig = function AppConfig() {
      this.$defaultOptions = {};
    };
    (function() {
      oop.implement(this, EventEmitter);
      this.defineOptions = function(obj, path, options) {
        if (!obj.$options) this.$defaultOptions[path] = obj.$options = {};
        Object.keys(options).forEach(function(key) {
          var opt = options[key];
          if ("string" == typeof opt) opt = { forwardTo: opt };
          opt.name || (opt.name = key);
          obj.$options[opt.name] = opt;
          if ("initialValue" in opt) obj["$" + opt.name] = opt.initialValue;
        });
        oop.implement(obj, optionsProvider);
        return this;
      };
      this.resetOptions = function(obj) {
        Object.keys(obj.$options).forEach(function(key) {
          var opt = obj.$options[key];
          if ("value" in opt) obj.setOption(key, opt.value);
        });
      };
      this.setDefaultValue = function(path, name, value) {
        var opts =
          this.$defaultOptions[path] || (this.$defaultOptions[path] = {});
        if (opts[name]) {
          if (opts.forwardTo) this.setDefaultValue(opts.forwardTo, name, value);
          else opts[name].value = value;
        }
      };
      this.setDefaultValues = function(path, optionHash) {
        Object.keys(optionHash).forEach(function(key) {
          this.setDefaultValue(path, key, optionHash[key]);
        }, this);
      };
      this.warn = warn;
      this.reportError = reportError;
    }.call(AppConfig.prototype));
    exports.AppConfig = AppConfig;
  }
);
ace.define(
  "ace/config",
  [
    "require",
    "exports",
    "module",
    "ace/lib/lang",
    "ace/lib/oop",
    "ace/lib/net",
    "ace/lib/app_config"
  ],
  function(require, exports, module) {
    "no use strict";
    var lang = require("./lib/lang"),
      oop = require("./lib/oop"),
      net = require("./lib/net"),
      AppConfig = require("./lib/app_config").AppConfig;
    module.exports = exports = new AppConfig();
    var global = (function() {
        return this || ("undefined" != typeof window && window);
      })(),
      options = {
        packaged: !1,
        workerPath: null,
        modePath: null,
        themePath: null,
        basePath: "",
        suffix: ".js",
        $moduleUrls: {}
      };
    exports.get = function(key) {
      if (!options.hasOwnProperty(key))
        throw new Error("Unknown config key: " + key);
      return options[key];
    };
    exports.set = function(key, value) {
      if (!options.hasOwnProperty(key))
        throw new Error("Unknown config key: " + key);
      options[key] = value;
    };
    exports.all = function() {
      return lang.copyObject(options);
    };
    exports.$modes = {};
    exports.moduleUrl = function(name, component) {
      if (options.$moduleUrls[name]) return options.$moduleUrls[name];
      var parts = name.split("/");
      component = component || parts[parts.length - 2] || "";
      var sep = "snippets" == component ? "/" : "-",
        base = parts[parts.length - 1];
      if ("worker" == component && "-" == sep) {
        var re = new RegExp(
          "^" + component + "[\\-_]|[\\-_]" + component + "$",
          "g"
        );
        base = base.replace(re, "");
      }
      if ((!base || base == component) && 1 < parts.length)
        base = parts[parts.length - 2];
      var path = options[component + "Path"];
      if (null == path) {
        path = options.basePath;
      } else if ("/" == sep) {
        component = sep = "";
      }
      if (path && "/" != path.slice(-1)) path += "/";
      return path + component + sep + base + this.get("suffix");
    };
    exports.setModuleUrl = function(name, subst) {
      return (options.$moduleUrls[name] = subst);
    };
    exports.$loading = {};
    exports.loadModule = function(moduleName, onLoad) {
      var module, moduleType;
      if (Array.isArray(moduleName)) {
        moduleType = moduleName[0];
        moduleName = moduleName[1];
      }
      try {
        module = require(moduleName);
      } catch (e) {}
      if (module && !exports.$loading[moduleName])
        return onLoad && onLoad(module);
      if (!exports.$loading[moduleName]) exports.$loading[moduleName] = [];
      exports.$loading[moduleName].push(onLoad);
      if (1 < exports.$loading[moduleName].length) return;
      var afterLoad = function afterLoad() {
        require([moduleName], function(module) {
          exports._emit("load.module", { name: moduleName, module: module });
          var listeners = exports.$loading[moduleName];
          exports.$loading[moduleName] = null;
          listeners.forEach(function(onLoad) {
            onLoad && onLoad(module);
          });
        });
      };
      if (!exports.get("packaged")) return afterLoad();
      net.loadScript(exports.moduleUrl(moduleName, moduleType), afterLoad);
      _reportErrorIfPathIsNotConfigured();
    };
    var _reportErrorIfPathIsNotConfigured = function reportErrorIfPathIsNotConfigured() {
      if (
        !options.basePath &&
        !options.workerPath &&
        !options.modePath &&
        !options.themePath &&
        !Object.keys(options.$moduleUrls).length
      ) {
        console.error(
          "Unable to infer path to ace from script src,",
          "use ace.config.set('basePath', 'path') to enable dynamic loading of modes and themes",
          "or with webpack use ace/webpack-resolver"
        );
        _reportErrorIfPathIsNotConfigured = function reportErrorIfPathIsNotConfigured() {};
      }
    };
    init(!0);
    function init(packaged) {
      if (!global || !global.document) return;
      options.packaged =
        packaged ||
        require.packaged ||
        module.packaged ||
        (global.define && define.packaged);
      for (
        var scriptOptions = {},
          scriptUrl = "",
          currentScript = document.currentScript || document._currentScript,
          currentDocument =
            (currentScript && currentScript.ownerDocument) || document,
          scripts = currentDocument.getElementsByTagName("script"),
          i = 0;
        i < scripts.length;
        i++
      ) {
        var script = scripts[i],
          src = script.src || script.getAttribute("src");
        if (!src) continue;
        for (
          var attributes = script.attributes,
            j = 0,
            l = attributes.length,
            attr;
          j < l;
          j++
        ) {
          attr = attributes[j];
          if (0 === attr.name.indexOf("data-ace-")) {
            scriptOptions[deHyphenate(attr.name.replace(/^data-ace-/, ""))] =
              attr.value;
          }
        }
        var m = src.match(/^(.*)\/ace(\-\w+)?\.js(\?|$)/);
        if (m) scriptUrl = m[1];
      }
      if (scriptUrl) {
        scriptOptions.base = scriptOptions.base || scriptUrl;
        scriptOptions.packaged = !0;
      }
      scriptOptions.basePath = scriptOptions.base;
      scriptOptions.workerPath = scriptOptions.workerPath || scriptOptions.base;
      scriptOptions.modePath = scriptOptions.modePath || scriptOptions.base;
      scriptOptions.themePath = scriptOptions.themePath || scriptOptions.base;
      delete scriptOptions.base;
      for (var key in scriptOptions) {
        if ("undefined" !== typeof scriptOptions[key])
          exports.set(key, scriptOptions[key]);
      }
    }
    exports.init = init;
    function deHyphenate(str) {
      return str.replace(/-(.)/g, function(m, m1) {
        return m1.toUpperCase();
      });
    }
  }
);
ace.define(
  "ace/mouse/mouse_handler",
  [
    "require",
    "exports",
    "module",
    "ace/lib/event",
    "ace/lib/useragent",
    "ace/mouse/default_handlers",
    "ace/mouse/default_gutter_handler",
    "ace/mouse/mouse_event",
    "ace/mouse/dragdrop_handler",
    "ace/config"
  ],
  function(require, exports, module) {
    "use strict";
    var event = require("../lib/event"),
      useragent = require("../lib/useragent"),
      DefaultHandlers = require("./default_handlers").DefaultHandlers,
      DefaultGutterHandler = require("./default_gutter_handler").GutterHandler,
      MouseEvent = require("./mouse_event").MouseEvent,
      DragdropHandler = require("./dragdrop_handler").DragdropHandler,
      config = require("../config"),
      MouseHandler = function MouseHandler(editor) {
        var _self = this;
        this.editor = editor;
        new DefaultHandlers(this);
        new DefaultGutterHandler(this);
        new DragdropHandler(this);
        var focusEditor = function focusEditor(e) {
            var windowBlurred =
              !document.hasFocus ||
              !document.hasFocus() ||
              (!editor.isFocused() &&
                document.activeElement ==
                  (editor.textInput && editor.textInput.getElement()));
            if (windowBlurred) window.focus();
            editor.focus();
          },
          mouseTarget = editor.renderer.getMouseEventTarget();
        event.addListener(
          mouseTarget,
          "click",
          this.onMouseEvent.bind(this, "click")
        );
        event.addListener(
          mouseTarget,
          "mousemove",
          this.onMouseMove.bind(this, "mousemove")
        );
        event.addMultiMouseDownListener(
          [
            mouseTarget,
            editor.renderer.scrollBarV && editor.renderer.scrollBarV.inner,
            editor.renderer.scrollBarH && editor.renderer.scrollBarH.inner,
            editor.textInput && editor.textInput.getElement()
          ].filter(Boolean),
          [400, 300, 250],
          this,
          "onMouseEvent"
        );
        event.addMouseWheelListener(
          editor.container,
          this.onMouseWheel.bind(this, "mousewheel")
        );
        event.addTouchMoveListener(
          editor.container,
          this.onTouchMove.bind(this, "touchmove")
        );
        var gutterEl = editor.renderer.$gutter;
        event.addListener(
          gutterEl,
          "mousedown",
          this.onMouseEvent.bind(this, "guttermousedown")
        );
        event.addListener(
          gutterEl,
          "click",
          this.onMouseEvent.bind(this, "gutterclick")
        );
        event.addListener(
          gutterEl,
          "dblclick",
          this.onMouseEvent.bind(this, "gutterdblclick")
        );
        event.addListener(
          gutterEl,
          "mousemove",
          this.onMouseEvent.bind(this, "guttermousemove")
        );
        event.addListener(mouseTarget, "mousedown", focusEditor);
        event.addListener(gutterEl, "mousedown", focusEditor);
        if (useragent.isIE && editor.renderer.scrollBarV) {
          event.addListener(
            editor.renderer.scrollBarV.element,
            "mousedown",
            focusEditor
          );
          event.addListener(
            editor.renderer.scrollBarH.element,
            "mousedown",
            focusEditor
          );
        }
        editor.on("mousemove", function(e) {
          if (_self.state || _self.$dragDelay || !_self.$dragEnabled) return;
          var character = editor.renderer.screenToTextCoordinates(e.x, e.y),
            range = editor.session.selection.getRange(),
            renderer = editor.renderer;
          if (
            !range.isEmpty() &&
            range.insideStart(character.row, character.column)
          ) {
            renderer.setCursorStyle("default");
          } else {
            renderer.setCursorStyle("");
          }
        });
      };
    (function() {
      this.onMouseEvent = function(name, e) {
        this.editor._emit(name, new MouseEvent(e, this.editor));
      };
      this.onMouseMove = function(name, e) {
        var listeners =
          this.editor._eventRegistry && this.editor._eventRegistry.mousemove;
        if (!listeners || !listeners.length) return;
        this.editor._emit(name, new MouseEvent(e, this.editor));
      };
      this.onMouseWheel = function(name, e) {
        var mouseEvent = new MouseEvent(e, this.editor);
        mouseEvent.speed = 2 * this.$scrollSpeed;
        mouseEvent.wheelX = e.wheelX;
        mouseEvent.wheelY = e.wheelY;
        this.editor._emit(name, mouseEvent);
      };
      this.onTouchMove = function(name, e) {
        var mouseEvent = new MouseEvent(e, this.editor);
        mouseEvent.speed = 1;
        mouseEvent.wheelX = e.wheelX;
        mouseEvent.wheelY = e.wheelY;
        this.editor._emit(name, mouseEvent);
      };
      this.setState = function(state) {
        this.state = state;
      };
      this.captureMouse = function(ev, mouseMoveHandler) {
        this.x = ev.x;
        this.y = ev.y;
        this.isMousePressed = !0;
        var editor = this.editor,
          renderer = this.editor.renderer;
        if (renderer.$keepTextAreaAtCursor)
          renderer.$keepTextAreaAtCursor = null;
        var self = this,
          onMouseMove = function onMouseMove(e) {
            if (!e) return;
            if (useragent.isWebKit && !e.which && self.releaseMouse)
              return self.releaseMouse();
            self.x = e.clientX;
            self.y = e.clientY;
            mouseMoveHandler && mouseMoveHandler(e);
            self.mouseEvent = new MouseEvent(e, self.editor);
            self.$mouseMoved = !0;
          },
          onCaptureEnd = function onCaptureEnd(e) {
            editor.off("beforeEndOperation", onOperationEnd);
            clearInterval(timerId);
            onCaptureInterval();
            self[self.state + "End"] && self[self.state + "End"](e);
            self.state = "";
            if (null == renderer.$keepTextAreaAtCursor) {
              renderer.$keepTextAreaAtCursor = !0;
              renderer.$moveTextAreaToCursor();
            }
            self.isMousePressed = !1;
            self.$onCaptureMouseMove = self.releaseMouse = null;
            e && self.onMouseEvent("mouseup", e);
            editor.endOperation();
          },
          onCaptureInterval = function onCaptureInterval() {
            self[self.state] && self[self.state]();
            self.$mouseMoved = !1;
          };
        if (useragent.isOldIE && "dblclick" == ev.domEvent.type) {
          return setTimeout(function() {
            onCaptureEnd(ev);
          });
        }
        var onOperationEnd = function onOperationEnd(e) {
          if (!self.releaseMouse) return;
          if (editor.curOp.command.name && editor.curOp.selectionChanged) {
            self[self.state + "End"] && self[self.state + "End"]();
            self.state = "";
            self.releaseMouse();
          }
        };
        editor.on("beforeEndOperation", onOperationEnd);
        editor.startOperation({ command: { name: "mouse" } });
        self.$onCaptureMouseMove = onMouseMove;
        self.releaseMouse = event.capture(
          this.editor.container,
          onMouseMove,
          onCaptureEnd
        );
        var timerId = setInterval(onCaptureInterval, 20);
      };
      this.releaseMouse = null;
      this.cancelContextMenu = function() {
        var stop = function(e) {
          if (e && e.domEvent && "contextmenu" != e.domEvent.type) return;
          this.editor.off("nativecontextmenu", stop);
          if (e && e.domEvent) event.stopEvent(e.domEvent);
        }.bind(this);
        setTimeout(stop, 10);
        this.editor.on("nativecontextmenu", stop);
      };
    }.call(MouseHandler.prototype));
    config.defineOptions(MouseHandler.prototype, "mouseHandler", {
      scrollSpeed: { initialValue: 2 },
      dragDelay: { initialValue: useragent.isMac ? 150 : 0 },
      dragEnabled: { initialValue: !0 },
      focusTimeout: { initialValue: 0 },
      tooltipFollowsMouse: { initialValue: !0 }
    });
    exports.MouseHandler = MouseHandler;
  }
);
ace.define(
  "ace/mouse/fold_handler",
  ["require", "exports", "module", "ace/lib/dom"],
  function(require, exports, module) {
    "use strict";
    var dom = require("../lib/dom");
    function FoldHandler(editor) {
      editor.on("click", function(e) {
        var position = e.getDocumentPosition(),
          session = editor.session,
          fold = session.getFoldAt(position.row, position.column, 1);
        if (fold) {
          if (e.getAccelKey()) session.removeFold(fold);
          else session.expandFold(fold);
          e.stop();
        }
        var target = e.domEvent && e.domEvent.target;
        if (target && dom.hasCssClass(target, "ace_inline_button")) {
          if (dom.hasCssClass(target, "ace_toggle_wrap")) {
            session.setOption("wrap", !0);
            editor.renderer.scrollCursorIntoView();
          }
        }
      });
      editor.on("gutterclick", function(e) {
        var gutterRegion = editor.renderer.$gutterLayer.getRegion(e);
        if ("foldWidgets" == gutterRegion) {
          var row = e.getDocumentPosition().row,
            session = editor.session;
          if (session.foldWidgets && session.foldWidgets[row])
            editor.session.onFoldWidgetClick(row, e);
          if (!editor.isFocused()) editor.focus();
          e.stop();
        }
      });
      editor.on("gutterdblclick", function(e) {
        var gutterRegion = editor.renderer.$gutterLayer.getRegion(e);
        if ("foldWidgets" == gutterRegion) {
          var row = e.getDocumentPosition().row,
            session = editor.session,
            data = session.getParentFoldRangeData(row, !0),
            range = data.range || data.firstRange;
          if (range) {
            row = range.start.row;
            var fold = session.getFoldAt(row, session.getLine(row).length, 1);
            if (fold) {
              session.removeFold(fold);
            } else {
              session.addFold("...", range);
              editor.renderer.scrollCursorIntoView({
                row: range.start.row,
                column: 0
              });
            }
          }
          e.stop();
        }
      });
    }
    exports.FoldHandler = FoldHandler;
  }
);
ace.define(
  "ace/keyboard/keybinding",
  ["require", "exports", "module", "ace/lib/keys", "ace/lib/event"],
  function(require, exports, module) {
    "use strict";
    var keyUtil = require("../lib/keys"),
      event = require("../lib/event"),
      KeyBinding = function KeyBinding(editor) {
        this.$editor = editor;
        this.$data = { editor: editor };
        this.$handlers = [];
        this.setDefaultHandler(editor.commands);
      };
    (function() {
      this.setDefaultHandler = function(kb) {
        this.removeKeyboardHandler(this.$defaultHandler);
        this.$defaultHandler = kb;
        this.addKeyboardHandler(kb, 0);
      };
      this.setKeyboardHandler = function(kb) {
        var h = this.$handlers;
        if (h[h.length - 1] == kb) return;
        while (h[h.length - 1] && h[h.length - 1] != this.$defaultHandler) {
          this.removeKeyboardHandler(h[h.length - 1]);
        }
        this.addKeyboardHandler(kb, 1);
      };
      this.addKeyboardHandler = function(kb, pos) {
        if (!kb) return;
        if ("function" == typeof kb && !kb.handleKeyboard)
          kb.handleKeyboard = kb;
        var i = this.$handlers.indexOf(kb);
        if (-1 != i) this.$handlers.splice(i, 1);
        if (pos == void 0) this.$handlers.push(kb);
        else this.$handlers.splice(pos, 0, kb);
        if (-1 == i && kb.attach) kb.attach(this.$editor);
      };
      this.removeKeyboardHandler = function(kb) {
        var i = this.$handlers.indexOf(kb);
        if (-1 == i) return !1;
        this.$handlers.splice(i, 1);
        kb.detach && kb.detach(this.$editor);
        return !0;
      };
      this.getKeyboardHandler = function() {
        return this.$handlers[this.$handlers.length - 1];
      };
      this.getStatusText = function() {
        var data = this.$data,
          editor = data.editor;
        return this.$handlers
          .map(function(h) {
            return (h.getStatusText && h.getStatusText(editor, data)) || "";
          })
          .filter(Boolean)
          .join(" ");
      };
      this.$callKeyboardHandlers = function(hashId, keyString, keyCode, e) {
        for (
          var toExecute,
            success = !1,
            commands = this.$editor.commands,
            i = this.$handlers.length;
          i--;

        ) {
          toExecute = this.$handlers[i].handleKeyboard(
            this.$data,
            hashId,
            keyString,
            keyCode,
            e
          );
          if (!toExecute || !toExecute.command) continue;
          if ("null" == toExecute.command) {
            success = !0;
          } else {
            success = commands.exec(
              toExecute.command,
              this.$editor,
              toExecute.args,
              e
            );
          }
          if (
            success &&
            e &&
            -1 != hashId &&
            !0 != toExecute.passEvent &&
            !0 != toExecute.command.passEvent
          ) {
            event.stopEvent(e);
          }
          if (success) break;
        }
        if (!success && -1 == hashId) {
          toExecute = { command: "insertstring" };
          success = commands.exec("insertstring", this.$editor, keyString);
        }
        if (success && this.$editor._signal)
          this.$editor._signal("keyboardActivity", toExecute);
        return success;
      };
      this.onCommandKey = function(e, hashId, keyCode) {
        var keyString = keyUtil.keyCodeToString(keyCode);
        this.$callKeyboardHandlers(hashId, keyString, keyCode, e);
      };
      this.onTextInput = function(text) {
        this.$callKeyboardHandlers(-1, text);
      };
    }.call(KeyBinding.prototype));
    exports.KeyBinding = KeyBinding;
  }
);
ace.define("ace/lib/bidiutil", ["require", "exports", "module"], function(
  require,
  exports,
  module
) {
  "use strict";
  var ArabicAlefBetIntervalsBegine = ["\u0621", "\u0641"],
    ArabicAlefBetIntervalsEnd = ["\u063A", "\u064A"],
    dir = 0,
    hiLevel = 0,
    lastArabic = !1,
    hasUBAT_AL = !1,
    hasUBAT_B = !1,
    hasUBAT_S = !1,
    hasBlockSep = !1,
    hasSegSep = !1,
    impTab_LTR = [
      [0, 3, 0, 1, 0, 0, 0],
      [0, 3, 0, 1, 2, 2, 0],
      [0, 3, 0, 17, 2, 0, 1],
      [0, 3, 5, 5, 4, 1, 0],
      [0, 3, 21, 21, 4, 0, 1],
      [0, 3, 5, 5, 4, 2, 0]
    ],
    impTab_RTL = [
      [2, 0, 1, 1, 0, 1, 0],
      [2, 0, 1, 1, 0, 2, 0],
      [2, 0, 2, 1, 3, 2, 0],
      [2, 0, 2, 33, 3, 1, 1]
    ],
    LTR = 0,
    RTL = 1,
    L = 0,
    R = 1,
    EN = 2,
    AN = 3,
    ON = 4,
    B = 5,
    S = 6,
    AL = 7,
    WS = 8,
    CS = 9,
    ES = 10,
    ET = 11,
    NSM = 12,
    LRE = 13,
    RLE = 14,
    PDF = 15,
    LRO = 16,
    RLO = 17,
    BN = 18,
    UnicodeTBL00 = [
      BN,
      BN,
      BN,
      BN,
      BN,
      BN,
      BN,
      BN,
      BN,
      S,
      B,
      S,
      WS,
      B,
      BN,
      BN,
      BN,
      BN,
      BN,
      BN,
      BN,
      BN,
      BN,
      BN,
      BN,
      BN,
      BN,
      BN,
      B,
      B,
      B,
      S,
      WS,
      ON,
      ON,
      ET,
      ET,
      ET,
      ON,
      ON,
      ON,
      ON,
      ON,
      ES,
      CS,
      ES,
      CS,
      CS,
      EN,
      EN,
      EN,
      EN,
      EN,
      EN,
      EN,
      EN,
      EN,
      EN,
      CS,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      L,
      L,
      L,
      L,
      L,
      L,
      L,
      L,
      L,
      L,
      L,
      L,
      L,
      L,
      L,
      L,
      L,
      L,
      L,
      L,
      L,
      L,
      L,
      L,
      L,
      L,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      L,
      L,
      L,
      L,
      L,
      L,
      L,
      L,
      L,
      L,
      L,
      L,
      L,
      L,
      L,
      L,
      L,
      L,
      L,
      L,
      L,
      L,
      L,
      L,
      L,
      L,
      ON,
      ON,
      ON,
      ON,
      BN,
      BN,
      BN,
      BN,
      BN,
      BN,
      B,
      BN,
      BN,
      BN,
      BN,
      BN,
      BN,
      BN,
      BN,
      BN,
      BN,
      BN,
      BN,
      BN,
      BN,
      BN,
      BN,
      BN,
      BN,
      BN,
      BN,
      BN,
      BN,
      BN,
      BN,
      BN,
      BN,
      CS,
      ON,
      ET,
      ET,
      ET,
      ET,
      ON,
      ON,
      ON,
      ON,
      L,
      ON,
      ON,
      BN,
      ON,
      ON,
      ET,
      ET,
      EN,
      EN,
      ON,
      L,
      ON,
      ON,
      ON,
      EN,
      L,
      ON,
      ON,
      ON,
      ON,
      ON
    ],
    UnicodeTBL20 = [
      WS,
      WS,
      WS,
      WS,
      WS,
      WS,
      WS,
      WS,
      WS,
      WS,
      WS,
      BN,
      BN,
      BN,
      L,
      R,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      WS,
      B,
      LRE,
      RLE,
      PDF,
      LRO,
      RLO,
      CS,
      ET,
      ET,
      ET,
      ET,
      ET,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      CS,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      ON,
      WS
    ];
  function _computeLevels(chars, levels, len, charTypes) {
    var impTab = dir ? impTab_RTL : impTab_LTR,
      prevState = null,
      newClass = null,
      newLevel = null,
      newState = 0,
      action = null,
      cond = null,
      condPos = -1,
      i = null,
      ix = null,
      classes = [];
    if (!charTypes) {
      for (i = 0, charTypes = []; i < len; i++) {
        charTypes[i] = _getCharacterType(chars[i]);
      }
    }
    hiLevel = dir;
    lastArabic = !1;
    hasUBAT_AL = !1;
    hasUBAT_B = !1;
    hasUBAT_S = !1;
    for (ix = 0; ix < len; ix++) {
      prevState = newState;
      classes[ix] = newClass = _getCharClass(chars, charTypes, classes, ix);
      newState = impTab[prevState][newClass];
      action = 240 & newState;
      newState &= 15;
      levels[ix] = newLevel = impTab[newState][5];
      if (0 < action) {
        if (16 == action) {
          for (i = condPos; i < ix; i++) {
            levels[i] = 1;
          }
          condPos = -1;
        } else {
          condPos = -1;
        }
      }
      cond = impTab[newState][6];
      if (cond) {
        if (-1 == condPos) {
          condPos = ix;
        }
      } else {
        if (-1 < condPos) {
          for (i = condPos; i < ix; i++) {
            levels[i] = newLevel;
          }
          condPos = -1;
        }
      }
      if (charTypes[ix] == B) {
        levels[ix] = 0;
      }
      hiLevel |= newLevel;
    }
    if (hasUBAT_S) {
      for (i = 0; i < len; i++) {
        if (charTypes[i] == S) {
          levels[i] = dir;
          for (var j = i - 1; 0 <= j; j--) {
            if (charTypes[j] == WS) {
              levels[j] = dir;
            } else {
              break;
            }
          }
        }
      }
    }
  }
  function _invertLevel(lev, levels, _array) {
    if (hiLevel < lev) {
      return;
    }
    if (1 == lev && dir == RTL && !hasUBAT_B) {
      _array.reverse();
      return;
    }
    var len = _array.length,
      start = 0,
      end,
      lo,
      hi,
      tmp;
    while (start < len) {
      if (levels[start] >= lev) {
        end = start + 1;
        while (end < len && levels[end] >= lev) {
          end++;
        }
        for (lo = start, hi = end - 1; lo < hi; lo++, hi--) {
          tmp = _array[lo];
          _array[lo] = _array[hi];
          _array[hi] = tmp;
        }
        start = end;
      }
      start++;
    }
  }
  function _getCharClass(chars, types, classes, ix) {
    var cType = types[ix],
      wType,
      nType,
      len,
      i;
    switch (cType) {
      case L:
      case R:
        lastArabic = !1;
      case ON:
      case AN:
        return cType;
      case EN:
        return lastArabic ? AN : EN;
      case AL:
        lastArabic = !0;
        hasUBAT_AL = !0;
        return R;
      case WS:
        return ON;
      case CS:
        if (
          1 > ix ||
          ix + 1 >= types.length ||
          ((wType = classes[ix - 1]) != EN && wType != AN) ||
          ((nType = types[ix + 1]) != EN && nType != AN)
        ) {
          return ON;
        }
        if (lastArabic) {
          nType = AN;
        }
        return nType == wType ? nType : ON;
      case ES:
        wType = 0 < ix ? classes[ix - 1] : B;
        if (wType == EN && ix + 1 < types.length && types[ix + 1] == EN) {
          return EN;
        }
        return ON;
      case ET:
        if (0 < ix && classes[ix - 1] == EN) {
          return EN;
        }
        if (lastArabic) {
          return ON;
        }
        i = ix + 1;
        len = types.length;
        while (i < len && types[i] == ET) {
          i++;
        }
        if (i < len && types[i] == EN) {
          return EN;
        }
        return ON;
      case NSM:
        len = types.length;
        i = ix + 1;
        while (i < len && types[i] == NSM) {
          i++;
        }
        if (i < len) {
          var c = chars[ix],
            rtlCandidate = (1425 <= c && 2303 >= c) || 64286 == c;
          wType = types[i];
          if (rtlCandidate && (wType == R || wType == AL)) {
            return R;
          }
        }
        if (1 > ix || (wType = types[ix - 1]) == B) {
          return ON;
        }
        return classes[ix - 1];
      case B:
        lastArabic = !1;
        hasUBAT_B = !0;
        return dir;
      case S:
        hasUBAT_S = !0;
        return ON;
      case LRE:
      case RLE:
      case LRO:
      case RLO:
      case PDF:
        lastArabic = !1;
      case BN:
        return ON;
    }
  }
  function _getCharacterType(ch) {
    var uc = ch.charCodeAt(0),
      hi = uc >> 8;
    if (0 == hi) {
      return 191 < uc ? L : UnicodeTBL00[uc];
    } else if (5 == hi) {
      return /[\u0591-\u05f4]/.test(ch) ? R : L;
    } else if (6 == hi) {
      if (/[\u0610-\u061a\u064b-\u065f\u06d6-\u06e4\u06e7-\u06ed]/.test(ch))
        return NSM;
      else if (/[\u0660-\u0669\u066b-\u066c]/.test(ch)) return AN;
      else if (1642 == uc) return ET;
      else if (/[\u06f0-\u06f9]/.test(ch)) return EN;
      else return AL;
    } else if (32 == hi && 8287 >= uc) {
      return UnicodeTBL20[255 & uc];
    } else if (254 == hi) {
      return 65136 <= uc ? AL : ON;
    }
    return ON;
  }
  function _isArabicDiacritics(ch) {
    return "\u064B" <= ch && "\u0655" >= ch;
  }
  exports.L = L;
  exports.R = R;
  exports.EN = EN;
  exports.ON_R = 3;
  exports.AN = 4;
  exports.R_H = 5;
  exports.B = 6;
  exports.RLE = 7;
  exports.DOT = "\xB7";
  exports.doBidiReorder = function(text, textCharTypes, isRtl) {
    if (2 > text.length) return {};
    var chars = text.split(""),
      logicalFromVisual = Array(chars.length),
      bidiLevels = Array(chars.length),
      levels = [];
    dir = isRtl ? RTL : LTR;
    _computeLevels(chars, levels, chars.length, textCharTypes);
    for (
      var i = 0;
      i < logicalFromVisual.length;
      logicalFromVisual[i] = i, i++
    ) {}
    _invertLevel(2, levels, logicalFromVisual);
    _invertLevel(1, levels, logicalFromVisual);
    for (var i = 0; i < logicalFromVisual.length - 1; i++) {
      if (textCharTypes[i] === AN) {
        levels[i] = exports.AN;
      } else if (
        levels[i] === R &&
        ((textCharTypes[i] > AL && textCharTypes[i] < LRE) ||
          textCharTypes[i] === ON ||
          textCharTypes[i] === BN)
      ) {
        levels[i] = exports.ON_R;
      } else if (
        0 < i &&
        "\u0644" === chars[i - 1] &&
        /\u0622|\u0623|\u0625|\u0627/.test(chars[i])
      ) {
        levels[i - 1] = levels[i] = exports.R_H;
        i++;
      }
    }
    if (chars[chars.length - 1] === exports.DOT)
      levels[chars.length - 1] = exports.B;
    if ("\u202B" === chars[0]) levels[0] = exports.RLE;
    for (var i = 0; i < logicalFromVisual.length; i++) {
      bidiLevels[i] = levels[logicalFromVisual[i]];
    }
    return { logicalFromVisual: logicalFromVisual, bidiLevels: bidiLevels };
  };
  exports.hasBidiCharacters = function(text, textCharTypes) {
    for (var ret = !1, i = 0; i < text.length; i++) {
      textCharTypes[i] = _getCharacterType(text.charAt(i));
      if (
        !ret &&
        (textCharTypes[i] == R ||
          textCharTypes[i] == AL ||
          textCharTypes[i] == AN)
      )
        ret = !0;
    }
    return ret;
  };
  exports.getVisualFromLogicalIdx = function(logIdx, rowMap) {
    for (var i = 0; i < rowMap.logicalFromVisual.length; i++) {
      if (rowMap.logicalFromVisual[i] == logIdx) return i;
    }
    return 0;
  };
});
ace.define(
  "ace/bidihandler",
  ["require", "exports", "module", "ace/lib/bidiutil", "ace/lib/lang"],
  function(require, exports, module) {
    "use strict";
    var _Mathmax2 = Math.max,
      bidiUtil = require("./lib/bidiutil"),
      lang = require("./lib/lang"),
      bidiRE = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\u202B]/,
      BidiHandler = function BidiHandler(session) {
        this.session = session;
        this.bidiMap = {};
        this.currentRow = null;
        this.bidiUtil = bidiUtil;
        this.charWidths = [];
        this.EOL = "\xAC";
        this.showInvisibles = !0;
        this.isRtlDir = !1;
        this.line = "";
        this.wrapIndent = 0;
        this.EOF = "\xB6";
        this.RLE = "\u202B";
        this.contentWidth = 0;
        this.fontMetrics = null;
        this.rtlLineOffset = 0;
        this.wrapOffset = 0;
        this.isMoveLeftOperation = !1;
        this.seenBidi = bidiRE.test(session.getValue());
      };
    (function() {
      this.isBidiRow = function(screenRow, docRow, splitIndex) {
        if (!this.seenBidi) return !1;
        if (screenRow !== this.currentRow) {
          this.currentRow = screenRow;
          this.updateRowLine(docRow, splitIndex);
          this.updateBidiMap();
        }
        return this.bidiMap.bidiLevels;
      };
      this.onChange = function(delta) {
        if (!this.seenBidi) {
          if ("insert" == delta.action && bidiRE.test(delta.lines.join("\n"))) {
            this.seenBidi = !0;
            this.currentRow = null;
          }
        } else {
          this.currentRow = null;
        }
      };
      this.getDocumentRow = function() {
        var docRow = 0,
          rowCache = this.session.$screenRowCache;
        if (rowCache.length) {
          var index = this.session.$getRowCacheIndex(rowCache, this.currentRow);
          if (0 <= index) docRow = this.session.$docRowCache[index];
        }
        return docRow;
      };
      this.getSplitIndex = function() {
        var splitIndex = 0,
          rowCache = this.session.$screenRowCache;
        if (rowCache.length) {
          var currentIndex,
            prevIndex = this.session.$getRowCacheIndex(
              rowCache,
              this.currentRow
            );
          while (0 < this.currentRow - splitIndex) {
            currentIndex = this.session.$getRowCacheIndex(
              rowCache,
              this.currentRow - splitIndex - 1
            );
            if (currentIndex !== prevIndex) break;
            prevIndex = currentIndex;
            splitIndex++;
          }
        } else {
          splitIndex = this.currentRow;
        }
        return splitIndex;
      };
      this.updateRowLine = function(docRow, splitIndex) {
        if (docRow === void 0) docRow = this.getDocumentRow();
        var isLastRow = docRow === this.session.getLength() - 1,
          endOfLine = isLastRow ? this.EOF : this.EOL;
        this.wrapIndent = 0;
        this.line = this.session.getLine(docRow);
        this.isRtlDir = this.line.charAt(0) === this.RLE;
        if (this.session.$useWrapMode) {
          var splits = this.session.$wrapData[docRow];
          if (splits) {
            if (splitIndex === void 0) splitIndex = this.getSplitIndex();
            if (0 < splitIndex && splits.length) {
              this.wrapIndent = splits.indent;
              this.wrapOffset = this.wrapIndent * this.charWidths[bidiUtil.L];
              this.line =
                splitIndex < splits.length
                  ? this.line.substring(
                      splits[splitIndex - 1],
                      splits[splitIndex]
                    )
                  : this.line.substring(splits[splits.length - 1]);
            } else {
              this.line = this.line.substring(0, splits[splitIndex]);
            }
          }
          if (splitIndex == splits.length)
            this.line += this.showInvisibles ? endOfLine : bidiUtil.DOT;
        } else {
          this.line += this.showInvisibles ? endOfLine : bidiUtil.DOT;
        }
        var session = this.session,
          shift = 0,
          size;
        this.line = this.line.replace(
          /\t|[\u1100-\u2029, \u202F-\uFFE6]/g,
          function(ch, i) {
            if ("\t" === ch || session.isFullWidth(ch.charCodeAt(0))) {
              size = "\t" === ch ? session.getScreenTabSize(i + shift) : 2;
              shift += size - 1;
              return lang.stringRepeat(bidiUtil.DOT, size);
            }
            return ch;
          }
        );
        if (this.isRtlDir) {
          this.fontMetrics.$main.innerHTML =
            this.line.charAt(this.line.length - 1) == bidiUtil.DOT
              ? this.line.substr(0, this.line.length - 1)
              : this.line;
          this.rtlLineOffset =
            this.contentWidth -
            this.fontMetrics.$main.getBoundingClientRect().width;
        }
      };
      this.updateBidiMap = function() {
        var textCharTypes = [];
        if (
          bidiUtil.hasBidiCharacters(this.line, textCharTypes) ||
          this.isRtlDir
        ) {
          this.bidiMap = bidiUtil.doBidiReorder(
            this.line,
            textCharTypes,
            this.isRtlDir
          );
        } else {
          this.bidiMap = {};
        }
      };
      this.markAsDirty = function() {
        this.currentRow = null;
      };
      this.updateCharacterWidths = function(fontMetrics) {
        if (this.characterWidth === fontMetrics.$characterSize.width) return;
        this.fontMetrics = fontMetrics;
        var characterWidth = (this.characterWidth =
            fontMetrics.$characterSize.width),
          bidiCharWidth = fontMetrics.$measureCharWidth("\u05D4");
        this.charWidths[bidiUtil.L] = this.charWidths[
          bidiUtil.EN
        ] = this.charWidths[bidiUtil.ON_R] = characterWidth;
        this.charWidths[bidiUtil.R] = this.charWidths[
          bidiUtil.AN
        ] = bidiCharWidth;
        this.charWidths[bidiUtil.R_H] = 0.45 * bidiCharWidth;
        this.charWidths[bidiUtil.B] = this.charWidths[bidiUtil.RLE] = 0;
        this.currentRow = null;
      };
      this.setShowInvisibles = function(showInvisibles) {
        this.showInvisibles = showInvisibles;
        this.currentRow = null;
      };
      this.setEolChar = function(eolChar) {
        this.EOL = eolChar;
      };
      this.setContentWidth = function(width) {
        this.contentWidth = width;
      };
      this.isRtlLine = function(row) {
        if (row != void 0)
          return this.session.getLine(row).charAt(0) == this.RLE;
        else return this.isRtlDir;
      };
      this.setRtlDirection = function(editor, isRtlDir) {
        for (
          var cursor = editor.getCursorPosition(),
            row = editor.selection.getSelectionAnchor().row;
          row <= cursor.row;
          row++
        ) {
          if (
            !isRtlDir &&
            editor.session.getLine(row).charAt(0) ===
              editor.session.$bidiHandler.RLE
          )
            editor.session.doc.removeInLine(row, 0, 1);
          else if (
            isRtlDir &&
            editor.session.getLine(row).charAt(0) !==
              editor.session.$bidiHandler.RLE
          )
            editor.session.doc.insert(
              { column: 0, row: row },
              editor.session.$bidiHandler.RLE
            );
        }
      };
      this.getPosLeft = function(col) {
        col -= this.wrapIndent;
        var leftBoundary = this.line.charAt(0) === this.RLE ? 1 : 0,
          logicalIdx =
            col > leftBoundary
              ? this.session.getOverwrite()
                ? col
                : col - 1
              : leftBoundary,
          visualIdx = bidiUtil.getVisualFromLogicalIdx(
            logicalIdx,
            this.bidiMap
          ),
          levels = this.bidiMap.bidiLevels,
          left = 0;
        if (
          !this.session.getOverwrite() &&
          col <= leftBoundary &&
          0 !== levels[visualIdx] % 2
        )
          visualIdx++;
        for (var i = 0; i < visualIdx; i++) {
          left += this.charWidths[levels[i]];
        }
        if (
          !this.session.getOverwrite() &&
          col > leftBoundary &&
          0 === levels[visualIdx] % 2
        )
          left += this.charWidths[levels[visualIdx]];
        if (this.wrapIndent)
          left += this.isRtlDir ? -1 * this.wrapOffset : this.wrapOffset;
        if (this.isRtlDir) left += this.rtlLineOffset;
        return left;
      };
      this.getSelections = function(startCol, endCol) {
        var map = this.bidiMap,
          levels = map.bidiLevels,
          level,
          selections = [],
          offset = 0,
          selColMin = Math.min(startCol, endCol) - this.wrapIndent,
          selColMax = _Mathmax2(startCol, endCol) - this.wrapIndent,
          isSelected = !1,
          isSelectedPrev = !1,
          selectionStart = 0;
        if (this.wrapIndent)
          offset += this.isRtlDir ? -1 * this.wrapOffset : this.wrapOffset;
        for (var logIdx, visIdx = 0; visIdx < levels.length; visIdx++) {
          logIdx = map.logicalFromVisual[visIdx];
          level = levels[visIdx];
          isSelected = logIdx >= selColMin && logIdx < selColMax;
          if (isSelected && !isSelectedPrev) {
            selectionStart = offset;
          } else if (!isSelected && isSelectedPrev) {
            selections.push({
              left: selectionStart,
              width: offset - selectionStart
            });
          }
          offset += this.charWidths[level];
          isSelectedPrev = isSelected;
        }
        if (isSelected && visIdx === levels.length) {
          selections.push({
            left: selectionStart,
            width: offset - selectionStart
          });
        }
        if (this.isRtlDir) {
          for (var i = 0; i < selections.length; i++) {
            selections[i].left += this.rtlLineOffset;
          }
        }
        return selections;
      };
      this.offsetToCol = function(posX) {
        if (this.isRtlDir) posX -= this.rtlLineOffset;
        var logicalIdx = 0,
          posX = _Mathmax2(posX, 0),
          offset = 0,
          visualIdx = 0,
          levels = this.bidiMap.bidiLevels,
          charWidth = this.charWidths[levels[visualIdx]];
        if (this.wrapIndent)
          posX -= this.isRtlDir ? -1 * this.wrapOffset : this.wrapOffset;
        while (posX > offset + charWidth / 2) {
          offset += charWidth;
          if (visualIdx === levels.length - 1) {
            charWidth = 0;
            break;
          }
          charWidth = this.charWidths[levels[++visualIdx]];
        }
        if (
          0 < visualIdx &&
          0 !== levels[visualIdx - 1] % 2 &&
          0 === levels[visualIdx] % 2
        ) {
          if (posX < offset) visualIdx--;
          logicalIdx = this.bidiMap.logicalFromVisual[visualIdx];
        } else if (
          0 < visualIdx &&
          0 === levels[visualIdx - 1] % 2 &&
          0 !== levels[visualIdx] % 2
        ) {
          logicalIdx =
            1 +
            (posX > offset
              ? this.bidiMap.logicalFromVisual[visualIdx]
              : this.bidiMap.logicalFromVisual[visualIdx - 1]);
        } else if (
          (this.isRtlDir &&
            visualIdx === levels.length - 1 &&
            0 === charWidth &&
            0 === levels[visualIdx - 1] % 2) ||
          (!this.isRtlDir && 0 === visualIdx && 0 !== levels[visualIdx] % 2)
        ) {
          logicalIdx = 1 + this.bidiMap.logicalFromVisual[visualIdx];
        } else {
          if (
            0 < visualIdx &&
            0 !== levels[visualIdx - 1] % 2 &&
            0 !== charWidth
          )
            visualIdx--;
          logicalIdx = this.bidiMap.logicalFromVisual[visualIdx];
        }
        if (0 === logicalIdx && this.isRtlDir) logicalIdx++;
        return logicalIdx + this.wrapIndent;
      };
    }.call(BidiHandler.prototype));
    exports.BidiHandler = BidiHandler;
  }
);
ace.define(
  "ace/selection",
  [
    "require",
    "exports",
    "module",
    "ace/lib/oop",
    "ace/lib/lang",
    "ace/lib/event_emitter",
    "ace/range"
  ],
  function(require, exports, module) {
    "use strict";
    var oop = require("./lib/oop"),
      lang = require("./lib/lang"),
      EventEmitter = require("./lib/event_emitter").EventEmitter,
      Range = require("./range").Range,
      Selection = function Selection(session) {
        this.session = session;
        this.doc = session.getDocument();
        this.clearSelection();
        this.cursor = this.lead = this.doc.createAnchor(0, 0);
        this.anchor = this.doc.createAnchor(0, 0);
        this.$silent = !1;
        var self = this;
        this.cursor.on("change", function(e) {
          self.$cursorChanged = !0;
          if (!self.$silent) self._emit("changeCursor");
          if (!self.$isEmpty && !self.$silent) self._emit("changeSelection");
          if (
            !self.$keepDesiredColumnOnChange &&
            e.old.column != e.value.column
          )
            self.$desiredColumn = null;
        });
        this.anchor.on("change", function() {
          self.$anchorChanged = !0;
          if (!self.$isEmpty && !self.$silent) self._emit("changeSelection");
        });
      };
    (function() {
      oop.implement(this, EventEmitter);
      this.isEmpty = function() {
        return (
          this.$isEmpty ||
          (this.anchor.row == this.lead.row &&
            this.anchor.column == this.lead.column)
        );
      };
      this.isMultiLine = function() {
        return !this.$isEmpty && this.anchor.row != this.cursor.row;
      };
      this.getCursor = function() {
        return this.lead.getPosition();
      };
      this.setSelectionAnchor = function(row, column) {
        this.$isEmpty = !1;
        this.anchor.setPosition(row, column);
      };
      this.getAnchor = this.getSelectionAnchor = function() {
        if (this.$isEmpty) return this.getSelectionLead();
        return this.anchor.getPosition();
      };
      this.getSelectionLead = function() {
        return this.lead.getPosition();
      };
      this.isBackwards = function() {
        var anchor = this.anchor,
          lead = this.lead;
        return (
          anchor.row > lead.row ||
          (anchor.row == lead.row && anchor.column > lead.column)
        );
      };
      this.getRange = function() {
        var anchor = this.anchor,
          lead = this.lead;
        if (this.$isEmpty) return Range.fromPoints(lead, lead);
        return this.isBackwards()
          ? Range.fromPoints(lead, anchor)
          : Range.fromPoints(anchor, lead);
      };
      this.clearSelection = function() {
        if (!this.$isEmpty) {
          this.$isEmpty = !0;
          this._emit("changeSelection");
        }
      };
      this.selectAll = function() {
        this.$setSelection(0, 0, Number.MAX_VALUE, Number.MAX_VALUE);
      };
      this.setRange = this.setSelectionRange = function(range, reverse) {
        var start = reverse ? range.end : range.start,
          end = reverse ? range.start : range.end;
        this.$setSelection(start.row, start.column, end.row, end.column);
      };
      this.$setSelection = function(
        anchorRow,
        anchorColumn,
        cursorRow,
        cursorColumn
      ) {
        var wasEmpty = this.$isEmpty,
          wasMultiselect = this.inMultiSelectMode;
        this.$silent = !0;
        this.$cursorChanged = this.$anchorChanged = !1;
        this.anchor.setPosition(anchorRow, anchorColumn);
        this.cursor.setPosition(cursorRow, cursorColumn);
        this.$isEmpty = !Range.comparePoints(this.anchor, this.cursor);
        this.$silent = !1;
        if (this.$cursorChanged) this._emit("changeCursor");
        if (
          this.$cursorChanged ||
          this.$anchorChanged ||
          wasEmpty != this.$isEmpty ||
          wasMultiselect
        )
          this._emit("changeSelection");
      };
      this.$moveSelection = function(mover) {
        var lead = this.lead;
        if (this.$isEmpty) this.setSelectionAnchor(lead.row, lead.column);
        mover.call(this);
      };
      this.selectTo = function(row, column) {
        this.$moveSelection(function() {
          this.moveCursorTo(row, column);
        });
      };
      this.selectToPosition = function(pos) {
        this.$moveSelection(function() {
          this.moveCursorToPosition(pos);
        });
      };
      this.moveTo = function(row, column) {
        this.clearSelection();
        this.moveCursorTo(row, column);
      };
      this.moveToPosition = function(pos) {
        this.clearSelection();
        this.moveCursorToPosition(pos);
      };
      this.selectUp = function() {
        this.$moveSelection(this.moveCursorUp);
      };
      this.selectDown = function() {
        this.$moveSelection(this.moveCursorDown);
      };
      this.selectRight = function() {
        this.$moveSelection(this.moveCursorRight);
      };
      this.selectLeft = function() {
        this.$moveSelection(this.moveCursorLeft);
      };
      this.selectLineStart = function() {
        this.$moveSelection(this.moveCursorLineStart);
      };
      this.selectLineEnd = function() {
        this.$moveSelection(this.moveCursorLineEnd);
      };
      this.selectFileEnd = function() {
        this.$moveSelection(this.moveCursorFileEnd);
      };
      this.selectFileStart = function() {
        this.$moveSelection(this.moveCursorFileStart);
      };
      this.selectWordRight = function() {
        this.$moveSelection(this.moveCursorWordRight);
      };
      this.selectWordLeft = function() {
        this.$moveSelection(this.moveCursorWordLeft);
      };
      this.getWordRange = function(row, column) {
        if ("undefined" == typeof column) {
          var cursor = row || this.lead;
          row = cursor.row;
          column = cursor.column;
        }
        return this.session.getWordRange(row, column);
      };
      this.selectWord = function() {
        this.setSelectionRange(this.getWordRange());
      };
      this.selectAWord = function() {
        var cursor = this.getCursor(),
          range = this.session.getAWordRange(cursor.row, cursor.column);
        this.setSelectionRange(range);
      };
      this.getLineRange = function(row, excludeLastChar) {
        var rowStart = "number" == typeof row ? row : this.lead.row,
          rowEnd,
          foldLine = this.session.getFoldLine(rowStart);
        if (foldLine) {
          rowStart = foldLine.start.row;
          rowEnd = foldLine.end.row;
        } else {
          rowEnd = rowStart;
        }
        if (!0 === excludeLastChar)
          return new Range(
            rowStart,
            0,
            rowEnd,
            this.session.getLine(rowEnd).length
          );
        else return new Range(rowStart, 0, rowEnd + 1, 0);
      };
      this.selectLine = function() {
        this.setSelectionRange(this.getLineRange());
      };
      this.moveCursorUp = function() {
        this.moveCursorBy(-1, 0);
      };
      this.moveCursorDown = function() {
        this.moveCursorBy(1, 0);
      };
      this.wouldMoveIntoSoftTab = function(cursor, tabSize, direction) {
        var start = cursor.column,
          end = cursor.column + tabSize;
        if (0 > direction) {
          start = cursor.column - tabSize;
          end = cursor.column;
        }
        return (
          this.session.isTabStop(cursor) &&
          this.doc
            .getLine(cursor.row)
            .slice(start, end)
            .split(" ").length -
            1 ==
            tabSize
        );
      };
      this.moveCursorLeft = function() {
        var cursor = this.lead.getPosition(),
          fold;
        if ((fold = this.session.getFoldAt(cursor.row, cursor.column, -1))) {
          this.moveCursorTo(fold.start.row, fold.start.column);
        } else if (0 === cursor.column) {
          if (0 < cursor.row) {
            this.moveCursorTo(
              cursor.row - 1,
              this.doc.getLine(cursor.row - 1).length
            );
          }
        } else {
          var tabSize = this.session.getTabSize();
          if (
            this.wouldMoveIntoSoftTab(cursor, tabSize, -1) &&
            !this.session.getNavigateWithinSoftTabs()
          ) {
            this.moveCursorBy(0, -tabSize);
          } else {
            this.moveCursorBy(0, -1);
          }
        }
      };
      this.moveCursorRight = function() {
        var cursor = this.lead.getPosition(),
          fold;
        if ((fold = this.session.getFoldAt(cursor.row, cursor.column, 1))) {
          this.moveCursorTo(fold.end.row, fold.end.column);
        } else if (this.lead.column == this.doc.getLine(this.lead.row).length) {
          if (this.lead.row < this.doc.getLength() - 1) {
            this.moveCursorTo(this.lead.row + 1, 0);
          }
        } else {
          var tabSize = this.session.getTabSize(),
            cursor = this.lead;
          if (
            this.wouldMoveIntoSoftTab(cursor, tabSize, 1) &&
            !this.session.getNavigateWithinSoftTabs()
          ) {
            this.moveCursorBy(0, tabSize);
          } else {
            this.moveCursorBy(0, 1);
          }
        }
      };
      this.moveCursorLineStart = function() {
        var row = this.lead.row,
          column = this.lead.column,
          screenRow = this.session.documentToScreenRow(row, column),
          firstColumnPosition = this.session.screenToDocumentPosition(
            screenRow,
            0
          ),
          beforeCursor = this.session.getDisplayLine(
            row,
            null,
            firstColumnPosition.row,
            firstColumnPosition.column
          ),
          leadingSpace = beforeCursor.match(/^\s*/);
        if (
          leadingSpace[0].length != column &&
          !this.session.$useEmacsStyleLineStart
        )
          firstColumnPosition.column += leadingSpace[0].length;
        this.moveCursorToPosition(firstColumnPosition);
      };
      this.moveCursorLineEnd = function() {
        var lead = this.lead,
          lineEnd = this.session.getDocumentLastRowColumnPosition(
            lead.row,
            lead.column
          );
        if (this.lead.column == lineEnd.column) {
          var line = this.session.getLine(lineEnd.row);
          if (lineEnd.column == line.length) {
            var textEnd = line.search(/\s+$/);
            if (0 < textEnd) lineEnd.column = textEnd;
          }
        }
        this.moveCursorTo(lineEnd.row, lineEnd.column);
      };
      this.moveCursorFileEnd = function() {
        var row = this.doc.getLength() - 1,
          column = this.doc.getLine(row).length;
        this.moveCursorTo(row, column);
      };
      this.moveCursorFileStart = function() {
        this.moveCursorTo(0, 0);
      };
      this.moveCursorLongWordRight = function() {
        var row = this.lead.row,
          column = this.lead.column,
          line = this.doc.getLine(row),
          rightOfCursor = line.substring(column);
        this.session.nonTokenRe.lastIndex = 0;
        this.session.tokenRe.lastIndex = 0;
        var fold = this.session.getFoldAt(row, column, 1);
        if (fold) {
          this.moveCursorTo(fold.end.row, fold.end.column);
          return;
        }
        if (this.session.nonTokenRe.exec(rightOfCursor)) {
          column += this.session.nonTokenRe.lastIndex;
          this.session.nonTokenRe.lastIndex = 0;
          rightOfCursor = line.substring(column);
        }
        if (column >= line.length) {
          this.moveCursorTo(row, line.length);
          this.moveCursorRight();
          if (row < this.doc.getLength() - 1) this.moveCursorWordRight();
          return;
        }
        if (this.session.tokenRe.exec(rightOfCursor)) {
          column += this.session.tokenRe.lastIndex;
          this.session.tokenRe.lastIndex = 0;
        }
        this.moveCursorTo(row, column);
      };
      this.moveCursorLongWordLeft = function() {
        var row = this.lead.row,
          column = this.lead.column,
          fold;
        if ((fold = this.session.getFoldAt(row, column, -1))) {
          this.moveCursorTo(fold.start.row, fold.start.column);
          return;
        }
        var str = this.session.getFoldStringAt(row, column, -1);
        if (null == str) {
          str = this.doc.getLine(row).substring(0, column);
        }
        var leftOfCursor = lang.stringReverse(str);
        this.session.nonTokenRe.lastIndex = 0;
        this.session.tokenRe.lastIndex = 0;
        if (this.session.nonTokenRe.exec(leftOfCursor)) {
          column -= this.session.nonTokenRe.lastIndex;
          leftOfCursor = leftOfCursor.slice(this.session.nonTokenRe.lastIndex);
          this.session.nonTokenRe.lastIndex = 0;
        }
        if (0 >= column) {
          this.moveCursorTo(row, 0);
          this.moveCursorLeft();
          if (0 < row) this.moveCursorWordLeft();
          return;
        }
        if (this.session.tokenRe.exec(leftOfCursor)) {
          column -= this.session.tokenRe.lastIndex;
          this.session.tokenRe.lastIndex = 0;
        }
        this.moveCursorTo(row, column);
      };
      this.$shortWordEndIndex = function(rightOfCursor) {
        var index = 0,
          ch,
          whitespaceRe = /\s/,
          tokenRe = this.session.tokenRe;
        tokenRe.lastIndex = 0;
        if (this.session.tokenRe.exec(rightOfCursor)) {
          index = this.session.tokenRe.lastIndex;
        } else {
          while ((ch = rightOfCursor[index]) && whitespaceRe.test(ch)) {
            index++;
          }
          if (1 > index) {
            tokenRe.lastIndex = 0;
            while ((ch = rightOfCursor[index]) && !tokenRe.test(ch)) {
              tokenRe.lastIndex = 0;
              index++;
              if (whitespaceRe.test(ch)) {
                if (2 < index) {
                  index--;
                  break;
                } else {
                  while ((ch = rightOfCursor[index]) && whitespaceRe.test(ch)) {
                    index++;
                  }
                  if (2 < index) break;
                }
              }
            }
          }
        }
        tokenRe.lastIndex = 0;
        return index;
      };
      this.moveCursorShortWordRight = function() {
        var row = this.lead.row,
          column = this.lead.column,
          line = this.doc.getLine(row),
          rightOfCursor = line.substring(column),
          fold = this.session.getFoldAt(row, column, 1);
        if (fold) return this.moveCursorTo(fold.end.row, fold.end.column);
        if (column == line.length) {
          var l = this.doc.getLength();
          do {
            row++;
            rightOfCursor = this.doc.getLine(row);
          } while (row < l && /^\s*$/.test(rightOfCursor));
          if (!/^\s+/.test(rightOfCursor)) rightOfCursor = "";
          column = 0;
        }
        var index = this.$shortWordEndIndex(rightOfCursor);
        this.moveCursorTo(row, column + index);
      };
      this.moveCursorShortWordLeft = function() {
        var row = this.lead.row,
          column = this.lead.column,
          fold;
        if ((fold = this.session.getFoldAt(row, column, -1)))
          return this.moveCursorTo(fold.start.row, fold.start.column);
        var line = this.session.getLine(row).substring(0, column);
        if (0 === column) {
          do {
            row--;
            line = this.doc.getLine(row);
          } while (0 < row && /^\s*$/.test(line));
          column = line.length;
          if (!/\s+$/.test(line)) line = "";
        }
        var leftOfCursor = lang.stringReverse(line),
          index = this.$shortWordEndIndex(leftOfCursor);
        return this.moveCursorTo(row, column - index);
      };
      this.moveCursorWordRight = function() {
        if (this.session.$selectLongWords) this.moveCursorLongWordRight();
        else this.moveCursorShortWordRight();
      };
      this.moveCursorWordLeft = function() {
        if (this.session.$selectLongWords) this.moveCursorLongWordLeft();
        else this.moveCursorShortWordLeft();
      };
      this.moveCursorBy = function(rows, chars) {
        var screenPos = this.session.documentToScreenPosition(
            this.lead.row,
            this.lead.column
          ),
          offsetX;
        if (0 === chars) {
          if (0 !== rows) {
            if (
              this.session.$bidiHandler.isBidiRow(screenPos.row, this.lead.row)
            ) {
              offsetX = this.session.$bidiHandler.getPosLeft(screenPos.column);
              screenPos.column = Math.round(
                offsetX / this.session.$bidiHandler.charWidths[0]
              );
            } else {
              offsetX =
                screenPos.column * this.session.$bidiHandler.charWidths[0];
            }
          }
          if (this.$desiredColumn) screenPos.column = this.$desiredColumn;
          else this.$desiredColumn = screenPos.column;
        }
        var docPos = this.session.screenToDocumentPosition(
          screenPos.row + rows,
          screenPos.column,
          offsetX
        );
        if (
          0 !== rows &&
          0 === chars &&
          docPos.row === this.lead.row &&
          docPos.column === this.lead.column
        ) {
          if (
            this.session.lineWidgets &&
            this.session.lineWidgets[docPos.row]
          ) {
            if (0 < docPos.row || 0 < rows) docPos.row++;
          }
        }
        this.moveCursorTo(docPos.row, docPos.column + chars, 0 === chars);
      };
      this.moveCursorToPosition = function(position) {
        this.moveCursorTo(position.row, position.column);
      };
      this.moveCursorTo = function(row, column, keepDesiredColumn) {
        var fold = this.session.getFoldAt(row, column, 1);
        if (fold) {
          row = fold.start.row;
          column = fold.start.column;
        }
        this.$keepDesiredColumnOnChange = !0;
        var line = this.session.getLine(row);
        if (
          /[\uDC00-\uDFFF]/.test(line.charAt(column)) &&
          line.charAt(column - 1)
        ) {
          if (this.lead.row == row && this.lead.column == column + 1)
            column = column - 1;
          else column = column + 1;
        }
        this.lead.setPosition(row, column);
        this.$keepDesiredColumnOnChange = !1;
        if (!keepDesiredColumn) this.$desiredColumn = null;
      };
      this.moveCursorToScreen = function(row, column, keepDesiredColumn) {
        var pos = this.session.screenToDocumentPosition(row, column);
        this.moveCursorTo(pos.row, pos.column, keepDesiredColumn);
      };
      this.detach = function() {
        this.lead.detach();
        this.anchor.detach();
        this.session = this.doc = null;
      };
      this.fromOrientedRange = function(range) {
        this.setSelectionRange(range, range.cursor == range.start);
        this.$desiredColumn = range.desiredColumn || this.$desiredColumn;
      };
      this.toOrientedRange = function(range) {
        var r = this.getRange();
        if (range) {
          range.start.column = r.start.column;
          range.start.row = r.start.row;
          range.end.column = r.end.column;
          range.end.row = r.end.row;
        } else {
          range = r;
        }
        range.cursor = this.isBackwards() ? range.start : range.end;
        range.desiredColumn = this.$desiredColumn;
        return range;
      };
      this.getRangeOfMovements = function(func) {
        var start = this.getCursor();
        try {
          func(this);
          var end = this.getCursor();
          return Range.fromPoints(start, end);
        } catch (e) {
          return Range.fromPoints(start, start);
        } finally {
          this.moveCursorToPosition(start);
        }
      };
      this.toJSON = function() {
        if (this.rangeCount) {
          var data = this.ranges.map(function(r) {
            var r1 = r.clone();
            r1.isBackwards = r.cursor == r.start;
            return r1;
          });
        } else {
          var data = this.getRange();
          data.isBackwards = this.isBackwards();
        }
        return data;
      };
      this.fromJSON = function(data) {
        if (data.start == void 0) {
          if (this.rangeList) {
            this.toSingleRange(data[0]);
            for (var i = data.length, r; i--; ) {
              r = Range.fromPoints(data[i].start, data[i].end);
              if (data[i].isBackwards) r.cursor = r.start;
              this.addRange(r, !0);
            }
            return;
          } else {
            data = data[0];
          }
        }
        if (this.rangeList) this.toSingleRange(data);
        this.setSelectionRange(data, data.isBackwards);
      };
      this.isEqual = function(data) {
        if ((data.length || this.rangeCount) && data.length != this.rangeCount)
          return !1;
        if (!data.length || !this.ranges) return this.getRange().isEqual(data);
        for (var i = this.ranges.length; i--; ) {
          if (!this.ranges[i].isEqual(data[i])) return !1;
        }
        return !0;
      };
    }.call(Selection.prototype));
    exports.Selection = Selection;
  }
);
ace.define(
  "ace/tokenizer",
  ["require", "exports", "module", "ace/config"],
  function(require, exports, module) {
    "use strict";
    var config = require("./config"),
      MAX_TOKEN_COUNT = 2e3,
      Tokenizer = function Tokenizer(rules) {
        this.states = rules;
        this.regExps = {};
        this.matchMappings = {};
        for (var key in this.states) {
          for (
            var state = this.states[key],
              ruleRegExps = [],
              matchTotal = 0,
              mapping = (this.matchMappings[key] = { defaultToken: "text" }),
              flag = "g",
              splitterRurles = [],
              i = 0,
              rule;
            i < state.length;
            i++
          ) {
            rule = state[i];
            if (rule.defaultToken) mapping.defaultToken = rule.defaultToken;
            if (rule.caseInsensitive) flag = "gi";
            if (null == rule.regex) continue;
            if (babelHelpers.instanceof(rule.regex, RegExp))
              rule.regex = rule.regex.toString().slice(1, -1);
            var adjustedregex = rule.regex,
              matchcount =
                new RegExp("(?:(" + adjustedregex + ")|(.))").exec("a").length -
                2;
            if (Array.isArray(rule.token)) {
              if (1 == rule.token.length || 1 == matchcount) {
                rule.token = rule.token[0];
              } else if (matchcount - 1 != rule.token.length) {
                this.reportError(
                  "number of classes and regexp groups doesn't match",
                  { rule: rule, groupCount: matchcount - 1 }
                );
                rule.token = rule.token[0];
              } else {
                rule.tokenArray = rule.token;
                rule.token = null;
                rule.onMatch = this.$arrayTokens;
              }
            } else if ("function" == typeof rule.token && !rule.onMatch) {
              if (1 < matchcount) rule.onMatch = this.$applyToken;
              else rule.onMatch = rule.token;
            }
            if (1 < matchcount) {
              if (/\\\d/.test(rule.regex)) {
                adjustedregex = rule.regex.replace(/\\([0-9]+)/g, function(
                  match,
                  digit
                ) {
                  return "\\" + (parseInt(digit, 10) + matchTotal + 1);
                });
              } else {
                matchcount = 1;
                adjustedregex = this.removeCapturingGroups(rule.regex);
              }
              if (!rule.splitRegex && "string" != typeof rule.token)
                splitterRurles.push(rule);
            }
            mapping[matchTotal] = i;
            matchTotal += matchcount;
            ruleRegExps.push(adjustedregex);
            if (!rule.onMatch) rule.onMatch = null;
          }
          if (!ruleRegExps.length) {
            mapping[0] = 0;
            ruleRegExps.push("$");
          }
          splitterRurles.forEach(function(rule) {
            rule.splitRegex = this.createSplitterRegexp(rule.regex, flag);
          }, this);
          this.regExps[key] = new RegExp(
            "(" + ruleRegExps.join(")|(") + ")|($)",
            flag
          );
        }
      };
    (function() {
      this.$setMaxTokenCount = function(m) {
        MAX_TOKEN_COUNT = 0 | m;
      };
      this.$applyToken = function(str) {
        var values = this.splitRegex.exec(str).slice(1),
          types = this.token.apply(this, values);
        if ("string" === typeof types) return [{ type: types, value: str }];
        for (var tokens = [], i = 0, l = types.length; i < l; i++) {
          if (values[i])
            tokens[tokens.length] = { type: types[i], value: values[i] };
        }
        return tokens;
      };
      this.$arrayTokens = function(str) {
        if (!str) return [];
        var values = this.splitRegex.exec(str);
        if (!values) return "text";
        for (
          var tokens = [], types = this.tokenArray, i = 0, l = types.length;
          i < l;
          i++
        ) {
          if (values[i + 1])
            tokens[tokens.length] = { type: types[i], value: values[i + 1] };
        }
        return tokens;
      };
      this.removeCapturingGroups = function(src) {
        var r = src.replace(/\\.|\[(?:\\.|[^\\\]])*|\(\?[:=!]|(\()/g, function(
          x,
          y
        ) {
          return y ? "(?:" : x;
        });
        return r;
      };
      this.createSplitterRegexp = function(src, flag) {
        if (-1 != src.indexOf("(?=")) {
          var stack = 0,
            inChClass = !1,
            lastCapture = {};
          src.replace(/(\\.)|(\((?:\?[=!])?)|(\))|([\[\]])/g, function(
            m,
            esc,
            parenOpen,
            parenClose,
            square,
            index
          ) {
            if (inChClass) {
              inChClass = "]" != square;
            } else if (square) {
              inChClass = !0;
            } else if (parenClose) {
              if (stack == lastCapture.stack) {
                lastCapture.end = index + 1;
                lastCapture.stack = -1;
              }
              stack--;
            } else if (parenOpen) {
              stack++;
              if (1 != parenOpen.length) {
                lastCapture.stack = stack;
                lastCapture.start = index;
              }
            }
            return m;
          });
          if (
            null != lastCapture.end &&
            /^\)*$/.test(src.substr(lastCapture.end))
          )
            src =
              src.substring(0, lastCapture.start) + src.substr(lastCapture.end);
        }
        if ("^" != src.charAt(0)) src = "^" + src;
        if ("$" != src.charAt(src.length - 1)) src += "$";
        return new RegExp(src, (flag || "").replace("g", ""));
      };
      this.getLineTokens = function(line, startState) {
        if (startState && "string" != typeof startState) {
          var stack = startState.slice(0);
          startState = stack[0];
          if ("#tmp" === startState) {
            stack.shift();
            startState = stack.shift();
          }
        } else var stack = [];
        var currentState = startState || "start",
          state = this.states[currentState];
        if (!state) {
          currentState = "start";
          state = this.states[currentState];
        }
        var mapping = this.matchMappings[currentState],
          re = this.regExps[currentState];
        re.lastIndex = 0;
        var match,
          tokens = [],
          lastIndex = 0,
          matchAttempts = 0,
          token = { type: null, value: "" };
        while ((match = re.exec(line))) {
          var type = mapping.defaultToken,
            rule = null,
            value = match[0],
            index = re.lastIndex;
          if (index - value.length > lastIndex) {
            var skipped = line.substring(lastIndex, index - value.length);
            if (token.type == type) {
              token.value += skipped;
            } else {
              if (token.type) tokens.push(token);
              token = { type: type, value: skipped };
            }
          }
          for (var i = 0; i < match.length - 2; i++) {
            if (match[i + 1] === void 0) continue;
            rule = state[mapping[i]];
            if (rule.onMatch)
              type = rule.onMatch(value, currentState, stack, line);
            else type = rule.token;
            if (rule.next) {
              if ("string" == typeof rule.next) {
                currentState = rule.next;
              } else {
                currentState = rule.next(currentState, stack);
              }
              state = this.states[currentState];
              if (!state) {
                this.reportError("state doesn't exist", currentState);
                currentState = "start";
                state = this.states[currentState];
              }
              mapping = this.matchMappings[currentState];
              lastIndex = index;
              re = this.regExps[currentState];
              re.lastIndex = index;
            }
            if (rule.consumeLineEnd) lastIndex = index;
            break;
          }
          if (value) {
            if ("string" === typeof type) {
              if ((!rule || !1 !== rule.merge) && token.type === type) {
                token.value += value;
              } else {
                if (token.type) tokens.push(token);
                token = { type: type, value: value };
              }
            } else if (type) {
              if (token.type) tokens.push(token);
              token = { type: null, value: "" };
              for (var i = 0; i < type.length; i++) {
                tokens.push(type[i]);
              }
            }
          }
          if (lastIndex == line.length) break;
          lastIndex = index;
          if (matchAttempts++ > MAX_TOKEN_COUNT) {
            if (matchAttempts > 2 * line.length) {
              this.reportError("infinite loop with in ace tokenizer", {
                startState: startState,
                line: line
              });
            }
            while (lastIndex < line.length) {
              if (token.type) tokens.push(token);
              token = {
                value: line.substring(lastIndex, (lastIndex += 2e3)),
                type: "overflow"
              };
            }
            currentState = "start";
            stack = [];
            break;
          }
        }
        if (token.type) tokens.push(token);
        if (1 < stack.length) {
          if (stack[0] !== currentState) stack.unshift("#tmp", currentState);
        }
        return { tokens: tokens, state: stack.length ? stack : currentState };
      };
      this.reportError = config.reportError;
    }.call(Tokenizer.prototype));
    exports.Tokenizer = Tokenizer;
  }
);
ace.define(
  "ace/mode/text_highlight_rules",
  ["require", "exports", "module", "ace/lib/lang"],
  function(require, exports, module) {
    "use strict";
    var lang = require("../lib/lang"),
      TextHighlightRules = function TextHighlightRules() {
        this.$rules = {
          start: [
            { token: "empty_line", regex: "^$" },
            { defaultToken: "text" }
          ]
        };
      };
    (function() {
      this.addRules = function(rules, prefix) {
        if (!prefix) {
          for (var key in rules) {
            this.$rules[key] = rules[key];
          }
          return;
        }
        for (var key in rules) {
          for (var state = rules[key], i = 0, rule; i < state.length; i++) {
            rule = state[i];
            if (rule.next || rule.onMatch) {
              if ("string" == typeof rule.next) {
                if (0 !== rule.next.indexOf(prefix))
                  rule.next = prefix + rule.next;
              }
              if (rule.nextState && 0 !== rule.nextState.indexOf(prefix))
                rule.nextState = prefix + rule.nextState;
            }
          }
          this.$rules[prefix + key] = state;
        }
      };
      this.getRules = function() {
        return this.$rules;
      };
      this.embedRules = function(
        HighlightRules,
        prefix,
        escapeRules,
        states,
        append
      ) {
        var embedRules =
          "function" == typeof HighlightRules
            ? new HighlightRules().getRules()
            : HighlightRules;
        if (states) {
          for (var i = 0; i < states.length; i++) {
            states[i] = prefix + states[i];
          }
        } else {
          states = [];
          for (var key in embedRules) {
            states.push(prefix + key);
          }
        }
        this.addRules(embedRules, prefix);
        if (escapeRules) {
          for (
            var addRules = Array.prototype[append ? "push" : "unshift"], i = 0;
            i < states.length;
            i++
          ) {
            addRules.apply(this.$rules[states[i]], lang.deepCopy(escapeRules));
          }
        }
        if (!this.$embeds) this.$embeds = [];
        this.$embeds.push(prefix);
      };
      this.getEmbeds = function() {
        return this.$embeds;
      };
      var pushState = function pushState(currentState, stack) {
          if ("start" != currentState || stack.length)
            stack.unshift(this.nextState, currentState);
          return this.nextState;
        },
        popState = function popState(currentState, stack) {
          stack.shift();
          return stack.shift() || "start";
        };
      this.normalizeRules = function() {
        var id = 0,
          rules = this.$rules;
        function processState(key) {
          var state = rules[key];
          state.processed = !0;
          for (var i = 0; i < state.length; i++) {
            var rule = state[i],
              toInsert = null;
            if (Array.isArray(rule)) {
              toInsert = rule;
              rule = {};
            }
            if (!rule.regex && rule.start) {
              rule.regex = rule.start;
              if (!rule.next) rule.next = [];
              rule.next.push(
                { defaultToken: rule.token },
                {
                  token: rule.token + ".end",
                  regex: rule.end || rule.start,
                  next: "pop"
                }
              );
              rule.token = rule.token + ".start";
              rule.push = !0;
            }
            var next = rule.next || rule.push;
            if (next && Array.isArray(next)) {
              var stateName = rule.stateName;
              if (!stateName) {
                stateName = rule.token;
                if ("string" != typeof stateName)
                  stateName = stateName[0] || "";
                if (rules[stateName]) stateName += id++;
              }
              rules[stateName] = next;
              rule.next = stateName;
              processState(stateName);
            } else if ("pop" == next) {
              rule.next = popState;
            }
            if (rule.push) {
              rule.nextState = rule.next || rule.push;
              rule.next = pushState;
              delete rule.push;
            }
            if (rule.rules) {
              for (var r in rule.rules) {
                if (rules[r]) {
                  if (rules[r].push)
                    rules[r].push.apply(rules[r], rule.rules[r]);
                } else {
                  rules[r] = rule.rules[r];
                }
              }
            }
            var includeName = "string" == typeof rule ? rule : rule.include;
            if (includeName) {
              if (Array.isArray(includeName))
                toInsert = includeName.map(function(x) {
                  return rules[x];
                });
              else toInsert = rules[includeName];
            }
            if (toInsert) {
              var args = [i, 1].concat(toInsert);
              if (rule.noEscape)
                args = args.filter(function(x) {
                  return !x.next;
                });
              state.splice.apply(state, args);
              i--;
            }
            if (rule.keywordMap) {
              rule.token = this.createKeywordMapper(
                rule.keywordMap,
                rule.defaultToken || "text",
                rule.caseInsensitive
              );
              delete rule.defaultToken;
            }
          }
        }
        Object.keys(rules).forEach(processState, this);
      };
      this.createKeywordMapper = function(
        map,
        defaultToken,
        ignoreCase,
        splitChar
      ) {
        var keywords = Object.create(null);
        Object.keys(map).forEach(function(className) {
          var a = map[className];
          if (ignoreCase) a = a.toLowerCase();
          for (var list = a.split(splitChar || "|"), i = list.length; i--; ) {
            keywords[list[i]] = className;
          }
        });
        if (Object.getPrototypeOf(keywords)) {
          keywords.__proto__ = null;
        }
        this.$keywordList = Object.keys(keywords);
        map = null;
        return ignoreCase
          ? function(value) {
              return keywords[value.toLowerCase()] || defaultToken;
            }
          : function(value) {
              return keywords[value] || defaultToken;
            };
      };
      this.getKeywords = function() {
        return this.$keywords;
      };
    }.call(TextHighlightRules.prototype));
    exports.TextHighlightRules = TextHighlightRules;
  }
);
ace.define("ace/mode/behaviour", ["require", "exports", "module"], function(
  require,
  exports,
  module
) {
  "use strict";
  var Behaviour = function Behaviour() {
    this.$behaviours = {};
  };
  (function() {
    this.add = function(name, action, callback) {
      switch (void 0) {
        case this.$behaviours:
          this.$behaviours = {};
        case this.$behaviours[name]:
          this.$behaviours[name] = {};
      }
      this.$behaviours[name][action] = callback;
    };
    this.addBehaviours = function(behaviours) {
      for (var key in behaviours) {
        for (var action in behaviours[key]) {
          this.add(key, action, behaviours[key][action]);
        }
      }
    };
    this.remove = function(name) {
      if (this.$behaviours && this.$behaviours[name]) {
        delete this.$behaviours[name];
      }
    };
    this.inherit = function(mode, filter) {
      if ("function" === typeof mode) {
        var behaviours = new mode().getBehaviours(filter);
      } else {
        var behaviours = mode.getBehaviours(filter);
      }
      this.addBehaviours(behaviours);
    };
    this.getBehaviours = function(filter) {
      if (!filter) {
        return this.$behaviours;
      } else {
        for (var ret = {}, i = 0; i < filter.length; i++) {
          if (this.$behaviours[filter[i]]) {
            ret[filter[i]] = this.$behaviours[filter[i]];
          }
        }
        return ret;
      }
    };
  }.call(Behaviour.prototype));
  exports.Behaviour = Behaviour;
});
ace.define(
  "ace/token_iterator",
  ["require", "exports", "module", "ace/range"],
  function(require, exports, module) {
    "use strict";
    var Range = require("./range").Range,
      TokenIterator = function TokenIterator(
        session,
        initialRow,
        initialColumn
      ) {
        this.$session = session;
        this.$row = initialRow;
        this.$rowTokens = session.getTokens(initialRow);
        var token = session.getTokenAt(initialRow, initialColumn);
        this.$tokenIndex = token ? token.index : -1;
      };
    (function() {
      this.stepBackward = function() {
        this.$tokenIndex -= 1;
        while (0 > this.$tokenIndex) {
          this.$row -= 1;
          if (0 > this.$row) {
            this.$row = 0;
            return null;
          }
          this.$rowTokens = this.$session.getTokens(this.$row);
          this.$tokenIndex = this.$rowTokens.length - 1;
        }
        return this.$rowTokens[this.$tokenIndex];
      };
      this.stepForward = function() {
        this.$tokenIndex += 1;
        var rowCount;
        while (this.$tokenIndex >= this.$rowTokens.length) {
          this.$row += 1;
          if (!rowCount) rowCount = this.$session.getLength();
          if (this.$row >= rowCount) {
            this.$row = rowCount - 1;
            return null;
          }
          this.$rowTokens = this.$session.getTokens(this.$row);
          this.$tokenIndex = 0;
        }
        return this.$rowTokens[this.$tokenIndex];
      };
      this.getCurrentToken = function() {
        return this.$rowTokens[this.$tokenIndex];
      };
      this.getCurrentTokenRow = function() {
        return this.$row;
      };
      this.getCurrentTokenColumn = function() {
        var rowTokens = this.$rowTokens,
          tokenIndex = this.$tokenIndex,
          column = rowTokens[tokenIndex].start;
        if (column !== void 0) return column;
        column = 0;
        while (0 < tokenIndex) {
          tokenIndex -= 1;
          column += rowTokens[tokenIndex].value.length;
        }
        return column;
      };
      this.getCurrentTokenPosition = function() {
        return { row: this.$row, column: this.getCurrentTokenColumn() };
      };
      this.getCurrentTokenRange = function() {
        var token = this.$rowTokens[this.$tokenIndex],
          column = this.getCurrentTokenColumn();
        return new Range(
          this.$row,
          column,
          this.$row,
          column + token.value.length
        );
      };
    }.call(TokenIterator.prototype));
    exports.TokenIterator = TokenIterator;
  }
);
ace.define(
  "ace/mode/behaviour/cstyle",
  [
    "require",
    "exports",
    "module",
    "ace/lib/oop",
    "ace/mode/behaviour",
    "ace/token_iterator",
    "ace/lib/lang"
  ],
  function(require, exports, module) {
    "use strict";
    var oop = require("../../lib/oop"),
      Behaviour = require("../behaviour").Behaviour,
      TokenIterator = require("../../token_iterator").TokenIterator,
      lang = require("../../lib/lang"),
      SAFE_INSERT_IN_TOKENS = ["text", "paren.rparen", "punctuation.operator"],
      SAFE_INSERT_BEFORE_TOKENS = [
        "text",
        "paren.rparen",
        "punctuation.operator",
        "comment"
      ],
      context,
      contextCache = {},
      defaultQuotes = { '"': '"', "'": "'" },
      initContext = function initContext(editor) {
        var id = -1;
        if (editor.multiSelect) {
          id = editor.selection.index;
          if (contextCache.rangeCount != editor.multiSelect.rangeCount)
            contextCache = { rangeCount: editor.multiSelect.rangeCount };
        }
        if (contextCache[id]) return (context = contextCache[id]);
        context = contextCache[id] = {
          autoInsertedBrackets: 0,
          autoInsertedRow: -1,
          autoInsertedLineEnd: "",
          maybeInsertedBrackets: 0,
          maybeInsertedRow: -1,
          maybeInsertedLineStart: "",
          maybeInsertedLineEnd: ""
        };
      },
      getWrapped = function getWrapped(selection, selected, opening, closing) {
        var rowDiff = selection.end.row - selection.start.row;
        return {
          text: opening + selected + closing,
          selection: [
            0,
            selection.start.column + 1,
            rowDiff,
            selection.end.column + (rowDiff ? 0 : 1)
          ]
        };
      },
      CstyleBehaviour = function CstyleBehaviour(options) {
        this.add("braces", "insertion", function(
          state,
          action,
          editor,
          session,
          text
        ) {
          var cursor = editor.getCursorPosition(),
            line = session.doc.getLine(cursor.row);
          if ("{" == text) {
            initContext(editor);
            var selection = editor.getSelectionRange(),
              selected = session.doc.getTextRange(selection);
            if (
              "" !== selected &&
              "{" !== selected &&
              editor.getWrapBehavioursEnabled()
            ) {
              return getWrapped(selection, selected, "{", "}");
            } else if (CstyleBehaviour.isSaneInsertion(editor, session)) {
              if (
                /[\]\}\)]/.test(line[cursor.column]) ||
                editor.inMultiSelectMode ||
                (options && options.braces)
              ) {
                CstyleBehaviour.recordAutoInsert(editor, session, "}");
                return { text: "{}", selection: [1, 1] };
              } else {
                CstyleBehaviour.recordMaybeInsert(editor, session, "{");
                return { text: "{", selection: [1, 1] };
              }
            }
          } else if ("}" == text) {
            initContext(editor);
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            if ("}" == rightChar) {
              var matching = session.$findOpeningBracket("}", {
                column: cursor.column + 1,
                row: cursor.row
              });
              if (
                null !== matching &&
                CstyleBehaviour.isAutoInsertedClosing(cursor, line, text)
              ) {
                CstyleBehaviour.popAutoInsertedClosing();
                return { text: "", selection: [1, 1] };
              }
            }
          } else if ("\n" == text || "\r\n" == text) {
            initContext(editor);
            var closing = "";
            if (CstyleBehaviour.isMaybeInsertedClosing(cursor, line)) {
              closing = lang.stringRepeat("}", context.maybeInsertedBrackets);
              CstyleBehaviour.clearMaybeInsertedClosing();
            }
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            if ("}" === rightChar) {
              var openBracePos = session.findMatchingBracket(
                { row: cursor.row, column: cursor.column + 1 },
                "}"
              );
              if (!openBracePos) return null;
              var next_indent = this.$getIndent(
                session.getLine(openBracePos.row)
              );
            } else if (closing) {
              var next_indent = this.$getIndent(line);
            } else {
              CstyleBehaviour.clearMaybeInsertedClosing();
              return;
            }
            var indent = next_indent + session.getTabString();
            return {
              text: "\n" + indent + "\n" + next_indent + closing,
              selection: [1, indent.length, 1, indent.length]
            };
          } else {
            CstyleBehaviour.clearMaybeInsertedClosing();
          }
        });
        this.add("braces", "deletion", function(
          state,
          action,
          editor,
          session,
          range
        ) {
          var selected = session.doc.getTextRange(range);
          if (!range.isMultiLine() && "{" == selected) {
            initContext(editor);
            var line = session.doc.getLine(range.start.row),
              rightChar = line.substring(
                range.end.column,
                range.end.column + 1
              );
            if ("}" == rightChar) {
              range.end.column++;
              return range;
            } else {
              context.maybeInsertedBrackets--;
            }
          }
        });
        this.add("parens", "insertion", function(
          state,
          action,
          editor,
          session,
          text
        ) {
          if ("(" == text) {
            initContext(editor);
            var selection = editor.getSelectionRange(),
              selected = session.doc.getTextRange(selection);
            if ("" !== selected && editor.getWrapBehavioursEnabled()) {
              return getWrapped(selection, selected, "(", ")");
            } else if (CstyleBehaviour.isSaneInsertion(editor, session)) {
              CstyleBehaviour.recordAutoInsert(editor, session, ")");
              return { text: "()", selection: [1, 1] };
            }
          } else if (")" == text) {
            initContext(editor);
            var cursor = editor.getCursorPosition(),
              line = session.doc.getLine(cursor.row),
              rightChar = line.substring(cursor.column, cursor.column + 1);
            if (")" == rightChar) {
              var matching = session.$findOpeningBracket(")", {
                column: cursor.column + 1,
                row: cursor.row
              });
              if (
                null !== matching &&
                CstyleBehaviour.isAutoInsertedClosing(cursor, line, text)
              ) {
                CstyleBehaviour.popAutoInsertedClosing();
                return { text: "", selection: [1, 1] };
              }
            }
          }
        });
        this.add("parens", "deletion", function(
          state,
          action,
          editor,
          session,
          range
        ) {
          var selected = session.doc.getTextRange(range);
          if (!range.isMultiLine() && "(" == selected) {
            initContext(editor);
            var line = session.doc.getLine(range.start.row),
              rightChar = line.substring(
                range.start.column + 1,
                range.start.column + 2
              );
            if (")" == rightChar) {
              range.end.column++;
              return range;
            }
          }
        });
        this.add("brackets", "insertion", function(
          state,
          action,
          editor,
          session,
          text
        ) {
          if ("[" == text) {
            initContext(editor);
            var selection = editor.getSelectionRange(),
              selected = session.doc.getTextRange(selection);
            if ("" !== selected && editor.getWrapBehavioursEnabled()) {
              return getWrapped(selection, selected, "[", "]");
            } else if (CstyleBehaviour.isSaneInsertion(editor, session)) {
              CstyleBehaviour.recordAutoInsert(editor, session, "]");
              return { text: "[]", selection: [1, 1] };
            }
          } else if ("]" == text) {
            initContext(editor);
            var cursor = editor.getCursorPosition(),
              line = session.doc.getLine(cursor.row),
              rightChar = line.substring(cursor.column, cursor.column + 1);
            if ("]" == rightChar) {
              var matching = session.$findOpeningBracket("]", {
                column: cursor.column + 1,
                row: cursor.row
              });
              if (
                null !== matching &&
                CstyleBehaviour.isAutoInsertedClosing(cursor, line, text)
              ) {
                CstyleBehaviour.popAutoInsertedClosing();
                return { text: "", selection: [1, 1] };
              }
            }
          }
        });
        this.add("brackets", "deletion", function(
          state,
          action,
          editor,
          session,
          range
        ) {
          var selected = session.doc.getTextRange(range);
          if (!range.isMultiLine() && "[" == selected) {
            initContext(editor);
            var line = session.doc.getLine(range.start.row),
              rightChar = line.substring(
                range.start.column + 1,
                range.start.column + 2
              );
            if ("]" == rightChar) {
              range.end.column++;
              return range;
            }
          }
        });
        this.add("string_dquotes", "insertion", function(
          state,
          action,
          editor,
          session,
          text
        ) {
          var quotes = session.$mode.$quotes || defaultQuotes;
          if (1 == text.length && quotes[text]) {
            if (
              this.lineCommentStart &&
              -1 != this.lineCommentStart.indexOf(text)
            )
              return;
            initContext(editor);
            var quote = text,
              selection = editor.getSelectionRange(),
              selected = session.doc.getTextRange(selection);
            if (
              "" !== selected &&
              (1 != selected.length || !quotes[selected]) &&
              editor.getWrapBehavioursEnabled()
            ) {
              return getWrapped(selection, selected, quote, quote);
            } else if (!selected) {
              var cursor = editor.getCursorPosition(),
                line = session.doc.getLine(cursor.row),
                leftChar = line.substring(cursor.column - 1, cursor.column),
                rightChar = line.substring(cursor.column, cursor.column + 1),
                token = session.getTokenAt(cursor.row, cursor.column),
                rightToken = session.getTokenAt(cursor.row, cursor.column + 1);
              if ("\\" == leftChar && token && /escape/.test(token.type))
                return null;
              var stringBefore = token && /string|escape/.test(token.type),
                stringAfter =
                  !rightToken || /string|escape/.test(rightToken.type),
                pair;
              if (rightChar == quote) {
                pair = stringBefore !== stringAfter;
                if (pair && /string\.end/.test(rightToken.type)) pair = !1;
              } else {
                if (stringBefore && !stringAfter) return null;
                if (stringBefore && stringAfter) return null;
                var wordRe = session.$mode.tokenRe;
                wordRe.lastIndex = 0;
                var isWordBefore = wordRe.test(leftChar);
                wordRe.lastIndex = 0;
                var isWordAfter = wordRe.test(leftChar);
                if (isWordBefore || isWordAfter) return null;
                if (rightChar && !/[\s;,.})\]\\]/.test(rightChar)) return null;
                pair = !0;
              }
              return { text: pair ? quote + quote : "", selection: [1, 1] };
            }
          }
        });
        this.add("string_dquotes", "deletion", function(
          state,
          action,
          editor,
          session,
          range
        ) {
          var quotes = session.$mode.$quotes || defaultQuotes,
            selected = session.doc.getTextRange(range);
          if (!range.isMultiLine() && quotes.hasOwnProperty(selected)) {
            initContext(editor);
            var line = session.doc.getLine(range.start.row),
              rightChar = line.substring(
                range.start.column + 1,
                range.start.column + 2
              );
            if (rightChar == selected) {
              range.end.column++;
              return range;
            }
          }
        });
      };
    CstyleBehaviour.isSaneInsertion = function(editor, session) {
      var cursor = editor.getCursorPosition(),
        iterator = new TokenIterator(session, cursor.row, cursor.column);
      if (
        !this.$matchTokenType(
          iterator.getCurrentToken() || "text",
          SAFE_INSERT_IN_TOKENS
        )
      ) {
        var iterator2 = new TokenIterator(
          session,
          cursor.row,
          cursor.column + 1
        );
        if (
          !this.$matchTokenType(
            iterator2.getCurrentToken() || "text",
            SAFE_INSERT_IN_TOKENS
          )
        )
          return !1;
      }
      iterator.stepForward();
      return (
        iterator.getCurrentTokenRow() !== cursor.row ||
        this.$matchTokenType(
          iterator.getCurrentToken() || "text",
          SAFE_INSERT_BEFORE_TOKENS
        )
      );
    };
    CstyleBehaviour.$matchTokenType = function(token, types) {
      return -1 < types.indexOf(token.type || token);
    };
    CstyleBehaviour.recordAutoInsert = function(editor, session, bracket) {
      var cursor = editor.getCursorPosition(),
        line = session.doc.getLine(cursor.row);
      if (
        !this.isAutoInsertedClosing(
          cursor,
          line,
          context.autoInsertedLineEnd[0]
        )
      )
        context.autoInsertedBrackets = 0;
      context.autoInsertedRow = cursor.row;
      context.autoInsertedLineEnd = bracket + line.substr(cursor.column);
      context.autoInsertedBrackets++;
    };
    CstyleBehaviour.recordMaybeInsert = function(editor, session, bracket) {
      var cursor = editor.getCursorPosition(),
        line = session.doc.getLine(cursor.row);
      if (!this.isMaybeInsertedClosing(cursor, line))
        context.maybeInsertedBrackets = 0;
      context.maybeInsertedRow = cursor.row;
      context.maybeInsertedLineStart = line.substr(0, cursor.column) + bracket;
      context.maybeInsertedLineEnd = line.substr(cursor.column);
      context.maybeInsertedBrackets++;
    };
    CstyleBehaviour.isAutoInsertedClosing = function(cursor, line, bracket) {
      return (
        0 < context.autoInsertedBrackets &&
        cursor.row === context.autoInsertedRow &&
        bracket === context.autoInsertedLineEnd[0] &&
        line.substr(cursor.column) === context.autoInsertedLineEnd
      );
    };
    CstyleBehaviour.isMaybeInsertedClosing = function(cursor, line) {
      return (
        0 < context.maybeInsertedBrackets &&
        cursor.row === context.maybeInsertedRow &&
        line.substr(cursor.column) === context.maybeInsertedLineEnd &&
        line.substr(0, cursor.column) == context.maybeInsertedLineStart
      );
    };
    CstyleBehaviour.popAutoInsertedClosing = function() {
      context.autoInsertedLineEnd = context.autoInsertedLineEnd.substr(1);
      context.autoInsertedBrackets--;
    };
    CstyleBehaviour.clearMaybeInsertedClosing = function() {
      if (context) {
        context.maybeInsertedBrackets = 0;
        context.maybeInsertedRow = -1;
      }
    };
    oop.inherits(CstyleBehaviour, Behaviour);
    exports.CstyleBehaviour = CstyleBehaviour;
  }
);
ace.define("ace/unicode", ["require", "exports", "module"], function(
  require,
  exports,
  module
) {
  "use strict";
  for (
    var wordChars = [
        48,
        9,
        8,
        25,
        5,
        0,
        2,
        25,
        48,
        0,
        11,
        0,
        5,
        0,
        6,
        22,
        2,
        30,
        2,
        457,
        5,
        11,
        15,
        4,
        8,
        0,
        2,
        0,
        18,
        116,
        2,
        1,
        3,
        3,
        9,
        0,
        2,
        2,
        2,
        0,
        2,
        19,
        2,
        82,
        2,
        138,
        2,
        4,
        3,
        155,
        12,
        37,
        3,
        0,
        8,
        38,
        10,
        44,
        2,
        0,
        2,
        1,
        2,
        1,
        2,
        0,
        9,
        26,
        6,
        2,
        30,
        10,
        7,
        61,
        2,
        9,
        5,
        101,
        2,
        7,
        3,
        9,
        2,
        18,
        3,
        0,
        17,
        58,
        3,
        100,
        15,
        53,
        5,
        0,
        6,
        45,
        211,
        57,
        3,
        18,
        2,
        5,
        3,
        11,
        3,
        9,
        2,
        1,
        7,
        6,
        2,
        2,
        2,
        7,
        3,
        1,
        3,
        21,
        2,
        6,
        2,
        0,
        4,
        3,
        3,
        8,
        3,
        1,
        3,
        3,
        9,
        0,
        5,
        1,
        2,
        4,
        3,
        11,
        16,
        2,
        2,
        5,
        5,
        1,
        3,
        21,
        2,
        6,
        2,
        1,
        2,
        1,
        2,
        1,
        3,
        0,
        2,
        4,
        5,
        1,
        3,
        2,
        4,
        0,
        8,
        3,
        2,
        0,
        8,
        15,
        12,
        2,
        2,
        8,
        2,
        2,
        2,
        21,
        2,
        6,
        2,
        1,
        2,
        4,
        3,
        9,
        2,
        2,
        2,
        2,
        3,
        0,
        16,
        3,
        3,
        9,
        18,
        2,
        2,
        7,
        3,
        1,
        3,
        21,
        2,
        6,
        2,
        1,
        2,
        4,
        3,
        8,
        3,
        1,
        3,
        2,
        9,
        1,
        5,
        1,
        2,
        4,
        3,
        9,
        2,
        0,
        17,
        1,
        2,
        5,
        4,
        2,
        2,
        3,
        4,
        1,
        2,
        0,
        2,
        1,
        4,
        1,
        4,
        2,
        4,
        11,
        5,
        4,
        4,
        2,
        2,
        3,
        3,
        0,
        7,
        0,
        15,
        9,
        18,
        2,
        2,
        7,
        2,
        2,
        2,
        22,
        2,
        9,
        2,
        4,
        4,
        7,
        2,
        2,
        2,
        3,
        8,
        1,
        2,
        1,
        7,
        3,
        3,
        9,
        19,
        1,
        2,
        7,
        2,
        2,
        2,
        22,
        2,
        9,
        2,
        4,
        3,
        8,
        2,
        2,
        2,
        3,
        8,
        1,
        8,
        0,
        2,
        3,
        3,
        9,
        19,
        1,
        2,
        7,
        2,
        2,
        2,
        22,
        2,
        15,
        4,
        7,
        2,
        2,
        2,
        3,
        10,
        0,
        9,
        3,
        3,
        9,
        11,
        5,
        3,
        1,
        2,
        17,
        4,
        23,
        2,
        8,
        2,
        0,
        3,
        6,
        4,
        0,
        5,
        5,
        2,
        0,
        2,
        7,
        19,
        1,
        14,
        57,
        6,
        14,
        2,
        9,
        40,
        1,
        2,
        0,
        3,
        1,
        2,
        0,
        3,
        0,
        7,
        3,
        2,
        6,
        2,
        2,
        2,
        0,
        2,
        0,
        3,
        1,
        2,
        12,
        2,
        2,
        3,
        4,
        2,
        0,
        2,
        5,
        3,
        9,
        3,
        1,
        35,
        0,
        24,
        1,
        7,
        9,
        12,
        0,
        2,
        0,
        2,
        0,
        5,
        9,
        2,
        35,
        5,
        19,
        2,
        5,
        5,
        7,
        2,
        35,
        10,
        0,
        58,
        73,
        7,
        77,
        3,
        37,
        11,
        42,
        2,
        0,
        4,
        328,
        2,
        3,
        3,
        6,
        2,
        0,
        2,
        3,
        3,
        40,
        2,
        3,
        3,
        32,
        2,
        3,
        3,
        6,
        2,
        0,
        2,
        3,
        3,
        14,
        2,
        56,
        2,
        3,
        3,
        66,
        5,
        0,
        33,
        15,
        17,
        84,
        13,
        619,
        3,
        16,
        2,
        25,
        6,
        74,
        22,
        12,
        2,
        6,
        12,
        20,
        12,
        19,
        13,
        12,
        2,
        2,
        2,
        1,
        13,
        51,
        3,
        29,
        4,
        0,
        5,
        1,
        3,
        9,
        34,
        2,
        3,
        9,
        7,
        87,
        9,
        42,
        6,
        69,
        11,
        28,
        4,
        11,
        5,
        11,
        11,
        39,
        3,
        4,
        12,
        43,
        5,
        25,
        7,
        10,
        38,
        27,
        5,
        62,
        2,
        28,
        3,
        10,
        7,
        9,
        14,
        0,
        89,
        75,
        5,
        9,
        18,
        8,
        13,
        42,
        4,
        11,
        71,
        55,
        9,
        9,
        4,
        48,
        83,
        2,
        2,
        30,
        14,
        230,
        23,
        280,
        3,
        5,
        3,
        37,
        3,
        5,
        3,
        7,
        2,
        0,
        2,
        0,
        2,
        0,
        2,
        30,
        3,
        52,
        2,
        6,
        2,
        0,
        4,
        2,
        2,
        6,
        4,
        3,
        3,
        5,
        5,
        12,
        6,
        2,
        2,
        6,
        67,
        1,
        20,
        0,
        29,
        0,
        14,
        0,
        17,
        4,
        60,
        12,
        5,
        0,
        4,
        11,
        18,
        0,
        5,
        0,
        3,
        9,
        2,
        0,
        4,
        4,
        7,
        0,
        2,
        0,
        2,
        0,
        2,
        3,
        2,
        10,
        3,
        3,
        6,
        4,
        5,
        0,
        53,
        1,
        2684,
        46,
        2,
        46,
        2,
        132,
        7,
        6,
        15,
        37,
        11,
        53,
        10,
        0,
        17,
        22,
        10,
        6,
        2,
        6,
        2,
        6,
        2,
        6,
        2,
        6,
        2,
        6,
        2,
        6,
        2,
        6,
        2,
        31,
        48,
        0,
        470,
        1,
        36,
        5,
        2,
        4,
        6,
        1,
        5,
        85,
        3,
        1,
        3,
        2,
        2,
        89,
        2,
        3,
        6,
        40,
        4,
        93,
        18,
        23,
        57,
        15,
        513,
        6581,
        75,
        20939,
        53,
        1164,
        68,
        45,
        3,
        268,
        4,
        27,
        21,
        31,
        3,
        13,
        13,
        1,
        2,
        24,
        9,
        69,
        11,
        1,
        38,
        8,
        3,
        102,
        3,
        1,
        111,
        44,
        25,
        51,
        13,
        68,
        12,
        9,
        7,
        23,
        4,
        0,
        5,
        45,
        3,
        35,
        13,
        28,
        4,
        64,
        15,
        10,
        39,
        54,
        10,
        13,
        3,
        9,
        7,
        22,
        4,
        1,
        5,
        66,
        25,
        2,
        227,
        42,
        2,
        1,
        3,
        9,
        7,
        11171,
        13,
        22,
        5,
        48,
        8453,
        301,
        3,
        61,
        3,
        105,
        39,
        6,
        13,
        4,
        6,
        11,
        2,
        12,
        2,
        4,
        2,
        0,
        2,
        1,
        2,
        1,
        2,
        107,
        34,
        362,
        19,
        63,
        3,
        53,
        41,
        11,
        5,
        15,
        17,
        6,
        13,
        1,
        25,
        2,
        33,
        4,
        2,
        134,
        20,
        9,
        8,
        25,
        5,
        0,
        2,
        25,
        12,
        88,
        4,
        5,
        3,
        5,
        3,
        5,
        3,
        2
      ],
      code = 0,
      str = [],
      i = 0;
    i < wordChars.length;
    i += 2
  ) {
    str.push((code += wordChars[i]));
    if (wordChars[i + 1]) str.push(45, (code += wordChars[i + 1]));
  }
  exports.wordChars = String.fromCharCode.apply(null, str);
});
ace.define(
  "ace/mode/text",
  [
    "require",
    "exports",
    "module",
    "ace/config",
    "ace/tokenizer",
    "ace/mode/text_highlight_rules",
    "ace/mode/behaviour/cstyle",
    "ace/unicode",
    "ace/lib/lang",
    "ace/token_iterator",
    "ace/range"
  ],
  function(require, exports, module) {
    "use strict";
    var config = require("../config"),
      Tokenizer = require("../tokenizer").Tokenizer,
      TextHighlightRules = require("./text_highlight_rules").TextHighlightRules,
      CstyleBehaviour = require("./behaviour/cstyle").CstyleBehaviour,
      unicode = require("../unicode"),
      lang = require("../lib/lang"),
      TokenIterator = require("../token_iterator").TokenIterator,
      Range = require("../range").Range,
      Mode = function Mode() {
        this.HighlightRules = TextHighlightRules;
      };
    (function() {
      this.$defaultBehaviour = new CstyleBehaviour();
      this.tokenRe = new RegExp("^[" + unicode.wordChars + "\\$_]+", "g");
      this.nonTokenRe = new RegExp(
        "^(?:[^" + unicode.wordChars + "\\$_]|\\s])+",
        "g"
      );
      this.getTokenizer = function() {
        if (!this.$tokenizer) {
          this.$highlightRules =
            this.$highlightRules ||
            new this.HighlightRules(this.$highlightRuleConfig);
          this.$tokenizer = new Tokenizer(this.$highlightRules.getRules());
        }
        return this.$tokenizer;
      };
      this.lineCommentStart = "";
      this.blockComment = "";
      this.toggleCommentLines = function(state, session, startRow, endRow) {
        var doc = session.doc,
          ignoreBlankLines = !0,
          shouldRemove = !0,
          minIndent = 1 / 0,
          tabSize = session.getTabSize(),
          insertAtTabStop = !1;
        if (!this.lineCommentStart) {
          if (!this.blockComment) return !1;
          var lineCommentStart = this.blockComment.start,
            lineCommentEnd = this.blockComment.end,
            regexpStart = new RegExp(
              "^(\\s*)(?:" + lang.escapeRegExp(lineCommentStart) + ")"
            ),
            regexpEnd = new RegExp(
              "(?:" + lang.escapeRegExp(lineCommentEnd) + ")\\s*$"
            ),
            comment = function comment(line, i) {
              if (testRemove(line, i)) return;
              if (!ignoreBlankLines || /\S/.test(line)) {
                doc.insertInLine(
                  { row: i, column: line.length },
                  lineCommentEnd
                );
                doc.insertInLine(
                  { row: i, column: minIndent },
                  lineCommentStart
                );
              }
            },
            uncomment = function uncomment(line, i) {
              var m;
              if ((m = line.match(regexpEnd)))
                doc.removeInLine(i, line.length - m[0].length, line.length);
              if ((m = line.match(regexpStart)))
                doc.removeInLine(i, m[1].length, m[0].length);
            },
            testRemove = function testRemove(line, row) {
              if (regexpStart.test(line)) return !0;
              for (
                var tokens = session.getTokens(row), i = 0;
                i < tokens.length;
                i++
              ) {
                if ("comment" === tokens[i].type) return !0;
              }
            };
        } else {
          if (Array.isArray(this.lineCommentStart)) {
            var regexpStart = this.lineCommentStart
                .map(lang.escapeRegExp)
                .join("|"),
              lineCommentStart = this.lineCommentStart[0];
          } else {
            var regexpStart = lang.escapeRegExp(this.lineCommentStart),
              lineCommentStart = this.lineCommentStart;
          }
          regexpStart = new RegExp("^(\\s*)(?:" + regexpStart + ") ?");
          insertAtTabStop = session.getUseSoftTabs();
          var uncomment = function uncomment(line, i) {
              var m = line.match(regexpStart);
              if (!m) return;
              var start = m[1].length,
                end = m[0].length;
              if (!shouldInsertSpace(line, start, end) && " " == m[0][end - 1])
                end--;
              doc.removeInLine(i, start, end);
            },
            commentWithSpace = lineCommentStart + " ",
            comment = function comment(line, i) {
              if (!ignoreBlankLines || /\S/.test(line)) {
                if (shouldInsertSpace(line, minIndent, minIndent))
                  doc.insertInLine(
                    { row: i, column: minIndent },
                    commentWithSpace
                  );
                else
                  doc.insertInLine(
                    { row: i, column: minIndent },
                    lineCommentStart
                  );
              }
            },
            testRemove = function testRemove(line, i) {
              return regexpStart.test(line);
            },
            shouldInsertSpace = function shouldInsertSpace(
              line,
              before,
              after
            ) {
              var spaces = 0;
              while (before-- && " " == line.charAt(before)) {
                spaces++;
              }
              if (0 != spaces % tabSize) return !1;
              var spaces = 0;
              while (" " == line.charAt(after++)) {
                spaces++;
              }
              if (2 < tabSize) return spaces % tabSize != tabSize - 1;
              else return 0 == spaces % tabSize;
            };
        }
        function iter(fun) {
          for (var i = startRow; i <= endRow; i++) {
            fun(doc.getLine(i), i);
          }
        }
        var minEmptyLength = 1 / 0;
        iter(function(line, i) {
          var indent = line.search(/\S/);
          if (-1 !== indent) {
            if (indent < minIndent) minIndent = indent;
            if (shouldRemove && !testRemove(line, i)) shouldRemove = !1;
          } else if (minEmptyLength > line.length) {
            minEmptyLength = line.length;
          }
        });
        if (minIndent == 1 / 0) {
          minIndent = minEmptyLength;
          ignoreBlankLines = !1;
          shouldRemove = !1;
        }
        if (insertAtTabStop && 0 != minIndent % tabSize)
          minIndent = Math.floor(minIndent / tabSize) * tabSize;
        iter(shouldRemove ? uncomment : comment);
      };
      this.toggleBlockComment = function(state, session, range, cursor) {
        var comment = this.blockComment;
        if (!comment) return;
        if (!comment.start && comment[0]) comment = comment[0];
        var iterator = new TokenIterator(session, cursor.row, cursor.column),
          token = iterator.getCurrentToken(),
          sel = session.selection,
          initialRange = session.selection.toOrientedRange(),
          startRow,
          colDiff;
        if (token && /comment/.test(token.type)) {
          var startRange, endRange;
          while (token && /comment/.test(token.type)) {
            var i = token.value.indexOf(comment.start);
            if (-1 != i) {
              var row = iterator.getCurrentTokenRow(),
                column = iterator.getCurrentTokenColumn() + i;
              startRange = new Range(
                row,
                column,
                row,
                column + comment.start.length
              );
              break;
            }
            token = iterator.stepBackward();
          }
          var iterator = new TokenIterator(session, cursor.row, cursor.column),
            token = iterator.getCurrentToken();
          while (token && /comment/.test(token.type)) {
            var i = token.value.indexOf(comment.end);
            if (-1 != i) {
              var row = iterator.getCurrentTokenRow(),
                column = iterator.getCurrentTokenColumn() + i;
              endRange = new Range(
                row,
                column,
                row,
                column + comment.end.length
              );
              break;
            }
            token = iterator.stepForward();
          }
          if (endRange) session.remove(endRange);
          if (startRange) {
            session.remove(startRange);
            startRow = startRange.start.row;
            colDiff = -comment.start.length;
          }
        } else {
          colDiff = comment.start.length;
          startRow = range.start.row;
          session.insert(range.end, comment.end);
          session.insert(range.start, comment.start);
        }
        if (initialRange.start.row == startRow)
          initialRange.start.column += colDiff;
        if (initialRange.end.row == startRow)
          initialRange.end.column += colDiff;
        session.selection.fromOrientedRange(initialRange);
      };
      this.getNextLineIndent = function(state, line, tab) {
        return this.$getIndent(line);
      };
      this.checkOutdent = function(state, line, input) {
        return !1;
      };
      this.autoOutdent = function(state, doc, row) {};
      this.$getIndent = function(line) {
        return line.match(/^\s*/)[0];
      };
      this.createWorker = function(session) {
        return null;
      };
      this.createModeDelegates = function(mapping) {
        this.$embeds = [];
        this.$modes = {};
        for (var i in mapping) {
          if (mapping[i]) {
            var Mode = mapping[i],
              id = Mode.prototype.$id,
              mode = config.$modes[id];
            if (!mode) config.$modes[id] = mode = new Mode();
            if (!config.$modes[i]) config.$modes[i] = mode;
            this.$embeds.push(i);
            this.$modes[i] = mode;
          }
        }
        for (
          var delegations = [
              "toggleBlockComment",
              "toggleCommentLines",
              "getNextLineIndent",
              "checkOutdent",
              "autoOutdent",
              "transformAction",
              "getCompletions"
            ],
            i = 0;
          i < delegations.length;
          i++
        ) {
          (function(scope) {
            var functionName = delegations[i],
              defaultHandler = scope[functionName];
            scope[delegations[i]] = function() {
              return this.$delegator(functionName, arguments, defaultHandler);
            };
          })(this);
        }
      };
      this.$delegator = function(method, args, defaultHandler) {
        var state = args[0];
        if ("string" != typeof state) {
          if (Array.isArray(state[2])) {
            var language = state[2][state[2].length - 1],
              mode = this.$modes[language];
            if (mode)
              return mode[method].apply(
                mode,
                [state[1]].concat([].slice.call(args, 1))
              );
          }
          state = state[0];
        }
        for (var i = 0; i < this.$embeds.length; i++) {
          if (!this.$modes[this.$embeds[i]]) continue;
          var split = state.split(this.$embeds[i]);
          if (!split[0] && split[1]) {
            args[0] = split[1];
            var mode = this.$modes[this.$embeds[i]];
            return mode[method].apply(mode, args);
          }
        }
        var ret = defaultHandler.apply(this, args);
        return defaultHandler ? ret : void 0;
      };
      this.transformAction = function(state, action, editor, session, param) {
        if (this.$behaviour) {
          var behaviours = this.$behaviour.getBehaviours();
          for (var key in behaviours) {
            if (behaviours[key][action]) {
              var ret = behaviours[key][action].apply(this, arguments);
              if (ret) {
                return ret;
              }
            }
          }
        }
      };
      this.getKeywords = function(append) {
        if (!this.completionKeywords) {
          var rules = this.$tokenizer.rules,
            completionKeywords = [];
          for (var rule in rules) {
            for (
              var ruleItr = rules[rule], r = 0, l = ruleItr.length;
              r < l;
              r++
            ) {
              if ("string" === typeof ruleItr[r].token) {
                if (/keyword|support|storage/.test(ruleItr[r].token))
                  completionKeywords.push(ruleItr[r].regex);
              } else if ("object" === babelHelpers.typeof(ruleItr[r].token)) {
                for (
                  var a = 0, aLength = ruleItr[r].token.length;
                  a < aLength;
                  a++
                ) {
                  if (/keyword|support|storage/.test(ruleItr[r].token[a])) {
                    var rule = ruleItr[r].regex.match(/\(.+?\)/g)[a];
                    completionKeywords.push(rule.substr(1, rule.length - 2));
                  }
                }
              }
            }
          }
          this.completionKeywords = completionKeywords;
        }
        if (!append) return this.$keywordList;
        return completionKeywords.concat(this.$keywordList || []);
      };
      this.$createKeywordList = function() {
        if (!this.$highlightRules) this.getTokenizer();
        return (this.$keywordList = this.$highlightRules.$keywordList || []);
      };
      this.getCompletions = function(state, session, pos, prefix) {
        var keywords = this.$keywordList || this.$createKeywordList();
        return keywords.map(function(word) {
          return { name: word, value: word, score: 0, meta: "keyword" };
        });
      };
      this.$id = "ace/mode/text";
    }.call(Mode.prototype));
    exports.Mode = Mode;
  }
);
ace.define("ace/apply_delta", ["require", "exports", "module"], function(
  require,
  exports,
  module
) {
  "use strict";
  function throwDeltaError(delta, errorText) {
    console.log("Invalid Delta:", delta);
    throw "Invalid Delta: " + errorText;
  }
  function positionInDocument(docLines, position) {
    return (
      0 <= position.row &&
      position.row < docLines.length &&
      0 <= position.column &&
      position.column <= docLines[position.row].length
    );
  }
  function validateDelta(docLines, delta) {
    if ("insert" != delta.action && "remove" != delta.action)
      throwDeltaError(delta, "delta.action must be 'insert' or 'remove'");
    if (!babelHelpers.instanceof(delta.lines, Array))
      throwDeltaError(delta, "delta.lines must be an Array");
    if (!delta.start || !delta.end)
      throwDeltaError(delta, "delta.start/end must be an present");
    var start = delta.start;
    if (!positionInDocument(docLines, delta.start))
      throwDeltaError(delta, "delta.start must be contained in document");
    var end = delta.end;
    if ("remove" == delta.action && !positionInDocument(docLines, end))
      throwDeltaError(
        delta,
        "delta.end must contained in document for 'remove' actions"
      );
    var numRangeRows = end.row - start.row,
      numRangeLastLineChars =
        end.column - (0 == numRangeRows ? start.column : 0);
    if (
      numRangeRows != delta.lines.length - 1 ||
      delta.lines[numRangeRows].length != numRangeLastLineChars
    )
      throwDeltaError(delta, "delta.range must match delta lines");
  }
  exports.applyDelta = function(docLines, delta, doNotValidate) {
    var row = delta.start.row,
      startColumn = delta.start.column,
      line = docLines[row] || "";
    switch (delta.action) {
      case "insert":
        var lines = delta.lines;
        if (1 === lines.length) {
          docLines[row] =
            line.substring(0, startColumn) +
            delta.lines[0] +
            line.substring(startColumn);
        } else {
          var args = [row, 1].concat(delta.lines);
          docLines.splice.apply(docLines, args);
          docLines[row] = line.substring(0, startColumn) + docLines[row];
          docLines[row + delta.lines.length - 1] += line.substring(startColumn);
        }
        break;
      case "remove":
        var endColumn = delta.end.column,
          endRow = delta.end.row;
        if (row === endRow) {
          docLines[row] =
            line.substring(0, startColumn) + line.substring(endColumn);
        } else {
          docLines.splice(
            row,
            endRow - row + 1,
            line.substring(0, startColumn) +
              docLines[endRow].substring(endColumn)
          );
        }
        break;
    }
  };
});
ace.define(
  "ace/anchor",
  ["require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter"],
  function(require, exports, module) {
    "use strict";
    var _Mathmax3 = Math.max,
      oop = require("./lib/oop"),
      EventEmitter = require("./lib/event_emitter").EventEmitter,
      Anchor = (exports.Anchor = function(doc, row, column) {
        this.$onChange = this.onChange.bind(this);
        this.attach(doc);
        if ("undefined" == typeof column) this.setPosition(row.row, row.column);
        else this.setPosition(row, column);
      });
    (function() {
      oop.implement(this, EventEmitter);
      this.getPosition = function() {
        return this.$clipPositionToDocument(this.row, this.column);
      };
      this.getDocument = function() {
        return this.document;
      };
      this.$insertRight = !1;
      this.onChange = function(delta) {
        if (delta.start.row == delta.end.row && delta.start.row != this.row)
          return;
        if (delta.start.row > this.row) return;
        var point = $getTransformedPoint(
          delta,
          { row: this.row, column: this.column },
          this.$insertRight
        );
        this.setPosition(point.row, point.column, !0);
      };
      function $pointsInOrder(point1, point2, equalPointsInOrder) {
        var bColIsAfter = equalPointsInOrder
          ? point1.column <= point2.column
          : point1.column < point2.column;
        return (
          point1.row < point2.row || (point1.row == point2.row && bColIsAfter)
        );
      }
      function $getTransformedPoint(delta, point, moveIfEqual) {
        var deltaIsInsert = "insert" == delta.action,
          deltaRowShift =
            (deltaIsInsert ? 1 : -1) * (delta.end.row - delta.start.row),
          deltaColShift =
            (deltaIsInsert ? 1 : -1) * (delta.end.column - delta.start.column),
          deltaStart = delta.start,
          deltaEnd = deltaIsInsert ? deltaStart : delta.end;
        if ($pointsInOrder(point, deltaStart, moveIfEqual)) {
          return { row: point.row, column: point.column };
        }
        if ($pointsInOrder(deltaEnd, point, !moveIfEqual)) {
          return {
            row: point.row + deltaRowShift,
            column:
              point.column + (point.row == deltaEnd.row ? deltaColShift : 0)
          };
        }
        return { row: deltaStart.row, column: deltaStart.column };
      }
      this.setPosition = function(row, column, noClip) {
        var pos;
        if (noClip) {
          pos = { row: row, column: column };
        } else {
          pos = this.$clipPositionToDocument(row, column);
        }
        if (this.row == pos.row && this.column == pos.column) return;
        var old = { row: this.row, column: this.column };
        this.row = pos.row;
        this.column = pos.column;
        this._signal("change", { old: old, value: pos });
      };
      this.detach = function() {
        this.document.removeEventListener("change", this.$onChange);
      };
      this.attach = function(doc) {
        this.document = doc || this.document;
        this.document.on("change", this.$onChange);
      };
      this.$clipPositionToDocument = function(row, column) {
        var pos = {};
        if (row >= this.document.getLength()) {
          pos.row = _Mathmax3(0, this.document.getLength() - 1);
          pos.column = this.document.getLine(pos.row).length;
        } else if (0 > row) {
          pos.row = 0;
          pos.column = 0;
        } else {
          pos.row = row;
          pos.column = Math.min(
            this.document.getLine(pos.row).length,
            _Mathmax3(0, column)
          );
        }
        if (0 > column) pos.column = 0;
        return pos;
      };
    }.call(Anchor.prototype));
  }
);
ace.define(
  "ace/document",
  [
    "require",
    "exports",
    "module",
    "ace/lib/oop",
    "ace/apply_delta",
    "ace/lib/event_emitter",
    "ace/range",
    "ace/anchor"
  ],
  function(require, exports, module) {
    "use strict";
    var _Mathmin3 = Math.min,
      _Mathmax4 = Math.max,
      oop = require("./lib/oop"),
      applyDelta = require("./apply_delta").applyDelta,
      EventEmitter = require("./lib/event_emitter").EventEmitter,
      Range = require("./range").Range,
      Anchor = require("./anchor").Anchor,
      Document = function Document(textOrLines) {
        this.$lines = [""];
        if (0 === textOrLines.length) {
          this.$lines = [""];
        } else if (Array.isArray(textOrLines)) {
          this.insertMergedLines({ row: 0, column: 0 }, textOrLines);
        } else {
          this.insert({ row: 0, column: 0 }, textOrLines);
        }
      };
    (function() {
      oop.implement(this, EventEmitter);
      this.setValue = function(text) {
        var len = this.getLength() - 1;
        this.remove(new Range(0, 0, len, this.getLine(len).length));
        this.insert({ row: 0, column: 0 }, text);
      };
      this.getValue = function() {
        return this.getAllLines().join(this.getNewLineCharacter());
      };
      this.createAnchor = function(row, column) {
        return new Anchor(this, row, column);
      };
      if (0 === "aaa".split(/a/).length) {
        this.$split = function(text) {
          return text.replace(/\r\n|\r/g, "\n").split("\n");
        };
      } else {
        this.$split = function(text) {
          return text.split(/\r\n|\r|\n/);
        };
      }
      this.$detectNewLine = function(text) {
        var match = text.match(/^.*?(\r\n|\r|\n)/m);
        this.$autoNewLine = match ? match[1] : "\n";
        this._signal("changeNewLineMode");
      };
      this.getNewLineCharacter = function() {
        switch (this.$newLineMode) {
          case "windows":
            return "\r\n";
          case "unix":
            return "\n";
          default:
            return this.$autoNewLine || "\n";
        }
      };
      this.$autoNewLine = "";
      this.$newLineMode = "auto";
      this.setNewLineMode = function(newLineMode) {
        if (this.$newLineMode === newLineMode) return;
        this.$newLineMode = newLineMode;
        this._signal("changeNewLineMode");
      };
      this.getNewLineMode = function() {
        return this.$newLineMode;
      };
      this.isNewLine = function(text) {
        return "\r\n" == text || "\r" == text || "\n" == text;
      };
      this.getLine = function(row) {
        return this.$lines[row] || "";
      };
      this.getLines = function(firstRow, lastRow) {
        return this.$lines.slice(firstRow, lastRow + 1);
      };
      this.getAllLines = function() {
        return this.getLines(0, this.getLength());
      };
      this.getLength = function() {
        return this.$lines.length;
      };
      this.getTextRange = function(range) {
        return this.getLinesForRange(range).join(this.getNewLineCharacter());
      };
      this.getLinesForRange = function(range) {
        var lines;
        if (range.start.row === range.end.row) {
          lines = [
            this.getLine(range.start.row).substring(
              range.start.column,
              range.end.column
            )
          ];
        } else {
          lines = this.getLines(range.start.row, range.end.row);
          lines[0] = (lines[0] || "").substring(range.start.column);
          var l = lines.length - 1;
          if (range.end.row - range.start.row == l)
            lines[l] = lines[l].substring(0, range.end.column);
        }
        return lines;
      };
      this.insertLines = function(row, lines) {
        console.warn(
          "Use of document.insertLines is deprecated. Use the insertFullLines method instead."
        );
        return this.insertFullLines(row, lines);
      };
      this.removeLines = function(firstRow, lastRow) {
        console.warn(
          "Use of document.removeLines is deprecated. Use the removeFullLines method instead."
        );
        return this.removeFullLines(firstRow, lastRow);
      };
      this.insertNewLine = function(position) {
        console.warn(
          "Use of document.insertNewLine is deprecated. Use insertMergedLines(position, ['', '']) instead."
        );
        return this.insertMergedLines(position, ["", ""]);
      };
      this.insert = function(position, text) {
        if (1 >= this.getLength()) this.$detectNewLine(text);
        return this.insertMergedLines(position, this.$split(text));
      };
      this.insertInLine = function(position, text) {
        var start = this.clippedPos(position.row, position.column),
          end = this.pos(position.row, position.column + text.length);
        this.applyDelta(
          { start: start, end: end, action: "insert", lines: [text] },
          !0
        );
        return this.clonePos(end);
      };
      this.clippedPos = function(row, column) {
        var length = this.getLength();
        if (row === void 0) {
          row = length;
        } else if (0 > row) {
          row = 0;
        } else if (row >= length) {
          row = length - 1;
          column = void 0;
        }
        var line = this.getLine(row);
        if (column == void 0) column = line.length;
        column = _Mathmin3(_Mathmax4(column, 0), line.length);
        return { row: row, column: column };
      };
      this.clonePos = function(pos) {
        return { row: pos.row, column: pos.column };
      };
      this.pos = function(row, column) {
        return { row: row, column: column };
      };
      this.$clipPosition = function(position) {
        var length = this.getLength();
        if (position.row >= length) {
          position.row = _Mathmax4(0, length - 1);
          position.column = this.getLine(length - 1).length;
        } else {
          position.row = _Mathmax4(0, position.row);
          position.column = _Mathmin3(
            _Mathmax4(position.column, 0),
            this.getLine(position.row).length
          );
        }
        return position;
      };
      this.insertFullLines = function(row, lines) {
        row = _Mathmin3(_Mathmax4(row, 0), this.getLength());
        var column = 0;
        if (row < this.getLength()) {
          lines = lines.concat([""]);
          column = 0;
        } else {
          lines = [""].concat(lines);
          row--;
          column = this.$lines[row].length;
        }
        this.insertMergedLines({ row: row, column: column }, lines);
      };
      this.insertMergedLines = function(position, lines) {
        var start = this.clippedPos(position.row, position.column),
          end = {
            row: start.row + lines.length - 1,
            column:
              (1 == lines.length ? start.column : 0) +
              lines[lines.length - 1].length
          };
        this.applyDelta({
          start: start,
          end: end,
          action: "insert",
          lines: lines
        });
        return this.clonePos(end);
      };
      this.remove = function(range) {
        var start = this.clippedPos(range.start.row, range.start.column),
          end = this.clippedPos(range.end.row, range.end.column);
        this.applyDelta({
          start: start,
          end: end,
          action: "remove",
          lines: this.getLinesForRange({ start: start, end: end })
        });
        return this.clonePos(start);
      };
      this.removeInLine = function(row, startColumn, endColumn) {
        var start = this.clippedPos(row, startColumn),
          end = this.clippedPos(row, endColumn);
        this.applyDelta(
          {
            start: start,
            end: end,
            action: "remove",
            lines: this.getLinesForRange({ start: start, end: end })
          },
          !0
        );
        return this.clonePos(start);
      };
      this.removeFullLines = function(firstRow, lastRow) {
        firstRow = _Mathmin3(_Mathmax4(0, firstRow), this.getLength() - 1);
        lastRow = _Mathmin3(_Mathmax4(0, lastRow), this.getLength() - 1);
        var deleteFirstNewLine =
            lastRow == this.getLength() - 1 && 0 < firstRow,
          deleteLastNewLine = lastRow < this.getLength() - 1,
          startRow = deleteFirstNewLine ? firstRow - 1 : firstRow,
          startCol = deleteFirstNewLine ? this.getLine(startRow).length : 0,
          endRow = deleteLastNewLine ? lastRow + 1 : lastRow,
          endCol = deleteLastNewLine ? 0 : this.getLine(endRow).length,
          range = new Range(startRow, startCol, endRow, endCol),
          deletedLines = this.$lines.slice(firstRow, lastRow + 1);
        this.applyDelta({
          start: range.start,
          end: range.end,
          action: "remove",
          lines: this.getLinesForRange(range)
        });
        return deletedLines;
      };
      this.removeNewLine = function(row) {
        if (row < this.getLength() - 1 && 0 <= row) {
          this.applyDelta({
            start: this.pos(row, this.getLine(row).length),
            end: this.pos(row + 1, 0),
            action: "remove",
            lines: ["", ""]
          });
        }
      };
      this.replace = function(range, text) {
        if (!babelHelpers.instanceof(range, Range))
          range = Range.fromPoints(range.start, range.end);
        if (0 === text.length && range.isEmpty()) return range.start;
        if (text == this.getTextRange(range)) return range.end;
        this.remove(range);
        var end;
        if (text) {
          end = this.insert(range.start, text);
        } else {
          end = range.start;
        }
        return end;
      };
      this.applyDeltas = function(deltas) {
        for (var i = 0; i < deltas.length; i++) {
          this.applyDelta(deltas[i]);
        }
      };
      this.revertDeltas = function(deltas) {
        for (var i = deltas.length - 1; 0 <= i; i--) {
          this.revertDelta(deltas[i]);
        }
      };
      this.applyDelta = function(delta, doNotValidate) {
        var isInsert = "insert" == delta.action;
        if (
          isInsert
            ? 1 >= delta.lines.length && !delta.lines[0]
            : !Range.comparePoints(delta.start, delta.end)
        ) {
          return;
        }
        if (isInsert && 2e4 < delta.lines.length) {
          this.$splitAndapplyLargeDelta(delta, 2e4);
        } else {
          applyDelta(this.$lines, delta, doNotValidate);
          this._signal("change", delta);
        }
      };
      this.$splitAndapplyLargeDelta = function(delta, MAX) {
        for (
          var lines = delta.lines,
            l = lines.length - MAX + 1,
            row = delta.start.row,
            column = delta.start.column,
            from = 0,
            to = 0;
          from < l;
          from = to
        ) {
          to += MAX - 1;
          var chunk = lines.slice(from, to);
          chunk.push("");
          this.applyDelta(
            {
              start: this.pos(row + from, column),
              end: this.pos(row + to, (column = 0)),
              action: delta.action,
              lines: chunk
            },
            !0
          );
        }
        delta.lines = lines.slice(from);
        delta.start.row = row + from;
        delta.start.column = column;
        this.applyDelta(delta, !0);
      };
      this.revertDelta = function(delta) {
        this.applyDelta({
          start: this.clonePos(delta.start),
          end: this.clonePos(delta.end),
          action: "insert" == delta.action ? "remove" : "insert",
          lines: delta.lines.slice()
        });
      };
      this.indexToPosition = function(index, startRow) {
        for (
          var lines = this.$lines || this.getAllLines(),
            newlineLength = this.getNewLineCharacter().length,
            i = startRow || 0,
            l = lines.length;
          i < l;
          i++
        ) {
          index -= lines[i].length + newlineLength;
          if (0 > index)
            return { row: i, column: index + lines[i].length + newlineLength };
        }
        return {
          row: l - 1,
          column: index + lines[l - 1].length + newlineLength
        };
      };
      this.positionToIndex = function(pos, startRow) {
        for (
          var lines = this.$lines || this.getAllLines(),
            newlineLength = this.getNewLineCharacter().length,
            index = 0,
            row = _Mathmin3(pos.row, lines.length),
            i = startRow || 0;
          i < row;
          ++i
        ) {
          index += lines[i].length + newlineLength;
        }
        return index + pos.column;
      };
    }.call(Document.prototype));
    exports.Document = Document;
  }
);
ace.define(
  "ace/background_tokenizer",
  ["require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter"],
  function(require, exports, module) {
    "use strict";
    var _Mathmin4 = Math.min,
      oop = require("./lib/oop"),
      EventEmitter = require("./lib/event_emitter").EventEmitter,
      BackgroundTokenizer = function BackgroundTokenizer(tokenizer, editor) {
        this.running = !1;
        this.lines = [];
        this.states = [];
        this.currentLine = 0;
        this.tokenizer = tokenizer;
        var self = this;
        this.$worker = function() {
          if (!self.running) {
            return;
          }
          var workerStart = new Date(),
            currentLine = self.currentLine,
            endLine = -1,
            doc = self.doc,
            startLine = currentLine;
          while (self.lines[currentLine]) {
            currentLine++;
          }
          var len = doc.getLength(),
            processedLines = 0;
          self.running = !1;
          while (currentLine < len) {
            self.$tokenizeRow(currentLine);
            endLine = currentLine;
            do {
              currentLine++;
            } while (self.lines[currentLine]);
            processedLines++;
            if (0 === processedLines % 5 && 20 < new Date() - workerStart) {
              self.running = setTimeout(self.$worker, 20);
              break;
            }
          }
          self.currentLine = currentLine;
          if (-1 == endLine) endLine = currentLine;
          if (startLine <= endLine) self.fireUpdateEvent(startLine, endLine);
        };
      };
    (function() {
      oop.implement(this, EventEmitter);
      this.setTokenizer = function(tokenizer) {
        this.tokenizer = tokenizer;
        this.lines = [];
        this.states = [];
        this.start(0);
      };
      this.setDocument = function(doc) {
        this.doc = doc;
        this.lines = [];
        this.states = [];
        this.stop();
      };
      this.fireUpdateEvent = function(firstRow, lastRow) {
        var data = { first: firstRow, last: lastRow };
        this._signal("update", { data: data });
      };
      this.start = function(startRow) {
        this.currentLine = _Mathmin4(
          startRow || 0,
          this.currentLine,
          this.doc.getLength()
        );
        this.lines.splice(this.currentLine, this.lines.length);
        this.states.splice(this.currentLine, this.states.length);
        this.stop();
        this.running = setTimeout(this.$worker, 700);
      };
      this.scheduleStart = function() {
        if (!this.running) this.running = setTimeout(this.$worker, 700);
      };
      this.$updateOnChange = function(delta) {
        var startRow = delta.start.row,
          len = delta.end.row - startRow;
        if (0 === len) {
          this.lines[startRow] = null;
        } else if ("remove" == delta.action) {
          this.lines.splice(startRow, len + 1, null);
          this.states.splice(startRow, len + 1, null);
        } else {
          var args = Array(len + 1);
          args.unshift(startRow, 1);
          this.lines.splice.apply(this.lines, args);
          this.states.splice.apply(this.states, args);
        }
        this.currentLine = _Mathmin4(
          startRow,
          this.currentLine,
          this.doc.getLength()
        );
        this.stop();
      };
      this.stop = function() {
        if (this.running) clearTimeout(this.running);
        this.running = !1;
      };
      this.getTokens = function(row) {
        return this.lines[row] || this.$tokenizeRow(row);
      };
      this.getState = function(row) {
        if (this.currentLine == row) this.$tokenizeRow(row);
        return this.states[row] || "start";
      };
      this.$tokenizeRow = function(row) {
        var line = this.doc.getLine(row),
          state = this.states[row - 1],
          data = this.tokenizer.getLineTokens(line, state, row);
        if (this.states[row] + "" !== data.state + "") {
          this.states[row] = data.state;
          this.lines[row + 1] = null;
          if (this.currentLine > row + 1) this.currentLine = row + 1;
        } else if (this.currentLine == row) {
          this.currentLine = row + 1;
        }
        return (this.lines[row] = data.tokens);
      };
    }.call(BackgroundTokenizer.prototype));
    exports.BackgroundTokenizer = BackgroundTokenizer;
  }
);
ace.define(
  "ace/search_highlight",
  ["require", "exports", "module", "ace/lib/lang", "ace/lib/oop", "ace/range"],
  function(require, exports, module) {
    "use strict";
    var lang = require("./lib/lang"),
      oop = require("./lib/oop"),
      Range = require("./range").Range,
      SearchHighlight = function SearchHighlight(regExp, clazz, type) {
        this.setRegexp(regExp);
        this.clazz = clazz;
        this.type = type || "text";
      };
    (function() {
      this.MAX_RANGES = 500;
      this.setRegexp = function(regExp) {
        if (this.regExp + "" == regExp + "") return;
        this.regExp = regExp;
        this.cache = [];
      };
      this.update = function(html, markerLayer, session, config) {
        if (!this.regExp) return;
        for (
          var start = config.firstRow, end = config.lastRow, i = start, ranges;
          i <= end;
          i++
        ) {
          ranges = this.cache[i];
          if (null == ranges) {
            ranges = lang.getMatchOffsets(session.getLine(i), this.regExp);
            if (ranges.length > this.MAX_RANGES)
              ranges = ranges.slice(0, this.MAX_RANGES);
            ranges = ranges.map(function(match) {
              return new Range(i, match.offset, i, match.offset + match.length);
            });
            this.cache[i] = ranges.length ? ranges : "";
          }
          for (var j = ranges.length; j--; ) {
            markerLayer.drawSingleLineMarker(
              html,
              ranges[j].toScreenRange(session),
              this.clazz,
              config
            );
          }
        }
      };
    }.call(SearchHighlight.prototype));
    exports.SearchHighlight = SearchHighlight;
  }
);
ace.define(
  "ace/edit_session/fold_line",
  ["require", "exports", "module", "ace/range"],
  function(require, exports, module) {
    "use strict";
    var Range = require("../range").Range;
    function FoldLine(foldData, folds) {
      this.foldData = foldData;
      if (Array.isArray(folds)) {
        this.folds = folds;
      } else {
        folds = this.folds = [folds];
      }
      var last = folds[folds.length - 1];
      this.range = new Range(
        folds[0].start.row,
        folds[0].start.column,
        last.end.row,
        last.end.column
      );
      this.start = this.range.start;
      this.end = this.range.end;
      this.folds.forEach(function(fold) {
        fold.setFoldLine(this);
      }, this);
    }
    (function() {
      this.shiftRow = function(shift) {
        this.start.row += shift;
        this.end.row += shift;
        this.folds.forEach(function(fold) {
          fold.start.row += shift;
          fold.end.row += shift;
        });
      };
      this.addFold = function(fold) {
        if (fold.sameRow) {
          if (fold.start.row < this.startRow || fold.endRow > this.endRow) {
            throw new Error(
              "Can't add a fold to this FoldLine as it has no connection"
            );
          }
          this.folds.push(fold);
          this.folds.sort(function(a, b) {
            return -a.range.compareEnd(b.start.row, b.start.column);
          });
          if (0 < this.range.compareEnd(fold.start.row, fold.start.column)) {
            this.end.row = fold.end.row;
            this.end.column = fold.end.column;
          } else if (
            0 > this.range.compareStart(fold.end.row, fold.end.column)
          ) {
            this.start.row = fold.start.row;
            this.start.column = fold.start.column;
          }
        } else if (fold.start.row == this.end.row) {
          this.folds.push(fold);
          this.end.row = fold.end.row;
          this.end.column = fold.end.column;
        } else if (fold.end.row == this.start.row) {
          this.folds.unshift(fold);
          this.start.row = fold.start.row;
          this.start.column = fold.start.column;
        } else {
          throw new Error(
            "Trying to add fold to FoldRow that doesn't have a matching row"
          );
        }
        fold.foldLine = this;
      };
      this.containsRow = function(row) {
        return row >= this.start.row && row <= this.end.row;
      };
      this.walk = function(callback, endRow, endColumn) {
        var lastEnd = 0,
          folds = this.folds,
          fold,
          cmp,
          stop,
          isNewRow = !0;
        if (null == endRow) {
          endRow = this.end.row;
          endColumn = this.end.column;
        }
        for (var i = 0; i < folds.length; i++) {
          fold = folds[i];
          cmp = fold.range.compareStart(endRow, endColumn);
          if (-1 == cmp) {
            callback(null, endRow, endColumn, lastEnd, isNewRow);
            return;
          }
          stop = callback(
            null,
            fold.start.row,
            fold.start.column,
            lastEnd,
            isNewRow
          );
          stop =
            !stop &&
            callback(
              fold.placeholder,
              fold.start.row,
              fold.start.column,
              lastEnd
            );
          if (stop || 0 === cmp) {
            return;
          }
          isNewRow = !fold.sameRow;
          lastEnd = fold.end.column;
        }
        callback(null, endRow, endColumn, lastEnd, isNewRow);
      };
      this.getNextFoldTo = function(row, column) {
        for (var fold, cmp, i = 0; i < this.folds.length; i++) {
          fold = this.folds[i];
          cmp = fold.range.compareEnd(row, column);
          if (-1 == cmp) {
            return { fold: fold, kind: "after" };
          } else if (0 === cmp) {
            return { fold: fold, kind: "inside" };
          }
        }
        return null;
      };
      this.addRemoveChars = function(row, column, len) {
        var ret = this.getNextFoldTo(row, column),
          fold,
          folds;
        if (ret) {
          fold = ret.fold;
          if (
            "inside" == ret.kind &&
            fold.start.column != column &&
            fold.start.row != row
          ) {
            window.console && window.console.log(row, column, fold);
          } else if (fold.start.row == row) {
            folds = this.folds;
            var i = folds.indexOf(fold);
            if (0 === i) {
              this.start.column += len;
            }
            for (i; i < folds.length; i++) {
              fold = folds[i];
              fold.start.column += len;
              if (!fold.sameRow) {
                return;
              }
              fold.end.column += len;
            }
            this.end.column += len;
          }
        }
      };
      this.split = function(row, column) {
        var pos = this.getNextFoldTo(row, column);
        if (!pos || "inside" == pos.kind) return null;
        var fold = pos.fold,
          folds = this.folds,
          foldData = this.foldData,
          i = folds.indexOf(fold),
          foldBefore = folds[i - 1];
        this.end.row = foldBefore.end.row;
        this.end.column = foldBefore.end.column;
        folds = folds.splice(i, folds.length - i);
        var newFoldLine = new FoldLine(foldData, folds);
        foldData.splice(foldData.indexOf(this) + 1, 0, newFoldLine);
        return newFoldLine;
      };
      this.merge = function(foldLineNext) {
        for (var folds = foldLineNext.folds, i = 0; i < folds.length; i++) {
          this.addFold(folds[i]);
        }
        var foldData = this.foldData;
        foldData.splice(foldData.indexOf(foldLineNext), 1);
      };
      this.toString = function() {
        var ret = [this.range.toString() + ": ["];
        this.folds.forEach(function(fold) {
          ret.push("  " + fold.toString());
        });
        ret.push("]");
        return ret.join("\n");
      };
      this.idxToPosition = function(idx) {
        for (
          var lastFoldEndColumn = 0, i = 0, fold;
          i < this.folds.length;
          i++
        ) {
          fold = this.folds[i];
          idx -= fold.start.column - lastFoldEndColumn;
          if (0 > idx) {
            return { row: fold.start.row, column: fold.start.column + idx };
          }
          idx -= fold.placeholder.length;
          if (0 > idx) {
            return fold.start;
          }
          lastFoldEndColumn = fold.end.column;
        }
        return { row: this.end.row, column: this.end.column + idx };
      };
    }.call(FoldLine.prototype));
    exports.FoldLine = FoldLine;
  }
);
ace.define(
  "ace/range_list",
  ["require", "exports", "module", "ace/range"],
  function(require, exports, module) {
    "use strict";
    var Range = require("./range").Range,
      comparePoints = Range.comparePoints,
      RangeList = function RangeList() {
        this.ranges = [];
      };
    (function() {
      this.comparePoints = comparePoints;
      this.pointIndex = function(pos, excludeEdges, startIndex) {
        for (
          var list = this.ranges, i = startIndex || 0;
          i < list.length;
          i++
        ) {
          var range = list[i],
            cmpEnd = comparePoints(pos, range.end);
          if (0 < cmpEnd) continue;
          var cmpStart = comparePoints(pos, range.start);
          if (0 === cmpEnd) return excludeEdges && 0 !== cmpStart ? -i - 2 : i;
          if (0 < cmpStart || (0 === cmpStart && !excludeEdges)) return i;
          return -i - 1;
        }
        return -i - 1;
      };
      this.add = function(range) {
        var excludeEdges = !range.isEmpty(),
          startIndex = this.pointIndex(range.start, excludeEdges);
        if (0 > startIndex) startIndex = -startIndex - 1;
        var endIndex = this.pointIndex(range.end, excludeEdges, startIndex);
        if (0 > endIndex) endIndex = -endIndex - 1;
        else endIndex++;
        return this.ranges.splice(startIndex, endIndex - startIndex, range);
      };
      this.addList = function(list) {
        for (var removed = [], i = list.length; i--; ) {
          removed.push.apply(removed, this.add(list[i]));
        }
        return removed;
      };
      this.substractPoint = function(pos) {
        var i = this.pointIndex(pos);
        if (0 <= i) return this.ranges.splice(i, 1);
      };
      this.merge = function() {
        var removed = [],
          list = this.ranges;
        list = list.sort(function(a, b) {
          return comparePoints(a.start, b.start);
        });
        for (var next = list[0], range, i = 1; i < list.length; i++) {
          range = next;
          next = list[i];
          var cmp = comparePoints(range.end, next.start);
          if (0 > cmp) continue;
          if (0 == cmp && !range.isEmpty() && !next.isEmpty()) continue;
          if (0 > comparePoints(range.end, next.end)) {
            range.end.row = next.end.row;
            range.end.column = next.end.column;
          }
          list.splice(i, 1);
          removed.push(next);
          next = range;
          i--;
        }
        this.ranges = list;
        return removed;
      };
      this.contains = function(row, column) {
        return 0 <= this.pointIndex({ row: row, column: column });
      };
      this.containsPoint = function(pos) {
        return 0 <= this.pointIndex(pos);
      };
      this.rangeAtPoint = function(pos) {
        var i = this.pointIndex(pos);
        if (0 <= i) return this.ranges[i];
      };
      this.clipRows = function(startRow, endRow) {
        var list = this.ranges;
        if (
          list[0].start.row > endRow ||
          list[list.length - 1].start.row < startRow
        )
          return [];
        var startIndex = this.pointIndex({ row: startRow, column: 0 });
        if (0 > startIndex) startIndex = -startIndex - 1;
        var endIndex = this.pointIndex({ row: endRow, column: 0 }, startIndex);
        if (0 > endIndex) endIndex = -endIndex - 1;
        for (var clipped = [], i = startIndex; i < endIndex; i++) {
          clipped.push(list[i]);
        }
        return clipped;
      };
      this.removeAll = function() {
        return this.ranges.splice(0, this.ranges.length);
      };
      this.attach = function(session) {
        if (this.session) this.detach();
        this.session = session;
        this.onChange = this.$onChange.bind(this);
        this.session.on("change", this.onChange);
      };
      this.detach = function() {
        if (!this.session) return;
        this.session.removeListener("change", this.onChange);
        this.session = null;
      };
      this.$onChange = function(delta) {
        for (
          var start = delta.start,
            end = delta.end,
            startRow = start.row,
            endRow = end.row,
            ranges = this.ranges,
            i = 0,
            n = ranges.length,
            r;
          i < n;
          i++
        ) {
          r = ranges[i];
          if (r.end.row >= startRow) break;
        }
        if ("insert" == delta.action) {
          var lineDif = endRow - startRow,
            colDiff = -start.column + end.column;
          for (; i < n; i++) {
            var r = ranges[i];
            if (r.start.row > startRow) break;
            if (r.start.row == startRow && r.start.column >= start.column) {
              if (r.start.column == start.column && this.$insertRight) {
              } else {
                r.start.column += colDiff;
                r.start.row += lineDif;
              }
            }
            if (r.end.row == startRow && r.end.column >= start.column) {
              if (r.end.column == start.column && this.$insertRight) {
                continue;
              }
              if (r.end.column == start.column && 0 < colDiff && i < n - 1) {
                if (
                  r.end.column > r.start.column &&
                  r.end.column == ranges[i + 1].start.column
                )
                  r.end.column -= colDiff;
              }
              r.end.column += colDiff;
              r.end.row += lineDif;
            }
          }
        } else {
          var lineDif = startRow - endRow,
            colDiff = start.column - end.column;
          for (; i < n; i++) {
            var r = ranges[i];
            if (r.start.row > endRow) break;
            if (r.end.row < endRow) {
              r.end.row = startRow;
              r.end.column = start.column;
            }
            if (
              r.start.row < endRow ||
              (r.start.row == endRow && r.start.column <= end.colum)
            ) {
              r.start.row = startRow;
              r.start.column = start.column;
            }
            if (r.end.row == endRow) {
              if (r.end.column <= end.column) {
                if (lineDif || r.end.column > start.column) {
                  r.end.column = start.column;
                  r.end.row = start.row;
                }
              } else {
                r.end.column += colDiff;
                r.end.row += lineDif;
              }
            }
            if (r.start.row == endRow) {
              if (r.start.column <= end.column) {
                if (lineDif || r.start.column > start.column) {
                  r.start.column = start.column;
                  r.start.row = start.row;
                }
              } else {
                r.start.column += colDiff;
                r.start.row += lineDif;
              }
            }
          }
        }
        if (0 != lineDif && i < n) {
          for (; i < n; i++) {
            var r = ranges[i];
            r.start.row += lineDif;
            r.end.row += lineDif;
          }
        }
      };
    }.call(RangeList.prototype));
    exports.RangeList = RangeList;
  }
);
ace.define(
  "ace/edit_session/fold",
  [
    "require",
    "exports",
    "module",
    "ace/range",
    "ace/range_list",
    "ace/lib/oop"
  ],
  function(require, exports, module) {
    "use strict";
    var Range = require("../range").Range,
      RangeList = require("../range_list").RangeList,
      oop = require("../lib/oop"),
      Fold = (exports.Fold = function(range, placeholder) {
        this.foldLine = null;
        this.placeholder = placeholder;
        this.range = range;
        this.start = range.start;
        this.end = range.end;
        this.sameRow = range.start.row == range.end.row;
        this.subFolds = this.ranges = [];
      });
    oop.inherits(Fold, RangeList);
    (function() {
      this.toString = function() {
        return '"' + this.placeholder + '" ' + this.range.toString();
      };
      this.setFoldLine = function(foldLine) {
        this.foldLine = foldLine;
        this.subFolds.forEach(function(fold) {
          fold.setFoldLine(foldLine);
        });
      };
      this.clone = function() {
        var range = this.range.clone(),
          fold = new Fold(range, this.placeholder);
        this.subFolds.forEach(function(subFold) {
          fold.subFolds.push(subFold.clone());
        });
        fold.collapseChildren = this.collapseChildren;
        return fold;
      };
      this.addSubFold = function(fold) {
        if (this.range.isEqual(fold)) return;
        if (!this.range.containsRange(fold))
          throw new Error(
            "A fold can't intersect already existing fold" +
              fold.range +
              this.range
          );
        consumeRange(fold, this.start);
        for (
          var row = fold.start.row, column = fold.start.column, i = 0, cmp = -1;
          i < this.subFolds.length;
          i++
        ) {
          cmp = this.subFolds[i].range.compare(row, column);
          if (1 != cmp) break;
        }
        var afterStart = this.subFolds[i];
        if (0 == cmp) return afterStart.addSubFold(fold);
        for (
          var row = fold.range.end.row,
            column = fold.range.end.column,
            j = i,
            cmp = -1;
          j < this.subFolds.length;
          j++
        ) {
          cmp = this.subFolds[j].range.compare(row, column);
          if (1 != cmp) break;
        }
        var afterEnd = this.subFolds[j];
        if (0 == cmp)
          throw new Error(
            "A fold can't intersect already existing fold" +
              fold.range +
              this.range
          );
        var consumedFolds = this.subFolds.splice(i, j - i, fold);
        fold.setFoldLine(this.foldLine);
        return fold;
      };
      this.restoreRange = function(range) {
        return restoreRange(range, this.start);
      };
    }.call(Fold.prototype));
    function consumePoint(point, anchor) {
      point.row -= anchor.row;
      if (0 == point.row) point.column -= anchor.column;
    }
    function consumeRange(range, anchor) {
      consumePoint(range.start, anchor);
      consumePoint(range.end, anchor);
    }
    function restorePoint(point, anchor) {
      if (0 == point.row) point.column += anchor.column;
      point.row += anchor.row;
    }
    function restoreRange(range, anchor) {
      restorePoint(range.start, anchor);
      restorePoint(range.end, anchor);
    }
  }
);
ace.define(
  "ace/edit_session/folding",
  [
    "require",
    "exports",
    "module",
    "ace/range",
    "ace/edit_session/fold_line",
    "ace/edit_session/fold",
    "ace/token_iterator"
  ],
  function(require, exports, module) {
    "use strict";
    var Range = require("../range").Range,
      FoldLine = require("./fold_line").FoldLine,
      Fold = require("./fold").Fold,
      TokenIterator = require("../token_iterator").TokenIterator;
    function Folding() {
      this.getFoldAt = function(row, column, side) {
        var foldLine = this.getFoldLine(row);
        if (!foldLine) return null;
        for (var folds = foldLine.folds, i = 0, fold; i < folds.length; i++) {
          fold = folds[i];
          if (fold.range.contains(row, column)) {
            if (1 == side && fold.range.isEnd(row, column)) {
              continue;
            } else if (-1 == side && fold.range.isStart(row, column)) {
              continue;
            }
            return fold;
          }
        }
      };
      this.getFoldsInRange = function(range) {
        var start = range.start,
          end = range.end,
          foldLines = this.$foldData,
          foundFolds = [];
        start.column += 1;
        end.column -= 1;
        for (var i = 0, cmp; i < foldLines.length; i++) {
          cmp = foldLines[i].range.compareRange(range);
          if (2 == cmp) {
            continue;
          } else if (-2 == cmp) {
            break;
          }
          for (
            var folds = foldLines[i].folds, j = 0, fold;
            j < folds.length;
            j++
          ) {
            fold = folds[j];
            cmp = fold.range.compareRange(range);
            if (-2 == cmp) {
              break;
            } else if (2 == cmp) {
              continue;
            } else if (42 == cmp) {
              break;
            }
            foundFolds.push(fold);
          }
        }
        start.column -= 1;
        end.column += 1;
        return foundFolds;
      };
      this.getFoldsInRangeList = function(ranges) {
        if (Array.isArray(ranges)) {
          var folds = [];
          ranges.forEach(function(range) {
            folds = folds.concat(this.getFoldsInRange(range));
          }, this);
        } else {
          var folds = this.getFoldsInRange(ranges);
        }
        return folds;
      };
      this.getAllFolds = function() {
        for (
          var folds = [], foldLines = this.$foldData, i = 0;
          i < foldLines.length;
          i++
        ) {
          for (var j = 0; j < foldLines[i].folds.length; j++) {
            folds.push(foldLines[i].folds[j]);
          }
        }
        return folds;
      };
      this.getFoldStringAt = function(row, column, trim, foldLine) {
        foldLine = foldLine || this.getFoldLine(row);
        if (!foldLine) return null;
        for (
          var lastFold = { end: { column: 0 } }, str, fold, i = 0;
          i < foldLine.folds.length;
          i++
        ) {
          fold = foldLine.folds[i];
          var cmp = fold.range.compareEnd(row, column);
          if (-1 == cmp) {
            str = this.getLine(fold.start.row).substring(
              lastFold.end.column,
              fold.start.column
            );
            break;
          } else if (0 === cmp) {
            return null;
          }
          lastFold = fold;
        }
        if (!str)
          str = this.getLine(fold.start.row).substring(lastFold.end.column);
        if (-1 == trim) return str.substring(0, column - lastFold.end.column);
        else if (1 == trim) return str.substring(column - lastFold.end.column);
        else return str;
      };
      this.getFoldLine = function(docRow, startFoldLine) {
        var foldData = this.$foldData,
          i = 0;
        if (startFoldLine) i = foldData.indexOf(startFoldLine);
        if (-1 == i) i = 0;
        for (i; i < foldData.length; i++) {
          var foldLine = foldData[i];
          if (foldLine.start.row <= docRow && foldLine.end.row >= docRow) {
            return foldLine;
          } else if (foldLine.end.row > docRow) {
            return null;
          }
        }
        return null;
      };
      this.getNextFoldLine = function(docRow, startFoldLine) {
        var foldData = this.$foldData,
          i = 0;
        if (startFoldLine) i = foldData.indexOf(startFoldLine);
        if (-1 == i) i = 0;
        for (i; i < foldData.length; i++) {
          var foldLine = foldData[i];
          if (foldLine.end.row >= docRow) {
            return foldLine;
          }
        }
        return null;
      };
      this.getFoldedRowCount = function(first, last) {
        for (
          var foldData = this.$foldData, rowCount = last - first + 1, i = 0;
          i < foldData.length;
          i++
        ) {
          var foldLine = foldData[i],
            end = foldLine.end.row,
            start = foldLine.start.row;
          if (end >= last) {
            if (start < last) {
              if (start >= first) rowCount -= last - start;
              else rowCount = 0;
            }
            break;
          } else if (end >= first) {
            if (start >= first) rowCount -= end - start;
            else rowCount -= end - first + 1;
          }
        }
        return rowCount;
      };
      this.$addFoldLine = function(foldLine) {
        this.$foldData.push(foldLine);
        this.$foldData.sort(function(a, b) {
          return a.start.row - b.start.row;
        });
        return foldLine;
      };
      this.addFold = function(placeholder, range) {
        var foldData = this.$foldData,
          added = !1,
          fold;
        if (babelHelpers.instanceof(placeholder, Fold)) fold = placeholder;
        else {
          fold = new Fold(range, placeholder);
          fold.collapseChildren = range.collapseChildren;
        }
        this.$clipRangeToDocument(fold.range);
        var startRow = fold.start.row,
          startColumn = fold.start.column,
          endRow = fold.end.row,
          endColumn = fold.end.column;
        if (
          !(
            startRow < endRow ||
            (startRow == endRow && startColumn <= endColumn - 2)
          )
        )
          throw new Error("The range has to be at least 2 characters width");
        var startFold = this.getFoldAt(startRow, startColumn, 1),
          endFold = this.getFoldAt(endRow, endColumn, -1);
        if (startFold && endFold == startFold)
          return startFold.addSubFold(fold);
        if (startFold && !startFold.range.isStart(startRow, startColumn))
          this.removeFold(startFold);
        if (endFold && !endFold.range.isEnd(endRow, endColumn))
          this.removeFold(endFold);
        var folds = this.getFoldsInRange(fold.range);
        if (0 < folds.length) {
          this.removeFolds(folds);
          folds.forEach(function(subFold) {
            fold.addSubFold(subFold);
          });
        }
        for (var i = 0, foldLine; i < foldData.length; i++) {
          foldLine = foldData[i];
          if (endRow == foldLine.start.row) {
            foldLine.addFold(fold);
            added = !0;
            break;
          } else if (startRow == foldLine.end.row) {
            foldLine.addFold(fold);
            added = !0;
            if (!fold.sameRow) {
              var foldLineNext = foldData[i + 1];
              if (foldLineNext && foldLineNext.start.row == endRow) {
                foldLine.merge(foldLineNext);
                break;
              }
            }
            break;
          } else if (endRow <= foldLine.start.row) {
            break;
          }
        }
        if (!added)
          foldLine = this.$addFoldLine(new FoldLine(this.$foldData, fold));
        if (this.$useWrapMode)
          this.$updateWrapData(foldLine.start.row, foldLine.start.row);
        else this.$updateRowLengthCache(foldLine.start.row, foldLine.start.row);
        this.$modified = !0;
        this._signal("changeFold", { data: fold, action: "add" });
        return fold;
      };
      this.addFolds = function(folds) {
        folds.forEach(function(fold) {
          this.addFold(fold);
        }, this);
      };
      this.removeFold = function(fold) {
        var foldLine = fold.foldLine,
          startRow = foldLine.start.row,
          endRow = foldLine.end.row,
          foldLines = this.$foldData,
          folds = foldLine.folds;
        if (1 == folds.length) {
          foldLines.splice(foldLines.indexOf(foldLine), 1);
        } else if (foldLine.range.isEnd(fold.end.row, fold.end.column)) {
          folds.pop();
          foldLine.end.row = folds[folds.length - 1].end.row;
          foldLine.end.column = folds[folds.length - 1].end.column;
        } else if (foldLine.range.isStart(fold.start.row, fold.start.column)) {
          folds.shift();
          foldLine.start.row = folds[0].start.row;
          foldLine.start.column = folds[0].start.column;
        } else if (fold.sameRow) {
          folds.splice(folds.indexOf(fold), 1);
        } else {
          var newFoldLine = foldLine.split(fold.start.row, fold.start.column);
          folds = newFoldLine.folds;
          folds.shift();
          newFoldLine.start.row = folds[0].start.row;
          newFoldLine.start.column = folds[0].start.column;
        }
        if (!this.$updating) {
          if (this.$useWrapMode) this.$updateWrapData(startRow, endRow);
          else this.$updateRowLengthCache(startRow, endRow);
        }
        this.$modified = !0;
        this._signal("changeFold", { data: fold, action: "remove" });
      };
      this.removeFolds = function(folds) {
        for (var cloneFolds = [], i = 0; i < folds.length; i++) {
          cloneFolds.push(folds[i]);
        }
        cloneFolds.forEach(function(fold) {
          this.removeFold(fold);
        }, this);
        this.$modified = !0;
      };
      this.expandFold = function(fold) {
        this.removeFold(fold);
        fold.subFolds.forEach(function(subFold) {
          fold.restoreRange(subFold);
          this.addFold(subFold);
        }, this);
        if (0 < fold.collapseChildren) {
          this.foldAll(
            fold.start.row + 1,
            fold.end.row,
            fold.collapseChildren - 1
          );
        }
        fold.subFolds = [];
      };
      this.expandFolds = function(folds) {
        folds.forEach(function(fold) {
          this.expandFold(fold);
        }, this);
      };
      this.unfold = function(location, expandInner) {
        var range, folds;
        if (null == location) {
          range = new Range(0, 0, this.getLength(), 0);
          expandInner = !0;
        } else if ("number" == typeof location)
          range = new Range(
            location,
            0,
            location,
            this.getLine(location).length
          );
        else if ("row" in location)
          range = Range.fromPoints(location, location);
        else range = location;
        folds = this.getFoldsInRangeList(range);
        if (expandInner) {
          this.removeFolds(folds);
        } else {
          var subFolds = folds;
          while (subFolds.length) {
            this.expandFolds(subFolds);
            subFolds = this.getFoldsInRangeList(range);
          }
        }
        if (folds.length) return folds;
      };
      this.isRowFolded = function(docRow, startFoldRow) {
        return !!this.getFoldLine(docRow, startFoldRow);
      };
      this.getRowFoldEnd = function(docRow, startFoldRow) {
        var foldLine = this.getFoldLine(docRow, startFoldRow);
        return foldLine ? foldLine.end.row : docRow;
      };
      this.getRowFoldStart = function(docRow, startFoldRow) {
        var foldLine = this.getFoldLine(docRow, startFoldRow);
        return foldLine ? foldLine.start.row : docRow;
      };
      this.getFoldDisplayLine = function(
        foldLine,
        endRow,
        endColumn,
        startRow,
        startColumn
      ) {
        if (null == startRow) startRow = foldLine.start.row;
        if (null == startColumn) startColumn = 0;
        if (null == endRow) endRow = foldLine.end.row;
        if (null == endColumn) endColumn = this.getLine(endRow).length;
        var doc = this.doc,
          textLine = "";
        foldLine.walk(
          function(placeholder, row, column, lastColumn) {
            if (row < startRow) return;
            if (row == startRow) {
              if (column < startColumn) return;
              lastColumn = Math.max(startColumn, lastColumn);
            }
            if (null != placeholder) {
              textLine += placeholder;
            } else {
              textLine += doc.getLine(row).substring(lastColumn, column);
            }
          },
          endRow,
          endColumn
        );
        return textLine;
      };
      this.getDisplayLine = function(row, endColumn, startRow, startColumn) {
        var foldLine = this.getFoldLine(row);
        if (!foldLine) {
          var line;
          line = this.doc.getLine(row);
          return line.substring(startColumn || 0, endColumn || line.length);
        } else {
          return this.getFoldDisplayLine(
            foldLine,
            row,
            endColumn,
            startRow,
            startColumn
          );
        }
      };
      this.$cloneFoldData = function() {
        var fd = [];
        fd = this.$foldData.map(function(foldLine) {
          var folds = foldLine.folds.map(function(fold) {
            return fold.clone();
          });
          return new FoldLine(fd, folds);
        });
        return fd;
      };
      this.toggleFold = function(tryToUnfold) {
        var selection = this.selection,
          range = selection.getRange(),
          fold,
          bracketPos;
        if (range.isEmpty()) {
          var cursor = range.start;
          fold = this.getFoldAt(cursor.row, cursor.column);
          if (fold) {
            this.expandFold(fold);
            return;
          } else if ((bracketPos = this.findMatchingBracket(cursor))) {
            if (1 == range.comparePoint(bracketPos)) {
              range.end = bracketPos;
            } else {
              range.start = bracketPos;
              range.start.column++;
              range.end.column--;
            }
          } else if (
            (bracketPos = this.findMatchingBracket({
              row: cursor.row,
              column: cursor.column + 1
            }))
          ) {
            if (1 == range.comparePoint(bracketPos)) range.end = bracketPos;
            else range.start = bracketPos;
            range.start.column++;
          } else {
            range =
              this.getCommentFoldRange(cursor.row, cursor.column) || range;
          }
        } else {
          var folds = this.getFoldsInRange(range);
          if (tryToUnfold && folds.length) {
            this.expandFolds(folds);
            return;
          } else if (1 == folds.length) {
            fold = folds[0];
          }
        }
        if (!fold) fold = this.getFoldAt(range.start.row, range.start.column);
        if (fold && fold.range.toString() == range.toString()) {
          this.expandFold(fold);
          return;
        }
        var placeholder = "...";
        if (!range.isMultiLine()) {
          placeholder = this.getTextRange(range);
          if (4 > placeholder.length) return;
          placeholder = placeholder.trim().substring(0, 2) + "..";
        }
        this.addFold(placeholder, range);
      };
      this.getCommentFoldRange = function(row, column, dir) {
        var iterator = new TokenIterator(this, row, column),
          token = iterator.getCurrentToken(),
          type = token.type;
        if (token && /^comment|string/.test(type)) {
          type = type.match(/comment|string/)[0];
          if ("comment" == type) type += "|doc-start";
          var re = new RegExp(type),
            range = new Range();
          if (1 != dir) {
            do {
              token = iterator.stepBackward();
            } while (token && re.test(token.type));
            iterator.stepForward();
          }
          range.start.row = iterator.getCurrentTokenRow();
          range.start.column = iterator.getCurrentTokenColumn() + 2;
          iterator = new TokenIterator(this, row, column);
          if (-1 != dir) {
            var lastRow = -1;
            do {
              token = iterator.stepForward();
              if (-1 == lastRow) {
                var state = this.getState(iterator.$row);
                if (!re.test(state)) lastRow = iterator.$row;
              } else if (iterator.$row > lastRow) {
                break;
              }
            } while (token && re.test(token.type));
            token = iterator.stepBackward();
          } else token = iterator.getCurrentToken();
          range.end.row = iterator.getCurrentTokenRow();
          range.end.column =
            iterator.getCurrentTokenColumn() + token.value.length - 2;
          return range;
        }
      };
      this.foldAll = function(startRow, endRow, depth) {
        if (depth == void 0) depth = 1e5;
        var foldWidgets = this.foldWidgets;
        if (!foldWidgets) return;
        endRow = endRow || this.getLength();
        startRow = startRow || 0;
        for (var row = startRow; row < endRow; row++) {
          if (null == foldWidgets[row])
            foldWidgets[row] = this.getFoldWidget(row);
          if ("start" != foldWidgets[row]) continue;
          var range = this.getFoldWidgetRange(row);
          if (
            range &&
            range.isMultiLine() &&
            range.end.row <= endRow &&
            range.start.row >= startRow
          ) {
            row = range.end.row;
            try {
              var fold = this.addFold("...", range);
              if (fold) fold.collapseChildren = depth;
            } catch (e) {}
          }
        }
      };
      this.$foldStyles = { manual: 1, markbegin: 1, markbeginend: 1 };
      this.$foldStyle = "markbegin";
      this.setFoldStyle = function(style) {
        if (!this.$foldStyles[style])
          throw new Error(
            "invalid fold style: " +
              style +
              "[" +
              Object.keys(this.$foldStyles).join(", ") +
              "]"
          );
        if (this.$foldStyle == style) return;
        this.$foldStyle = style;
        if ("manual" == style) this.unfold();
        var mode = this.$foldMode;
        this.$setFolding(null);
        this.$setFolding(mode);
      };
      this.$setFolding = function(foldMode) {
        if (this.$foldMode == foldMode) return;
        this.$foldMode = foldMode;
        this.off("change", this.$updateFoldWidgets);
        this.off("tokenizerUpdate", this.$tokenizerUpdateFoldWidgets);
        this._signal("changeAnnotation");
        if (!foldMode || "manual" == this.$foldStyle) {
          this.foldWidgets = null;
          return;
        }
        this.foldWidgets = [];
        this.getFoldWidget = foldMode.getFoldWidget.bind(
          foldMode,
          this,
          this.$foldStyle
        );
        this.getFoldWidgetRange = foldMode.getFoldWidgetRange.bind(
          foldMode,
          this,
          this.$foldStyle
        );
        this.$updateFoldWidgets = this.updateFoldWidgets.bind(this);
        this.$tokenizerUpdateFoldWidgets = this.tokenizerUpdateFoldWidgets.bind(
          this
        );
        this.on("change", this.$updateFoldWidgets);
        this.on("tokenizerUpdate", this.$tokenizerUpdateFoldWidgets);
      };
      this.getParentFoldRangeData = function(row, ignoreCurrent) {
        var fw = this.foldWidgets;
        if (!fw || (ignoreCurrent && fw[row])) return {};
        var i = row - 1,
          firstRange;
        while (0 <= i) {
          var c = fw[i];
          if (null == c) c = fw[i] = this.getFoldWidget(i);
          if ("start" == c) {
            var range = this.getFoldWidgetRange(i);
            if (!firstRange) firstRange = range;
            if (range && range.end.row >= row) break;
          }
          i--;
        }
        return { range: -1 !== i && range, firstRange: firstRange };
      };
      this.onFoldWidgetClick = function(row, e) {
        e = e.domEvent;
        var options = {
            children: e.shiftKey,
            all: e.ctrlKey || e.metaKey,
            siblings: e.altKey
          },
          range = this.$toggleFoldWidget(row, options);
        if (!range) {
          var el = e.target || e.srcElement;
          if (el && /ace_fold-widget/.test(el.className))
            el.className += " ace_invalid";
        }
      };
      this.$toggleFoldWidget = function(row, options) {
        if (!this.getFoldWidget) return;
        var type = this.getFoldWidget(row),
          line = this.getLine(row),
          dir = "end" === type ? -1 : 1,
          fold = this.getFoldAt(row, -1 === dir ? 0 : line.length, dir);
        if (fold) {
          if (options.children || options.all) this.removeFold(fold);
          else this.expandFold(fold);
          return fold;
        }
        var range = this.getFoldWidgetRange(row, !0);
        if (range && !range.isMultiLine()) {
          fold = this.getFoldAt(range.start.row, range.start.column, 1);
          if (fold && range.isEqual(fold.range)) {
            this.removeFold(fold);
            return fold;
          }
        }
        if (options.siblings) {
          var data = this.getParentFoldRangeData(row);
          if (data.range) {
            var startRow = data.range.start.row + 1,
              endRow = data.range.end.row;
          }
          this.foldAll(startRow, endRow, options.all ? 1e4 : 0);
        } else if (options.children) {
          endRow = range ? range.end.row : this.getLength();
          this.foldAll(row + 1, endRow, options.all ? 1e4 : 0);
        } else if (range) {
          if (options.all) range.collapseChildren = 1e4;
          this.addFold("...", range);
        }
        return range;
      };
      this.toggleFoldWidget = function(toggleParent) {
        var row = this.selection.getCursor().row;
        row = this.getRowFoldStart(row);
        var range = this.$toggleFoldWidget(row, {});
        if (range) return;
        var data = this.getParentFoldRangeData(row, !0);
        range = data.range || data.firstRange;
        if (range) {
          row = range.start.row;
          var fold = this.getFoldAt(row, this.getLine(row).length, 1);
          if (fold) {
            this.removeFold(fold);
          } else {
            this.addFold("...", range);
          }
        }
      };
      this.updateFoldWidgets = function(delta) {
        var firstRow = delta.start.row,
          len = delta.end.row - firstRow;
        if (0 === len) {
          this.foldWidgets[firstRow] = null;
        } else if ("remove" == delta.action) {
          this.foldWidgets.splice(firstRow, len + 1, null);
        } else {
          var args = Array(len + 1);
          args.unshift(firstRow, 1);
          this.foldWidgets.splice.apply(this.foldWidgets, args);
        }
      };
      this.tokenizerUpdateFoldWidgets = function(e) {
        var rows = e.data;
        if (rows.first != rows.last) {
          if (this.foldWidgets.length > rows.first)
            this.foldWidgets.splice(rows.first, this.foldWidgets.length);
        }
      };
    }
    exports.Folding = Folding;
  }
);
ace.define(
  "ace/edit_session/bracket_match",
  ["require", "exports", "module", "ace/token_iterator", "ace/range"],
  function(require, exports, module) {
    "use strict";
    var TokenIterator = require("../token_iterator").TokenIterator,
      Range = require("../range").Range;
    function BracketMatch() {
      this.findMatchingBracket = function(position, chr) {
        if (0 == position.column) return null;
        var charBeforeCursor =
          chr || this.getLine(position.row).charAt(position.column - 1);
        if ("" == charBeforeCursor) return null;
        var match = charBeforeCursor.match(/([\(\[\{])|([\)\]\}])/);
        if (!match) return null;
        if (match[1]) return this.$findClosingBracket(match[1], position);
        else return this.$findOpeningBracket(match[2], position);
      };
      this.getBracketRange = function(pos) {
        var line = this.getLine(pos.row),
          before = !0,
          range,
          chr = line.charAt(pos.column - 1),
          match = chr && chr.match(/([\(\[\{])|([\)\]\}])/);
        if (!match) {
          chr = line.charAt(pos.column);
          pos = { row: pos.row, column: pos.column + 1 };
          match = chr && chr.match(/([\(\[\{])|([\)\]\}])/);
          before = !1;
        }
        if (!match) return null;
        if (match[1]) {
          var bracketPos = this.$findClosingBracket(match[1], pos);
          if (!bracketPos) return null;
          range = Range.fromPoints(pos, bracketPos);
          if (!before) {
            range.end.column++;
            range.start.column--;
          }
          range.cursor = range.end;
        } else {
          var bracketPos = this.$findOpeningBracket(match[2], pos);
          if (!bracketPos) return null;
          range = Range.fromPoints(bracketPos, pos);
          if (!before) {
            range.start.column++;
            range.end.column--;
          }
          range.cursor = range.start;
        }
        return range;
      };
      this.$brackets = {
        ")": "(",
        "(": ")",
        "]": "[",
        "[": "]",
        "{": "}",
        "}": "{"
      };
      this.$findOpeningBracket = function(bracket, position, typeRe) {
        var openBracket = this.$brackets[bracket],
          depth = 1,
          iterator = new TokenIterator(this, position.row, position.column),
          token = iterator.getCurrentToken();
        if (!token) token = iterator.stepForward();
        if (!token) return;
        if (!typeRe) {
          typeRe = new RegExp(
            "(\\.?" +
              token.type
                .replace(".", "\\.")
                .replace("rparen", ".paren")
                .replace(/\b(?:end)\b/, "(?:start|begin|end)") +
              ")+"
          );
        }
        var valueIndex = position.column - iterator.getCurrentTokenColumn() - 2,
          value = token.value;
        while (!0) {
          while (0 <= valueIndex) {
            var chr = value.charAt(valueIndex);
            if (chr == openBracket) {
              depth -= 1;
              if (0 == depth) {
                return {
                  row: iterator.getCurrentTokenRow(),
                  column: valueIndex + iterator.getCurrentTokenColumn()
                };
              }
            } else if (chr == bracket) {
              depth += 1;
            }
            valueIndex -= 1;
          }
          do {
            token = iterator.stepBackward();
          } while (token && !typeRe.test(token.type));
          if (null == token) break;
          value = token.value;
          valueIndex = value.length - 1;
        }
        return null;
      };
      this.$findClosingBracket = function(bracket, position, typeRe) {
        var closingBracket = this.$brackets[bracket],
          depth = 1,
          iterator = new TokenIterator(this, position.row, position.column),
          token = iterator.getCurrentToken();
        if (!token) token = iterator.stepForward();
        if (!token) return;
        if (!typeRe) {
          typeRe = new RegExp(
            "(\\.?" +
              token.type
                .replace(".", "\\.")
                .replace("lparen", ".paren")
                .replace(/\b(?:start|begin)\b/, "(?:start|begin|end)") +
              ")+"
          );
        }
        var valueIndex = position.column - iterator.getCurrentTokenColumn();
        while (!0) {
          var value = token.value,
            valueLength = value.length;
          while (valueIndex < valueLength) {
            var chr = value.charAt(valueIndex);
            if (chr == closingBracket) {
              depth -= 1;
              if (0 == depth) {
                return {
                  row: iterator.getCurrentTokenRow(),
                  column: valueIndex + iterator.getCurrentTokenColumn()
                };
              }
            } else if (chr == bracket) {
              depth += 1;
            }
            valueIndex += 1;
          }
          do {
            token = iterator.stepForward();
          } while (token && !typeRe.test(token.type));
          if (null == token) break;
          valueIndex = 0;
        }
        return null;
      };
    }
    exports.BracketMatch = BracketMatch;
  }
);
ace.define(
  "ace/edit_session",
  [
    "require",
    "exports",
    "module",
    "ace/lib/oop",
    "ace/lib/lang",
    "ace/bidihandler",
    "ace/config",
    "ace/lib/event_emitter",
    "ace/selection",
    "ace/mode/text",
    "ace/range",
    "ace/document",
    "ace/background_tokenizer",
    "ace/search_highlight",
    "ace/edit_session/folding",
    "ace/edit_session/bracket_match"
  ],
  function(require, exports, module) {
    "use strict";
    var _NumberMAX_VALUE = Number.MAX_VALUE,
      _Mathfloor = Math.floor,
      _Mathmin5 = Math.min,
      _Mathmax5 = Math.max,
      oop = require("./lib/oop"),
      lang = require("./lib/lang"),
      BidiHandler = require("./bidihandler").BidiHandler,
      config = require("./config"),
      EventEmitter = require("./lib/event_emitter").EventEmitter,
      Selection = require("./selection").Selection,
      TextMode = require("./mode/text").Mode,
      Range = require("./range").Range,
      Document = require("./document").Document,
      BackgroundTokenizer = require("./background_tokenizer")
        .BackgroundTokenizer,
      SearchHighlight = require("./search_highlight").SearchHighlight,
      EditSession = function EditSession(text, mode) {
        this.$breakpoints = [];
        this.$decorations = [];
        this.$frontMarkers = {};
        this.$backMarkers = {};
        this.$markerId = 1;
        this.$undoSelect = !0;
        this.$foldData = [];
        this.id = "session" + ++EditSession.$uid;
        this.$foldData.toString = function() {
          return this.join("\n");
        };
        this.on("changeFold", this.onChangeFold.bind(this));
        this.$onChange = this.onChange.bind(this);
        if ("object" != babelHelpers.typeof(text) || !text.getLine)
          text = new Document(text);
        this.setDocument(text);
        this.selection = new Selection(this);
        this.$bidiHandler = new BidiHandler(this);
        config.resetOptions(this);
        this.setMode(mode);
        config._signal("session", this);
      };
    EditSession.$uid = 0;
    (function() {
      oop.implement(this, EventEmitter);
      this.setDocument = function(doc) {
        if (this.doc) this.doc.removeListener("change", this.$onChange);
        this.doc = doc;
        doc.on("change", this.$onChange);
        if (this.bgTokenizer) this.bgTokenizer.setDocument(this.getDocument());
        this.resetCaches();
      };
      this.getDocument = function() {
        return this.doc;
      };
      this.$resetRowCache = function(docRow) {
        if (!docRow) {
          this.$docRowCache = [];
          this.$screenRowCache = [];
          return;
        }
        var l = this.$docRowCache.length,
          i = this.$getRowCacheIndex(this.$docRowCache, docRow) + 1;
        if (l > i) {
          this.$docRowCache.splice(i, l);
          this.$screenRowCache.splice(i, l);
        }
      };
      this.$getRowCacheIndex = function(cacheArray, val) {
        var low = 0,
          hi = cacheArray.length - 1;
        while (low <= hi) {
          var mid = (low + hi) >> 1,
            c = cacheArray[mid];
          if (val > c) low = mid + 1;
          else if (val < c) hi = mid - 1;
          else return mid;
        }
        return low - 1;
      };
      this.resetCaches = function() {
        this.$modified = !0;
        this.$wrapData = [];
        this.$rowLengthCache = [];
        this.$resetRowCache(0);
        if (this.bgTokenizer) this.bgTokenizer.start(0);
      };
      this.onChangeFold = function(e) {
        var fold = e.data;
        this.$resetRowCache(fold.start.row);
      };
      this.onChange = function(delta) {
        this.$modified = !0;
        this.$bidiHandler.onChange(delta);
        this.$resetRowCache(delta.start.row);
        var removedFolds = this.$updateInternalDataOnChange(delta);
        if (!this.$fromUndo && this.$undoManager) {
          if (removedFolds && removedFolds.length) {
            this.$undoManager.add(
              { action: "removeFolds", folds: removedFolds },
              this.mergeUndoDeltas
            );
            this.mergeUndoDeltas = !0;
          }
          this.$undoManager.add(delta, this.mergeUndoDeltas);
          this.mergeUndoDeltas = !0;
          this.$informUndoManager.schedule();
        }
        this.bgTokenizer && this.bgTokenizer.$updateOnChange(delta);
        this._signal("change", delta);
      };
      this.setValue = function(text) {
        this.doc.setValue(text);
        this.selection.moveTo(0, 0);
        this.$resetRowCache(0);
        this.setUndoManager(this.$undoManager);
        this.getUndoManager().reset();
      };
      this.getValue = this.toString = function() {
        return this.doc.getValue();
      };
      this.getSelection = function() {
        return this.selection;
      };
      this.getState = function(row) {
        return this.bgTokenizer.getState(row);
      };
      this.getTokens = function(row) {
        return this.bgTokenizer.getTokens(row);
      };
      this.getTokenAt = function(row, column) {
        var tokens = this.bgTokenizer.getTokens(row),
          token,
          c = 0;
        if (null == column) {
          var i = tokens.length - 1;
          c = this.getLine(row).length;
        } else {
          for (var i = 0; i < tokens.length; i++) {
            c += tokens[i].value.length;
            if (c >= column) break;
          }
        }
        token = tokens[i];
        if (!token) return null;
        token.index = i;
        token.start = c - token.value.length;
        return token;
      };
      this.setUndoManager = function(undoManager) {
        this.$undoManager = undoManager;
        if (this.$informUndoManager) this.$informUndoManager.cancel();
        if (undoManager) {
          var self = this;
          undoManager.addSession(this);
          this.$syncInformUndoManager = function() {
            self.$informUndoManager.cancel();
            self.mergeUndoDeltas = !1;
          };
          this.$informUndoManager = lang.delayedCall(
            this.$syncInformUndoManager
          );
        } else {
          this.$syncInformUndoManager = function() {};
        }
      };
      this.markUndoGroup = function() {
        if (this.$syncInformUndoManager) this.$syncInformUndoManager();
      };
      this.$defaultUndoManager = {
        undo: function undo() {},
        redo: function redo() {},
        reset: function reset() {},
        add: function add() {},
        addSelection: function addSelection() {},
        startNewGroup: function startNewGroup() {},
        addSession: function addSession() {}
      };
      this.getUndoManager = function() {
        return this.$undoManager || this.$defaultUndoManager;
      };
      this.getTabString = function() {
        if (this.getUseSoftTabs()) {
          return lang.stringRepeat(" ", this.getTabSize());
        } else {
          return "\t";
        }
      };
      this.setUseSoftTabs = function(val) {
        this.setOption("useSoftTabs", val);
      };
      this.getUseSoftTabs = function() {
        return this.$useSoftTabs && !this.$mode.$indentWithTabs;
      };
      this.setTabSize = function(tabSize) {
        this.setOption("tabSize", tabSize);
      };
      this.getTabSize = function() {
        return this.$tabSize;
      };
      this.isTabStop = function(position) {
        return this.$useSoftTabs && 0 === position.column % this.$tabSize;
      };
      this.setNavigateWithinSoftTabs = function(navigateWithinSoftTabs) {
        this.setOption("navigateWithinSoftTabs", navigateWithinSoftTabs);
      };
      this.getNavigateWithinSoftTabs = function() {
        return this.$navigateWithinSoftTabs;
      };
      this.$overwrite = !1;
      this.setOverwrite = function(overwrite) {
        this.setOption("overwrite", overwrite);
      };
      this.getOverwrite = function() {
        return this.$overwrite;
      };
      this.toggleOverwrite = function() {
        this.setOverwrite(!this.$overwrite);
      };
      this.addGutterDecoration = function(row, className) {
        if (!this.$decorations[row]) this.$decorations[row] = "";
        this.$decorations[row] += " " + className;
        this._signal("changeBreakpoint", {});
      };
      this.removeGutterDecoration = function(row, className) {
        this.$decorations[row] = (this.$decorations[row] || "").replace(
          " " + className,
          ""
        );
        this._signal("changeBreakpoint", {});
      };
      this.getBreakpoints = function() {
        return this.$breakpoints;
      };
      this.setBreakpoints = function(rows) {
        this.$breakpoints = [];
        for (var i = 0; i < rows.length; i++) {
          this.$breakpoints[rows[i]] = "ace_breakpoint";
        }
        this._signal("changeBreakpoint", {});
      };
      this.clearBreakpoints = function() {
        this.$breakpoints = [];
        this._signal("changeBreakpoint", {});
      };
      this.setBreakpoint = function(row, className) {
        if (className === void 0) className = "ace_breakpoint";
        if (className) this.$breakpoints[row] = className;
        else delete this.$breakpoints[row];
        this._signal("changeBreakpoint", {});
      };
      this.clearBreakpoint = function(row) {
        delete this.$breakpoints[row];
        this._signal("changeBreakpoint", {});
      };
      this.addMarker = function(range, clazz, type, inFront) {
        var id = this.$markerId++,
          marker = {
            range: range,
            type: type || "line",
            renderer: "function" == typeof type ? type : null,
            clazz: clazz,
            inFront: !!inFront,
            id: id
          };
        if (inFront) {
          this.$frontMarkers[id] = marker;
          this._signal("changeFrontMarker");
        } else {
          this.$backMarkers[id] = marker;
          this._signal("changeBackMarker");
        }
        return id;
      };
      this.addDynamicMarker = function(marker, inFront) {
        if (!marker.update) return;
        var id = this.$markerId++;
        marker.id = id;
        marker.inFront = !!inFront;
        if (inFront) {
          this.$frontMarkers[id] = marker;
          this._signal("changeFrontMarker");
        } else {
          this.$backMarkers[id] = marker;
          this._signal("changeBackMarker");
        }
        return marker;
      };
      this.removeMarker = function(markerId) {
        var marker =
          this.$frontMarkers[markerId] || this.$backMarkers[markerId];
        if (!marker) return;
        var markers = marker.inFront ? this.$frontMarkers : this.$backMarkers;
        delete markers[markerId];
        this._signal(marker.inFront ? "changeFrontMarker" : "changeBackMarker");
      };
      this.getMarkers = function(inFront) {
        return inFront ? this.$frontMarkers : this.$backMarkers;
      };
      this.highlight = function(re) {
        if (!this.$searchHighlight) {
          var highlight = new SearchHighlight(
            null,
            "ace_selected-word",
            "text"
          );
          this.$searchHighlight = this.addDynamicMarker(highlight);
        }
        this.$searchHighlight.setRegexp(re);
      };
      this.highlightLines = function(startRow, endRow, clazz, inFront) {
        if ("number" != typeof endRow) {
          clazz = endRow;
          endRow = startRow;
        }
        if (!clazz) clazz = "ace_step";
        var range = new Range(startRow, 0, endRow, 1 / 0);
        range.id = this.addMarker(range, clazz, "fullLine", inFront);
        return range;
      };
      this.setAnnotations = function(annotations) {
        this.$annotations = annotations;
        this._signal("changeAnnotation", {});
      };
      this.getAnnotations = function() {
        return this.$annotations || [];
      };
      this.clearAnnotations = function() {
        this.setAnnotations([]);
      };
      this.$detectNewLine = function(text) {
        var match = text.match(/^.*?(\r?\n)/m);
        if (match) {
          this.$autoNewLine = match[1];
        } else {
          this.$autoNewLine = "\n";
        }
      };
      this.getWordRange = function(row, column) {
        var line = this.getLine(row),
          inToken = !1;
        if (0 < column) inToken = !!line.charAt(column - 1).match(this.tokenRe);
        if (!inToken) inToken = !!line.charAt(column).match(this.tokenRe);
        if (inToken) var re = this.tokenRe;
        else if (/^\s+$/.test(line.slice(column - 1, column + 1)))
          var re = /\s/;
        else var re = this.nonTokenRe;
        var start = column;
        if (0 < start) {
          do {
            start--;
          } while (0 <= start && line.charAt(start).match(re));
          start++;
        }
        var end = column;
        while (end < line.length && line.charAt(end).match(re)) {
          end++;
        }
        return new Range(row, start, row, end);
      };
      this.getAWordRange = function(row, column) {
        var wordRange = this.getWordRange(row, column),
          line = this.getLine(wordRange.end.row);
        while (line.charAt(wordRange.end.column).match(/[ \t]/)) {
          wordRange.end.column += 1;
        }
        return wordRange;
      };
      this.setNewLineMode = function(newLineMode) {
        this.doc.setNewLineMode(newLineMode);
      };
      this.getNewLineMode = function() {
        return this.doc.getNewLineMode();
      };
      this.setUseWorker = function(useWorker) {
        this.setOption("useWorker", useWorker);
      };
      this.getUseWorker = function() {
        return this.$useWorker;
      };
      this.onReloadTokenizer = function(e) {
        var rows = e.data;
        this.bgTokenizer.start(rows.first);
        this._signal("tokenizerUpdate", e);
      };
      this.$modes = config.$modes;
      this.$mode = null;
      this.$modeId = null;
      this.setMode = function(mode, cb) {
        if (mode && "object" === babelHelpers.typeof(mode)) {
          if (mode.getTokenizer) return this.$onChangeMode(mode);
          var options = mode,
            path = options.path;
        } else {
          path = mode || "ace/mode/text";
        }
        if (!this.$modes["ace/mode/text"])
          this.$modes["ace/mode/text"] = new TextMode();
        if (this.$modes[path] && !options) {
          this.$onChangeMode(this.$modes[path]);
          cb && cb();
          return;
        }
        this.$modeId = path;
        config.loadModule(
          ["mode", path],
          function(m) {
            if (this.$modeId !== path) return cb && cb();
            if (this.$modes[path] && !options) {
              this.$onChangeMode(this.$modes[path]);
            } else if (m && m.Mode) {
              m = new m.Mode(options);
              if (!options) {
                this.$modes[path] = m;
                m.$id = path;
              }
              this.$onChangeMode(m);
            }
            cb && cb();
          }.bind(this)
        );
        if (!this.$mode) this.$onChangeMode(this.$modes["ace/mode/text"], !0);
      };
      this.$onChangeMode = function(mode, $isPlaceholder) {
        if (!$isPlaceholder) this.$modeId = mode.$id;
        if (this.$mode === mode) return;
        this.$mode = mode;
        this.$stopWorker();
        if (this.$useWorker) this.$startWorker();
        var tokenizer = mode.getTokenizer();
        if (tokenizer.addEventListener !== void 0) {
          var onReloadTokenizer = this.onReloadTokenizer.bind(this);
          tokenizer.addEventListener("update", onReloadTokenizer);
        }
        if (!this.bgTokenizer) {
          this.bgTokenizer = new BackgroundTokenizer(tokenizer);
          var _self = this;
          this.bgTokenizer.addEventListener("update", function(e) {
            _self._signal("tokenizerUpdate", e);
          });
        } else {
          this.bgTokenizer.setTokenizer(tokenizer);
        }
        this.bgTokenizer.setDocument(this.getDocument());
        this.tokenRe = mode.tokenRe;
        this.nonTokenRe = mode.nonTokenRe;
        if (!$isPlaceholder) {
          if (mode.attachToSession) mode.attachToSession(this);
          this.$options.wrapMethod.set.call(this, this.$wrapMethod);
          this.$setFolding(mode.foldingRules);
          this.bgTokenizer.start(0);
          this._emit("changeMode");
        }
      };
      this.$stopWorker = function() {
        if (this.$worker) {
          this.$worker.terminate();
          this.$worker = null;
        }
      };
      this.$startWorker = function() {
        try {
          this.$worker = this.$mode.createWorker(this);
        } catch (e) {
          config.warn("Could not load worker", e);
          this.$worker = null;
        }
      };
      this.getMode = function() {
        return this.$mode;
      };
      this.$scrollTop = 0;
      this.setScrollTop = function(scrollTop) {
        if (this.$scrollTop === scrollTop || isNaN(scrollTop)) return;
        this.$scrollTop = scrollTop;
        this._signal("changeScrollTop", scrollTop);
      };
      this.getScrollTop = function() {
        return this.$scrollTop;
      };
      this.$scrollLeft = 0;
      this.setScrollLeft = function(scrollLeft) {
        if (this.$scrollLeft === scrollLeft || isNaN(scrollLeft)) return;
        this.$scrollLeft = scrollLeft;
        this._signal("changeScrollLeft", scrollLeft);
      };
      this.getScrollLeft = function() {
        return this.$scrollLeft;
      };
      this.getScreenWidth = function() {
        this.$computeWidth();
        if (this.lineWidgets)
          return _Mathmax5(this.getLineWidgetMaxWidth(), this.screenWidth);
        return this.screenWidth;
      };
      this.getLineWidgetMaxWidth = function() {
        if (null != this.lineWidgetsWidth) return this.lineWidgetsWidth;
        var width = 0;
        this.lineWidgets.forEach(function(w) {
          if (w && w.screenWidth > width) width = w.screenWidth;
        });
        return (this.lineWidgetWidth = width);
      };
      this.$computeWidth = function(force) {
        if (this.$modified || force) {
          this.$modified = !1;
          if (this.$useWrapMode) return (this.screenWidth = this.$wrapLimit);
          for (
            var lines = this.doc.getAllLines(),
              cache = this.$rowLengthCache,
              longestScreenLine = 0,
              foldIndex = 0,
              foldLine = this.$foldData[foldIndex],
              foldStart = foldLine ? foldLine.start.row : 1 / 0,
              len = lines.length,
              i = 0;
            i < len;
            i++
          ) {
            if (i > foldStart) {
              i = foldLine.end.row + 1;
              if (i >= len) break;
              foldLine = this.$foldData[foldIndex++];
              foldStart = foldLine ? foldLine.start.row : 1 / 0;
            }
            if (null == cache[i])
              cache[i] = this.$getStringScreenWidth(lines[i])[0];
            if (cache[i] > longestScreenLine) longestScreenLine = cache[i];
          }
          this.screenWidth = longestScreenLine;
        }
      };
      this.getLine = function(row) {
        return this.doc.getLine(row);
      };
      this.getLines = function(firstRow, lastRow) {
        return this.doc.getLines(firstRow, lastRow);
      };
      this.getLength = function() {
        return this.doc.getLength();
      };
      this.getTextRange = function(range) {
        return this.doc.getTextRange(range || this.selection.getRange());
      };
      this.insert = function(position, text) {
        return this.doc.insert(position, text);
      };
      this.remove = function(range) {
        return this.doc.remove(range);
      };
      this.removeFullLines = function(firstRow, lastRow) {
        return this.doc.removeFullLines(firstRow, lastRow);
      };
      this.undoChanges = function(deltas, dontSelect) {
        if (!deltas.length) return;
        this.$fromUndo = !0;
        for (var i = deltas.length - 1, delta; -1 != i; i--) {
          delta = deltas[i];
          if ("insert" == delta.action || "remove" == delta.action) {
            this.doc.revertDelta(delta);
          } else if (delta.folds) {
            this.addFolds(delta.folds);
          }
        }
        if (!dontSelect && this.$undoSelect) {
          if (deltas.selectionBefore)
            this.selection.fromJSON(deltas.selectionBefore);
          else this.selection.setRange(this.$getUndoSelection(deltas, !0));
        }
        this.$fromUndo = !1;
      };
      this.redoChanges = function(deltas, dontSelect) {
        if (!deltas.length) return;
        this.$fromUndo = !0;
        for (var i = 0, delta; i < deltas.length; i++) {
          delta = deltas[i];
          if ("insert" == delta.action || "remove" == delta.action) {
            this.doc.applyDelta(delta);
          }
        }
        if (!dontSelect && this.$undoSelect) {
          if (deltas.selectionAfter)
            this.selection.fromJSON(deltas.selectionAfter);
          else this.selection.setRange(this.$getUndoSelection(deltas, !1));
        }
        this.$fromUndo = !1;
      };
      this.setUndoSelect = function(enable) {
        this.$undoSelect = enable;
      };
      this.$getUndoSelection = function(deltas, isUndo) {
        function isInsert(delta) {
          return isUndo ? "insert" !== delta.action : "insert" === delta.action;
        }
        for (
          var range, point, lastDeltaIsInsert, i = 0, delta;
          i < deltas.length;
          i++
        ) {
          delta = deltas[i];
          if (!delta.start) continue;
          if (!range) {
            if (isInsert(delta)) {
              range = Range.fromPoints(delta.start, delta.end);
              lastDeltaIsInsert = !0;
            } else {
              range = Range.fromPoints(delta.start, delta.start);
              lastDeltaIsInsert = !1;
            }
            continue;
          }
          if (isInsert(delta)) {
            point = delta.start;
            if (-1 == range.compare(point.row, point.column)) {
              range.setStart(point);
            }
            point = delta.end;
            if (1 == range.compare(point.row, point.column)) {
              range.setEnd(point);
            }
            lastDeltaIsInsert = !0;
          } else {
            point = delta.start;
            if (-1 == range.compare(point.row, point.column)) {
              range = Range.fromPoints(delta.start, delta.start);
            }
            lastDeltaIsInsert = !1;
          }
        }
        return range;
      };
      this.replace = function(range, text) {
        return this.doc.replace(range, text);
      };
      this.moveText = function(fromRange, toPosition, copy) {
        var text = this.getTextRange(fromRange),
          folds = this.getFoldsInRange(fromRange),
          toRange = Range.fromPoints(toPosition, toPosition);
        if (!copy) {
          this.remove(fromRange);
          var rowDiff = fromRange.start.row - fromRange.end.row,
            collDiff = rowDiff
              ? -fromRange.end.column
              : fromRange.start.column - fromRange.end.column;
          if (collDiff) {
            if (
              toRange.start.row == fromRange.end.row &&
              toRange.start.column > fromRange.end.column
            )
              toRange.start.column += collDiff;
            if (
              toRange.end.row == fromRange.end.row &&
              toRange.end.column > fromRange.end.column
            )
              toRange.end.column += collDiff;
          }
          if (rowDiff && toRange.start.row >= fromRange.end.row) {
            toRange.start.row += rowDiff;
            toRange.end.row += rowDiff;
          }
        }
        toRange.end = this.insert(toRange.start, text);
        if (folds.length) {
          var oldStart = fromRange.start,
            newStart = toRange.start,
            rowDiff = newStart.row - oldStart.row,
            collDiff = newStart.column - oldStart.column;
          this.addFolds(
            folds.map(function(x) {
              x = x.clone();
              if (x.start.row == oldStart.row) x.start.column += collDiff;
              if (x.end.row == oldStart.row) x.end.column += collDiff;
              x.start.row += rowDiff;
              x.end.row += rowDiff;
              return x;
            })
          );
        }
        return toRange;
      };
      this.indentRows = function(startRow, endRow, indentString) {
        indentString = indentString.replace(/\t/g, this.getTabString());
        for (var row = startRow; row <= endRow; row++) {
          this.doc.insertInLine({ row: row, column: 0 }, indentString);
        }
      };
      this.outdentRows = function(range) {
        for (
          var rowRange = range.collapseRows(),
            deleteRange = new Range(0, 0, 0, 0),
            size = this.getTabSize(),
            i = rowRange.start.row,
            line;
          i <= rowRange.end.row;
          ++i
        ) {
          line = this.getLine(i);
          deleteRange.start.row = i;
          deleteRange.end.row = i;
          for (var j = 0; j < size; ++j) {
            if (" " != line.charAt(j)) break;
          }
          if (j < size && "\t" == line.charAt(j)) {
            deleteRange.start.column = j;
            deleteRange.end.column = j + 1;
          } else {
            deleteRange.start.column = 0;
            deleteRange.end.column = j;
          }
          this.remove(deleteRange);
        }
      };
      this.$moveLines = function(firstRow, lastRow, dir) {
        firstRow = this.getRowFoldStart(firstRow);
        lastRow = this.getRowFoldEnd(lastRow);
        if (0 > dir) {
          var row = this.getRowFoldStart(firstRow + dir);
          if (0 > row) return 0;
          var diff = row - firstRow;
        } else if (0 < dir) {
          var row = this.getRowFoldEnd(lastRow + dir);
          if (row > this.doc.getLength() - 1) return 0;
          var diff = row - lastRow;
        } else {
          firstRow = this.$clipRowToDocument(firstRow);
          lastRow = this.$clipRowToDocument(lastRow);
          var diff = lastRow - firstRow + 1;
        }
        var range = new Range(firstRow, 0, lastRow, _NumberMAX_VALUE),
          folds = this.getFoldsInRange(range).map(function(x) {
            x = x.clone();
            x.start.row += diff;
            x.end.row += diff;
            return x;
          }),
          lines =
            0 == dir
              ? this.doc.getLines(firstRow, lastRow)
              : this.doc.removeFullLines(firstRow, lastRow);
        this.doc.insertFullLines(firstRow + diff, lines);
        folds.length && this.addFolds(folds);
        return diff;
      };
      this.moveLinesUp = function(firstRow, lastRow) {
        return this.$moveLines(firstRow, lastRow, -1);
      };
      this.moveLinesDown = function(firstRow, lastRow) {
        return this.$moveLines(firstRow, lastRow, 1);
      };
      this.duplicateLines = function(firstRow, lastRow) {
        return this.$moveLines(firstRow, lastRow, 0);
      };
      this.$clipRowToDocument = function(row) {
        return _Mathmax5(0, _Mathmin5(row, this.doc.getLength() - 1));
      };
      this.$clipColumnToRow = function(row, column) {
        if (0 > column) return 0;
        return _Mathmin5(this.doc.getLine(row).length, column);
      };
      this.$clipPositionToDocument = function(row, column) {
        column = _Mathmax5(0, column);
        if (0 > row) {
          row = 0;
          column = 0;
        } else {
          var len = this.doc.getLength();
          if (row >= len) {
            row = len - 1;
            column = this.doc.getLine(len - 1).length;
          } else {
            column = _Mathmin5(this.doc.getLine(row).length, column);
          }
        }
        return { row: row, column: column };
      };
      this.$clipRangeToDocument = function(range) {
        if (0 > range.start.row) {
          range.start.row = 0;
          range.start.column = 0;
        } else {
          range.start.column = this.$clipColumnToRow(
            range.start.row,
            range.start.column
          );
        }
        var len = this.doc.getLength() - 1;
        if (range.end.row > len) {
          range.end.row = len;
          range.end.column = this.doc.getLine(len).length;
        } else {
          range.end.column = this.$clipColumnToRow(
            range.end.row,
            range.end.column
          );
        }
        return range;
      };
      this.$wrapLimit = 80;
      this.$useWrapMode = !1;
      this.$wrapLimitRange = { min: null, max: null };
      this.setUseWrapMode = function(useWrapMode) {
        if (useWrapMode != this.$useWrapMode) {
          this.$useWrapMode = useWrapMode;
          this.$modified = !0;
          this.$resetRowCache(0);
          if (useWrapMode) {
            var len = this.getLength();
            this.$wrapData = Array(len);
            this.$updateWrapData(0, len - 1);
          }
          this._signal("changeWrapMode");
        }
      };
      this.getUseWrapMode = function() {
        return this.$useWrapMode;
      };
      this.setWrapLimitRange = function(min, max) {
        if (
          this.$wrapLimitRange.min !== min ||
          this.$wrapLimitRange.max !== max
        ) {
          this.$wrapLimitRange = { min: min, max: max };
          this.$modified = !0;
          this.$bidiHandler.markAsDirty();
          if (this.$useWrapMode) this._signal("changeWrapMode");
        }
      };
      this.adjustWrapLimit = function(desiredLimit, $printMargin) {
        var limits = this.$wrapLimitRange;
        if (0 > limits.max) limits = { min: $printMargin, max: $printMargin };
        var wrapLimit = this.$constrainWrapLimit(
          desiredLimit,
          limits.min,
          limits.max
        );
        if (wrapLimit != this.$wrapLimit && 1 < wrapLimit) {
          this.$wrapLimit = wrapLimit;
          this.$modified = !0;
          if (this.$useWrapMode) {
            this.$updateWrapData(0, this.getLength() - 1);
            this.$resetRowCache(0);
            this._signal("changeWrapLimit");
          }
          return !0;
        }
        return !1;
      };
      this.$constrainWrapLimit = function(wrapLimit, min, max) {
        if (min) wrapLimit = _Mathmax5(min, wrapLimit);
        if (max) wrapLimit = _Mathmin5(max, wrapLimit);
        return wrapLimit;
      };
      this.getWrapLimit = function() {
        return this.$wrapLimit;
      };
      this.setWrapLimit = function(limit) {
        this.setWrapLimitRange(limit, limit);
      };
      this.getWrapLimitRange = function() {
        return { min: this.$wrapLimitRange.min, max: this.$wrapLimitRange.max };
      };
      this.$updateInternalDataOnChange = function(delta) {
        var useWrapMode = this.$useWrapMode,
          action = delta.action,
          start = delta.start,
          end = delta.end,
          firstRow = start.row,
          lastRow = end.row,
          len = lastRow - firstRow,
          removedFolds = null;
        this.$updating = !0;
        if (0 != len) {
          if ("remove" === action) {
            this[useWrapMode ? "$wrapData" : "$rowLengthCache"].splice(
              firstRow,
              len
            );
            var foldLines = this.$foldData;
            removedFolds = this.getFoldsInRange(delta);
            this.removeFolds(removedFolds);
            var foldLine = this.getFoldLine(end.row),
              idx = 0;
            if (foldLine) {
              foldLine.addRemoveChars(
                end.row,
                end.column,
                start.column - end.column
              );
              foldLine.shiftRow(-len);
              var foldLineBefore = this.getFoldLine(firstRow);
              if (foldLineBefore && foldLineBefore !== foldLine) {
                foldLineBefore.merge(foldLine);
                foldLine = foldLineBefore;
              }
              idx = foldLines.indexOf(foldLine) + 1;
            }
            for (idx; idx < foldLines.length; idx++) {
              var foldLine = foldLines[idx];
              if (foldLine.start.row >= end.row) {
                foldLine.shiftRow(-len);
              }
            }
            lastRow = firstRow;
          } else {
            var args = Array(len);
            args.unshift(firstRow, 0);
            var arr = useWrapMode ? this.$wrapData : this.$rowLengthCache;
            arr.splice.apply(arr, args);
            var foldLines = this.$foldData,
              foldLine = this.getFoldLine(firstRow),
              idx = 0;
            if (foldLine) {
              var cmp = foldLine.range.compareInside(start.row, start.column);
              if (0 == cmp) {
                foldLine = foldLine.split(start.row, start.column);
                if (foldLine) {
                  foldLine.shiftRow(len);
                  foldLine.addRemoveChars(
                    lastRow,
                    0,
                    end.column - start.column
                  );
                }
              } else if (-1 == cmp) {
                foldLine.addRemoveChars(firstRow, 0, end.column - start.column);
                foldLine.shiftRow(len);
              }
              idx = foldLines.indexOf(foldLine) + 1;
            }
            for (idx; idx < foldLines.length; idx++) {
              var foldLine = foldLines[idx];
              if (foldLine.start.row >= firstRow) {
                foldLine.shiftRow(len);
              }
            }
          }
        } else {
          len = Math.abs(delta.start.column - delta.end.column);
          if ("remove" === action) {
            removedFolds = this.getFoldsInRange(delta);
            this.removeFolds(removedFolds);
            len = -len;
          }
          var foldLine = this.getFoldLine(firstRow);
          if (foldLine) {
            foldLine.addRemoveChars(firstRow, start.column, len);
          }
        }
        if (useWrapMode && this.$wrapData.length != this.doc.getLength()) {
          console.error(
            "doc.getLength() and $wrapData.length have to be the same!"
          );
        }
        this.$updating = !1;
        if (useWrapMode) this.$updateWrapData(firstRow, lastRow);
        else this.$updateRowLengthCache(firstRow, lastRow);
        return removedFolds;
      };
      this.$updateRowLengthCache = function(firstRow, lastRow, b) {
        this.$rowLengthCache[firstRow] = null;
        this.$rowLengthCache[lastRow] = null;
      };
      this.$updateWrapData = function(firstRow, lastRow) {
        var lines = this.doc.getAllLines(),
          tabSize = this.getTabSize(),
          wrapData = this.$wrapData,
          wrapLimit = this.$wrapLimit,
          tokens,
          foldLine,
          row = firstRow;
        lastRow = _Mathmin5(lastRow, lines.length - 1);
        while (row <= lastRow) {
          foldLine = this.getFoldLine(row, foldLine);
          if (!foldLine) {
            tokens = this.$getDisplayTokens(lines[row]);
            wrapData[row] = this.$computeWrapSplits(tokens, wrapLimit, tabSize);
            row++;
          } else {
            tokens = [];
            foldLine.walk(
              function(placeholder, row, column, lastColumn) {
                var walkTokens;
                if (null != placeholder) {
                  walkTokens = this.$getDisplayTokens(
                    placeholder,
                    tokens.length
                  );
                  walkTokens[0] = PLACEHOLDER_START;
                  for (var i = 1; i < walkTokens.length; i++) {
                    walkTokens[i] = PLACEHOLDER_BODY;
                  }
                } else {
                  walkTokens = this.$getDisplayTokens(
                    lines[row].substring(lastColumn, column),
                    tokens.length
                  );
                }
                tokens = tokens.concat(walkTokens);
              }.bind(this),
              foldLine.end.row,
              lines[foldLine.end.row].length + 1
            );
            wrapData[foldLine.start.row] = this.$computeWrapSplits(
              tokens,
              wrapLimit,
              tabSize
            );
            row = foldLine.end.row + 1;
          }
        }
      };
      var CHAR = 1,
        CHAR_EXT = 2,
        PLACEHOLDER_START = 3,
        PLACEHOLDER_BODY = 4,
        PUNCTUATION = 9,
        SPACE = 10,
        TAB = 11,
        TAB_SPACE = 12;
      this.$computeWrapSplits = function(tokens, wrapLimit, tabSize) {
        if (0 == tokens.length) {
          return [];
        }
        var splits = [],
          displayLength = tokens.length,
          lastSplit = 0,
          lastDocSplit = 0,
          isCode = this.$wrapAsCode,
          indentedSoftWrap = this.$indentedSoftWrap,
          maxIndent =
            wrapLimit <= _Mathmax5(2 * tabSize, 8) || !1 === indentedSoftWrap
              ? 0
              : _Mathfloor(wrapLimit / 2);
        function getWrapIndent() {
          var indentation = 0;
          if (0 === maxIndent) return indentation;
          if (indentedSoftWrap) {
            for (var i = 0, token; i < tokens.length; i++) {
              token = tokens[i];
              if (token == SPACE) indentation += 1;
              else if (token == TAB) indentation += tabSize;
              else if (token == TAB_SPACE) continue;
              else break;
            }
          }
          if (isCode && !1 !== indentedSoftWrap) indentation += tabSize;
          return _Mathmin5(indentation, maxIndent);
        }
        function addSplit(screenPos) {
          for (
            var len = screenPos - lastSplit, i = lastSplit, ch;
            i < screenPos;
            i++
          ) {
            ch = tokens[i];
            if (12 === ch || 2 === ch) len -= 1;
          }
          if (!splits.length) {
            indent = getWrapIndent();
            splits.indent = indent;
          }
          lastDocSplit += len;
          splits.push(lastDocSplit);
          lastSplit = screenPos;
        }
        var indent = 0;
        while (displayLength - lastSplit > wrapLimit - indent) {
          var split = lastSplit + wrapLimit - indent;
          if (tokens[split - 1] >= SPACE && tokens[split] >= SPACE) {
            addSplit(split);
            continue;
          }
          if (
            tokens[split] == PLACEHOLDER_START ||
            tokens[split] == PLACEHOLDER_BODY
          ) {
            for (split; split != lastSplit - 1; split--) {
              if (tokens[split] == PLACEHOLDER_START) {
                break;
              }
            }
            if (split > lastSplit) {
              addSplit(split);
              continue;
            }
            split = lastSplit + wrapLimit;
            for (split; split < tokens.length; split++) {
              if (tokens[split] != PLACEHOLDER_BODY) {
                break;
              }
            }
            if (split == tokens.length) {
              break;
            }
            addSplit(split);
            continue;
          }
          var minSplit = _Mathmax5(
            split - (wrapLimit - (wrapLimit >> 2)),
            lastSplit - 1
          );
          while (split > minSplit && tokens[split] < PLACEHOLDER_START) {
            split--;
          }
          if (isCode) {
            while (split > minSplit && tokens[split] < PLACEHOLDER_START) {
              split--;
            }
            while (split > minSplit && tokens[split] == PUNCTUATION) {
              split--;
            }
          } else {
            while (split > minSplit && tokens[split] < SPACE) {
              split--;
            }
          }
          if (split > minSplit) {
            addSplit(++split);
            continue;
          }
          split = lastSplit + wrapLimit;
          if (tokens[split] == CHAR_EXT) split--;
          addSplit(split - indent);
        }
        return splits;
      };
      this.$getDisplayTokens = function(str, offset) {
        var arr = [],
          tabSize;
        offset = offset || 0;
        for (var i = 0, c; i < str.length; i++) {
          c = str.charCodeAt(i);
          if (9 == c) {
            tabSize = this.getScreenTabSize(arr.length + offset);
            arr.push(TAB);
            for (var n = 1; n < tabSize; n++) {
              arr.push(TAB_SPACE);
            }
          } else if (32 == c) {
            arr.push(SPACE);
          } else if ((39 < c && 48 > c) || (57 < c && 64 > c)) {
            arr.push(PUNCTUATION);
          } else if (4352 <= c && isFullWidth(c)) {
            arr.push(CHAR, CHAR_EXT);
          } else {
            arr.push(CHAR);
          }
        }
        return arr;
      };
      this.$getStringScreenWidth = function(
        str,
        maxScreenColumn,
        screenColumn
      ) {
        if (0 == maxScreenColumn) return [0, 0];
        if (null == maxScreenColumn) maxScreenColumn = 1 / 0;
        screenColumn = screenColumn || 0;
        var c, column;
        for (column = 0; column < str.length; column++) {
          c = str.charCodeAt(column);
          if (9 == c) {
            screenColumn += this.getScreenTabSize(screenColumn);
          } else if (4352 <= c && isFullWidth(c)) {
            screenColumn += 2;
          } else {
            screenColumn += 1;
          }
          if (screenColumn > maxScreenColumn) {
            break;
          }
        }
        return [screenColumn, column];
      };
      this.lineWidgets = null;
      this.getRowLength = function(row) {
        if (this.lineWidgets)
          var h =
            (this.lineWidgets[row] && this.lineWidgets[row].rowCount) || 0;
        else h = 0;
        if (!this.$useWrapMode || !this.$wrapData[row]) {
          return 1 + h;
        } else {
          return this.$wrapData[row].length + 1 + h;
        }
      };
      this.getRowLineCount = function(row) {
        if (!this.$useWrapMode || !this.$wrapData[row]) {
          return 1;
        } else {
          return this.$wrapData[row].length + 1;
        }
      };
      this.getRowWrapIndent = function(screenRow) {
        if (this.$useWrapMode) {
          var pos = this.screenToDocumentPosition(screenRow, Number.MAX_VALUE),
            splits = this.$wrapData[pos.row];
          return splits.length && splits[0] < pos.column ? splits.indent : 0;
        } else {
          return 0;
        }
      };
      this.getScreenLastRowColumn = function(screenRow) {
        var pos = this.screenToDocumentPosition(screenRow, Number.MAX_VALUE);
        return this.documentToScreenColumn(pos.row, pos.column);
      };
      this.getDocumentLastRowColumn = function(docRow, docColumn) {
        var screenRow = this.documentToScreenRow(docRow, docColumn);
        return this.getScreenLastRowColumn(screenRow);
      };
      this.getDocumentLastRowColumnPosition = function(docRow, docColumn) {
        var screenRow = this.documentToScreenRow(docRow, docColumn);
        return this.screenToDocumentPosition(screenRow, _NumberMAX_VALUE / 10);
      };
      this.getRowSplitData = function(row) {
        if (!this.$useWrapMode) {
          return;
        } else {
          return this.$wrapData[row];
        }
      };
      this.getScreenTabSize = function(screenColumn) {
        return this.$tabSize - (screenColumn % this.$tabSize);
      };
      this.screenToDocumentRow = function(screenRow, screenColumn) {
        return this.screenToDocumentPosition(screenRow, screenColumn).row;
      };
      this.screenToDocumentColumn = function(screenRow, screenColumn) {
        return this.screenToDocumentPosition(screenRow, screenColumn).column;
      };
      this.screenToDocumentPosition = function(
        screenRow,
        screenColumn,
        offsetX
      ) {
        if (0 > screenRow) return { row: 0, column: 0 };
        var line,
          docRow = 0,
          docColumn = 0,
          column,
          row = 0,
          rowLength = 0,
          rowCache = this.$screenRowCache,
          i = this.$getRowCacheIndex(rowCache, screenRow),
          l = rowCache.length;
        if (l && 0 <= i) {
          var row = rowCache[i],
            docRow = this.$docRowCache[i],
            doCache = screenRow > rowCache[l - 1];
        } else {
          var doCache = !l;
        }
        var maxRow = this.getLength() - 1,
          foldLine = this.getNextFoldLine(docRow),
          foldStart = foldLine ? foldLine.start.row : 1 / 0;
        while (row <= screenRow) {
          rowLength = this.getRowLength(docRow);
          if (row + rowLength > screenRow || docRow >= maxRow) {
            break;
          } else {
            row += rowLength;
            docRow++;
            if (docRow > foldStart) {
              docRow = foldLine.end.row + 1;
              foldLine = this.getNextFoldLine(docRow, foldLine);
              foldStart = foldLine ? foldLine.start.row : 1 / 0;
            }
          }
          if (doCache) {
            this.$docRowCache.push(docRow);
            this.$screenRowCache.push(row);
          }
        }
        if (foldLine && foldLine.start.row <= docRow) {
          line = this.getFoldDisplayLine(foldLine);
          docRow = foldLine.start.row;
        } else if (row + rowLength <= screenRow || docRow > maxRow) {
          return { row: maxRow, column: this.getLine(maxRow).length };
        } else {
          line = this.getLine(docRow);
          foldLine = null;
        }
        var wrapIndent = 0,
          splitIndex = _Mathfloor(screenRow - row);
        if (this.$useWrapMode) {
          var splits = this.$wrapData[docRow];
          if (splits) {
            column = splits[splitIndex];
            if (0 < splitIndex && splits.length) {
              wrapIndent = splits.indent;
              docColumn = splits[splitIndex - 1] || splits[splits.length - 1];
              line = line.substring(docColumn);
            }
          }
        }
        if (
          offsetX !== void 0 &&
          this.$bidiHandler.isBidiRow(row + splitIndex, docRow, splitIndex)
        )
          screenColumn = this.$bidiHandler.offsetToCol(offsetX);
        docColumn += this.$getStringScreenWidth(
          line,
          screenColumn - wrapIndent
        )[1];
        if (this.$useWrapMode && docColumn >= column) docColumn = column - 1;
        if (foldLine) return foldLine.idxToPosition(docColumn);
        return { row: docRow, column: docColumn };
      };
      this.documentToScreenPosition = function(docRow, docColumn) {
        if ("undefined" === typeof docColumn)
          var pos = this.$clipPositionToDocument(docRow.row, docRow.column);
        else pos = this.$clipPositionToDocument(docRow, docColumn);
        docRow = pos.row;
        docColumn = pos.column;
        var screenRow = 0,
          foldStartRow = null,
          fold = null;
        fold = this.getFoldAt(docRow, docColumn, 1);
        if (fold) {
          docRow = fold.start.row;
          docColumn = fold.start.column;
        }
        var rowEnd,
          row = 0,
          rowCache = this.$docRowCache,
          i = this.$getRowCacheIndex(rowCache, docRow),
          l = rowCache.length;
        if (l && 0 <= i) {
          var row = rowCache[i],
            screenRow = this.$screenRowCache[i],
            doCache = docRow > rowCache[l - 1];
        } else {
          var doCache = !l;
        }
        var foldLine = this.getNextFoldLine(row),
          foldStart = foldLine ? foldLine.start.row : 1 / 0;
        while (row < docRow) {
          if (row >= foldStart) {
            rowEnd = foldLine.end.row + 1;
            if (rowEnd > docRow) break;
            foldLine = this.getNextFoldLine(rowEnd, foldLine);
            foldStart = foldLine ? foldLine.start.row : 1 / 0;
          } else {
            rowEnd = row + 1;
          }
          screenRow += this.getRowLength(row);
          row = rowEnd;
          if (doCache) {
            this.$docRowCache.push(row);
            this.$screenRowCache.push(screenRow);
          }
        }
        var textLine = "";
        if (foldLine && row >= foldStart) {
          textLine = this.getFoldDisplayLine(foldLine, docRow, docColumn);
          foldStartRow = foldLine.start.row;
        } else {
          textLine = this.getLine(docRow).substring(0, docColumn);
          foldStartRow = docRow;
        }
        var wrapIndent = 0;
        if (this.$useWrapMode) {
          var wrapRow = this.$wrapData[foldStartRow];
          if (wrapRow) {
            var screenRowOffset = 0;
            while (textLine.length >= wrapRow[screenRowOffset]) {
              screenRow++;
              screenRowOffset++;
            }
            textLine = textLine.substring(
              wrapRow[screenRowOffset - 1] || 0,
              textLine.length
            );
            wrapIndent = 0 < screenRowOffset ? wrapRow.indent : 0;
          }
        }
        return {
          row: screenRow,
          column: wrapIndent + this.$getStringScreenWidth(textLine)[0]
        };
      };
      this.documentToScreenColumn = function(row, docColumn) {
        return this.documentToScreenPosition(row, docColumn).column;
      };
      this.documentToScreenRow = function(docRow, docColumn) {
        return this.documentToScreenPosition(docRow, docColumn).row;
      };
      this.getScreenLength = function() {
        var screenRows = 0,
          fold = null;
        if (!this.$useWrapMode) {
          screenRows = this.getLength();
          for (var foldData = this.$foldData, i = 0; i < foldData.length; i++) {
            fold = foldData[i];
            screenRows -= fold.end.row - fold.start.row;
          }
        } else {
          var lastRow = this.$wrapData.length,
            row = 0,
            i = 0,
            fold = this.$foldData[i++],
            foldStart = fold ? fold.start.row : 1 / 0;
          while (row < lastRow) {
            var splits = this.$wrapData[row];
            screenRows += splits ? splits.length + 1 : 1;
            row++;
            if (row > foldStart) {
              row = fold.end.row + 1;
              fold = this.$foldData[i++];
              foldStart = fold ? fold.start.row : 1 / 0;
            }
          }
        }
        if (this.lineWidgets) screenRows += this.$getWidgetScreenLength();
        return screenRows;
      };
      this.$setFontMetrics = function(fm) {
        if (!this.$enableVarChar) return;
        this.$getStringScreenWidth = function(
          str,
          maxScreenColumn,
          screenColumn
        ) {
          if (0 === maxScreenColumn) return [0, 0];
          if (!maxScreenColumn) maxScreenColumn = 1 / 0;
          screenColumn = screenColumn || 0;
          var c, column;
          for (column = 0; column < str.length; column++) {
            c = str.charAt(column);
            if ("\t" === c) {
              screenColumn += this.getScreenTabSize(screenColumn);
            } else {
              screenColumn += fm.getCharacterWidth(c);
            }
            if (screenColumn > maxScreenColumn) {
              break;
            }
          }
          return [screenColumn, column];
        };
      };
      this.destroy = function() {
        if (this.bgTokenizer) {
          this.bgTokenizer.setDocument(null);
          this.bgTokenizer = null;
        }
        this.$stopWorker();
      };
      this.isFullWidth = isFullWidth;
      function isFullWidth(c) {
        if (4352 > c) return !1;
        return (
          (4352 <= c && 4447 >= c) ||
          (4515 <= c && 4519 >= c) ||
          (4602 <= c && 4607 >= c) ||
          (9001 <= c && 9002 >= c) ||
          (11904 <= c && 11929 >= c) ||
          (11931 <= c && 12019 >= c) ||
          (12032 <= c && 12245 >= c) ||
          (12272 <= c && 12283 >= c) ||
          (12288 <= c && 12350 >= c) ||
          (12353 <= c && 12438 >= c) ||
          (12441 <= c && 12543 >= c) ||
          (12549 <= c && 12589 >= c) ||
          (12593 <= c && 12686 >= c) ||
          (12688 <= c && 12730 >= c) ||
          (12736 <= c && 12771 >= c) ||
          (12784 <= c && 12830 >= c) ||
          (12832 <= c && 12871 >= c) ||
          (12880 <= c && 13054 >= c) ||
          (13056 <= c && 19903 >= c) ||
          (19968 <= c && 42124 >= c) ||
          (42128 <= c && 42182 >= c) ||
          (43360 <= c && 43388 >= c) ||
          (44032 <= c && 55203 >= c) ||
          (55216 <= c && 55238 >= c) ||
          (55243 <= c && 55291 >= c) ||
          (63744 <= c && 64255 >= c) ||
          (65040 <= c && 65049 >= c) ||
          (65072 <= c && 65106 >= c) ||
          (65108 <= c && 65126 >= c) ||
          (65128 <= c && 65131 >= c) ||
          (65281 <= c && 65376 >= c) ||
          (65504 <= c && 65510 >= c)
        );
      }
    }.call(EditSession.prototype));
    require("./edit_session/folding").Folding.call(EditSession.prototype);
    require("./edit_session/bracket_match").BracketMatch.call(
      EditSession.prototype
    );
    config.defineOptions(EditSession.prototype, "session", {
      wrap: {
        set: function set(value) {
          if (!value || "off" == value) value = !1;
          else if ("free" == value) value = !0;
          else if ("printMargin" == value) value = -1;
          else if ("string" == typeof value) value = parseInt(value, 10) || !1;
          if (this.$wrap == value) return;
          this.$wrap = value;
          if (!value) {
            this.setUseWrapMode(!1);
          } else {
            var col = "number" == typeof value ? value : null;
            this.setWrapLimitRange(col, col);
            this.setUseWrapMode(!0);
          }
        },
        get: function get() {
          if (this.getUseWrapMode()) {
            if (-1 == this.$wrap) return "printMargin";
            if (!this.getWrapLimitRange().min) return "free";
            return this.$wrap;
          }
          return "off";
        },
        handlesSet: !0
      },
      wrapMethod: {
        set: function set(val) {
          val = "auto" == val ? "text" != this.$mode.type : "text" != val;
          if (val != this.$wrapAsCode) {
            this.$wrapAsCode = val;
            if (this.$useWrapMode) {
              this.$useWrapMode = !1;
              this.setUseWrapMode(!0);
            }
          }
        },
        initialValue: "auto"
      },
      indentedSoftWrap: {
        set: function set() {
          if (this.$useWrapMode) {
            this.$useWrapMode = !1;
            this.setUseWrapMode(!0);
          }
        },
        initialValue: !0
      },
      firstLineNumber: {
        set: function set() {
          this._signal("changeBreakpoint");
        },
        initialValue: 1
      },
      useWorker: {
        set: function set(useWorker) {
          this.$useWorker = useWorker;
          this.$stopWorker();
          if (useWorker) this.$startWorker();
        },
        initialValue: !0
      },
      useSoftTabs: { initialValue: !0 },
      tabSize: {
        set: function set(tabSize) {
          if (isNaN(tabSize) || this.$tabSize === tabSize) return;
          this.$modified = !0;
          this.$rowLengthCache = [];
          this.$tabSize = tabSize;
          this._signal("changeTabSize");
        },
        initialValue: 4,
        handlesSet: !0
      },
      navigateWithinSoftTabs: { initialValue: !1 },
      foldStyle: {
        set: function set(val) {
          this.setFoldStyle(val);
        },
        handlesSet: !0
      },
      overwrite: {
        set: function set(val) {
          this._signal("changeOverwrite");
        },
        initialValue: !1
      },
      newLineMode: {
        set: function set(val) {
          this.doc.setNewLineMode(val);
        },
        get: function get() {
          return this.doc.getNewLineMode();
        },
        handlesSet: !0
      },
      mode: {
        set: function set(val) {
          this.setMode(val);
        },
        get: function get() {
          return this.$modeId;
        },
        handlesSet: !0
      }
    });
    exports.EditSession = EditSession;
  }
);
ace.define(
  "ace/search",
  ["require", "exports", "module", "ace/lib/lang", "ace/lib/oop", "ace/range"],
  function(require, exports, module) {
    "use strict";
    var lang = require("./lib/lang"),
      oop = require("./lib/oop"),
      Range = require("./range").Range,
      Search = function Search() {
        this.$options = {};
      };
    (function() {
      this.set = function(options) {
        oop.mixin(this.$options, options);
        return this;
      };
      this.getOptions = function() {
        return lang.copyObject(this.$options);
      };
      this.setOptions = function(options) {
        this.$options = options;
      };
      this.find = function(session) {
        var options = this.$options,
          iterator = this.$matchIterator(session, options);
        if (!iterator) return !1;
        var firstRange = null;
        iterator.forEach(function(sr, sc, er, ec) {
          firstRange = new Range(sr, sc, er, ec);
          if (
            sc == ec &&
            options.start &&
            options.start.start &&
            !1 != options.skipCurrent &&
            firstRange.isEqual(options.start)
          ) {
            firstRange = null;
            return !1;
          }
          return !0;
        });
        return firstRange;
      };
      this.findAll = function(session) {
        var options = this.$options;
        if (!options.needle) return [];
        this.$assembleRegExp(options);
        var range = options.range,
          lines = range
            ? session.getLines(range.start.row, range.end.row)
            : session.doc.getAllLines(),
          ranges = [],
          re = options.re;
        if (options.$isMultiLine) {
          var len = re.length,
            maxRow = lines.length - len,
            prevRange;
          outer: for (var row = re.offset || 0; row <= maxRow; row++) {
            for (var j = 0; j < len; j++) {
              if (-1 == lines[row + j].search(re[j])) continue outer;
            }
            var startLine = lines[row],
              line = lines[row + len - 1],
              startIndex = startLine.length - startLine.match(re[0])[0].length,
              endIndex = line.match(re[len - 1])[0].length;
            if (
              prevRange &&
              prevRange.end.row === row &&
              prevRange.end.column > startIndex
            ) {
              continue;
            }
            ranges.push(
              (prevRange = new Range(row, startIndex, row + len - 1, endIndex))
            );
            if (2 < len) row = row + len - 2;
          }
        } else {
          for (var i = 0, matches; i < lines.length; i++) {
            matches = lang.getMatchOffsets(lines[i], re);
            for (var j = 0, match; j < matches.length; j++) {
              match = matches[j];
              ranges.push(
                new Range(i, match.offset, i, match.offset + match.length)
              );
            }
          }
        }
        if (range) {
          var startColumn = range.start.column,
            endColumn = range.start.column,
            i = 0,
            j = ranges.length - 1;
          while (
            i < j &&
            ranges[i].start.column < startColumn &&
            ranges[i].start.row == range.start.row
          ) {
            i++;
          }
          while (
            i < j &&
            ranges[j].end.column > endColumn &&
            ranges[j].end.row == range.end.row
          ) {
            j--;
          }
          ranges = ranges.slice(i, j + 1);
          for (i = 0, j = ranges.length; i < j; i++) {
            ranges[i].start.row += range.start.row;
            ranges[i].end.row += range.start.row;
          }
        }
        return ranges;
      };
      this.replace = function(input, replacement) {
        var options = this.$options,
          re = this.$assembleRegExp(options);
        if (options.$isMultiLine) return replacement;
        if (!re) return;
        var match = re.exec(input);
        if (!match || match[0].length != input.length) return null;
        replacement = input.replace(re, replacement);
        if (options.preserveCase) {
          replacement = replacement.split("");
          for (var i = Math.min(input.length, input.length), ch; i--; ) {
            ch = input[i];
            if (ch && ch.toLowerCase() != ch)
              replacement[i] = replacement[i].toUpperCase();
            else replacement[i] = replacement[i].toLowerCase();
          }
          replacement = replacement.join("");
        }
        return replacement;
      };
      this.$assembleRegExp = function(options, $disableFakeMultiline) {
        if (babelHelpers.instanceof(options.needle, RegExp))
          return (options.re = options.needle);
        var needle = options.needle;
        if (!options.needle) return (options.re = !1);
        if (!options.regExp) needle = lang.escapeRegExp(needle);
        if (options.wholeWord) needle = addWordBoundary(needle, options);
        var modifier = options.caseSensitive ? "gm" : "gmi";
        options.$isMultiLine = !$disableFakeMultiline && /[\n\r]/.test(needle);
        if (options.$isMultiLine)
          return (options.re = this.$assembleMultilineRegExp(needle, modifier));
        try {
          var re = new RegExp(needle, modifier);
        } catch (e) {
          re = !1;
        }
        return (options.re = re);
      };
      this.$assembleMultilineRegExp = function(needle, modifier) {
        for (
          var parts = needle.replace(/\r\n|\r|\n/g, "$\n^").split("\n"),
            re = [],
            i = 0;
          i < parts.length;
          i++
        ) {
          try {
            re.push(new RegExp(parts[i], modifier));
          } catch (e) {
            return !1;
          }
        }
        return re;
      };
      this.$matchIterator = function(session, options) {
        var re = this.$assembleRegExp(options);
        if (!re) return !1;
        var backwards = !0 == options.backwards,
          skipCurrent = !1 != options.skipCurrent,
          range = options.range,
          start = options.start;
        if (!start)
          start = range
            ? range[backwards ? "end" : "start"]
            : session.selection.getRange();
        if (start.start)
          start = start[skipCurrent != backwards ? "end" : "start"];
        var firstRow = range ? range.start.row : 0,
          lastRow = range ? range.end.row : session.getLength() - 1;
        if (backwards) {
          var forEach = function forEach(callback) {
            var row = start.row;
            if (forEachInLine(row, start.column, callback)) return;
            for (row--; row >= firstRow; row--) {
              if (forEachInLine(row, Number.MAX_VALUE, callback)) return;
            }
            if (!1 == options.wrap) return;
            for (row = lastRow, firstRow = start.row; row >= firstRow; row--) {
              if (forEachInLine(row, Number.MAX_VALUE, callback)) return;
            }
          };
        } else {
          var forEach = function forEach(callback) {
            var row = start.row;
            if (forEachInLine(row, start.column, callback)) return;
            for (row = row + 1; row <= lastRow; row++) {
              if (forEachInLine(row, 0, callback)) return;
            }
            if (!1 == options.wrap) return;
            for (row = firstRow, lastRow = start.row; row <= lastRow; row++) {
              if (forEachInLine(row, 0, callback)) return;
            }
          };
        }
        if (options.$isMultiLine) {
          var len = re.length,
            forEachInLine = function forEachInLine(row, offset, callback) {
              var startRow = backwards ? row - len + 1 : row;
              if (0 > startRow) return;
              var line = session.getLine(startRow),
                startIndex = line.search(re[0]);
              if ((!backwards && startIndex < offset) || -1 === startIndex)
                return;
              for (var i = 1; i < len; i++) {
                line = session.getLine(startRow + i);
                if (-1 == line.search(re[i])) return;
              }
              var endIndex = line.match(re[len - 1])[0].length;
              if (backwards && endIndex > offset) return;
              if (callback(startRow, startIndex, startRow + len - 1, endIndex))
                return !0;
            };
        } else if (backwards) {
          var forEachInLine = function forEachInLine(row, endIndex, callback) {
            var line = session.getLine(row),
              matches = [],
              m,
              last = 0;
            re.lastIndex = 0;
            while ((m = re.exec(line))) {
              var length = m[0].length;
              last = m.index;
              if (!length) {
                if (last >= line.length) break;
                re.lastIndex = last += 1;
              }
              if (m.index + length > endIndex) break;
              matches.push(m.index, length);
            }
            for (var i = matches.length - 1; 0 <= i; i -= 2) {
              var column = matches[i - 1],
                length = matches[i];
              if (callback(row, column, row, column + length)) return !0;
            }
          };
        } else {
          var forEachInLine = function forEachInLine(
            row,
            startIndex,
            callback
          ) {
            var line = session.getLine(row),
              last,
              m;
            re.lastIndex = startIndex;
            while ((m = re.exec(line))) {
              var length = m[0].length;
              last = m.index;
              if (callback(row, last, row, last + length)) return !0;
              if (!length) {
                re.lastIndex = last += 1;
                if (last >= line.length) return !1;
              }
            }
          };
        }
        return { forEach: forEach };
      };
    }.call(Search.prototype));
    function addWordBoundary(needle, options) {
      function wordBoundary(c) {
        if (/\w/.test(c) || options.regExp) return "\\b";
        return "";
      }
      return (
        wordBoundary(needle[0]) +
        needle +
        wordBoundary(needle[needle.length - 1])
      );
    }
    exports.Search = Search;
  }
);
ace.define(
  "ace/keyboard/hash_handler",
  ["require", "exports", "module", "ace/lib/keys", "ace/lib/useragent"],
  function(require, exports, module) {
    "use strict";
    var keyUtil = require("../lib/keys"),
      useragent = require("../lib/useragent"),
      KEY_MODS = keyUtil.KEY_MODS;
    function HashHandler(config, platform) {
      this.platform = platform || (useragent.isMac ? "mac" : "win");
      this.commands = {};
      this.commandKeyBinding = {};
      this.addCommands(config);
      this.$singleCommand = !0;
    }
    function MultiHashHandler(config, platform) {
      HashHandler.call(this, config, platform);
      this.$singleCommand = !1;
    }
    MultiHashHandler.prototype = HashHandler.prototype;
    (function() {
      this.addCommand = function(command) {
        if (this.commands[command.name]) this.removeCommand(command);
        this.commands[command.name] = command;
        if (command.bindKey) this._buildKeyHash(command);
      };
      this.removeCommand = function(command, keepCommand) {
        var name =
          command && ("string" === typeof command ? command : command.name);
        command = this.commands[name];
        if (!keepCommand) delete this.commands[name];
        var ckb = this.commandKeyBinding;
        for (var keyId in ckb) {
          var cmdGroup = ckb[keyId];
          if (cmdGroup == command) {
            delete ckb[keyId];
          } else if (Array.isArray(cmdGroup)) {
            var i = cmdGroup.indexOf(command);
            if (-1 != i) {
              cmdGroup.splice(i, 1);
              if (1 == cmdGroup.length) ckb[keyId] = cmdGroup[0];
            }
          }
        }
      };
      this.bindKey = function(key, command, position) {
        if ("object" == babelHelpers.typeof(key) && key) {
          if (position == void 0) position = key.position;
          key = key[this.platform];
        }
        if (!key) return;
        if ("function" == typeof command)
          return this.addCommand({
            exec: command,
            bindKey: key,
            name: command.name || key
          });
        key.split("|").forEach(function(keyPart) {
          var chain = "";
          if (-1 != keyPart.indexOf(" ")) {
            var parts = keyPart.split(/\s+/);
            keyPart = parts.pop();
            parts.forEach(function(keyPart) {
              var binding = this.parseKeys(keyPart),
                id = KEY_MODS[binding.hashId] + binding.key;
              chain += (chain ? " " : "") + id;
              this._addCommandToBinding(chain, "chainKeys");
            }, this);
            chain += " ";
          }
          var binding = this.parseKeys(keyPart),
            id = KEY_MODS[binding.hashId] + binding.key;
          this._addCommandToBinding(chain + id, command, position);
        }, this);
      };
      function getPosition(command) {
        return (
          ("object" == babelHelpers.typeof(command) &&
            command.bindKey &&
            command.bindKey.position) ||
          (command.isDefault ? -100 : 0)
        );
      }
      this._addCommandToBinding = function(keyId, command, position) {
        var ckb = this.commandKeyBinding,
          i;
        if (!command) {
          delete ckb[keyId];
        } else if (!ckb[keyId] || this.$singleCommand) {
          ckb[keyId] = command;
        } else {
          if (!Array.isArray(ckb[keyId])) {
            ckb[keyId] = [ckb[keyId]];
          } else if (-1 != (i = ckb[keyId].indexOf(command))) {
            ckb[keyId].splice(i, 1);
          }
          if ("number" != typeof position) {
            position = getPosition(command);
          }
          var commands = ckb[keyId];
          for (i = 0; i < commands.length; i++) {
            var other = commands[i],
              otherPos = getPosition(other);
            if (otherPos > position) break;
          }
          commands.splice(i, 0, command);
        }
      };
      this.addCommands = function(commands) {
        commands &&
          Object.keys(commands).forEach(function(name) {
            var command = commands[name];
            if (!command) return;
            if ("string" === typeof command) return this.bindKey(command, name);
            if ("function" === typeof command) command = { exec: command };
            if ("object" !== babelHelpers.typeof(command)) return;
            if (!command.name) command.name = name;
            this.addCommand(command);
          }, this);
      };
      this.removeCommands = function(commands) {
        Object.keys(commands).forEach(function(name) {
          this.removeCommand(commands[name]);
        }, this);
      };
      this.bindKeys = function(keyList) {
        Object.keys(keyList).forEach(function(key) {
          this.bindKey(key, keyList[key]);
        }, this);
      };
      this._buildKeyHash = function(command) {
        this.bindKey(command.bindKey, command);
      };
      this.parseKeys = function(keys) {
        var parts = keys
            .toLowerCase()
            .split(/[\-\+]([\-\+])?/)
            .filter(function(x) {
              return x;
            }),
          key = parts.pop(),
          keyCode = keyUtil[key];
        if (keyUtil.FUNCTION_KEYS[keyCode])
          key = keyUtil.FUNCTION_KEYS[keyCode].toLowerCase();
        else if (!parts.length) return { key: key, hashId: -1 };
        else if (1 == parts.length && "shift" == parts[0])
          return { key: key.toUpperCase(), hashId: -1 };
        for (var hashId = 0, i = parts.length, modifier; i--; ) {
          modifier = keyUtil.KEY_MODS[parts[i]];
          if (null == modifier) {
            if ("undefined" != typeof console)
              console.error("invalid modifier " + parts[i] + " in " + keys);
            return !1;
          }
          hashId |= modifier;
        }
        return { key: key, hashId: hashId };
      };
      this.findKeyCommand = function findKeyCommand(hashId, keyString) {
        var key = KEY_MODS[hashId] + keyString;
        return this.commandKeyBinding[key];
      };
      this.handleKeyboard = function(data, hashId, keyString, keyCode) {
        if (0 > keyCode) return;
        var key = KEY_MODS[hashId] + keyString,
          command = this.commandKeyBinding[key];
        if (data.$keyChain) {
          data.$keyChain += " " + key;
          command = this.commandKeyBinding[data.$keyChain] || command;
        }
        if (command) {
          if (
            "chainKeys" == command ||
            "chainKeys" == command[command.length - 1]
          ) {
            data.$keyChain = data.$keyChain || key;
            return { command: "null" };
          }
        }
        if (data.$keyChain) {
          if ((!hashId || 4 == hashId) && 1 == keyString.length)
            data.$keyChain = data.$keyChain.slice(0, -key.length - 1);
          else if (-1 == hashId || 0 < keyCode) data.$keyChain = "";
        }
        return { command: command };
      };
      this.getStatusText = function(editor, data) {
        return data.$keyChain || "";
      };
    }.call(HashHandler.prototype));
    exports.HashHandler = HashHandler;
    exports.MultiHashHandler = MultiHashHandler;
  }
);
ace.define(
  "ace/commands/command_manager",
  [
    "require",
    "exports",
    "module",
    "ace/lib/oop",
    "ace/keyboard/hash_handler",
    "ace/lib/event_emitter"
  ],
  function(require, exports, module) {
    "use strict";
    var oop = require("../lib/oop"),
      MultiHashHandler = require("../keyboard/hash_handler").MultiHashHandler,
      EventEmitter = require("../lib/event_emitter").EventEmitter,
      CommandManager = function CommandManager(platform, commands) {
        MultiHashHandler.call(this, commands, platform);
        this.byName = this.commands;
        this.setDefaultHandler("exec", function(e) {
          return e.command.exec(e.editor, e.args || {});
        });
      };
    oop.inherits(CommandManager, MultiHashHandler);
    (function() {
      oop.implement(this, EventEmitter);
      this.exec = function(command, editor, args) {
        if (Array.isArray(command)) {
          for (var i = command.length; i--; ) {
            if (this.exec(command[i], editor, args)) return !0;
          }
          return !1;
        }
        if ("string" === typeof command) command = this.commands[command];
        if (!command) return !1;
        if (editor && editor.$readOnly && !command.readOnly) return !1;
        if (
          !1 != this.$checkCommandState &&
          command.isAvailable &&
          !command.isAvailable(editor)
        )
          return !1;
        var e = { editor: editor, command: command, args: args };
        e.returnValue = this._emit("exec", e);
        this._signal("afterExec", e);
        return !1 === e.returnValue ? !1 : !0;
      };
      this.toggleRecording = function(editor) {
        if (this.$inReplay) return;
        editor && editor._emit("changeStatus");
        if (this.recording) {
          this.macro.pop();
          this.removeEventListener("exec", this.$addCommandToMacro);
          if (!this.macro.length) this.macro = this.oldMacro;
          return (this.recording = !1);
        }
        if (!this.$addCommandToMacro) {
          this.$addCommandToMacro = function(e) {
            this.macro.push([e.command, e.args]);
          }.bind(this);
        }
        this.oldMacro = this.macro;
        this.macro = [];
        this.on("exec", this.$addCommandToMacro);
        return (this.recording = !0);
      };
      this.replay = function(editor) {
        if (this.$inReplay || !this.macro) return;
        if (this.recording) return this.toggleRecording(editor);
        try {
          this.$inReplay = !0;
          this.macro.forEach(function(x) {
            if ("string" == typeof x) this.exec(x, editor);
            else this.exec(x[0], editor, x[1]);
          }, this);
        } finally {
          this.$inReplay = !1;
        }
      };
      this.trimMacro = function(m) {
        return m.map(function(x) {
          if ("string" != typeof x[0]) x[0] = x[0].name;
          if (!x[1]) x = x[0];
          return x;
        });
      };
    }.call(CommandManager.prototype));
    exports.CommandManager = CommandManager;
  }
);
ace.define(
  "ace/commands/default_commands",
  ["require", "exports", "module", "ace/lib/lang", "ace/config", "ace/range"],
  function(require, exports, module) {
    "use strict";
    var lang = require("../lib/lang"),
      config = require("../config"),
      Range = require("../range").Range;
    function bindKey(win, mac) {
      return { win: win, mac: mac };
    }
    exports.commands = [
      {
        name: "showSettingsMenu",
        bindKey: bindKey("Ctrl-,", "Command-,"),
        exec: function exec(editor) {
          config.loadModule("ace/ext/settings_menu", function(module) {
            module.init(editor);
            editor.showSettingsMenu();
          });
        },
        readOnly: !0
      },
      {
        name: "goToNextError",
        bindKey: bindKey("Alt-E", "F4"),
        exec: function exec(editor) {
          config.loadModule("./ext/error_marker", function(module) {
            module.showErrorMarker(editor, 1);
          });
        },
        scrollIntoView: "animate",
        readOnly: !0
      },
      {
        name: "goToPreviousError",
        bindKey: bindKey("Alt-Shift-E", "Shift-F4"),
        exec: function exec(editor) {
          config.loadModule("./ext/error_marker", function(module) {
            module.showErrorMarker(editor, -1);
          });
        },
        scrollIntoView: "animate",
        readOnly: !0
      },
      {
        name: "selectall",
        bindKey: bindKey("Ctrl-A", "Command-A"),
        exec: function exec(editor) {
          editor.selectAll();
        },
        readOnly: !0
      },
      {
        name: "centerselection",
        bindKey: bindKey(null, "Ctrl-L"),
        exec: function exec(editor) {
          editor.centerSelection();
        },
        readOnly: !0
      },
      {
        name: "gotoline",
        bindKey: bindKey("Ctrl-L", "Command-L"),
        exec: function exec(editor, line) {
          if ("number" !== typeof line)
            line = parseInt(prompt("Enter line number:"), 10);
          if (!isNaN(line)) {
            editor.gotoLine(line);
          }
        },
        readOnly: !0
      },
      {
        name: "fold",
        bindKey: bindKey("Alt-L|Ctrl-F1", "Command-Alt-L|Command-F1"),
        exec: function exec(editor) {
          editor.session.toggleFold(!1);
        },
        multiSelectAction: "forEach",
        scrollIntoView: "center",
        readOnly: !0
      },
      {
        name: "unfold",
        bindKey: bindKey(
          "Alt-Shift-L|Ctrl-Shift-F1",
          "Command-Alt-Shift-L|Command-Shift-F1"
        ),
        exec: function exec(editor) {
          editor.session.toggleFold(!0);
        },
        multiSelectAction: "forEach",
        scrollIntoView: "center",
        readOnly: !0
      },
      {
        name: "toggleFoldWidget",
        bindKey: bindKey("F2", "F2"),
        exec: function exec(editor) {
          editor.session.toggleFoldWidget();
        },
        multiSelectAction: "forEach",
        scrollIntoView: "center",
        readOnly: !0
      },
      {
        name: "toggleParentFoldWidget",
        bindKey: bindKey("Alt-F2", "Alt-F2"),
        exec: function exec(editor) {
          editor.session.toggleFoldWidget(!0);
        },
        multiSelectAction: "forEach",
        scrollIntoView: "center",
        readOnly: !0
      },
      {
        name: "foldall",
        bindKey: bindKey(null, "Ctrl-Command-Option-0"),
        exec: function exec(editor) {
          editor.session.foldAll();
        },
        scrollIntoView: "center",
        readOnly: !0
      },
      {
        name: "foldOther",
        bindKey: bindKey("Alt-0", "Command-Option-0"),
        exec: function exec(editor) {
          editor.session.foldAll();
          editor.session.unfold(editor.selection.getAllRanges());
        },
        scrollIntoView: "center",
        readOnly: !0
      },
      {
        name: "unfoldall",
        bindKey: bindKey("Alt-Shift-0", "Command-Option-Shift-0"),
        exec: function exec(editor) {
          editor.session.unfold();
        },
        scrollIntoView: "center",
        readOnly: !0
      },
      {
        name: "findnext",
        bindKey: bindKey("Ctrl-K", "Command-G"),
        exec: function exec(editor) {
          editor.findNext();
        },
        multiSelectAction: "forEach",
        scrollIntoView: "center",
        readOnly: !0
      },
      {
        name: "findprevious",
        bindKey: bindKey("Ctrl-Shift-K", "Command-Shift-G"),
        exec: function exec(editor) {
          editor.findPrevious();
        },
        multiSelectAction: "forEach",
        scrollIntoView: "center",
        readOnly: !0
      },
      {
        name: "selectOrFindNext",
        bindKey: bindKey("Alt-K", "Ctrl-G"),
        exec: function exec(editor) {
          if (editor.selection.isEmpty()) editor.selection.selectWord();
          else editor.findNext();
        },
        readOnly: !0
      },
      {
        name: "selectOrFindPrevious",
        bindKey: bindKey("Alt-Shift-K", "Ctrl-Shift-G"),
        exec: function exec(editor) {
          if (editor.selection.isEmpty()) editor.selection.selectWord();
          else editor.findPrevious();
        },
        readOnly: !0
      },
      {
        name: "find",
        bindKey: bindKey("Ctrl-F", "Command-F"),
        exec: function exec(editor) {
          config.loadModule("ace/ext/searchbox", function(e) {
            e.Search(editor);
          });
        },
        readOnly: !0
      },
      {
        name: "overwrite",
        bindKey: "Insert",
        exec: function exec(editor) {
          editor.toggleOverwrite();
        },
        readOnly: !0
      },
      {
        name: "selecttostart",
        bindKey: bindKey(
          "Ctrl-Shift-Home",
          "Command-Shift-Home|Command-Shift-Up"
        ),
        exec: function exec(editor) {
          editor.getSelection().selectFileStart();
        },
        multiSelectAction: "forEach",
        readOnly: !0,
        scrollIntoView: "animate",
        aceCommandGroup: "fileJump"
      },
      {
        name: "gotostart",
        bindKey: bindKey("Ctrl-Home", "Command-Home|Command-Up"),
        exec: function exec(editor) {
          editor.navigateFileStart();
        },
        multiSelectAction: "forEach",
        readOnly: !0,
        scrollIntoView: "animate",
        aceCommandGroup: "fileJump"
      },
      {
        name: "selectup",
        bindKey: bindKey("Shift-Up", "Shift-Up|Ctrl-Shift-P"),
        exec: function exec(editor) {
          editor.getSelection().selectUp();
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor",
        readOnly: !0
      },
      {
        name: "golineup",
        bindKey: bindKey("Up", "Up|Ctrl-P"),
        exec: function exec(editor, args) {
          editor.navigateUp(args.times);
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor",
        readOnly: !0
      },
      {
        name: "selecttoend",
        bindKey: bindKey(
          "Ctrl-Shift-End",
          "Command-Shift-End|Command-Shift-Down"
        ),
        exec: function exec(editor) {
          editor.getSelection().selectFileEnd();
        },
        multiSelectAction: "forEach",
        readOnly: !0,
        scrollIntoView: "animate",
        aceCommandGroup: "fileJump"
      },
      {
        name: "gotoend",
        bindKey: bindKey("Ctrl-End", "Command-End|Command-Down"),
        exec: function exec(editor) {
          editor.navigateFileEnd();
        },
        multiSelectAction: "forEach",
        readOnly: !0,
        scrollIntoView: "animate",
        aceCommandGroup: "fileJump"
      },
      {
        name: "selectdown",
        bindKey: bindKey("Shift-Down", "Shift-Down|Ctrl-Shift-N"),
        exec: function exec(editor) {
          editor.getSelection().selectDown();
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor",
        readOnly: !0
      },
      {
        name: "golinedown",
        bindKey: bindKey("Down", "Down|Ctrl-N"),
        exec: function exec(editor, args) {
          editor.navigateDown(args.times);
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor",
        readOnly: !0
      },
      {
        name: "selectwordleft",
        bindKey: bindKey("Ctrl-Shift-Left", "Option-Shift-Left"),
        exec: function exec(editor) {
          editor.getSelection().selectWordLeft();
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor",
        readOnly: !0
      },
      {
        name: "gotowordleft",
        bindKey: bindKey("Ctrl-Left", "Option-Left"),
        exec: function exec(editor) {
          editor.navigateWordLeft();
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor",
        readOnly: !0
      },
      {
        name: "selecttolinestart",
        bindKey: bindKey("Alt-Shift-Left", "Command-Shift-Left|Ctrl-Shift-A"),
        exec: function exec(editor) {
          editor.getSelection().selectLineStart();
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor",
        readOnly: !0
      },
      {
        name: "gotolinestart",
        bindKey: bindKey("Alt-Left|Home", "Command-Left|Home|Ctrl-A"),
        exec: function exec(editor) {
          editor.navigateLineStart();
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor",
        readOnly: !0
      },
      {
        name: "selectleft",
        bindKey: bindKey("Shift-Left", "Shift-Left|Ctrl-Shift-B"),
        exec: function exec(editor) {
          editor.getSelection().selectLeft();
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor",
        readOnly: !0
      },
      {
        name: "gotoleft",
        bindKey: bindKey("Left", "Left|Ctrl-B"),
        exec: function exec(editor, args) {
          editor.navigateLeft(args.times);
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor",
        readOnly: !0
      },
      {
        name: "selectwordright",
        bindKey: bindKey("Ctrl-Shift-Right", "Option-Shift-Right"),
        exec: function exec(editor) {
          editor.getSelection().selectWordRight();
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor",
        readOnly: !0
      },
      {
        name: "gotowordright",
        bindKey: bindKey("Ctrl-Right", "Option-Right"),
        exec: function exec(editor) {
          editor.navigateWordRight();
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor",
        readOnly: !0
      },
      {
        name: "selecttolineend",
        bindKey: bindKey(
          "Alt-Shift-Right",
          "Command-Shift-Right|Shift-End|Ctrl-Shift-E"
        ),
        exec: function exec(editor) {
          editor.getSelection().selectLineEnd();
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor",
        readOnly: !0
      },
      {
        name: "gotolineend",
        bindKey: bindKey("Alt-Right|End", "Command-Right|End|Ctrl-E"),
        exec: function exec(editor) {
          editor.navigateLineEnd();
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor",
        readOnly: !0
      },
      {
        name: "selectright",
        bindKey: bindKey("Shift-Right", "Shift-Right"),
        exec: function exec(editor) {
          editor.getSelection().selectRight();
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor",
        readOnly: !0
      },
      {
        name: "gotoright",
        bindKey: bindKey("Right", "Right|Ctrl-F"),
        exec: function exec(editor, args) {
          editor.navigateRight(args.times);
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor",
        readOnly: !0
      },
      {
        name: "selectpagedown",
        bindKey: "Shift-PageDown",
        exec: function exec(editor) {
          editor.selectPageDown();
        },
        readOnly: !0
      },
      {
        name: "pagedown",
        bindKey: bindKey(null, "Option-PageDown"),
        exec: function exec(editor) {
          editor.scrollPageDown();
        },
        readOnly: !0
      },
      {
        name: "gotopagedown",
        bindKey: bindKey("PageDown", "PageDown|Ctrl-V"),
        exec: function exec(editor) {
          editor.gotoPageDown();
        },
        readOnly: !0
      },
      {
        name: "selectpageup",
        bindKey: "Shift-PageUp",
        exec: function exec(editor) {
          editor.selectPageUp();
        },
        readOnly: !0
      },
      {
        name: "pageup",
        bindKey: bindKey(null, "Option-PageUp"),
        exec: function exec(editor) {
          editor.scrollPageUp();
        },
        readOnly: !0
      },
      {
        name: "gotopageup",
        bindKey: "PageUp",
        exec: function exec(editor) {
          editor.gotoPageUp();
        },
        readOnly: !0
      },
      {
        name: "scrollup",
        bindKey: bindKey("Ctrl-Up", null),
        exec: function exec(e) {
          e.renderer.scrollBy(0, -2 * e.renderer.layerConfig.lineHeight);
        },
        readOnly: !0
      },
      {
        name: "scrolldown",
        bindKey: bindKey("Ctrl-Down", null),
        exec: function exec(e) {
          e.renderer.scrollBy(0, 2 * e.renderer.layerConfig.lineHeight);
        },
        readOnly: !0
      },
      {
        name: "selectlinestart",
        bindKey: "Shift-Home",
        exec: function exec(editor) {
          editor.getSelection().selectLineStart();
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor",
        readOnly: !0
      },
      {
        name: "selectlineend",
        bindKey: "Shift-End",
        exec: function exec(editor) {
          editor.getSelection().selectLineEnd();
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor",
        readOnly: !0
      },
      {
        name: "togglerecording",
        bindKey: bindKey("Ctrl-Alt-E", "Command-Option-E"),
        exec: function exec(editor) {
          editor.commands.toggleRecording(editor);
        },
        readOnly: !0
      },
      {
        name: "replaymacro",
        bindKey: bindKey("Ctrl-Shift-E", "Command-Shift-E"),
        exec: function exec(editor) {
          editor.commands.replay(editor);
        },
        readOnly: !0
      },
      {
        name: "jumptomatching",
        bindKey: bindKey("Ctrl-P", "Ctrl-P"),
        exec: function exec(editor) {
          editor.jumpToMatching();
        },
        multiSelectAction: "forEach",
        scrollIntoView: "animate",
        readOnly: !0
      },
      {
        name: "selecttomatching",
        bindKey: bindKey("Ctrl-Shift-P", "Ctrl-Shift-P"),
        exec: function exec(editor) {
          editor.jumpToMatching(!0);
        },
        multiSelectAction: "forEach",
        scrollIntoView: "animate",
        readOnly: !0
      },
      {
        name: "expandToMatching",
        bindKey: bindKey("Ctrl-Shift-M", "Ctrl-Shift-M"),
        exec: function exec(editor) {
          editor.jumpToMatching(!0, !0);
        },
        multiSelectAction: "forEach",
        scrollIntoView: "animate",
        readOnly: !0
      },
      {
        name: "passKeysToBrowser",
        bindKey: bindKey(null, null),
        exec: function exec() {},
        passEvent: !0,
        readOnly: !0
      },
      { name: "copy", exec: function exec(editor) {}, readOnly: !0 },
      {
        name: "cut",
        exec: function exec(editor) {
          var cutLine =
              editor.$copyWithEmptySelection && editor.selection.isEmpty(),
            range = cutLine
              ? editor.selection.getLineRange()
              : editor.selection.getRange();
          editor._emit("cut", range);
          if (!range.isEmpty()) editor.session.remove(range);
          editor.clearSelection();
        },
        scrollIntoView: "cursor",
        multiSelectAction: "forEach"
      },
      {
        name: "paste",
        exec: function exec(editor, args) {
          editor.$handlePaste(args);
        },
        scrollIntoView: "cursor"
      },
      {
        name: "removeline",
        bindKey: bindKey("Ctrl-D", "Command-D"),
        exec: function exec(editor) {
          editor.removeLines();
        },
        scrollIntoView: "cursor",
        multiSelectAction: "forEachLine"
      },
      {
        name: "duplicateSelection",
        bindKey: bindKey("Ctrl-Shift-D", "Command-Shift-D"),
        exec: function exec(editor) {
          editor.duplicateSelection();
        },
        scrollIntoView: "cursor",
        multiSelectAction: "forEach"
      },
      {
        name: "sortlines",
        bindKey: bindKey("Ctrl-Alt-S", "Command-Alt-S"),
        exec: function exec(editor) {
          editor.sortLines();
        },
        scrollIntoView: "selection",
        multiSelectAction: "forEachLine"
      },
      {
        name: "togglecomment",
        bindKey: bindKey("Ctrl-/", "Command-/"),
        exec: function exec(editor) {
          editor.toggleCommentLines();
        },
        multiSelectAction: "forEachLine",
        scrollIntoView: "selectionPart"
      },
      {
        name: "toggleBlockComment",
        bindKey: bindKey("Ctrl-Shift-/", "Command-Shift-/"),
        exec: function exec(editor) {
          editor.toggleBlockComment();
        },
        multiSelectAction: "forEach",
        scrollIntoView: "selectionPart"
      },
      {
        name: "modifyNumberUp",
        bindKey: bindKey("Ctrl-Shift-Up", "Alt-Shift-Up"),
        exec: function exec(editor) {
          editor.modifyNumber(1);
        },
        scrollIntoView: "cursor",
        multiSelectAction: "forEach"
      },
      {
        name: "modifyNumberDown",
        bindKey: bindKey("Ctrl-Shift-Down", "Alt-Shift-Down"),
        exec: function exec(editor) {
          editor.modifyNumber(-1);
        },
        scrollIntoView: "cursor",
        multiSelectAction: "forEach"
      },
      {
        name: "replace",
        bindKey: bindKey("Ctrl-H", "Command-Option-F"),
        exec: function exec(editor) {
          config.loadModule("ace/ext/searchbox", function(e) {
            e.Search(editor, !0);
          });
        }
      },
      {
        name: "undo",
        bindKey: bindKey("Ctrl-Z", "Command-Z"),
        exec: function exec(editor) {
          editor.undo();
        }
      },
      {
        name: "redo",
        bindKey: bindKey("Ctrl-Shift-Z|Ctrl-Y", "Command-Shift-Z|Command-Y"),
        exec: function exec(editor) {
          editor.redo();
        }
      },
      {
        name: "copylinesup",
        bindKey: bindKey("Alt-Shift-Up", "Command-Option-Up"),
        exec: function exec(editor) {
          editor.copyLinesUp();
        },
        scrollIntoView: "cursor"
      },
      {
        name: "movelinesup",
        bindKey: bindKey("Alt-Up", "Option-Up"),
        exec: function exec(editor) {
          editor.moveLinesUp();
        },
        scrollIntoView: "cursor"
      },
      {
        name: "copylinesdown",
        bindKey: bindKey("Alt-Shift-Down", "Command-Option-Down"),
        exec: function exec(editor) {
          editor.copyLinesDown();
        },
        scrollIntoView: "cursor"
      },
      {
        name: "movelinesdown",
        bindKey: bindKey("Alt-Down", "Option-Down"),
        exec: function exec(editor) {
          editor.moveLinesDown();
        },
        scrollIntoView: "cursor"
      },
      {
        name: "del",
        bindKey: bindKey("Delete", "Delete|Ctrl-D|Shift-Delete"),
        exec: function exec(editor) {
          editor.remove("right");
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor"
      },
      {
        name: "backspace",
        bindKey: bindKey(
          "Shift-Backspace|Backspace",
          "Ctrl-Backspace|Shift-Backspace|Backspace|Ctrl-H"
        ),
        exec: function exec(editor) {
          editor.remove("left");
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor"
      },
      {
        name: "cut_or_delete",
        bindKey: bindKey("Shift-Delete", null),
        exec: function exec(editor) {
          if (editor.selection.isEmpty()) {
            editor.remove("left");
          } else {
            return !1;
          }
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor"
      },
      {
        name: "removetolinestart",
        bindKey: bindKey("Alt-Backspace", "Command-Backspace"),
        exec: function exec(editor) {
          editor.removeToLineStart();
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor"
      },
      {
        name: "removetolineend",
        bindKey: bindKey("Alt-Delete", "Ctrl-K|Command-Delete"),
        exec: function exec(editor) {
          editor.removeToLineEnd();
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor"
      },
      {
        name: "removetolinestarthard",
        bindKey: bindKey("Ctrl-Shift-Backspace", null),
        exec: function exec(editor) {
          var range = editor.selection.getRange();
          range.start.column = 0;
          editor.session.remove(range);
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor"
      },
      {
        name: "removetolineendhard",
        bindKey: bindKey("Ctrl-Shift-Delete", null),
        exec: function exec(editor) {
          var range = editor.selection.getRange();
          range.end.column = Number.MAX_VALUE;
          editor.session.remove(range);
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor"
      },
      {
        name: "removewordleft",
        bindKey: bindKey("Ctrl-Backspace", "Alt-Backspace|Ctrl-Alt-Backspace"),
        exec: function exec(editor) {
          editor.removeWordLeft();
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor"
      },
      {
        name: "removewordright",
        bindKey: bindKey("Ctrl-Delete", "Alt-Delete"),
        exec: function exec(editor) {
          editor.removeWordRight();
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor"
      },
      {
        name: "outdent",
        bindKey: bindKey("Shift-Tab", "Shift-Tab"),
        exec: function exec(editor) {
          editor.blockOutdent();
        },
        multiSelectAction: "forEach",
        scrollIntoView: "selectionPart"
      },
      {
        name: "indent",
        bindKey: bindKey("Tab", "Tab"),
        exec: function exec(editor) {
          editor.indent();
        },
        multiSelectAction: "forEach",
        scrollIntoView: "selectionPart"
      },
      {
        name: "blockoutdent",
        bindKey: bindKey("Ctrl-[", "Ctrl-["),
        exec: function exec(editor) {
          editor.blockOutdent();
        },
        multiSelectAction: "forEachLine",
        scrollIntoView: "selectionPart"
      },
      {
        name: "blockindent",
        bindKey: bindKey("Ctrl-]", "Ctrl-]"),
        exec: function exec(editor) {
          editor.blockIndent();
        },
        multiSelectAction: "forEachLine",
        scrollIntoView: "selectionPart"
      },
      {
        name: "insertstring",
        exec: function exec(editor, str) {
          editor.insert(str);
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor"
      },
      {
        name: "inserttext",
        exec: function exec(editor, args) {
          editor.insert(lang.stringRepeat(args.text || "", args.times || 1));
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor"
      },
      {
        name: "splitline",
        bindKey: bindKey(null, "Ctrl-O"),
        exec: function exec(editor) {
          editor.splitLine();
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor"
      },
      {
        name: "transposeletters",
        bindKey: bindKey("Alt-Shift-X", "Ctrl-T"),
        exec: function exec(editor) {
          editor.transposeLetters();
        },
        multiSelectAction: function multiSelectAction(editor) {
          editor.transposeSelections(1);
        },
        scrollIntoView: "cursor"
      },
      {
        name: "touppercase",
        bindKey: bindKey("Ctrl-U", "Ctrl-U"),
        exec: function exec(editor) {
          editor.toUpperCase();
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor"
      },
      {
        name: "tolowercase",
        bindKey: bindKey("Ctrl-Shift-U", "Ctrl-Shift-U"),
        exec: function exec(editor) {
          editor.toLowerCase();
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor"
      },
      {
        name: "expandtoline",
        bindKey: bindKey("Ctrl-Shift-L", "Command-Shift-L"),
        exec: function exec(editor) {
          var range = editor.selection.getRange();
          range.start.column = range.end.column = 0;
          range.end.row++;
          editor.selection.setRange(range, !1);
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor",
        readOnly: !0
      },
      {
        name: "joinlines",
        bindKey: bindKey(null, null),
        exec: function exec(editor) {
          for (
            var isBackwards = editor.selection.isBackwards(),
              selectionStart = isBackwards
                ? editor.selection.getSelectionLead()
                : editor.selection.getSelectionAnchor(),
              selectionEnd = isBackwards
                ? editor.selection.getSelectionAnchor()
                : editor.selection.getSelectionLead(),
              firstLineEndCol = editor.session.doc.getLine(selectionStart.row)
                .length,
              selectedText = editor.session.doc.getTextRange(
                editor.selection.getRange()
              ),
              selectedCount = selectedText.replace(/\n\s*/, " ").length,
              insertLine = editor.session.doc.getLine(selectionStart.row),
              i = selectionStart.row + 1,
              curLine;
            i <= selectionEnd.row + 1;
            i++
          ) {
            curLine = lang.stringTrimLeft(
              lang.stringTrimRight(editor.session.doc.getLine(i))
            );
            if (0 !== curLine.length) {
              curLine = " " + curLine;
            }
            insertLine += curLine;
          }
          if (selectionEnd.row + 1 < editor.session.doc.getLength() - 1) {
            insertLine += editor.session.doc.getNewLineCharacter();
          }
          editor.clearSelection();
          editor.session.doc.replace(
            new Range(selectionStart.row, 0, selectionEnd.row + 2, 0),
            insertLine
          );
          if (0 < selectedCount) {
            editor.selection.moveCursorTo(
              selectionStart.row,
              selectionStart.column
            );
            editor.selection.selectTo(
              selectionStart.row,
              selectionStart.column + selectedCount
            );
          } else {
            firstLineEndCol =
              editor.session.doc.getLine(selectionStart.row).length >
              firstLineEndCol
                ? firstLineEndCol + 1
                : firstLineEndCol;
            editor.selection.moveCursorTo(selectionStart.row, firstLineEndCol);
          }
        },
        multiSelectAction: "forEach",
        readOnly: !0
      },
      {
        name: "invertSelection",
        bindKey: bindKey(null, null),
        exec: function exec(editor) {
          var endRow = editor.session.doc.getLength() - 1,
            endCol = editor.session.doc.getLine(endRow).length,
            ranges = editor.selection.rangeList.ranges,
            newRanges = [];
          if (1 > ranges.length) {
            ranges = [editor.selection.getRange()];
          }
          for (var i = 0; i < ranges.length; i++) {
            if (i == ranges.length - 1) {
              if (
                !(
                  ranges[i].end.row === endRow &&
                  ranges[i].end.column === endCol
                )
              ) {
                newRanges.push(
                  new Range(
                    ranges[i].end.row,
                    ranges[i].end.column,
                    endRow,
                    endCol
                  )
                );
              }
            }
            if (0 === i) {
              if (
                !(0 === ranges[i].start.row && 0 === ranges[i].start.column)
              ) {
                newRanges.push(
                  new Range(0, 0, ranges[i].start.row, ranges[i].start.column)
                );
              }
            } else {
              newRanges.push(
                new Range(
                  ranges[i - 1].end.row,
                  ranges[i - 1].end.column,
                  ranges[i].start.row,
                  ranges[i].start.column
                )
              );
            }
          }
          editor.exitMultiSelectMode();
          editor.clearSelection();
          for (var i = 0; i < newRanges.length; i++) {
            editor.selection.addRange(newRanges[i], !1);
          }
        },
        readOnly: !0,
        scrollIntoView: "none"
      }
    ];
  }
);
ace.define("ace/clipboard", ["require", "exports", "module"], function(
  require,
  exports,
  module
) {
  "use strict";
  module.exports = { lineMode: !1 };
});
ace.define(
  "ace/editor",
  [
    "require",
    "exports",
    "module",
    "ace/lib/fixoldbrowsers",
    "ace/lib/oop",
    "ace/lib/dom",
    "ace/lib/lang",
    "ace/lib/useragent",
    "ace/keyboard/textinput",
    "ace/mouse/mouse_handler",
    "ace/mouse/fold_handler",
    "ace/keyboard/keybinding",
    "ace/edit_session",
    "ace/search",
    "ace/range",
    "ace/lib/event_emitter",
    "ace/commands/command_manager",
    "ace/commands/default_commands",
    "ace/config",
    "ace/token_iterator",
    "ace/clipboard"
  ],
  function(require, exports, module) {
    "use strict";
    var _Mathpow3 = Math.pow,
      _Mathfloor2 = Math.floor,
      _Mathabs4 = Math.abs,
      _Mathmax6 = Math.max;
    require("./lib/fixoldbrowsers");
    var oop = require("./lib/oop"),
      dom = require("./lib/dom"),
      lang = require("./lib/lang"),
      useragent = require("./lib/useragent"),
      TextInput = require("./keyboard/textinput").TextInput,
      MouseHandler = require("./mouse/mouse_handler").MouseHandler,
      FoldHandler = require("./mouse/fold_handler").FoldHandler,
      KeyBinding = require("./keyboard/keybinding").KeyBinding,
      EditSession = require("./edit_session").EditSession,
      Search = require("./search").Search,
      Range = require("./range").Range,
      EventEmitter = require("./lib/event_emitter").EventEmitter,
      CommandManager = require("./commands/command_manager").CommandManager,
      defaultCommands = require("./commands/default_commands").commands,
      config = require("./config"),
      TokenIterator = require("./token_iterator").TokenIterator,
      clipboard = require("./clipboard"),
      Editor = function Editor(renderer, session, options) {
        var container = renderer.getContainerElement();
        this.container = container;
        this.renderer = renderer;
        this.id = "editor" + ++Editor.$uid;
        this.commands = new CommandManager(
          useragent.isMac ? "mac" : "win",
          defaultCommands
        );
        if (
          "object" ==
          ("undefined" === typeof document
            ? "undefined"
            : babelHelpers.typeof(document))
        ) {
          this.textInput = new TextInput(renderer.getTextAreaContainer(), this);
          this.renderer.textarea = this.textInput.getElement();
          this.$mouseHandler = new MouseHandler(this);
          new FoldHandler(this);
        }
        this.keyBinding = new KeyBinding(this);
        this.$search = new Search().set({ wrap: !0 });
        this.$historyTracker = this.$historyTracker.bind(this);
        this.commands.on("exec", this.$historyTracker);
        this.$initOperationListeners();
        this._$emitInputEvent = lang.delayedCall(
          function() {
            this._signal("input", {});
            if (this.session && this.session.bgTokenizer)
              this.session.bgTokenizer.scheduleStart();
          }.bind(this)
        );
        this.on("change", function(_, _self) {
          _self._$emitInputEvent.schedule(31);
        });
        this.setSession(
          session || (options && options.session) || new EditSession("")
        );
        config.resetOptions(this);
        if (options) this.setOptions(options);
        config._signal("editor", this);
      };
    Editor.$uid = 0;
    (function() {
      oop.implement(this, EventEmitter);
      this.$initOperationListeners = function() {
        this.commands.on("exec", this.startOperation.bind(this), !0);
        this.commands.on("afterExec", this.endOperation.bind(this), !0);
        this.$opResetTimer = lang.delayedCall(this.endOperation.bind(this, !0));
        this.on(
          "change",
          function() {
            if (!this.curOp) {
              this.startOperation();
              this.curOp.selectionBefore = this.$lastSel;
            }
            this.curOp.docChanged = !0;
          }.bind(this),
          !0
        );
        this.on(
          "changeSelection",
          function() {
            if (!this.curOp) {
              this.startOperation();
              this.curOp.selectionBefore = this.$lastSel;
            }
            this.curOp.selectionChanged = !0;
          }.bind(this),
          !0
        );
      };
      this.curOp = null;
      this.prevOp = {};
      this.startOperation = function(commandEvent) {
        if (this.curOp) {
          if (!commandEvent || this.curOp.command) return;
          this.prevOp = this.curOp;
        }
        if (!commandEvent) {
          this.previousCommand = null;
          commandEvent = {};
        }
        this.$opResetTimer.schedule();
        this.curOp = this.session.curOp = {
          command: commandEvent.command || {},
          args: commandEvent.args,
          scrollTop: this.renderer.scrollTop
        };
        this.curOp.selectionBefore = this.selection.toJSON();
      };
      this.endOperation = function(e) {
        if (this.curOp) {
          if (e && !1 === e.returnValue) return (this.curOp = null);
          if (
            !0 == e &&
            this.curOp.command &&
            "mouse" == this.curOp.command.name
          )
            return;
          this._signal("beforeEndOperation");
          if (!this.curOp) return;
          var command = this.curOp.command,
            scrollIntoView = command && command.scrollIntoView;
          if (scrollIntoView) {
            switch (scrollIntoView) {
              case "center-animate":
                scrollIntoView = "animate";
              case "center":
                this.renderer.scrollCursorIntoView(null, 0.5);
                break;
              case "animate":
              case "cursor":
                this.renderer.scrollCursorIntoView();
                break;
              case "selectionPart":
                var range = this.selection.getRange(),
                  config = this.renderer.layerConfig;
                if (
                  range.start.row >= config.lastRow ||
                  range.end.row <= config.firstRow
                ) {
                  this.renderer.scrollSelectionIntoView(
                    this.selection.anchor,
                    this.selection.lead
                  );
                }
                break;
              default:
                break;
            }
            if ("animate" == scrollIntoView)
              this.renderer.animateScrolling(this.curOp.scrollTop);
          }
          var sel = this.selection.toJSON();
          this.curOp.selectionAfter = sel;
          this.$lastSel = this.selection.toJSON();
          this.session.getUndoManager().addSelection(sel);
          this.prevOp = this.curOp;
          this.curOp = null;
        }
      };
      this.$mergeableCommands = ["backspace", "del", "insertstring"];
      this.$historyTracker = function(e) {
        if (!this.$mergeUndoDeltas) return;
        var prev = this.prevOp,
          mergeableCommands = this.$mergeableCommands,
          shouldMerge = prev.command && e.command.name == prev.command.name;
        if ("insertstring" == e.command.name) {
          var text = e.args;
          if (this.mergeNextCommand === void 0) this.mergeNextCommand = !0;
          shouldMerge =
            shouldMerge &&
            this.mergeNextCommand &&
            (!/\s/.test(text) || /\s/.test(prev.args));
          this.mergeNextCommand = !0;
        } else {
          shouldMerge =
            shouldMerge && -1 !== mergeableCommands.indexOf(e.command.name);
        }
        if (
          "always" != this.$mergeUndoDeltas &&
          2e3 < Date.now() - this.sequenceStartTime
        ) {
          shouldMerge = !1;
        }
        if (shouldMerge) this.session.mergeUndoDeltas = !0;
        else if (-1 !== mergeableCommands.indexOf(e.command.name))
          this.sequenceStartTime = Date.now();
      };
      this.setKeyboardHandler = function(keyboardHandler, cb) {
        if (
          keyboardHandler &&
          "string" === typeof keyboardHandler &&
          "ace" != keyboardHandler
        ) {
          this.$keybindingId = keyboardHandler;
          var _self = this;
          config.loadModule(["keybinding", keyboardHandler], function(module) {
            if (_self.$keybindingId == keyboardHandler)
              _self.keyBinding.setKeyboardHandler(module && module.handler);
            cb && cb();
          });
        } else {
          this.$keybindingId = null;
          this.keyBinding.setKeyboardHandler(keyboardHandler);
          cb && cb();
        }
      };
      this.getKeyboardHandler = function() {
        return this.keyBinding.getKeyboardHandler();
      };
      this.setSession = function(session) {
        if (this.session == session) return;
        if (this.curOp) this.endOperation();
        this.curOp = {};
        var oldSession = this.session;
        if (oldSession) {
          this.session.off("change", this.$onDocumentChange);
          this.session.off("changeMode", this.$onChangeMode);
          this.session.off("tokenizerUpdate", this.$onTokenizerUpdate);
          this.session.off("changeTabSize", this.$onChangeTabSize);
          this.session.off("changeWrapLimit", this.$onChangeWrapLimit);
          this.session.off("changeWrapMode", this.$onChangeWrapMode);
          this.session.off("changeFold", this.$onChangeFold);
          this.session.off("changeFrontMarker", this.$onChangeFrontMarker);
          this.session.off("changeBackMarker", this.$onChangeBackMarker);
          this.session.off("changeBreakpoint", this.$onChangeBreakpoint);
          this.session.off("changeAnnotation", this.$onChangeAnnotation);
          this.session.off("changeOverwrite", this.$onCursorChange);
          this.session.off("changeScrollTop", this.$onScrollTopChange);
          this.session.off("changeScrollLeft", this.$onScrollLeftChange);
          var selection = this.session.getSelection();
          selection.off("changeCursor", this.$onCursorChange);
          selection.off("changeSelection", this.$onSelectionChange);
        }
        this.session = session;
        if (session) {
          this.$onDocumentChange = this.onDocumentChange.bind(this);
          session.on("change", this.$onDocumentChange);
          this.renderer.setSession(session);
          this.$onChangeMode = this.onChangeMode.bind(this);
          session.on("changeMode", this.$onChangeMode);
          this.$onTokenizerUpdate = this.onTokenizerUpdate.bind(this);
          session.on("tokenizerUpdate", this.$onTokenizerUpdate);
          this.$onChangeTabSize = this.renderer.onChangeTabSize.bind(
            this.renderer
          );
          session.on("changeTabSize", this.$onChangeTabSize);
          this.$onChangeWrapLimit = this.onChangeWrapLimit.bind(this);
          session.on("changeWrapLimit", this.$onChangeWrapLimit);
          this.$onChangeWrapMode = this.onChangeWrapMode.bind(this);
          session.on("changeWrapMode", this.$onChangeWrapMode);
          this.$onChangeFold = this.onChangeFold.bind(this);
          session.on("changeFold", this.$onChangeFold);
          this.$onChangeFrontMarker = this.onChangeFrontMarker.bind(this);
          this.session.on("changeFrontMarker", this.$onChangeFrontMarker);
          this.$onChangeBackMarker = this.onChangeBackMarker.bind(this);
          this.session.on("changeBackMarker", this.$onChangeBackMarker);
          this.$onChangeBreakpoint = this.onChangeBreakpoint.bind(this);
          this.session.on("changeBreakpoint", this.$onChangeBreakpoint);
          this.$onChangeAnnotation = this.onChangeAnnotation.bind(this);
          this.session.on("changeAnnotation", this.$onChangeAnnotation);
          this.$onCursorChange = this.onCursorChange.bind(this);
          this.session.on("changeOverwrite", this.$onCursorChange);
          this.$onScrollTopChange = this.onScrollTopChange.bind(this);
          this.session.on("changeScrollTop", this.$onScrollTopChange);
          this.$onScrollLeftChange = this.onScrollLeftChange.bind(this);
          this.session.on("changeScrollLeft", this.$onScrollLeftChange);
          this.selection = session.getSelection();
          this.selection.on("changeCursor", this.$onCursorChange);
          this.$onSelectionChange = this.onSelectionChange.bind(this);
          this.selection.on("changeSelection", this.$onSelectionChange);
          this.onChangeMode();
          this.onCursorChange();
          this.onScrollTopChange();
          this.onScrollLeftChange();
          this.onSelectionChange();
          this.onChangeFrontMarker();
          this.onChangeBackMarker();
          this.onChangeBreakpoint();
          this.onChangeAnnotation();
          this.session.getUseWrapMode() && this.renderer.adjustWrapLimit();
          this.renderer.updateFull();
        } else {
          this.selection = null;
          this.renderer.setSession(session);
        }
        this._signal("changeSession", {
          session: session,
          oldSession: oldSession
        });
        this.curOp = null;
        oldSession && oldSession._signal("changeEditor", { oldEditor: this });
        session && session._signal("changeEditor", { editor: this });
        if (session && session.bgTokenizer) session.bgTokenizer.scheduleStart();
      };
      this.getSession = function() {
        return this.session;
      };
      this.setValue = function(val, cursorPos) {
        this.session.doc.setValue(val);
        if (!cursorPos) this.selectAll();
        else if (1 == cursorPos) this.navigateFileEnd();
        else if (-1 == cursorPos) this.navigateFileStart();
        return val;
      };
      this.getValue = function() {
        return this.session.getValue();
      };
      this.getSelection = function() {
        return this.selection;
      };
      this.resize = function(force) {
        this.renderer.onResize(force);
      };
      this.setTheme = function(theme, cb) {
        this.renderer.setTheme(theme, cb);
      };
      this.getTheme = function() {
        return this.renderer.getTheme();
      };
      this.setStyle = function(style) {
        this.renderer.setStyle(style);
      };
      this.unsetStyle = function(style) {
        this.renderer.unsetStyle(style);
      };
      this.getFontSize = function() {
        return (
          this.getOption("fontSize") ||
          dom.computedStyle(this.container).fontSize
        );
      };
      this.setFontSize = function(size) {
        this.setOption("fontSize", size);
      };
      this.$highlightBrackets = function() {
        if (this.session.$bracketHighlight) {
          this.session.removeMarker(this.session.$bracketHighlight);
          this.session.$bracketHighlight = null;
        }
        if (this.$highlightPending) {
          return;
        }
        var self = this;
        this.$highlightPending = !0;
        setTimeout(function() {
          self.$highlightPending = !1;
          var session = self.session;
          if (!session || !session.bgTokenizer) return;
          var pos = session.findMatchingBracket(self.getCursorPosition());
          if (pos) {
            var range = new Range(pos.row, pos.column, pos.row, pos.column + 1);
          } else if (session.$mode.getMatching) {
            var range = session.$mode.getMatching(self.session);
          }
          if (range)
            session.$bracketHighlight = session.addMarker(
              range,
              "ace_bracket",
              "text"
            );
        }, 50);
      };
      this.$highlightTags = function() {
        if (this.$highlightTagPending) return;
        var self = this;
        this.$highlightTagPending = !0;
        setTimeout(function() {
          self.$highlightTagPending = !1;
          var session = self.session;
          if (!session || !session.bgTokenizer) return;
          var pos = self.getCursorPosition(),
            iterator = new TokenIterator(self.session, pos.row, pos.column),
            token = iterator.getCurrentToken();
          if (!token || !/\b(?:tag-open|tag-name)/.test(token.type)) {
            session.removeMarker(session.$tagHighlight);
            session.$tagHighlight = null;
            return;
          }
          if (-1 != token.type.indexOf("tag-open")) {
            token = iterator.stepForward();
            if (!token) return;
          }
          var tag = token.value,
            depth = 0,
            prevToken = iterator.stepBackward();
          if ("<" == prevToken.value) {
            do {
              prevToken = token;
              token = iterator.stepForward();
              if (
                token &&
                token.value === tag &&
                -1 !== token.type.indexOf("tag-name")
              ) {
                if ("<" === prevToken.value) {
                  depth++;
                } else if ("</" === prevToken.value) {
                  depth--;
                }
              }
            } while (token && 0 <= depth);
          } else {
            do {
              token = prevToken;
              prevToken = iterator.stepBackward();
              if (
                token &&
                token.value === tag &&
                -1 !== token.type.indexOf("tag-name")
              ) {
                if ("<" === prevToken.value) {
                  depth++;
                } else if ("</" === prevToken.value) {
                  depth--;
                }
              }
            } while (prevToken && 0 >= depth);
            iterator.stepForward();
          }
          if (!token) {
            session.removeMarker(session.$tagHighlight);
            session.$tagHighlight = null;
            return;
          }
          var row = iterator.getCurrentTokenRow(),
            column = iterator.getCurrentTokenColumn(),
            range = new Range(row, column, row, column + token.value.length),
            sbm = session.$backMarkers[session.$tagHighlight];
          if (
            session.$tagHighlight &&
            sbm != void 0 &&
            0 !== range.compareRange(sbm.range)
          ) {
            session.removeMarker(session.$tagHighlight);
            session.$tagHighlight = null;
          }
          if (!session.$tagHighlight)
            session.$tagHighlight = session.addMarker(
              range,
              "ace_bracket",
              "text"
            );
        }, 50);
      };
      this.focus = function() {
        var _self = this;
        setTimeout(function() {
          if (!_self.isFocused()) _self.textInput.focus();
        });
        this.textInput.focus();
      };
      this.isFocused = function() {
        return this.textInput.isFocused();
      };
      this.blur = function() {
        this.textInput.blur();
      };
      this.onFocus = function(e) {
        if (this.$isFocused) return;
        this.$isFocused = !0;
        this.renderer.showCursor();
        this.renderer.visualizeFocus();
        this._emit("focus", e);
      };
      this.onBlur = function(e) {
        if (!this.$isFocused) return;
        this.$isFocused = !1;
        this.renderer.hideCursor();
        this.renderer.visualizeBlur();
        this._emit("blur", e);
      };
      this.$cursorChange = function() {
        this.renderer.updateCursor();
      };
      this.onDocumentChange = function(delta) {
        var wrap = this.session.$useWrapMode,
          lastRow = delta.start.row == delta.end.row ? delta.end.row : 1 / 0;
        this.renderer.updateLines(delta.start.row, lastRow, wrap);
        this._signal("change", delta);
        this.$cursorChange();
        this.$updateHighlightActiveLine();
      };
      this.onTokenizerUpdate = function(e) {
        var rows = e.data;
        this.renderer.updateLines(rows.first, rows.last);
      };
      this.onScrollTopChange = function() {
        this.renderer.scrollToY(this.session.getScrollTop());
      };
      this.onScrollLeftChange = function() {
        this.renderer.scrollToX(this.session.getScrollLeft());
      };
      this.onCursorChange = function() {
        this.$cursorChange();
        this.$highlightBrackets();
        this.$highlightTags();
        this.$updateHighlightActiveLine();
        this._signal("changeSelection");
      };
      this.$updateHighlightActiveLine = function() {
        var session = this.getSession(),
          highlight;
        if (this.$highlightActiveLine) {
          if ("line" != this.$selectionStyle || !this.selection.isMultiLine())
            highlight = this.getCursorPosition();
          if (
            this.renderer.theme &&
            this.renderer.theme.$selectionColorConflict &&
            !this.selection.isEmpty()
          )
            highlight = !1;
          if (
            this.renderer.$maxLines &&
            1 === this.session.getLength() &&
            !(1 < this.renderer.$minLines)
          )
            highlight = !1;
        }
        if (session.$highlightLineMarker && !highlight) {
          session.removeMarker(session.$highlightLineMarker.id);
          session.$highlightLineMarker = null;
        } else if (!session.$highlightLineMarker && highlight) {
          var range = new Range(
            highlight.row,
            highlight.column,
            highlight.row,
            1 / 0
          );
          range.id = session.addMarker(range, "ace_active-line", "screenLine");
          session.$highlightLineMarker = range;
        } else if (highlight) {
          session.$highlightLineMarker.start.row = highlight.row;
          session.$highlightLineMarker.end.row = highlight.row;
          session.$highlightLineMarker.start.column = highlight.column;
          session._signal("changeBackMarker");
        }
      };
      this.onSelectionChange = function(e) {
        var session = this.session;
        if (session.$selectionMarker) {
          session.removeMarker(session.$selectionMarker);
        }
        session.$selectionMarker = null;
        if (!this.selection.isEmpty()) {
          var range = this.selection.getRange(),
            style = this.getSelectionStyle();
          session.$selectionMarker = session.addMarker(
            range,
            "ace_selection",
            style
          );
        } else {
          this.$updateHighlightActiveLine();
        }
        var re =
          this.$highlightSelectedWord && this.$getSelectionHighLightRegexp();
        this.session.highlight(re);
        this._signal("changeSelection");
      };
      this.$getSelectionHighLightRegexp = function() {
        var session = this.session,
          selection = this.getSelectionRange();
        if (selection.isEmpty() || selection.isMultiLine()) return;
        var startColumn = selection.start.column,
          endColumn = selection.end.column,
          line = session.getLine(selection.start.row),
          needle = line.substring(startColumn, endColumn);
        if (5e3 < needle.length || !/[\w\d]/.test(needle)) return;
        var re = this.$search.$assembleRegExp({
            wholeWord: !0,
            caseSensitive: !0,
            needle: needle
          }),
          wordWithBoundary = line.substring(startColumn - 1, endColumn + 1);
        if (!re.test(wordWithBoundary)) return;
        return re;
      };
      this.onChangeFrontMarker = function() {
        this.renderer.updateFrontMarkers();
      };
      this.onChangeBackMarker = function() {
        this.renderer.updateBackMarkers();
      };
      this.onChangeBreakpoint = function() {
        this.renderer.updateBreakpoints();
      };
      this.onChangeAnnotation = function() {
        this.renderer.setAnnotations(this.session.getAnnotations());
      };
      this.onChangeMode = function(e) {
        this.renderer.updateText();
        this._emit("changeMode", e);
      };
      this.onChangeWrapLimit = function() {
        this.renderer.updateFull();
      };
      this.onChangeWrapMode = function() {
        this.renderer.onResize(!0);
      };
      this.onChangeFold = function() {
        this.$updateHighlightActiveLine();
        this.renderer.updateFull();
      };
      this.getSelectedText = function() {
        return this.session.getTextRange(this.getSelectionRange());
      };
      this.getCopyText = function() {
        var text = this.getSelectedText(),
          nl = this.session.doc.getNewLineCharacter(),
          copyLine = !1;
        if (!text && this.$copyWithEmptySelection) {
          copyLine = !0;
          for (
            var ranges = this.selection.getAllRanges(), i = 0, range;
            i < ranges.length;
            i++
          ) {
            range = ranges[i];
            if (i && ranges[i - 1].start.row == range.start.row) continue;
            text += this.session.getLine(range.start.row) + nl;
          }
        }
        var e = { text: text };
        this._signal("copy", e);
        clipboard.lineMode = copyLine ? e.text : "";
        return e.text;
      };
      this.onCopy = function() {
        this.commands.exec("copy", this);
      };
      this.onCut = function() {
        this.commands.exec("cut", this);
      };
      this.onPaste = function(text, event) {
        var e = { text: text, event: event };
        this.commands.exec("paste", this, e);
      };
      this.$handlePaste = function(e) {
        if ("string" == typeof e) e = { text: e };
        this._signal("paste", e);
        var text = e.text,
          lineMode = text == clipboard.lineMode,
          session = this.session;
        if (!this.inMultiSelectMode || this.inVirtualSelectionMode) {
          if (lineMode)
            session.insert({ row: this.selection.lead.row, column: 0 }, text);
          else this.insert(text);
        } else if (lineMode) {
          this.selection.rangeList.ranges.forEach(function(range) {
            session.insert({ row: range.start.row, column: 0 }, text);
          });
        } else {
          var lines = text.split(/\r\n|\r|\n/),
            ranges = this.selection.rangeList.ranges;
          if (lines.length > ranges.length || 2 > lines.length || !lines[1])
            return this.commands.exec("insertstring", this, text);
          for (var i = ranges.length, range; i--; ) {
            range = ranges[i];
            if (!range.isEmpty()) session.remove(range);
            session.insert(range.start, lines[i]);
          }
        }
      };
      this.execCommand = function(command, args) {
        return this.commands.exec(command, this, args);
      };
      this.insert = function(text, pasted) {
        var session = this.session,
          mode = session.getMode(),
          cursor = this.getCursorPosition();
        if (this.getBehavioursEnabled() && !pasted) {
          var transform = mode.transformAction(
            session.getState(cursor.row),
            "insertion",
            this,
            session,
            text
          );
          if (transform) {
            if (text !== transform.text) {
              if (!this.inVirtualSelectionMode) {
                this.session.mergeUndoDeltas = !1;
                this.mergeNextCommand = !1;
              }
            }
            text = transform.text;
          }
        }
        if ("\t" == text) text = this.session.getTabString();
        if (!this.selection.isEmpty()) {
          var range = this.getSelectionRange();
          cursor = this.session.remove(range);
          this.clearSelection();
        } else if (this.session.getOverwrite() && -1 == text.indexOf("\n")) {
          var range = new Range.fromPoints(cursor, cursor);
          range.end.column += text.length;
          this.session.remove(range);
        }
        if ("\n" == text || "\r\n" == text) {
          var line = session.getLine(cursor.row);
          if (cursor.column > line.search(/\S|$/)) {
            var d = line.substr(cursor.column).search(/\S|$/);
            session.doc.removeInLine(
              cursor.row,
              cursor.column,
              cursor.column + d
            );
          }
        }
        this.clearSelection();
        var start = cursor.column,
          lineState = session.getState(cursor.row),
          line = session.getLine(cursor.row),
          shouldOutdent = mode.checkOutdent(lineState, line, text),
          end = session.insert(cursor, text);
        if (transform && transform.selection) {
          if (2 == transform.selection.length) {
            this.selection.setSelectionRange(
              new Range(
                cursor.row,
                start + transform.selection[0],
                cursor.row,
                start + transform.selection[1]
              )
            );
          } else {
            this.selection.setSelectionRange(
              new Range(
                cursor.row + transform.selection[0],
                transform.selection[1],
                cursor.row + transform.selection[2],
                transform.selection[3]
              )
            );
          }
        }
        if (session.getDocument().isNewLine(text)) {
          var lineIndent = mode.getNextLineIndent(
            lineState,
            line.slice(0, cursor.column),
            session.getTabString()
          );
          session.insert({ row: cursor.row + 1, column: 0 }, lineIndent);
        }
        if (shouldOutdent) mode.autoOutdent(lineState, session, cursor.row);
      };
      this.onTextInput = function(text, composition) {
        if (!composition) return this.keyBinding.onTextInput(text);
        this.startOperation({ command: { name: "insertstring" } });
        var applyComposition = this.applyComposition.bind(
          this,
          text,
          composition
        );
        if (this.selection.rangeCount) this.forEachSelection(applyComposition);
        else applyComposition();
        this.endOperation();
      };
      this.applyComposition = function(text, composition) {
        if (composition.extendLeft || composition.extendRight) {
          var r = this.selection.getRange();
          r.start.column -= composition.extendLeft;
          r.end.column += composition.extendRight;
          this.selection.setRange(r);
          if (!text && !r.isEmpty()) this.remove();
        }
        if (text || !this.selection.isEmpty()) this.insert(text, !0);
        if (composition.restoreStart || composition.restoreEnd) {
          var r = this.selection.getRange();
          r.start.column -= composition.restoreStart;
          r.end.column -= composition.restoreEnd;
          this.selection.setRange(r);
        }
      };
      this.onCommandKey = function(e, hashId, keyCode) {
        this.keyBinding.onCommandKey(e, hashId, keyCode);
      };
      this.setOverwrite = function(overwrite) {
        this.session.setOverwrite(overwrite);
      };
      this.getOverwrite = function() {
        return this.session.getOverwrite();
      };
      this.toggleOverwrite = function() {
        this.session.toggleOverwrite();
      };
      this.setScrollSpeed = function(speed) {
        this.setOption("scrollSpeed", speed);
      };
      this.getScrollSpeed = function() {
        return this.getOption("scrollSpeed");
      };
      this.setDragDelay = function(dragDelay) {
        this.setOption("dragDelay", dragDelay);
      };
      this.getDragDelay = function() {
        return this.getOption("dragDelay");
      };
      this.setSelectionStyle = function(val) {
        this.setOption("selectionStyle", val);
      };
      this.getSelectionStyle = function() {
        return this.getOption("selectionStyle");
      };
      this.setHighlightActiveLine = function(shouldHighlight) {
        this.setOption("highlightActiveLine", shouldHighlight);
      };
      this.getHighlightActiveLine = function() {
        return this.getOption("highlightActiveLine");
      };
      this.setHighlightGutterLine = function(shouldHighlight) {
        this.setOption("highlightGutterLine", shouldHighlight);
      };
      this.getHighlightGutterLine = function() {
        return this.getOption("highlightGutterLine");
      };
      this.setHighlightSelectedWord = function(shouldHighlight) {
        this.setOption("highlightSelectedWord", shouldHighlight);
      };
      this.getHighlightSelectedWord = function() {
        return this.$highlightSelectedWord;
      };
      this.setAnimatedScroll = function(shouldAnimate) {
        this.renderer.setAnimatedScroll(shouldAnimate);
      };
      this.getAnimatedScroll = function() {
        return this.renderer.getAnimatedScroll();
      };
      this.setShowInvisibles = function(showInvisibles) {
        this.renderer.setShowInvisibles(showInvisibles);
      };
      this.getShowInvisibles = function() {
        return this.renderer.getShowInvisibles();
      };
      this.setDisplayIndentGuides = function(display) {
        this.renderer.setDisplayIndentGuides(display);
      };
      this.getDisplayIndentGuides = function() {
        return this.renderer.getDisplayIndentGuides();
      };
      this.setShowPrintMargin = function(showPrintMargin) {
        this.renderer.setShowPrintMargin(showPrintMargin);
      };
      this.getShowPrintMargin = function() {
        return this.renderer.getShowPrintMargin();
      };
      this.setPrintMarginColumn = function(showPrintMargin) {
        this.renderer.setPrintMarginColumn(showPrintMargin);
      };
      this.getPrintMarginColumn = function() {
        return this.renderer.getPrintMarginColumn();
      };
      this.setReadOnly = function(readOnly) {
        this.setOption("readOnly", readOnly);
      };
      this.getReadOnly = function() {
        return this.getOption("readOnly");
      };
      this.setBehavioursEnabled = function(enabled) {
        this.setOption("behavioursEnabled", enabled);
      };
      this.getBehavioursEnabled = function() {
        return this.getOption("behavioursEnabled");
      };
      this.setWrapBehavioursEnabled = function(enabled) {
        this.setOption("wrapBehavioursEnabled", enabled);
      };
      this.getWrapBehavioursEnabled = function() {
        return this.getOption("wrapBehavioursEnabled");
      };
      this.setShowFoldWidgets = function(show) {
        this.setOption("showFoldWidgets", show);
      };
      this.getShowFoldWidgets = function() {
        return this.getOption("showFoldWidgets");
      };
      this.setFadeFoldWidgets = function(fade) {
        this.setOption("fadeFoldWidgets", fade);
      };
      this.getFadeFoldWidgets = function() {
        return this.getOption("fadeFoldWidgets");
      };
      this.remove = function(dir) {
        if (this.selection.isEmpty()) {
          if ("left" == dir) this.selection.selectLeft();
          else this.selection.selectRight();
        }
        var range = this.getSelectionRange();
        if (this.getBehavioursEnabled()) {
          var session = this.session,
            state = session.getState(range.start.row),
            new_range = session
              .getMode()
              .transformAction(state, "deletion", this, session, range);
          if (0 === range.end.column) {
            var text = session.getTextRange(range);
            if ("\n" == text[text.length - 1]) {
              var line = session.getLine(range.end.row);
              if (/^\s+$/.test(line)) {
                range.end.column = line.length;
              }
            }
          }
          if (new_range) range = new_range;
        }
        this.session.remove(range);
        this.clearSelection();
      };
      this.removeWordRight = function() {
        if (this.selection.isEmpty()) this.selection.selectWordRight();
        this.session.remove(this.getSelectionRange());
        this.clearSelection();
      };
      this.removeWordLeft = function() {
        if (this.selection.isEmpty()) this.selection.selectWordLeft();
        this.session.remove(this.getSelectionRange());
        this.clearSelection();
      };
      this.removeToLineStart = function() {
        if (this.selection.isEmpty()) this.selection.selectLineStart();
        this.session.remove(this.getSelectionRange());
        this.clearSelection();
      };
      this.removeToLineEnd = function() {
        if (this.selection.isEmpty()) this.selection.selectLineEnd();
        var range = this.getSelectionRange();
        if (
          range.start.column == range.end.column &&
          range.start.row == range.end.row
        ) {
          range.end.column = 0;
          range.end.row++;
        }
        this.session.remove(range);
        this.clearSelection();
      };
      this.splitLine = function() {
        if (!this.selection.isEmpty()) {
          this.session.remove(this.getSelectionRange());
          this.clearSelection();
        }
        var cursor = this.getCursorPosition();
        this.insert("\n");
        this.moveCursorToPosition(cursor);
      };
      this.transposeLetters = function() {
        if (!this.selection.isEmpty()) {
          return;
        }
        var cursor = this.getCursorPosition(),
          column = cursor.column;
        if (0 === column) return;
        var line = this.session.getLine(cursor.row),
          swap,
          range;
        if (column < line.length) {
          swap = line.charAt(column) + line.charAt(column - 1);
          range = new Range(cursor.row, column - 1, cursor.row, column + 1);
        } else {
          swap = line.charAt(column - 1) + line.charAt(column - 2);
          range = new Range(cursor.row, column - 2, cursor.row, column);
        }
        this.session.replace(range, swap);
        this.session.selection.moveToPosition(range.end);
      };
      this.toLowerCase = function() {
        var originalRange = this.getSelectionRange();
        if (this.selection.isEmpty()) {
          this.selection.selectWord();
        }
        var range = this.getSelectionRange(),
          text = this.session.getTextRange(range);
        this.session.replace(range, text.toLowerCase());
        this.selection.setSelectionRange(originalRange);
      };
      this.toUpperCase = function() {
        var originalRange = this.getSelectionRange();
        if (this.selection.isEmpty()) {
          this.selection.selectWord();
        }
        var range = this.getSelectionRange(),
          text = this.session.getTextRange(range);
        this.session.replace(range, text.toUpperCase());
        this.selection.setSelectionRange(originalRange);
      };
      this.indent = function() {
        var session = this.session,
          range = this.getSelectionRange();
        if (range.start.row < range.end.row) {
          var rows = this.$getSelectedRows();
          session.indentRows(rows.first, rows.last, "\t");
          return;
        } else if (range.start.column < range.end.column) {
          var text = session.getTextRange(range);
          if (!/^\s+$/.test(text)) {
            var rows = this.$getSelectedRows();
            session.indentRows(rows.first, rows.last, "\t");
            return;
          }
        }
        var line = session.getLine(range.start.row),
          position = range.start,
          size = session.getTabSize(),
          column = session.documentToScreenColumn(
            position.row,
            position.column
          );
        if (this.session.getUseSoftTabs()) {
          var count = size - (column % size),
            indentString = lang.stringRepeat(" ", count);
        } else {
          var count = column % size;
          while (" " == line[range.start.column - 1] && count) {
            range.start.column--;
            count--;
          }
          this.selection.setSelectionRange(range);
          indentString = "\t";
        }
        return this.insert(indentString);
      };
      this.blockIndent = function() {
        var rows = this.$getSelectedRows();
        this.session.indentRows(rows.first, rows.last, "\t");
      };
      this.blockOutdent = function() {
        var selection = this.session.getSelection();
        this.session.outdentRows(selection.getRange());
      };
      this.sortLines = function() {
        for (
          var rows = this.$getSelectedRows(),
            session = this.session,
            lines = [],
            i = rows.first;
          i <= rows.last;
          i++
        ) {
          lines.push(session.getLine(i));
        }
        lines.sort(function(a, b) {
          if (a.toLowerCase() < b.toLowerCase()) return -1;
          if (a.toLowerCase() > b.toLowerCase()) return 1;
          return 0;
        });
        for (
          var deleteRange = new Range(0, 0, 0, 0), i = rows.first, line;
          i <= rows.last;
          i++
        ) {
          line = session.getLine(i);
          deleteRange.start.row = i;
          deleteRange.end.row = i;
          deleteRange.end.column = line.length;
          session.replace(deleteRange, lines[i - rows.first]);
        }
      };
      this.toggleCommentLines = function() {
        var state = this.session.getState(this.getCursorPosition().row),
          rows = this.$getSelectedRows();
        this.session
          .getMode()
          .toggleCommentLines(state, this.session, rows.first, rows.last);
      };
      this.toggleBlockComment = function() {
        var cursor = this.getCursorPosition(),
          state = this.session.getState(cursor.row),
          range = this.getSelectionRange();
        this.session
          .getMode()
          .toggleBlockComment(state, this.session, range, cursor);
      };
      this.getNumberAt = function(row, column) {
        var _numberRx = /[\-]?[0-9]+(?:\.[0-9]+)?/g;
        _numberRx.lastIndex = 0;
        var s = this.session.getLine(row);
        while (_numberRx.lastIndex < column) {
          var m = _numberRx.exec(s);
          if (m.index <= column && m.index + m[0].length >= column) {
            var number = {
              value: m[0],
              start: m.index,
              end: m.index + m[0].length
            };
            return number;
          }
        }
        return null;
      };
      this.modifyNumber = function(amount) {
        var row = this.selection.getCursor().row,
          column = this.selection.getCursor().column,
          charRange = new Range(row, column - 1, row, column),
          c = this.session.getTextRange(charRange);
        if (!isNaN(parseFloat(c)) && isFinite(c)) {
          var nr = this.getNumberAt(row, column);
          if (nr) {
            var fp =
                0 <= nr.value.indexOf(".")
                  ? nr.start + nr.value.indexOf(".") + 1
                  : nr.end,
              decimals = nr.start + nr.value.length - fp,
              t = parseFloat(nr.value);
            t *= _Mathpow3(10, decimals);
            if (fp !== nr.end && column < fp) {
              amount *= _Mathpow3(10, nr.end - column - 1);
            } else {
              amount *= _Mathpow3(10, nr.end - column);
            }
            t += amount;
            t /= _Mathpow3(10, decimals);
            var nnr = t.toFixed(decimals),
              replaceRange = new Range(row, nr.start, row, nr.end);
            this.session.replace(replaceRange, nnr);
            this.moveCursorTo(
              row,
              _Mathmax6(nr.start + 1, column + nnr.length - nr.value.length)
            );
          }
        } else {
          this.toggleWord();
        }
      };
      this.$toggleWordPairs = [
        ["first", "last"],
        ["true", "false"],
        ["yes", "no"],
        ["width", "height"],
        ["top", "bottom"],
        ["right", "left"],
        ["on", "off"],
        ["x", "y"],
        ["get", "set"],
        ["max", "min"],
        ["horizontal", "vertical"],
        ["show", "hide"],
        ["add", "remove"],
        ["up", "down"],
        ["before", "after"],
        ["even", "odd"],
        ["inside", "outside"],
        ["next", "previous"],
        ["increase", "decrease"],
        ["attach", "detach"],
        ["&&", "||"],
        ["==", "!="]
      ];
      this.toggleWord = function() {
        var row = this.selection.getCursor().row,
          column = this.selection.getCursor().column;
        this.selection.selectWord();
        var currentState = this.getSelectedText(),
          currWordStart = this.selection.getWordRange().start.column,
          wordParts = currentState
            .replace(/([a-z]+|[A-Z]+)(?=[A-Z_]|$)/g, "$1 ")
            .split(/\s/),
          delta = column - currWordStart - 1;
        if (0 > delta) delta = 0;
        var curLength = 0,
          itLength = 0,
          that = this;
        if (currentState.match(/[A-Za-z0-9_]+/)) {
          wordParts.forEach(function(item, i) {
            itLength = curLength + item.length;
            if (delta >= curLength && delta <= itLength) {
              currentState = item;
              that.selection.clearSelection();
              that.moveCursorTo(row, curLength + currWordStart);
              that.selection.selectTo(row, itLength + currWordStart);
            }
            curLength = itLength;
          });
        }
        for (
          var wordPairs = this.$toggleWordPairs, reg, i = 0, item;
          i < wordPairs.length;
          i++
        ) {
          item = wordPairs[i];
          for (var j = 0; 1 >= j; j++) {
            var negate = +!j,
              firstCondition = currentState.match(
                new RegExp(
                  "^\\s?_?(" + lang.escapeRegExp(item[j]) + ")\\s?$",
                  "i"
                )
              );
            if (firstCondition) {
              var secondCondition = currentState.match(
                new RegExp(
                  "([_]|^|\\s)(" +
                    lang.escapeRegExp(firstCondition[1]) +
                    ")($|\\s)",
                  "g"
                )
              );
              if (secondCondition) {
                reg = currentState.replace(
                  new RegExp(lang.escapeRegExp(item[j]), "i"),
                  function(result) {
                    var res = item[negate];
                    if (result.toUpperCase() == result) {
                      res = res.toUpperCase();
                    } else if (
                      result.charAt(0).toUpperCase() == result.charAt(0)
                    ) {
                      res =
                        res.substr(0, 0) +
                        item[negate].charAt(0).toUpperCase() +
                        res.substr(1);
                    }
                    return res;
                  }
                );
                this.insert(reg);
                reg = "";
              }
            }
          }
        }
      };
      this.removeLines = function() {
        var rows = this.$getSelectedRows();
        this.session.removeFullLines(rows.first, rows.last);
        this.clearSelection();
      };
      this.duplicateSelection = function() {
        var sel = this.selection,
          doc = this.session,
          range = sel.getRange(),
          reverse = sel.isBackwards();
        if (range.isEmpty()) {
          var row = range.start.row;
          doc.duplicateLines(row, row);
        } else {
          var point = reverse ? range.start : range.end,
            endPoint = doc.insert(point, doc.getTextRange(range), !1);
          range.start = point;
          range.end = endPoint;
          sel.setSelectionRange(range, reverse);
        }
      };
      this.moveLinesDown = function() {
        this.$moveLines(1, !1);
      };
      this.moveLinesUp = function() {
        this.$moveLines(-1, !1);
      };
      this.moveText = function(range, toPosition, copy) {
        return this.session.moveText(range, toPosition, copy);
      };
      this.copyLinesUp = function() {
        this.$moveLines(-1, !0);
      };
      this.copyLinesDown = function() {
        this.$moveLines(1, !0);
      };
      this.$moveLines = function(dir, copy) {
        var rows,
          moved,
          selection = this.selection;
        if (!selection.inMultiSelectMode || this.inVirtualSelectionMode) {
          var range = selection.toOrientedRange();
          rows = this.$getSelectedRows(range);
          moved = this.session.$moveLines(
            rows.first,
            rows.last,
            copy ? 0 : dir
          );
          if (copy && -1 == dir) moved = 0;
          range.moveBy(moved, 0);
          selection.fromOrientedRange(range);
        } else {
          var ranges = selection.rangeList.ranges;
          selection.rangeList.detach(this.session);
          this.inVirtualSelectionMode = !0;
          for (
            var diff = 0, totalDiff = 0, l = ranges.length, i = 0, rangeIndex;
            i < l;
            i++
          ) {
            rangeIndex = i;
            ranges[i].moveBy(diff, 0);
            rows = this.$getSelectedRows(ranges[i]);
            var first = rows.first,
              last = rows.last;
            while (++i < l) {
              if (totalDiff) ranges[i].moveBy(totalDiff, 0);
              var subRows = this.$getSelectedRows(ranges[i]);
              if (copy && subRows.first != last) break;
              else if (!copy && subRows.first > last + 1) break;
              last = subRows.last;
            }
            i--;
            diff = this.session.$moveLines(first, last, copy ? 0 : dir);
            if (copy && -1 == dir) rangeIndex = i + 1;
            while (rangeIndex <= i) {
              ranges[rangeIndex].moveBy(diff, 0);
              rangeIndex++;
            }
            if (!copy) diff = 0;
            totalDiff += diff;
          }
          selection.fromOrientedRange(selection.ranges[0]);
          selection.rangeList.attach(this.session);
          this.inVirtualSelectionMode = !1;
        }
      };
      this.$getSelectedRows = function(range) {
        range = (range || this.getSelectionRange()).collapseRows();
        return {
          first: this.session.getRowFoldStart(range.start.row),
          last: this.session.getRowFoldEnd(range.end.row)
        };
      };
      this.onCompositionStart = function(compositionState) {
        this.renderer.showComposition(compositionState);
      };
      this.onCompositionUpdate = function(text) {
        this.renderer.setCompositionText(text);
      };
      this.onCompositionEnd = function() {
        this.renderer.hideComposition();
      };
      this.getFirstVisibleRow = function() {
        return this.renderer.getFirstVisibleRow();
      };
      this.getLastVisibleRow = function() {
        return this.renderer.getLastVisibleRow();
      };
      this.isRowVisible = function(row) {
        return (
          row >= this.getFirstVisibleRow() && row <= this.getLastVisibleRow()
        );
      };
      this.isRowFullyVisible = function(row) {
        return (
          row >= this.renderer.getFirstFullyVisibleRow() &&
          row <= this.renderer.getLastFullyVisibleRow()
        );
      };
      this.$getVisibleRowCount = function() {
        return (
          this.renderer.getScrollBottomRow() -
          this.renderer.getScrollTopRow() +
          1
        );
      };
      this.$moveByPage = function(dir, select) {
        var renderer = this.renderer,
          config = this.renderer.layerConfig,
          rows = dir * _Mathfloor2(config.height / config.lineHeight);
        if (!0 === select) {
          this.selection.$moveSelection(function() {
            this.moveCursorBy(rows, 0);
          });
        } else if (!1 === select) {
          this.selection.moveCursorBy(rows, 0);
          this.selection.clearSelection();
        }
        var scrollTop = renderer.scrollTop;
        renderer.scrollBy(0, rows * config.lineHeight);
        if (null != select) renderer.scrollCursorIntoView(null, 0.5);
        renderer.animateScrolling(scrollTop);
      };
      this.selectPageDown = function() {
        this.$moveByPage(1, !0);
      };
      this.selectPageUp = function() {
        this.$moveByPage(-1, !0);
      };
      this.gotoPageDown = function() {
        this.$moveByPage(1, !1);
      };
      this.gotoPageUp = function() {
        this.$moveByPage(-1, !1);
      };
      this.scrollPageDown = function() {
        this.$moveByPage(1);
      };
      this.scrollPageUp = function() {
        this.$moveByPage(-1);
      };
      this.scrollToRow = function(row) {
        this.renderer.scrollToRow(row);
      };
      this.scrollToLine = function(line, center, animate, callback) {
        this.renderer.scrollToLine(line, center, animate, callback);
      };
      this.centerSelection = function() {
        var range = this.getSelectionRange(),
          pos = {
            row: _Mathfloor2(
              range.start.row + (range.end.row - range.start.row) / 2
            ),
            column: _Mathfloor2(
              range.start.column + (range.end.column - range.start.column) / 2
            )
          };
        this.renderer.alignCursor(pos, 0.5);
      };
      this.getCursorPosition = function() {
        return this.selection.getCursor();
      };
      this.getCursorPositionScreen = function() {
        return this.session.documentToScreenPosition(this.getCursorPosition());
      };
      this.getSelectionRange = function() {
        return this.selection.getRange();
      };
      this.selectAll = function() {
        this.selection.selectAll();
      };
      this.clearSelection = function() {
        this.selection.clearSelection();
      };
      this.moveCursorTo = function(row, column) {
        this.selection.moveCursorTo(row, column);
      };
      this.moveCursorToPosition = function(pos) {
        this.selection.moveCursorToPosition(pos);
      };
      this.jumpToMatching = function(select, expand) {
        var cursor = this.getCursorPosition(),
          iterator = new TokenIterator(this.session, cursor.row, cursor.column),
          prevToken = iterator.getCurrentToken(),
          token = prevToken || iterator.stepForward();
        if (!token) return;
        var matchType,
          found = !1,
          depth = {},
          i = cursor.column - token.start,
          bracketType,
          brackets = {
            ")": "(",
            "(": "(",
            "]": "[",
            "[": "[",
            "{": "{",
            "}": "{"
          };
        do {
          if (token.value.match(/[{}()\[\]]/g)) {
            for (; i < token.value.length && !found; i++) {
              if (!brackets[token.value[i]]) {
                continue;
              }
              bracketType =
                brackets[token.value[i]] +
                "." +
                token.type.replace("rparen", "lparen");
              if (isNaN(depth[bracketType])) {
                depth[bracketType] = 0;
              }
              switch (token.value[i]) {
                case "(":
                case "[":
                case "{":
                  depth[bracketType]++;
                  break;
                case ")":
                case "]":
                case "}":
                  depth[bracketType]--;
                  if (-1 === depth[bracketType]) {
                    matchType = "bracket";
                    found = !0;
                  }
                  break;
              }
            }
          } else if (-1 !== token.type.indexOf("tag-name")) {
            if (isNaN(depth[token.value])) {
              depth[token.value] = 0;
            }
            if ("<" === prevToken.value) {
              depth[token.value]++;
            } else if ("</" === prevToken.value) {
              depth[token.value]--;
            }
            if (-1 === depth[token.value]) {
              matchType = "tag";
              found = !0;
            }
          }
          if (!found) {
            prevToken = token;
            token = iterator.stepForward();
            i = 0;
          }
        } while (token && !found);
        if (!matchType) return;
        var range, pos;
        if ("bracket" === matchType) {
          range = this.session.getBracketRange(cursor);
          if (!range) {
            range = new Range(
              iterator.getCurrentTokenRow(),
              iterator.getCurrentTokenColumn() + i - 1,
              iterator.getCurrentTokenRow(),
              iterator.getCurrentTokenColumn() + i - 1
            );
            pos = range.start;
            if (
              expand ||
              (pos.row === cursor.row &&
                2 > _Mathabs4(pos.column - cursor.column))
            )
              range = this.session.getBracketRange(pos);
          }
        } else if ("tag" === matchType) {
          if (token && -1 !== token.type.indexOf("tag-name"))
            var tag = token.value;
          else return;
          range = new Range(
            iterator.getCurrentTokenRow(),
            iterator.getCurrentTokenColumn() - 2,
            iterator.getCurrentTokenRow(),
            iterator.getCurrentTokenColumn() - 2
          );
          if (0 === range.compare(cursor.row, cursor.column)) {
            found = !1;
            do {
              token = prevToken;
              prevToken = iterator.stepBackward();
              if (prevToken) {
                if (-1 !== prevToken.type.indexOf("tag-close")) {
                  range.setEnd(
                    iterator.getCurrentTokenRow(),
                    iterator.getCurrentTokenColumn() + 1
                  );
                }
                if (
                  token.value === tag &&
                  -1 !== token.type.indexOf("tag-name")
                ) {
                  if ("<" === prevToken.value) {
                    depth[tag]++;
                  } else if ("</" === prevToken.value) {
                    depth[tag]--;
                  }
                  if (0 === depth[tag]) found = !0;
                }
              }
            } while (prevToken && !found);
          }
          if (token && token.type.indexOf("tag-name")) {
            pos = range.start;
            if (
              pos.row == cursor.row &&
              2 > _Mathabs4(pos.column - cursor.column)
            )
              pos = range.end;
          }
        }
        pos = (range && range.cursor) || pos;
        if (pos) {
          if (select) {
            if (range && expand) {
              this.selection.setRange(range);
            } else if (range && range.isEqual(this.getSelectionRange())) {
              this.clearSelection();
            } else {
              this.selection.selectTo(pos.row, pos.column);
            }
          } else {
            this.selection.moveTo(pos.row, pos.column);
          }
        }
      };
      this.gotoLine = function(lineNumber, column, animate) {
        this.selection.clearSelection();
        this.session.unfold({ row: lineNumber - 1, column: column || 0 });
        this.exitMultiSelectMode && this.exitMultiSelectMode();
        this.moveCursorTo(lineNumber - 1, column || 0);
        if (!this.isRowFullyVisible(lineNumber - 1))
          this.scrollToLine(lineNumber - 1, !0, animate);
      };
      this.navigateTo = function(row, column) {
        this.selection.moveTo(row, column);
      };
      this.navigateUp = function(times) {
        if (this.selection.isMultiLine() && !this.selection.isBackwards()) {
          var selectionStart = this.selection.anchor.getPosition();
          return this.moveCursorToPosition(selectionStart);
        }
        this.selection.clearSelection();
        this.selection.moveCursorBy(-times || -1, 0);
      };
      this.navigateDown = function(times) {
        if (this.selection.isMultiLine() && this.selection.isBackwards()) {
          var selectionEnd = this.selection.anchor.getPosition();
          return this.moveCursorToPosition(selectionEnd);
        }
        this.selection.clearSelection();
        this.selection.moveCursorBy(times || 1, 0);
      };
      this.navigateLeft = function(times) {
        if (!this.selection.isEmpty()) {
          var selectionStart = this.getSelectionRange().start;
          this.moveCursorToPosition(selectionStart);
        } else {
          times = times || 1;
          while (times--) {
            this.selection.moveCursorLeft();
          }
        }
        this.clearSelection();
      };
      this.navigateRight = function(times) {
        if (!this.selection.isEmpty()) {
          var selectionEnd = this.getSelectionRange().end;
          this.moveCursorToPosition(selectionEnd);
        } else {
          times = times || 1;
          while (times--) {
            this.selection.moveCursorRight();
          }
        }
        this.clearSelection();
      };
      this.navigateLineStart = function() {
        this.selection.moveCursorLineStart();
        this.clearSelection();
      };
      this.navigateLineEnd = function() {
        this.selection.moveCursorLineEnd();
        this.clearSelection();
      };
      this.navigateFileEnd = function() {
        this.selection.moveCursorFileEnd();
        this.clearSelection();
      };
      this.navigateFileStart = function() {
        this.selection.moveCursorFileStart();
        this.clearSelection();
      };
      this.navigateWordRight = function() {
        this.selection.moveCursorWordRight();
        this.clearSelection();
      };
      this.navigateWordLeft = function() {
        this.selection.moveCursorWordLeft();
        this.clearSelection();
      };
      this.replace = function(replacement, options) {
        if (options) this.$search.set(options);
        var range = this.$search.find(this.session),
          replaced = 0;
        if (!range) return replaced;
        if (this.$tryReplace(range, replacement)) {
          replaced = 1;
        }
        this.selection.setSelectionRange(range);
        this.renderer.scrollSelectionIntoView(range.start, range.end);
        return replaced;
      };
      this.replaceAll = function(replacement, options) {
        if (options) {
          this.$search.set(options);
        }
        var ranges = this.$search.findAll(this.session),
          replaced = 0;
        if (!ranges.length) return replaced;
        var selection = this.getSelectionRange();
        this.selection.moveTo(0, 0);
        for (var i = ranges.length - 1; 0 <= i; --i) {
          if (this.$tryReplace(ranges[i], replacement)) {
            replaced++;
          }
        }
        this.selection.setSelectionRange(selection);
        return replaced;
      };
      this.$tryReplace = function(range, replacement) {
        var input = this.session.getTextRange(range);
        replacement = this.$search.replace(input, replacement);
        if (null !== replacement) {
          range.end = this.session.replace(range, replacement);
          return range;
        } else {
          return null;
        }
      };
      this.getLastSearchOptions = function() {
        return this.$search.getOptions();
      };
      this.find = function(needle, options, animate) {
        if (!options) options = {};
        if (
          "string" == typeof needle ||
          babelHelpers.instanceof(needle, RegExp)
        )
          options.needle = needle;
        else if ("object" == babelHelpers.typeof(needle))
          oop.mixin(options, needle);
        var range = this.selection.getRange();
        if (null == options.needle) {
          needle =
            this.session.getTextRange(range) || this.$search.$options.needle;
          if (!needle) {
            range = this.session.getWordRange(
              range.start.row,
              range.start.column
            );
            needle = this.session.getTextRange(range);
          }
          this.$search.set({ needle: needle });
        }
        this.$search.set(options);
        if (!options.start) this.$search.set({ start: range });
        var newRange = this.$search.find(this.session);
        if (options.preventScroll) return newRange;
        if (newRange) {
          this.revealRange(newRange, animate);
          return newRange;
        }
        if (options.backwards) range.start = range.end;
        else range.end = range.start;
        this.selection.setRange(range);
      };
      this.findNext = function(options, animate) {
        this.find({ skipCurrent: !0, backwards: !1 }, options, animate);
      };
      this.findPrevious = function(options, animate) {
        this.find(options, { skipCurrent: !0, backwards: !0 }, animate);
      };
      this.revealRange = function(range, animate) {
        this.session.unfold(range);
        this.selection.setSelectionRange(range);
        var scrollTop = this.renderer.scrollTop;
        this.renderer.scrollSelectionIntoView(range.start, range.end, 0.5);
        if (!1 !== animate) this.renderer.animateScrolling(scrollTop);
      };
      this.undo = function() {
        this.session.getUndoManager().undo(this.session);
        this.renderer.scrollCursorIntoView(null, 0.5);
      };
      this.redo = function() {
        this.session.getUndoManager().redo(this.session);
        this.renderer.scrollCursorIntoView(null, 0.5);
      };
      this.destroy = function() {
        this.renderer.destroy();
        this._signal("destroy", this);
        if (this.session) {
          this.session.destroy();
        }
      };
      this.setAutoScrollEditorIntoView = function(enable) {
        if (!enable) return;
        var rect,
          self = this,
          shouldScroll = !1;
        if (!this.$scrollAnchor)
          this.$scrollAnchor = document.createElement("div");
        var scrollAnchor = this.$scrollAnchor;
        scrollAnchor.style.cssText = "position:absolute";
        this.container.insertBefore(scrollAnchor, this.container.firstChild);
        var onChangeSelection = this.on("changeSelection", function() {
            shouldScroll = !0;
          }),
          onBeforeRender = this.renderer.on("beforeRender", function() {
            if (shouldScroll)
              rect = self.renderer.container.getBoundingClientRect();
          }),
          onAfterRender = this.renderer.on("afterRender", function() {
            if (
              shouldScroll &&
              rect &&
              (self.isFocused() ||
                (self.searchBox && self.searchBox.isFocused()))
            ) {
              var renderer = self.renderer,
                pos = renderer.$cursorLayer.$pixelPos,
                config = renderer.layerConfig,
                top = pos.top - config.offset;
              if (0 <= pos.top && 0 > top + rect.top) {
                shouldScroll = !0;
              } else if (
                pos.top < config.height &&
                pos.top + rect.top + config.lineHeight > window.innerHeight
              ) {
                shouldScroll = !1;
              } else {
                shouldScroll = null;
              }
              if (null != shouldScroll) {
                scrollAnchor.style.top = top + "px";
                scrollAnchor.style.left = pos.left + "px";
                scrollAnchor.style.height = config.lineHeight + "px";
                scrollAnchor.scrollIntoView(shouldScroll);
              }
              shouldScroll = rect = null;
            }
          });
        this.setAutoScrollEditorIntoView = function(enable) {
          if (enable) return;
          delete this.setAutoScrollEditorIntoView;
          this.off("changeSelection", onChangeSelection);
          this.renderer.off("afterRender", onAfterRender);
          this.renderer.off("beforeRender", onBeforeRender);
        };
      };
      this.$resetCursorStyle = function() {
        var style = this.$cursorStyle || "ace",
          cursorLayer = this.renderer.$cursorLayer;
        if (!cursorLayer) return;
        cursorLayer.setSmoothBlinking(/smooth/.test(style));
        cursorLayer.isBlinking = !this.$readOnly && "wide" != style;
        dom.setCssClass(
          cursorLayer.element,
          "ace_slim-cursors",
          /slim/.test(style)
        );
      };
    }.call(Editor.prototype));
    config.defineOptions(Editor.prototype, "editor", {
      selectionStyle: {
        set: function set(style) {
          this.onSelectionChange();
          this._signal("changeSelectionStyle", { data: style });
        },
        initialValue: "line"
      },
      highlightActiveLine: {
        set: function set() {
          this.$updateHighlightActiveLine();
        },
        initialValue: !0
      },
      highlightSelectedWord: {
        set: function set(shouldHighlight) {
          this.$onSelectionChange();
        },
        initialValue: !0
      },
      readOnly: {
        set: function set(readOnly) {
          this.textInput.setReadOnly(readOnly);
          this.$resetCursorStyle();
        },
        initialValue: !1
      },
      copyWithEmptySelection: {
        set: function set(value) {
          this.textInput.setCopyWithEmptySelection(value);
        },
        initialValue: !1
      },
      cursorStyle: {
        set: function set(val) {
          this.$resetCursorStyle();
        },
        values: ["ace", "slim", "smooth", "wide"],
        initialValue: "ace"
      },
      mergeUndoDeltas: { values: [!1, !0, "always"], initialValue: !0 },
      behavioursEnabled: { initialValue: !0 },
      wrapBehavioursEnabled: { initialValue: !0 },
      autoScrollEditorIntoView: {
        set: function set(val) {
          this.setAutoScrollEditorIntoView(val);
        }
      },
      keyboardHandler: {
        set: function set(val) {
          this.setKeyboardHandler(val);
        },
        get: function get() {
          return this.$keybindingId;
        },
        handlesSet: !0
      },
      value: {
        set: function set(val) {
          this.session.setValue(val);
        },
        get: function get() {
          return this.getValue();
        },
        handlesSet: !0,
        hidden: !0
      },
      session: {
        set: function set(val) {
          this.setSession(val);
        },
        get: function get() {
          return this.session;
        },
        handlesSet: !0,
        hidden: !0
      },
      showLineNumbers: {
        set: function set(show) {
          this.renderer.$gutterLayer.setShowLineNumbers(show);
          this.renderer.$loop.schedule(this.renderer.CHANGE_GUTTER);
          if (show && this.$relativeLineNumbers)
            relativeNumberRenderer.attach(this);
          else relativeNumberRenderer.detach(this);
        },
        initialValue: !0
      },
      relativeLineNumbers: {
        set: function set(value) {
          if (this.$showLineNumbers && value)
            relativeNumberRenderer.attach(this);
          else relativeNumberRenderer.detach(this);
        }
      },
      hScrollBarAlwaysVisible: "renderer",
      vScrollBarAlwaysVisible: "renderer",
      highlightGutterLine: "renderer",
      animatedScroll: "renderer",
      showInvisibles: "renderer",
      showPrintMargin: "renderer",
      printMarginColumn: "renderer",
      printMargin: "renderer",
      fadeFoldWidgets: "renderer",
      showFoldWidgets: "renderer",
      displayIndentGuides: "renderer",
      showGutter: "renderer",
      fontSize: "renderer",
      fontFamily: "renderer",
      maxLines: "renderer",
      minLines: "renderer",
      scrollPastEnd: "renderer",
      fixedWidthGutter: "renderer",
      theme: "renderer",
      hasCssTransforms: "renderer",
      maxPixelHeight: "renderer",
      useTextareaForIME: "renderer",
      scrollSpeed: "$mouseHandler",
      dragDelay: "$mouseHandler",
      dragEnabled: "$mouseHandler",
      focusTimeout: "$mouseHandler",
      tooltipFollowsMouse: "$mouseHandler",
      firstLineNumber: "session",
      overwrite: "session",
      newLineMode: "session",
      useWorker: "session",
      useSoftTabs: "session",
      navigateWithinSoftTabs: "session",
      tabSize: "session",
      wrap: "session",
      indentedSoftWrap: "session",
      foldStyle: "session",
      mode: "session"
    });
    var relativeNumberRenderer = {
      getText: function getText(session, row) {
        return (
          (_Mathabs4(session.selection.lead.row - row) ||
            row + 1 + (9 > row ? "\xB7" : "")) + ""
        );
      },
      getWidth: function getWidth(session, lastLineNumber, config) {
        return (
          _Mathmax6(
            lastLineNumber.toString().length,
            (config.lastRow + 1).toString().length,
            2
          ) * config.characterWidth
        );
      },
      update: function update(e, editor) {
        editor.renderer.$loop.schedule(editor.renderer.CHANGE_GUTTER);
      },
      attach: function attach(editor) {
        editor.renderer.$gutterLayer.$renderer = this;
        editor.on("changeSelection", this.update);
        this.update(null, editor);
      },
      detach: function detach(editor) {
        if (editor.renderer.$gutterLayer.$renderer == this)
          editor.renderer.$gutterLayer.$renderer = null;
        editor.off("changeSelection", this.update);
        this.update(null, editor);
      }
    };
    exports.Editor = Editor;
  }
);
ace.define(
  "ace/undomanager",
  ["require", "exports", "module", "ace/range"],
  function(require, exports, module) {
    "use strict";
    var UndoManager = function UndoManager() {
      this.$maxRev = 0;
      this.$fromUndo = !1;
      this.reset();
    };
    (function() {
      this.addSession = function(session) {
        this.$session = session;
      };
      this.add = function(delta, allowMerge, session) {
        if (this.$fromUndo) return;
        if (delta == this.$lastDelta) return;
        if (!1 === allowMerge || !this.lastDeltas) {
          this.lastDeltas = [];
          this.$undoStack.push(this.lastDeltas);
          delta.id = this.$rev = ++this.$maxRev;
        }
        if ("remove" == delta.action || "insert" == delta.action)
          this.$lastDelta = delta;
        this.lastDeltas.push(delta);
      };
      this.addSelection = function(selection, rev) {
        this.selections.push({ value: selection, rev: rev || this.$rev });
      };
      this.startNewGroup = function() {
        this.lastDeltas = null;
        return this.$rev;
      };
      this.markIgnored = function(from, to) {
        if (null == to) to = this.$rev + 1;
        for (var stack = this.$undoStack, i = stack.length, delta; i--; ) {
          delta = stack[i][0];
          if (delta.id <= from) break;
          if (delta.id < to) delta.ignore = !0;
        }
        this.lastDeltas = null;
      };
      this.getSelection = function(rev, after) {
        for (var stack = this.selections, i = stack.length, selection; i--; ) {
          selection = stack[i];
          if (selection.rev < rev) {
            if (after) selection = stack[i + 1];
            return selection;
          }
        }
      };
      this.getRevision = function() {
        return this.$rev;
      };
      this.getDeltas = function(from, to) {
        if (null == to) to = this.$rev + 1;
        for (
          var stack = this.$undoStack,
            end = null,
            start = 0,
            i = stack.length,
            delta;
          i--;

        ) {
          delta = stack[i][0];
          if (delta.id < to && !end) end = i + 1;
          if (delta.id <= from) {
            start = i + 1;
            break;
          }
        }
        return stack.slice(start, end);
      };
      this.getChangedRanges = function(from, to) {
        if (null == to) to = this.$rev + 1;
      };
      this.getChangedLines = function(from, to) {
        if (null == to) to = this.$rev + 1;
      };
      this.undo = function(session, dontSelect) {
        this.lastDeltas = null;
        var stack = this.$undoStack;
        if (!rearrangeUndoStack(stack, stack.length)) return;
        if (!session) session = this.$session;
        if (this.$redoStackBaseRev !== this.$rev && this.$redoStack.length)
          this.$redoStack = [];
        this.$fromUndo = !0;
        var deltaSet = stack.pop(),
          undoSelectionRange = null;
        if (deltaSet && deltaSet.length) {
          undoSelectionRange = session.undoChanges(deltaSet, dontSelect);
          this.$redoStack.push(deltaSet);
          this.$syncRev();
        }
        this.$fromUndo = !1;
        return undoSelectionRange;
      };
      this.redo = function(session, dontSelect) {
        this.lastDeltas = null;
        if (!session) session = this.$session;
        this.$fromUndo = !0;
        if (this.$redoStackBaseRev != this.$rev) {
          var diff = this.getDeltas(this.$redoStackBaseRev, this.$rev + 1);
          rebaseRedoStack(this.$redoStack, diff);
          this.$redoStackBaseRev = this.$rev;
          this.$redoStack.forEach(function(x) {
            x[0].id = ++this.$maxRev;
          }, this);
        }
        var deltaSet = this.$redoStack.pop(),
          redoSelectionRange = null;
        if (deltaSet) {
          redoSelectionRange = session.redoChanges(deltaSet, dontSelect);
          this.$undoStack.push(deltaSet);
          this.$syncRev();
        }
        this.$fromUndo = !1;
        return redoSelectionRange;
      };
      this.$syncRev = function() {
        var stack = this.$undoStack,
          nextDelta = stack[stack.length - 1],
          id = (nextDelta && nextDelta[0].id) || 0;
        this.$redoStackBaseRev = id;
        this.$rev = id;
      };
      this.reset = function() {
        this.lastDeltas = null;
        this.$lastDelta = null;
        this.$undoStack = [];
        this.$redoStack = [];
        this.$rev = 0;
        this.mark = 0;
        this.$redoStackBaseRev = this.$rev;
        this.selections = [];
      };
      this.canUndo = function() {
        return 0 < this.$undoStack.length;
      };
      this.canRedo = function() {
        return 0 < this.$redoStack.length;
      };
      this.bookmark = function(rev) {
        if (rev == void 0) rev = this.$rev;
        this.mark = rev;
      };
      this.isAtBookmark = function() {
        return this.$rev === this.mark;
      };
      this.toJSON = function() {};
      this.fromJSON = function() {};
      this.hasUndo = this.canUndo;
      this.hasRedo = this.canRedo;
      this.isClean = this.isAtBookmark;
      this.markClean = this.bookmark;
      this.$prettyPrint = function(delta) {
        if (delta) return stringifyDelta(delta);
        return (
          stringifyDelta(this.$undoStack) +
          "\n---\n" +
          stringifyDelta(this.$redoStack)
        );
      };
    }.call(UndoManager.prototype));
    function rearrangeUndoStack(stack, pos) {
      for (var i = pos, deltaSet; i--; ) {
        deltaSet = stack[i];
        if (deltaSet && !deltaSet[0].ignore) {
          while (i < pos - 1) {
            var swapped = swapGroups(stack[i], stack[i + 1]);
            stack[i] = swapped[0];
            stack[i + 1] = swapped[1];
            i++;
          }
          return !0;
        }
      }
    }
    var Range = require("./range").Range,
      cmp = Range.comparePoints,
      comparePoints = Range.comparePoints;
    function $updateMarkers(delta) {
      var isInsert = "insert" == delta.action,
        start = delta.start,
        end = delta.end,
        rowShift = (end.row - start.row) * (isInsert ? 1 : -1),
        colShift = (end.column - start.column) * (isInsert ? 1 : -1);
      if (isInsert) end = start;
      for (var i in this.marks) {
        var point = this.marks[i],
          cmp = comparePoints(point, start);
        if (0 > cmp) {
          continue;
        }
        if (0 === cmp) {
          if (isInsert) {
            if (1 == point.bias) {
              cmp = 1;
            } else {
              -1 == point.bias;
              continue;
            }
          }
        }
        var cmp2 = isInsert ? cmp : comparePoints(point, end);
        if (0 < cmp2) {
          point.row += rowShift;
          point.column += point.row == end.row ? colShift : 0;
          continue;
        }
        if (!isInsert && 0 >= cmp2) {
          point.row = start.row;
          point.column = start.column;
          if (0 === cmp2) point.bias = 1;
        }
      }
    }
    function clonePos(pos) {
      return { row: pos.row, column: pos.column };
    }
    function cloneDelta(d) {
      return {
        start: clonePos(d.start),
        end: clonePos(d.end),
        action: d.action,
        lines: d.lines.slice()
      };
    }
    function stringifyDelta(d) {
      d = d || this;
      if (Array.isArray(d)) {
        return d.map(stringifyDelta).join("\n");
      }
      var type = "";
      if (d.action) {
        type = "insert" == d.action ? "+" : "-";
        type += "[" + d.lines + "]";
      } else if (d.value) {
        if (Array.isArray(d.value)) {
          type = d.value.map(stringifyRange).join("\n");
        } else {
          type = stringifyRange(d.value);
        }
      }
      if (d.start) {
        type += stringifyRange(d);
      }
      if (d.id || d.rev) {
        type += "\t(" + (d.id || d.rev) + ")";
      }
      return type;
    }
    function stringifyRange(r) {
      return (
        r.start.row +
        ":" +
        r.start.column +
        "=>" +
        r.end.row +
        ":" +
        r.end.column
      );
    }
    function swap(d1, d2) {
      var i1 = "insert" == d1.action,
        i2 = "insert" == d2.action;
      if (i1 && i2) {
        if (0 <= cmp(d2.start, d1.end)) {
          shift(d2, d1, -1);
        } else if (0 >= cmp(d2.start, d1.start)) {
          shift(d1, d2, +1);
        } else {
          return null;
        }
      } else if (i1 && !i2) {
        if (0 <= cmp(d2.start, d1.end)) {
          shift(d2, d1, -1);
        } else if (0 >= cmp(d2.end, d1.start)) {
          shift(d1, d2, -1);
        } else {
          return null;
        }
      } else if (!i1 && i2) {
        if (0 <= cmp(d2.start, d1.start)) {
          shift(d2, d1, +1);
        } else if (0 >= cmp(d2.start, d1.start)) {
          shift(d1, d2, +1);
        } else {
          return null;
        }
      } else if (!i1 && !i2) {
        if (0 <= cmp(d2.start, d1.start)) {
          shift(d2, d1, +1);
        } else if (0 >= cmp(d2.end, d1.start)) {
          shift(d1, d2, -1);
        } else {
          return null;
        }
      }
      return [d2, d1];
    }
    function swapGroups(ds1, ds2) {
      for (var i = ds1.length; i--; ) {
        for (var j = 0; j < ds2.length; j++) {
          if (!swap(ds1[i], ds2[j])) {
            while (i < ds1.length) {
              while (j--) {
                swap(ds2[j], ds1[i]);
              }
              j = ds2.length;
              i++;
            }
            return [ds1, ds2];
          }
        }
      }
      ds1.selectionBefore = ds2.selectionBefore = ds1.selectionAfter = ds2.selectionAfter = null;
      return [ds2, ds1];
    }
    function xform(d1, c1) {
      var i1 = "insert" == d1.action,
        i2 = "insert" == c1.action;
      if (i1 && i2) {
        if (0 > cmp(d1.start, c1.start)) {
          shift(c1, d1, 1);
        } else {
          shift(d1, c1, 1);
        }
      } else if (i1 && !i2) {
        if (0 <= cmp(d1.start, c1.end)) {
          shift(d1, c1, -1);
        } else if (0 >= cmp(d1.start, c1.start)) {
          shift(c1, d1, +1);
        } else {
          shift(d1, Range.fromPoints(c1.start, d1.start), -1);
          shift(c1, d1, +1);
        }
      } else if (!i1 && i2) {
        if (0 <= cmp(c1.start, d1.end)) {
          shift(c1, d1, -1);
        } else if (0 >= cmp(c1.start, d1.start)) {
          shift(d1, c1, +1);
        } else {
          shift(c1, Range.fromPoints(d1.start, c1.start), -1);
          shift(d1, c1, +1);
        }
      } else if (!i1 && !i2) {
        if (0 <= cmp(c1.start, d1.end)) {
          shift(c1, d1, -1);
        } else if (0 >= cmp(c1.end, d1.start)) {
          shift(d1, c1, -1);
        } else {
          var before, after;
          if (0 > cmp(d1.start, c1.start)) {
            before = d1;
            d1 = splitDelta(d1, c1.start);
          }
          if (0 < cmp(d1.end, c1.end)) {
            after = splitDelta(d1, c1.end);
          }
          shiftPos(c1.end, d1.start, d1.end, -1);
          if (after && !before) {
            d1.lines = after.lines;
            d1.start = after.start;
            d1.end = after.end;
            after = d1;
          }
          return [c1, before, after].filter(Boolean);
        }
      }
      return [c1, d1];
    }
    function shift(d1, d2, dir) {
      shiftPos(d1.start, d2.start, d2.end, dir);
      shiftPos(d1.end, d2.start, d2.end, dir);
    }
    function shiftPos(pos, start, end, dir) {
      if (pos.row == (1 == dir ? start : end).row) {
        pos.column += dir * (end.column - start.column);
      }
      pos.row += dir * (end.row - start.row);
    }
    function splitDelta(c, pos) {
      var lines = c.lines,
        end = c.end;
      c.end = clonePos(pos);
      var rowsBefore = c.end.row - c.start.row,
        otherLines = lines.splice(rowsBefore, lines.length),
        col = rowsBefore ? pos.column : pos.column - c.start.column;
      lines.push(otherLines[0].substring(0, col));
      otherLines[0] = otherLines[0].substr(col);
      var rest = {
        start: clonePos(pos),
        end: end,
        lines: otherLines,
        action: c.action
      };
      return rest;
    }
    function moveDeltasByOne(redoStack, d) {
      d = cloneDelta(d);
      for (var j = redoStack.length, deltaSet; j--; ) {
        deltaSet = redoStack[j];
        for (var i = 0; i < deltaSet.length; i++) {
          var x = deltaSet[i],
            xformed = xform(x, d);
          d = xformed[0];
          if (2 != xformed.length) {
            if (xformed[2]) {
              deltaSet.splice(i + 1, 1, xformed[1], xformed[2]);
              i++;
            } else if (!xformed[1]) {
              deltaSet.splice(i, 1);
              i--;
            }
          }
        }
        if (!deltaSet.length) {
          redoStack.splice(j, 1);
        }
      }
      return redoStack;
    }
    function rebaseRedoStack(redoStack, deltaSets) {
      for (var i = 0, deltas; i < deltaSets.length; i++) {
        deltas = deltaSets[i];
        for (var j = 0; j < deltas.length; j++) {
          moveDeltasByOne(redoStack, deltas[j]);
        }
      }
    }
    exports.UndoManager = UndoManager;
  }
);
ace.define(
  "ace/layer/lines",
  ["require", "exports", "module", "ace/lib/dom"],
  function(require, exports, module) {
    "use strict";
    var _Mathfloor3 = Math.floor,
      dom = require("../lib/dom"),
      Lines = function Lines(element, canvasHeight) {
        this.element = element;
        this.canvasHeight = canvasHeight || 5e5;
        this.element.style.height = 2 * this.canvasHeight + "px";
        this.cells = [];
        this.cellCache = [];
        this.$offsetCoefficient = 0;
      };
    (function() {
      this.moveContainer = function(config) {
        dom.translate(
          this.element,
          0,
          -((config.firstRowScreen * config.lineHeight) % this.canvasHeight) -
            config.offset * this.$offsetCoefficient
        );
      };
      this.pageChanged = function(oldConfig, newConfig) {
        return (
          _Mathfloor3(
            (oldConfig.firstRowScreen * oldConfig.lineHeight) /
              this.canvasHeight
          ) !==
          _Mathfloor3(
            (newConfig.firstRowScreen * newConfig.lineHeight) /
              this.canvasHeight
          )
        );
      };
      this.computeLineTop = function(row, config, session) {
        var screenTop = config.firstRowScreen * config.lineHeight,
          screenPage = _Mathfloor3(screenTop / this.canvasHeight),
          lineTop = session.documentToScreenRow(row, 0) * config.lineHeight;
        return lineTop - screenPage * this.canvasHeight;
      };
      this.computeLineHeight = function(row, config, session) {
        return config.lineHeight * session.getRowLength(row);
      };
      this.getLength = function() {
        return this.cells.length;
      };
      this.get = function(index) {
        return this.cells[index];
      };
      this.shift = function() {
        this.$cacheCell(this.cells.shift());
      };
      this.pop = function() {
        this.$cacheCell(this.cells.pop());
      };
      this.push = function(cell) {
        if (Array.isArray(cell)) {
          this.cells.push.apply(this.cells, cell);
          for (
            var fragment = dom.createFragment(this.element), i = 0;
            i < cell.length;
            i++
          ) {
            fragment.appendChild(cell[i].element);
          }
          this.element.appendChild(fragment);
        } else {
          this.cells.push(cell);
          this.element.appendChild(cell.element);
        }
      };
      this.unshift = function(cell) {
        if (Array.isArray(cell)) {
          this.cells.unshift.apply(this.cells, cell);
          for (
            var fragment = dom.createFragment(this.element), i = 0;
            i < cell.length;
            i++
          ) {
            fragment.appendChild(cell[i].element);
          }
          if (this.element.firstChild)
            this.element.insertBefore(fragment, this.element.firstChild);
          else this.element.appendChild(fragment);
        } else {
          this.cells.unshift(cell);
          this.element.insertAdjacentElement("afterbegin", cell.element);
        }
      };
      this.last = function() {
        if (this.cells.length) return this.cells[this.cells.length - 1];
        else return null;
      };
      this.$cacheCell = function(cell) {
        if (!cell) return;
        cell.element.remove();
        this.cellCache.push(cell);
      };
      this.createCell = function(row, config, session, initElement) {
        var cell = this.cellCache.pop();
        if (!cell) {
          var element = dom.createElement("div");
          if (initElement) initElement(element);
          this.element.appendChild(element);
          cell = { element: element, text: "", row: row };
        }
        cell.row = row;
        return cell;
      };
    }.call(Lines.prototype));
    exports.Lines = Lines;
  }
);
ace.define(
  "ace/layer/gutter",
  [
    "require",
    "exports",
    "module",
    "ace/lib/dom",
    "ace/lib/oop",
    "ace/lib/lang",
    "ace/lib/event_emitter",
    "ace/layer/lines"
  ],
  function(require, exports, module) {
    "use strict";
    var _Mathmin6 = Math.min,
      dom = require("../lib/dom"),
      oop = require("../lib/oop"),
      lang = require("../lib/lang"),
      EventEmitter = require("../lib/event_emitter").EventEmitter,
      Lines = require("./lines").Lines,
      Gutter = function Gutter(parentEl) {
        this.element = dom.createElement("div");
        this.element.className = "ace_layer ace_gutter-layer";
        parentEl.appendChild(this.element);
        this.setShowFoldWidgets(this.$showFoldWidgets);
        this.gutterWidth = 0;
        this.$annotations = [];
        this.$updateAnnotations = this.$updateAnnotations.bind(this);
        this.$lines = new Lines(this.element);
        this.$lines.$offsetCoefficient = 1;
      };
    (function() {
      oop.implement(this, EventEmitter);
      this.setSession = function(session) {
        if (this.session)
          this.session.removeEventListener("change", this.$updateAnnotations);
        this.session = session;
        if (session) session.on("change", this.$updateAnnotations);
      };
      this.addGutterDecoration = function(row, className) {
        if (window.console)
          console.warn &&
            console.warn("deprecated use session.addGutterDecoration");
        this.session.addGutterDecoration(row, className);
      };
      this.removeGutterDecoration = function(row, className) {
        if (window.console)
          console.warn &&
            console.warn("deprecated use session.removeGutterDecoration");
        this.session.removeGutterDecoration(row, className);
      };
      this.setAnnotations = function(annotations) {
        this.$annotations = [];
        for (var i = 0; i < annotations.length; i++) {
          var annotation = annotations[i],
            row = annotation.row,
            rowInfo = this.$annotations[row];
          if (!rowInfo) rowInfo = this.$annotations[row] = { text: [] };
          var annoText = annotation.text;
          annoText = annoText
            ? lang.escapeHTML(annoText)
            : annotation.html || "";
          if (-1 === rowInfo.text.indexOf(annoText))
            rowInfo.text.push(annoText);
          var type = annotation.type;
          if ("error" == type) rowInfo.className = " ace_error";
          else if ("warning" == type && " ace_error" != rowInfo.className)
            rowInfo.className = " ace_warning";
          else if ("info" == type && !rowInfo.className)
            rowInfo.className = " ace_info";
        }
      };
      this.$updateAnnotations = function(delta) {
        if (!this.$annotations.length) return;
        var firstRow = delta.start.row,
          len = delta.end.row - firstRow;
        if (0 === len) {
        } else if ("remove" == delta.action) {
          this.$annotations.splice(firstRow, len + 1, null);
        } else {
          var args = Array(len + 1);
          args.unshift(firstRow, 1);
          this.$annotations.splice.apply(this.$annotations, args);
        }
      };
      this.update = function(config) {
        this.config = config;
        var session = this.session,
          firstRow = config.firstRow,
          lastRow = _Mathmin6(
            config.lastRow + config.gutterOffset,
            session.getLength() - 1
          );
        this.oldLastRow = lastRow;
        this.config = config;
        this.$lines.moveContainer(config);
        this.$updateCursorRow();
        var fold = session.getNextFoldLine(firstRow),
          foldStart = fold ? fold.start.row : 1 / 0,
          cell = null,
          index = -1,
          row = firstRow;
        while (!0) {
          if (row > foldStart) {
            row = fold.end.row + 1;
            fold = session.getNextFoldLine(row, fold);
            foldStart = fold ? fold.start.row : 1 / 0;
          }
          if (row > lastRow) {
            while (this.$lines.getLength() > index + 1) {
              this.$lines.pop();
            }
            break;
          }
          cell = this.$lines.get(++index);
          if (cell) {
            cell.row = row;
          } else {
            cell = this.$lines.createCell(
              row,
              config,
              this.session,
              onCreateCell
            );
            this.$lines.push(cell);
          }
          this.$renderCell(cell, config, fold, row);
          row++;
        }
        this._signal("afterRender");
        this.$updateGutterWidth(config);
      };
      this.$updateGutterWidth = function(config) {
        var session = this.session,
          gutterRenderer = session.gutterRenderer || this.$renderer,
          firstLineNumber = session.$firstLineNumber,
          lastLineText = this.$lines.last() ? this.$lines.last().text : "";
        if (this.$fixedWidth || session.$useWrapMode)
          lastLineText = session.getLength() + firstLineNumber;
        var gutterWidth = gutterRenderer
            ? gutterRenderer.getWidth(session, lastLineText, config)
            : lastLineText.toString().length * config.characterWidth,
          padding = this.$padding || this.$computePadding();
        gutterWidth += padding.left + padding.right;
        if (gutterWidth !== this.gutterWidth && !isNaN(gutterWidth)) {
          this.gutterWidth = gutterWidth;
          this.element.parentNode.style.width = this.element.style.width =
            Math.ceil(this.gutterWidth) + "px";
          this._signal("changeGutterWidth", gutterWidth);
        }
      };
      this.$updateCursorRow = function() {
        if (!this.$highlightGutterLine) return;
        var position = this.session.selection.getCursor();
        if (this.$cursorRow === position.row) return;
        this.$cursorRow = position.row;
      };
      this.updateLineHighlight = function() {
        if (!this.$highlightGutterLine) return;
        var row = this.session.selection.cursor.row;
        this.$cursorRow = row;
        if (this.$cursorCell && this.$cursorCell.row == row) return;
        if (this.$cursorCell)
          this.$cursorCell.element.className = this.$cursorCell.element.className.replace(
            "ace_gutter-active-line ",
            ""
          );
        var cells = this.$lines.cells;
        this.$cursorCell = null;
        for (var i = 0, cell; i < cells.length; i++) {
          cell = cells[i];
          if (cell.row >= this.$cursorRow) {
            if (cell.row > this.$cursorRow) {
              var fold = this.session.getFoldLine(this.$cursorRow);
              if (0 < i && fold && fold.start.row == cells[i - 1].row)
                cell = cells[i - 1];
              else break;
            }
            cell.element.className =
              "ace_gutter-active-line " + cell.element.className;
            this.$cursorCell = cell;
            break;
          }
        }
      };
      this.scrollLines = function(config) {
        var oldConfig = this.config;
        this.config = config;
        this.$updateCursorRow();
        if (this.$lines.pageChanged(oldConfig, config))
          return this.update(config);
        this.$lines.moveContainer(config);
        var lastRow = _Mathmin6(
            config.lastRow + config.gutterOffset,
            this.session.getLength() - 1
          ),
          oldLastRow = this.oldLastRow;
        this.oldLastRow = lastRow;
        if (!oldConfig || oldLastRow < config.firstRow)
          return this.update(config);
        if (lastRow < oldConfig.firstRow) return this.update(config);
        if (oldConfig.firstRow < config.firstRow)
          for (
            var row = this.session.getFoldedRowCount(
              oldConfig.firstRow,
              config.firstRow - 1
            );
            0 < row;
            row--
          ) {
            this.$lines.shift();
          }
        if (oldLastRow > lastRow)
          for (
            var row = this.session.getFoldedRowCount(lastRow + 1, oldLastRow);
            0 < row;
            row--
          ) {
            this.$lines.pop();
          }
        if (config.firstRow < oldConfig.firstRow) {
          this.$lines.unshift(
            this.$renderLines(config, config.firstRow, oldConfig.firstRow - 1)
          );
        }
        if (lastRow > oldLastRow) {
          this.$lines.push(this.$renderLines(config, oldLastRow + 1, lastRow));
        }
        this.updateLineHighlight();
        this._signal("afterRender");
        this.$updateGutterWidth(config);
      };
      this.$renderLines = function(config, firstRow, lastRow) {
        var fragment = [],
          row = firstRow,
          foldLine = this.session.getNextFoldLine(row),
          foldStart = foldLine ? foldLine.start.row : 1 / 0;
        while (!0) {
          if (row > foldStart) {
            row = foldLine.end.row + 1;
            foldLine = this.session.getNextFoldLine(row, foldLine);
            foldStart = foldLine ? foldLine.start.row : 1 / 0;
          }
          if (row > lastRow) break;
          var cell = this.$lines.createCell(
            row,
            config,
            this.session,
            onCreateCell
          );
          this.$renderCell(cell, config, foldLine, row);
          fragment.push(cell);
          row++;
        }
        return fragment;
      };
      this.$renderCell = function(cell, config, fold, row) {
        var element = cell.element,
          session = this.session,
          textNode = element.childNodes[0],
          foldWidget = element.childNodes[1],
          firstLineNumber = session.$firstLineNumber,
          breakpoints = session.$breakpoints,
          decorations = session.$decorations,
          gutterRenderer = session.gutterRenderer || this.$renderer,
          foldWidgets = this.$showFoldWidgets && session.foldWidgets,
          foldStart = fold ? fold.start.row : Number.MAX_VALUE,
          className = "ace_gutter-cell ";
        if (this.$highlightGutterLine) {
          if (
            row == this.$cursorRow ||
            (fold &&
              row < this.$cursorRow &&
              row >= foldStart &&
              this.$cursorRow <= fold.end.row)
          ) {
            className += "ace_gutter-active-line ";
            if (this.$cursorCell != cell) {
              if (this.$cursorCell)
                this.$cursorCell.element.className = this.$cursorCell.element.className.replace(
                  "ace_gutter-active-line ",
                  ""
                );
              this.$cursorCell = cell;
            }
          }
        }
        if (breakpoints[row]) className += breakpoints[row];
        if (decorations[row]) className += decorations[row];
        if (this.$annotations[row])
          className += this.$annotations[row].className;
        if (element.className != className) element.className = className;
        if (foldWidgets) {
          var c = foldWidgets[row];
          if (null == c) c = foldWidgets[row] = session.getFoldWidget(row);
        }
        if (c) {
          var className = "ace_fold-widget ace_" + c;
          if ("start" == c && row == foldStart && row < fold.end.row)
            className += " ace_closed";
          else className += " ace_open";
          if (foldWidget.className != className)
            foldWidget.className = className;
          var foldHeight = config.lineHeight + "px";
          dom.setStyle(foldWidget.style, "height", foldHeight);
          dom.setStyle(foldWidget.style, "display", "inline-block");
        } else {
          if (foldWidget) {
            dom.setStyle(foldWidget.style, "display", "none");
          }
        }
        var text = (gutterRenderer
          ? gutterRenderer.getText(session, row)
          : row + firstLineNumber
        ).toString();
        if (text !== textNode.data) {
          textNode.data = text;
        }
        dom.setStyle(
          cell.element.style,
          "height",
          this.$lines.computeLineHeight(row, config, session) + "px"
        );
        dom.setStyle(
          cell.element.style,
          "top",
          this.$lines.computeLineTop(row, config, session) + "px"
        );
        cell.text = text;
        return cell;
      };
      this.$fixedWidth = !1;
      this.$highlightGutterLine = !0;
      this.$renderer = "";
      this.setHighlightGutterLine = function(highlightGutterLine) {
        this.$highlightGutterLine = highlightGutterLine;
      };
      this.$showLineNumbers = !0;
      this.$renderer = "";
      this.setShowLineNumbers = function(show) {
        this.$renderer = !show && {
          getWidth: function getWidth() {
            return "";
          },
          getText: function getText() {
            return "";
          }
        };
      };
      this.getShowLineNumbers = function() {
        return this.$showLineNumbers;
      };
      this.$showFoldWidgets = !0;
      this.setShowFoldWidgets = function(show) {
        if (show) dom.addCssClass(this.element, "ace_folding-enabled");
        else dom.removeCssClass(this.element, "ace_folding-enabled");
        this.$showFoldWidgets = show;
        this.$padding = null;
      };
      this.getShowFoldWidgets = function() {
        return this.$showFoldWidgets;
      };
      this.$computePadding = function() {
        if (!this.element.firstChild) return { left: 0, right: 0 };
        var style = dom.computedStyle(this.element.firstChild);
        this.$padding = {};
        this.$padding.left =
          (parseInt(style.borderLeftWidth) || 0) +
          (parseInt(style.paddingLeft) || 0) +
          1;
        this.$padding.right =
          (parseInt(style.borderRightWidth) || 0) +
          (parseInt(style.paddingRight) || 0);
        return this.$padding;
      };
      this.getRegion = function(point) {
        var padding = this.$padding || this.$computePadding(),
          rect = this.element.getBoundingClientRect();
        if (point.x < padding.left + rect.left) return "markers";
        if (this.$showFoldWidgets && point.x > rect.right - padding.right)
          return "foldWidgets";
      };
    }.call(Gutter.prototype));
    function onCreateCell(element) {
      var textNode = document.createTextNode("");
      element.appendChild(textNode);
      var foldWidget = dom.createElement("span");
      element.appendChild(foldWidget);
      return element;
    }
    exports.Gutter = Gutter;
  }
);
ace.define(
  "ace/layer/marker",
  ["require", "exports", "module", "ace/range", "ace/lib/dom"],
  function(require, exports, module) {
    "use strict";
    var Range = require("../range").Range,
      dom = require("../lib/dom"),
      Marker = function Marker(parentEl) {
        this.element = dom.createElement("div");
        this.element.className = "ace_layer ace_marker-layer";
        parentEl.appendChild(this.element);
      };
    (function() {
      this.$padding = 0;
      this.setPadding = function(padding) {
        this.$padding = padding;
      };
      this.setSession = function(session) {
        this.session = session;
      };
      this.setMarkers = function(markers) {
        this.markers = markers;
      };
      this.elt = function(className, css) {
        var x = -1 != this.i && this.element.childNodes[this.i];
        if (!x) {
          x = document.createElement("div");
          this.element.appendChild(x);
          this.i = -1;
        } else {
          this.i++;
        }
        x.style.cssText = css;
        x.className = className;
      };
      this.update = function(config) {
        if (!config) return;
        this.config = config;
        this.i = 0;
        var html;
        for (var key in this.markers) {
          var marker = this.markers[key];
          if (!marker.range) {
            marker.update(html, this, this.session, config);
            continue;
          }
          var range = marker.range.clipRows(config.firstRow, config.lastRow);
          if (range.isEmpty()) continue;
          range = range.toScreenRange(this.session);
          if (marker.renderer) {
            var top = this.$getTop(range.start.row, config),
              left = this.$padding + range.start.column * config.characterWidth;
            marker.renderer(html, range, left, top, config);
          } else if ("fullLine" == marker.type) {
            this.drawFullLineMarker(html, range, marker.clazz, config);
          } else if ("screenLine" == marker.type) {
            this.drawScreenLineMarker(html, range, marker.clazz, config);
          } else if (range.isMultiLine()) {
            if ("text" == marker.type)
              this.drawTextMarker(html, range, marker.clazz, config);
            else this.drawMultiLineMarker(html, range, marker.clazz, config);
          } else {
            this.drawSingleLineMarker(
              html,
              range,
              marker.clazz + " ace_start" + " ace_br15",
              config
            );
          }
        }
        if (-1 != this.i) {
          while (this.i < this.element.childElementCount) {
            this.element.removeChild(this.element.lastChild);
          }
        }
      };
      this.$getTop = function(row, layerConfig) {
        return (row - layerConfig.firstRowScreen) * layerConfig.lineHeight;
      };
      function getBorderClass(tl, tr, br, bl) {
        return (tl ? 1 : 0) | (tr ? 2 : 0) | (br ? 4 : 0) | (bl ? 8 : 0);
      }
      this.drawTextMarker = function(
        stringBuilder,
        range,
        clazz,
        layerConfig,
        extraStyle
      ) {
        var session = this.session,
          start = range.start.row,
          end = range.end.row,
          row = start,
          prev = 0,
          curr = 0,
          next = session.getScreenLastRowColumn(row),
          lineRange = new Range(row, range.start.column, row, curr);
        for (; row <= end; row++) {
          lineRange.start.row = lineRange.end.row = row;
          lineRange.start.column =
            row == start ? range.start.column : session.getRowWrapIndent(row);
          lineRange.end.column = next;
          prev = curr;
          curr = next;
          next =
            row + 1 < end
              ? session.getScreenLastRowColumn(row + 1)
              : row == end
                ? 0
                : range.end.column;
          this.drawSingleLineMarker(
            stringBuilder,
            lineRange,
            clazz +
              (row == start ? " ace_start" : "") +
              " ace_br" +
              getBorderClass(
                row == start || (row == start + 1 && range.start.column),
                prev < curr,
                curr > next,
                row == end
              ),
            layerConfig,
            row == end ? 0 : 1,
            extraStyle
          );
        }
      };
      this.drawMultiLineMarker = function(
        stringBuilder,
        range,
        clazz,
        config,
        extraStyle
      ) {
        var padding = this.$padding,
          height = config.lineHeight,
          top = this.$getTop(range.start.row, config),
          left = padding + range.start.column * config.characterWidth;
        extraStyle = extraStyle || "";
        if (this.session.$bidiHandler.isBidiRow(range.start.row)) {
          var range1 = range.clone();
          range1.end.row = range1.start.row;
          range1.end.column = this.session.getLine(range1.start.row).length;
          this.drawBidiSingleLineMarker(
            stringBuilder,
            range1,
            clazz + " ace_br1 ace_start",
            config,
            null,
            extraStyle
          );
        } else {
          this.elt(
            clazz + " ace_br1 ace_start",
            "height:" +
              height +
              "px;" +
              "right:0;" +
              "top:" +
              top +
              "px;left:" +
              left +
              "px;" +
              (extraStyle || "")
          );
        }
        if (this.session.$bidiHandler.isBidiRow(range.end.row)) {
          var range1 = range.clone();
          range1.start.row = range1.end.row;
          range1.start.column = 0;
          this.drawBidiSingleLineMarker(
            stringBuilder,
            range1,
            clazz + " ace_br12",
            config,
            null,
            extraStyle
          );
        } else {
          top = this.$getTop(range.end.row, config);
          var width = range.end.column * config.characterWidth;
          this.elt(
            clazz + " ace_br12",
            "height:" +
              height +
              "px;" +
              "width:" +
              width +
              "px;" +
              "top:" +
              top +
              "px;" +
              "left:" +
              padding +
              "px;" +
              (extraStyle || "")
          );
        }
        height = (range.end.row - range.start.row - 1) * config.lineHeight;
        if (0 >= height) return;
        top = this.$getTop(range.start.row + 1, config);
        var radiusClass =
          (range.start.column ? 1 : 0) | (range.end.column ? 0 : 8);
        this.elt(
          clazz + (radiusClass ? " ace_br" + radiusClass : ""),
          "height:" +
            height +
            "px;" +
            "right:0;" +
            "top:" +
            top +
            "px;" +
            "left:" +
            padding +
            "px;" +
            (extraStyle || "")
        );
      };
      this.drawSingleLineMarker = function(
        stringBuilder,
        range,
        clazz,
        config,
        extraLength,
        extraStyle
      ) {
        if (this.session.$bidiHandler.isBidiRow(range.start.row))
          return this.drawBidiSingleLineMarker(
            stringBuilder,
            range,
            clazz,
            config,
            extraLength,
            extraStyle
          );
        var height = config.lineHeight,
          width =
            (range.end.column + (extraLength || 0) - range.start.column) *
            config.characterWidth,
          top = this.$getTop(range.start.row, config),
          left = this.$padding + range.start.column * config.characterWidth;
        this.elt(
          clazz,
          "height:" +
            height +
            "px;" +
            "width:" +
            width +
            "px;" +
            "top:" +
            top +
            "px;" +
            "left:" +
            left +
            "px;" +
            (extraStyle || "")
        );
      };
      this.drawBidiSingleLineMarker = function(
        stringBuilder,
        range,
        clazz,
        config,
        extraLength,
        extraStyle
      ) {
        var height = config.lineHeight,
          top = this.$getTop(range.start.row, config),
          padding = this.$padding,
          selections = this.session.$bidiHandler.getSelections(
            range.start.column,
            range.end.column
          );
        selections.forEach(function(selection) {
          this.elt(
            clazz,
            "height:" +
              height +
              "px;" +
              "width:" +
              selection.width +
              (extraLength || 0) +
              "px;" +
              "top:" +
              top +
              "px;" +
              "left:" +
              (padding + selection.left) +
              "px;" +
              (extraStyle || "")
          );
        }, this);
      };
      this.drawFullLineMarker = function(
        stringBuilder,
        range,
        clazz,
        config,
        extraStyle
      ) {
        var top = this.$getTop(range.start.row, config),
          height = config.lineHeight;
        if (range.start.row != range.end.row)
          height += this.$getTop(range.end.row, config) - top;
        this.elt(
          clazz,
          "height:" +
            height +
            "px;" +
            "top:" +
            top +
            "px;" +
            "left:0;right:0;" +
            (extraStyle || "")
        );
      };
      this.drawScreenLineMarker = function(
        stringBuilder,
        range,
        clazz,
        config,
        extraStyle
      ) {
        var top = this.$getTop(range.start.row, config),
          height = config.lineHeight;
        this.elt(
          clazz,
          "height:" +
            height +
            "px;" +
            "top:" +
            top +
            "px;" +
            "left:0;right:0;" +
            (extraStyle || "")
        );
      };
    }.call(Marker.prototype));
    exports.Marker = Marker;
  }
);
ace.define(
  "ace/layer/text",
  [
    "require",
    "exports",
    "module",
    "ace/lib/oop",
    "ace/lib/dom",
    "ace/lib/lang",
    "ace/layer/lines",
    "ace/lib/event_emitter"
  ],
  function(require, exports, module) {
    "use strict";
    var oop = require("../lib/oop"),
      dom = require("../lib/dom"),
      lang = require("../lib/lang"),
      Lines = require("./lines").Lines,
      EventEmitter = require("../lib/event_emitter").EventEmitter,
      Text = function Text(parentEl) {
        this.dom = dom;
        this.element = this.dom.createElement("div");
        this.element.className = "ace_layer ace_text-layer";
        parentEl.appendChild(this.element);
        this.$updateEolChar = this.$updateEolChar.bind(this);
        this.$lines = new Lines(this.element);
      };
    (function() {
      oop.implement(this, EventEmitter);
      this.EOF_CHAR = "\xB6";
      this.EOL_CHAR_LF = "\xAC";
      this.EOL_CHAR_CRLF = "\xA4";
      this.EOL_CHAR = this.EOL_CHAR_LF;
      this.TAB_CHAR = "\u2014";
      this.SPACE_CHAR = "\xB7";
      this.$padding = 0;
      this.MAX_LINE_LENGTH = 1e4;
      this.$updateEolChar = function() {
        var doc = this.session.doc,
          unixMode =
            "\n" == doc.getNewLineCharacter() &&
            "windows" != doc.getNewLineMode(),
          EOL_CHAR = unixMode ? this.EOL_CHAR_LF : this.EOL_CHAR_CRLF;
        if (this.EOL_CHAR != EOL_CHAR) {
          this.EOL_CHAR = EOL_CHAR;
          return !0;
        }
      };
      this.setPadding = function(padding) {
        this.$padding = padding;
        this.element.style.margin = "0 " + padding + "px";
      };
      this.getLineHeight = function() {
        return this.$fontMetrics.$characterSize.height || 0;
      };
      this.getCharacterWidth = function() {
        return this.$fontMetrics.$characterSize.width || 0;
      };
      this.$setFontMetrics = function(measure) {
        this.$fontMetrics = measure;
        this.$fontMetrics.on(
          "changeCharacterSize",
          function(e) {
            this._signal("changeCharacterSize", e);
          }.bind(this)
        );
        this.$pollSizeChanges();
      };
      this.checkForSizeChanges = function() {
        this.$fontMetrics.checkForSizeChanges();
      };
      this.$pollSizeChanges = function() {
        return (this.$pollSizeChangesTimer = this.$fontMetrics.$pollSizeChanges());
      };
      this.setSession = function(session) {
        this.session = session;
        if (session) this.$computeTabString();
      };
      this.showInvisibles = !1;
      this.setShowInvisibles = function(showInvisibles) {
        if (this.showInvisibles == showInvisibles) return !1;
        this.showInvisibles = showInvisibles;
        this.$computeTabString();
        return !0;
      };
      this.displayIndentGuides = !0;
      this.setDisplayIndentGuides = function(display) {
        if (this.displayIndentGuides == display) return !1;
        this.displayIndentGuides = display;
        this.$computeTabString();
        return !0;
      };
      this.$tabStrings = [];
      this.onChangeTabSize = this.$computeTabString = function() {
        var tabSize = this.session.getTabSize();
        this.tabSize = tabSize;
        for (
          var tabStr = (this.$tabStrings = [0]), i = 1;
          i < tabSize + 1;
          i++
        ) {
          if (this.showInvisibles) {
            var span = this.dom.createElement("span");
            span.className = "ace_invisible ace_invisible_tab";
            span.textContent = lang.stringRepeat(this.TAB_CHAR, i);
            tabStr.push(span);
          } else {
            tabStr.push(
              this.dom.createTextNode(lang.stringRepeat(" ", i), this.element)
            );
          }
        }
        if (this.displayIndentGuides) {
          this.$indentGuideRe = /\s\S| \t|\t |\s$/;
          var className = "ace_indent-guide",
            spaceClass = "",
            tabClass = "";
          if (this.showInvisibles) {
            className += " ace_invisible";
            spaceClass = " ace_invisible_space";
            tabClass = " ace_invisible_tab";
            var spaceContent = lang.stringRepeat(this.SPACE_CHAR, this.tabSize),
              tabContent = lang.stringRepeat(this.TAB_CHAR, this.tabSize);
          } else {
            var spaceContent = lang.stringRepeat(" ", this.tabSize),
              tabContent = spaceContent;
          }
          var span = this.dom.createElement("span");
          span.className = className + spaceClass;
          span.textContent = spaceContent;
          this.$tabStrings[" "] = span;
          var span = this.dom.createElement("span");
          span.className = className + tabClass;
          span.textContent = tabContent;
          this.$tabStrings["\t"] = span;
        }
      };
      this.updateLines = function(config, firstRow, lastRow) {
        if (
          this.config.lastRow != config.lastRow ||
          this.config.firstRow != config.firstRow
        ) {
          return this.update(config);
        }
        this.config = config;
        for (
          var first = Math.max(firstRow, config.firstRow),
            last = Math.min(lastRow, config.lastRow),
            lineElements = this.element.childNodes,
            lineElementsIdx = 0,
            row = config.firstRow,
            foldLine;
          row < first;
          row++
        ) {
          foldLine = this.session.getFoldLine(row);
          if (foldLine) {
            if (foldLine.containsRow(first)) {
              first = foldLine.start.row;
              break;
            } else {
              row = foldLine.end.row;
            }
          }
          lineElementsIdx++;
        }
        var heightChanged = !1,
          row = first,
          foldLine = this.session.getNextFoldLine(row),
          foldStart = foldLine ? foldLine.start.row : 1 / 0;
        while (!0) {
          if (row > foldStart) {
            row = foldLine.end.row + 1;
            foldLine = this.session.getNextFoldLine(row, foldLine);
            foldStart = foldLine ? foldLine.start.row : 1 / 0;
          }
          if (row > last) break;
          var lineElement = lineElements[lineElementsIdx++];
          if (lineElement) {
            this.dom.removeChildren(lineElement);
            this.$renderLine(
              lineElement,
              row,
              row == foldStart ? foldLine : !1
            );
            var height =
              config.lineHeight * this.session.getRowLength(row) + "px";
            if (lineElement.style.height != height) {
              heightChanged = !0;
              lineElement.style.height = height;
            }
          }
          row++;
        }
        if (heightChanged) {
          while (lineElementsIdx < this.$lines.cells.length) {
            var cell = this.$lines.cells[lineElementsIdx++];
            cell.element.style.top =
              this.$lines.computeLineTop(cell.row, config, this.session) + "px";
          }
        }
      };
      this.scrollLines = function(config) {
        var oldConfig = this.config;
        this.config = config;
        if (this.$lines.pageChanged(oldConfig, config))
          return this.update(config);
        this.$lines.moveContainer(config);
        var lastRow = config.lastRow,
          oldLastRow = oldConfig ? oldConfig.lastRow : -1;
        if (!oldConfig || oldLastRow < config.firstRow)
          return this.update(config);
        if (lastRow < oldConfig.firstRow) return this.update(config);
        if (!oldConfig || oldConfig.lastRow < config.firstRow)
          return this.update(config);
        if (config.lastRow < oldConfig.firstRow) return this.update(config);
        if (oldConfig.firstRow < config.firstRow)
          for (
            var row = this.session.getFoldedRowCount(
              oldConfig.firstRow,
              config.firstRow - 1
            );
            0 < row;
            row--
          ) {
            this.$lines.shift();
          }
        if (oldConfig.lastRow > config.lastRow)
          for (
            var row = this.session.getFoldedRowCount(
              config.lastRow + 1,
              oldConfig.lastRow
            );
            0 < row;
            row--
          ) {
            this.$lines.pop();
          }
        if (config.firstRow < oldConfig.firstRow) {
          this.$lines.unshift(
            this.$renderLinesFragment(
              config,
              config.firstRow,
              oldConfig.firstRow - 1
            )
          );
        }
        if (config.lastRow > oldConfig.lastRow) {
          this.$lines.push(
            this.$renderLinesFragment(
              config,
              oldConfig.lastRow + 1,
              config.lastRow
            )
          );
        }
      };
      this.$renderLinesFragment = function(config, firstRow, lastRow) {
        var fragment = [],
          row = firstRow,
          foldLine = this.session.getNextFoldLine(row),
          foldStart = foldLine ? foldLine.start.row : 1 / 0;
        while (!0) {
          if (row > foldStart) {
            row = foldLine.end.row + 1;
            foldLine = this.session.getNextFoldLine(row, foldLine);
            foldStart = foldLine ? foldLine.start.row : 1 / 0;
          }
          if (row > lastRow) break;
          var line = this.$lines.createCell(row, config, this.session),
            lineEl = line.element;
          this.dom.removeChildren(lineEl);
          dom.setStyle(
            lineEl.style,
            "height",
            this.$lines.computeLineHeight(row, config, this.session) + "px"
          );
          dom.setStyle(
            lineEl.style,
            "top",
            this.$lines.computeLineTop(row, config, this.session) + "px"
          );
          this.$renderLine(lineEl, row, row == foldStart ? foldLine : !1);
          if (this.$useLineGroups()) {
            lineEl.className = "ace_line_group";
          } else {
            lineEl.className = "ace_line";
          }
          fragment.push(line);
          row++;
        }
        return fragment;
      };
      this.update = function(config) {
        this.$lines.moveContainer(config);
        this.config = config;
        var firstRow = config.firstRow,
          lastRow = config.lastRow,
          lines = this.$lines;
        while (lines.getLength()) {
          lines.pop();
        }
        lines.push(this.$renderLinesFragment(config, firstRow, lastRow));
      };
      this.$textToken = { text: !0, rparen: !0, lparen: !0 };
      this.$renderToken = function(parent, screenColumn, token, value) {
        var self = this,
          re = /(\t)|( +)|([\x00-\x1f\x80-\xa0\xad\u1680\u180E\u2000-\u200f\u2028\u2029\u202F\u205F\uFEFF\uFFF9-\uFFFC]+)|(\u3000)|([\u1100-\u115F\u11A3-\u11A7\u11FA-\u11FF\u2329-\u232A\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3001-\u303E\u3041-\u3096\u3099-\u30FF\u3105-\u312D\u3131-\u318E\u3190-\u31BA\u31C0-\u31E3\u31F0-\u321E\u3220-\u3247\u3250-\u32FE\u3300-\u4DBF\u4E00-\uA48C\uA490-\uA4C6\uA960-\uA97C\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFAFF\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE66\uFE68-\uFE6B\uFF01-\uFF60\uFFE0-\uFFE6]|[\uD800-\uDBFF][\uDC00-\uDFFF])/g,
          valueFragment = this.dom.createFragment(this.element),
          m,
          i = 0;
        while ((m = re.exec(value))) {
          var tab = m[1],
            simpleSpace = m[2],
            controlCharacter = m[3],
            cjkSpace = m[4],
            cjk = m[5];
          if (!self.showInvisibles && simpleSpace) continue;
          var before = i != m.index ? value.slice(i, m.index) : "";
          i = m.index + m[0].length;
          if (before) {
            valueFragment.appendChild(
              this.dom.createTextNode(before, this.element)
            );
          }
          if (tab) {
            var tabSize = self.session.getScreenTabSize(screenColumn + m.index);
            valueFragment.appendChild(self.$tabStrings[tabSize].cloneNode(!0));
            screenColumn += tabSize - 1;
          } else if (simpleSpace) {
            if (self.showInvisibles) {
              var span = this.dom.createElement("span");
              span.className = "ace_invisible ace_invisible_space";
              span.textContent = lang.stringRepeat(
                self.SPACE_CHAR,
                simpleSpace.length
              );
              valueFragment.appendChild(span);
            } else {
              valueFragment.appendChild(
                this.com.createTextNode(simpleSpace, this.element)
              );
            }
          } else if (controlCharacter) {
            var span = this.dom.createElement("span");
            span.className = "ace_invisible ace_invisible_space ace_invalid";
            span.textContent = lang.stringRepeat(
              self.SPACE_CHAR,
              controlCharacter.length
            );
            valueFragment.appendChild(span);
          } else if (cjkSpace) {
            var space = self.showInvisibles ? self.SPACE_CHAR : "";
            screenColumn += 1;
            var span = this.dom.createElement("span");
            span.style.width = 2 * self.config.characterWidth + "px";
            span.className = self.showInvisibles
              ? "ace_cjk ace_invisible ace_invisible_space"
              : "ace_cjk";
            span.textContent = self.showInvisibles ? self.SPACE_CHAR : "";
            valueFragment.appendChild(span);
          } else if (cjk) {
            screenColumn += 1;
            var span = dom.createElement("span");
            span.style.width = 2 * self.config.characterWidth + "px";
            span.className = "ace_cjk";
            span.textContent = cjk;
            valueFragment.appendChild(span);
          }
        }
        valueFragment.appendChild(
          this.dom.createTextNode(i ? value.slice(i) : value, this.element)
        );
        if (!this.$textToken[token.type]) {
          var classes = "ace_" + token.type.replace(/\./g, " ace_"),
            span = this.dom.createElement("span");
          if ("fold" == token.type)
            span.style.width =
              token.value.length * this.config.characterWidth + "px";
          span.className = classes;
          span.appendChild(valueFragment);
          parent.appendChild(span);
        } else {
          parent.appendChild(valueFragment);
        }
        return screenColumn + value.length;
      };
      this.renderIndentGuide = function(parent, value, max) {
        var cols = value.search(this.$indentGuideRe);
        if (0 >= cols || cols >= max) return value;
        if (" " == value[0]) {
          cols -= cols % this.tabSize;
          for (var count = cols / this.tabSize, i = 0; i < count; i++) {
            parent.appendChild(this.$tabStrings[" "].cloneNode(!0));
          }
          return value.substr(cols);
        } else if ("\t" == value[0]) {
          for (var i = 0; i < cols; i++) {
            parent.appendChild(this.$tabStrings["\t"].cloneNode(!0));
          }
          return value.substr(cols);
        }
        return value;
      };
      this.$createLineElement = function(parent) {
        var lineEl = this.dom.createElement("div");
        lineEl.className = "ace_line";
        lineEl.style.height = this.config.lineHeight + "px";
        return lineEl;
      };
      this.$renderWrappedLine = function(parent, tokens, splits) {
        var chars = 0,
          split = 0,
          splitChars = splits[0],
          screenColumn = 0,
          lineEl = this.$createLineElement();
        parent.appendChild(lineEl);
        for (var i = 0; i < tokens.length; i++) {
          var token = tokens[i],
            value = token.value;
          if (0 == i && this.displayIndentGuides) {
            chars = value.length;
            value = this.renderIndentGuide(lineEl, value, splitChars);
            if (!value) continue;
            chars -= value.length;
          }
          if (chars + value.length < splitChars) {
            screenColumn = this.$renderToken(
              lineEl,
              screenColumn,
              token,
              value
            );
            chars += value.length;
          } else {
            while (chars + value.length >= splitChars) {
              screenColumn = this.$renderToken(
                lineEl,
                screenColumn,
                token,
                value.substring(0, splitChars - chars)
              );
              value = value.substring(splitChars - chars);
              chars = splitChars;
              lineEl = this.$createLineElement();
              parent.appendChild(lineEl);
              lineEl.appendChild(
                this.dom.createTextNode(
                  lang.stringRepeat("\xA0", splits.indent),
                  this.element
                )
              );
              split++;
              screenColumn = 0;
              splitChars = splits[split] || Number.MAX_VALUE;
            }
            if (0 != value.length) {
              chars += value.length;
              screenColumn = this.$renderToken(
                lineEl,
                screenColumn,
                token,
                value
              );
            }
          }
        }
      };
      this.$renderSimpleLine = function(parent, tokens) {
        var screenColumn = 0,
          token = tokens[0],
          value = token.value;
        if (this.displayIndentGuides)
          value = this.renderIndentGuide(parent, value);
        if (value)
          screenColumn = this.$renderToken(parent, screenColumn, token, value);
        for (var i = 1; i < tokens.length; i++) {
          token = tokens[i];
          value = token.value;
          if (screenColumn + value.length > this.MAX_LINE_LENGTH)
            return this.$renderOverflowMessage(
              parent,
              screenColumn,
              token,
              value
            );
          screenColumn = this.$renderToken(parent, screenColumn, token, value);
        }
      };
      this.$renderOverflowMessage = function(
        parent,
        screenColumn,
        token,
        value
      ) {
        this.$renderToken(
          parent,
          screenColumn,
          token,
          value.slice(0, this.MAX_LINE_LENGTH - screenColumn)
        );
        var overflowEl = this.dom.createElement("span");
        overflowEl.className = "ace_inline_button ace_keyword ace_toggle_wrap";
        overflowEl.style.position = "absolute";
        overflowEl.style.right = "0";
        overflowEl.textContent = "<click to see more...>";
        parent.appendChild(overflowEl);
      };
      this.$renderLine = function(parent, row, foldLine) {
        if (!foldLine && !1 != foldLine)
          foldLine = this.session.getFoldLine(row);
        if (foldLine) var tokens = this.$getFoldLineTokens(row, foldLine);
        else var tokens = this.session.getTokens(row);
        var lastLineEl = parent;
        if (tokens.length) {
          var splits = this.session.getRowSplitData(row);
          if (splits && splits.length) {
            this.$renderWrappedLine(parent, tokens, splits);
            var lastLineEl = parent.lastChild;
          } else {
            var lastLineEl = parent;
            if (this.$useLineGroups()) {
              lastLineEl = this.$createLineElement();
              parent.appendChild(lastLineEl);
            }
            this.$renderSimpleLine(lastLineEl, tokens);
          }
        } else if (this.$useLineGroups()) {
          lastLineEl = this.$createLineElement();
          parent.appendChild(lastLineEl);
        }
        if (this.showInvisibles && lastLineEl) {
          if (foldLine) row = foldLine.end.row;
          var invisibleEl = this.dom.createElement("span");
          invisibleEl.className = "ace_invisible ace_invisible_eol";
          invisibleEl.textContent =
            row == this.session.getLength() - 1 ? this.EOF_CHAR : this.EOL_CHAR;
          lastLineEl.appendChild(invisibleEl);
        }
      };
      this.$getFoldLineTokens = function(row, foldLine) {
        var session = this.session,
          renderTokens = [];
        function addTokens(tokens, from, to) {
          var idx = 0,
            col = 0;
          while (col + tokens[idx].value.length < from) {
            col += tokens[idx].value.length;
            idx++;
            if (idx == tokens.length) return;
          }
          if (col != from) {
            var value = tokens[idx].value.substring(from - col);
            if (value.length > to - from) value = value.substring(0, to - from);
            renderTokens.push({ type: tokens[idx].type, value: value });
            col = from + value.length;
            idx += 1;
          }
          while (col < to && idx < tokens.length) {
            var value = tokens[idx].value;
            if (value.length + col > to) {
              renderTokens.push({
                type: tokens[idx].type,
                value: value.substring(0, to - col)
              });
            } else renderTokens.push(tokens[idx]);
            col += value.length;
            idx += 1;
          }
        }
        var tokens = session.getTokens(row);
        foldLine.walk(
          function(placeholder, row, column, lastColumn, isNewRow) {
            if (null != placeholder) {
              renderTokens.push({ type: "fold", value: placeholder });
            } else {
              if (isNewRow) tokens = session.getTokens(row);
              if (tokens.length) addTokens(tokens, lastColumn, column);
            }
          },
          foldLine.end.row,
          this.session.getLine(foldLine.end.row).length
        );
        return renderTokens;
      };
      this.$useLineGroups = function() {
        return this.session.getUseWrapMode();
      };
      this.destroy = function() {};
    }.call(Text.prototype));
    exports.Text = Text;
  }
);
ace.define(
  "ace/layer/cursor",
  ["require", "exports", "module", "ace/lib/dom"],
  function(require, exports, module) {
    "use strict";
    var dom = require("../lib/dom"),
      Cursor = function Cursor(parentEl) {
        this.element = dom.createElement("div");
        this.element.className = "ace_layer ace_cursor-layer";
        parentEl.appendChild(this.element);
        this.isVisible = !1;
        this.isBlinking = !0;
        this.blinkInterval = 1e3;
        this.smoothBlinking = !1;
        this.cursors = [];
        this.cursor = this.addCursor();
        dom.addCssClass(this.element, "ace_hidden-cursors");
        this.$updateCursors = this.$updateOpacity.bind(this);
      };
    (function() {
      this.$updateOpacity = function(val) {
        for (var cursors = this.cursors, i = cursors.length; i--; ) {
          dom.setStyle(cursors[i].style, "opacity", val ? "" : "0");
        }
      };
      this.$startCssAnimation = function() {
        for (var cursors = this.cursors, i = cursors.length; i--; ) {
          cursors[i].style.animationDuration = this.blinkInterval + "ms";
        }
        setTimeout(
          function() {
            dom.addCssClass(this.element, "ace_animate-blinking");
          }.bind(this)
        );
      };
      this.$stopCssAnimation = function() {
        dom.removeCssClass(this.element, "ace_animate-blinking");
      };
      this.$padding = 0;
      this.setPadding = function(padding) {
        this.$padding = padding;
      };
      this.setSession = function(session) {
        this.session = session;
      };
      this.setBlinking = function(blinking) {
        if (blinking != this.isBlinking) {
          this.isBlinking = blinking;
          this.restartTimer();
        }
      };
      this.setBlinkInterval = function(blinkInterval) {
        if (blinkInterval != this.blinkInterval) {
          this.blinkInterval = blinkInterval;
          this.restartTimer();
        }
      };
      this.setSmoothBlinking = function(smoothBlinking) {
        if (smoothBlinking != this.smoothBlinking) {
          this.smoothBlinking = smoothBlinking;
          dom.setCssClass(this.element, "ace_smooth-blinking", smoothBlinking);
          this.$updateCursors(!0);
          this.restartTimer();
        }
      };
      this.addCursor = function() {
        var el = dom.createElement("div");
        el.className = "ace_cursor";
        this.element.appendChild(el);
        this.cursors.push(el);
        return el;
      };
      this.removeCursor = function() {
        if (1 < this.cursors.length) {
          var el = this.cursors.pop();
          el.parentNode.removeChild(el);
          return el;
        }
      };
      this.hideCursor = function() {
        this.isVisible = !1;
        dom.addCssClass(this.element, "ace_hidden-cursors");
        this.restartTimer();
      };
      this.showCursor = function() {
        this.isVisible = !0;
        dom.removeCssClass(this.element, "ace_hidden-cursors");
        this.restartTimer();
      };
      this.restartTimer = function() {
        var update = this.$updateCursors;
        clearInterval(this.intervalId);
        clearTimeout(this.timeoutId);
        this.$stopCssAnimation();
        if (this.smoothBlinking) {
          dom.removeCssClass(this.element, "ace_smooth-blinking");
        }
        update(!0);
        if (!this.isBlinking || !this.blinkInterval || !this.isVisible) {
          this.$stopCssAnimation();
          return;
        }
        if (this.smoothBlinking) {
          setTimeout(
            function() {
              dom.addCssClass(this.element, "ace_smooth-blinking");
            }.bind(this)
          );
        }
        if (dom.HAS_CSS_ANIMATION) {
          this.$startCssAnimation();
        } else {
          var blink = function() {
            this.timeoutId = setTimeout(function() {
              update(!1);
            }, 0.6 * this.blinkInterval);
          }.bind(this);
          this.intervalId = setInterval(function() {
            update(!0);
            blink();
          }, this.blinkInterval);
          blink();
        }
      };
      this.getPixelPosition = function(position, onScreen) {
        if (!this.config || !this.session) return { left: 0, top: 0 };
        if (!position) position = this.session.selection.getCursor();
        var pos = this.session.documentToScreenPosition(position),
          cursorLeft =
            this.$padding +
            (this.session.$bidiHandler.isBidiRow(pos.row, position.row)
              ? this.session.$bidiHandler.getPosLeft(pos.column)
              : pos.column * this.config.characterWidth),
          cursorTop =
            (pos.row - (onScreen ? this.config.firstRowScreen : 0)) *
            this.config.lineHeight;
        return { left: cursorLeft, top: cursorTop };
      };
      this.isCursorInView = function(pixelPos, config) {
        return 0 <= pixelPos.top && pixelPos.top < config.maxHeight;
      };
      this.update = function(config) {
        this.config = config;
        var selections = this.session.$selectionMarkers,
          i = 0,
          cursorIndex = 0;
        if (selections === void 0 || 0 === selections.length) {
          selections = [{ cursor: null }];
        }
        for (var i = 0, n = selections.length, pixelPos; i < n; i++) {
          pixelPos = this.getPixelPosition(selections[i].cursor, !0);
          if (
            (pixelPos.top > config.height + config.offset ||
              0 > pixelPos.top) &&
            1 < i
          ) {
            continue;
          }
          var element = this.cursors[cursorIndex++] || this.addCursor(),
            style = element.style;
          if (!this.drawCursor) {
            if (!this.isCursorInView(pixelPos, config)) {
              dom.setStyle(style, "display", "none");
            } else {
              dom.setStyle(style, "display", "block");
              dom.translate(element, pixelPos.left, pixelPos.top);
              dom.setStyle(
                style,
                "width",
                Math.round(config.characterWidth) + "px"
              );
              dom.setStyle(style, "height", config.lineHeight + "px");
            }
          } else {
            this.drawCursor(
              element,
              pixelPos,
              config,
              selections[i],
              this.session
            );
          }
        }
        while (this.cursors.length > cursorIndex) {
          this.removeCursor();
        }
        var overwrite = this.session.getOverwrite();
        this.$setOverwrite(overwrite);
        this.$pixelPos = pixelPos;
        this.restartTimer();
      };
      this.drawCursor = null;
      this.$setOverwrite = function(overwrite) {
        if (overwrite != this.overwrite) {
          this.overwrite = overwrite;
          if (overwrite) dom.addCssClass(this.element, "ace_overwrite-cursors");
          else dom.removeCssClass(this.element, "ace_overwrite-cursors");
        }
      };
      this.destroy = function() {
        clearInterval(this.intervalId);
        clearTimeout(this.timeoutId);
      };
    }.call(Cursor.prototype));
    exports.Cursor = Cursor;
  }
);
ace.define(
  "ace/scrollbar",
  [
    "require",
    "exports",
    "module",
    "ace/lib/oop",
    "ace/lib/dom",
    "ace/lib/event",
    "ace/lib/event_emitter"
  ],
  function(require, exports, module) {
    "use strict";
    var oop = require("./lib/oop"),
      dom = require("./lib/dom"),
      event = require("./lib/event"),
      EventEmitter = require("./lib/event_emitter").EventEmitter,
      MAX_SCROLL_H = 32768,
      ScrollBar = function ScrollBar(parent) {
        this.element = dom.createElement("div");
        this.element.className =
          "ace_scrollbar ace_scrollbar" + this.classSuffix;
        this.inner = dom.createElement("div");
        this.inner.className = "ace_scrollbar-inner";
        this.element.appendChild(this.inner);
        parent.appendChild(this.element);
        this.setVisible(!1);
        this.skipEvent = !1;
        event.addListener(this.element, "scroll", this.onScroll.bind(this));
        event.addListener(this.element, "mousedown", event.preventDefault);
      };
    (function() {
      oop.implement(this, EventEmitter);
      this.setVisible = function(isVisible) {
        this.element.style.display = isVisible ? "" : "none";
        this.isVisible = isVisible;
        this.coeff = 1;
      };
    }.call(ScrollBar.prototype));
    var VScrollBar = function VScrollBar(parent, renderer) {
      ScrollBar.call(this, parent);
      this.scrollTop = 0;
      this.scrollHeight = 0;
      renderer.$scrollbarWidth = this.width = dom.scrollbarWidth(
        parent.ownerDocument
      );
      this.inner.style.width = this.element.style.width =
        (this.width || 15) + 5 + "px";
      this.$minWidth = 0;
    };
    oop.inherits(VScrollBar, ScrollBar);
    (function() {
      this.classSuffix = "-v";
      this.onScroll = function() {
        if (!this.skipEvent) {
          this.scrollTop = this.element.scrollTop;
          if (1 != this.coeff) {
            var h = this.element.clientHeight / this.scrollHeight;
            this.scrollTop = (this.scrollTop * (1 - h)) / (this.coeff - h);
          }
          this._emit("scroll", { data: this.scrollTop });
        }
        this.skipEvent = !1;
      };
      this.getWidth = function() {
        return Math.max(this.isVisible ? this.width : 0, this.$minWidth || 0);
      };
      this.setHeight = function(height) {
        this.element.style.height = height + "px";
      };
      this.setInnerHeight = this.setScrollHeight = function(height) {
        this.scrollHeight = height;
        if (height > MAX_SCROLL_H) {
          this.coeff = MAX_SCROLL_H / height;
          height = MAX_SCROLL_H;
        } else if (1 != this.coeff) {
          this.coeff = 1;
        }
        this.inner.style.height = height + "px";
      };
      this.setScrollTop = function(scrollTop) {
        if (this.scrollTop != scrollTop) {
          this.skipEvent = !0;
          this.scrollTop = scrollTop;
          this.element.scrollTop = scrollTop * this.coeff;
        }
      };
    }.call(VScrollBar.prototype));
    var HScrollBar = function HScrollBar(parent, renderer) {
      ScrollBar.call(this, parent);
      this.scrollLeft = 0;
      this.height = renderer.$scrollbarWidth;
      this.inner.style.height = this.element.style.height =
        (this.height || 15) + 5 + "px";
    };
    oop.inherits(HScrollBar, ScrollBar);
    (function() {
      this.classSuffix = "-h";
      this.onScroll = function() {
        if (!this.skipEvent) {
          this.scrollLeft = this.element.scrollLeft;
          this._emit("scroll", { data: this.scrollLeft });
        }
        this.skipEvent = !1;
      };
      this.getHeight = function() {
        return this.isVisible ? this.height : 0;
      };
      this.setWidth = function(width) {
        this.element.style.width = width + "px";
      };
      this.setInnerWidth = function(width) {
        this.inner.style.width = width + "px";
      };
      this.setScrollWidth = function(width) {
        this.inner.style.width = width + "px";
      };
      this.setScrollLeft = function(scrollLeft) {
        if (this.scrollLeft != scrollLeft) {
          this.skipEvent = !0;
          this.scrollLeft = this.element.scrollLeft = scrollLeft;
        }
      };
    }.call(HScrollBar.prototype));
    exports.ScrollBar = VScrollBar;
    exports.ScrollBarV = VScrollBar;
    exports.ScrollBarH = HScrollBar;
    exports.VScrollBar = VScrollBar;
    exports.HScrollBar = HScrollBar;
  }
);
ace.define(
  "ace/renderloop",
  ["require", "exports", "module", "ace/lib/event"],
  function(require, exports, module) {
    "use strict";
    var event = require("./lib/event"),
      RenderLoop = function RenderLoop(onRender, win) {
        this.onRender = onRender;
        this.pending = !1;
        this.changes = 0;
        this.window = win || window;
        var _self = this;
        this._flush = function(ts) {
          var changes = _self.changes;
          if (changes) {
            event.blockIdle(100);
            _self.changes = 0;
            _self.onRender(changes);
          }
          if (_self.changes) _self.schedule();
        };
      };
    (function() {
      this.schedule = function(change) {
        this.changes = this.changes | change;
        if (this.changes) {
          event.nextFrame(this._flush);
        }
      };
    }.call(RenderLoop.prototype));
    exports.RenderLoop = RenderLoop;
  }
);
ace.define(
  "ace/layer/font_metrics",
  [
    "require",
    "exports",
    "module",
    "ace/lib/oop",
    "ace/lib/dom",
    "ace/lib/lang",
    "ace/lib/event",
    "ace/lib/useragent",
    "ace/lib/event_emitter"
  ],
  function(require, exports, module) {
    var oop = require("../lib/oop"),
      dom = require("../lib/dom"),
      lang = require("../lib/lang"),
      event = require("../lib/event"),
      useragent = require("../lib/useragent"),
      EventEmitter = require("../lib/event_emitter").EventEmitter,
      CHAR_COUNT = 256,
      USE_OBSERVER = "function" == typeof ResizeObserver,
      L = 200,
      FontMetrics = (exports.FontMetrics = function(parentEl) {
        this.el = dom.createElement("div");
        this.$setMeasureNodeStyles(this.el.style, !0);
        this.$main = dom.createElement("div");
        this.$setMeasureNodeStyles(this.$main.style);
        this.$measureNode = dom.createElement("div");
        this.$setMeasureNodeStyles(this.$measureNode.style);
        this.el.appendChild(this.$main);
        this.el.appendChild(this.$measureNode);
        parentEl.appendChild(this.el);
        this.$measureNode.innerHTML = lang.stringRepeat("X", CHAR_COUNT);
        this.$characterSize = { width: 0, height: 0 };
        if (USE_OBSERVER) this.$addObserver();
        else this.checkForSizeChanges();
      });
    (function() {
      oop.implement(this, EventEmitter);
      this.$characterSize = { width: 0, height: 0 };
      this.$setMeasureNodeStyles = function(style, isRoot) {
        style.width = style.height = "auto";
        style.left = style.top = "0px";
        style.visibility = "hidden";
        style.position = "absolute";
        style.whiteSpace = "pre";
        if (8 > useragent.isIE) {
          style["font-family"] = "inherit";
        } else {
          style.font = "inherit";
        }
        style.overflow = isRoot ? "hidden" : "visible";
      };
      this.checkForSizeChanges = function(size) {
        if (size === void 0) size = this.$measureSizes();
        if (
          size &&
          (this.$characterSize.width !== size.width ||
            this.$characterSize.height !== size.height)
        ) {
          this.$measureNode.style.fontWeight = "bold";
          var boldSize = this.$measureSizes();
          this.$measureNode.style.fontWeight = "";
          this.$characterSize = size;
          this.charSizes = Object.create(null);
          this.allowBoldFonts =
            boldSize &&
            boldSize.width === size.width &&
            boldSize.height === size.height;
          this._emit("changeCharacterSize", { data: size });
        }
      };
      this.$addObserver = function() {
        var self = this;
        this.$observer = new window.ResizeObserver(function(e) {
          var rect = e[0].contentRect;
          self.checkForSizeChanges({
            height: rect.height,
            width: rect.width / CHAR_COUNT
          });
        });
        this.$observer.observe(this.$measureNode);
      };
      this.$pollSizeChanges = function() {
        if (this.$pollSizeChangesTimer || this.$observer)
          return this.$pollSizeChangesTimer;
        var self = this;
        return (this.$pollSizeChangesTimer = event.onIdle(function cb() {
          self.checkForSizeChanges();
          event.onIdle(cb, 500);
        }, 500));
      };
      this.setPolling = function(val) {
        if (val) {
          this.$pollSizeChanges();
        } else if (this.$pollSizeChangesTimer) {
          clearInterval(this.$pollSizeChangesTimer);
          this.$pollSizeChangesTimer = 0;
        }
      };
      this.$measureSizes = function(node) {
        var size = {
          height: (node || this.$measureNode).clientHeight,
          width: (node || this.$measureNode).clientWidth / CHAR_COUNT
        };
        if (0 === size.width || 0 === size.height) return null;
        return size;
      };
      this.$measureCharWidth = function(ch) {
        this.$main.innerHTML = lang.stringRepeat(ch, CHAR_COUNT);
        var rect = this.$main.getBoundingClientRect();
        return rect.width / CHAR_COUNT;
      };
      this.getCharacterWidth = function(ch) {
        var w = this.charSizes[ch];
        if (w === void 0) {
          w = this.charSizes[ch] =
            this.$measureCharWidth(ch) / this.$characterSize.width;
        }
        return w;
      };
      this.destroy = function() {
        clearInterval(this.$pollSizeChangesTimer);
        if (this.$observer) this.$observer.disconnect();
        if (this.el && this.el.parentNode)
          this.el.parentNode.removeChild(this.el);
      };
      this.$getZoom = function getZoom(element) {
        if (!element) return 1;
        return (
          (window.getComputedStyle(element).zoom || 1) *
          getZoom(element.parentElement)
        );
      };
      this.$initTransformMeasureNodes = function() {
        var t = function t(_t, l) {
          return [
            "div",
            { style: "position: absolute;top:" + _t + "px;left:" + l + "px;" }
          ];
        };
        this.els = dom.buildDom([t(0, 0), t(L, 0), t(0, L), t(L, L)], this.el);
      };
      this.transformCoordinates = function(clientPos, elPos) {
        if (clientPos) {
          var zoom = this.$getZoom(this.el);
          clientPos = mul(1 / zoom, clientPos);
        }
        function solve(l1, l2, r) {
          var det = l1[1] * l2[0] - l1[0] * l2[1];
          return [
            (-l2[1] * r[0] + l2[0] * r[1]) / det,
            (+l1[1] * r[0] - l1[0] * r[1]) / det
          ];
        }
        function sub(a, b) {
          return [a[0] - b[0], a[1] - b[1]];
        }
        function add(a, b) {
          return [a[0] + b[0], a[1] + b[1]];
        }
        function mul(a, b) {
          return [a * b[0], a * b[1]];
        }
        if (!this.els) this.$initTransformMeasureNodes();
        function p(el) {
          var r = el.getBoundingClientRect();
          return [r.left, r.top];
        }
        var a = p(this.els[0]),
          b = p(this.els[1]),
          c = p(this.els[2]),
          d = p(this.els[3]),
          h = solve(sub(d, b), sub(d, c), sub(add(b, c), add(d, a))),
          m1 = mul(1 + h[0], sub(b, a)),
          m2 = mul(1 + h[1], sub(c, a));
        if (elPos) {
          var x = elPos,
            k = (h[0] * x[0]) / L + (h[1] * x[1]) / L + 1,
            ut = add(mul(x[0], m1), mul(x[1], m2));
          return add(mul(1 / k / L, ut), a);
        }
        var u = sub(clientPos, a),
          f = solve(sub(m1, mul(h[0], u)), sub(m2, mul(h[1], u)), u);
        return mul(L, f);
      };
    }.call(FontMetrics.prototype));
  }
);
ace.define(
  "ace/virtual_renderer",
  [
    "require",
    "exports",
    "module",
    "ace/lib/oop",
    "ace/lib/dom",
    "ace/config",
    "ace/layer/gutter",
    "ace/layer/marker",
    "ace/layer/text",
    "ace/layer/cursor",
    "ace/scrollbar",
    "ace/scrollbar",
    "ace/renderloop",
    "ace/layer/font_metrics",
    "ace/lib/event_emitter",
    "ace/lib/useragent"
  ],
  function(require, exports, module) {
    "use strict";
    var _Mathceil = Math.ceil,
      _Mathround2 = Math.round,
      _Mathfloor4 = Math.floor,
      _Mathmin7 = Math.min,
      _Mathmax7 = Math.max,
      oop = require("./lib/oop"),
      dom = require("./lib/dom"),
      config = require("./config"),
      GutterLayer = require("./layer/gutter").Gutter,
      MarkerLayer = require("./layer/marker").Marker,
      TextLayer = require("./layer/text").Text,
      CursorLayer = require("./layer/cursor").Cursor,
      HScrollBar = require("./scrollbar").HScrollBar,
      VScrollBar = require("./scrollbar").VScrollBar,
      RenderLoop = require("./renderloop").RenderLoop,
      FontMetrics = require("./layer/font_metrics").FontMetrics,
      EventEmitter = require("./lib/event_emitter").EventEmitter,
      editorCss =
        '.ace_br1 {border-top-left-radius    : 3px;}.ace_br2 {border-top-right-radius   : 3px;}.ace_br3 {border-top-left-radius    : 3px; border-top-right-radius:    3px;}.ace_br4 {border-bottom-right-radius: 3px;}.ace_br5 {border-top-left-radius    : 3px; border-bottom-right-radius: 3px;}.ace_br6 {border-top-right-radius   : 3px; border-bottom-right-radius: 3px;}.ace_br7 {border-top-left-radius    : 3px; border-top-right-radius:    3px; border-bottom-right-radius: 3px;}.ace_br8 {border-bottom-left-radius : 3px;}.ace_br9 {border-top-left-radius    : 3px; border-bottom-left-radius:  3px;}.ace_br10{border-top-right-radius   : 3px; border-bottom-left-radius:  3px;}.ace_br11{border-top-left-radius    : 3px; border-top-right-radius:    3px; border-bottom-left-radius:  3px;}.ace_br12{border-bottom-right-radius: 3px; border-bottom-left-radius:  3px;}.ace_br13{border-top-left-radius    : 3px; border-bottom-right-radius: 3px; border-bottom-left-radius:  3px;}.ace_br14{border-top-right-radius   : 3px; border-bottom-right-radius: 3px; border-bottom-left-radius:  3px;}.ace_br15{border-top-left-radius    : 3px; border-top-right-radius:    3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px;}.ace_editor {position: relative;overflow: hidden;font: 12px/normal \'Monaco\', \'Menlo\', \'Ubuntu Mono\', \'Consolas\', \'source-code-pro\', monospace;direction: ltr;text-align: left;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);}.ace_scroller {position: absolute;overflow: hidden;top: 0;bottom: 0;background-color: inherit;-ms-user-select: none;-moz-user-select: none;-webkit-user-select: none;user-select: none;cursor: text;}.ace_content {position: absolute;box-sizing: border-box;min-width: 100%;contain: style size layout;}.ace_dragging .ace_scroller:before{position: absolute;top: 0;left: 0;right: 0;bottom: 0;content: \'\';background: rgba(250, 250, 250, 0.01);z-index: 1000;}.ace_dragging.ace_dark .ace_scroller:before{background: rgba(0, 0, 0, 0.01);}.ace_selecting, .ace_selecting * {cursor: text !important;}.ace_gutter {position: absolute;overflow : hidden;width: auto;top: 0;bottom: 0;left: 0;cursor: default;z-index: 4;-ms-user-select: none;-moz-user-select: none;-webkit-user-select: none;user-select: none;contain: style size layout;}.ace_gutter-active-line {position: absolute;left: 0;right: 0;}.ace_scroller.ace_scroll-left {box-shadow: 17px 0 16px -16px rgba(0, 0, 0, 0.4) inset;}.ace_gutter-cell {position: absolute;top: 0;left: 0;right: 0;padding-left: 19px;padding-right: 6px;background-repeat: no-repeat;}.ace_gutter-cell.ace_error {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABOFBMVEX/////////QRswFAb/Ui4wFAYwFAYwFAaWGAfDRymzOSH/PxswFAb/SiUwFAYwFAbUPRvjQiDllog5HhHdRybsTi3/Tyv9Tir+Syj/UC3////XurebMBIwFAb/RSHbPx/gUzfdwL3kzMivKBAwFAbbvbnhPx66NhowFAYwFAaZJg8wFAaxKBDZurf/RB6mMxb/SCMwFAYwFAbxQB3+RB4wFAb/Qhy4Oh+4QifbNRcwFAYwFAYwFAb/QRzdNhgwFAYwFAbav7v/Uy7oaE68MBK5LxLewr/r2NXewLswFAaxJw4wFAbkPRy2PyYwFAaxKhLm1tMwFAazPiQwFAaUGAb/QBrfOx3bvrv/VC/maE4wFAbRPBq6MRO8Qynew8Dp2tjfwb0wFAbx6eju5+by6uns4uH9/f36+vr/GkHjAAAAYnRSTlMAGt+64rnWu/bo8eAA4InH3+DwoN7j4eLi4xP99Nfg4+b+/u9B/eDs1MD1mO7+4PHg2MXa347g7vDizMLN4eG+Pv7i5evs/v79yu7S3/DV7/498Yv24eH+4ufQ3Ozu/v7+y13sRqwAAADLSURBVHjaZc/XDsFgGIBhtDrshlitmk2IrbHFqL2pvXf/+78DPokj7+Fz9qpU/9UXJIlhmPaTaQ6QPaz0mm+5gwkgovcV6GZzd5JtCQwgsxoHOvJO15kleRLAnMgHFIESUEPmawB9ngmelTtipwwfASilxOLyiV5UVUyVAfbG0cCPHig+GBkzAENHS0AstVF6bacZIOzgLmxsHbt2OecNgJC83JERmePUYq8ARGkJx6XtFsdddBQgZE2nPR6CICZhawjA4Fb/chv+399kfR+MMMDGOQAAAABJRU5ErkJggg==");background-repeat: no-repeat;background-position: 2px center;}.ace_gutter-cell.ace_warning {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAmVBMVEX///8AAAD///8AAAAAAABPSzb/5sAAAAB/blH/73z/ulkAAAAAAAD85pkAAAAAAAACAgP/vGz/rkDerGbGrV7/pkQICAf////e0IsAAAD/oED/qTvhrnUAAAD/yHD/njcAAADuv2r/nz//oTj/p064oGf/zHAAAAA9Nir/tFIAAAD/tlTiuWf/tkIAAACynXEAAAAAAAAtIRW7zBpBAAAAM3RSTlMAABR1m7RXO8Ln31Z36zT+neXe5OzooRDfn+TZ4p3h2hTf4t3k3ucyrN1K5+Xaks52Sfs9CXgrAAAAjklEQVR42o3PbQ+CIBQFYEwboPhSYgoYunIqqLn6/z8uYdH8Vmdnu9vz4WwXgN/xTPRD2+sgOcZjsge/whXZgUaYYvT8QnuJaUrjrHUQreGczuEafQCO/SJTufTbroWsPgsllVhq3wJEk2jUSzX3CUEDJC84707djRc5MTAQxoLgupWRwW6UB5fS++NV8AbOZgnsC7BpEAAAAABJRU5ErkJggg==");background-position: 2px center;}.ace_gutter-cell.ace_info {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAAAAAA6mKC9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAJ0Uk5TAAB2k804AAAAPklEQVQY02NgIB68QuO3tiLznjAwpKTgNyDbMegwisCHZUETUZV0ZqOquBpXj2rtnpSJT1AEnnRmL2OgGgAAIKkRQap2htgAAAAASUVORK5CYII=");background-position: 2px center;}.ace_dark .ace_gutter-cell.ace_info {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAJFBMVEUAAAChoaGAgIAqKiq+vr6tra1ZWVmUlJSbm5s8PDxubm56enrdgzg3AAAAAXRSTlMAQObYZgAAAClJREFUeNpjYMAPdsMYHegyJZFQBlsUlMFVCWUYKkAZMxZAGdxlDMQBAG+TBP4B6RyJAAAAAElFTkSuQmCC");}.ace_scrollbar {contain: strict;position: absolute;right: 0;bottom: 0;z-index: 6;}.ace_scrollbar-inner {position: absolute;cursor: text;left: 0;top: 0;}.ace_scrollbar-v{overflow-x: hidden;overflow-y: scroll;top: 0;}.ace_scrollbar-h {overflow-x: scroll;overflow-y: hidden;left: 0;}.ace_print-margin {position: absolute;height: 100%;}.ace_text-input {position: absolute;z-index: 0;width: 8px;height: 16px;opacity: 0;background: transparent;-moz-appearance: none;appearance: none;border: none;resize: none;outline: none;overflow: hidden;font: inherit;padding: 0 1px;margin: 0 -1px;contain: strict;-ms-user-select: text;-moz-user-select: text;-webkit-user-select: text;user-select: text;white-space: pre!important;}.ace_text-input.ace_composition {background: transparent;color: inherit;z-index: 1000;opacity: 1;}.ace_composition_placeholder { color: transparent }.ace_composition_marker { border-bottom: 1px solid;position: absolute;border-radius: 0;margin-top: 1px;}[ace_nocontext=true] {transform: none!important;filter: none!important;perspective: none!important;clip-path: none!important;mask : none!important;contain: none!important;perspective: none!important;mix-blend-mode: initial!important;z-index: auto;}.ace_layer {z-index: 1;position: absolute;overflow: hidden;word-wrap: normal;white-space: pre;height: 100%;width: 100%;box-sizing: border-box;pointer-events: none;}.ace_gutter-layer {position: relative;width: auto;text-align: right;pointer-events: auto;height: 1000000px;contain: style size layout;}.ace_text-layer {font: inherit !important;position: absolute;height: 1000000px;width: 1000000px;contain: style size layout;}.ace_text-layer > .ace_line, .ace_text-layer > .ace_line_group {contain: style size layout;position: absolute;top: 0;left: 0;right: 0;}.ace_hidpi .ace_text-layer,.ace_hidpi .ace_gutter-layer,.ace_hidpi .ace_content,.ace_hidpi .ace_gutter {contain: strict;will-change: transform;}.ace_hidpi .ace_text-layer > .ace_line, .ace_hidpi .ace_text-layer > .ace_line_group {contain: strict;}.ace_cjk {display: inline-block;text-align: center;}.ace_cursor-layer {z-index: 4;}.ace_cursor {z-index: 4;position: absolute;box-sizing: border-box;border-left: 2px solid;transform: translatez(0);}.ace_multiselect .ace_cursor {border-left-width: 1px;}.ace_slim-cursors .ace_cursor {border-left-width: 1px;}.ace_overwrite-cursors .ace_cursor {border-left-width: 0;border-bottom: 1px solid;}.ace_hidden-cursors .ace_cursor {opacity: 0.2;}.ace_smooth-blinking .ace_cursor {transition: opacity 0.18s;}.ace_animate-blinking .ace_cursor {animation-duration: 1000ms;animation-timing-function: step-end;animation-name: blink-ace-animate;animation-iteration-count: infinite;}.ace_animate-blinking.ace_smooth-blinking .ace_cursor {animation-duration: 1000ms;animation-timing-function: ease-in-out;animation-name: blink-ace-animate-smooth;}@keyframes blink-ace-animate {from, to { opacity: 1; }60% { opacity: 0; }}@keyframes blink-ace-animate-smooth {from, to { opacity: 1; }45% { opacity: 1; }60% { opacity: 0; }85% { opacity: 0; }}.ace_marker-layer .ace_step, .ace_marker-layer .ace_stack {position: absolute;z-index: 3;}.ace_marker-layer .ace_selection {position: absolute;z-index: 5;}.ace_marker-layer .ace_bracket {position: absolute;z-index: 6;}.ace_marker-layer .ace_active-line {position: absolute;z-index: 2;}.ace_marker-layer .ace_selected-word {position: absolute;z-index: 4;box-sizing: border-box;}.ace_line .ace_fold {box-sizing: border-box;display: inline-block;height: 11px;margin-top: -2px;vertical-align: middle;background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAJCAYAAADU6McMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJpJREFUeNpi/P//PwOlgAXGYGRklAVSokD8GmjwY1wasKljQpYACtpCFeADcHVQfQyMQAwzwAZI3wJKvCLkfKBaMSClBlR7BOQikCFGQEErIH0VqkabiGCAqwUadAzZJRxQr/0gwiXIal8zQQPnNVTgJ1TdawL0T5gBIP1MUJNhBv2HKoQHHjqNrA4WO4zY0glyNKLT2KIfIMAAQsdgGiXvgnYAAAAASUVORK5CYII="),url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAA3CAYAAADNNiA5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACJJREFUeNpi+P//fxgTAwPDBxDxD078RSX+YeEyDFMCIMAAI3INmXiwf2YAAAAASUVORK5CYII=");background-repeat: no-repeat, repeat-x;background-position: center center, top left;color: transparent;border: 1px solid black;border-radius: 2px;cursor: pointer;pointer-events: auto;}.ace_dark .ace_fold {}.ace_fold:hover{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAJCAYAAADU6McMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJpJREFUeNpi/P//PwOlgAXGYGRklAVSokD8GmjwY1wasKljQpYACtpCFeADcHVQfQyMQAwzwAZI3wJKvCLkfKBaMSClBlR7BOQikCFGQEErIH0VqkabiGCAqwUadAzZJRxQr/0gwiXIal8zQQPnNVTgJ1TdawL0T5gBIP1MUJNhBv2HKoQHHjqNrA4WO4zY0glyNKLT2KIfIMAAQsdgGiXvgnYAAAAASUVORK5CYII="),url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAA3CAYAAADNNiA5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACBJREFUeNpi+P//fz4TAwPDZxDxD5X4i5fLMEwJgAADAEPVDbjNw87ZAAAAAElFTkSuQmCC");}.ace_tooltip {background-color: #FFF;background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.1));border: 1px solid gray;border-radius: 1px;box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);color: black;max-width: 100%;padding: 3px 4px;position: fixed;z-index: 999999;box-sizing: border-box;cursor: default;white-space: pre;word-wrap: break-word;line-height: normal;font-style: normal;font-weight: normal;letter-spacing: normal;pointer-events: none;}.ace_folding-enabled > .ace_gutter-cell {padding-right: 13px;}.ace_fold-widget {box-sizing: border-box;margin: 0 -12px 0 1px;display: none;width: 11px;vertical-align: top;background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAANElEQVR42mWKsQ0AMAzC8ixLlrzQjzmBiEjp0A6WwBCSPgKAXoLkqSot7nN3yMwR7pZ32NzpKkVoDBUxKAAAAABJRU5ErkJggg==");background-repeat: no-repeat;background-position: center;border-radius: 3px;border: 1px solid transparent;cursor: pointer;}.ace_folding-enabled .ace_fold-widget {display: inline-block;   }.ace_fold-widget.ace_end {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAANElEQVR42m3HwQkAMAhD0YzsRchFKI7sAikeWkrxwScEB0nh5e7KTPWimZki4tYfVbX+MNl4pyZXejUO1QAAAABJRU5ErkJggg==");}.ace_fold-widget.ace_closed {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAGCAYAAAAG5SQMAAAAOUlEQVR42jXKwQkAMAgDwKwqKD4EwQ26sSOkVWjgIIHAzPiCgaqiqnJHZnKICBERHN194O5b9vbLuAVRL+l0YWnZAAAAAElFTkSuQmCCXA==");}.ace_fold-widget:hover {border: 1px solid rgba(0, 0, 0, 0.3);background-color: rgba(255, 255, 255, 0.2);box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);}.ace_fold-widget:active {border: 1px solid rgba(0, 0, 0, 0.4);background-color: rgba(0, 0, 0, 0.05);box-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);}.ace_dark .ace_fold-widget {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHklEQVQIW2P4//8/AzoGEQ7oGCaLLAhWiSwB146BAQCSTPYocqT0AAAAAElFTkSuQmCC");}.ace_dark .ace_fold-widget.ace_end {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAH0lEQVQIW2P4//8/AxQ7wNjIAjDMgC4AxjCVKBirIAAF0kz2rlhxpAAAAABJRU5ErkJggg==");}.ace_dark .ace_fold-widget.ace_closed {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHElEQVQIW2P4//+/AxAzgDADlOOAznHAKgPWAwARji8UIDTfQQAAAABJRU5ErkJggg==");}.ace_dark .ace_fold-widget:hover {box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);background-color: rgba(255, 255, 255, 0.1);}.ace_dark .ace_fold-widget:active {box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);}.ace_inline_button {border: 1px solid lightgray;display: inline-block;margin: -1px 8px;padding: 0 5px;pointer-events: auto;cursor: pointer;}.ace_inline_button:hover {border-color: gray;background: rgba(200,200,200,0.2);display: inline-block;pointer-events: auto;}.ace_fold-widget.ace_invalid {background-color: #FFB4B4;border-color: #DE5555;}.ace_fade-fold-widgets .ace_fold-widget {transition: opacity 0.4s ease 0.05s;opacity: 0;}.ace_fade-fold-widgets:hover .ace_fold-widget {transition: opacity 0.05s ease 0.05s;opacity:1;}.ace_underline {text-decoration: underline;}.ace_bold {font-weight: bold;}.ace_nobold .ace_bold {font-weight: normal;}.ace_italic {font-style: italic;}.ace_error-marker {background-color: rgba(255, 0, 0,0.2);position: absolute;z-index: 9;}.ace_highlight-marker {background-color: rgba(255, 255, 0,0.2);position: absolute;z-index: 8;}.ace_text-input-ios {position: absolute !important;top: -100000px !important;left: -100000px !important;}',
      useragent = require("./lib/useragent"),
      HIDE_TEXTAREA = useragent.isIE;
    dom.importCssString(editorCss, "ace_editor.css");
    var VirtualRenderer = function VirtualRenderer(container, theme) {
      var _self = this;
      this.container = container || dom.createElement("div");
      dom.addCssClass(this.container, "ace_editor");
      if (dom.HI_DPI) dom.addCssClass(this.container, "ace_hidpi");
      this.setTheme(theme);
      this.$gutter = dom.createElement("div");
      this.$gutter.className = "ace_gutter";
      this.container.appendChild(this.$gutter);
      this.$gutter.setAttribute("aria-hidden", !0);
      this.scroller = dom.createElement("div");
      this.scroller.className = "ace_scroller";
      this.container.appendChild(this.scroller);
      this.content = dom.createElement("div");
      this.content.className = "ace_content";
      this.scroller.appendChild(this.content);
      this.$gutterLayer = new GutterLayer(this.$gutter);
      this.$gutterLayer.on("changeGutterWidth", this.onGutterResize.bind(this));
      this.$markerBack = new MarkerLayer(this.content);
      var textLayer = (this.$textLayer = new TextLayer(this.content));
      this.canvas = textLayer.element;
      this.$markerFront = new MarkerLayer(this.content);
      this.$cursorLayer = new CursorLayer(this.content);
      this.$horizScroll = !1;
      this.$vScroll = !1;
      this.scrollBar = this.scrollBarV = new VScrollBar(this.container, this);
      this.scrollBarH = new HScrollBar(this.container, this);
      this.scrollBarV.addEventListener("scroll", function(e) {
        if (!_self.$scrollAnimation)
          _self.session.setScrollTop(e.data - _self.scrollMargin.top);
      });
      this.scrollBarH.addEventListener("scroll", function(e) {
        if (!_self.$scrollAnimation)
          _self.session.setScrollLeft(e.data - _self.scrollMargin.left);
      });
      this.scrollTop = 0;
      this.scrollLeft = 0;
      this.cursorPos = { row: 0, column: 0 };
      this.$fontMetrics = new FontMetrics(this.container);
      this.$textLayer.$setFontMetrics(this.$fontMetrics);
      this.$textLayer.addEventListener("changeCharacterSize", function(e) {
        _self.updateCharacterSize();
        _self.onResize(
          !0,
          _self.gutterWidth,
          _self.$size.width,
          _self.$size.height
        );
        _self._signal("changeCharacterSize", e);
      });
      this.$size = {
        width: 0,
        height: 0,
        scrollerHeight: 0,
        scrollerWidth: 0,
        $dirty: !0
      };
      this.layerConfig = {
        width: 1,
        padding: 0,
        firstRow: 0,
        firstRowScreen: 0,
        lastRow: 0,
        lineHeight: 0,
        characterWidth: 0,
        minHeight: 1,
        maxHeight: 1,
        offset: 0,
        height: 1,
        gutterOffset: 1
      };
      this.scrollMargin = { left: 0, right: 0, top: 0, bottom: 0, v: 0, h: 0 };
      this.margin = { left: 0, right: 0, top: 0, bottom: 0, v: 0, h: 0 };
      this.$keepTextAreaAtCursor = !0;
      this.$loop = new RenderLoop(
        this.$renderChanges.bind(this),
        this.container.ownerDocument.defaultView
      );
      this.$loop.schedule(this.CHANGE_FULL);
      this.updateCharacterSize();
      this.setPadding(4);
      config.resetOptions(this);
      config._emit("renderer", this);
    };
    (function() {
      this.CHANGE_CURSOR = 1;
      this.CHANGE_MARKER = 2;
      this.CHANGE_GUTTER = 4;
      this.CHANGE_SCROLL = 8;
      this.CHANGE_LINES = 16;
      this.CHANGE_TEXT = 32;
      this.CHANGE_SIZE = 64;
      this.CHANGE_MARKER_BACK = 128;
      this.CHANGE_MARKER_FRONT = 256;
      this.CHANGE_FULL = 512;
      this.CHANGE_H_SCROLL = 1024;
      oop.implement(this, EventEmitter);
      this.updateCharacterSize = function() {
        if (this.$textLayer.allowBoldFonts != this.$allowBoldFonts) {
          this.$allowBoldFonts = this.$textLayer.allowBoldFonts;
          this.setStyle("ace_nobold", !this.$allowBoldFonts);
        }
        this.layerConfig.characterWidth = this.characterWidth = this.$textLayer.getCharacterWidth();
        this.layerConfig.lineHeight = this.lineHeight = this.$textLayer.getLineHeight();
        this.$updatePrintMargin();
      };
      this.setSession = function(session) {
        if (this.session)
          this.session.doc.off("changeNewLineMode", this.onChangeNewLineMode);
        this.session = session;
        if (session && this.scrollMargin.top && 0 >= session.getScrollTop())
          session.setScrollTop(-this.scrollMargin.top);
        this.$cursorLayer.setSession(session);
        this.$markerBack.setSession(session);
        this.$markerFront.setSession(session);
        this.$gutterLayer.setSession(session);
        this.$textLayer.setSession(session);
        if (!session) return;
        this.$loop.schedule(this.CHANGE_FULL);
        this.session.$setFontMetrics(this.$fontMetrics);
        this.scrollBarH.scrollLeft = this.scrollBarV.scrollTop = null;
        this.onChangeNewLineMode = this.onChangeNewLineMode.bind(this);
        this.onChangeNewLineMode();
        this.session.doc.on("changeNewLineMode", this.onChangeNewLineMode);
      };
      this.updateLines = function(firstRow, lastRow, force) {
        if (lastRow === void 0) lastRow = 1 / 0;
        if (!this.$changedLines) {
          this.$changedLines = { firstRow: firstRow, lastRow: lastRow };
        } else {
          if (this.$changedLines.firstRow > firstRow)
            this.$changedLines.firstRow = firstRow;
          if (this.$changedLines.lastRow < lastRow)
            this.$changedLines.lastRow = lastRow;
        }
        if (this.$changedLines.lastRow < this.layerConfig.firstRow) {
          if (force) this.$changedLines.lastRow = this.layerConfig.lastRow;
          else return;
        }
        if (this.$changedLines.firstRow > this.layerConfig.lastRow) return;
        this.$loop.schedule(this.CHANGE_LINES);
      };
      this.onChangeNewLineMode = function() {
        this.$loop.schedule(this.CHANGE_TEXT);
        this.$textLayer.$updateEolChar();
        this.session.$bidiHandler.setEolChar(this.$textLayer.EOL_CHAR);
      };
      this.onChangeTabSize = function() {
        this.$loop.schedule(this.CHANGE_TEXT | this.CHANGE_MARKER);
        this.$textLayer.onChangeTabSize();
      };
      this.updateText = function() {
        this.$loop.schedule(this.CHANGE_TEXT);
      };
      this.updateFull = function(force) {
        if (force) this.$renderChanges(this.CHANGE_FULL, !0);
        else this.$loop.schedule(this.CHANGE_FULL);
      };
      this.updateFontSize = function() {
        this.$textLayer.checkForSizeChanges();
      };
      this.$changes = 0;
      this.$updateSizeAsync = function() {
        if (this.$loop.pending) this.$size.$dirty = !0;
        else this.onResize();
      };
      this.onResize = function(force, gutterWidth, width, height) {
        if (2 < this.resizing) return;
        else if (0 < this.resizing) this.resizing++;
        else this.resizing = force ? 1 : 0;
        var el = this.container;
        if (!height) height = el.clientHeight || el.scrollHeight;
        if (!width) width = el.clientWidth || el.scrollWidth;
        var changes = this.$updateCachedSize(force, gutterWidth, width, height);
        if (!this.$size.scrollerHeight || (!width && !height))
          return (this.resizing = 0);
        if (force) this.$gutterLayer.$padding = null;
        if (force) this.$renderChanges(changes | this.$changes, !0);
        else this.$loop.schedule(changes | this.$changes);
        if (this.resizing) this.resizing = 0;
        this.scrollBarV.scrollLeft = this.scrollBarV.scrollTop = null;
      };
      this.$updateCachedSize = function(force, gutterWidth, width, height) {
        height -= this.$extraHeight || 0;
        var changes = 0,
          size = this.$size,
          oldSize = {
            width: size.width,
            height: size.height,
            scrollerHeight: size.scrollerHeight,
            scrollerWidth: size.scrollerWidth
          };
        if (height && (force || size.height != height)) {
          size.height = height;
          changes |= this.CHANGE_SIZE;
          size.scrollerHeight = size.height;
          if (this.$horizScroll)
            size.scrollerHeight -= this.scrollBarH.getHeight();
          this.scrollBarV.element.style.bottom =
            this.scrollBarH.getHeight() + "px";
          changes = changes | this.CHANGE_SCROLL;
        }
        if (width && (force || size.width != width)) {
          changes |= this.CHANGE_SIZE;
          size.width = width;
          if (null == gutterWidth)
            gutterWidth = this.$showGutter ? this.$gutter.offsetWidth : 0;
          this.gutterWidth = gutterWidth;
          dom.setStyle(
            this.scrollBarH.element.style,
            "left",
            gutterWidth + "px"
          );
          dom.setStyle(
            this.scroller.style,
            "left",
            gutterWidth + this.margin.left + "px"
          );
          size.scrollerWidth = _Mathmax7(
            0,
            width - gutterWidth - this.scrollBarV.getWidth() - this.margin.h
          );
          dom.setStyle(this.$gutter.style, "left", this.margin.left + "px");
          var right = this.scrollBarV.getWidth() + "px";
          dom.setStyle(this.scrollBarH.element.style, "right", right);
          dom.setStyle(this.scroller.style, "right", right);
          dom.setStyle(
            this.scroller.style,
            "bottom",
            this.scrollBarH.getHeight()
          );
          if (
            (this.session &&
              this.session.getUseWrapMode() &&
              this.adjustWrapLimit()) ||
            force
          ) {
            changes |= this.CHANGE_FULL;
          }
        }
        size.$dirty = !width || !height;
        if (changes) this._signal("resize", oldSize);
        return changes;
      };
      this.onGutterResize = function(width) {
        var gutterWidth = this.$showGutter ? width : 0;
        if (gutterWidth != this.gutterWidth)
          this.$changes |= this.$updateCachedSize(
            !0,
            gutterWidth,
            this.$size.width,
            this.$size.height
          );
        if (this.session.getUseWrapMode() && this.adjustWrapLimit()) {
          this.$loop.schedule(this.CHANGE_FULL);
        } else if (this.$size.$dirty) {
          this.$loop.schedule(this.CHANGE_FULL);
        } else {
          this.$computeLayerConfig();
        }
      };
      this.adjustWrapLimit = function() {
        var availableWidth = this.$size.scrollerWidth - 2 * this.$padding,
          limit = _Mathfloor4(availableWidth / this.characterWidth);
        return this.session.adjustWrapLimit(
          limit,
          this.$showPrintMargin && this.$printMarginColumn
        );
      };
      this.setAnimatedScroll = function(shouldAnimate) {
        this.setOption("animatedScroll", shouldAnimate);
      };
      this.getAnimatedScroll = function() {
        return this.$animatedScroll;
      };
      this.setShowInvisibles = function(showInvisibles) {
        this.setOption("showInvisibles", showInvisibles);
        this.session.$bidiHandler.setShowInvisibles(showInvisibles);
      };
      this.getShowInvisibles = function() {
        return this.getOption("showInvisibles");
      };
      this.getDisplayIndentGuides = function() {
        return this.getOption("displayIndentGuides");
      };
      this.setDisplayIndentGuides = function(display) {
        this.setOption("displayIndentGuides", display);
      };
      this.setShowPrintMargin = function(showPrintMargin) {
        this.setOption("showPrintMargin", showPrintMargin);
      };
      this.getShowPrintMargin = function() {
        return this.getOption("showPrintMargin");
      };
      this.setPrintMarginColumn = function(showPrintMargin) {
        this.setOption("printMarginColumn", showPrintMargin);
      };
      this.getPrintMarginColumn = function() {
        return this.getOption("printMarginColumn");
      };
      this.getShowGutter = function() {
        return this.getOption("showGutter");
      };
      this.setShowGutter = function(show) {
        return this.setOption("showGutter", show);
      };
      this.getFadeFoldWidgets = function() {
        return this.getOption("fadeFoldWidgets");
      };
      this.setFadeFoldWidgets = function(show) {
        this.setOption("fadeFoldWidgets", show);
      };
      this.setHighlightGutterLine = function(shouldHighlight) {
        this.setOption("highlightGutterLine", shouldHighlight);
      };
      this.getHighlightGutterLine = function() {
        return this.getOption("highlightGutterLine");
      };
      this.$updatePrintMargin = function() {
        if (!this.$showPrintMargin && !this.$printMarginEl) return;
        if (!this.$printMarginEl) {
          var containerEl = dom.createElement("div");
          containerEl.className = "ace_layer ace_print-margin-layer";
          this.$printMarginEl = dom.createElement("div");
          this.$printMarginEl.className = "ace_print-margin";
          containerEl.appendChild(this.$printMarginEl);
          this.content.insertBefore(containerEl, this.content.firstChild);
        }
        var style = this.$printMarginEl.style;
        style.left =
          _Mathround2(
            this.characterWidth * this.$printMarginColumn + this.$padding
          ) + "px";
        style.visibility = this.$showPrintMargin ? "visible" : "hidden";
        if (this.session && -1 == this.session.$wrap) this.adjustWrapLimit();
      };
      this.getContainerElement = function() {
        return this.container;
      };
      this.getMouseEventTarget = function() {
        return this.scroller;
      };
      this.getTextAreaContainer = function() {
        return this.container;
      };
      this.$moveTextAreaToCursor = function() {
        var style = this.textarea.style;
        if (!this.$keepTextAreaAtCursor) {
          dom.translate(this.textarea, -100, 0);
          return;
        }
        var pixelPos = this.$cursorLayer.$pixelPos;
        if (!pixelPos) return;
        var composition = this.$composition;
        if (composition && composition.markerRange)
          pixelPos = this.$cursorLayer.getPixelPosition(
            composition.markerRange.start,
            !0
          );
        var config = this.layerConfig,
          posTop = pixelPos.top,
          posLeft = pixelPos.left;
        posTop -= config.offset;
        var h =
          composition && composition.useTextareaForIME
            ? this.lineHeight
            : HIDE_TEXTAREA
              ? 0
              : 1;
        if (0 > posTop || posTop > config.height - h) {
          dom.translate(this.textarea, 0, 0);
          return;
        }
        var w = 1;
        if (!composition) {
          posTop += this.lineHeight;
        } else {
          if (composition.useTextareaForIME) {
            var val = this.textarea.value;
            w =
              this.characterWidth * this.session.$getStringScreenWidth(val)[0];
            h += 2;
          } else {
            posTop += this.lineHeight + 2;
          }
        }
        posLeft -= this.scrollLeft;
        if (posLeft > this.$size.scrollerWidth - w)
          posLeft = this.$size.scrollerWidth - w;
        posLeft += this.gutterWidth + this.margin.left;
        dom.setStyle(style, "height", h + "px");
        dom.setStyle(style, "width", w + "px");
        dom.translate(
          this.textarea,
          _Mathmin7(posLeft, this.$size.scrollerWidth - w),
          _Mathmin7(posTop, this.$size.height - h)
        );
      };
      this.getFirstVisibleRow = function() {
        return this.layerConfig.firstRow;
      };
      this.getFirstFullyVisibleRow = function() {
        return (
          this.layerConfig.firstRow + (0 === this.layerConfig.offset ? 0 : 1)
        );
      };
      this.getLastFullyVisibleRow = function() {
        var config = this.layerConfig,
          lastRow = config.lastRow,
          top =
            this.session.documentToScreenRow(lastRow, 0) * config.lineHeight;
        if (
          top - this.session.getScrollTop() >
          config.height - config.lineHeight
        )
          return lastRow - 1;
        return lastRow;
      };
      this.getLastVisibleRow = function() {
        return this.layerConfig.lastRow;
      };
      this.$padding = null;
      this.setPadding = function(padding) {
        this.$padding = padding;
        this.$textLayer.setPadding(padding);
        this.$cursorLayer.setPadding(padding);
        this.$markerFront.setPadding(padding);
        this.$markerBack.setPadding(padding);
        this.$loop.schedule(this.CHANGE_FULL);
        this.$updatePrintMargin();
      };
      this.setScrollMargin = function(top, bottom, left, right) {
        var sm = this.scrollMargin;
        sm.top = 0 | top;
        sm.bottom = 0 | bottom;
        sm.right = 0 | right;
        sm.left = 0 | left;
        sm.v = sm.top + sm.bottom;
        sm.h = sm.left + sm.right;
        if (sm.top && 0 >= this.scrollTop && this.session)
          this.session.setScrollTop(-sm.top);
        this.updateFull();
      };
      this.setMargin = function(top, bottom, left, right) {
        var sm = this.margin;
        sm.top = 0 | top;
        sm.bottom = 0 | bottom;
        sm.right = 0 | right;
        sm.left = 0 | left;
        sm.v = sm.top + sm.bottom;
        sm.h = sm.left + sm.right;
        this.$updateCachedSize(
          !0,
          this.gutterWidth,
          this.$size.width,
          this.$size.height
        );
        this.updateFull();
      };
      this.getHScrollBarAlwaysVisible = function() {
        return this.$hScrollBarAlwaysVisible;
      };
      this.setHScrollBarAlwaysVisible = function(alwaysVisible) {
        this.setOption("hScrollBarAlwaysVisible", alwaysVisible);
      };
      this.getVScrollBarAlwaysVisible = function() {
        return this.$vScrollBarAlwaysVisible;
      };
      this.setVScrollBarAlwaysVisible = function(alwaysVisible) {
        this.setOption("vScrollBarAlwaysVisible", alwaysVisible);
      };
      this.$updateScrollBarV = function() {
        var scrollHeight = this.layerConfig.maxHeight,
          scrollerHeight = this.$size.scrollerHeight;
        if (!this.$maxLines && this.$scrollPastEnd) {
          scrollHeight -=
            (scrollerHeight - this.lineHeight) * this.$scrollPastEnd;
          if (this.scrollTop > scrollHeight - scrollerHeight) {
            scrollHeight = this.scrollTop + scrollerHeight;
            this.scrollBarV.scrollTop = null;
          }
        }
        this.scrollBarV.setScrollHeight(scrollHeight + this.scrollMargin.v);
        this.scrollBarV.setScrollTop(this.scrollTop + this.scrollMargin.top);
      };
      this.$updateScrollBarH = function() {
        this.scrollBarH.setScrollWidth(
          this.layerConfig.width + 2 * this.$padding + this.scrollMargin.h
        );
        this.scrollBarH.setScrollLeft(this.scrollLeft + this.scrollMargin.left);
      };
      this.$frozen = !1;
      this.freeze = function() {
        this.$frozen = !0;
      };
      this.unfreeze = function() {
        this.$frozen = !1;
      };
      this.$renderChanges = function(changes, force) {
        if (this.$changes) {
          changes |= this.$changes;
          this.$changes = 0;
        }
        if (
          !this.session ||
          !this.container.offsetWidth ||
          this.$frozen ||
          (!changes && !force)
        ) {
          this.$changes |= changes;
          return;
        }
        if (this.$size.$dirty) {
          this.$changes |= changes;
          return this.onResize(!0);
        }
        if (!this.lineHeight) {
          this.$textLayer.checkForSizeChanges();
        }
        this._signal("beforeRender");
        if (this.session && this.session.$bidiHandler)
          this.session.$bidiHandler.updateCharacterWidths(this.$fontMetrics);
        var config = this.layerConfig;
        if (
          changes & this.CHANGE_FULL ||
          changes & this.CHANGE_SIZE ||
          changes & this.CHANGE_TEXT ||
          changes & this.CHANGE_LINES ||
          changes & this.CHANGE_SCROLL ||
          changes & this.CHANGE_H_SCROLL
        ) {
          changes |= this.$computeLayerConfig();
          if (
            config.firstRow != this.layerConfig.firstRow &&
            config.firstRowScreen == this.layerConfig.firstRowScreen
          ) {
            var st =
              this.scrollTop +
              (config.firstRow - this.layerConfig.firstRow) * this.lineHeight;
            if (0 < st) {
              this.scrollTop = st;
              changes = changes | this.CHANGE_SCROLL;
              changes |= this.$computeLayerConfig();
            }
          }
          config = this.layerConfig;
          this.$updateScrollBarV();
          if (changes & this.CHANGE_H_SCROLL) this.$updateScrollBarH();
          dom.translate(this.content, -this.scrollLeft, -config.offset);
          var width = config.width + 2 * this.$padding + "px",
            height = config.minHeight + "px";
          dom.setStyle(this.content.style, "width", width);
          dom.setStyle(this.content.style, "height", height);
        }
        if (changes & this.CHANGE_H_SCROLL) {
          dom.translate(this.content, -this.scrollLeft, -config.offset);
          this.scroller.className =
            0 >= this.scrollLeft
              ? "ace_scroller"
              : "ace_scroller ace_scroll-left";
        }
        if (changes & this.CHANGE_FULL) {
          this.$textLayer.update(config);
          if (this.$showGutter) this.$gutterLayer.update(config);
          this.$markerBack.update(config);
          this.$markerFront.update(config);
          this.$cursorLayer.update(config);
          this.$moveTextAreaToCursor();
          this._signal("afterRender");
          return;
        }
        if (changes & this.CHANGE_SCROLL) {
          if (changes & this.CHANGE_TEXT || changes & this.CHANGE_LINES)
            this.$textLayer.update(config);
          else this.$textLayer.scrollLines(config);
          if (this.$showGutter) {
            if (changes & this.CHANGE_GUTTER || changes & this.CHANGE_LINES)
              this.$gutterLayer.update(config);
            else this.$gutterLayer.scrollLines(config);
          }
          this.$markerBack.update(config);
          this.$markerFront.update(config);
          this.$cursorLayer.update(config);
          this.$moveTextAreaToCursor();
          this._signal("afterRender");
          return;
        }
        if (changes & this.CHANGE_TEXT) {
          this.$textLayer.update(config);
          if (this.$showGutter) this.$gutterLayer.update(config);
        } else if (changes & this.CHANGE_LINES) {
          if (
            this.$updateLines() ||
            (changes & this.CHANGE_GUTTER && this.$showGutter)
          )
            this.$gutterLayer.update(config);
        } else if (changes & this.CHANGE_TEXT || changes & this.CHANGE_GUTTER) {
          if (this.$showGutter) this.$gutterLayer.update(config);
        } else if (changes & this.CHANGE_CURSOR) {
          if (this.$highlightGutterLine)
            this.$gutterLayer.updateLineHighlight(config);
        }
        if (changes & this.CHANGE_CURSOR) {
          this.$cursorLayer.update(config);
          this.$moveTextAreaToCursor();
        }
        if (changes & (this.CHANGE_MARKER | this.CHANGE_MARKER_FRONT)) {
          this.$markerFront.update(config);
        }
        if (changes & (this.CHANGE_MARKER | this.CHANGE_MARKER_BACK)) {
          this.$markerBack.update(config);
        }
        this._signal("afterRender");
      };
      this.$autosize = function() {
        var height = this.session.getScreenLength() * this.lineHeight,
          maxHeight = this.$maxLines * this.lineHeight,
          desiredHeight =
            _Mathmin7(
              maxHeight,
              _Mathmax7((this.$minLines || 1) * this.lineHeight, height)
            ) +
            this.scrollMargin.v +
            (this.$extraHeight || 0);
        if (this.$horizScroll) desiredHeight += this.scrollBarH.getHeight();
        if (this.$maxPixelHeight && desiredHeight > this.$maxPixelHeight)
          desiredHeight = this.$maxPixelHeight;
        var hideScrollbars = desiredHeight <= 2 * this.lineHeight,
          vScroll = !hideScrollbars && height > maxHeight;
        if (
          desiredHeight != this.desiredHeight ||
          this.$size.height != this.desiredHeight ||
          vScroll != this.$vScroll
        ) {
          if (vScroll != this.$vScroll) {
            this.$vScroll = vScroll;
            this.scrollBarV.setVisible(vScroll);
          }
          var w = this.container.clientWidth;
          this.container.style.height = desiredHeight + "px";
          this.$updateCachedSize(!0, this.$gutterWidth, w, desiredHeight);
          this.desiredHeight = desiredHeight;
          this._signal("autosize");
        }
      };
      this.$computeLayerConfig = function() {
        var session = this.session,
          size = this.$size,
          hideScrollbars = size.height <= 2 * this.lineHeight,
          screenLines = this.session.getScreenLength(),
          maxHeight = screenLines * this.lineHeight,
          longestLine = this.$getLongestLine(),
          horizScroll =
            !hideScrollbars &&
            (this.$hScrollBarAlwaysVisible ||
              0 > size.scrollerWidth - longestLine - 2 * this.$padding),
          hScrollChanged = this.$horizScroll !== horizScroll;
        if (hScrollChanged) {
          this.$horizScroll = horizScroll;
          this.scrollBarH.setVisible(horizScroll);
        }
        var vScrollBefore = this.$vScroll;
        if (this.$maxLines && 1 < this.lineHeight) this.$autosize();
        var offset = this.scrollTop % this.lineHeight,
          minHeight = size.scrollerHeight + this.lineHeight,
          scrollPastEnd =
            !this.$maxLines && this.$scrollPastEnd
              ? (size.scrollerHeight - this.lineHeight) * this.$scrollPastEnd
              : 0;
        maxHeight += scrollPastEnd;
        var sm = this.scrollMargin;
        this.session.setScrollTop(
          _Mathmax7(
            -sm.top,
            _Mathmin7(
              this.scrollTop,
              maxHeight - size.scrollerHeight + sm.bottom
            )
          )
        );
        this.session.setScrollLeft(
          _Mathmax7(
            -sm.left,
            _Mathmin7(
              this.scrollLeft,
              longestLine + 2 * this.$padding - size.scrollerWidth + sm.right
            )
          )
        );
        var vScroll =
            !hideScrollbars &&
            (this.$vScrollBarAlwaysVisible ||
              0 > size.scrollerHeight - maxHeight + scrollPastEnd ||
              this.scrollTop > sm.top),
          vScrollChanged = vScrollBefore !== vScroll;
        if (vScrollChanged) {
          this.$vScroll = vScroll;
          this.scrollBarV.setVisible(vScroll);
        }
        var lineCount = _Mathceil(minHeight / this.lineHeight) - 1,
          firstRow = _Mathmax7(
            0,
            _Mathround2((this.scrollTop - offset) / this.lineHeight)
          ),
          lastRow = firstRow + lineCount,
          firstRowScreen,
          firstRowHeight,
          lineHeight = this.lineHeight;
        firstRow = session.screenToDocumentRow(firstRow, 0);
        var foldLine = session.getFoldLine(firstRow);
        if (foldLine) {
          firstRow = foldLine.start.row;
        }
        firstRowScreen = session.documentToScreenRow(firstRow, 0);
        firstRowHeight = session.getRowLength(firstRow) * lineHeight;
        lastRow = _Mathmin7(
          session.screenToDocumentRow(lastRow, 0),
          session.getLength() - 1
        );
        minHeight =
          size.scrollerHeight +
          session.getRowLength(lastRow) * lineHeight +
          firstRowHeight;
        offset = this.scrollTop - firstRowScreen * lineHeight;
        var changes = 0;
        if (this.layerConfig.width != longestLine || hScrollChanged)
          changes = this.CHANGE_H_SCROLL;
        if (hScrollChanged || vScrollChanged) {
          changes = this.$updateCachedSize(
            !0,
            this.gutterWidth,
            size.width,
            size.height
          );
          this._signal("scrollbarVisibilityChanged");
          if (vScrollChanged) longestLine = this.$getLongestLine();
        }
        this.layerConfig = {
          width: longestLine,
          padding: this.$padding,
          firstRow: firstRow,
          firstRowScreen: firstRowScreen,
          lastRow: lastRow,
          lineHeight: lineHeight,
          characterWidth: this.characterWidth,
          minHeight: minHeight,
          maxHeight: maxHeight,
          offset: offset,
          gutterOffset: lineHeight
            ? _Mathmax7(
                0,
                _Mathceil(
                  (offset + size.height - size.scrollerHeight) / lineHeight
                )
              )
            : 0,
          height: this.$size.scrollerHeight
        };
        if (this.session.$bidiHandler)
          this.session.$bidiHandler.setContentWidth(
            longestLine - this.$padding
          );
        return changes;
      };
      this.$updateLines = function() {
        if (!this.$changedLines) return;
        var firstRow = this.$changedLines.firstRow,
          lastRow = this.$changedLines.lastRow;
        this.$changedLines = null;
        var layerConfig = this.layerConfig;
        if (firstRow > layerConfig.lastRow + 1) {
          return;
        }
        if (lastRow < layerConfig.firstRow) {
          return;
        }
        if (lastRow === 1 / 0) {
          if (this.$showGutter) this.$gutterLayer.update(layerConfig);
          this.$textLayer.update(layerConfig);
          return;
        }
        this.$textLayer.updateLines(layerConfig, firstRow, lastRow);
        return !0;
      };
      this.$getLongestLine = function() {
        var charCount = this.session.getScreenWidth();
        if (this.showInvisibles && !this.session.$useWrapMode) charCount += 1;
        if (this.$textLayer && charCount > this.$textLayer.MAX_LINE_LENGTH)
          charCount = this.$textLayer.MAX_LINE_LENGTH + 30;
        return _Mathmax7(
          this.$size.scrollerWidth - 2 * this.$padding,
          _Mathround2(charCount * this.characterWidth)
        );
      };
      this.updateFrontMarkers = function() {
        this.$markerFront.setMarkers(this.session.getMarkers(!0));
        this.$loop.schedule(this.CHANGE_MARKER_FRONT);
      };
      this.updateBackMarkers = function() {
        this.$markerBack.setMarkers(this.session.getMarkers());
        this.$loop.schedule(this.CHANGE_MARKER_BACK);
      };
      this.addGutterDecoration = function(row, className) {
        this.$gutterLayer.addGutterDecoration(row, className);
      };
      this.removeGutterDecoration = function(row, className) {
        this.$gutterLayer.removeGutterDecoration(row, className);
      };
      this.updateBreakpoints = function(rows) {
        this.$loop.schedule(this.CHANGE_GUTTER);
      };
      this.setAnnotations = function(annotations) {
        this.$gutterLayer.setAnnotations(annotations);
        this.$loop.schedule(this.CHANGE_GUTTER);
      };
      this.updateCursor = function() {
        this.$loop.schedule(this.CHANGE_CURSOR);
      };
      this.hideCursor = function() {
        this.$cursorLayer.hideCursor();
      };
      this.showCursor = function() {
        this.$cursorLayer.showCursor();
      };
      this.scrollSelectionIntoView = function(anchor, lead, offset) {
        this.scrollCursorIntoView(anchor, offset);
        this.scrollCursorIntoView(lead, offset);
      };
      this.scrollCursorIntoView = function(cursor, offset, $viewMargin) {
        if (0 === this.$size.scrollerHeight) return;
        var pos = this.$cursorLayer.getPixelPosition(cursor),
          left = pos.left,
          top = pos.top,
          topMargin = ($viewMargin && $viewMargin.top) || 0,
          bottomMargin = ($viewMargin && $viewMargin.bottom) || 0,
          scrollTop = this.$scrollAnimation
            ? this.session.getScrollTop()
            : this.scrollTop;
        if (scrollTop + topMargin > top) {
          if (offset && scrollTop + topMargin > top + this.lineHeight)
            top -= offset * this.$size.scrollerHeight;
          if (0 === top) top = -this.scrollMargin.top;
          this.session.setScrollTop(top);
        } else if (
          scrollTop + this.$size.scrollerHeight - bottomMargin <
          top + this.lineHeight
        ) {
          if (
            offset &&
            scrollTop + this.$size.scrollerHeight - bottomMargin <
              top - this.lineHeight
          )
            top += offset * this.$size.scrollerHeight;
          this.session.setScrollTop(
            top + this.lineHeight - this.$size.scrollerHeight
          );
        }
        var scrollLeft = this.scrollLeft;
        if (scrollLeft > left) {
          if (left < this.$padding + 2 * this.layerConfig.characterWidth)
            left = -this.scrollMargin.left;
          this.session.setScrollLeft(left);
        } else if (
          scrollLeft + this.$size.scrollerWidth <
          left + this.characterWidth
        ) {
          this.session.setScrollLeft(
            _Mathround2(left + this.characterWidth - this.$size.scrollerWidth)
          );
        } else if (
          scrollLeft <= this.$padding &&
          left - scrollLeft < this.characterWidth
        ) {
          this.session.setScrollLeft(0);
        }
      };
      this.getScrollTop = function() {
        return this.session.getScrollTop();
      };
      this.getScrollLeft = function() {
        return this.session.getScrollLeft();
      };
      this.getScrollTopRow = function() {
        return this.scrollTop / this.lineHeight;
      };
      this.getScrollBottomRow = function() {
        return _Mathmax7(
          0,
          _Mathfloor4(
            (this.scrollTop + this.$size.scrollerHeight) / this.lineHeight
          ) - 1
        );
      };
      this.scrollToRow = function(row) {
        this.session.setScrollTop(row * this.lineHeight);
      };
      this.alignCursor = function(cursor, alignment) {
        if ("number" == typeof cursor) cursor = { row: cursor, column: 0 };
        var pos = this.$cursorLayer.getPixelPosition(cursor),
          h = this.$size.scrollerHeight - this.lineHeight,
          offset = pos.top - h * (alignment || 0);
        this.session.setScrollTop(offset);
        return offset;
      };
      this.STEPS = 8;
      this.$calcSteps = function(fromValue, toValue) {
        var i = 0,
          l = this.STEPS,
          steps = [],
          func = function func(t, x_min, dx) {
            return dx * (Math.pow(t - 1, 3) + 1) + x_min;
          };
        for (i = 0; i < l; ++i) {
          steps.push(func(i / this.STEPS, fromValue, toValue - fromValue));
        }
        return steps;
      };
      this.scrollToLine = function(line, center, animate, callback) {
        var pos = this.$cursorLayer.getPixelPosition({ row: line, column: 0 }),
          offset = pos.top;
        if (center) offset -= this.$size.scrollerHeight / 2;
        var initialScroll = this.scrollTop;
        this.session.setScrollTop(offset);
        if (!1 !== animate) this.animateScrolling(initialScroll, callback);
      };
      this.animateScrolling = function(fromValue, callback) {
        var toValue = this.scrollTop;
        if (!this.$animatedScroll) return;
        var _self = this;
        if (fromValue == toValue) return;
        if (this.$scrollAnimation) {
          var oldSteps = this.$scrollAnimation.steps;
          if (oldSteps.length) {
            fromValue = oldSteps[0];
            if (fromValue == toValue) return;
          }
        }
        var steps = _self.$calcSteps(fromValue, toValue);
        this.$scrollAnimation = { from: fromValue, to: toValue, steps: steps };
        clearInterval(this.$timer);
        _self.session.setScrollTop(steps.shift());
        _self.session.$scrollTop = toValue;
        this.$timer = setInterval(function() {
          if (steps.length) {
            _self.session.setScrollTop(steps.shift());
            _self.session.$scrollTop = toValue;
          } else if (null != toValue) {
            _self.session.$scrollTop = -1;
            _self.session.setScrollTop(toValue);
            toValue = null;
          } else {
            _self.$timer = clearInterval(_self.$timer);
            _self.$scrollAnimation = null;
            callback && callback();
          }
        }, 10);
      };
      this.scrollToY = function(scrollTop) {
        if (this.scrollTop !== scrollTop) {
          this.$loop.schedule(this.CHANGE_SCROLL);
          this.scrollTop = scrollTop;
        }
      };
      this.scrollToX = function(scrollLeft) {
        if (this.scrollLeft !== scrollLeft) this.scrollLeft = scrollLeft;
        this.$loop.schedule(this.CHANGE_H_SCROLL);
      };
      this.scrollTo = function(x, y) {
        this.session.setScrollTop(y);
        this.session.setScrollLeft(y);
      };
      this.scrollBy = function(deltaX, deltaY) {
        deltaY &&
          this.session.setScrollTop(this.session.getScrollTop() + deltaY);
        deltaX &&
          this.session.setScrollLeft(this.session.getScrollLeft() + deltaX);
      };
      this.isScrollableBy = function(deltaX, deltaY) {
        if (
          0 > deltaY &&
          this.session.getScrollTop() >= 1 - this.scrollMargin.top
        )
          return !0;
        if (
          0 < deltaY &&
          this.session.getScrollTop() +
            this.$size.scrollerHeight -
            this.layerConfig.maxHeight <
            -1 + this.scrollMargin.bottom
        )
          return !0;
        if (
          0 > deltaX &&
          this.session.getScrollLeft() >= 1 - this.scrollMargin.left
        )
          return !0;
        if (
          0 < deltaX &&
          this.session.getScrollLeft() +
            this.$size.scrollerWidth -
            this.layerConfig.width <
            -1 + this.scrollMargin.right
        )
          return !0;
      };
      this.pixelToScreenCoordinates = function(x, y) {
        var canvasPos;
        if (this.$hasCssTransforms) {
          canvasPos = { top: 0, left: 0 };
          var p = this.$fontMetrics.transformCoordinates([x, y]);
          x = p[1] - this.gutterWidth - this.margin.left;
          y = p[0];
        } else {
          canvasPos = this.scroller.getBoundingClientRect();
        }
        var offsetX = x + this.scrollLeft - canvasPos.left - this.$padding,
          offset = offsetX / this.characterWidth,
          row = _Mathfloor4(
            (y + this.scrollTop - canvasPos.top) / this.lineHeight
          ),
          col = this.$blockCursor ? _Mathfloor4(offset) : _Mathround2(offset);
        return {
          row: row,
          column: col,
          side: 0 < offset - col ? 1 : -1,
          offsetX: offsetX
        };
      };
      this.screenToTextCoordinates = function(x, y) {
        var canvasPos;
        if (this.$hasCssTransforms) {
          canvasPos = { top: 0, left: 0 };
          var p = this.$fontMetrics.transformCoordinates([x, y]);
          x = p[1] - this.gutterWidth - this.margin.left;
          y = p[0];
        } else {
          canvasPos = this.scroller.getBoundingClientRect();
        }
        var offsetX = x + this.scrollLeft - canvasPos.left - this.$padding,
          offset = offsetX / this.characterWidth,
          col = this.$blockCursor ? _Mathfloor4(offset) : _Mathround2(offset),
          row = _Mathfloor4(
            (y + this.scrollTop - canvasPos.top) / this.lineHeight
          );
        return this.session.screenToDocumentPosition(
          row,
          _Mathmax7(col, 0),
          offsetX
        );
      };
      this.textToScreenCoordinates = function(row, column) {
        var canvasPos = this.scroller.getBoundingClientRect(),
          pos = this.session.documentToScreenPosition(row, column),
          x =
            this.$padding +
            (this.session.$bidiHandler.isBidiRow(pos.row, row)
              ? this.session.$bidiHandler.getPosLeft(pos.column)
              : _Mathround2(pos.column * this.characterWidth)),
          y = pos.row * this.lineHeight;
        return {
          pageX: canvasPos.left + x - this.scrollLeft,
          pageY: canvasPos.top + y - this.scrollTop
        };
      };
      this.visualizeFocus = function() {
        dom.addCssClass(this.container, "ace_focus");
      };
      this.visualizeBlur = function() {
        dom.removeCssClass(this.container, "ace_focus");
      };
      this.showComposition = function(composition) {
        this.$composition = composition;
        if (!composition.cssText) {
          composition.cssText = this.textarea.style.cssText;
          composition.keepTextAreaAtCursor = this.$keepTextAreaAtCursor;
        }
        composition.useTextareaForIME = this.$useTextareaForIME;
        if (this.$useTextareaForIME) {
          this.$keepTextAreaAtCursor = !0;
          dom.addCssClass(this.textarea, "ace_composition");
          this.textarea.style.cssText = "";
          this.$moveTextAreaToCursor();
          this.$cursorLayer.element.style.display = "none";
        } else {
          composition.markerId = this.session.addMarker(
            composition.markerRange,
            "ace_composition_marker",
            "text"
          );
        }
      };
      this.setCompositionText = function(text) {
        var cursor = this.session.selection.cursor;
        this.addToken(
          text,
          "composition_placeholder",
          cursor.row,
          cursor.column
        );
        this.$moveTextAreaToCursor();
      };
      this.hideComposition = function() {
        if (!this.$composition) return;
        if (this.$composition.markerId)
          this.session.removeMarker(this.$composition.markerId);
        dom.removeCssClass(this.textarea, "ace_composition");
        this.$keepTextAreaAtCursor = this.$composition.keepTextAreaAtCursor;
        this.textarea.style.cssText = this.$composition.cssText;
        this.$composition = null;
        this.$cursorLayer.element.style.display = "";
      };
      this.addToken = function(text, type, row, column) {
        var session = this.session;
        session.bgTokenizer.lines[row] = null;
        var newToken = { type: type, value: text },
          tokens = session.getTokens(row);
        if (null == column) {
          tokens.push(newToken);
        } else {
          for (var l = 0, i = 0, token; i < tokens.length; i++) {
            token = tokens[i];
            l += token.value.length;
            if (column <= l) {
              var diff = token.value.length - (l - column),
                before = token.value.slice(0, diff),
                after = token.value.slice(diff);
              tokens.splice(
                i,
                1,
                { type: token.type, value: before },
                newToken,
                { type: token.type, value: after }
              );
              break;
            }
          }
        }
        this.updateLines(row, row);
      };
      this.setTheme = function(theme, cb) {
        var _self = this;
        this.$themeId = theme;
        _self._dispatchEvent("themeChange", { theme: theme });
        if (!theme || "string" == typeof theme) {
          var moduleName = theme || this.$options.theme.initialValue;
          config.loadModule(["theme", moduleName], afterLoad);
        } else {
          afterLoad(theme);
        }
        function afterLoad(module) {
          if (_self.$themeId != theme) return cb && cb();
          if (!module || !module.cssClass)
            throw new Error(
              "couldn't load module " + theme + " or it didn't call define"
            );
          if (module.$id) _self.$themeId = module.$id;
          dom.importCssString(module.cssText, module.cssClass, _self.container);
          if (_self.theme)
            dom.removeCssClass(_self.container, _self.theme.cssClass);
          var padding =
            "padding" in module
              ? module.padding
              : "padding" in (_self.theme || {})
                ? 4
                : _self.$padding;
          if (_self.$padding && padding != _self.$padding)
            _self.setPadding(padding);
          _self.$theme = module.cssClass;
          _self.theme = module;
          dom.addCssClass(_self.container, module.cssClass);
          dom.setCssClass(_self.container, "ace_dark", module.isDark);
          if (_self.$size) {
            _self.$size.width = 0;
            _self.$updateSizeAsync();
          }
          _self._dispatchEvent("themeLoaded", { theme: module });
          cb && cb();
        }
      };
      this.getTheme = function() {
        return this.$themeId;
      };
      this.setStyle = function(style, include) {
        dom.setCssClass(this.container, style, !1 !== include);
      };
      this.unsetStyle = function(style) {
        dom.removeCssClass(this.container, style);
      };
      this.setCursorStyle = function(style) {
        dom.setStyle(this.scroller.style, "cursor", style);
      };
      this.setMouseCursor = function(cursorStyle) {
        dom.setStyle(this.scroller.style, "cursor", cursorStyle);
      };
      this.attachToShadowRoot = function() {
        dom.importCssString(editorCss, "ace_editor.css", this.container);
      };
      this.destroy = function() {
        this.$fontMetrics.destroy();
        this.$cursorLayer.destroy();
      };
    }.call(VirtualRenderer.prototype));
    config.defineOptions(VirtualRenderer.prototype, "renderer", {
      animatedScroll: { initialValue: !1 },
      showInvisibles: {
        set: function set(value) {
          if (this.$textLayer.setShowInvisibles(value))
            this.$loop.schedule(this.CHANGE_TEXT);
        },
        initialValue: !1
      },
      showPrintMargin: {
        set: function set() {
          this.$updatePrintMargin();
        },
        initialValue: !0
      },
      printMarginColumn: {
        set: function set() {
          this.$updatePrintMargin();
        },
        initialValue: 80
      },
      printMargin: {
        set: function set(val) {
          if ("number" == typeof val) this.$printMarginColumn = val;
          this.$showPrintMargin = !!val;
          this.$updatePrintMargin();
        },
        get: function get() {
          return this.$showPrintMargin && this.$printMarginColumn;
        }
      },
      showGutter: {
        set: function set(show) {
          this.$gutter.style.display = show ? "block" : "none";
          this.$loop.schedule(this.CHANGE_FULL);
          this.onGutterResize();
        },
        initialValue: !0
      },
      fadeFoldWidgets: {
        set: function set(show) {
          dom.setCssClass(this.$gutter, "ace_fade-fold-widgets", show);
        },
        initialValue: !1
      },
      showFoldWidgets: {
        set: function set(show) {
          this.$gutterLayer.setShowFoldWidgets(show);
          this.$loop.schedule(this.CHANGE_GUTTER);
        },
        initialValue: !0
      },
      displayIndentGuides: {
        set: function set(show) {
          if (this.$textLayer.setDisplayIndentGuides(show))
            this.$loop.schedule(this.CHANGE_TEXT);
        },
        initialValue: !0
      },
      highlightGutterLine: {
        set: function set(shouldHighlight) {
          this.$gutterLayer.setHighlightGutterLine(shouldHighlight);
          this.$loop.schedule(this.CHANGE_GUTTER);
        },
        initialValue: !0
      },
      hScrollBarAlwaysVisible: {
        set: function set(val) {
          if (!this.$hScrollBarAlwaysVisible || !this.$horizScroll)
            this.$loop.schedule(this.CHANGE_SCROLL);
        },
        initialValue: !1
      },
      vScrollBarAlwaysVisible: {
        set: function set(val) {
          if (!this.$vScrollBarAlwaysVisible || !this.$vScroll)
            this.$loop.schedule(this.CHANGE_SCROLL);
        },
        initialValue: !1
      },
      fontSize: {
        set: function set(size) {
          if ("number" == typeof size) size = size + "px";
          this.container.style.fontSize = size;
          this.updateFontSize();
        },
        initialValue: 12
      },
      fontFamily: {
        set: function set(name) {
          this.container.style.fontFamily = name;
          this.updateFontSize();
        }
      },
      maxLines: {
        set: function set(val) {
          this.updateFull();
        }
      },
      minLines: {
        set: function set(val) {
          if (!(562949953421311 > this.$minLines)) this.$minLines = 0;
          this.updateFull();
        }
      },
      maxPixelHeight: {
        set: function set(val) {
          this.updateFull();
        },
        initialValue: 0
      },
      scrollPastEnd: {
        set: function set(val) {
          val = +val || 0;
          if (this.$scrollPastEnd == val) return;
          this.$scrollPastEnd = val;
          this.$loop.schedule(this.CHANGE_SCROLL);
        },
        initialValue: 0,
        handlesSet: !0
      },
      fixedWidthGutter: {
        set: function set(val) {
          this.$gutterLayer.$fixedWidth = !!val;
          this.$loop.schedule(this.CHANGE_GUTTER);
        }
      },
      theme: {
        set: function set(val) {
          this.setTheme(val);
        },
        get: function get() {
          return this.$themeId || this.theme;
        },
        initialValue: "./theme/textmate",
        handlesSet: !0
      },
      hasCssTransforms: {},
      useTextareaForIME: {
        initialValue: !useragent.isMobile && !useragent.isIE
      }
    });
    exports.VirtualRenderer = VirtualRenderer;
  }
);
ace.define(
  "ace/worker/worker_client",
  [
    "require",
    "exports",
    "module",
    "ace/lib/oop",
    "ace/lib/net",
    "ace/lib/event_emitter",
    "ace/config"
  ],
  function(require, exports, module) {
    "use strict";
    var oop = require("../lib/oop"),
      net = require("../lib/net"),
      EventEmitter = require("../lib/event_emitter").EventEmitter,
      config = require("../config");
    function $workerBlob(workerUrl) {
      var script = "importScripts('" + net.qualifyURL(workerUrl) + "');";
      try {
        return new Blob([script], { type: "application/javascript" });
      } catch (e) {
        var BlobBuilder =
            window.BlobBuilder ||
            window.WebKitBlobBuilder ||
            window.MozBlobBuilder,
          blobBuilder = new BlobBuilder();
        blobBuilder.append(script);
        return blobBuilder.getBlob("application/javascript");
      }
    }
    function createWorker(workerUrl) {
      if ("undefined" == typeof Worker)
        return {
          postMessage: function postMessage() {},
          terminate: function terminate() {}
        };
      var blob = $workerBlob(workerUrl),
        URL = window.URL || window.webkitURL,
        blobURL = URL.createObjectURL(blob);
      return new Worker(blobURL);
    }
    var WorkerClient = function WorkerClient(
      topLevelNamespaces,
      mod,
      classname,
      workerUrl,
      importScripts
    ) {
      this.$sendDeltaQueue = this.$sendDeltaQueue.bind(this);
      this.changeListener = this.changeListener.bind(this);
      this.onMessage = this.onMessage.bind(this);
      if (require.nameToUrl && !require.toUrl)
        require.toUrl = require.nameToUrl;
      if (config.get("packaged") || !require.toUrl) {
        workerUrl = workerUrl || config.moduleUrl(mod, "worker");
      } else {
        var normalizePath = this.$normalizePath;
        workerUrl =
          workerUrl ||
          normalizePath(require.toUrl("ace/worker/worker.js", null, "_"));
        var tlns = {};
        topLevelNamespaces.forEach(function(ns) {
          tlns[ns] = normalizePath(
            require.toUrl(ns, null, "_").replace(/(\.js)?(\?.*)?$/, "")
          );
        });
      }
      this.$worker = createWorker(workerUrl);
      if (importScripts) {
        this.send("importScripts", importScripts);
      }
      this.$worker.postMessage({
        init: !0,
        tlns: tlns,
        module: mod,
        classname: classname
      });
      this.callbackId = 1;
      this.callbacks = {};
      this.$worker.onmessage = this.onMessage;
    };
    (function() {
      oop.implement(this, EventEmitter);
      this.onMessage = function(e) {
        var msg = e.data;
        switch (msg.type) {
          case "event":
            this._signal(msg.name, { data: msg.data });
            break;
          case "call":
            var callback = this.callbacks[msg.id];
            if (callback) {
              callback(msg.data);
              delete this.callbacks[msg.id];
            }
            break;
          case "error":
            this.reportError(msg.data);
            break;
          case "log":
            window.console &&
              console.log &&
              console.log.apply(console, msg.data);
            break;
        }
      };
      this.reportError = function(err) {
        window.console && console.error && console.error(err);
      };
      this.$normalizePath = function(path) {
        return net.qualifyURL(path);
      };
      this.terminate = function() {
        this._signal("terminate", {});
        this.deltaQueue = null;
        this.$worker.terminate();
        this.$worker = null;
        if (this.$doc) this.$doc.off("change", this.changeListener);
        this.$doc = null;
      };
      this.send = function(cmd, args) {
        this.$worker.postMessage({ command: cmd, args: args });
      };
      this.call = function(cmd, args, callback) {
        if (callback) {
          var id = this.callbackId++;
          this.callbacks[id] = callback;
          args.push(id);
        }
        this.send(cmd, args);
      };
      this.emit = function(event, data) {
        try {
          if (data.data && data.data.err)
            data.data.err = {
              message: data.data.err.message,
              stack: data.data.err.stack,
              code: data.data.err.code
            };
          this.$worker.postMessage({ event: event, data: { data: data.data } });
        } catch (ex) {
          console.error(ex.stack);
        }
      };
      this.attachToDocument = function(doc) {
        if (this.$doc) this.terminate();
        this.$doc = doc;
        this.call("setValue", [doc.getValue()]);
        doc.on("change", this.changeListener);
      };
      this.changeListener = function(delta) {
        if (!this.deltaQueue) {
          this.deltaQueue = [];
          setTimeout(this.$sendDeltaQueue, 0);
        }
        if ("insert" == delta.action)
          this.deltaQueue.push(delta.start, delta.lines);
        else this.deltaQueue.push(delta.start, delta.end);
      };
      this.$sendDeltaQueue = function() {
        var q = this.deltaQueue;
        if (!q) return;
        this.deltaQueue = null;
        if (50 < q.length && q.length > this.$doc.getLength() >> 1) {
          this.call("setValue", [this.$doc.getValue()]);
        } else this.emit("change", { data: q });
      };
    }.call(WorkerClient.prototype));
    var UIWorkerClient = function UIWorkerClient(
      topLevelNamespaces,
      mod,
      classname
    ) {
      this.$sendDeltaQueue = this.$sendDeltaQueue.bind(this);
      this.changeListener = this.changeListener.bind(this);
      this.callbackId = 1;
      this.callbacks = {};
      this.messageBuffer = [];
      var main = null,
        emitSync = !1,
        sender = Object.create(EventEmitter),
        _self = this;
      this.$worker = {};
      this.$worker.terminate = function() {};
      this.$worker.postMessage = function(e) {
        _self.messageBuffer.push(e);
        if (main) {
          if (emitSync) setTimeout(processNext);
          else processNext();
        }
      };
      this.setEmitSync = function(val) {
        emitSync = val;
      };
      var processNext = function processNext() {
        var msg = _self.messageBuffer.shift();
        if (msg.command) main[msg.command].apply(main, msg.args);
        else if (msg.event) sender._signal(msg.event, msg.data);
      };
      sender.postMessage = function(msg) {
        _self.onMessage({ data: msg });
      };
      sender.callback = function(data, callbackId) {
        this.postMessage({ type: "call", id: callbackId, data: data });
      };
      sender.emit = function(name, data) {
        this.postMessage({ type: "event", name: name, data: data });
      };
      config.loadModule(["worker", mod], function(Main) {
        main = new Main[classname](sender);
        while (_self.messageBuffer.length) {
          processNext();
        }
      });
    };
    UIWorkerClient.prototype = WorkerClient.prototype;
    exports.UIWorkerClient = UIWorkerClient;
    exports.WorkerClient = WorkerClient;
    exports.createWorker = createWorker;
  }
);
ace.define(
  "ace/placeholder",
  [
    "require",
    "exports",
    "module",
    "ace/range",
    "ace/lib/event_emitter",
    "ace/lib/oop"
  ],
  function(require, exports, module) {
    "use strict";
    var Range = require("./range").Range,
      EventEmitter = require("./lib/event_emitter").EventEmitter,
      oop = require("./lib/oop"),
      PlaceHolder = function PlaceHolder(
        session,
        length,
        pos,
        others,
        mainClass,
        othersClass
      ) {
        var _self = this;
        this.length = length;
        this.session = session;
        this.doc = session.getDocument();
        this.mainClass = mainClass;
        this.othersClass = othersClass;
        this.$onUpdate = this.onUpdate.bind(this);
        this.doc.on("change", this.$onUpdate);
        this.$others = others;
        this.$onCursorChange = function() {
          setTimeout(function() {
            _self.onCursorChange();
          });
        };
        this.$pos = pos;
        var undoStack = session.getUndoManager().$undoStack ||
          session.getUndoManager().$undostack || { length: -1 };
        this.$undoStackDepth = undoStack.length;
        this.setup();
        session.selection.on("changeCursor", this.$onCursorChange);
      };
    (function() {
      oop.implement(this, EventEmitter);
      this.setup = function() {
        var _self = this,
          doc = this.doc,
          session = this.session;
        this.selectionBefore = session.selection.toJSON();
        if (session.selection.inMultiSelectMode)
          session.selection.toSingleRange();
        this.pos = doc.createAnchor(this.$pos.row, this.$pos.column);
        var pos = this.pos;
        pos.$insertRight = !0;
        pos.detach();
        pos.markerId = session.addMarker(
          new Range(pos.row, pos.column, pos.row, pos.column + this.length),
          this.mainClass,
          null,
          !1
        );
        this.others = [];
        this.$others.forEach(function(other) {
          var anchor = doc.createAnchor(other.row, other.column);
          anchor.$insertRight = !0;
          anchor.detach();
          _self.others.push(anchor);
        });
        session.setUndoSelect(!1);
      };
      this.showOtherMarkers = function() {
        if (this.othersActive) return;
        var session = this.session,
          _self = this;
        this.othersActive = !0;
        this.others.forEach(function(anchor) {
          anchor.markerId = session.addMarker(
            new Range(
              anchor.row,
              anchor.column,
              anchor.row,
              anchor.column + _self.length
            ),
            _self.othersClass,
            null,
            !1
          );
        });
      };
      this.hideOtherMarkers = function() {
        if (!this.othersActive) return;
        this.othersActive = !1;
        for (var i = 0; i < this.others.length; i++) {
          this.session.removeMarker(this.others[i].markerId);
        }
      };
      this.onUpdate = function(delta) {
        if (this.$updating) return this.updateAnchors(delta);
        var range = delta;
        if (range.start.row !== range.end.row) return;
        if (range.start.row !== this.pos.row) return;
        this.$updating = !0;
        var lengthDiff =
            "insert" === delta.action
              ? range.end.column - range.start.column
              : range.start.column - range.end.column,
          inMainRange =
            range.start.column >= this.pos.column &&
            range.start.column <= this.pos.column + this.length + 1,
          distanceFromStart = range.start.column - this.pos.column;
        this.updateAnchors(delta);
        if (inMainRange) this.length += lengthDiff;
        if (inMainRange && !this.session.$fromUndo) {
          if ("insert" === delta.action) {
            for (var i = this.others.length - 1; 0 <= i; i--) {
              var otherPos = this.others[i],
                newPos = {
                  row: otherPos.row,
                  column: otherPos.column + distanceFromStart
                };
              this.doc.insertMergedLines(newPos, delta.lines);
            }
          } else if ("remove" === delta.action) {
            for (var i = this.others.length - 1; 0 <= i; i--) {
              var otherPos = this.others[i],
                newPos = {
                  row: otherPos.row,
                  column: otherPos.column + distanceFromStart
                };
              this.doc.remove(
                new Range(
                  newPos.row,
                  newPos.column,
                  newPos.row,
                  newPos.column - lengthDiff
                )
              );
            }
          }
        }
        this.$updating = !1;
        this.updateMarkers();
      };
      this.updateAnchors = function(delta) {
        this.pos.onChange(delta);
        for (var i = this.others.length; i--; ) {
          this.others[i].onChange(delta);
        }
        this.updateMarkers();
      };
      this.updateMarkers = function() {
        if (this.$updating) return;
        var _self = this,
          session = this.session,
          updateMarker = function updateMarker(pos, className) {
            session.removeMarker(pos.markerId);
            pos.markerId = session.addMarker(
              new Range(
                pos.row,
                pos.column,
                pos.row,
                pos.column + _self.length
              ),
              className,
              null,
              !1
            );
          };
        updateMarker(this.pos, this.mainClass);
        for (var i = this.others.length; i--; ) {
          updateMarker(this.others[i], this.othersClass);
        }
      };
      this.onCursorChange = function(event) {
        if (this.$updating || !this.session) return;
        var pos = this.session.selection.getCursor();
        if (
          pos.row === this.pos.row &&
          pos.column >= this.pos.column &&
          pos.column <= this.pos.column + this.length
        ) {
          this.showOtherMarkers();
          this._emit("cursorEnter", event);
        } else {
          this.hideOtherMarkers();
          this._emit("cursorLeave", event);
        }
      };
      this.detach = function() {
        this.session.removeMarker(this.pos && this.pos.markerId);
        this.hideOtherMarkers();
        this.doc.removeEventListener("change", this.$onUpdate);
        this.session.selection.removeEventListener(
          "changeCursor",
          this.$onCursorChange
        );
        this.session.setUndoSelect(!0);
        this.session = null;
      };
      this.cancel = function() {
        if (-1 === this.$undoStackDepth) return;
        for (
          var undoManager = this.session.getUndoManager(),
            undosRequired =
              (undoManager.$undoStack || undoManager.$undostack).length -
              this.$undoStackDepth,
            i = 0;
          i < undosRequired;
          i++
        ) {
          undoManager.undo(this.session, !0);
        }
        if (this.selectionBefore)
          this.session.selection.fromJSON(this.selectionBefore);
      };
    }.call(PlaceHolder.prototype));
    exports.PlaceHolder = PlaceHolder;
  }
);
ace.define(
  "ace/mouse/multi_select_handler",
  ["require", "exports", "module", "ace/lib/event", "ace/lib/useragent"],
  function(require, exports, module) {
    var event = require("../lib/event"),
      useragent = require("../lib/useragent");
    function isSamePoint(p1, p2) {
      return p1.row == p2.row && p1.column == p2.column;
    }
    function onMouseDown(e) {
      var ev = e.domEvent,
        alt = ev.altKey,
        shift = ev.shiftKey,
        ctrl = ev.ctrlKey,
        accel = e.getAccelKey(),
        button = e.getButton();
      if (ctrl && useragent.isMac) button = ev.button;
      if (e.editor.inMultiSelectMode && 2 == button) {
        e.editor.textInput.onContextMenu(e.domEvent);
        return;
      }
      if (!ctrl && !alt && !accel) {
        if (0 === button && e.editor.inMultiSelectMode)
          e.editor.exitMultiSelectMode();
        return;
      }
      if (0 !== button) return;
      var editor = e.editor,
        selection = editor.selection,
        isMultiSelect = editor.inMultiSelectMode,
        pos = e.getDocumentPosition(),
        cursor = selection.getCursor(),
        inSelection =
          e.inSelection() || (selection.isEmpty() && isSamePoint(pos, cursor)),
        mouseX = e.x,
        mouseY = e.y,
        onMouseSelection = function onMouseSelection(e) {
          mouseX = e.clientX;
          mouseY = e.clientY;
        },
        session = editor.session,
        screenAnchor = editor.renderer.pixelToScreenCoordinates(mouseX, mouseY),
        screenCursor = screenAnchor,
        selectionMode;
      if (editor.$mouseHandler.$enableJumpToDef) {
        if ((ctrl && alt) || (accel && alt))
          selectionMode = shift ? "block" : "add";
        else if (alt && editor.$blockSelectEnabled) selectionMode = "block";
      } else {
        if (accel && !alt) {
          selectionMode = "add";
          if (!isMultiSelect && shift) return;
        } else if (alt && editor.$blockSelectEnabled) {
          selectionMode = "block";
        }
      }
      if (selectionMode && useragent.isMac && ev.ctrlKey) {
        editor.$mouseHandler.cancelContextMenu();
      }
      if ("add" == selectionMode) {
        if (!isMultiSelect && inSelection) return;
        if (!isMultiSelect) {
          var range = selection.toOrientedRange();
          editor.addSelectionMarker(range);
        }
        var oldRange = selection.rangeList.rangeAtPoint(pos);
        editor.inVirtualSelectionMode = !0;
        if (shift) {
          oldRange = null;
          range = selection.ranges[0] || range;
          editor.removeSelectionMarker(range);
        }
        editor.once("mouseup", function() {
          var tmpSel = selection.toOrientedRange();
          if (
            oldRange &&
            tmpSel.isEmpty() &&
            isSamePoint(oldRange.cursor, tmpSel.cursor)
          )
            selection.substractPoint(tmpSel.cursor);
          else {
            if (shift) {
              selection.substractPoint(range.cursor);
            } else if (range) {
              editor.removeSelectionMarker(range);
              selection.addRange(range);
            }
            selection.addRange(tmpSel);
          }
          editor.inVirtualSelectionMode = !1;
        });
      } else if ("block" == selectionMode) {
        e.stop();
        editor.inVirtualSelectionMode = !0;
        var initialRange,
          rectSel = [],
          blockSelect = function blockSelect() {
            var newCursor = editor.renderer.pixelToScreenCoordinates(
                mouseX,
                mouseY
              ),
              cursor = session.screenToDocumentPosition(
                newCursor.row,
                newCursor.column,
                newCursor.offsetX
              );
            if (
              isSamePoint(screenCursor, newCursor) &&
              isSamePoint(cursor, selection.lead)
            )
              return;
            screenCursor = newCursor;
            editor.selection.moveToPosition(cursor);
            editor.renderer.scrollCursorIntoView();
            editor.removeSelectionMarkers(rectSel);
            rectSel = selection.rectangularRangeBlock(
              screenCursor,
              screenAnchor
            );
            if (
              editor.$mouseHandler.$clickSelection &&
              1 == rectSel.length &&
              rectSel[0].isEmpty()
            )
              rectSel[0] = editor.$mouseHandler.$clickSelection.clone();
            rectSel.forEach(editor.addSelectionMarker, editor);
            editor.updateSelectionMarkers();
          };
        if (isMultiSelect && !accel) {
          selection.toSingleRange();
        } else if (!isMultiSelect && accel) {
          initialRange = selection.toOrientedRange();
          editor.addSelectionMarker(initialRange);
        }
        if (shift)
          screenAnchor = session.documentToScreenPosition(selection.lead);
        else selection.moveToPosition(pos);
        screenCursor = { row: -1, column: -1 };
        var onMouseSelectionEnd = function onMouseSelectionEnd(e) {
            blockSelect();
            clearInterval(timerId);
            editor.removeSelectionMarkers(rectSel);
            if (!rectSel.length) rectSel = [selection.toOrientedRange()];
            if (initialRange) {
              editor.removeSelectionMarker(initialRange);
              selection.toSingleRange(initialRange);
            }
            for (var i = 0; i < rectSel.length; i++) {
              selection.addRange(rectSel[i]);
            }
            editor.inVirtualSelectionMode = !1;
            editor.$mouseHandler.$clickSelection = null;
          },
          onSelectionInterval = blockSelect;
        event.capture(editor.container, onMouseSelection, onMouseSelectionEnd);
        var timerId = setInterval(function() {
          onSelectionInterval();
        }, 20);
        return e.preventDefault();
      }
    }
    exports.onMouseDown = onMouseDown;
  }
);
ace.define(
  "ace/commands/multi_select_commands",
  ["require", "exports", "module", "ace/keyboard/hash_handler"],
  function(require, exports, module) {
    exports.defaultCommands = [
      {
        name: "addCursorAbove",
        exec: function exec(editor) {
          editor.selectMoreLines(-1);
        },
        bindKey: { win: "Ctrl-Alt-Up", mac: "Ctrl-Alt-Up" },
        scrollIntoView: "cursor",
        readOnly: !0
      },
      {
        name: "addCursorBelow",
        exec: function exec(editor) {
          editor.selectMoreLines(1);
        },
        bindKey: { win: "Ctrl-Alt-Down", mac: "Ctrl-Alt-Down" },
        scrollIntoView: "cursor",
        readOnly: !0
      },
      {
        name: "addCursorAboveSkipCurrent",
        exec: function exec(editor) {
          editor.selectMoreLines(-1, !0);
        },
        bindKey: { win: "Ctrl-Alt-Shift-Up", mac: "Ctrl-Alt-Shift-Up" },
        scrollIntoView: "cursor",
        readOnly: !0
      },
      {
        name: "addCursorBelowSkipCurrent",
        exec: function exec(editor) {
          editor.selectMoreLines(1, !0);
        },
        bindKey: { win: "Ctrl-Alt-Shift-Down", mac: "Ctrl-Alt-Shift-Down" },
        scrollIntoView: "cursor",
        readOnly: !0
      },
      {
        name: "selectMoreBefore",
        exec: function exec(editor) {
          editor.selectMore(-1);
        },
        bindKey: { win: "Ctrl-Alt-Left", mac: "Ctrl-Alt-Left" },
        scrollIntoView: "cursor",
        readOnly: !0
      },
      {
        name: "selectMoreAfter",
        exec: function exec(editor) {
          editor.selectMore(1);
        },
        bindKey: { win: "Ctrl-Alt-Right", mac: "Ctrl-Alt-Right" },
        scrollIntoView: "cursor",
        readOnly: !0
      },
      {
        name: "selectNextBefore",
        exec: function exec(editor) {
          editor.selectMore(-1, !0);
        },
        bindKey: { win: "Ctrl-Alt-Shift-Left", mac: "Ctrl-Alt-Shift-Left" },
        scrollIntoView: "cursor",
        readOnly: !0
      },
      {
        name: "selectNextAfter",
        exec: function exec(editor) {
          editor.selectMore(1, !0);
        },
        bindKey: { win: "Ctrl-Alt-Shift-Right", mac: "Ctrl-Alt-Shift-Right" },
        scrollIntoView: "cursor",
        readOnly: !0
      },
      {
        name: "splitIntoLines",
        exec: function exec(editor) {
          editor.multiSelect.splitIntoLines();
        },
        bindKey: { win: "Ctrl-Alt-L", mac: "Ctrl-Alt-L" },
        readOnly: !0
      },
      {
        name: "alignCursors",
        exec: function exec(editor) {
          editor.alignCursors();
        },
        bindKey: { win: "Ctrl-Alt-A", mac: "Ctrl-Alt-A" },
        scrollIntoView: "cursor"
      },
      {
        name: "findAll",
        exec: function exec(editor) {
          editor.findAll();
        },
        bindKey: { win: "Ctrl-Alt-K", mac: "Ctrl-Alt-G" },
        scrollIntoView: "cursor",
        readOnly: !0
      }
    ];
    exports.multiSelectCommands = [
      {
        name: "singleSelection",
        bindKey: "esc",
        exec: function exec(editor) {
          editor.exitMultiSelectMode();
        },
        scrollIntoView: "cursor",
        readOnly: !0,
        isAvailable: function isAvailable(editor) {
          return editor && editor.inMultiSelectMode;
        }
      }
    ];
    var HashHandler = require("../keyboard/hash_handler").HashHandler;
    exports.keyboardHandler = new HashHandler(exports.multiSelectCommands);
  }
);
ace.define(
  "ace/multi_select",
  [
    "require",
    "exports",
    "module",
    "ace/range_list",
    "ace/range",
    "ace/selection",
    "ace/mouse/multi_select_handler",
    "ace/lib/event",
    "ace/lib/lang",
    "ace/commands/multi_select_commands",
    "ace/search",
    "ace/edit_session",
    "ace/editor",
    "ace/config"
  ],
  function(require, exports, module) {
    var RangeList = require("./range_list").RangeList,
      Range = require("./range").Range,
      Selection = require("./selection").Selection,
      onMouseDown = require("./mouse/multi_select_handler").onMouseDown,
      event = require("./lib/event"),
      lang = require("./lib/lang"),
      commands = require("./commands/multi_select_commands");
    exports.commands = commands.defaultCommands.concat(
      commands.multiSelectCommands
    );
    var Search = require("./search").Search,
      search = new Search();
    function find(session, needle, dir) {
      search.$options.wrap = !0;
      search.$options.needle = needle;
      search.$options.backwards = -1 == dir;
      return search.find(session);
    }
    var EditSession = require("./edit_session").EditSession;
    (function() {
      this.getSelectionMarkers = function() {
        return this.$selectionMarkers;
      };
    }.call(EditSession.prototype));
    (function() {
      this.ranges = null;
      this.rangeList = null;
      this.addRange = function(range, $blockChangeEvents) {
        if (!range) return;
        if (!this.inMultiSelectMode && 0 === this.rangeCount) {
          var oldRange = this.toOrientedRange();
          this.rangeList.add(oldRange);
          this.rangeList.add(range);
          if (2 != this.rangeList.ranges.length) {
            this.rangeList.removeAll();
            return $blockChangeEvents || this.fromOrientedRange(range);
          }
          this.rangeList.removeAll();
          this.rangeList.add(oldRange);
          this.$onAddRange(oldRange);
        }
        if (!range.cursor) range.cursor = range.end;
        var removed = this.rangeList.add(range);
        this.$onAddRange(range);
        if (removed.length) this.$onRemoveRange(removed);
        if (1 < this.rangeCount && !this.inMultiSelectMode) {
          this._signal("multiSelect");
          this.inMultiSelectMode = !0;
          this.session.$undoSelect = !1;
          this.rangeList.attach(this.session);
        }
        return $blockChangeEvents || this.fromOrientedRange(range);
      };
      this.toSingleRange = function(range) {
        range = range || this.ranges[0];
        var removed = this.rangeList.removeAll();
        if (removed.length) this.$onRemoveRange(removed);
        range && this.fromOrientedRange(range);
      };
      this.substractPoint = function(pos) {
        var removed = this.rangeList.substractPoint(pos);
        if (removed) {
          this.$onRemoveRange(removed);
          return removed[0];
        }
      };
      this.mergeOverlappingRanges = function() {
        var removed = this.rangeList.merge();
        if (removed.length) this.$onRemoveRange(removed);
      };
      this.$onAddRange = function(range) {
        this.rangeCount = this.rangeList.ranges.length;
        this.ranges.unshift(range);
        this._signal("addRange", { range: range });
      };
      this.$onRemoveRange = function(removed) {
        this.rangeCount = this.rangeList.ranges.length;
        if (1 == this.rangeCount && this.inMultiSelectMode) {
          var lastRange = this.rangeList.ranges.pop();
          removed.push(lastRange);
          this.rangeCount = 0;
        }
        for (var i = removed.length, index; i--; ) {
          index = this.ranges.indexOf(removed[i]);
          this.ranges.splice(index, 1);
        }
        this._signal("removeRange", { ranges: removed });
        if (0 === this.rangeCount && this.inMultiSelectMode) {
          this.inMultiSelectMode = !1;
          this._signal("singleSelect");
          this.session.$undoSelect = !0;
          this.rangeList.detach(this.session);
        }
        lastRange = lastRange || this.ranges[0];
        if (lastRange && !lastRange.isEqual(this.getRange()))
          this.fromOrientedRange(lastRange);
      };
      this.$initRangeList = function() {
        if (this.rangeList) return;
        this.rangeList = new RangeList();
        this.ranges = [];
        this.rangeCount = 0;
      };
      this.getAllRanges = function() {
        return this.rangeCount
          ? this.rangeList.ranges.concat()
          : [this.getRange()];
      };
      this.splitIntoLines = function() {
        if (1 < this.rangeCount) {
          var ranges = this.rangeList.ranges,
            lastRange = ranges[ranges.length - 1],
            range = Range.fromPoints(ranges[0].start, lastRange.end);
          this.toSingleRange();
          this.setSelectionRange(range, lastRange.cursor == lastRange.start);
        } else {
          var range = this.getRange(),
            isBackwards = this.isBackwards(),
            startRow = range.start.row,
            endRow = range.end.row;
          if (startRow == endRow) {
            if (isBackwards)
              var start = range.end,
                end = range.start;
            else
              var start = range.start,
                end = range.end;
            this.addRange(Range.fromPoints(end, end));
            this.addRange(Range.fromPoints(start, start));
            return;
          }
          var rectSel = [],
            r = this.getLineRange(startRow, !0);
          r.start.column = range.start.column;
          rectSel.push(r);
          for (var i = startRow + 1; i < endRow; i++) {
            rectSel.push(this.getLineRange(i, !0));
          }
          r = this.getLineRange(endRow, !0);
          r.end.column = range.end.column;
          rectSel.push(r);
          rectSel.forEach(this.addRange, this);
        }
      };
      this.toggleBlockSelection = function() {
        if (1 < this.rangeCount) {
          var ranges = this.rangeList.ranges,
            lastRange = ranges[ranges.length - 1],
            range = Range.fromPoints(ranges[0].start, lastRange.end);
          this.toSingleRange();
          this.setSelectionRange(range, lastRange.cursor == lastRange.start);
        } else {
          var cursor = this.session.documentToScreenPosition(this.cursor),
            anchor = this.session.documentToScreenPosition(this.anchor),
            rectSel = this.rectangularRangeBlock(cursor, anchor);
          rectSel.forEach(this.addRange, this);
        }
      };
      this.rectangularRangeBlock = function(
        screenCursor,
        screenAnchor,
        includeEmptyLines
      ) {
        var rectSel = [],
          xBackwards = screenCursor.column < screenAnchor.column;
        if (xBackwards) {
          var startColumn = screenCursor.column,
            endColumn = screenAnchor.column,
            startOffsetX = screenCursor.offsetX,
            endOffsetX = screenAnchor.offsetX;
        } else {
          var startColumn = screenAnchor.column,
            endColumn = screenCursor.column,
            startOffsetX = screenAnchor.offsetX,
            endOffsetX = screenCursor.offsetX;
        }
        var yBackwards = screenCursor.row < screenAnchor.row;
        if (yBackwards) {
          var startRow = screenCursor.row,
            endRow = screenAnchor.row;
        } else {
          var startRow = screenAnchor.row,
            endRow = screenCursor.row;
        }
        if (0 > startColumn) startColumn = 0;
        if (0 > startRow) startRow = 0;
        if (startRow == endRow) includeEmptyLines = !0;
        for (var docEnd, row = startRow, range; row <= endRow; row++) {
          range = Range.fromPoints(
            this.session.screenToDocumentPosition(
              row,
              startColumn,
              startOffsetX
            ),
            this.session.screenToDocumentPosition(row, endColumn, endOffsetX)
          );
          if (range.isEmpty()) {
            if (docEnd && isSamePoint(range.end, docEnd)) break;
            docEnd = range.end;
          }
          range.cursor = xBackwards ? range.start : range.end;
          rectSel.push(range);
        }
        if (yBackwards) rectSel.reverse();
        if (!includeEmptyLines) {
          var end = rectSel.length - 1;
          while (rectSel[end].isEmpty() && 0 < end) {
            end--;
          }
          if (0 < end) {
            var start = 0;
            while (rectSel[start].isEmpty()) {
              start++;
            }
          }
          for (var i = end; i >= start; i--) {
            if (rectSel[i].isEmpty()) rectSel.splice(i, 1);
          }
        }
        return rectSel;
      };
    }.call(Selection.prototype));
    var Editor = require("./editor").Editor;
    (function() {
      this.updateSelectionMarkers = function() {
        this.renderer.updateCursor();
        this.renderer.updateBackMarkers();
      };
      this.addSelectionMarker = function(orientedRange) {
        if (!orientedRange.cursor) orientedRange.cursor = orientedRange.end;
        var style = this.getSelectionStyle();
        orientedRange.marker = this.session.addMarker(
          orientedRange,
          "ace_selection",
          style
        );
        this.session.$selectionMarkers.push(orientedRange);
        this.session.selectionMarkerCount = this.session.$selectionMarkers.length;
        return orientedRange;
      };
      this.removeSelectionMarker = function(range) {
        if (!range.marker) return;
        this.session.removeMarker(range.marker);
        var index = this.session.$selectionMarkers.indexOf(range);
        if (-1 != index) this.session.$selectionMarkers.splice(index, 1);
        this.session.selectionMarkerCount = this.session.$selectionMarkers.length;
      };
      this.removeSelectionMarkers = function(ranges) {
        for (
          var markerList = this.session.$selectionMarkers,
            i = ranges.length,
            range;
          i--;

        ) {
          range = ranges[i];
          if (!range.marker) continue;
          this.session.removeMarker(range.marker);
          var index = markerList.indexOf(range);
          if (-1 != index) markerList.splice(index, 1);
        }
        this.session.selectionMarkerCount = markerList.length;
      };
      this.$onAddRange = function(e) {
        this.addSelectionMarker(e.range);
        this.renderer.updateCursor();
        this.renderer.updateBackMarkers();
      };
      this.$onRemoveRange = function(e) {
        this.removeSelectionMarkers(e.ranges);
        this.renderer.updateCursor();
        this.renderer.updateBackMarkers();
      };
      this.$onMultiSelect = function(e) {
        if (this.inMultiSelectMode) return;
        this.inMultiSelectMode = !0;
        this.setStyle("ace_multiselect");
        this.keyBinding.addKeyboardHandler(commands.keyboardHandler);
        this.commands.setDefaultHandler("exec", this.$onMultiSelectExec);
        this.renderer.updateCursor();
        this.renderer.updateBackMarkers();
      };
      this.$onSingleSelect = function(e) {
        if (this.session.multiSelect.inVirtualMode) return;
        this.inMultiSelectMode = !1;
        this.unsetStyle("ace_multiselect");
        this.keyBinding.removeKeyboardHandler(commands.keyboardHandler);
        this.commands.removeDefaultHandler("exec", this.$onMultiSelectExec);
        this.renderer.updateCursor();
        this.renderer.updateBackMarkers();
        this._emit("changeSelection");
      };
      this.$onMultiSelectExec = function(e) {
        var command = e.command,
          editor = e.editor;
        if (!editor.multiSelect) return;
        if (!command.multiSelectAction) {
          var result = command.exec(editor, e.args || {});
          editor.multiSelect.addRange(editor.multiSelect.toOrientedRange());
          editor.multiSelect.mergeOverlappingRanges();
        } else if ("forEach" == command.multiSelectAction) {
          result = editor.forEachSelection(command, e.args);
        } else if ("forEachLine" == command.multiSelectAction) {
          result = editor.forEachSelection(command, e.args, !0);
        } else if ("single" == command.multiSelectAction) {
          editor.exitMultiSelectMode();
          result = command.exec(editor, e.args || {});
        } else {
          result = command.multiSelectAction(editor, e.args || {});
        }
        return result;
      };
      this.forEachSelection = function(cmd, args, options) {
        if (this.inVirtualSelectionMode) return;
        var keepOrder = options && options.keepOrder,
          $byLines = !0 == options || (options && options.$byLines),
          session = this.session,
          selection = this.selection,
          rangeList = selection.rangeList,
          ranges = (keepOrder ? selection : rangeList).ranges,
          result;
        if (!ranges.length)
          return cmd.exec ? cmd.exec(this, args || {}) : cmd(this, args || {});
        var reg = selection._eventRegistry;
        selection._eventRegistry = {};
        var tmpSel = new Selection(session);
        this.inVirtualSelectionMode = !0;
        for (var i = ranges.length; i--; ) {
          if ($byLines) {
            while (0 < i && ranges[i].start.row == ranges[i - 1].end.row) {
              i--;
            }
          }
          tmpSel.fromOrientedRange(ranges[i]);
          tmpSel.index = i;
          this.selection = session.selection = tmpSel;
          var cmdResult = cmd.exec
            ? cmd.exec(this, args || {})
            : cmd(this, args || {});
          if (!result && cmdResult !== void 0) result = cmdResult;
          tmpSel.toOrientedRange(ranges[i]);
        }
        tmpSel.detach();
        this.selection = session.selection = selection;
        this.inVirtualSelectionMode = !1;
        selection._eventRegistry = reg;
        selection.mergeOverlappingRanges();
        if (selection.ranges[0])
          selection.fromOrientedRange(selection.ranges[0]);
        var anim = this.renderer.$scrollAnimation;
        this.onCursorChange();
        this.onSelectionChange();
        if (anim && anim.from == anim.to)
          this.renderer.animateScrolling(anim.from);
        return result;
      };
      this.exitMultiSelectMode = function() {
        if (!this.inMultiSelectMode || this.inVirtualSelectionMode) return;
        this.multiSelect.toSingleRange();
      };
      this.getSelectedText = function() {
        var text = "";
        if (this.inMultiSelectMode && !this.inVirtualSelectionMode) {
          for (
            var ranges = this.multiSelect.rangeList.ranges, buf = [], i = 0;
            i < ranges.length;
            i++
          ) {
            buf.push(this.session.getTextRange(ranges[i]));
          }
          var nl = this.session.getDocument().getNewLineCharacter();
          text = buf.join(nl);
          if (text.length == (buf.length - 1) * nl.length) text = "";
        } else if (!this.selection.isEmpty()) {
          text = this.session.getTextRange(this.getSelectionRange());
        }
        return text;
      };
      this.$checkMultiselectChange = function(e, anchor) {
        if (this.inMultiSelectMode && !this.inVirtualSelectionMode) {
          var range = this.multiSelect.ranges[0];
          if (this.multiSelect.isEmpty() && anchor == this.multiSelect.anchor)
            return;
          var pos =
            anchor == this.multiSelect.anchor
              ? range.cursor == range.start
                ? range.end
                : range.start
              : range.cursor;
          if (
            pos.row != anchor.row ||
            this.session.$clipPositionToDocument(pos.row, pos.column).column !=
              anchor.column
          )
            this.multiSelect.toSingleRange(this.multiSelect.toOrientedRange());
          else this.multiSelect.mergeOverlappingRanges();
        }
      };
      this.findAll = function(needle, options, additive) {
        options = options || {};
        options.needle = needle || options.needle;
        if (options.needle == void 0) {
          var range = this.selection.isEmpty()
            ? this.selection.getWordRange()
            : this.selection.getRange();
          options.needle = this.session.getTextRange(range);
        }
        this.$search.set(options);
        var ranges = this.$search.findAll(this.session);
        if (!ranges.length) return 0;
        var selection = this.multiSelect;
        if (!additive) selection.toSingleRange(ranges[0]);
        for (var i = ranges.length; i--; ) {
          selection.addRange(ranges[i], !0);
        }
        if (range && selection.rangeList.rangeAtPoint(range.start))
          selection.addRange(range, !0);
        return ranges.length;
      };
      this.selectMoreLines = function(dir, skip) {
        var range = this.selection.toOrientedRange(),
          isBackwards = range.cursor == range.end,
          screenLead = this.session.documentToScreenPosition(range.cursor);
        if (this.selection.$desiredColumn)
          screenLead.column = this.selection.$desiredColumn;
        var lead = this.session.screenToDocumentPosition(
          screenLead.row + dir,
          screenLead.column
        );
        if (!range.isEmpty()) {
          var screenAnchor = this.session.documentToScreenPosition(
              isBackwards ? range.end : range.start
            ),
            anchor = this.session.screenToDocumentPosition(
              screenAnchor.row + dir,
              screenAnchor.column
            );
        } else {
          var anchor = lead;
        }
        if (isBackwards) {
          var newRange = Range.fromPoints(lead, anchor);
          newRange.cursor = newRange.start;
        } else {
          var newRange = Range.fromPoints(anchor, lead);
          newRange.cursor = newRange.end;
        }
        newRange.desiredColumn = screenLead.column;
        if (!this.selection.inMultiSelectMode) {
          this.selection.addRange(range);
        } else {
          if (skip) var toRemove = range.cursor;
        }
        this.selection.addRange(newRange);
        if (toRemove) this.selection.substractPoint(toRemove);
      };
      this.transposeSelections = function(dir) {
        for (
          var session = this.session,
            sel = session.multiSelect,
            all = sel.ranges,
            i = all.length,
            range;
          i--;

        ) {
          range = all[i];
          if (range.isEmpty()) {
            var tmp = session.getWordRange(range.start.row, range.start.column);
            range.start.row = tmp.start.row;
            range.start.column = tmp.start.column;
            range.end.row = tmp.end.row;
            range.end.column = tmp.end.column;
          }
        }
        sel.mergeOverlappingRanges();
        for (var words = [], i = all.length, range; i--; ) {
          range = all[i];
          words.unshift(session.getTextRange(range));
        }
        if (0 > dir) words.unshift(words.pop());
        else words.push(words.shift());
        for (var i = all.length; i--; ) {
          var range = all[i],
            tmp = range.clone();
          session.replace(range, words[i]);
          range.start.row = tmp.start.row;
          range.start.column = tmp.start.column;
        }
        sel.fromOrientedRange(sel.ranges[0]);
      };
      this.selectMore = function(dir, skip, stopAtFirst) {
        var session = this.session,
          sel = session.multiSelect,
          range = sel.toOrientedRange();
        if (range.isEmpty()) {
          range = session.getWordRange(range.start.row, range.start.column);
          range.cursor = -1 == dir ? range.start : range.end;
          this.multiSelect.addRange(range);
          if (stopAtFirst) return;
        }
        var needle = session.getTextRange(range),
          newRange = find(session, needle, dir);
        if (newRange) {
          newRange.cursor = -1 == dir ? newRange.start : newRange.end;
          this.session.unfold(newRange);
          this.multiSelect.addRange(newRange);
          this.renderer.scrollCursorIntoView(null, 0.5);
        }
        if (skip) this.multiSelect.substractPoint(range.cursor);
      };
      this.alignCursors = function() {
        var session = this.session,
          sel = session.multiSelect,
          ranges = sel.ranges,
          row = -1,
          sameRowRanges = ranges.filter(function(r) {
            if (r.cursor.row == row) return !0;
            row = r.cursor.row;
          });
        if (!ranges.length || sameRowRanges.length == ranges.length - 1) {
          var range = this.selection.getRange(),
            fr = range.start.row,
            lr = range.end.row,
            guessRange = fr == lr;
          if (guessRange) {
            var max = this.session.getLength(),
              line;
            do {
              line = this.session.getLine(lr);
            } while (/[=:]/.test(line) && ++lr < max);
            do {
              line = this.session.getLine(fr);
            } while (/[=:]/.test(line) && 0 < --fr);
            if (0 > fr) fr = 0;
            if (lr >= max) lr = max - 1;
          }
          var lines = this.session.removeFullLines(fr, lr);
          lines = this.$reAlignText(lines, guessRange);
          this.session.insert({ row: fr, column: 0 }, lines.join("\n") + "\n");
          if (!guessRange) {
            range.start.column = 0;
            range.end.column = lines[lines.length - 1].length;
          }
          this.selection.setRange(range);
        } else {
          sameRowRanges.forEach(function(r) {
            sel.substractPoint(r.cursor);
          });
          var maxCol = 0,
            minSpace = 1 / 0,
            spaceOffsets = ranges.map(function(r) {
              var p = r.cursor,
                line = session.getLine(p.row),
                spaceOffset = line.substr(p.column).search(/\S/g);
              if (-1 == spaceOffset) spaceOffset = 0;
              if (p.column > maxCol) maxCol = p.column;
              if (spaceOffset < minSpace) minSpace = spaceOffset;
              return spaceOffset;
            });
          ranges.forEach(function(r, i) {
            var p = r.cursor,
              l = maxCol - p.column,
              d = spaceOffsets[i] - minSpace;
            if (l > d) session.insert(p, lang.stringRepeat(" ", l - d));
            else
              session.remove(
                new Range(p.row, p.column, p.row, p.column - l + d)
              );
            r.start.column = r.end.column = maxCol;
            r.start.row = r.end.row = p.row;
            r.cursor = r.end;
          });
          sel.fromOrientedRange(ranges[0]);
          this.renderer.updateCursor();
          this.renderer.updateBackMarkers();
        }
      };
      this.$reAlignText = function(lines, forceLeft) {
        var isLeftAligned = !0,
          isRightAligned = !0,
          startW,
          textW,
          endW;
        return lines
          .map(function(line) {
            var m = line.match(/(\s*)(.*?)(\s*)([=:].*)/);
            if (!m) return [line];
            if (null == startW) {
              startW = m[1].length;
              textW = m[2].length;
              endW = m[3].length;
              return m;
            }
            if (
              startW + textW + endW !=
              m[1].length + m[2].length + m[3].length
            )
              isRightAligned = !1;
            if (startW != m[1].length) isLeftAligned = !1;
            if (startW > m[1].length) startW = m[1].length;
            if (textW < m[2].length) textW = m[2].length;
            if (endW > m[3].length) endW = m[3].length;
            return m;
          })
          .map(
            forceLeft
              ? alignLeft
              : isLeftAligned
                ? isRightAligned
                  ? alignRight
                  : alignLeft
                : unAlign
          );
        function spaces(n) {
          return lang.stringRepeat(" ", n);
        }
        function alignLeft(m) {
          return !m[2]
            ? m[0]
            : spaces(startW) +
                m[2] +
                spaces(textW - m[2].length + endW) +
                m[4].replace(/^([=:])\s+/, "$1 ");
        }
        function alignRight(m) {
          return !m[2]
            ? m[0]
            : spaces(startW + textW - m[2].length) +
                m[2] +
                spaces(endW) +
                m[4].replace(/^([=:])\s+/, "$1 ");
        }
        function unAlign(m) {
          return !m[2]
            ? m[0]
            : spaces(startW) +
                m[2] +
                spaces(endW) +
                m[4].replace(/^([=:])\s+/, "$1 ");
        }
      };
    }.call(Editor.prototype));
    function isSamePoint(p1, p2) {
      return p1.row == p2.row && p1.column == p2.column;
    }
    exports.onSessionChange = function(e) {
      var session = e.session;
      if (session && !session.multiSelect) {
        session.$selectionMarkers = [];
        session.selection.$initRangeList();
        session.multiSelect = session.selection;
      }
      this.multiSelect = session && session.multiSelect;
      var oldSession = e.oldSession;
      if (oldSession) {
        oldSession.multiSelect.off("addRange", this.$onAddRange);
        oldSession.multiSelect.off("removeRange", this.$onRemoveRange);
        oldSession.multiSelect.off("multiSelect", this.$onMultiSelect);
        oldSession.multiSelect.off("singleSelect", this.$onSingleSelect);
        oldSession.multiSelect.lead.off("change", this.$checkMultiselectChange);
        oldSession.multiSelect.anchor.off(
          "change",
          this.$checkMultiselectChange
        );
      }
      if (session) {
        session.multiSelect.on("addRange", this.$onAddRange);
        session.multiSelect.on("removeRange", this.$onRemoveRange);
        session.multiSelect.on("multiSelect", this.$onMultiSelect);
        session.multiSelect.on("singleSelect", this.$onSingleSelect);
        session.multiSelect.lead.on("change", this.$checkMultiselectChange);
        session.multiSelect.anchor.on("change", this.$checkMultiselectChange);
      }
      if (
        session &&
        this.inMultiSelectMode != session.selection.inMultiSelectMode
      ) {
        if (session.selection.inMultiSelectMode) this.$onMultiSelect();
        else this.$onSingleSelect();
      }
    };
    function MultiSelect(editor) {
      if (editor.$multiselectOnSessionChange) return;
      editor.$onAddRange = editor.$onAddRange.bind(editor);
      editor.$onRemoveRange = editor.$onRemoveRange.bind(editor);
      editor.$onMultiSelect = editor.$onMultiSelect.bind(editor);
      editor.$onSingleSelect = editor.$onSingleSelect.bind(editor);
      editor.$multiselectOnSessionChange = exports.onSessionChange.bind(editor);
      editor.$checkMultiselectChange = editor.$checkMultiselectChange.bind(
        editor
      );
      editor.$multiselectOnSessionChange(editor);
      editor.on("changeSession", editor.$multiselectOnSessionChange);
      editor.on("mousedown", onMouseDown);
      editor.commands.addCommands(commands.defaultCommands);
      addAltCursorListeners(editor);
    }
    function addAltCursorListeners(editor) {
      var el = editor.textInput.getElement(),
        altCursor = !1;
      event.addListener(el, "keydown", function(e) {
        var altDown =
          18 == e.keyCode && !(e.ctrlKey || e.shiftKey || e.metaKey);
        if (editor.$blockSelectEnabled && altDown) {
          if (!altCursor) {
            editor.renderer.setMouseCursor("crosshair");
            altCursor = !0;
          }
        } else if (altCursor) {
          reset();
        }
      });
      event.addListener(el, "keyup", reset);
      event.addListener(el, "blur", reset);
      function reset(e) {
        if (altCursor) {
          editor.renderer.setMouseCursor("");
          altCursor = !1;
        }
      }
    }
    exports.MultiSelect = MultiSelect;
    require("./config").defineOptions(Editor.prototype, "editor", {
      enableMultiselect: {
        set: function set(val) {
          MultiSelect(this);
          if (val) {
            this.on("changeSession", this.$multiselectOnSessionChange);
            this.on("mousedown", onMouseDown);
          } else {
            this.off("changeSession", this.$multiselectOnSessionChange);
            this.off("mousedown", onMouseDown);
          }
        },
        value: !0
      },
      enableBlockSelect: {
        set: function set(val) {
          this.$blockSelectEnabled = val;
        },
        value: !0
      }
    });
  }
);
ace.define(
  "ace/mode/folding/fold_mode",
  ["require", "exports", "module", "ace/range"],
  function(require, exports, module) {
    "use strict";
    var Range = require("../../range").Range,
      FoldMode = (exports.FoldMode = function() {});
    (function() {
      this.foldingStartMarker = null;
      this.foldingStopMarker = null;
      this.getFoldWidget = function(session, foldStyle, row) {
        var line = session.getLine(row);
        if (this.foldingStartMarker.test(line)) return "start";
        if (
          "markbeginend" == foldStyle &&
          this.foldingStopMarker &&
          this.foldingStopMarker.test(line)
        )
          return "end";
        return "";
      };
      this.getFoldWidgetRange = function(session, foldStyle, row) {
        return null;
      };
      this.indentationBlock = function(session, row, column) {
        var re = /\S/,
          line = session.getLine(row),
          startLevel = line.search(re);
        if (-1 == startLevel) return;
        var startColumn = column || line.length,
          maxRow = session.getLength(),
          startRow = row,
          endRow = row;
        while (++row < maxRow) {
          var level = session.getLine(row).search(re);
          if (-1 == level) continue;
          if (level <= startLevel) break;
          endRow = row;
        }
        if (endRow > startRow) {
          var endColumn = session.getLine(endRow).length;
          return new Range(startRow, startColumn, endRow, endColumn);
        }
      };
      this.openingBracketBlock = function(
        session,
        bracket,
        row,
        column,
        typeRe
      ) {
        var start = { row: row, column: column + 1 },
          end = session.$findClosingBracket(bracket, start, typeRe);
        if (!end) return;
        var fw = session.foldWidgets[end.row];
        if (null == fw) fw = session.getFoldWidget(end.row);
        if ("start" == fw && end.row > start.row) {
          end.row--;
          end.column = session.getLine(end.row).length;
        }
        return Range.fromPoints(start, end);
      };
      this.closingBracketBlock = function(
        session,
        bracket,
        row,
        column,
        typeRe
      ) {
        var end = { row: row, column: column },
          start = session.$findOpeningBracket(bracket, end);
        if (!start) return;
        start.column++;
        end.column--;
        return Range.fromPoints(start, end);
      };
    }.call(FoldMode.prototype));
  }
);
ace.define(
  "ace/theme/textmate",
  ["require", "exports", "module", "ace/lib/dom"],
  function(require, exports, module) {
    "use strict";
    exports.isDark = !1;
    exports.cssClass = "ace-tm";
    exports.cssText =
      '.ace-tm .ace_gutter {background: #f0f0f0;color: #333;}.ace-tm .ace_print-margin {width: 1px;background: #e8e8e8;}.ace-tm .ace_fold {background-color: #6B72E6;}.ace-tm {background-color: #FFFFFF;color: black;}.ace-tm .ace_cursor {color: black;}.ace-tm .ace_invisible {color: rgb(191, 191, 191);}.ace-tm .ace_storage,.ace-tm .ace_keyword {color: blue;}.ace-tm .ace_constant {color: rgb(197, 6, 11);}.ace-tm .ace_constant.ace_buildin {color: rgb(88, 72, 246);}.ace-tm .ace_constant.ace_language {color: rgb(88, 92, 246);}.ace-tm .ace_constant.ace_library {color: rgb(6, 150, 14);}.ace-tm .ace_invalid {background-color: rgba(255, 0, 0, 0.1);color: red;}.ace-tm .ace_support.ace_function {color: rgb(60, 76, 114);}.ace-tm .ace_support.ace_constant {color: rgb(6, 150, 14);}.ace-tm .ace_support.ace_type,.ace-tm .ace_support.ace_class {color: rgb(109, 121, 222);}.ace-tm .ace_keyword.ace_operator {color: rgb(104, 118, 135);}.ace-tm .ace_string {color: rgb(3, 106, 7);}.ace-tm .ace_comment {color: rgb(76, 136, 107);}.ace-tm .ace_comment.ace_doc {color: rgb(0, 102, 255);}.ace-tm .ace_comment.ace_doc.ace_tag {color: rgb(128, 159, 191);}.ace-tm .ace_constant.ace_numeric {color: rgb(0, 0, 205);}.ace-tm .ace_variable {color: rgb(49, 132, 149);}.ace-tm .ace_xml-pe {color: rgb(104, 104, 91);}.ace-tm .ace_entity.ace_name.ace_function {color: #0000A2;}.ace-tm .ace_heading {color: rgb(12, 7, 255);}.ace-tm .ace_list {color:rgb(185, 6, 144);}.ace-tm .ace_meta.ace_tag {color:rgb(0, 22, 142);}.ace-tm .ace_string.ace_regex {color: rgb(255, 0, 0)}.ace-tm .ace_marker-layer .ace_selection {background: rgb(181, 213, 255);}.ace-tm.ace_multiselect .ace_selection.ace_start {box-shadow: 0 0 3px 0px white;}.ace-tm .ace_marker-layer .ace_step {background: rgb(252, 255, 0);}.ace-tm .ace_marker-layer .ace_stack {background: rgb(164, 229, 101);}.ace-tm .ace_marker-layer .ace_bracket {margin: -1px 0 0 -1px;border: 1px solid rgb(192, 192, 192);}.ace-tm .ace_marker-layer .ace_active-line {background: rgba(0, 0, 0, 0.07);}.ace-tm .ace_gutter-active-line {background-color : #dcdcdc;}.ace-tm .ace_marker-layer .ace_selected-word {background: rgb(250, 250, 255);border: 1px solid rgb(200, 200, 250);}.ace-tm .ace_indent-guide {background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==") right repeat-y;}';
    exports.$id = "ace/theme/textmate";
    var dom = require("../lib/dom");
    dom.importCssString(exports.cssText, exports.cssClass);
  }
);
ace.define(
  "ace/line_widgets",
  ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/range"],
  function(require, exports, module) {
    "use strict";
    var oop = require("./lib/oop"),
      dom = require("./lib/dom"),
      Range = require("./range").Range;
    function LineWidgets(session) {
      this.session = session;
      this.session.widgetManager = this;
      this.session.getRowLength = this.getRowLength;
      this.session.$getWidgetScreenLength = this.$getWidgetScreenLength;
      this.updateOnChange = this.updateOnChange.bind(this);
      this.renderWidgets = this.renderWidgets.bind(this);
      this.measureWidgets = this.measureWidgets.bind(this);
      this.session._changedWidgets = [];
      this.$onChangeEditor = this.$onChangeEditor.bind(this);
      this.session.on("change", this.updateOnChange);
      this.session.on("changeFold", this.updateOnFold);
      this.session.on("changeEditor", this.$onChangeEditor);
    }
    (function() {
      this.getRowLength = function(row) {
        var h;
        if (this.lineWidgets)
          h = (this.lineWidgets[row] && this.lineWidgets[row].rowCount) || 0;
        else h = 0;
        if (!this.$useWrapMode || !this.$wrapData[row]) {
          return 1 + h;
        } else {
          return this.$wrapData[row].length + 1 + h;
        }
      };
      this.$getWidgetScreenLength = function() {
        var screenRows = 0;
        this.lineWidgets.forEach(function(w) {
          if (w && w.rowCount && !w.hidden) screenRows += w.rowCount;
        });
        return screenRows;
      };
      this.$onChangeEditor = function(e) {
        this.attach(e.editor);
      };
      this.attach = function(editor) {
        if (editor && editor.widgetManager && editor.widgetManager != this)
          editor.widgetManager.detach();
        if (this.editor == editor) return;
        this.detach();
        this.editor = editor;
        if (editor) {
          editor.widgetManager = this;
          editor.renderer.on("beforeRender", this.measureWidgets);
          editor.renderer.on("afterRender", this.renderWidgets);
        }
      };
      this.detach = function(e) {
        var editor = this.editor;
        if (!editor) return;
        this.editor = null;
        editor.widgetManager = null;
        editor.renderer.off("beforeRender", this.measureWidgets);
        editor.renderer.off("afterRender", this.renderWidgets);
        var lineWidgets = this.session.lineWidgets;
        lineWidgets &&
          lineWidgets.forEach(function(w) {
            if (w && w.el && w.el.parentNode) {
              w._inDocument = !1;
              w.el.parentNode.removeChild(w.el);
            }
          });
      };
      this.updateOnFold = function(e, session) {
        var lineWidgets = session.lineWidgets;
        if (!lineWidgets || !e.action) return;
        for (
          var fold = e.data,
            start = fold.start.row,
            end = fold.end.row,
            hide = "add" == e.action,
            i = start + 1;
          i < end;
          i++
        ) {
          if (lineWidgets[i]) lineWidgets[i].hidden = hide;
        }
        if (lineWidgets[end]) {
          if (hide) {
            if (!lineWidgets[start]) lineWidgets[start] = lineWidgets[end];
            else lineWidgets[end].hidden = hide;
          } else {
            if (lineWidgets[start] == lineWidgets[end])
              lineWidgets[start] = void 0;
            lineWidgets[end].hidden = hide;
          }
        }
      };
      this.updateOnChange = function(delta) {
        var lineWidgets = this.session.lineWidgets;
        if (!lineWidgets) return;
        var startRow = delta.start.row,
          len = delta.end.row - startRow;
        if (0 === len) {
        } else if ("remove" == delta.action) {
          var removed = lineWidgets.splice(startRow + 1, len);
          removed.forEach(function(w) {
            w && this.removeLineWidget(w);
          }, this);
          this.$updateRows();
        } else {
          var args = Array(len);
          args.unshift(startRow, 0);
          lineWidgets.splice.apply(lineWidgets, args);
          this.$updateRows();
        }
      };
      this.$updateRows = function() {
        var lineWidgets = this.session.lineWidgets;
        if (!lineWidgets) return;
        var noWidgets = !0;
        lineWidgets.forEach(function(w, i) {
          if (w) {
            noWidgets = !1;
            w.row = i;
            while (w.$oldWidget) {
              w.$oldWidget.row = i;
              w = w.$oldWidget;
            }
          }
        });
        if (noWidgets) this.session.lineWidgets = null;
      };
      this.addLineWidget = function(w) {
        if (!this.session.lineWidgets)
          this.session.lineWidgets = Array(this.session.getLength());
        var old = this.session.lineWidgets[w.row];
        if (old) {
          w.$oldWidget = old;
          if (old.el && old.el.parentNode) {
            old.el.parentNode.removeChild(old.el);
            old._inDocument = !1;
          }
        }
        this.session.lineWidgets[w.row] = w;
        w.session = this.session;
        var renderer = this.editor.renderer;
        if (w.html && !w.el) {
          w.el = dom.createElement("div");
          w.el.innerHTML = w.html;
        }
        if (w.el) {
          dom.addCssClass(w.el, "ace_lineWidgetContainer");
          w.el.style.position = "absolute";
          w.el.style.zIndex = 5;
          renderer.container.appendChild(w.el);
          w._inDocument = !0;
        }
        if (!w.coverGutter) {
          w.el.style.zIndex = 3;
        }
        if (null == w.pixelHeight) {
          w.pixelHeight = w.el.offsetHeight;
        }
        if (null == w.rowCount) {
          w.rowCount = w.pixelHeight / renderer.layerConfig.lineHeight;
        }
        var fold = this.session.getFoldAt(w.row, 0);
        w.$fold = fold;
        if (fold) {
          var lineWidgets = this.session.lineWidgets;
          if (w.row == fold.end.row && !lineWidgets[fold.start.row])
            lineWidgets[fold.start.row] = w;
          else w.hidden = !0;
        }
        this.session._emit("changeFold", { data: { start: { row: w.row } } });
        this.$updateRows();
        this.renderWidgets(null, renderer);
        this.onWidgetChanged(w);
        return w;
      };
      this.removeLineWidget = function(w) {
        w._inDocument = !1;
        w.session = null;
        if (w.el && w.el.parentNode) w.el.parentNode.removeChild(w.el);
        if (w.editor && w.editor.destroy)
          try {
            w.editor.destroy();
          } catch (e) {}
        if (this.session.lineWidgets) {
          var w1 = this.session.lineWidgets[w.row];
          if (w1 == w) {
            this.session.lineWidgets[w.row] = w.$oldWidget;
            if (w.$oldWidget) this.onWidgetChanged(w.$oldWidget);
          } else {
            while (w1) {
              if (w1.$oldWidget == w) {
                w1.$oldWidget = w.$oldWidget;
                break;
              }
              w1 = w1.$oldWidget;
            }
          }
        }
        this.session._emit("changeFold", { data: { start: { row: w.row } } });
        this.$updateRows();
      };
      this.getWidgetsAtRow = function(row) {
        var lineWidgets = this.session.lineWidgets,
          w = lineWidgets && lineWidgets[row],
          list = [];
        while (w) {
          list.push(w);
          w = w.$oldWidget;
        }
        return list;
      };
      this.onWidgetChanged = function(w) {
        this.session._changedWidgets.push(w);
        this.editor && this.editor.renderer.updateFull();
      };
      this.measureWidgets = function(e, renderer) {
        var changedWidgets = this.session._changedWidgets,
          config = renderer.layerConfig;
        if (!changedWidgets || !changedWidgets.length) return;
        for (var min = 1 / 0, i = 0, w; i < changedWidgets.length; i++) {
          w = changedWidgets[i];
          if (!w || !w.el) continue;
          if (w.session != this.session) continue;
          if (!w._inDocument) {
            if (this.session.lineWidgets[w.row] != w) continue;
            w._inDocument = !0;
            renderer.container.appendChild(w.el);
          }
          w.h = w.el.offsetHeight;
          if (!w.fixedWidth) {
            w.w = w.el.offsetWidth;
            w.screenWidth = Math.ceil(w.w / config.characterWidth);
          }
          var rowCount = w.h / config.lineHeight;
          if (w.coverLine) {
            rowCount -= this.session.getRowLineCount(w.row);
            if (0 > rowCount) rowCount = 0;
          }
          if (w.rowCount != rowCount) {
            w.rowCount = rowCount;
            if (w.row < min) min = w.row;
          }
        }
        if (min != 1 / 0) {
          this.session._emit("changeFold", { data: { start: { row: min } } });
          this.session.lineWidgetWidth = null;
        }
        this.session._changedWidgets = [];
      };
      this.renderWidgets = function(e, renderer) {
        var config = renderer.layerConfig,
          lineWidgets = this.session.lineWidgets;
        if (!lineWidgets) return;
        var first = Math.min(this.firstRow, config.firstRow),
          last = Math.max(this.lastRow, config.lastRow, lineWidgets.length);
        while (0 < first && !lineWidgets[first]) {
          first--;
        }
        this.firstRow = config.firstRow;
        this.lastRow = config.lastRow;
        renderer.$cursorLayer.config = config;
        for (var i = first, w; i <= last; i++) {
          w = lineWidgets[i];
          if (!w || !w.el) continue;
          if (w.hidden) {
            w.el.style.top = -100 - (w.pixelHeight || 0) + "px";
            continue;
          }
          if (!w._inDocument) {
            w._inDocument = !0;
            renderer.container.appendChild(w.el);
          }
          var top = renderer.$cursorLayer.getPixelPosition(
            { row: i, column: 0 },
            !0
          ).top;
          if (!w.coverLine)
            top += config.lineHeight * this.session.getRowLineCount(w.row);
          w.el.style.top = top - config.offset + "px";
          var left = w.coverGutter ? 0 : renderer.gutterWidth;
          if (!w.fixedWidth) left -= renderer.scrollLeft;
          w.el.style.left = left + "px";
          if (w.fullWidth && w.screenWidth) {
            w.el.style.minWidth = config.width + 2 * config.padding + "px";
          }
          if (w.fixedWidth) {
            w.el.style.right = renderer.scrollBar.getWidth() + "px";
          } else {
            w.el.style.right = "";
          }
        }
      };
    }.call(LineWidgets.prototype));
    exports.LineWidgets = LineWidgets;
  }
);
ace.define(
  "ace/ext/error_marker",
  [
    "require",
    "exports",
    "module",
    "ace/line_widgets",
    "ace/lib/dom",
    "ace/range"
  ],
  function(require, exports, module) {
    "use strict";
    var LineWidgets = require("../line_widgets").LineWidgets,
      dom = require("../lib/dom"),
      Range = require("../range").Range;
    function binarySearch(array, needle, comparator) {
      var first = 0,
        last = array.length - 1;
      while (first <= last) {
        var mid = (first + last) >> 1,
          c = comparator(needle, array[mid]);
        if (0 < c) first = mid + 1;
        else if (0 > c) last = mid - 1;
        else return mid;
      }
      return -(first + 1);
    }
    function findAnnotations(session, row, dir) {
      var annotations = session.getAnnotations().sort(Range.comparePoints);
      if (!annotations.length) return;
      var i = binarySearch(
        annotations,
        { row: row, column: -1 },
        Range.comparePoints
      );
      if (0 > i) i = -i - 1;
      if (i >= annotations.length) i = 0 < dir ? 0 : annotations.length - 1;
      else if (0 === i && 0 > dir) i = annotations.length - 1;
      var annotation = annotations[i];
      if (!annotation || !dir) return;
      if (annotation.row === row) {
        do {
          annotation = annotations[(i += dir)];
        } while (annotation && annotation.row === row);
        if (!annotation) return annotations.slice();
      }
      var matched = [];
      row = annotation.row;
      do {
        matched[0 > dir ? "unshift" : "push"](annotation);
        annotation = annotations[(i += dir)];
      } while (annotation && annotation.row == row);
      return matched.length && matched;
    }
    exports.showErrorMarker = function(editor, dir) {
      var session = editor.session;
      if (!session.widgetManager) {
        session.widgetManager = new LineWidgets(session);
        session.widgetManager.attach(editor);
      }
      var pos = editor.getCursorPosition(),
        row = pos.row,
        oldWidget = session.widgetManager
          .getWidgetsAtRow(row)
          .filter(function(w) {
            return "errorMarker" == w.type;
          })[0];
      if (oldWidget) {
        oldWidget.destroy();
      } else {
        row -= dir;
      }
      var annotations = findAnnotations(session, row, dir),
        gutterAnno;
      if (annotations) {
        var annotation = annotations[0];
        pos.column =
          (annotation.pos && "number" != typeof annotation.column
            ? annotation.pos.sc
            : annotation.column) || 0;
        pos.row = annotation.row;
        gutterAnno = editor.renderer.$gutterLayer.$annotations[pos.row];
      } else if (oldWidget) {
        return;
      } else {
        gutterAnno = { text: ["Looks good!"], className: "ace_ok" };
      }
      editor.session.unfold(pos.row);
      editor.selection.moveToPosition(pos);
      var w = {
          row: pos.row,
          fixedWidth: !0,
          coverGutter: !0,
          el: dom.createElement("div"),
          type: "errorMarker"
        },
        el = w.el.appendChild(dom.createElement("div")),
        arrow = w.el.appendChild(dom.createElement("div"));
      arrow.className = "error_widget_arrow " + gutterAnno.className;
      var left = editor.renderer.$cursorLayer.getPixelPosition(pos).left;
      arrow.style.left = left + editor.renderer.gutterWidth - 5 + "px";
      w.el.className = "error_widget_wrapper";
      el.className = "error_widget " + gutterAnno.className;
      el.innerHTML = gutterAnno.text.join("<br>");
      el.appendChild(dom.createElement("div"));
      var kb = function kb(_, hashId, keyString) {
        if (0 === hashId && ("esc" === keyString || "return" === keyString)) {
          w.destroy();
          return { command: "null" };
        }
      };
      w.destroy = function() {
        if (editor.$mouseHandler.isMousePressed) return;
        editor.keyBinding.removeKeyboardHandler(kb);
        session.widgetManager.removeLineWidget(w);
        editor.off("changeSelection", w.destroy);
        editor.off("changeSession", w.destroy);
        editor.off("mouseup", w.destroy);
        editor.off("change", w.destroy);
      };
      editor.keyBinding.addKeyboardHandler(kb);
      editor.on("changeSelection", w.destroy);
      editor.on("changeSession", w.destroy);
      editor.on("mouseup", w.destroy);
      editor.on("change", w.destroy);
      editor.session.widgetManager.addLineWidget(w);
      w.el.onmousedown = editor.focus.bind(editor);
      editor.renderer.scrollCursorIntoView(null, 0.5, {
        bottom: w.el.offsetHeight
      });
    };
    dom.importCssString(
      "    .error_widget_wrapper {        background: inherit;        color: inherit;        border:none    }    .error_widget {        border-top: solid 2px;        border-bottom: solid 2px;        margin: 5px 0;        padding: 10px 40px;        white-space: pre-wrap;    }    .error_widget.ace_error, .error_widget_arrow.ace_error{        border-color: #ff5a5a    }    .error_widget.ace_warning, .error_widget_arrow.ace_warning{        border-color: #F1D817    }    .error_widget.ace_info, .error_widget_arrow.ace_info{        border-color: #5a5a5a    }    .error_widget.ace_ok, .error_widget_arrow.ace_ok{        border-color: #5aaa5a    }    .error_widget_arrow {        position: absolute;        border: solid 5px;        border-top-color: transparent!important;        border-right-color: transparent!important;        border-left-color: transparent!important;        top: -5px;    }",
      ""
    );
  }
);
ace.define(
  "ace/ace",
  [
    "require",
    "exports",
    "module",
    "ace/lib/fixoldbrowsers",
    "ace/lib/dom",
    "ace/lib/event",
    "ace/range",
    "ace/editor",
    "ace/edit_session",
    "ace/undomanager",
    "ace/virtual_renderer",
    "ace/worker/worker_client",
    "ace/keyboard/hash_handler",
    "ace/placeholder",
    "ace/multi_select",
    "ace/mode/folding/fold_mode",
    "ace/theme/textmate",
    "ace/ext/error_marker",
    "ace/config"
  ],
  function(require, exports, module) {
    "use strict";
    require("./lib/fixoldbrowsers");
    var dom = require("./lib/dom"),
      event = require("./lib/event"),
      Range = require("./range").Range,
      Editor = require("./editor").Editor,
      EditSession = require("./edit_session").EditSession,
      UndoManager = require("./undomanager").UndoManager,
      Renderer = require("./virtual_renderer").VirtualRenderer;
    require("./worker/worker_client");
    require("./keyboard/hash_handler");
    require("./placeholder");
    require("./multi_select");
    require("./mode/folding/fold_mode");
    require("./theme/textmate");
    require("./ext/error_marker");
    exports.config = require("./config");
    exports.require = require;
    if ("function" === typeof define) exports.define = define;
    exports.edit = function(el, options) {
      if ("string" == typeof el) {
        var _id = el;
        el = document.getElementById(_id);
        if (!el) throw new Error("ace.edit can't find div #" + _id);
      }
      if (el && el.env && babelHelpers.instanceof(el.env.editor, Editor))
        return el.env.editor;
      var value = "";
      if (el && /input|textarea/i.test(el.tagName)) {
        var oldNode = el;
        value = oldNode.value;
        el = dom.createElement("pre");
        oldNode.parentNode.replaceChild(el, oldNode);
      } else if (el) {
        value = el.textContent;
        el.innerHTML = "";
      }
      var doc = exports.createEditSession(value),
        editor = new Editor(new Renderer(el), doc, options),
        env = {
          document: doc,
          editor: editor,
          onResize: editor.resize.bind(editor, null)
        };
      if (oldNode) env.textarea = oldNode;
      event.addListener(window, "resize", env.onResize);
      editor.on("destroy", function() {
        event.removeListener(window, "resize", env.onResize);
        env.editor.container.env = null;
      });
      editor.container.env = editor.env = env;
      return editor;
    };
    exports.createEditSession = function(text, mode) {
      var doc = new EditSession(text, mode);
      doc.setUndoManager(new UndoManager());
      return doc;
    };
    exports.Range = Range;
    exports.EditSession = EditSession;
    exports.UndoManager = UndoManager;
    exports.VirtualRenderer = Renderer;
    exports.version = "1.4.1";
  }
);
(function() {
  ace.require(["ace/ace"], function(a) {
    if (a) {
      a.config.init(!0);
      a.define = ace.define;
    }
    if (!window.ace) window.ace = a;
    for (var key in a) {
      if (a.hasOwnProperty(key)) window.ace[key] = a[key];
    }
    window.ace["default"] = window.ace;
    if (
      "object" ==
        ("undefined" === typeof module
          ? "undefined"
          : babelHelpers.typeof(module)) &&
      "object" ==
        ("undefined" === typeof exports
          ? "undefined"
          : babelHelpers.typeof(exports)) &&
      module
    ) {
      module.exports = window.ace;
    }
  });
})();
