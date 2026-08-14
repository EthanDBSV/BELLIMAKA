"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  // node_modules/events/events.js
  var require_events = __commonJS({
    "node_modules/events/events.js"(exports, module) {
      "use strict";
      var R = typeof Reflect === "object" ? Reflect : null;
      var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
        return Function.prototype.apply.call(target, receiver, args);
      };
      var ReflectOwnKeys;
      if (R && typeof R.ownKeys === "function") {
        ReflectOwnKeys = R.ownKeys;
      } else if (Object.getOwnPropertySymbols) {
        ReflectOwnKeys = function ReflectOwnKeys2(target) {
          return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
        };
      } else {
        ReflectOwnKeys = function ReflectOwnKeys2(target) {
          return Object.getOwnPropertyNames(target);
        };
      }
      function ProcessEmitWarning(warning) {
        if (console && console.warn) console.warn(warning);
      }
      var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
        return value !== value;
      };
      function EventEmitter2() {
        EventEmitter2.init.call(this);
      }
      module.exports = EventEmitter2;
      module.exports.once = once;
      EventEmitter2.EventEmitter = EventEmitter2;
      EventEmitter2.prototype._events = void 0;
      EventEmitter2.prototype._eventsCount = 0;
      EventEmitter2.prototype._maxListeners = void 0;
      var defaultMaxListeners = 10;
      function checkListener(listener) {
        if (typeof listener !== "function") {
          throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
        }
      }
      Object.defineProperty(EventEmitter2, "defaultMaxListeners", {
        enumerable: true,
        get: function() {
          return defaultMaxListeners;
        },
        set: function(arg) {
          if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
            throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
          }
          defaultMaxListeners = arg;
        }
      });
      EventEmitter2.init = function() {
        if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        }
        this._maxListeners = this._maxListeners || void 0;
      };
      EventEmitter2.prototype.setMaxListeners = function setMaxListeners(n) {
        if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
          throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
        }
        this._maxListeners = n;
        return this;
      };
      function _getMaxListeners(that) {
        if (that._maxListeners === void 0)
          return EventEmitter2.defaultMaxListeners;
        return that._maxListeners;
      }
      EventEmitter2.prototype.getMaxListeners = function getMaxListeners() {
        return _getMaxListeners(this);
      };
      EventEmitter2.prototype.emit = function emit(type) {
        var args = [];
        for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
        var doError = type === "error";
        var events = this._events;
        if (events !== void 0)
          doError = doError && events.error === void 0;
        else if (!doError)
          return false;
        if (doError) {
          var er;
          if (args.length > 0)
            er = args[0];
          if (er instanceof Error) {
            throw er;
          }
          var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
          err.context = er;
          throw err;
        }
        var handler = events[type];
        if (handler === void 0)
          return false;
        if (typeof handler === "function") {
          ReflectApply(handler, this, args);
        } else {
          var len = handler.length;
          var listeners = arrayClone(handler, len);
          for (var i = 0; i < len; ++i)
            ReflectApply(listeners[i], this, args);
        }
        return true;
      };
      function _addListener(target, type, listener, prepend) {
        var m;
        var events;
        var existing;
        checkListener(listener);
        events = target._events;
        if (events === void 0) {
          events = target._events = /* @__PURE__ */ Object.create(null);
          target._eventsCount = 0;
        } else {
          if (events.newListener !== void 0) {
            target.emit(
              "newListener",
              type,
              listener.listener ? listener.listener : listener
            );
            events = target._events;
          }
          existing = events[type];
        }
        if (existing === void 0) {
          existing = events[type] = listener;
          ++target._eventsCount;
        } else {
          if (typeof existing === "function") {
            existing = events[type] = prepend ? [listener, existing] : [existing, listener];
          } else if (prepend) {
            existing.unshift(listener);
          } else {
            existing.push(listener);
          }
          m = _getMaxListeners(target);
          if (m > 0 && existing.length > m && !existing.warned) {
            existing.warned = true;
            var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
            w.name = "MaxListenersExceededWarning";
            w.emitter = target;
            w.type = type;
            w.count = existing.length;
            ProcessEmitWarning(w);
          }
        }
        return target;
      }
      EventEmitter2.prototype.addListener = function addListener(type, listener) {
        return _addListener(this, type, listener, false);
      };
      EventEmitter2.prototype.on = EventEmitter2.prototype.addListener;
      EventEmitter2.prototype.prependListener = function prependListener(type, listener) {
        return _addListener(this, type, listener, true);
      };
      function onceWrapper() {
        if (!this.fired) {
          this.target.removeListener(this.type, this.wrapFn);
          this.fired = true;
          if (arguments.length === 0)
            return this.listener.call(this.target);
          return this.listener.apply(this.target, arguments);
        }
      }
      function _onceWrap(target, type, listener) {
        var state = { fired: false, wrapFn: void 0, target, type, listener };
        var wrapped = onceWrapper.bind(state);
        wrapped.listener = listener;
        state.wrapFn = wrapped;
        return wrapped;
      }
      EventEmitter2.prototype.once = function once2(type, listener) {
        checkListener(listener);
        this.on(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter2.prototype.prependOnceListener = function prependOnceListener(type, listener) {
        checkListener(listener);
        this.prependListener(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter2.prototype.removeListener = function removeListener(type, listener) {
        var list, events, position, i, originalListener;
        checkListener(listener);
        events = this._events;
        if (events === void 0)
          return this;
        list = events[type];
        if (list === void 0)
          return this;
        if (list === listener || list.listener === listener) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else {
            delete events[type];
            if (events.removeListener)
              this.emit("removeListener", type, list.listener || listener);
          }
        } else if (typeof list !== "function") {
          position = -1;
          for (i = list.length - 1; i >= 0; i--) {
            if (list[i] === listener || list[i].listener === listener) {
              originalListener = list[i].listener;
              position = i;
              break;
            }
          }
          if (position < 0)
            return this;
          if (position === 0)
            list.shift();
          else {
            spliceOne(list, position);
          }
          if (list.length === 1)
            events[type] = list[0];
          if (events.removeListener !== void 0)
            this.emit("removeListener", type, originalListener || listener);
        }
        return this;
      };
      EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
      EventEmitter2.prototype.removeAllListeners = function removeAllListeners(type) {
        var listeners, events, i;
        events = this._events;
        if (events === void 0)
          return this;
        if (events.removeListener === void 0) {
          if (arguments.length === 0) {
            this._events = /* @__PURE__ */ Object.create(null);
            this._eventsCount = 0;
          } else if (events[type] !== void 0) {
            if (--this._eventsCount === 0)
              this._events = /* @__PURE__ */ Object.create(null);
            else
              delete events[type];
          }
          return this;
        }
        if (arguments.length === 0) {
          var keys = Object.keys(events);
          var key;
          for (i = 0; i < keys.length; ++i) {
            key = keys[i];
            if (key === "removeListener") continue;
            this.removeAllListeners(key);
          }
          this.removeAllListeners("removeListener");
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
          return this;
        }
        listeners = events[type];
        if (typeof listeners === "function") {
          this.removeListener(type, listeners);
        } else if (listeners !== void 0) {
          for (i = listeners.length - 1; i >= 0; i--) {
            this.removeListener(type, listeners[i]);
          }
        }
        return this;
      };
      function _listeners(target, type, unwrap) {
        var events = target._events;
        if (events === void 0)
          return [];
        var evlistener = events[type];
        if (evlistener === void 0)
          return [];
        if (typeof evlistener === "function")
          return unwrap ? [evlistener.listener || evlistener] : [evlistener];
        return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
      }
      EventEmitter2.prototype.listeners = function listeners(type) {
        return _listeners(this, type, true);
      };
      EventEmitter2.prototype.rawListeners = function rawListeners(type) {
        return _listeners(this, type, false);
      };
      EventEmitter2.listenerCount = function(emitter, type) {
        if (typeof emitter.listenerCount === "function") {
          return emitter.listenerCount(type);
        } else {
          return listenerCount.call(emitter, type);
        }
      };
      EventEmitter2.prototype.listenerCount = listenerCount;
      function listenerCount(type) {
        var events = this._events;
        if (events !== void 0) {
          var evlistener = events[type];
          if (typeof evlistener === "function") {
            return 1;
          } else if (evlistener !== void 0) {
            return evlistener.length;
          }
        }
        return 0;
      }
      EventEmitter2.prototype.eventNames = function eventNames() {
        return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
      };
      function arrayClone(arr, n) {
        var copy = new Array(n);
        for (var i = 0; i < n; ++i)
          copy[i] = arr[i];
        return copy;
      }
      function spliceOne(list, index) {
        for (; index + 1 < list.length; index++)
          list[index] = list[index + 1];
        list.pop();
      }
      function unwrapListeners(arr) {
        var ret = new Array(arr.length);
        for (var i = 0; i < ret.length; ++i) {
          ret[i] = arr[i].listener || arr[i];
        }
        return ret;
      }
      function once(emitter, name) {
        return new Promise(function(resolve, reject) {
          function errorListener(err) {
            emitter.removeListener(name, resolver);
            reject(err);
          }
          function resolver() {
            if (typeof emitter.removeListener === "function") {
              emitter.removeListener("error", errorListener);
            }
            resolve([].slice.call(arguments));
          }
          ;
          eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
          if (name !== "error") {
            addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
          }
        });
      }
      function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
        if (typeof emitter.on === "function") {
          eventTargetAgnosticAddListener(emitter, "error", handler, flags);
        }
      }
      function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
        if (typeof emitter.on === "function") {
          if (flags.once) {
            emitter.once(name, listener);
          } else {
            emitter.on(name, listener);
          }
        } else if (typeof emitter.addEventListener === "function") {
          emitter.addEventListener(name, function wrapListener(arg) {
            if (flags.once) {
              emitter.removeEventListener(name, wrapListener);
            }
            listener(arg);
          });
        } else {
          throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
        }
      }
    }
  });

  // node_modules/brackets-model/dist/unions.js
  var require_unions = __commonJS({
    "node_modules/brackets-model/dist/unions.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/brackets-model/dist/input.js
  var require_input = __commonJS({
    "node_modules/brackets-model/dist/input.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/brackets-model/dist/storage.js
  var require_storage = __commonJS({
    "node_modules/brackets-model/dist/storage.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/brackets-model/dist/other.js
  var require_other = __commonJS({
    "node_modules/brackets-model/dist/other.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Status = void 0;
      var Status7;
      (function(Status8) {
        Status8[Status8["Locked"] = 0] = "Locked";
        Status8[Status8["Waiting"] = 1] = "Waiting";
        Status8[Status8["Ready"] = 2] = "Ready";
        Status8[Status8["Running"] = 3] = "Running";
        Status8[Status8["Completed"] = 4] = "Completed";
        Status8[Status8["Archived"] = 5] = "Archived";
        Status8[Status8["GameCancelled"] = 6] = "GameCancelled";
      })(Status7 = exports.Status || (exports.Status = {}));
    }
  });

  // node_modules/brackets-model/dist/index.js
  var require_dist = __commonJS({
    "node_modules/brackets-model/dist/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar(require_unions(), exports);
      __exportStar(require_input(), exports);
      __exportStar(require_storage(), exports);
      __exportStar(require_other(), exports);
    }
  });

  // node_modules/rfdc/index.js
  var require_rfdc = __commonJS({
    "node_modules/rfdc/index.js"(exports, module) {
      "use strict";
      module.exports = rfdc;
      function copyBuffer(cur) {
        if (cur instanceof Buffer) {
          return Buffer.from(cur);
        }
        return new cur.constructor(cur.buffer.slice(), cur.byteOffset, cur.length);
      }
      function rfdc(opts) {
        opts = opts || {};
        if (opts.circles) return rfdcCircles(opts);
        const constructorHandlers = /* @__PURE__ */ new Map();
        constructorHandlers.set(Date, (o) => new Date(o));
        constructorHandlers.set(Map, (o, fn) => new Map(cloneArray(Array.from(o), fn)));
        constructorHandlers.set(Set, (o, fn) => new Set(cloneArray(Array.from(o), fn)));
        if (opts.constructorHandlers) {
          for (const handler2 of opts.constructorHandlers) {
            constructorHandlers.set(handler2[0], handler2[1]);
          }
        }
        let handler = null;
        return opts.proto ? cloneProto : clone;
        function cloneArray(a, fn) {
          const keys = Object.keys(a);
          const a2 = new Array(keys.length);
          for (let i = 0; i < keys.length; i++) {
            const k = keys[i];
            const cur = a[k];
            if (typeof cur !== "object" || cur === null) {
              a2[k] = cur;
            } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
              a2[k] = handler(cur, fn);
            } else if (ArrayBuffer.isView(cur)) {
              a2[k] = copyBuffer(cur);
            } else {
              a2[k] = fn(cur);
            }
          }
          return a2;
        }
        function clone(o) {
          if (typeof o !== "object" || o === null) return o;
          if (Array.isArray(o)) return cloneArray(o, clone);
          if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
            return handler(o, clone);
          }
          const o2 = {};
          for (const k in o) {
            if (Object.hasOwnProperty.call(o, k) === false) continue;
            const cur = o[k];
            if (typeof cur !== "object" || cur === null) {
              o2[k] = cur;
            } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
              o2[k] = handler(cur, clone);
            } else if (ArrayBuffer.isView(cur)) {
              o2[k] = copyBuffer(cur);
            } else {
              o2[k] = clone(cur);
            }
          }
          return o2;
        }
        function cloneProto(o) {
          if (typeof o !== "object" || o === null) return o;
          if (Array.isArray(o)) return cloneArray(o, cloneProto);
          if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
            return handler(o, cloneProto);
          }
          const o2 = {};
          for (const k in o) {
            const cur = o[k];
            if (typeof cur !== "object" || cur === null) {
              o2[k] = cur;
            } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
              o2[k] = handler(cur, cloneProto);
            } else if (ArrayBuffer.isView(cur)) {
              o2[k] = copyBuffer(cur);
            } else {
              o2[k] = cloneProto(cur);
            }
          }
          return o2;
        }
      }
      function rfdcCircles(opts) {
        const refs = [];
        const refsNew = [];
        const constructorHandlers = /* @__PURE__ */ new Map();
        constructorHandlers.set(Date, (o) => new Date(o));
        constructorHandlers.set(Map, (o, fn) => new Map(cloneArray(Array.from(o), fn)));
        constructorHandlers.set(Set, (o, fn) => new Set(cloneArray(Array.from(o), fn)));
        if (opts.constructorHandlers) {
          for (const handler2 of opts.constructorHandlers) {
            constructorHandlers.set(handler2[0], handler2[1]);
          }
        }
        let handler = null;
        return opts.proto ? cloneProto : clone;
        function cloneArray(a, fn) {
          const keys = Object.keys(a);
          const a2 = new Array(keys.length);
          for (let i = 0; i < keys.length; i++) {
            const k = keys[i];
            const cur = a[k];
            if (typeof cur !== "object" || cur === null) {
              a2[k] = cur;
            } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
              a2[k] = handler(cur, fn);
            } else if (ArrayBuffer.isView(cur)) {
              a2[k] = copyBuffer(cur);
            } else {
              const index = refs.indexOf(cur);
              if (index !== -1) {
                a2[k] = refsNew[index];
              } else {
                a2[k] = fn(cur);
              }
            }
          }
          return a2;
        }
        function clone(o) {
          if (typeof o !== "object" || o === null) return o;
          if (Array.isArray(o)) return cloneArray(o, clone);
          if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
            return handler(o, clone);
          }
          const o2 = {};
          refs.push(o);
          refsNew.push(o2);
          for (const k in o) {
            if (Object.hasOwnProperty.call(o, k) === false) continue;
            const cur = o[k];
            if (typeof cur !== "object" || cur === null) {
              o2[k] = cur;
            } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
              o2[k] = handler(cur, clone);
            } else if (ArrayBuffer.isView(cur)) {
              o2[k] = copyBuffer(cur);
            } else {
              const i = refs.indexOf(cur);
              if (i !== -1) {
                o2[k] = refsNew[i];
              } else {
                o2[k] = clone(cur);
              }
            }
          }
          refs.pop();
          refsNew.pop();
          return o2;
        }
        function cloneProto(o) {
          if (typeof o !== "object" || o === null) return o;
          if (Array.isArray(o)) return cloneArray(o, cloneProto);
          if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
            return handler(o, cloneProto);
          }
          const o2 = {};
          refs.push(o);
          refsNew.push(o2);
          for (const k in o) {
            const cur = o[k];
            if (typeof cur !== "object" || cur === null) {
              o2[k] = cur;
            } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
              o2[k] = handler(cur, cloneProto);
            } else if (ArrayBuffer.isView(cur)) {
              o2[k] = copyBuffer(cur);
            } else {
              const i = refs.indexOf(cur);
              if (i !== -1) {
                o2[k] = refsNew[i];
              } else {
                o2[k] = cloneProto(cur);
              }
            }
          }
          refs.pop();
          refsNew.pop();
          return o2;
        }
      }
    }
  });

  // node_modules/brackets-memory-db/dist/index.js
  var require_dist2 = __commonJS({
    "node_modules/brackets-memory-db/dist/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.InMemoryDatabase = void 0;
      var rfdc = require_rfdc();
      var clone = rfdc();
      var InMemoryDatabase2 = class {
        constructor() {
          __publicField(this, "data", {
            participant: [],
            stage: [],
            group: [],
            round: [],
            match: [],
            match_game: []
          });
        }
        /**
         * @param data "import" data from external
         */
        setData(data) {
          this.data = data;
        }
        /**
         * @param partial Filter
         */
        makeFilter(partial) {
          return (entry) => {
            let result = true;
            for (const key of Object.keys(partial))
              result = result && entry[key] === partial[key];
            return result;
          };
        }
        /**
         * Clearing all of the data
         */
        reset() {
          this.data = {
            participant: [],
            stage: [],
            group: [],
            round: [],
            match: [],
            match_game: []
          };
        }
        /**
         * Implementation of insert
         *
         * @param table Where to insert.
         * @param values What to insert.
         */
        insert(table, values) {
          const rows = this.getTable(table);
          let id = rows.length > 0 ? Math.max(...rows.map((d) => d.id)) + 1 : 0;
          if (!Array.isArray(values)) {
            try {
              rows.push({ id, ...values });
            } catch (error) {
              return new Promise((resolve) => {
                resolve(-1);
              });
            }
            return new Promise((resolve) => {
              resolve(id);
            });
          }
          try {
            values.map((object) => {
              rows.push({ id: id++, ...object });
            });
          } catch (error) {
            return new Promise((resolve) => {
              resolve(false);
            });
          }
          return new Promise((resolve) => {
            resolve(true);
          });
        }
        /**
         * @param table Where to get from.
         * @param arg Arg.
         */
        select(table, arg) {
          try {
            if (arg === void 0) {
              return new Promise((resolve) => {
                resolve(this.getTable(table).map(clone));
              });
            }
            if (typeof arg === "number") {
              return new Promise((resolve) => {
                const found = this.getTable(table).find((d) => d.id === arg);
                resolve(found ? clone(found) : null);
              });
            }
            return new Promise((resolve) => {
              resolve(this.getTable(table).filter(this.makeFilter(arg)).map(clone));
            });
          } catch (error) {
            return new Promise((resolve) => {
              resolve(null);
            });
          }
        }
        /**
         * Updates data in a table.
         *
         * @param table Where to update.
         * @param arg
         * @param value How to update.
         */
        update(table, arg, value) {
          if (typeof arg === "number") {
            try {
              const index = this.getEntityIndexById(table, arg);
              this.setEntityByIndex(table, index, value);
              return new Promise((resolve) => {
                resolve(true);
              });
            } catch (error) {
              return new Promise((resolve) => {
                resolve(false);
              });
            }
          }
          const values = this.getTable(table).filter(this.makeFilter(arg));
          if (!values) {
            return new Promise((resolve) => {
              resolve(false);
            });
          }
          values.forEach((v) => {
            const index = this.getEntityIndexById(table, v.id);
            const existing = this.getTable(table)[index];
            const updateValue = value;
            for (const key in updateValue) {
              if (this.isObject(existing[key]) && this.isObject(updateValue[key])) {
                Object.assign(existing[key], updateValue[key]);
              } else {
                existing[key] = updateValue[key];
              }
            }
            this.setEntityByIndex(table, index, existing);
          });
          return new Promise((resolve) => {
            resolve(true);
          });
        }
        /**
         * Delete data in a table, based on a filter.
         *
         * @param table Where to delete in.
         * @param filter An object to filter data.
         */
        delete(table, filter) {
          const values = this.data[table];
          if (!values) {
            return new Promise((resolve) => {
              resolve(false);
            });
          }
          if (!filter) {
            this.data[table] = [];
            return new Promise((resolve) => {
              resolve(true);
            });
          }
          const predicate = this.makeFilter(filter);
          const negativeFilter = (value) => !predicate(value);
          this.setTable(table, this.getTable(table).filter(negativeFilter));
          return new Promise((resolve) => {
            resolve(true);
          });
        }
        /**
         * Find the index of a table entity by its id
         *
         * @param table
         * @param id
         * @returns
         */
        getEntityIndexById(table, id) {
          const index = this.getTable(table).findIndex((e) => e.id === id);
          if (index === -1) {
            throw new Error(`Entity in ${table} with id ${id} not found.`);
          }
          return index;
        }
        /**
         * Set a table entity value by its index
         *
         * @param table
         * @param index
         * @param value
         */
        setEntityByIndex(table, index, value) {
          this.getTable(table)[index] = value;
        }
        getTable(table) {
          return this.data[table];
        }
        setTable(table, values) {
          this.data[table] = values;
        }
        isObject(value) {
          return typeof value === "object" && value !== null;
        }
      };
      exports.InMemoryDatabase = InMemoryDatabase2;
    }
  });

  // src/manager.ts
  var import_events = __toESM(require_events());

  // src/base/stage/creator.ts
  var import_brackets_model2 = __toESM(require_dist());

  // src/ordering.ts
  var ordering = {
    "natural": (array) => [...array],
    "reverse": (array) => [...array].reverse(),
    "half_shift": (array) => [...array.slice(array.length / 2), ...array.slice(0, array.length / 2)],
    "reverse_half_shift": (array) => [...array.slice(0, array.length / 2).reverse(), ...array.slice(array.length / 2).reverse()],
    "pair_flip": (array) => {
      const result = [];
      for (let i = 0; i < array.length; i += 2) result.push(array[i + 1], array[i]);
      return result;
    },
    "inner_outer": (array) => {
      if (array.length === 2) return array;
      const participantCount = array.length;
      let positions = [1, 2];
      while (positions.length < participantCount) {
        const size = positions.length * 2;
        const next = [];
        for (const pos of positions)
          next.push(pos, size + 1 - pos);
        positions = next;
      }
      const result = [];
      for (const pos of positions)
        result.push(array[pos - 1]);
      return result;
    },
    "groups.effort_balanced": (array, groupCount) => {
      const result = [];
      let i = 0, j = 0;
      while (result.length < array.length) {
        result.push(array[i]);
        i += groupCount;
        if (i >= array.length) i = ++j;
      }
      return result;
    },
    "groups.seed_optimized": (array, groupCount) => {
      const groups = Array.from({ length: groupCount }, (_) => []);
      const minGroupSize = Math.floor(array.length / groupCount);
      const extraGroups = array.length % groupCount;
      const groupSizes = groups.map((_, group) => minGroupSize + (group < extraGroups ? 1 : 0));
      let index = 0;
      for (let run = 0; index < array.length; run++) {
        const groupOrder = run % 2 === 0 ? groups.map((_, group) => group) : groups.map((_, group) => groupCount - group - 1);
        for (const group of groupOrder) {
          if (index >= array.length) break;
          if (groups[group].length >= groupSizes[group]) continue;
          groups[group].push(array[index]);
          index++;
        }
      }
      return groups.flat();
    },
    "groups.bracket_optimized": (array, groupCount) => {
      if (groupCount < 2)
        return [...array];
      if (groupCount % 2 === 1)
        return ordering["groups.seed_optimized"](array, groupCount);
      const participantCount = array.length;
      const halfGroupCount = groupCount / 2;
      let positions = [1, 2];
      while (positions.length < participantCount) {
        const size = positions.length * 2;
        const next = [];
        for (const pos of positions)
          next.push(pos, size + 1 - pos);
        positions = next;
      }
      const baseGroupForPair = (i) => {
        const t = i % halfGroupCount;
        const r = Math.floor(i / halfGroupCount);
        const inverted = Math.floor(r / 2) % 2 === 1;
        if (r % 2 === 0) {
          return inverted ? halfGroupCount - 1 - t : t;
        }
        return inverted ? halfGroupCount + t : groupCount - 1 - t;
      };
      const groups = Array.from({ length: groupCount }, () => []);
      const pairCount = Math.floor(positions.length / 2);
      for (let i = 0; i < pairCount; i++) {
        const base = baseGroupForPair(i);
        const aIndex = positions[2 * i] - 1;
        if (aIndex < array.length)
          groups[base].push(array[aIndex]);
      }
      for (let i = 0; i < pairCount; i++) {
        const base = baseGroupForPair(i);
        const bIndex = positions[2 * i + 1] - 1;
        if (bIndex < array.length)
          groups[(base + halfGroupCount) % groupCount].push(array[bIndex]);
      }
      const indexByItem = new Map(array.map((v, i) => [v, i]));
      for (const g of groups)
        g.sort((a, b) => indexByItem.get(a) - indexByItem.get(b));
      return groups.flat();
    }
  };
  var defaultMinorOrdering = {
    // 1 or 2: Not possible.
    4: ["natural", "reverse"],
    8: ["natural", "reverse", "natural"],
    16: ["natural", "reverse_half_shift", "reverse", "natural"],
    32: ["natural", "reverse", "half_shift", "natural", "natural"],
    64: ["natural", "reverse", "half_shift", "reverse", "natural", "natural"],
    128: ["natural", "reverse", "half_shift", "pair_flip", "pair_flip", "pair_flip", "natural"]
  };

  // src/helpers.ts
  var helpers_exports = {};
  __export(helpers_exports, {
    assertRoundRobin: () => assertRoundRobin,
    balanceByes: () => balanceByes,
    byeLoser: () => byeLoser,
    byeWinner: () => byeWinner,
    byeWinnerToGrandFinal: () => byeWinnerToGrandFinal,
    convertMatchesToSeeding: () => convertMatchesToSeeding,
    convertSlotsToSeeding: () => convertSlotsToSeeding,
    convertTBDtoBYE: () => convertTBDtoBYE,
    ensureEquallySized: () => ensureEquallySized,
    ensureEvenSized: () => ensureEvenSized,
    ensureNoDuplicates: () => ensureNoDuplicates,
    ensureNotRoundRobin: () => ensureNotRoundRobin,
    ensureNotTied: () => ensureNotTied,
    ensureOrderingSupported: () => ensureOrderingSupported,
    ensureValidSize: () => ensureValidSize,
    extractParticipantsFromSeeding: () => extractParticipantsFromSeeding,
    findLoserMatchNumber: () => findLoserMatchNumber,
    findParticipant: () => findParticipant,
    findPosition: () => findPosition,
    fixSeeding: () => fixSeeding,
    getChildGamesResults: () => getChildGamesResults,
    getDiagonalMatchNumber: () => getDiagonalMatchNumber,
    getFractionOfFinal: () => getFractionOfFinal,
    getGrandFinalDecisiveMatch: () => getGrandFinalDecisiveMatch,
    getInferredResult: () => getInferredResult,
    getLoser: () => getLoser,
    getLoserCountFromWbForLbRound: () => getLoserCountFromWbForLbRound,
    getLoserOrdering: () => getLoserOrdering,
    getLoserRoundMatchCount: () => getLoserRoundMatchCount,
    getLosers: () => getLosers,
    getLowerBracketRoundCount: () => getLowerBracketRoundCount,
    getMatchLocation: () => getMatchLocation,
    getMatchOutcome: () => getMatchOutcome,
    getMatchResult: () => getMatchResult,
    getMatchStatus: () => getMatchStatus,
    getNearestPowerOfTwo: () => getNearestPowerOfTwo,
    getNextSide: () => getNextSide,
    getNextSideConsolationFinalDoubleElimination: () => getNextSideConsolationFinalDoubleElimination,
    getNextSideLoserBracket: () => getNextSideLoserBracket,
    getNonNull: () => getNonNull,
    getOpponentId: () => getOpponentId,
    getOriginPosition: () => getOriginPosition,
    getOtherSide: () => getOtherSide,
    getParentMatchResults: () => getParentMatchResults,
    getRanking: () => getRanking,
    getRoundPairCount: () => getRoundPairCount,
    getSeedCount: () => getSeedCount,
    getSeeds: () => getSeeds,
    getSide: () => getSide,
    getUpdatedMatchResults: () => getUpdatedMatchResults,
    getUpperBracketRoundCount: () => getUpperBracketRoundCount,
    getWinner: () => getWinner,
    handleGivenStatus: () => handleGivenStatus,
    handleOpponentsInversion: () => handleOpponentsInversion,
    hasBye: () => hasBye,
    invertOpponents: () => invertOpponents,
    isDefined: () => isDefined,
    isDoubleEliminationNecessary: () => isDoubleEliminationNecessary,
    isDoubleForfeitCompleted: () => isDoubleForfeitCompleted,
    isFinalGroup: () => isFinalGroup,
    isLoserBracket: () => isLoserBracket,
    isMajorRound: () => isMajorRound,
    isMatchByeCompleted: () => isMatchByeCompleted,
    isMatchCompleted: () => isMatchCompleted,
    isMatchDrawCompleted: () => isMatchDrawCompleted,
    isMatchForfeitCompleted: () => isMatchForfeitCompleted,
    isMatchOngoing: () => isMatchOngoing,
    isMatchParticipantLocked: () => isMatchParticipantLocked,
    isMatchPending: () => isMatchPending,
    isMatchResultCompleted: () => isMatchResultCompleted,
    isMatchStale: () => isMatchStale,
    isMatchStarted: () => isMatchStarted,
    isMatchUpdateLocked: () => isMatchUpdateLocked,
    isMatchWinCompleted: () => isMatchWinCompleted,
    isMinorRound: () => isMinorRound,
    isOrderingSupportedLoserBracket: () => isOrderingSupportedLoserBracket,
    isOrderingSupportedUpperBracket: () => isOrderingSupportedUpperBracket,
    isParticipantInMatch: () => isParticipantInMatch,
    isPowerOfTwo: () => isPowerOfTwo,
    isRoundCompleted: () => isRoundCompleted,
    isRoundRobin: () => isRoundRobin,
    isSeedingWithIds: () => isSeedingWithIds,
    isWinnerBracket: () => isWinnerBracket,
    makeFinalStandings: () => makeFinalStandings,
    makeGroups: () => makeGroups,
    makeNormalizedIdMapping: () => makeNormalizedIdMapping,
    makePairs: () => makePairs,
    makeRoundRobinDistribution: () => makeRoundRobinDistribution,
    makeRoundRobinMatches: () => makeRoundRobinMatches,
    mapParticipantsIdsToDatabase: () => mapParticipantsIdsToDatabase,
    mapParticipantsNamesToDatabase: () => mapParticipantsNamesToDatabase,
    mapParticipantsToDatabase: () => mapParticipantsToDatabase,
    minScoreToWinBestOfX: () => minScoreToWinBestOfX,
    normalizeIds: () => normalizeIds,
    normalizeParticipant: () => normalizeParticipant,
    resetMatchResults: () => resetMatchResults,
    resetNextOpponent: () => resetNextOpponent,
    setArraySize: () => setArraySize,
    setCompleted: () => setCompleted,
    setExtraFields: () => setExtraFields,
    setForfeits: () => setForfeits,
    setMatchResults: () => setMatchResults,
    setNextOpponent: () => setNextOpponent,
    setNextOpponentToBye: () => setNextOpponentToBye,
    setParentMatchCompleted: () => setParentMatchCompleted,
    setResults: () => setResults,
    setScores: () => setScores,
    sortSeeding: () => sortSeeding,
    splitBy: () => splitBy,
    splitByParity: () => splitByParity,
    toResult: () => toResult,
    toResultWithPosition: () => toResultWithPosition,
    transitionToMajor: () => transitionToMajor,
    transitionToMinor: () => transitionToMinor,
    uniqueBy: () => uniqueBy
  });
  var import_brackets_model = __toESM(require_dist());
  function isDefined(value) {
    return value !== null && value !== void 0;
  }
  function splitBy(objects, key) {
    const map = {};
    for (const obj of objects) {
      const commonValue = obj[key];
      if (!map[commonValue])
        map[commonValue] = [];
      map[commonValue].push(obj);
    }
    return Object.values(map);
  }
  function splitByParity(array) {
    return {
      even: array.filter((_, i) => i % 2 === 0),
      odd: array.filter((_, i) => i % 2 === 1)
    };
  }
  function makeRoundRobinMatches(participants, mode = "simple") {
    const distribution = makeRoundRobinDistribution(participants);
    if (mode === "simple")
      return distribution;
    const symmetry = distribution.map(
      (round) => round.map(([opponent1, opponent2]) => [opponent2, opponent1])
    );
    return [...distribution, ...symmetry];
  }
  function makeRoundRobinDistribution(participants) {
    const n = participants.length;
    const n1 = n % 2 === 0 ? n : n + 1;
    const roundCount = n1 - 1;
    const matchPerRound = n1 / 2;
    const rounds = [];
    for (let roundId = 0; roundId < roundCount; roundId++) {
      const matches = [];
      for (let matchId = 0; matchId < matchPerRound; matchId++) {
        if (matchId === 0 && n % 2 === 1) continue;
        const opponentsIds = [
          (roundId - matchId - 1 + n1) % (n1 - 1),
          matchId === 0 ? n1 - 1 : (roundId + matchId) % (n1 - 1)
        ];
        matches.push([
          participants[opponentsIds[0]],
          participants[opponentsIds[1]]
        ]);
      }
      rounds.push(matches);
    }
    return rounds;
  }
  function assertRoundRobin(input, output) {
    const n = input.length;
    const matchPerRound = Math.floor(n / 2);
    const roundCount = n % 2 === 0 ? n - 1 : n;
    if (output.length !== roundCount) throw Error("Round count is wrong");
    if (!output.every((round) => round.length === matchPerRound)) throw Error("Not every round has the good number of matches");
    const checkAllOpponents = Object.fromEntries(input.map((element) => [element, /* @__PURE__ */ new Set()]));
    for (const round of output) {
      const checkUnique = /* @__PURE__ */ new Set();
      for (const match of round) {
        if (match.length !== 2) throw Error("One match is not a pair");
        if (checkUnique.has(match[0])) throw Error("This team is already playing");
        checkUnique.add(match[0]);
        if (checkUnique.has(match[1])) throw Error("This team is already playing");
        checkUnique.add(match[1]);
        if (checkAllOpponents[match[0]].has(match[1])) throw Error("The team has already matched this team");
        checkAllOpponents[match[0]].add(match[1]);
        if (checkAllOpponents[match[1]].has(match[0])) throw Error("The team has already matched this team");
        checkAllOpponents[match[1]].add(match[0]);
      }
    }
  }
  function makeGroups(elements, groupCount) {
    const result = [];
    const minGroupSize = Math.floor(elements.length / groupCount);
    const extraGroups = elements.length % groupCount;
    let cursor = 0;
    for (let i = 0; i < groupCount; i++) {
      const groupSize = minGroupSize + (i < extraGroups ? 1 : 0);
      result.push(elements.slice(cursor, cursor + groupSize));
      cursor += groupSize;
    }
    return result;
  }
  function balanceByes(seeding, participantCount) {
    seeding = seeding.filter((v) => v !== null);
    participantCount = participantCount || getNearestPowerOfTwo(seeding.length);
    if (seeding.length < participantCount / 2) {
      const flat2 = seeding.flatMap((v) => [v, null]);
      return setArraySize(flat2, participantCount, null);
    }
    const nonNullCount = seeding.length;
    const nullCount = participantCount - nonNullCount;
    const againstEachOther = seeding.slice(0, nonNullCount - nullCount).filter((_, i) => i % 2 === 0).map((_, i) => [seeding[2 * i], seeding[2 * i + 1]]);
    const againstNull = seeding.slice(nonNullCount - nullCount, nonNullCount).map((v) => [v, null]);
    const flat = [...againstEachOther.flat(), ...againstNull.flat()];
    return setArraySize(flat, participantCount, null);
  }
  function normalizeIds(data) {
    const mappings = {
      participant: makeNormalizedIdMapping(data.participant),
      stage: makeNormalizedIdMapping(data.stage),
      group: makeNormalizedIdMapping(data.group),
      round: makeNormalizedIdMapping(data.round),
      match: makeNormalizedIdMapping(data.match),
      match_game: makeNormalizedIdMapping(data.match_game)
    };
    return {
      participant: data.participant.map((value) => ({
        ...value,
        id: mappings.participant[value.id]
      })),
      stage: data.stage.map((value) => ({
        ...value,
        id: mappings.stage[value.id]
      })),
      group: data.group.map((value) => ({
        ...value,
        id: mappings.group[value.id],
        stage_id: mappings.stage[value.stage_id]
      })),
      round: data.round.map((value) => ({
        ...value,
        id: mappings.round[value.id],
        stage_id: mappings.stage[value.stage_id],
        group_id: mappings.group[value.group_id]
      })),
      match: data.match.map((value) => ({
        ...value,
        id: mappings.match[value.id],
        stage_id: mappings.stage[value.stage_id],
        group_id: mappings.group[value.group_id],
        round_id: mappings.round[value.round_id],
        opponent1: normalizeParticipant(value.opponent1, mappings.participant),
        opponent2: normalizeParticipant(value.opponent2, mappings.participant)
      })),
      match_game: data.match_game.map((value) => ({
        ...value,
        id: mappings.match_game[value.id],
        stage_id: mappings.stage[value.stage_id],
        parent_id: mappings.match[value.parent_id],
        opponent1: normalizeParticipant(value.opponent1, mappings.participant),
        opponent2: normalizeParticipant(value.opponent2, mappings.participant)
      }))
    };
  }
  function makeNormalizedIdMapping(elements) {
    let currentId = 0;
    return elements.reduce((acc, current) => ({
      ...acc,
      [current.id]: currentId++
    }), {});
  }
  function normalizeParticipant(participant, mapping) {
    if (participant === null) return null;
    return {
      ...participant,
      id: participant.id !== null ? mapping[participant.id] : null
    };
  }
  function setArraySize(array, length, placeholder) {
    return Array.from({ length }, (_, i) => {
      var _a;
      return (_a = array[i]) != null ? _a : placeholder;
    });
  }
  function makePairs(array) {
    return array.map((_, i) => i % 2 === 0 ? [array[i], array[i + 1]] : []).filter((v) => v.length === 2);
  }
  function ensureEvenSized(array) {
    if (array.length % 2 === 1)
      throw Error("Array size must be even.");
  }
  function ensureNoDuplicates(array) {
    const nonNull = getNonNull(array);
    const unique = nonNull.filter((item, index) => {
      const stringifiedItem = JSON.stringify(item);
      return nonNull.findIndex((obj) => JSON.stringify(obj) === stringifiedItem) === index;
    });
    if (unique.length < nonNull.length)
      throw new Error("The seeding has a duplicate participant.");
  }
  function ensureEquallySized(left, right) {
    if (left.length !== right.length)
      throw Error("Arrays' size must be equal.");
  }
  function fixSeeding(seeding, participantCount) {
    if (seeding.length > participantCount)
      throw Error("The seeding has more participants than the size of the stage.");
    if (seeding.length < participantCount)
      return setArraySize(seeding, participantCount, null);
    return seeding;
  }
  function isPowerOfTwo(number) {
    return Number.isInteger(Math.log2(number));
  }
  function ensureValidSize(stageType, participantCount) {
    if (participantCount === 0)
      throw Error("Impossible to create an empty stage. If you want an empty seeding, just set the size of the stage.");
    if (participantCount < 2)
      throw Error("Impossible to create a stage with less than 2 participants.");
    if (stageType === "round_robin") {
      return;
    }
    if (!isPowerOfTwo(participantCount))
      throw Error("The library only supports a participant count which is a power of two.");
  }
  function ensureNotTied(scores) {
    if (scores[0] === scores[1])
      throw Error(`${scores[0]} and ${scores[1]} are tied. It cannot be.`);
  }
  function convertTBDtoBYE(slot) {
    if (slot === null) return null;
    if ((slot == null ? void 0 : slot.id) === null) return null;
    return slot;
  }
  function toResult(slot) {
    return slot && {
      id: slot.id
    };
  }
  function toResultWithPosition(slot) {
    return slot && {
      id: slot.id,
      position: slot.position
    };
  }
  function getWinner(match) {
    const winnerSide = getMatchResult(match);
    if (!winnerSide) return null;
    return match[winnerSide];
  }
  function getLoser(match) {
    const winnerSide = getMatchResult(match);
    if (!winnerSide) return null;
    return match[getOtherSide(winnerSide)];
  }
  function byeWinner(opponents) {
    if (opponents[0] === null && opponents[1] === null)
      return null;
    if (opponents[0] === null && opponents[1] !== null)
      return { id: opponents[1].id };
    if (opponents[0] !== null && opponents[1] === null)
      return { id: opponents[0].id };
    return { id: null };
  }
  function byeWinnerToGrandFinal(opponents) {
    const winner = byeWinner(opponents);
    if (winner) winner.position = 1;
    return winner;
  }
  function byeLoser(opponents, index) {
    if (opponents[0] === null || opponents[1] === null)
      return null;
    return { id: null, position: index + 1 };
  }
  function getMatchResult(match) {
    const outcome = getMatchOutcome(match);
    return outcome === "double_forfeit" ? null : outcome;
  }
  function getMatchOutcome(match) {
    var _a, _b;
    if (!isMatchCompleted(match))
      return null;
    if (isDoubleForfeitCompleted(match))
      return "double_forfeit";
    if (isMatchDrawCompleted(match))
      return null;
    if (match.opponent1 === null && match.opponent2 === null)
      return null;
    let winner = null;
    if (((_a = match.opponent1) == null ? void 0 : _a.result) === "win" || match.opponent2 === null || match.opponent2.forfeit)
      winner = "opponent1";
    if (((_b = match.opponent2) == null ? void 0 : _b.result) === "win" || match.opponent1 === null || match.opponent1.forfeit) {
      if (winner !== null) throw Error("There are two winners.");
      winner = "opponent2";
    }
    return winner;
  }
  function findPosition(matches, position) {
    var _a, _b;
    for (const match of matches) {
      if (((_a = match.opponent1) == null ? void 0 : _a.position) === position)
        return match.opponent1;
      if (((_b = match.opponent2) == null ? void 0 : _b.position) === position)
        return match.opponent2;
    }
    return null;
  }
  function isParticipantInMatch(match, participantId) {
    return [match.opponent1, match.opponent2].some((m) => (m == null ? void 0 : m.id) === participantId);
  }
  function getSide(matchNumber) {
    return matchNumber % 2 === 1 ? "opponent1" : "opponent2";
  }
  function getOtherSide(side) {
    return side === "opponent1" ? "opponent2" : "opponent1";
  }
  function isMatchPending(match) {
    var _a, _b;
    return !((_a = match.opponent1) == null ? void 0 : _a.id) || !((_b = match.opponent2) == null ? void 0 : _b.id);
  }
  function isMatchStarted(match) {
    var _a, _b;
    return ((_a = match.opponent1) == null ? void 0 : _a.score) !== void 0 || ((_b = match.opponent2) == null ? void 0 : _b.score) !== void 0;
  }
  function isMatchCompleted(match) {
    return isMatchByeCompleted(match) || isMatchForfeitCompleted(match) || isMatchResultCompleted(match);
  }
  function isMatchOngoing(match) {
    return [import_brackets_model.Status.Ready, import_brackets_model.Status.Running].includes(match.status);
  }
  function isMatchStale(match) {
    return match.status >= import_brackets_model.Status.Completed || isMatchByeCompleted(match);
  }
  function isMatchForfeitCompleted(match) {
    var _a, _b;
    return ((_a = match.opponent1) == null ? void 0 : _a.forfeit) !== void 0 || ((_b = match.opponent2) == null ? void 0 : _b.forfeit) !== void 0;
  }
  function isDoubleForfeitCompleted(match) {
    var _a, _b;
    return ((_a = match.opponent1) == null ? void 0 : _a.forfeit) === true && ((_b = match.opponent2) == null ? void 0 : _b.forfeit) === true;
  }
  function isMatchResultCompleted(match) {
    return isMatchDrawCompleted(match) || isMatchWinCompleted(match);
  }
  function isMatchDrawCompleted(match) {
    var _a, _b;
    return ((_a = match.opponent1) == null ? void 0 : _a.result) === "draw" && ((_b = match.opponent2) == null ? void 0 : _b.result) === "draw";
  }
  function isMatchWinCompleted(match) {
    var _a, _b, _c, _d;
    return ((_a = match.opponent1) == null ? void 0 : _a.result) === "win" || ((_b = match.opponent2) == null ? void 0 : _b.result) === "win" || ((_c = match.opponent1) == null ? void 0 : _c.result) === "loss" || ((_d = match.opponent2) == null ? void 0 : _d.result) === "loss";
  }
  function isMatchByeCompleted(match) {
    var _a, _b;
    return match.opponent1 === null && ((_a = match.opponent2) == null ? void 0 : _a.id) !== null || match.opponent2 === null && ((_b = match.opponent1) == null ? void 0 : _b.id) !== null || match.opponent1 === null && match.opponent2 === null;
  }
  function isMatchUpdateLocked(match) {
    return match.status === import_brackets_model.Status.Locked || match.status === import_brackets_model.Status.Waiting || match.status === import_brackets_model.Status.Archived || match.status === import_brackets_model.Status.GameCancelled || isMatchByeCompleted(match);
  }
  function isMatchParticipantLocked(match) {
    return match.status >= import_brackets_model.Status.Running;
  }
  function hasBye(match) {
    return match.opponent1 === null || match.opponent2 === null;
  }
  function getMatchStatus(arg) {
    var _a, _b, _c, _d;
    const match = Array.isArray(arg) ? {
      opponent1: arg[0],
      opponent2: arg[1]
    } : arg;
    if (hasBye(match))
      return import_brackets_model.Status.Locked;
    if (((_a = match.opponent1) == null ? void 0 : _a.id) === null && ((_b = match.opponent2) == null ? void 0 : _b.id) === null)
      return import_brackets_model.Status.Locked;
    if (((_c = match.opponent1) == null ? void 0 : _c.id) === null || ((_d = match.opponent2) == null ? void 0 : _d.id) === null)
      return import_brackets_model.Status.Waiting;
    if (isMatchCompleted(match))
      return import_brackets_model.Status.Completed;
    if (isMatchStarted(match))
      return import_brackets_model.Status.Running;
    return import_brackets_model.Status.Ready;
  }
  function setMatchResults(stored, match, inRoundRobin) {
    var _a, _b;
    handleGivenStatus(stored, match);
    if (!inRoundRobin && (((_a = match.opponent1) == null ? void 0 : _a.result) === "draw" || ((_b = match.opponent2) == null ? void 0 : _b.result) === "draw"))
      throw Error("Having a draw is forbidden in an elimination tournament.");
    const completed = isMatchCompleted(match);
    const currentlyCompleted = isMatchCompleted(stored);
    setExtraFields(stored, match);
    handleOpponentsInversion(stored, match);
    const statusChanged = setScores(stored, match);
    if (completed && currentlyCompleted) {
      setCompleted(stored, match);
      return { statusChanged: false, resultChanged: true };
    }
    if (completed && !currentlyCompleted) {
      setCompleted(stored, match);
      return { statusChanged: true, resultChanged: true };
    }
    if (!completed && currentlyCompleted) {
      resetMatchResults(stored);
      return { statusChanged: true, resultChanged: true };
    }
    return { statusChanged, resultChanged: false };
  }
  function resetMatchResults(stored) {
    if (stored.opponent1) {
      stored.opponent1.forfeit = void 0;
      stored.opponent1.result = void 0;
    }
    if (stored.opponent2) {
      stored.opponent2.forfeit = void 0;
      stored.opponent2.result = void 0;
    }
    stored.status = getMatchStatus(stored);
  }
  function setExtraFields(stored, match) {
    const partialAssign = (target, update, ignoredKeys2) => {
      if (!target || !update)
        return;
      const retainedKeys = Object.keys(update).filter(
        (key) => !ignoredKeys2.includes(key)
      );
      retainedKeys.forEach((key) => {
        target[key] = update[key];
      });
    };
    const ignoredKeys = [
      "id",
      "number",
      "stage_id",
      "group_id",
      "round_id",
      "status",
      "opponent1",
      "opponent2",
      "child_count",
      "parent_id"
    ];
    const ignoredOpponentKeys = [
      "id",
      "score",
      "position",
      "forfeit",
      "result"
    ];
    partialAssign(stored, match, ignoredKeys);
    partialAssign(stored.opponent1, match.opponent1, ignoredOpponentKeys);
    partialAssign(stored.opponent2, match.opponent2, ignoredOpponentKeys);
  }
  function getOpponentId(match, side) {
    const opponent = match[side];
    return opponent && opponent.id;
  }
  function getOriginPosition(match, side) {
    var _a;
    const matchNumber = (_a = match[side]) == null ? void 0 : _a.position;
    if (matchNumber === void 0)
      throw Error("Position is undefined.");
    return matchNumber;
  }
  function getLosers(participants, matches) {
    const losers = [];
    let currentRound = null;
    let roundIndex = -1;
    for (const match of matches) {
      if (match.round_id !== currentRound) {
        currentRound = match.round_id;
        roundIndex++;
        losers[roundIndex] = [];
      }
      const loser = getLoser(match);
      if (loser === null)
        continue;
      losers[roundIndex].push(findParticipant(participants, loser));
    }
    return losers;
  }
  function makeFinalStandings(grouped) {
    const standings = [];
    let rank = 1;
    for (const group of grouped) {
      for (const participant of group) {
        standings.push({
          id: participant.id,
          name: participant.name,
          rank
        });
      }
      rank++;
    }
    return standings;
  }
  function getGrandFinalDecisiveMatch(type, matches) {
    if (type === "simple")
      return matches[0];
    if (type === "double") {
      const result = getMatchResult(matches[0]);
      if (result === "opponent2")
        return matches[1];
      return matches[0];
    }
    throw Error("The Grand Final is disabled.");
  }
  function findParticipant(participants, slot) {
    if (!slot) throw Error("Cannot find a BYE participant.");
    const participant = participants.find((participant2) => participant2.id === (slot == null ? void 0 : slot.id));
    if (!participant) throw Error("Participant not found.");
    return participant;
  }
  function getNextSide(matchNumber, roundNumber, roundCount, matchLocation) {
    if (matchLocation === "loser_bracket" && roundNumber % 2 === 1)
      return "opponent2";
    if (matchLocation === "loser_bracket" && roundNumber === roundCount)
      return "opponent2";
    return getSide(matchNumber);
  }
  function getNextSideLoserBracket(matchNumber, nextMatch, roundNumber) {
    var _a;
    if (roundNumber > 1)
      return "opponent1";
    if (((_a = nextMatch.opponent1) == null ? void 0 : _a.position) === matchNumber)
      return "opponent1";
    return "opponent2";
  }
  function getNextSideConsolationFinalDoubleElimination(roundNumber) {
    return isMajorRound(roundNumber) ? "opponent1" : "opponent2";
  }
  function setNextOpponent(nextMatch, nextSide, match, currentSide) {
    var _a;
    nextMatch[nextSide] = match[currentSide] && {
      // Keep BYE.
      id: getOpponentId(match, currentSide),
      // This implementation of SetNextOpponent always has those arguments.
      position: (_a = nextMatch[nextSide]) == null ? void 0 : _a.position
      // Keep position.
    };
    nextMatch.status = getMatchStatus(nextMatch);
  }
  function setNextOpponentToBye(nextMatch, nextSide) {
    nextMatch[nextSide] = null;
    nextMatch.status = getMatchStatus(nextMatch);
  }
  function resetNextOpponent(nextMatch, nextSide) {
    var _a;
    nextMatch[nextSide] = nextMatch[nextSide] && {
      // Keep BYE.
      id: null,
      position: (_a = nextMatch[nextSide]) == null ? void 0 : _a.position
      // Keep position.
    };
    nextMatch.status = import_brackets_model.Status.Locked;
  }
  function handleOpponentsInversion(stored, match) {
    var _a, _b, _c, _d;
    const id1 = (_a = match.opponent1) == null ? void 0 : _a.id;
    const id2 = (_b = match.opponent2) == null ? void 0 : _b.id;
    const storedId1 = (_c = stored.opponent1) == null ? void 0 : _c.id;
    const storedId2 = (_d = stored.opponent2) == null ? void 0 : _d.id;
    if (isDefined(id1) && id1 !== storedId1 && id1 !== storedId2)
      throw Error("The given opponent1 ID does not exist in this match.");
    if (isDefined(id2) && id2 !== storedId1 && id2 !== storedId2)
      throw Error("The given opponent2 ID does not exist in this match.");
    if (isDefined(id1) && id1 === storedId2 || isDefined(id2) && id2 === storedId1)
      invertOpponents(match);
  }
  function handleGivenStatus(stored, match) {
    var _a, _b, _c, _d;
    if (match.status === import_brackets_model.Status.Running) {
      (_a = stored.opponent1) == null ? true : delete _a.result;
      (_b = stored.opponent2) == null ? true : delete _b.result;
      stored.status = import_brackets_model.Status.Running;
    } else if (match.status === import_brackets_model.Status.Completed) {
      if (((_c = match.opponent1) == null ? void 0 : _c.score) === void 0 || ((_d = match.opponent2) == null ? void 0 : _d.score) === void 0)
        return;
      if (match.opponent1.score > match.opponent2.score)
        match.opponent1.result = "win";
      else if (match.opponent2.score > match.opponent1.score)
        match.opponent2.result = "win";
      else {
        match.opponent1.result = "draw";
        match.opponent2.result = "draw";
      }
      stored.status = import_brackets_model.Status.Completed;
    }
  }
  function invertOpponents(match) {
    [match.opponent1, match.opponent2] = [match.opponent2, match.opponent1];
  }
  function setScores(stored, match) {
    var _a, _b, _c, _d;
    if (((_a = match.opponent1) == null ? void 0 : _a.score) === ((_b = stored.opponent1) == null ? void 0 : _b.score) && ((_c = match.opponent2) == null ? void 0 : _c.score) === ((_d = stored.opponent2) == null ? void 0 : _d.score))
      return false;
    const oldStatus = stored.status;
    stored.status = import_brackets_model.Status.Running;
    if (match.opponent1 && stored.opponent1)
      stored.opponent1.score = match.opponent1.score;
    if (match.opponent2 && stored.opponent2)
      stored.opponent2.score = match.opponent2.score;
    return stored.status !== oldStatus;
  }
  function getInferredResult(opponent1, opponent2) {
    if (opponent1 && !opponent2)
      return { opponent1: { ...opponent1, result: "win" }, opponent2: null };
    if (!opponent1 && opponent2)
      return { opponent1: null, opponent2: { ...opponent2, result: "win" } };
    return { opponent1, opponent2 };
  }
  function setCompleted(stored, match) {
    stored.status = import_brackets_model.Status.Completed;
    setResults(stored, match, "win", "loss");
    setResults(stored, match, "loss", "win");
    setResults(stored, match, "draw", "draw");
    const { opponent1, opponent2 } = getInferredResult(stored.opponent1, stored.opponent2);
    stored.opponent1 = opponent1;
    stored.opponent2 = opponent2;
    setForfeits(stored, match);
  }
  function setResults(stored, match, check, change) {
    var _a, _b;
    if (match.opponent1 && match.opponent2) {
      if (match.opponent1.result === "win" && match.opponent2.result === "win")
        throw Error("There are two winners.");
      if (match.opponent1.result === "loss" && match.opponent2.result === "loss")
        throw Error("There are two losers.");
    }
    if (((_a = match.opponent1) == null ? void 0 : _a.result) === check) {
      if (stored.opponent1) stored.opponent1.result = check;
      else stored.opponent1 = { id: null, result: check };
      if (stored.opponent2) stored.opponent2.result = change;
      else stored.opponent2 = { id: null, result: change };
    }
    if (((_b = match.opponent2) == null ? void 0 : _b.result) === check) {
      if (stored.opponent2) stored.opponent2.result = check;
      else stored.opponent2 = { id: null, result: check };
      if (stored.opponent1) stored.opponent1.result = change;
      else stored.opponent1 = { id: null, result: change };
    }
  }
  function setForfeits(stored, match) {
    var _a, _b, _c, _d, _e, _f;
    const opponent1Forfeits = ((_a = match.opponent1) == null ? void 0 : _a.forfeit) === true || ((_b = stored.opponent1) == null ? void 0 : _b.forfeit) === true;
    const opponent2Forfeits = ((_c = match.opponent2) == null ? void 0 : _c.forfeit) === true || ((_d = stored.opponent2) == null ? void 0 : _d.forfeit) === true;
    const doubleForfeit = opponent1Forfeits && opponent2Forfeits;
    const forfeit = (side) => {
      const opponent = stored[side];
      if (!opponent)
        return;
      delete opponent.result;
      opponent.forfeit = true;
    };
    if (doubleForfeit) {
      forfeit("opponent1");
      forfeit("opponent2");
      return;
    }
    const winDueToForfeit = (side) => {
      const opponent = stored[side];
      if (!opponent) {
        stored[side] = { id: null, result: "win" };
        return;
      }
      delete opponent.forfeit;
      opponent.result = "win";
    };
    if (((_e = match.opponent1) == null ? void 0 : _e.forfeit) === true) {
      forfeit("opponent1");
      winDueToForfeit("opponent2");
    }
    if (((_f = match.opponent2) == null ? void 0 : _f.forfeit) === true) {
      forfeit("opponent2");
      winDueToForfeit("opponent1");
    }
  }
  function isSeedingWithIds(seeding) {
    return seeding.some((value) => typeof value === "number");
  }
  function extractParticipantsFromSeeding(tournamentId, seeding) {
    const withoutByes = seeding.filter((name) => name !== null);
    const participants = withoutByes.map((item) => {
      if (typeof item === "string") {
        return {
          tournament_id: tournamentId,
          name: item
        };
      }
      return {
        ...item,
        tournament_id: tournamentId,
        name: item.name
      };
    });
    return participants;
  }
  function mapParticipantsNamesToDatabase(seeding, database, positions) {
    return mapParticipantsToDatabase("name", seeding, database, positions);
  }
  function mapParticipantsIdsToDatabase(seeding, database, positions) {
    return mapParticipantsToDatabase("id", seeding, database, positions);
  }
  function mapParticipantsToDatabase(prop, seeding, database, positions) {
    const slots = seeding.map((slot, i) => {
      if (slot === null) return null;
      const found = database.find(
        (participant) => typeof slot === "object" ? participant[prop] === slot[prop] : participant[prop] === slot
      );
      if (!found)
        throw Error(`Participant ${prop} not found in database.`);
      return { id: found.id, position: i + 1 };
    });
    if (!positions)
      return slots;
    return positions.map((position) => position === null ? null : slots[position - 1]);
  }
  function convertMatchesToSeeding(matches) {
    const flattened = [].concat(...matches.map((match) => [match.opponent1, match.opponent2]));
    return sortSeeding(flattened);
  }
  function convertSlotsToSeeding(slots) {
    return slots.map((slot) => {
      if (slot === null || slot.id === null) return null;
      return slot.id;
    });
  }
  function sortSeeding(slots) {
    const positionedSlots = slots.filter((v) => v !== null && (v.id !== null || v.position !== void 0));
    positionedSlots.sort((a, b) => a.position - b.position);
    if (positionedSlots.length === slots.length)
      return positionedSlots;
    const placed = Object.fromEntries(positionedSlots.map((v) => [v.position - 1, v]));
    const sorted = Array.from({ length: slots.length }, (_, i) => placed[i] || null);
    return sorted;
  }
  function getNonNull(array) {
    const nonNull = array.filter((element) => element !== null);
    return nonNull;
  }
  function uniqueBy(array, key) {
    const seen = /* @__PURE__ */ new Set();
    return array.filter((item) => {
      const value = key(item);
      if (!value) return true;
      if (seen.has(value)) return false;
      seen.add(value);
      return true;
    });
  }
  function isMajorRound(roundNumber) {
    return roundNumber % 2 === 1;
  }
  function isMinorRound(roundNumber) {
    return !isMajorRound(roundNumber);
  }
  function transitionToMajor(previousDuels) {
    const currentDuelCount = previousDuels.length / 2;
    const currentDuels = [];
    for (let duelIndex = 0; duelIndex < currentDuelCount; duelIndex++) {
      const prevDuelId = duelIndex * 2;
      currentDuels.push([
        byeWinner(previousDuels[prevDuelId]),
        byeWinner(previousDuels[prevDuelId + 1])
      ]);
    }
    return currentDuels;
  }
  function transitionToMinor(previousDuels, losers, method) {
    const orderedLosers = method ? ordering[method](losers) : losers;
    const currentDuelCount = previousDuels.length;
    const currentDuels = [];
    for (let duelIndex = 0; duelIndex < currentDuelCount; duelIndex++) {
      const prevDuelId = duelIndex;
      currentDuels.push([
        orderedLosers[prevDuelId],
        byeWinner(previousDuels[prevDuelId])
      ]);
    }
    return currentDuels;
  }
  function setParentMatchCompleted(parent, childResults, childCount, inRoundRobin) {
    var _a, _b;
    if (((_a = parent.opponent1) == null ? void 0 : _a.score) === void 0 || ((_b = parent.opponent2) == null ? void 0 : _b.score) === void 0)
      throw Error("Either opponent1, opponent2 or their scores are falsy.");
    const minToWin = minScoreToWinBestOfX(childCount);
    const minToWinWithCancellations = Math.max(1, minToWin - childResults.spent);
    if (childResults.doubleForfeit || childResults.spent >= minToWin) {
      parent.opponent1.forfeit = true;
      parent.opponent2.forfeit = true;
      return;
    }
    if (parent.opponent1.score >= minToWinWithCancellations && parent.opponent2.score >= minToWinWithCancellations) {
      if (inRoundRobin) {
        parent.opponent1.result = "draw";
        parent.opponent2.result = "draw";
        return;
      }
      if (childResults.spent > 0) {
        parent.opponent1.forfeit = true;
        parent.opponent2.forfeit = true;
        return;
      }
      throw Error("Match games result in a tie for the parent match.");
    }
    if (parent.opponent1.score >= minToWinWithCancellations) {
      parent.opponent1.result = "win";
      return;
    }
    if (parent.opponent2.score >= minToWinWithCancellations) {
      parent.opponent2.result = "win";
      return;
    }
    if (parent.opponent1.score === parent.opponent2.score && parent.opponent1.score + parent.opponent2.score + childResults.spent > childCount - 1) {
      if (inRoundRobin) {
        parent.opponent1.result = "draw";
        parent.opponent2.result = "draw";
        return;
      }
      if (childResults.spent > 0) {
        parent.opponent1.forfeit = true;
        parent.opponent2.forfeit = true;
        return;
      }
      throw Error("Match games result in a tie for the parent match.");
    }
  }
  function getParentMatchResults(storedParent, scores) {
    return {
      opponent1: {
        id: storedParent.opponent1 && storedParent.opponent1.id,
        score: scores.opponent1
      },
      opponent2: {
        id: storedParent.opponent2 && storedParent.opponent2.id,
        score: scores.opponent2
      }
    };
  }
  function getUpdatedMatchResults(match, existing, enableByes) {
    const mergeOpponent = (currentOpponent, existingOpponent) => {
      if (currentOpponent === null)
        return enableByes ? null : { id: null };
      if (hasBye(existing))
        return currentOpponent;
      return { ...existingOpponent, ...currentOpponent };
    };
    return {
      ...existing,
      ...match,
      opponent1: mergeOpponent(match.opponent1, existing.opponent1),
      opponent2: mergeOpponent(match.opponent2, existing.opponent2)
    };
  }
  function getChildGamesResults(games) {
    const scores = {
      opponent1: 0,
      opponent2: 0,
      spent: 0,
      doubleForfeit: false
    };
    for (const game of games) {
      if (game.status === import_brackets_model.Status.GameCancelled) {
        if (isDoubleForfeitCompleted(game))
          scores.doubleForfeit = true;
        else
          scores.spent++;
        continue;
      }
      const result = getMatchResult(game);
      if (result === "opponent1") scores.opponent1++;
      else if (result === "opponent2") scores.opponent2++;
    }
    return scores;
  }
  function getSeeds(inLoserBracket, roundNumber, roundCountLB, matchCount) {
    const seedCount = getSeedCount(inLoserBracket, roundNumber, roundCountLB, matchCount);
    return Array.from({ length: seedCount }, (_, i) => i + 1);
  }
  function getSeedCount(inLoserBracket, roundNumber, roundCountLB, matchCount) {
    ensureOrderingSupported(inLoserBracket, roundNumber, roundCountLB);
    return roundNumber === 1 ? matchCount * 2 : (
      // Two per match for upper or lower bracket round 1.
      matchCount
    );
  }
  function ensureOrderingSupported(inLoserBracket, roundNumber, roundCountLB) {
    if (inLoserBracket && !isOrderingSupportedLoserBracket(roundNumber, roundCountLB))
      throw Error("This round does not support ordering.");
    if (!inLoserBracket && !isOrderingSupportedUpperBracket(roundNumber))
      throw Error("This round does not support ordering.");
  }
  function isOrderingSupportedUpperBracket(roundNumber) {
    return roundNumber === 1;
  }
  function isOrderingSupportedLoserBracket(roundNumber, roundCount) {
    return roundNumber === 1 || isMinorRound(roundNumber) && roundNumber < roundCount;
  }
  function getUpperBracketRoundCount(participantCount) {
    return Math.log2(participantCount);
  }
  function getRoundPairCount(participantCount) {
    return getUpperBracketRoundCount(participantCount) - 1;
  }
  function isDoubleEliminationNecessary(participantCount) {
    return participantCount > 2;
  }
  function findLoserMatchNumber(participantCount, roundNumber, matchNumber, method) {
    const loserCount = getLoserCountFromWbForLbRound(participantCount, roundNumber);
    const losers = Array.from({ length: loserCount }, (_, i) => i + 1);
    const ordered = method ? ordering[method](losers) : losers;
    const matchNumberLB = ordered.indexOf(matchNumber) + 1;
    if (roundNumber === 1)
      return Math.ceil(matchNumberLB / 2);
    return matchNumberLB;
  }
  function getLoserRoundMatchCount(participantCount, roundNumber) {
    const roundPairIndex = Math.ceil(roundNumber / 2) - 1;
    const roundPairCount = getRoundPairCount(participantCount);
    const matchCount = Math.pow(2, roundPairCount - roundPairIndex - 1);
    if (roundNumber === 0)
      throw Error("Round number must start at 1.");
    if (matchCount < 1)
      throw Error(`Round number ${roundNumber} is too big for a loser bracket in a stage of ${participantCount} participants.`);
    return matchCount;
  }
  function getLoserCountFromWbForLbRound(participantCount, roundNumber) {
    const matchCount = getLoserRoundMatchCount(participantCount, roundNumber);
    if (roundNumber === 1)
      return matchCount * 2;
    return matchCount;
  }
  function getLoserOrdering(seedOrdering, roundNumber) {
    const orderingIndex = 1 + Math.floor(roundNumber / 2);
    return seedOrdering[orderingIndex];
  }
  function getLowerBracketRoundCount(participantCount) {
    const roundPairCount = getRoundPairCount(participantCount);
    return roundPairCount * 2;
  }
  function getDiagonalMatchNumber(matchNumber) {
    return Math.ceil(matchNumber / 2);
  }
  function getNearestPowerOfTwo(input) {
    return Math.pow(2, Math.ceil(Math.log2(input)));
  }
  function minScoreToWinBestOfX(x) {
    return (x + 1) / 2;
  }
  function isRoundRobin(stage) {
    return stage.type === "round_robin";
  }
  function ensureNotRoundRobin(stage) {
    const inRoundRobin = isRoundRobin(stage);
    if (inRoundRobin) throw Error("Impossible to update ordering in a round-robin stage.");
  }
  function isRoundCompleted(roundMatches) {
    return roundMatches.every((match) => match.status >= import_brackets_model.Status.Completed);
  }
  function isWinnerBracket(stageType, groupNumber) {
    return stageType === "double_elimination" && groupNumber === 1;
  }
  function isLoserBracket(stageType, groupNumber) {
    return stageType === "double_elimination" && groupNumber === 2;
  }
  function isFinalGroup(stageType, groupNumber) {
    return stageType === "single_elimination" && groupNumber === 2 || stageType === "double_elimination" && groupNumber === 3;
  }
  function getMatchLocation(stageType, groupNumber) {
    if (isWinnerBracket(stageType, groupNumber))
      return "winner_bracket";
    if (isLoserBracket(stageType, groupNumber))
      return "loser_bracket";
    if (isFinalGroup(stageType, groupNumber))
      return "final_group";
    return "single_bracket";
  }
  function getFractionOfFinal(roundNumber, roundCount) {
    if (roundNumber > roundCount)
      throw Error(`There are more rounds than possible. ${JSON.stringify({ roundNumber, roundCount })}`);
    const denominator = Math.pow(2, roundCount - roundNumber);
    return 1 / denominator;
  }
  function getRanking(matches, formula) {
    const rankingMap = {};
    for (const match of matches) {
      updateRankingMap(rankingMap, formula, match.opponent1, match.opponent2);
      updateRankingMap(rankingMap, formula, match.opponent2, match.opponent1);
    }
    return createRanking(rankingMap);
  }
  function updateRankingMap(rankingMap, formula, current, opponent) {
    if (!current || current.id === null) return;
    const item = rankingMap[current.id] || {
      rank: 0,
      id: 0,
      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      forfeits: 0,
      scoreFor: 0,
      scoreAgainst: 0,
      scoreDifference: 0,
      points: 0
    };
    item.id = current.id;
    if (current.forfeit || current.result)
      item.played++;
    if (current.result === "win")
      item.wins++;
    if (current.result === "draw")
      item.draws++;
    if (current.result === "loss")
      item.losses++;
    if (current.forfeit)
      item.forfeits++;
    item.scoreFor += current.score || 0;
    item.scoreAgainst += opponent && opponent.score || 0;
    item.scoreDifference = item.scoreFor - item.scoreAgainst;
    item.points = formula(item);
    rankingMap[current.id] = item;
  }
  function createRanking(rankingMap) {
    const ranking = Object.values(rankingMap).sort((a, b) => a.points !== b.points ? b.points - a.points : a.played !== b.played ? b.played - a.played : b.scoreDifference - a.scoreDifference);
    const rank = {
      value: 0,
      lastPoints: -1
    };
    for (const item of ranking) {
      item.rank = rank.lastPoints !== item.points ? ++rank.value : rank.value;
      rank.lastPoints = item.points;
    }
    return ranking;
  }

  // src/base/stage/creator.ts
  var StageCreator = class {
    /**
     * Creates an instance of StageCreator, which will handle the creation of the stage.
     *
     * @param storage The implementation of Storage.
     * @param stage The stage to create.
     */
    constructor(storage, stage) {
      this.storage = storage;
      this.stage = stage;
      this.stage.settings = this.stage.settings || {};
      this.seedOrdering = [...this.stage.settings.seedOrdering || []];
      this.updateMode = false;
      this.enableByesInUpdate = false;
      if (!this.stage.name)
        throw Error("You must provide a name for the stage.");
      if (this.stage.tournamentId === void 0)
        throw Error("You must provide a tournament id for the stage.");
      if (stage.type === "round_robin")
        this.stage.settings.roundRobinMode = this.stage.settings.roundRobinMode || "simple";
      if (stage.type === "single_elimination")
        this.stage.settings.consolationFinal = this.stage.settings.consolationFinal || false;
      if (stage.type === "double_elimination")
        this.stage.settings.grandFinal = this.stage.settings.grandFinal || "none";
      this.stage.settings.matchesChildCount = this.stage.settings.matchesChildCount || 0;
    }
    /**
     * Run the creation process.
     */
    async run() {
      let stage;
      switch (this.stage.type) {
        case "round_robin":
          stage = await this.roundRobin();
          break;
        case "single_elimination":
          stage = await this.singleElimination();
          break;
        case "double_elimination":
          stage = await this.doubleElimination();
          break;
        default:
          throw Error("Unknown stage type.");
      }
      if (stage.id === -1)
        throw Error("Something went wrong when creating the stage.");
      await this.ensureSeedOrdering(stage.id);
      return stage;
    }
    /**
     * Enables the update mode.
     * 
     * @param stageId ID of the stage.
     * @param enableByes Whether to use BYEs or TBDs for `null` values in an input seeding. Set to `true` when `confirmSeeding()` is called.
     */
    setExisting(stageId, enableByes) {
      this.updateMode = true;
      this.currentStageId = stageId;
      this.enableByesInUpdate = enableByes;
    }
    /**
     * Creates a round-robin stage.
     *
     * Group count must be given. It will distribute participants in groups and rounds.
     */
    async roundRobin() {
      const groups = await this.getRoundRobinGroups();
      const stage = await this.createStage();
      for (let i = 0; i < groups.length; i++)
        await this.createRoundRobinGroup(stage.id, i + 1, groups[i]);
      return stage;
    }
    /**
     * Creates a single elimination stage.
     *
     * One bracket and optionally a consolation final between semi-final losers.
     */
    async singleElimination() {
      var _a, _b, _c, _d;
      if (!((_a = this.stage.settings) == null ? void 0 : _a.manualOrdering) && Array.isArray((_b = this.stage.settings) == null ? void 0 : _b.seedOrdering) && ((_c = this.stage.settings) == null ? void 0 : _c.seedOrdering.length) !== 1) throw Error("You must specify one seed ordering method.");
      let ordered;
      if ((_d = this.stage.settings) == null ? void 0 : _d.manualOrdering) {
        if (this.stage.settings.manualOrdering.length !== 1)
          throw Error("Manual ordering for an elimination stage must have exactly one group.");
        ordered = await this.getSlots(this.stage.settings.manualOrdering[0]);
      } else {
        const slots = await this.getSlots();
        const method = this.getStandardBracketFirstRoundOrdering();
        ordered = ordering[method](slots);
      }
      const stage = await this.createStage();
      const { losers } = await this.createStandardBracket(stage.id, 1, ordered);
      await this.createConsolationFinal(stage.id, losers);
      return stage;
    }
    /**
     * Creates a double elimination stage.
     *
     * One upper bracket (winner bracket, WB), one lower bracket (loser bracket, LB) and optionally a grand final
     * between the winner of both bracket, which can be simple or double.
     */
    async doubleElimination() {
      var _a, _b, _c;
      if (!((_a = this.stage.settings) == null ? void 0 : _a.manualOrdering) && this.stage.settings && Array.isArray(this.stage.settings.seedOrdering) && this.stage.settings.seedOrdering.length < 1) throw Error("You must specify at least one seed ordering method.");
      let ordered;
      if ((_b = this.stage.settings) == null ? void 0 : _b.manualOrdering) {
        if (this.stage.settings.manualOrdering.length !== 1)
          throw Error("Manual ordering for an elimination stage must have exactly one group.");
        ordered = await this.getSlots(this.stage.settings.manualOrdering[0]);
      } else {
        const slots = await this.getSlots();
        const method = this.getStandardBracketFirstRoundOrdering();
        ordered = ordering[method](slots);
      }
      const stage = await this.createStage();
      if ((_c = this.stage.settings) == null ? void 0 : _c.skipFirstRound)
        await this.createDoubleEliminationSkipFirstRound(stage.id, ordered);
      else
        await this.createDoubleElimination(stage.id, ordered);
      return stage;
    }
    /**
     * Creates a double elimination stage with skip first round option.
     *
     * @param stageId ID of the stage.
     * @param slots A list of slots.
     */
    async createDoubleEliminationSkipFirstRound(stageId, slots) {
      var _a;
      const { even: directInWb, odd: directInLb } = splitByParity(slots);
      const { losers: losersWb, winner: winnerWb } = await this.createStandardBracket(stageId, 1, directInWb);
      if (isDoubleEliminationNecessary((_a = this.stage.settings) == null ? void 0 : _a.size)) {
        const winnerLb = await this.createLowerBracket(stageId, 2, [directInLb, ...losersWb]);
        await this.createGrandFinal(stageId, winnerWb, winnerLb);
      }
    }
    /**
     * Creates a double elimination stage.
     *
     * @param stageId ID of the stage.
     * @param slots A list of slots.
     */
    async createDoubleElimination(stageId, slots) {
      var _a;
      const { losers: losersWb, winner: winnerWb } = await this.createStandardBracket(stageId, 1, slots);
      if (isDoubleEliminationNecessary((_a = this.stage.settings) == null ? void 0 : _a.size)) {
        const winnerLb = await this.createLowerBracket(stageId, 2, losersWb);
        const finalGroupId = await this.createGrandFinal(stageId, winnerWb, winnerLb);
        await this.createConsolationFinal(stageId, losersWb, {
          existingGroupId: finalGroupId,
          // Reuse the existing final group
          // Arbitrary way to differentiate the grand final and consolation final matches.
          // Grand final matches always have had `number: 1`. Now, consolation final matches always have `number: 2`.
          matchNumberStart: 2
        });
      }
    }
    /**
     * Creates a round-robin group.
     *
     * This will make as many rounds as needed to let each participant match every other once.
     *
     * @param stageId ID of the parent stage.
     * @param groupNumber Number of the group in the stage.
     * @param slots A list of slots.
     */
    async createRoundRobinGroup(stageId, groupNumber, slots) {
      var _a;
      const groupId = await this.insertGroup({
        stage_id: stageId,
        number: groupNumber
      });
      if (groupId === -1)
        throw Error("Could not insert the group.");
      const rounds = makeRoundRobinMatches(slots, (_a = this.stage.settings) == null ? void 0 : _a.roundRobinMode);
      for (let i = 0; i < rounds.length; i++)
        await this.createRound(stageId, groupId, i + 1, rounds[0].length, rounds[i]);
    }
    /**
     * Creates a standard bracket, which is the only one in single elimination and the upper one in double elimination.
     *
     * This will make as many rounds as needed to end with one winner.
     *
     * @param stageId ID of the parent stage.
     * @param groupNumber Number of the group in the stage.
     * @param slots A list of slots.
     */
    async createStandardBracket(stageId, groupNumber, slots) {
      const roundCount = getUpperBracketRoundCount(slots.length);
      const groupId = await this.insertGroup({
        stage_id: stageId,
        number: groupNumber
      });
      if (groupId === -1)
        throw Error("Could not insert the group.");
      let duels = makePairs(slots);
      let roundNumber = 1;
      const losers = [];
      for (let i = roundCount - 1; i >= 0; i--) {
        const matchCount = Math.pow(2, i);
        duels = this.getCurrentDuels(duels, matchCount);
        losers.push(duels.map(byeLoser));
        await this.createRound(stageId, groupId, roundNumber++, matchCount, duels);
      }
      return { losers, winner: byeWinner(duels[0]) };
    }
    /**
     * Creates a lower bracket, alternating between major and minor rounds.
     *
     * - A major round is a regular round.
     * - A minor round matches the previous (major) round's winners against upper bracket losers of the corresponding round.
     *
     * @param stageId ID of the parent stage.
     * @param groupNumber Number of the group in the stage.
     * @param losers One list of losers per upper bracket round.
     */
    async createLowerBracket(stageId, groupNumber, losers) {
      var _a;
      const participantCount = (_a = this.stage.settings) == null ? void 0 : _a.size;
      const roundPairCount = getRoundPairCount(participantCount);
      let losersId = 0;
      const method = this.getMajorOrdering(participantCount);
      const ordered = ordering[method](losers[losersId++]);
      const groupId = await this.insertGroup({
        stage_id: stageId,
        number: groupNumber
      });
      if (groupId === -1)
        throw Error("Could not insert the group.");
      let duels = makePairs(ordered);
      let roundNumber = 1;
      for (let i = 0; i < roundPairCount; i++) {
        const matchCount = Math.pow(2, roundPairCount - i - 1);
        duels = this.getCurrentDuels(duels, matchCount, true);
        await this.createRound(stageId, groupId, roundNumber++, matchCount, duels);
        const minorOrdering = this.getMinorOrdering(participantCount, i, roundPairCount);
        duels = this.getCurrentDuels(duels, matchCount, false, losers[losersId++], minorOrdering);
        await this.createRound(stageId, groupId, roundNumber++, matchCount, duels);
      }
      return byeWinnerToGrandFinal(duels[0]);
    }
    /**
     * Creates a bracket with rounds that only have 1 match each. Used for finals.
     *
     * @param stageId ID of the parent stage.
     * @param groupNumber Number of the group in the stage.
     * @param duels A list of duels.
     * @param overrides Optional overrides.
     */
    async createUniqueMatchBracket(stageId, groupNumber, duels, overrides = {}) {
      let groupId = overrides.existingGroupId;
      let roundNumberStart = 1;
      if (groupId !== void 0) {
        const rounds = await this.storage.select("round", { group_id: groupId });
        if (!rounds)
          throw Error("Error getting rounds.");
        roundNumberStart = rounds.length + 1;
      } else {
        groupId = await this.insertGroup({
          stage_id: stageId,
          number: groupNumber
        });
        if (groupId === -1)
          throw Error("Could not insert the group.");
      }
      for (let i = 0; i < duels.length; i++)
        await this.createRound(stageId, groupId, roundNumberStart + i, 1, [duels[i]], overrides.matchNumberStart);
      return groupId;
    }
    /**
     * Creates a round, which contain matches.
     *
     * @param stageId ID of the parent stage.
     * @param groupId ID of the parent group.
     * @param roundNumber Number in the group.
     * @param matchCount Duel/match count.
     * @param duels A list of duels.
     * @param matchNumberStart Optionally give the starting point for the match numbers. Starts at 1 by default.
     */
    async createRound(stageId, groupId, roundNumber, matchCount, duels, matchNumberStart = 1) {
      const matchesChildCount = this.getMatchesChildCount();
      const roundId = await this.insertRound({
        number: roundNumber,
        stage_id: stageId,
        group_id: groupId
      });
      if (roundId === -1)
        throw Error("Could not insert the round.");
      for (let i = 0; i < matchCount; i++)
        await this.createMatch(stageId, groupId, roundId, matchNumberStart + i, duels[i], matchesChildCount);
    }
    /**
     * Creates a match, possibly with match games.
     *
     * - If `childCount` is 0, then there is no children. The score of the match is directly its intrinsic score.
     * - If `childCount` is greater than 0, then the score of the match will automatically be calculated based on its child games.
     *
     * @param stageId ID of the parent stage.
     * @param groupId ID of the parent group.
     * @param roundId ID of the parent round.
     * @param matchNumber Number in the round.
     * @param opponents The two opponents matching against each other.
     * @param childCount Child count for this match (number of games).
     */
    async createMatch(stageId, groupId, roundId, matchNumber, opponents, childCount) {
      const opponent1 = toResultWithPosition(opponents[0]);
      const opponent2 = toResultWithPosition(opponents[1]);
      if (this.stage.type === "round_robin" && opponent1 === null && opponent2 === null)
        return;
      let existing = null;
      let status = getMatchStatus(opponents);
      if (this.updateMode) {
        existing = await this.storage.selectFirst("match", {
          round_id: roundId,
          number: matchNumber
        });
        const currentChildCount = existing == null ? void 0 : existing.child_count;
        childCount = currentChildCount === void 0 ? childCount : currentChildCount;
        if (existing) {
          const existingStatus = getMatchStatus(existing);
          if (existingStatus > status && existingStatus >= import_brackets_model2.Status.Running)
            status = existingStatus;
        }
      }
      const parentId = await this.insertMatch({
        number: matchNumber,
        stage_id: stageId,
        group_id: groupId,
        round_id: roundId,
        child_count: childCount,
        status,
        ...getInferredResult(
          opponent1,
          opponent2
        )
      }, existing);
      if (parentId === -1)
        throw Error("Could not insert the match.");
      for (let i = 0; i < childCount; i++) {
        const id = await this.insertMatchGame({
          number: i + 1,
          stage_id: stageId,
          parent_id: parentId,
          status,
          ...getInferredResult(
            toResult(opponents[0]),
            toResult(opponents[1])
          )
        });
        if (id === -1)
          throw Error("Could not insert the match game.");
      }
    }
    /**
     * Generic implementation.
     *
     * @param previousDuels Always given.
     * @param currentDuelCount Always given.
     * @param major Only for loser bracket.
     * @param losers Only for minor rounds of loser bracket.
     * @param method Only for minor rounds. Ordering method for the losers.
     */
    getCurrentDuels(previousDuels, currentDuelCount, major, losers, method) {
      if ((major === void 0 || major) && previousDuels.length === currentDuelCount) {
        return previousDuels;
      }
      if (major === void 0 || major) {
        return transitionToMajor(previousDuels);
      }
      return transitionToMinor(previousDuels, losers, method);
    }
    /**
     * Returns a list of slots.
     * - If `seeding` was given, inserts them in the storage.
     * - If `size` was given, only returns a list of empty slots.
     *
     * @param positions An optional list of positions (seeds) for a manual ordering.
     */
    async getSlots(positions) {
      var _a;
      let seeding = this.stage.seedingIds || this.stage.seeding;
      const size = ((_a = this.stage.settings) == null ? void 0 : _a.size) || (seeding == null ? void 0 : seeding.length) || 0;
      ensureValidSize(this.stage.type, size);
      if (size && !seeding)
        return Array.from({ length: size }, (_, i) => ({ id: null, position: i + 1 }));
      if (!seeding) throw Error("Either size or seeding must be given.");
      this.stage.settings = {
        ...this.stage.settings,
        size
        // Always set the size.
      };
      if (positions && positions.length !== size)
        throw Error("Manual ordering does not have the same length as the seeding.");
      ensureNoDuplicates(seeding);
      seeding = fixSeeding(seeding, size);
      if (this.stage.type !== "round_robin" && this.stage.settings.balanceByes)
        seeding = balanceByes(seeding, this.stage.settings.size);
      this.stage.seeding = seeding;
      const slots = this.stage.seedingIds !== void 0 || isSeedingWithIds(seeding) ? await this.getSlotsUsingIds(seeding, positions) : await this.getSlotsUsingNames(seeding, positions);
      if (this.updateMode && !this.enableByesInUpdate)
        return slots.map((slot) => slot === null ? { id: null } : slot);
      return slots;
    }
    /**
     * Returns the list of slots with a seeding containing names. Participants may be added to database.
     *
     * @param seeding The seeding (names).
     * @param positions An optional list of positions (seeds) for a manual ordering.
     */
    async getSlotsUsingNames(seeding, positions) {
      const participants = extractParticipantsFromSeeding(this.stage.tournamentId, seeding);
      if (!await this.registerParticipants(participants))
        throw Error("Error registering the participants.");
      const added = await this.storage.select("participant", { tournament_id: this.stage.tournamentId });
      if (!added) throw Error("Error getting registered participant.");
      return mapParticipantsNamesToDatabase(seeding, added, positions);
    }
    /**
     * Returns the list of slots with a seeding containing IDs. No database mutation.
     *
     * @param seeding The seeding (IDs).
     * @param positions An optional list of positions (seeds) for a manual ordering.
     */
    async getSlotsUsingIds(seeding, positions) {
      const participants = await this.storage.select("participant", { tournament_id: this.stage.tournamentId });
      if (!participants) throw Error("No available participants.");
      return mapParticipantsIdsToDatabase(seeding, participants, positions);
    }
    /**
     * Gets the current stage number based on existing stages.
     */
    async getStageNumber() {
      const stages = await this.storage.select("stage", { tournament_id: this.stage.tournamentId });
      const stageNumbers = stages == null ? void 0 : stages.map((stage) => {
        var _a;
        return (_a = stage.number) != null ? _a : 0;
      });
      if (this.stage.number !== void 0) {
        if (stageNumbers == null ? void 0 : stageNumbers.includes(this.stage.number))
          throw Error("The given stage number already exists.");
        return this.stage.number;
      }
      if (!(stageNumbers == null ? void 0 : stageNumbers.length)) return 1;
      const maxNumber = Math.max(...stageNumbers);
      return maxNumber + 1;
    }
    /**
     * Safely gets `matchesChildCount` in the stage input settings.
     */
    getMatchesChildCount() {
      var _a;
      if (!((_a = this.stage.settings) == null ? void 0 : _a.matchesChildCount))
        return 0;
      return this.stage.settings.matchesChildCount;
    }
    /**
     * Safely gets an ordering by its index in the stage input settings.
     *
     * @param orderingIndex Index of the ordering.
     * @param stageType A value indicating if the method should be a group method or not.
     * @param defaultMethod The default method to use if not given.
     */
    getOrdering(orderingIndex, stageType, defaultMethod) {
      var _a;
      if (!((_a = this.stage.settings) == null ? void 0 : _a.seedOrdering)) {
        this.seedOrdering.push(defaultMethod);
        return defaultMethod;
      }
      const method = this.stage.settings.seedOrdering[orderingIndex];
      if (!method) {
        this.seedOrdering.push(defaultMethod);
        return defaultMethod;
      }
      if (stageType === "elimination" && method.match(/^groups\./))
        throw Error("You must specify a seed ordering method without a 'groups' prefix");
      if (stageType === "groups" && method !== "natural" && !method.match(/^groups\./))
        throw Error("You must specify a seed ordering method with a 'groups' prefix");
      return method;
    }
    /**
     * Gets the duels in groups for a round-robin stage.
     */
    async getRoundRobinGroups() {
      var _a, _b, _c, _d, _e;
      if (((_a = this.stage.settings) == null ? void 0 : _a.groupCount) === void 0 || !Number.isInteger(this.stage.settings.groupCount))
        throw Error("You must specify a group count for round-robin stages.");
      if (this.stage.settings.groupCount <= 0)
        throw Error("You must provide a strictly positive group count.");
      if ((_b = this.stage.settings) == null ? void 0 : _b.manualOrdering) {
        if (((_c = this.stage.settings) == null ? void 0 : _c.manualOrdering.length) !== ((_d = this.stage.settings) == null ? void 0 : _d.groupCount))
          throw Error("Group count in the manual ordering does not correspond to the given group count.");
        const positions = (_e = this.stage.settings) == null ? void 0 : _e.manualOrdering.flat();
        const slots2 = await this.getSlots(positions);
        let cursor = 0;
        return this.stage.settings.manualOrdering.map((group) => {
          const slotsGroup = slots2.slice(cursor, cursor + group.length);
          cursor += group.length;
          return slotsGroup;
        });
      }
      if (Array.isArray(this.stage.settings.seedOrdering) && this.stage.settings.seedOrdering.length !== 1)
        throw Error("You must specify one seed ordering method.");
      const method = this.getRoundRobinOrdering();
      const slots = await this.getSlots();
      const ordered = ordering[method](slots, this.stage.settings.groupCount);
      return makeGroups(ordered, this.stage.settings.groupCount);
    }
    /**
     * Returns the ordering method for the groups in a round-robin stage.
     */
    getRoundRobinOrdering() {
      return this.getOrdering(0, "groups", "groups.effort_balanced");
    }
    /**
     * Returns the ordering method for the first round of the upper bracket of an elimination stage.
     */
    getStandardBracketFirstRoundOrdering() {
      return this.getOrdering(0, "elimination", "inner_outer");
    }
    /**
     * Safely gets the only major ordering for the lower bracket.
     *
     * @param participantCount Number of participants in the stage.
     */
    getMajorOrdering(participantCount) {
      var _a;
      return this.getOrdering(1, "elimination", ((_a = defaultMinorOrdering[participantCount]) == null ? void 0 : _a[0]) || "natural");
    }
    /**
     * Safely gets a minor ordering for the lower bracket by its index.
     *
     * @param participantCount Number of participants in the stage.
     * @param index Index of the minor round.
     * @param minorRoundCount Number of minor rounds.
     */
    getMinorOrdering(participantCount, index, minorRoundCount) {
      var _a;
      if (index === minorRoundCount - 1)
        return void 0;
      return this.getOrdering(2 + index, "elimination", ((_a = defaultMinorOrdering[participantCount]) == null ? void 0 : _a[1 + index]) || "natural");
    }
    /**
     * Inserts a stage or finds an existing one.
     *
     * @param stage The stage to insert.
     */
    async insertStage(stage) {
      let existing = null;
      if (this.updateMode) {
        existing = await this.storage.select("stage", this.currentStageId);
        if (!existing) throw Error("Stage not found.");
        const update = {
          ...existing,
          ...stage,
          settings: {
            ...existing.settings,
            ...stage.settings
          }
        };
        if (!await this.storage.update("stage", this.currentStageId, update))
          throw Error("Could not update the stage.");
      }
      if (!existing)
        return this.storage.insert("stage", stage);
      return existing.id;
    }
    /**
     * Inserts a group or finds an existing one.
     *
     * @param group The group to insert.
     */
    async insertGroup(group) {
      let existing = null;
      if (this.updateMode) {
        existing = await this.storage.selectFirst("group", {
          stage_id: group.stage_id,
          number: group.number
        });
      }
      if (!existing)
        return this.storage.insert("group", group);
      return existing.id;
    }
    /**
     * Inserts a round or finds an existing one.
     *
     * @param round The round to insert.
     */
    async insertRound(round) {
      let existing = null;
      if (this.updateMode) {
        existing = await this.storage.selectFirst("round", {
          group_id: round.group_id,
          number: round.number
        });
      }
      if (!existing)
        return this.storage.insert("round", round);
      return existing.id;
    }
    /**
     * Inserts a match or updates an existing one.
     *
     * @param match The match to insert.
     * @param existing An existing match corresponding to the current one.
     */
    async insertMatch(match, existing) {
      if (!existing)
        return this.storage.insert("match", match);
      const updated = getUpdatedMatchResults(match, existing, this.enableByesInUpdate);
      if (!await this.storage.update("match", existing.id, updated))
        throw Error("Could not update the match.");
      return existing.id;
    }
    /**
     * Inserts a match game or finds an existing one (and updates it).
     *
     * @param matchGame The match game to insert.
     */
    async insertMatchGame(matchGame) {
      let existing = null;
      if (this.updateMode) {
        existing = await this.storage.selectFirst("match_game", {
          parent_id: matchGame.parent_id,
          number: matchGame.number
        });
      }
      if (!existing)
        return this.storage.insert("match_game", matchGame);
      const updated = getUpdatedMatchResults(matchGame, existing, this.enableByesInUpdate);
      if (!await this.storage.update("match_game", existing.id, updated))
        throw Error("Could not update the match game.");
      return existing.id;
    }
    /**
     * Inserts missing participants.
     *
     * @param participants The list of participants to process.
     */
    async registerParticipants(participants) {
      const existing = await this.storage.select("participant", { tournament_id: this.stage.tournamentId });
      if (!existing || existing.length === 0)
        return this.storage.insert("participant", participants);
      for (const participant of participants) {
        if (existing.some((value) => value.name === participant.name))
          continue;
        const result = await this.storage.insert("participant", participant);
        if (result === -1) return false;
      }
      return true;
    }
    /**
     * Creates a new stage.
     */
    async createStage() {
      const stageNumber = await this.getStageNumber();
      const stage = {
        tournament_id: this.stage.tournamentId,
        name: this.stage.name,
        type: this.stage.type,
        number: stageNumber,
        settings: this.stage.settings || {}
      };
      const stageId = await this.insertStage(stage);
      if (stageId === -1)
        throw Error("Could not insert the stage.");
      return { ...stage, id: stageId };
    }
    /**
     * Creates a consolation final for the semi final losers of an upper bracket (single or double elimination).
     *
     * @param stageId ID of the stage.
     * @param losers The semi final losers who will play the consolation final.
     * @param overrides Optional overrides.
     */
    async createConsolationFinal(stageId, losers, overrides = {}) {
      var _a;
      if (!((_a = this.stage.settings) == null ? void 0 : _a.consolationFinal)) return;
      const finalGroupNumber = this.stage.type === "double_elimination" ? 3 : 2;
      const semiFinalLosers = losers[losers.length - 2];
      await this.createUniqueMatchBracket(stageId, finalGroupNumber, [semiFinalLosers], overrides);
    }
    /**
     * Creates a grand final (none, simple or double) for winners of both bracket in a double elimination stage.
     *
     * @param stageId ID of the stage.
     * @param winnerWb The winner of the winner bracket.
     * @param winnerLb The winner of the loser bracket.
     */
    async createGrandFinal(stageId, winnerWb, winnerLb) {
      var _a;
      const grandFinal = (_a = this.stage.settings) == null ? void 0 : _a.grandFinal;
      if (grandFinal === "none") return;
      const finalDuels = [[winnerWb, winnerLb]];
      if (grandFinal === "double")
        finalDuels.push([{ id: null }, { id: null }]);
      const groupId = await this.createUniqueMatchBracket(stageId, 3, finalDuels);
      return groupId;
    }
    /**
     * Ensures that the seed ordering list is stored even if it was not given in the first place.
     *
     * @param stageId ID of the stage.
     */
    async ensureSeedOrdering(stageId) {
      var _a, _b;
      if (((_b = (_a = this.stage.settings) == null ? void 0 : _a.seedOrdering) == null ? void 0 : _b.length) === this.seedOrdering.length) return;
      const existing = await this.storage.select("stage", stageId);
      if (!existing) throw Error("Stage not found.");
      const update = {
        ...existing,
        settings: {
          ...existing.settings,
          seedOrdering: this.seedOrdering
        }
      };
      if (!await this.storage.update("stage", stageId, update))
        throw Error("Could not update the stage.");
    }
  };

  // src/create.ts
  var Create = class {
    /**
     * Creates an instance of Create.
     *
     * @param storage The implementation of Storage.
     */
    constructor(storage) {
      this.storage = storage;
    }
    /**
     * Creates a stage for an existing tournament. The tournament won't be created.
     *
     * @param data The stage to create.
     */
    async stage(data) {
      const creator = new StageCreator(this.storage, data);
      return creator.run();
    }
  };

  // src/get.ts
  var import_brackets_model3 = __toESM(require_dist());

  // src/base/getter.ts
  var BaseGetter = class {
    /**
     * Creates an instance of a Storage getter.
     *
     * @param storage The implementation of Storage.
     */
    constructor(storage) {
      this.storage = storage;
    }
    /**
     * Gets all the rounds that contain ordered participants.
     *
     * @param stage The stage to get rounds from.
     */
    async getOrderedRounds(stage) {
      if (!(stage == null ? void 0 : stage.settings.size)) throw Error("The stage has no size.");
      if (stage.type === "single_elimination")
        return this.getOrderedRoundsSingleElimination(stage.id);
      return this.getOrderedRoundsDoubleElimination(stage.id);
    }
    /**
     * Gets all the rounds that contain ordered participants in a single elimination stage.
     *
     * @param stageId ID of the stage.
     */
    async getOrderedRoundsSingleElimination(stageId) {
      return [await this.getUpperBracketFirstRound(stageId)];
    }
    /**
     * Gets all the rounds that contain ordered participants in a double elimination stage.
     *
     * @param stageId ID of the stage.
     */
    async getOrderedRoundsDoubleElimination(stageId) {
      const rounds = await this.storage.select("round", { stage_id: stageId });
      if (!rounds) throw Error("Error getting rounds.");
      const loserBracket = await this.getLoserBracket(stageId);
      if (!loserBracket) throw Error("Loser bracket not found.");
      const firstRoundWB = rounds[0];
      const roundsLB = rounds.filter((r) => r.group_id === loserBracket.id);
      const orderedRoundsLB = roundsLB.filter((r) => isOrderingSupportedLoserBracket(r.number, roundsLB.length));
      return [firstRoundWB, ...orderedRoundsLB];
    }
    /**
     * Gets the positional information (number in group and total number of rounds in group) of a round based on its id.
     *
     * @param roundId ID of the round.
     */
    async getRoundPositionalInfo(roundId) {
      const round = await this.storage.select("round", roundId);
      if (!round) throw Error("Round not found.");
      const rounds = await this.storage.select("round", { group_id: round.group_id });
      if (!rounds) throw Error("Error getting rounds.");
      return {
        roundNumber: round.number,
        roundCount: rounds.length
      };
    }
    /**
     * Gets the matches leading to the given match.
     *
     * @param match The current match.
     * @param matchLocation Location of the current match.
     * @param stage The parent stage.
     * @param roundNumber Number of the round.
     */
    async getPreviousMatches(match, matchLocation, stage, roundNumber) {
      if (matchLocation === "loser_bracket")
        return this.getPreviousMatchesLB(match, stage, roundNumber);
      if (matchLocation === "final_group")
        return this.getPreviousMatchesFinal(match, stage, roundNumber);
      if (roundNumber === 1)
        return [];
      return this.getMatchesBeforeMajorRound(match, roundNumber);
    }
    /**
     * Gets the matches leading to the given match, which is in a final group (consolation final or grand final).
     *
     * @param match The current match.
     * @param stage The parent stage.
     * @param roundNumber Number of the current round.
     */
    async getPreviousMatchesFinal(match, stage, roundNumber) {
      if (stage.type === "single_elimination")
        return this.getPreviousMatchesFinalSingleElimination(match, stage);
      return this.getPreviousMatchesFinalDoubleElimination(match, roundNumber);
    }
    /**
     * Gets the matches leading to the given match, which is in a final group (consolation final).
     *
     * @param match The current match.
     * @param stage The parent stage.
     */
    async getPreviousMatchesFinalSingleElimination(match, stage) {
      const upperBracket = await this.getUpperBracket(match.stage_id);
      const upperBracketRoundCount = getUpperBracketRoundCount(stage.settings.size);
      const semiFinalsRound = await this.storage.selectFirst("round", {
        group_id: upperBracket.id,
        number: upperBracketRoundCount - 1
        // Second to last round
      });
      if (!semiFinalsRound)
        throw Error("Semi finals round not found.");
      const semiFinalMatches = await this.storage.select("match", {
        round_id: semiFinalsRound.id
      });
      if (!semiFinalMatches)
        throw Error("Error getting semi final matches.");
      return semiFinalMatches;
    }
    /**
     * Gets the matches leading to the given match, which is in a final group (grand final).
     *
     * @param match The current match.
     * @param roundNumber Number of the current round.
     */
    async getPreviousMatchesFinalDoubleElimination(match, roundNumber) {
      if (match.number === 2)
        return this.getPreviousMatchesConsolationFinalDoubleElimination(match);
      if (roundNumber > 1)
        return [await this.findMatch(match.group_id, roundNumber - 1, 1)];
      const winnerBracket = await this.getUpperBracket(match.stage_id);
      const lastRoundWB = await this.getLastRound(winnerBracket.id);
      const winnerBracketFinalMatch = await this.storage.selectFirst("match", {
        round_id: lastRoundWB.id,
        number: 1
      });
      if (!winnerBracketFinalMatch)
        throw Error("Match not found.");
      const loserBracket = await this.getLoserBracket(match.stage_id);
      if (!loserBracket)
        throw Error("Loser bracket not found.");
      const lastRoundLB = await this.getLastRound(loserBracket.id);
      const loserBracketFinalMatch = await this.storage.selectFirst("match", {
        round_id: lastRoundLB.id,
        number: 1
      });
      if (!loserBracketFinalMatch)
        throw Error("Match not found.");
      return [winnerBracketFinalMatch, loserBracketFinalMatch];
    }
    /**
     * Gets the matches leading to the consolation final in a double elimination stage.
     *
     * @param match The current match.
     */
    async getPreviousMatchesConsolationFinalDoubleElimination(match) {
      const loserBracket = await this.getLoserBracket(match.stage_id);
      if (!loserBracket)
        throw Error("Loser bracket not found.");
      const lastRound = await this.getLastRound(loserBracket.id);
      const matches = [];
      for (const roundNumber of [lastRound.number - 1, lastRound.number]) {
        if (roundNumber < 1)
          continue;
        const round = await this.storage.selectFirst("round", {
          group_id: loserBracket.id,
          number: roundNumber
        });
        if (!round)
          throw Error("Round not found.");
        const roundMatches = await this.storage.select("match", {
          round_id: round.id
        });
        if (!roundMatches)
          throw Error("Error getting loser bracket matches.");
        matches.push(...roundMatches);
      }
      return matches;
    }
    /**
     * Gets the matches leading to a given match from the loser bracket.
     *
     * @param match The current match.
     * @param stage The parent stage.
     * @param roundNumber Number of the round.
     */
    async getPreviousMatchesLB(match, stage, roundNumber) {
      if (stage.settings.skipFirstRound && roundNumber === 1)
        return [];
      if (hasBye(match))
        return [];
      const winnerBracket = await this.getUpperBracket(match.stage_id);
      const actualRoundNumberWB = Math.ceil((roundNumber + 1) / 2);
      const roundNumberWB = stage.settings.skipFirstRound ? actualRoundNumberWB - 1 : actualRoundNumberWB;
      if (roundNumber === 1)
        return this.getMatchesBeforeFirstRoundLB(match, winnerBracket.id, roundNumberWB);
      if (isMajorRound(roundNumber))
        return this.getMatchesBeforeMajorRound(match, roundNumber);
      return this.getMatchesBeforeMinorRoundLB(match, winnerBracket.id, roundNumber, roundNumberWB);
    }
    /**
     * Gets the matches leading to a given match in a major round (every round of upper bracket or specific ones in lower bracket).
     *
     * @param match The current match.
     * @param roundNumber Number of the round.
     */
    async getMatchesBeforeMajorRound(match, roundNumber) {
      return [
        await this.findMatch(match.group_id, roundNumber - 1, match.number * 2 - 1),
        await this.findMatch(match.group_id, roundNumber - 1, match.number * 2)
      ];
    }
    /**
     * Gets the matches leading to a given match in the first round of the loser bracket.
     *
     * @param match The current match.
     * @param winnerBracketId ID of the winner bracket.
     * @param roundNumberWB The number of the previous round in the winner bracket.
     */
    async getMatchesBeforeFirstRoundLB(match, winnerBracketId, roundNumberWB) {
      return [
        await this.findMatch(winnerBracketId, roundNumberWB, getOriginPosition(match, "opponent1")),
        await this.findMatch(winnerBracketId, roundNumberWB, getOriginPosition(match, "opponent2"))
      ];
    }
    /**
     * Gets the matches leading to a given match in a minor round of the loser bracket.
     *
     * @param match The current match.
     * @param winnerBracketId ID of the winner bracket.
     * @param roundNumber Number of the current round.
     * @param roundNumberWB The number of the previous round in the winner bracket.
     */
    async getMatchesBeforeMinorRoundLB(match, winnerBracketId, roundNumber, roundNumberWB) {
      const matchNumber = getOriginPosition(match, "opponent1");
      return [
        await this.findMatch(winnerBracketId, roundNumberWB, matchNumber),
        await this.findMatch(match.group_id, roundNumber - 1, match.number)
      ];
    }
    /**
     * Gets the match(es) where the opponents of the current match will go just after.
     *
     * @param match The current match.
     * @param matchLocation Location of the current match.
     * @param stage The parent stage.
     * @param roundNumber The number of the current round.
     * @param roundCount Count of rounds.
     */
    async getNextMatches(match, matchLocation, stage, roundNumber, roundCount) {
      switch (matchLocation) {
        case "single_bracket":
          return this.getNextMatchesUpperBracket(match, stage, roundNumber, roundCount);
        case "winner_bracket":
          return this.getNextMatchesWB(match, stage, roundNumber, roundCount);
        case "loser_bracket":
          return this.getNextMatchesLB(match, stage, roundNumber, roundCount);
        case "final_group":
          return this.getNextMatchesFinal(match, stage, roundNumber, roundCount);
        default:
          throw Error("Unknown bracket kind.");
      }
    }
    /**
     * Gets the match(es) where the opponents of the current match of winner bracket will go just after.
     *
     * @param match The current match.
     * @param stage The parent stage.
     * @param roundNumber The number of the current round.
     * @param roundCount Count of rounds.
     */
    async getNextMatchesWB(match, stage, roundNumber, roundCount) {
      const loserBracket = await this.getLoserBracket(match.stage_id);
      if (loserBracket === null)
        return [];
      const actualRoundNumber = stage.settings.skipFirstRound ? roundNumber + 1 : roundNumber;
      const roundNumberLB = actualRoundNumber > 1 ? (actualRoundNumber - 1) * 2 : 1;
      const participantCount = stage.settings.size;
      const method = getLoserOrdering(stage.settings.seedOrdering, roundNumberLB);
      const actualMatchNumberLB = findLoserMatchNumber(participantCount, roundNumberLB, match.number, method);
      return [
        ...await this.getNextMatchesUpperBracket(match, stage, roundNumber, roundCount),
        // Can be `null`, to denote that the winner goes nowhere, e.g. in `WB Final`.
        await this.findMatch(loserBracket.id, roundNumberLB, actualMatchNumberLB)
      ];
    }
    /**
     * Gets the match(es) where the opponents of the current match of an upper bracket will go just after.
     *
     * @param match The current match.
     * @param stage The parent stage.
     * @param roundNumber The number of the current round.
     * @param roundCount Count of rounds.
     */
    async getNextMatchesUpperBracket(match, stage, roundNumber, roundCount) {
      if (stage.type === "single_elimination")
        return this.getNextMatchesUpperBracketSingleElimination(match, stage.type, roundNumber, roundCount);
      return this.getNextMatchesUpperBracketDoubleElimination(match, stage.type, roundNumber, roundCount);
    }
    /**
     * Gets the match(es) where the opponents of the current match of the unique bracket of a single elimination will go just after.
     *
     * @param match The current match.
     * @param stageType Type of the stage.
     * @param roundNumber The number of the current round.
     * @param roundCount Count of rounds.
     */
    async getNextMatchesUpperBracketSingleElimination(match, stageType, roundNumber, roundCount) {
      if (roundNumber === roundCount - 1) {
        const finalGroupId = await this.getFinalGroupId(match.stage_id, stageType);
        const consolationFinal = await this.getFinalGroupFirstMatch(finalGroupId);
        return [
          await this.getDiagonalMatch(match.group_id, roundNumber, match.number),
          ...consolationFinal ? [consolationFinal] : []
        ];
      }
      if (roundNumber === roundCount)
        return [];
      return [await this.getDiagonalMatch(match.group_id, roundNumber, match.number)];
    }
    /**
     * Gets the match(es) where the opponents of the current match of the unique bracket of a double elimination will go just after.
     *
     * @param match The current match.
     * @param stageType Type of the stage.
     * @param roundNumber The number of the current round.
     * @param roundCount Count of rounds.
     */
    async getNextMatchesUpperBracketDoubleElimination(match, stageType, roundNumber, roundCount) {
      if (roundNumber === roundCount) {
        const finalGroupId = await this.getFinalGroupId(match.stage_id, stageType);
        return [await this.getFinalGroupFirstMatch(finalGroupId)];
      }
      return [await this.getDiagonalMatch(match.group_id, roundNumber, match.number)];
    }
    /**
     * Gets the match(es) where the opponents of the current match of loser bracket will go just after.
     *
     * @param match The current match.
     * @param stage The parent stage.
     * @param roundNumber The number of the current round.
     * @param roundCount Count of rounds.
     */
    async getNextMatchesLB(match, stage, roundNumber, roundCount) {
      if (roundNumber === roundCount - 1) {
        const finalGroupId = await this.getFinalGroupId(match.stage_id, stage.type);
        const consolationFinal = await this.getConsolationFinalMatchDoubleElimination(finalGroupId);
        return [
          ...await this.getMatchAfterMajorRoundLB(match, roundNumber),
          // Winner follows.
          ...consolationFinal ? [consolationFinal] : []
          // Loser goes in consolation.
        ];
      }
      if (roundNumber === roundCount) {
        const finalGroupId = await this.getFinalGroupId(match.stage_id, stage.type);
        const grandFinal = await this.getFinalGroupFirstMatch(finalGroupId);
        const consolationFinal = await this.getConsolationFinalMatchDoubleElimination(finalGroupId);
        return [
          grandFinal,
          // Null if no grand final.
          ...consolationFinal ? [consolationFinal] : []
          // Returned array is length 1 if no consolation final.
        ];
      }
      if (isMajorRound(roundNumber))
        return this.getMatchAfterMajorRoundLB(match, roundNumber);
      return this.getMatchAfterMinorRoundLB(match, roundNumber);
    }
    /**
     * Gets the first match of the final group (consolation final or grand final).
     *
     * @param finalGroupId ID of the final group.
     */
    async getFinalGroupFirstMatch(finalGroupId) {
      if (finalGroupId === null)
        return null;
      return this.findMatch(finalGroupId, 1, 1);
    }
    /**
     * Gets the consolation final in a double elimination tournament.
     *
     * @param finalGroupId ID of the final group.
     */
    async getConsolationFinalMatchDoubleElimination(finalGroupId) {
      if (finalGroupId === null)
        return null;
      return this.storage.selectFirst("match", {
        group_id: finalGroupId,
        number: 2
        // Used to differentiate grand final and consolation final matches in the same final group.
      });
    }
    /**
     * Gets the match following the current match, which is in the final group (consolation final or grand final).
     *
     * @param match The current match.
     * @param stage The parent stage.
     * @param roundNumber The number of the current round.
     * @param roundCount The count of rounds.
     */
    async getNextMatchesFinal(match, stage, roundNumber, roundCount) {
      if (roundNumber === roundCount)
        return [];
      if (stage.settings.consolationFinal && match.number === 1 && roundNumber === roundCount - 1)
        return [];
      return [await this.findMatch(match.group_id, roundNumber + 1, 1)];
    }
    /**
     * Gets the match where the opponents of the current match of a winner bracket's major round will go just after.
     *
     * @param match The current match.
     * @param roundNumber The number of the current round.
     */
    async getMatchAfterMajorRoundLB(match, roundNumber) {
      return [await this.getParallelMatch(match.group_id, roundNumber, match.number)];
    }
    /**
     * Gets the match where the opponents of the current match of a winner bracket's minor round will go just after.
     *
     * @param match The current match.
     * @param roundNumber The number of the current round.
     */
    async getMatchAfterMinorRoundLB(match, roundNumber) {
      return [await this.getDiagonalMatch(match.group_id, roundNumber, match.number)];
    }
    /**
     * Returns the good seeding ordering based on the stage's type.
     *
     * @param stageType The type of the stage.
     * @param create A reference to a Create instance.
     */
    static getSeedingOrdering(stageType, create) {
      return stageType === "round_robin" ? create.getRoundRobinOrdering() : create.getStandardBracketFirstRoundOrdering();
    }
    /**
     * Returns the matches which contain the seeding of a stage based on its type.
     *
     * @param stageId ID of the stage.
     * @param stageType The type of the stage.
     */
    async getSeedingMatches(stageId, stageType) {
      if (stageType === "round_robin")
        return this.storage.select("match", { stage_id: stageId });
      try {
        const firstRound = await this.getUpperBracketFirstRound(stageId);
        return this.storage.select("match", { round_id: firstRound.id });
      } catch {
        return [];
      }
    }
    /**
     * Gets the first round of the upper bracket.
     *
     * @param stageId ID of the stage.
     */
    async getUpperBracketFirstRound(stageId) {
      const firstRound = await this.storage.selectFirst("round", { stage_id: stageId, number: 1 }, false);
      if (!firstRound) throw Error("Round not found.");
      return firstRound;
    }
    /**
     * Gets the last round of a group.
     *
     * @param groupId ID of the group.
     */
    async getLastRound(groupId) {
      const round = await this.storage.selectLast("round", { group_id: groupId }, false);
      if (!round) throw Error("Error getting rounds.");
      return round;
    }
    /**
     * Returns the id of the final group (containing consolation final, or grand final, or both).
     *
     * @param stageId ID of the stage.
     * @param stageType Type of the stage.
     */
    async getFinalGroupId(stageId, stageType) {
      const groupNumber = stageType === "single_elimination" ? 2 : 3;
      const finalGroup = await this.storage.selectFirst("group", { stage_id: stageId, number: groupNumber });
      if (!finalGroup) return null;
      return finalGroup.id;
    }
    /**
     * Gets the upper bracket (the only bracket if single elimination or the winner bracket in double elimination).
     *
     * @param stageId ID of the stage.
     */
    async getUpperBracket(stageId) {
      const winnerBracket = await this.storage.selectFirst("group", { stage_id: stageId, number: 1 });
      if (!winnerBracket) throw Error("Winner bracket not found.");
      return winnerBracket;
    }
    /**
     * Gets the loser bracket.
     *
     * @param stageId ID of the stage.
     */
    async getLoserBracket(stageId) {
      return this.storage.selectFirst("group", { stage_id: stageId, number: 2 });
    }
    /**
     * Gets the corresponding match in the next round ("diagonal match") the usual way.
     *
     * Just like from Round 1 to Round 2 in a single elimination stage.
     *
     * @param groupId ID of the group.
     * @param roundNumber Number of the round in its parent group.
     * @param matchNumber Number of the match in its parent round.
     */
    async getDiagonalMatch(groupId, roundNumber, matchNumber) {
      return this.findMatch(groupId, roundNumber + 1, getDiagonalMatchNumber(matchNumber));
    }
    /**
     * Gets the corresponding match in the next round ("parallel match") the "major round to minor round" way.
     *
     * Just like from Round 1 to Round 2 in the loser bracket of a double elimination stage.
     *
     * @param groupId ID of the group.
     * @param roundNumber Number of the round in its parent group.
     * @param matchNumber Number of the match in its parent round.
     */
    async getParallelMatch(groupId, roundNumber, matchNumber) {
      return this.findMatch(groupId, roundNumber + 1, matchNumber);
    }
    /**
     * Finds a match in a given group. The match must have the given number in a round of which the number in group is given.
     *
     * **Example:** In group of id 1, give me the 4th match in the 3rd round.
     *
     * @param groupId ID of the group.
     * @param roundNumber Number of the round in its parent group.
     * @param matchNumber Number of the match in its parent round.
     */
    async findMatch(groupId, roundNumber, matchNumber) {
      const round = await this.storage.selectFirst("round", {
        group_id: groupId,
        number: roundNumber
      });
      if (!round) throw Error("Round not found.");
      const match = await this.storage.selectFirst("match", {
        round_id: round.id,
        number: matchNumber
      });
      if (!match) throw Error("Match not found.");
      return match;
    }
    /**
     * Finds a match game based on its `id` or based on the combination of its `parent_id` and `number`.
     * 
     * @param game Values to change in a match game.
     */
    async findMatchGame(game) {
      if (game.id !== void 0) {
        const stored = await this.storage.select("match_game", game.id);
        if (!stored) throw Error("Match game not found.");
        return stored;
      }
      if (game.parent_id !== void 0 && game.number) {
        const stored = await this.storage.selectFirst("match_game", {
          parent_id: game.parent_id,
          number: game.number
        });
        if (!stored) throw Error("Match game not found.");
        return stored;
      }
      throw Error("No match game id nor parent id and number given.");
    }
  };

  // src/get.ts
  var Get = class extends BaseGetter {
    /**
     * Returns the data needed to display a stage.
     *
     * @param stageId ID of the stage.
     */
    async stageData(stageId) {
      const stage = await this.storage.select("stage", stageId);
      if (!stage) throw Error("Stage not found.");
      const stageData = await this.getStageSpecificData(stage.id);
      const participants = await this.storage.select("participant", { tournament_id: stage.tournament_id });
      if (!participants) throw Error("Error getting participants.");
      return {
        stage: [stage],
        group: stageData.groups,
        round: stageData.rounds,
        match: stageData.matches,
        match_game: stageData.matchGames,
        participant: participants
      };
    }
    /**
     * Returns the data needed to display a whole tournament with all its stages.
     *
     * @param tournamentId ID of the tournament.
     */
    async tournamentData(tournamentId) {
      const stages = await this.storage.select("stage", { tournament_id: tournamentId });
      if (!stages) throw Error("Error getting stages.");
      const stagesData = await Promise.all(stages.map((stage) => this.getStageSpecificData(stage.id)));
      const participants = await this.storage.select("participant", { tournament_id: tournamentId });
      if (!participants) throw Error("Error getting participants.");
      return {
        stage: stages,
        group: stagesData.reduce((acc, data) => [...acc, ...data.groups], []),
        round: stagesData.reduce((acc, data) => [...acc, ...data.rounds], []),
        match: stagesData.reduce((acc, data) => [...acc, ...data.matches], []),
        match_game: stagesData.reduce((acc, data) => [...acc, ...data.matchGames], []),
        participant: participants
      };
    }
    /**
     * Wrapper around `storage.select('group')`.
     * 
     * Read more about the structure of a stage: https://drarig29.github.io/brackets-docs/user-guide/structure/
     *
     * @param filter Filter for the groups.
     * @example
     * ```js
     * for (const group of await manager.get.groups({ stage_id: stageId })) {
     *     const rounds = await manager.get.rounds({ group_id: group.id });
     *     console.log(rounds.length);
     * }
     * ```
     */
    async groups(filter) {
      const groups = await this.storage.select("group", filter);
      if (!groups) throw Error("Error getting groups.");
      return groups;
    }
    /**
     * Wrapper around `storage.select('round')`.
     *
     * Read more about the structure of a stage: https://drarig29.github.io/brackets-docs/user-guide/structure/
     * 
     * @param filter Filter for the rounds.
     * @example
     * ```js
     * for (const round of await manager.get.rounds({ stage_id: stageId })) {
     *     const matches = await manager.get.matches({ round_id: round.id });
     *     console.log(matches.length);
     * }
     * ```
     */
    async rounds(filter) {
      const rounds = await this.storage.select("round", filter);
      if (!rounds) throw Error("Error getting rounds.");
      return rounds;
    }
    /**
     * Wrapper around `storage.select('match')`.
     *
     * Read more about the structure of a stage: https://drarig29.github.io/brackets-docs/user-guide/structure/
     *
     * @param filter Filter for the matches.
     * @example
     * ```js
     * for (const match of await manager.get.matches({ round_id: round.id })) {
     *     console.log(match.id);
     * }
     * ```
     */
    async matches(filter) {
      const matches = await this.storage.select("match", filter);
      if (!matches) throw Error("Error getting matches.");
      return matches;
    }
    /**
     * Returns the match games associated to a list of matches.
     *
     * @param matches A list of matches.
     */
    async matchGames(matches) {
      const parentMatches = matches.filter((match) => match.child_count > 0);
      const matchGamesQueries = await Promise.all(parentMatches.map((match) => this.storage.select("match_game", { parent_id: match.id })));
      if (matchGamesQueries.some((game) => game === null)) throw Error("Error getting match games.");
      return getNonNull(matchGamesQueries).flat();
    }
    /**
     * Returns the stage that is not completed yet, because of uncompleted matches.
     * If all matches are completed in this tournament, there is no "current stage", so `null` is returned.
     * 
     * @param tournamentId ID of the tournament.
     */
    async currentStage(tournamentId) {
      const stages = await this.storage.select("stage", { tournament_id: tournamentId });
      if (!stages) throw Error("Error getting stages.");
      for (const stage of stages) {
        const matches = await this.storage.select("match", { stage_id: stage.id });
        if (!matches) throw Error("Error getting matches.");
        if (matches.every((match) => match.status >= import_brackets_model3.Status.Completed))
          continue;
        return stage;
      }
      return null;
    }
    /**
     * Returns the round that is not completed yet, because of uncompleted matches.
     * If all matches are completed in this stage of a tournament, there is no "current round", so `null` is returned.
     * 
     * Note: The consolation final of single elimination and the grand final of double elimination will be in a different `Group`.
     * 
     * @param stageId ID of the stage.
     * @example
     * If you don't know the stage id, you can first get the current stage.
     * ```js
     * const tournamentId = 3;
     * const currentStage = await manager.get.currentStage(tournamentId);
     * const currentRound = await manager.get.currentRound(currentStage.id);
     * ```
     */
    async currentRound(stageId) {
      const matches = await this.storage.select("match", { stage_id: stageId });
      if (!matches) throw Error("Error getting matches.");
      const matchesByRound = splitBy(matches, "round_id");
      for (const roundMatches of matchesByRound) {
        if (roundMatches.every((match) => isMatchStale(match)))
          continue;
        const round = await this.storage.select("round", roundMatches[0].round_id);
        if (!round) throw Error("Round not found.");
        return round;
      }
      return null;
    }
    /**
     * Returns the matches that can currently be played in parallel.
     * If the stage doesn't contain any, an empty array is returned.
     * 
     * Note:
     * - Returned matches are ongoing (i.e. ready or running).
     * - Returned matches can be from different rounds.
     * 
     * @param stageId ID of the stage.
     * @example
     * If you don't know the stage id, you can first get the current stage.
     * ```js
     * const tournamentId = 3;
     * const currentStage = await manager.get.currentStage(tournamentId);
     * const currentMatches = await manager.get.currentMatches(currentStage.id);
     * ```
     */
    async currentMatches(stageId) {
      const stage = await this.storage.select("stage", stageId);
      if (!stage) throw Error("Stage not found.");
      if (stage.type !== "single_elimination")
        throw Error("Not implemented for round robin and double elimination. Ask if needed.");
      const matches = await this.storage.select("match", { stage_id: stageId });
      if (!matches) throw Error("Error getting matches.");
      const matchesByRound = splitBy(matches, "round_id");
      const roundCount = getUpperBracketRoundCount(stage.settings.size);
      let currentRoundIndex = -1;
      const currentMatches = [];
      for (const roundMatches of matchesByRound) {
        currentRoundIndex++;
        if (stage.settings.consolationFinal && currentRoundIndex === roundCount - 1) {
          const [final] = roundMatches;
          const [consolationFinal] = matchesByRound[currentRoundIndex + 1];
          const finals = [final, consolationFinal];
          if (finals.every((match) => !isMatchOngoing(match)))
            return currentMatches;
          return finals.filter((match) => isMatchOngoing(match));
        }
        if (roundMatches.every((match) => !isMatchOngoing(match)))
          continue;
        currentMatches.push(...roundMatches.filter((match) => isMatchOngoing(match)));
      }
      return currentMatches;
    }
    /**
     * Returns the seeding of a stage.
     *
     * @param stageId ID of the stage.
     */
    async seeding(stageId) {
      const stage = await this.storage.select("stage", stageId);
      if (!stage) throw Error("Stage not found.");
      const pickRelevantProps = (slot) => {
        if (slot === null) return null;
        const { id, position } = slot;
        return { id, position };
      };
      if (stage.type === "round_robin")
        return (await this.roundRobinSeeding(stage)).map(pickRelevantProps);
      return (await this.eliminationSeeding(stage)).map(pickRelevantProps);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    async finalStandings(stageId, roundRobinOptions) {
      const stage = await this.storage.select("stage", stageId);
      if (!stage) throw Error("Stage not found.");
      switch (stage.type) {
        case "round_robin": {
          if (!roundRobinOptions)
            throw Error("Round-robin options are required for round-robin stages.");
          return this.roundRobinStandings(stage, roundRobinOptions);
        }
        case "single_elimination": {
          if (roundRobinOptions)
            throw Error("Round-robin options are not supported for elimination stages.");
          return this.singleEliminationStandings(stage);
        }
        case "double_elimination": {
          if (roundRobinOptions)
            throw Error("Round-robin options are not supported for elimination stages.");
          return this.doubleEliminationStandings(stage);
        }
        default:
          throw Error("Unknown stage type.");
      }
    }
    /**
     * Returns the seeding of a round-robin stage.
     *
     * @param stage The stage.
     */
    async roundRobinSeeding(stage) {
      if (stage.settings.size === void 0)
        throw Error("The size of the seeding is undefined.");
      const matches = await this.storage.select("match", { stage_id: stage.id });
      if (!matches) throw Error("Error getting matches.");
      const slots = convertMatchesToSeeding(matches);
      if (slots.length < stage.settings.size) {
        const diff = stage.settings.size - slots.length;
        for (let i = 0; i < diff; i++)
          slots.push(null);
      }
      const unique = uniqueBy(slots, (item) => item && item.position);
      const seeding = setArraySize(unique, stage.settings.size, null);
      return seeding;
    }
    /**
     * Returns the seeding of an elimination stage.
     *
     * @param stage The stage.
     */
    async eliminationSeeding(stage) {
      const firstRound = await this.storage.selectFirst("round", { stage_id: stage.id, number: 1 }, false);
      if (!firstRound) throw Error("Error getting the first round.");
      const matches = await this.storage.select("match", { round_id: firstRound.id });
      if (!matches) throw Error("Error getting matches.");
      return convertMatchesToSeeding(matches);
    }
    /**
     * Returns the final standings of a round-robin stage.
     *
     * @param stage The stage.
     * @param roundRobinOptions The options for the round-robin standings.
     */
    async roundRobinStandings(stage, roundRobinOptions) {
      const participants = await this.storage.select("participant", { tournament_id: stage.tournament_id });
      if (!participants) throw Error("Error getting participants.");
      const matches = await this.storage.select("match", { stage_id: stage.id });
      if (!matches) throw Error("Error getting matches.");
      const matchesByGroup = splitBy(matches, "group_id");
      const unsortedRanking = matchesByGroup.flatMap((groupMatches) => {
        const groupRanking = getRanking(groupMatches, roundRobinOptions.rankingFormula);
        const qualifiedOnly = groupRanking.slice(0, roundRobinOptions.maxQualifiedParticipantsPerGroup);
        return qualifiedOnly.map((item) => ({
          ...item,
          groupId: groupMatches[0].group_id,
          name: findParticipant(participants, item).name
        }));
      });
      return unsortedRanking.sort((a, b) => {
        if (a.rank === b.rank) return b.points - a.points;
        return a.rank - b.rank;
      });
    }
    /**
     * Returns the final standings of a single elimination stage.
     *
     * @param stage The stage.
     */
    async singleEliminationStandings(stage) {
      var _a;
      const grouped = [];
      const { group: groups, match: matches, participant: participants } = await this.stageData(stage.id);
      const [singleBracket, finalGroup] = groups;
      const final = matches.filter((match) => match.group_id === singleBracket.id).pop();
      if (!final) throw Error("Final not found.");
      const finalDoubleForfeitParticipants = getDoubleForfeitParticipants(participants, final);
      grouped[0] = finalDoubleForfeitParticipants || [findParticipant(participants, getFinalWinnerIfDefined(final))];
      const losers = getLosers(participants, matches.filter((match) => match.group_id === singleBracket.id));
      grouped.push(...losers.reverse().filter((group) => group.length > 0));
      if ((_a = stage.settings) == null ? void 0 : _a.consolationFinal) {
        const consolationFinal = matches.filter((match) => match.group_id === finalGroup.id).pop();
        if (!consolationFinal) throw Error("Consolation final not found.");
        const consolationFinalDoubleForfeitParticipants = getDoubleForfeitParticipants(participants, consolationFinal);
        const consolationFinalGroups = consolationFinalDoubleForfeitParticipants ? [consolationFinalDoubleForfeitParticipants] : [
          [findParticipant(participants, getFinalWinnerIfDefined(consolationFinal))],
          [findParticipant(participants, getLoser(consolationFinal))]
        ];
        grouped.splice(finalDoubleForfeitParticipants ? 1 : 2, 1, ...consolationFinalGroups);
      }
      return makeFinalStandings(grouped);
    }
    /**
     * Returns the final standings of a double elimination stage.
     *
     * @param stage The stage.
     */
    async doubleEliminationStandings(stage) {
      var _a, _b;
      const grouped = [];
      const { group: groups, match: matches, participant: participants } = await this.stageData(stage.id);
      const [winnerBracket, loserBracket, finalGroup] = groups;
      if (((_a = stage.settings) == null ? void 0 : _a.grandFinal) === "none") {
        const finalWB = matches.filter((match) => match.group_id === winnerBracket.id).pop();
        if (!finalWB) throw Error("WB final not found.");
        const finalLB = matches.filter((match) => match.group_id === loserBracket.id).pop();
        if (!finalLB) throw Error("LB final not found.");
        const finalWBDoubleForfeitParticipants = getDoubleForfeitParticipants(participants, finalWB);
        grouped[0] = finalWBDoubleForfeitParticipants || [findParticipant(participants, getFinalWinnerIfDefined(finalWB))];
        const finalLBDoubleForfeitParticipants = getDoubleForfeitParticipants(participants, finalLB);
        grouped[1] = finalLBDoubleForfeitParticipants || [findParticipant(participants, getFinalWinnerIfDefined(finalLB))];
      } else {
        const grandFinalMatches = matches.filter((match) => match.group_id === finalGroup.id);
        const decisiveMatch = getGrandFinalDecisiveMatch(((_b = stage.settings) == null ? void 0 : _b.grandFinal) || "none", grandFinalMatches);
        const grandFinalDoubleForfeitParticipants = getDoubleForfeitParticipants(participants, decisiveMatch);
        if (grandFinalDoubleForfeitParticipants) {
          grouped[0] = grandFinalDoubleForfeitParticipants;
        } else {
          grouped[0] = [findParticipant(participants, getFinalWinnerIfDefined(decisiveMatch))];
          grouped[1] = [findParticipant(participants, getLoser(decisiveMatch))];
        }
      }
      const losers = getLosers(participants, matches.filter((match) => match.group_id === loserBracket.id));
      grouped.push(...losers.reverse().filter((group) => group.length > 0));
      return makeFinalStandings(grouped);
    }
    /**
     * Returns only the data specific to the given stage (without the participants).
     * 
     * @param stageId ID of the stage.
     */
    async getStageSpecificData(stageId) {
      const groups = await this.storage.select("group", { stage_id: stageId });
      if (!groups) throw Error("Error getting groups.");
      const rounds = await this.storage.select("round", { stage_id: stageId });
      if (!rounds) throw Error("Error getting rounds.");
      const matches = await this.storage.select("match", { stage_id: stageId });
      if (!matches) throw Error("Error getting matches.");
      const matchGames = await this.matchGames(matches);
      return {
        groups,
        rounds,
        matches,
        matchGames
      };
    }
  };
  var getFinalWinnerIfDefined = (match) => {
    const winner = getWinner(match);
    if (!winner) throw Error("The final match does not have a winner.");
    return winner;
  };
  var getDoubleForfeitParticipants = (participants, match) => {
    if (!isDoubleForfeitCompleted(match))
      return null;
    return [
      findParticipant(participants, match.opponent1),
      findParticipant(participants, match.opponent2)
    ];
  };

  // src/update.ts
  var import_brackets_model5 = __toESM(require_dist());

  // src/base/updater.ts
  var import_brackets_model4 = __toESM(require_dist());
  var BaseUpdater = class _BaseUpdater extends BaseGetter {
    /**
     * Updates or resets the seeding of a stage.
     *
     * @param stageId ID of the stage.
     * @param seeding A new seeding or `null` to reset the existing seeding.
     * @param seeding.seeding Can contain names, IDs or BYEs.
     * @param seeding.seedingIds Can only contain IDs or BYEs.
     * @param keepSameSize Whether to keep the same size as before for the stage.
     */
    async updateSeeding(stageId, { seeding, seedingIds }, keepSameSize) {
      var _a, _b;
      const stage = await this.storage.select("stage", stageId);
      if (!stage) throw Error("Stage not found.");
      const newSize = keepSameSize ? stage.settings.size : (_b = (_a = seedingIds || seeding) == null ? void 0 : _a.length) != null ? _b : 0;
      const creator = new StageCreator(this.storage, {
        name: stage.name,
        tournamentId: stage.tournament_id,
        type: stage.type,
        settings: {
          ...stage.settings,
          ...newSize === 0 ? {} : { size: newSize }
          // Just reset the seeding if the new size is going to be empty.
        },
        ...seedingIds ? { seedingIds } : { seeding: seeding != null ? seeding : void 0 }
      });
      creator.setExisting(stageId, false);
      const method = BaseGetter.getSeedingOrdering(stage.type, creator);
      const slots = await creator.getSlots();
      const matches = await this.getSeedingMatches(stage.id, stage.type);
      if (!matches)
        throw Error("Error getting matches associated to the seeding.");
      const ordered = ordering[method](slots);
      _BaseUpdater.assertCanUpdateSeeding(matches, ordered);
      await creator.run();
    }
    /**
     * Confirms the current seeding of a stage.
     *
     * @param stageId ID of the stage.
     */
    async confirmCurrentSeeding(stageId) {
      const stage = await this.storage.select("stage", stageId);
      if (!stage) throw Error("Stage not found.");
      const get = new Get(this.storage);
      const currentSeeding = await get.seeding(stageId);
      const newSeeding = convertSlotsToSeeding(currentSeeding.map(convertTBDtoBYE));
      const creator = new StageCreator(this.storage, {
        name: stage.name,
        tournamentId: stage.tournament_id,
        type: stage.type,
        settings: stage.settings,
        seeding: newSeeding
      });
      creator.setExisting(stageId, true);
      await creator.run();
    }
    /**
     * Updates a parent match based on its child games.
     * 
     * @param parentId ID of the parent match.
     * @param inRoundRobin Indicates whether the parent match is in a round-robin stage.
     */
    async updateParentMatch(parentId, inRoundRobin) {
      const storedParent = await this.storage.select("match", parentId);
      if (!storedParent) throw Error("Parent not found.");
      const games = await this.storage.select("match_game", { parent_id: parentId });
      if (!games) throw Error("No match games.");
      const childResults = getChildGamesResults(games);
      const parent = getParentMatchResults(storedParent, childResults);
      setParentMatchCompleted(parent, childResults, storedParent.child_count, inRoundRobin);
      await this.updateMatch(storedParent, parent, true);
    }
    /**
     * Throws an error if a match is locked and the new seeding will change this match's participants.
     *
     * @param matches The matches stored in the database.
     * @param slots The slots to check from the new seeding.
     */
    static assertCanUpdateSeeding(matches, slots) {
      var _a, _b;
      let index = 0;
      for (const match of matches) {
        if (match.status === import_brackets_model4.Status.Archived)
          throw Error("A match of round 1 is archived, which means round 2 was started.");
        const opponent1 = slots[index++];
        const opponent2 = slots[index++];
        const isParticipantLocked = isMatchParticipantLocked(match);
        if (isParticipantLocked && (((_a = match.opponent1) == null ? void 0 : _a.id) !== (opponent1 == null ? void 0 : opponent1.id) || ((_b = match.opponent2) == null ? void 0 : _b.id) !== (opponent2 == null ? void 0 : opponent2.id)))
          throw Error("A match is locked.");
      }
    }
    /**
     * Updates the matches related (previous and next) to a match.
     *
     * @param match A match.
     * @param updatePrevious Whether to update the previous matches.
     * @param updateNext Whether to update the next matches.
     */
    async updateRelatedMatches(match, updatePrevious, updateNext) {
      if (match.round_id === void 0)
        return;
      const { roundNumber, roundCount } = await this.getRoundPositionalInfo(match.round_id);
      const stage = await this.storage.select("stage", match.stage_id);
      if (!stage) throw Error("Stage not found.");
      const group = await this.storage.select("group", match.group_id);
      if (!group) throw Error("Group not found.");
      const matchLocation = getMatchLocation(stage.type, group.number);
      updatePrevious && await this.updatePrevious(match, matchLocation, stage, roundNumber);
      updateNext && await this.updateNext(match, matchLocation, stage, roundNumber, roundCount);
    }
    /**
     * Updates a match based on a partial match.
     * 
     * @param stored A reference to what will be updated in the storage.
     * @param match Input of the update.
     * @param force Whether to force update locked matches.
     */
    async updateMatch(stored, match, force) {
      if (match.status === import_brackets_model4.Status.GameCancelled)
        throw Error("This status can only be used on match games with cancelMatchGame().");
      if (!force && isMatchUpdateLocked(stored))
        throw Error("The match is locked.");
      const stage = await this.storage.select("stage", stored.stage_id);
      if (!stage) throw Error("Stage not found.");
      const inRoundRobin = isRoundRobin(stage);
      const { statusChanged, resultChanged } = setMatchResults(stored, match, inRoundRobin);
      await this.applyMatchUpdate(stored);
      if (!statusChanged && !resultChanged) return;
      if (!inRoundRobin)
        await this.updateRelatedMatches(stored, statusChanged, resultChanged);
    }
    /**
     * Updates a match game based on a partial match game.
     * 
     * @param stored A reference to what will be updated in the storage.
     * @param game Input of the update.
     */
    async updateMatchGame(stored, game) {
      var _a, _b;
      if (game.status === import_brackets_model4.Status.GameCancelled)
        throw Error("Use cancelMatchGame() to cancel a match game with the right mode.");
      if (isMatchUpdateLocked(stored))
        throw Error("The match game is locked.");
      const stage = await this.storage.select("stage", stored.stage_id);
      if (!stage) throw Error("Stage not found.");
      const inRoundRobin = isRoundRobin(stage);
      const parent = await this.storage.select("match", stored.parent_id);
      if (!parent) throw Error("Parent not found.");
      if (isMatchUpdateLocked(parent))
        throw Error("The parent match of this match game is locked.");
      if (!inRoundRobin && ((_a = game.opponent1) == null ? void 0 : _a.forfeit) === true && ((_b = game.opponent2) == null ? void 0 : _b.forfeit) === true)
        throw Error("Use cancelMatchGame() to double-forfeit a match game.");
      setMatchResults(stored, game, inRoundRobin);
      if (!await this.storage.update("match_game", stored.id, stored))
        throw Error("Could not update the match game.");
      await this.updateParentMatch(stored.parent_id, inRoundRobin);
    }
    /**
     * Updates the opponents and status of a match and its child games.
     *
     * @param match A match.
     */
    async applyMatchUpdate(match) {
      if (!await this.storage.update("match", match.id, match))
        throw Error("Could not update the match.");
      if (match.child_count === 0) return;
      const updatedMatchGame = {
        opponent1: toResult(match.opponent1),
        opponent2: toResult(match.opponent2)
      };
      if (match.status <= import_brackets_model4.Status.Ready || match.status === import_brackets_model4.Status.Archived)
        updatedMatchGame.status = match.status;
      if (!await this.storage.update("match_game", { parent_id: match.id }, updatedMatchGame))
        throw Error("Could not update the match game.");
    }
    /**
     * Updates the match(es) leading to the current match based on this match results.
     *
     * @param match Input of the update.
     * @param matchLocation Location of the current match.
     * @param stage The parent stage.
     * @param roundNumber Number of the round.
     */
    async updatePrevious(match, matchLocation, stage, roundNumber) {
      const previousMatches = await this.getPreviousMatches(match, matchLocation, stage, roundNumber);
      if (previousMatches.length === 0) return;
      if (match.status >= import_brackets_model4.Status.Running)
        await this.archiveMatches(previousMatches);
      else
        await this.resetMatchesStatus(previousMatches);
    }
    /**
     * Sets the status of a list of matches to archived.
     *
     * @param matches The matches to update.
     */
    async archiveMatches(matches) {
      for (const match of matches) {
        if (match.status === import_brackets_model4.Status.Archived)
          continue;
        match.status = import_brackets_model4.Status.Archived;
        await this.applyMatchUpdate(match);
      }
    }
    /**
     * Resets the status of a list of matches to what it should currently be.
     *
     * @param matches The matches to update.
     */
    async resetMatchesStatus(matches) {
      for (const match of matches) {
        match.status = getMatchStatus(match);
        await this.applyMatchUpdate(match);
      }
    }
    /**
     * Updates the match(es) following the current match based on this match results.
     *
     * @param match Input of the update.
     * @param matchLocation Location of the current match.
     * @param stage The parent stage.
     * @param roundNumber Number of the round.
     * @param roundCount Count of rounds.
     */
    async updateNext(match, matchLocation, stage, roundNumber, roundCount) {
      const nextMatches = await this.getNextMatches(match, matchLocation, stage, roundNumber, roundCount);
      if (nextMatches.length === 0) {
        return;
      }
      const outcome = getMatchOutcome(match);
      const actualRoundNumber = stage.settings.skipFirstRound && matchLocation === "winner_bracket" ? roundNumber + 1 : roundNumber;
      if (outcome === "double_forfeit")
        await this.applyToNextMatches(setNextOpponentToBye, match, matchLocation, actualRoundNumber, roundCount, nextMatches);
      else if (outcome)
        await this.applyToNextMatches(setNextOpponent, match, matchLocation, actualRoundNumber, roundCount, nextMatches, outcome);
      else
        await this.applyToNextMatches(resetNextOpponent, match, matchLocation, actualRoundNumber, roundCount, nextMatches);
    }
    /**
     * Applies a `SetNextOpponent` function to matches following the current match.
     * 
     * - `nextMatches[0]` is assumed to be next match for the winner of the current match.
     * - `nextMatches[1]` is assumed to be next match for the loser of the current match.
     * 
     * @param setNextOpponent The `SetNextOpponent` function.
     * @param match The current match.
     * @param matchLocation Location of the current match.
     * @param roundNumber Number of the current round.
     * @param roundCount Count of rounds.
     * @param nextMatches The matches following the current match.
     * @param winnerSide Side of the winner in the current match.
     */
    async applyToNextMatches(setNextOpponent2, match, matchLocation, roundNumber, roundCount, nextMatches, winnerSide) {
      if (matchLocation === "final_group") {
        if (!nextMatches[0]) throw Error("First next match is null.");
        setNextOpponent2(nextMatches[0], "opponent1", match, "opponent1");
        setNextOpponent2(nextMatches[0], "opponent2", match, "opponent2");
        await this.applyMatchUpdate(nextMatches[0]);
        return;
      }
      const nextSide = getNextSide(match.number, roundNumber, roundCount, matchLocation);
      if (nextMatches[0]) {
        setNextOpponent2(nextMatches[0], nextSide, match, winnerSide);
        await this.propagateByeWinners(nextMatches[0]);
      }
      if (nextMatches.length !== 2) return;
      if (!nextMatches[1]) throw Error("Second next match is null.");
      if (matchLocation === "single_bracket") {
        setNextOpponent2(nextMatches[1], nextSide, match, winnerSide && getOtherSide(winnerSide));
        await this.applyMatchUpdate(nextMatches[1]);
      } else if (matchLocation === "winner_bracket") {
        const nextSideIntoLB = getNextSideLoserBracket(match.number, nextMatches[1], roundNumber);
        setNextOpponent2(nextMatches[1], nextSideIntoLB, match, winnerSide && getOtherSide(winnerSide));
        await this.propagateByeWinners(nextMatches[1]);
      } else if (matchLocation === "loser_bracket") {
        const nextSideIntoConsolationFinal = getNextSideConsolationFinalDoubleElimination(roundNumber);
        setNextOpponent2(nextMatches[1], nextSideIntoConsolationFinal, match, winnerSide && getOtherSide(winnerSide));
        await this.propagateByeWinners(nextMatches[1]);
      }
    }
    /**
     * Propagates winner against BYEs in related matches.
     * 
     * @param match The current match.
     */
    async propagateByeWinners(match) {
      setMatchResults(match, match, false);
      await this.applyMatchUpdate(match);
      if (hasBye(match))
        await this.updateRelatedMatches(match, true, true);
    }
  };

  // src/update.ts
  var Update = class extends BaseUpdater {
    /**
     * Updates partial information of a match. Its id must be given.
     *
     * This will update related matches accordingly.
     *
     * @param match Values to change in a match.
     */
    async match(match) {
      if (match.id === void 0)
        throw Error("No match id given.");
      const stored = await this.storage.select("match", match.id);
      if (!stored) throw Error("Match not found.");
      await this.updateMatch(stored, match);
    }
    /**
     * Updates partial information of a match game. Its id must be given.
     *
     * This will update the parent match accordingly.
     *
     * @param game Values to change in a match game.
     */
    async matchGame(game) {
      const stored = await this.findMatchGame(game);
      await this.updateMatchGame(stored, game);
    }
    /**
     * Cancels a match game.
     *
     * @param gameId ID of the match game.
     * @param options Options for cancelling a match game.
     */
    async cancelMatchGame(gameId, options) {
      const stored = await this.storage.select("match_game", gameId);
      if (!stored) throw Error("Match game not found.");
      if (!options || options.mode !== "spent_game" && options.mode !== "double_forfeit")
        throw Error("Invalid match game cancellation mode.");
      if (isMatchUpdateLocked(stored))
        throw Error("The match game is locked.");
      const parent = await this.storage.select("match", stored.parent_id);
      if (!parent) throw Error("Parent not found.");
      if (parent.status === import_brackets_model5.Status.Archived || isDoubleForfeitCompleted(parent))
        throw Error("The match game is locked.");
      stored.status = import_brackets_model5.Status.GameCancelled;
      if (stored.opponent1) {
        delete stored.opponent1.score;
        delete stored.opponent1.result;
        if (options.mode === "double_forfeit") stored.opponent1.forfeit = true;
        else delete stored.opponent1.forfeit;
      }
      if (stored.opponent2) {
        delete stored.opponent2.score;
        delete stored.opponent2.result;
        if (options.mode === "double_forfeit") stored.opponent2.forfeit = true;
        else delete stored.opponent2.forfeit;
      }
      if (!await this.storage.update("match_game", stored.id, stored))
        throw Error("Could not update the match game.");
      if (options.mode === "double_forfeit") {
        await this.updateMatch(parent, {
          opponent1: { forfeit: true },
          opponent2: { forfeit: true }
        }, true);
        return;
      }
      const stage = await this.storage.select("stage", stored.stage_id);
      if (!stage) throw Error("Stage not found.");
      await this.updateParentMatch(stored.parent_id, isRoundRobin(stage));
    }
    /**
     * Updates the seed ordering of every ordered round in a stage.
     *
     * @param stageId ID of the stage.
     * @param seedOrdering A list of ordering methods.
     */
    async ordering(stageId, seedOrdering) {
      const stage = await this.storage.select("stage", stageId);
      if (!stage) throw Error("Stage not found.");
      ensureNotRoundRobin(stage);
      const roundsToOrder = await this.getOrderedRounds(stage);
      if (seedOrdering.length !== roundsToOrder.length)
        throw Error("The count of seed orderings is incorrect.");
      for (let i = 0; i < roundsToOrder.length; i++)
        await this.updateRoundOrdering(roundsToOrder[i], seedOrdering[i]);
    }
    /**
     * Updates the seed ordering of a round.
     *
     * @param roundId ID of the round.
     * @param method Seed ordering method.
     */
    async roundOrdering(roundId, method) {
      const round = await this.storage.select("round", roundId);
      if (!round) throw Error("This round does not exist.");
      const stage = await this.storage.select("stage", round.stage_id);
      if (!stage) throw Error("Stage not found.");
      ensureNotRoundRobin(stage);
      await this.updateRoundOrdering(round, method);
    }
    /**
     * Updates child count of all matches of a given level.
     *
     * @param level The level at which to act.
     * @param id ID of the chosen level.
     * @param childCount The target child count.
     */
    async matchChildCount(level, id, childCount) {
      switch (level) {
        case "stage":
          await this.updateStageMatchChildCount(id, childCount);
          break;
        case "group":
          await this.updateGroupMatchChildCount(id, childCount);
          break;
        case "round":
          await this.updateRoundMatchChildCount(id, childCount);
          break;
        case "match":
          const match = await this.storage.select("match", id);
          if (!match) throw Error("Match not found.");
          await this.adjustMatchChildGames(match, childCount);
          break;
        default:
          throw Error("Unknown child count level.");
      }
    }
    /**
     * Updates the seeding of a stage.
     *
     * @param stageId ID of the stage.
     * @param seeding The new seeding.
     * @param keepSameSize Whether to keep the same size as before for the stage. **Default:** false.
     */
    async seeding(stageId, seeding, keepSameSize = false) {
      await this.updateSeeding(stageId, { seeding }, keepSameSize);
    }
    /**
     * Updates the seeding of a stage (with a list of IDs).
     *
     * @param stageId ID of the stage.
     * @param seedingIds The new seeding, containing only IDs.
     * @param keepSameSize Whether to keep the same size as before for the stage. **Default:** false.
     */
    async seedingIds(stageId, seedingIds, keepSameSize = false) {
      await this.updateSeeding(stageId, { seedingIds }, keepSameSize);
    }
    /**
     * Confirms the seeding of a stage.
     * 
     * This will convert TBDs to BYEs and propagate them.
     * 
     * @param stageId ID of the stage.
     */
    async confirmSeeding(stageId) {
      await this.confirmCurrentSeeding(stageId);
    }
    /**
     * Update the seed ordering of a round.
     *
     * @param round The round of which to update the ordering.
     * @param method The new ordering method.
     */
    async updateRoundOrdering(round, method) {
      const matches = await this.storage.select("match", { round_id: round.id });
      if (!matches) throw Error("This round has no match.");
      if (matches.some((match) => match.status > import_brackets_model5.Status.Ready))
        throw Error("At least one match has started or is completed.");
      const stage = await this.storage.select("stage", round.stage_id);
      if (!stage) throw Error("Stage not found.");
      if (stage.settings.size === void 0) throw Error("Undefined stage size.");
      const group = await this.storage.select("group", round.group_id);
      if (!group) throw Error("Group not found.");
      const inLoserBracket = isLoserBracket(stage.type, group.number);
      const roundCountLB = getLowerBracketRoundCount(stage.settings.size);
      const seeds = getSeeds(inLoserBracket, round.number, roundCountLB, matches.length);
      const positions = ordering[method](seeds);
      await this.applyRoundOrdering(round.number, matches, positions);
    }
    /**
     * Updates child count of all matches of a stage.
     *
     * @param stageId ID of the stage.
     * @param childCount The target child count.
     */
    async updateStageMatchChildCount(stageId, childCount) {
      if (!await this.storage.update("match", { stage_id: stageId }, { child_count: childCount }))
        throw Error("Could not update the match.");
      const matches = await this.storage.select("match", { stage_id: stageId });
      if (!matches) throw Error("This stage has no match.");
      for (const match of matches)
        await this.adjustMatchChildGames(match, childCount);
    }
    /**
     * Updates child count of all matches of a group.
     *
     * @param groupId ID of the group.
     * @param childCount The target child count.
     */
    async updateGroupMatchChildCount(groupId, childCount) {
      if (!await this.storage.update("match", { group_id: groupId }, { child_count: childCount }))
        throw Error("Could not update the match.");
      const matches = await this.storage.select("match", { group_id: groupId });
      if (!matches) throw Error("This group has no match.");
      for (const match of matches)
        await this.adjustMatchChildGames(match, childCount);
    }
    /**
     * Updates child count of all matches of a round.
     *
     * @param roundId ID of the round.
     * @param childCount The target child count.
     */
    async updateRoundMatchChildCount(roundId, childCount) {
      if (!await this.storage.update("match", { round_id: roundId }, { child_count: childCount }))
        throw Error("Could not update the match.");
      const matches = await this.storage.select("match", { round_id: roundId });
      if (!matches) throw Error("This round has no match.");
      for (const match of matches)
        await this.adjustMatchChildGames(match, childCount);
    }
    /**
     * Updates the ordering of participants in a round's matches.
     *
     * @param roundNumber The number of the round.
     * @param matches The matches of the round.
     * @param positions The new positions.
     */
    async applyRoundOrdering(roundNumber, matches, positions) {
      for (const match of matches) {
        const updated = { ...match };
        updated.opponent1 = findPosition(matches, positions.shift());
        if (roundNumber === 1)
          updated.opponent2 = findPosition(matches, positions.shift());
        if (!await this.storage.update("match", updated.id, updated))
          throw Error("Could not update the match.");
      }
    }
    /**
     * Adds or deletes match games of a match based on a target child count.
     *
     * @param match The match of which child games need to be adjusted.
     * @param targetChildCount The target child count.
     */
    async adjustMatchChildGames(match, targetChildCount) {
      const games = await this.storage.select("match_game", { parent_id: match.id });
      let childCount = games ? games.length : 0;
      while (childCount < targetChildCount) {
        const id = await this.storage.insert("match_game", {
          number: childCount + 1,
          stage_id: match.stage_id,
          parent_id: match.id,
          status: match.status,
          opponent1: { id: null },
          opponent2: { id: null }
        });
        if (id === -1)
          throw Error("Could not adjust the match games when inserting.");
        childCount++;
      }
      while (childCount > targetChildCount) {
        const deleted = await this.storage.delete("match_game", {
          parent_id: match.id,
          number: childCount
        });
        if (!deleted)
          throw Error("Could not adjust the match games when deleting.");
        childCount--;
      }
      if (!await this.storage.update("match", match.id, { ...match, child_count: targetChildCount }))
        throw Error("Could not update the match.");
    }
  };

  // src/delete.ts
  var Delete = class {
    /**
     * Creates an instance of Delete, which will handle cleanly deleting data in the storage.
     *
     * @param storage The implementation of Storage.
     */
    constructor(storage) {
      this.storage = storage;
    }
    /**
     * Deletes a stage, and all its components:
     * 
     * - Groups
     * - Rounds
     * - Matches
     * - Match games
     * 
     * This does not delete the related participants.
     *
     * @param stageId ID of the stage.
     */
    async stage(stageId) {
      if (!await this.storage.delete("match_game", { stage_id: stageId }))
        throw Error("Could not delete match games.");
      if (!await this.storage.delete("match", { stage_id: stageId }))
        throw Error("Could not delete matches.");
      if (!await this.storage.delete("round", { stage_id: stageId }))
        throw Error("Could not delete rounds.");
      if (!await this.storage.delete("group", { stage_id: stageId }))
        throw Error("Could not delete groups.");
      if (!await this.storage.delete("stage", { id: stageId }))
        throw Error("Could not delete the stage.");
    }
    /**
     * Deletes **the stages** of a tournament (and all their components, see {@link stage | delete.stage()}).
     * 
     * This does not delete the related participants and you are responsible for deleting the tournament itself.
     * 
     * @param tournamentId ID of the tournament.
     */
    async tournament(tournamentId) {
      const stages = await this.storage.select("stage", { tournament_id: tournamentId });
      if (!stages)
        throw Error("Error getting the stages.");
      for (const stage of stages)
        await this.stage(stage.id);
    }
  };

  // src/find.ts
  var Find = class extends BaseGetter {
    /**
     * Gets the upper bracket (the only bracket if single elimination or the winner bracket in double elimination).
     *
     * @param stageId ID of the stage.
     */
    async upperBracket(stageId) {
      const stage = await this.storage.select("stage", stageId);
      if (!stage) throw Error("Stage not found.");
      switch (stage.type) {
        case "round_robin":
          throw Error("Round-robin stages do not have an upper bracket.");
        case "single_elimination":
        case "double_elimination":
          return this.getUpperBracket(stageId);
        default:
          throw Error("Unknown stage type.");
      }
    }
    /**
     * Gets the loser bracket.
     *
     * @param stageId ID of the stage.
     */
    async loserBracket(stageId) {
      const stage = await this.storage.select("stage", stageId);
      if (!stage) throw Error("Stage not found.");
      switch (stage.type) {
        case "round_robin":
          throw Error("Round-robin stages do not have a loser bracket.");
        case "single_elimination":
          throw Error("Single elimination stages do not have a loser bracket.");
        case "double_elimination":
          const group = await this.getLoserBracket(stageId);
          if (!group) throw Error("Loser bracket not found.");
          return group;
        default:
          throw Error("Unknown stage type.");
      }
    }
    /**
     * Returns the matches leading to the given match.
     * 
     * If a `participantId` is given, the previous match _from their point of view_ is returned.
     * 
     * @param matchId ID of the target match.
     * @param participantId Optional ID of the participant.
     */
    async previousMatches(matchId, participantId) {
      const match = await this.storage.select("match", matchId);
      if (!match) throw Error("Match not found.");
      const stage = await this.storage.select("stage", match.stage_id);
      if (!stage) throw Error("Stage not found.");
      const group = await this.storage.select("group", match.group_id);
      if (!group) throw Error("Group not found.");
      const round = await this.storage.select("round", match.round_id);
      if (!round) throw Error("Round not found.");
      const matchLocation = getMatchLocation(stage.type, group.number);
      const previousMatches = await this.getPreviousMatches(match, matchLocation, stage, round.number);
      if (participantId !== void 0)
        return previousMatches.filter((m) => isParticipantInMatch(m, participantId));
      return previousMatches;
    }
    /**
     * Returns the matches following the given match.
     * 
     * If a `participantId` is given:
     * - If the participant won, the next match _from their point of view_ is returned.
     * - If the participant is eliminated, no match is returned.
     * 
     * @param matchId ID of the target match.
     * @param participantId Optional ID of the participant.
     */
    async nextMatches(matchId, participantId) {
      const match = await this.storage.select("match", matchId);
      if (!match) throw Error("Match not found.");
      const stage = await this.storage.select("stage", match.stage_id);
      if (!stage) throw Error("Stage not found.");
      const group = await this.storage.select("group", match.group_id);
      if (!group) throw Error("Group not found.");
      const { roundNumber, roundCount } = await this.getRoundPositionalInfo(match.round_id);
      const matchLocation = getMatchLocation(stage.type, group.number);
      const nextMatches = getNonNull(
        await this.getNextMatches(match, matchLocation, stage, roundNumber, roundCount)
      );
      if (participantId !== void 0) {
        if (!isParticipantInMatch(match, participantId))
          throw Error("The participant does not belong to this match.");
        if (!isMatchStale(match))
          throw Error("The match is not stale yet, so it is not possible to conclude the next matches for this participant.");
        const loser = getLoser(match);
        if (stage.type === "single_elimination" && (loser == null ? void 0 : loser.id) === participantId)
          return [];
        if (stage.type === "double_elimination") {
          const { winnerBracketMatch, loserBracketMatch, finalGroupMatch } = await this.getMatchesByGroupDoubleElimination(nextMatches, /* @__PURE__ */ new Map([[group.id, group]]));
          const winner = getWinner(match);
          if (matchLocation === "loser_bracket") {
            if (participantId === (loser == null ? void 0 : loser.id))
              return [];
            if (participantId === (winner == null ? void 0 : winner.id))
              return loserBracketMatch ? [loserBracketMatch] : [];
          } else if (matchLocation === "winner_bracket") {
            if (!loserBracketMatch)
              throw Error("All matches of winner bracket should lead to loser bracket.");
            if (participantId === (loser == null ? void 0 : loser.id))
              return [loserBracketMatch];
            if (participantId === (winner == null ? void 0 : winner.id))
              return winnerBracketMatch ? [winnerBracketMatch] : [];
          } else if (matchLocation === "final_group") {
            if (!finalGroupMatch)
              throw Error("All matches of a final group should also lead to the final group.");
            return [finalGroupMatch];
          }
        }
      }
      return nextMatches;
    }
    /**
     * Finds a match in a given group. The match must have the given number in a round of which the number in group is given.
     *
     * **Example:** In group of id 1, give me the 4th match in the 3rd round.
     *
     * @param groupId ID of the group.
     * @param roundNumber Number of the round in its parent group.
     * @param matchNumber Number of the match in its parent round.
     */
    async match(groupId, roundNumber, matchNumber) {
      return this.findMatch(groupId, roundNumber, matchNumber);
    }
    /**
     * Finds a match game based on its `id` or based on the combination of its `parent_id` and `number`.
     * 
     * @param game Values to change in a match game.
     */
    async matchGame(game) {
      return this.findMatchGame(game);
    }
    /**
     * Returns an object with 1 match per group type. Only supports double elimination.
     *
     * @param matches A list of matches.
     * @param fetchedGroups A map of groups which were already fetched.
     */
    async getMatchesByGroupDoubleElimination(matches, fetchedGroups) {
      var _a, _b, _c;
      const getGroup = async (groupId) => {
        const existing = fetchedGroups.get(groupId);
        if (existing)
          return existing;
        const group = await this.storage.select("group", groupId);
        if (!group) throw Error("Group not found.");
        fetchedGroups.set(groupId, group);
        return group;
      };
      let matchByGroupType = {};
      for (const match of matches) {
        const group = await getGroup(match.group_id);
        matchByGroupType = {
          winnerBracketMatch: (_a = matchByGroupType["winnerBracketMatch"]) != null ? _a : isWinnerBracket("double_elimination", group.number) ? match : void 0,
          loserBracketMatch: (_b = matchByGroupType["loserBracketMatch"]) != null ? _b : isLoserBracket("double_elimination", group.number) ? match : void 0,
          finalGroupMatch: (_c = matchByGroupType["finalGroupMatch"]) != null ? _c : isFinalGroup("double_elimination", group.number) ? match : void 0
        };
      }
      return matchByGroupType;
    }
  };

  // src/reset.ts
  var import_brackets_model6 = __toESM(require_dist());
  var Reset = class extends BaseUpdater {
    /**
     * Resets the results of a match: the match `status`, and each opponent's `forfeit` and `result` properties.
     * 
     * After resetting the results, you can update the match scores and complete the match again.
     *
     * This will update related matches accordingly.
     *
     * @param matchId ID of the match.
     */
    async matchResults(matchId) {
      const stored = await this.storage.select("match", matchId);
      if (!stored) throw Error("Match not found.");
      if (!isMatchForfeitCompleted(stored) && stored.child_count > 0)
        throw Error("The parent match is controlled by its child games and its result cannot be reset.");
      const stage = await this.storage.select("stage", stored.stage_id);
      if (!stage) throw Error("Stage not found.");
      const group = await this.storage.select("group", stored.group_id);
      if (!group) throw Error("Group not found.");
      const { roundNumber, roundCount } = await this.getRoundPositionalInfo(stored.round_id);
      const matchLocation = getMatchLocation(stage.type, group.number);
      const nextMatches = await this.getNextMatches(stored, matchLocation, stage, roundNumber, roundCount);
      if (nextMatches.some((match) => match && match.status >= import_brackets_model6.Status.Running && !isMatchByeCompleted(match)))
        throw Error("The match is locked.");
      resetMatchResults(stored);
      await this.applyMatchUpdate(stored);
      if (!isRoundRobin(stage))
        await this.updateRelatedMatches(stored, true, true);
    }
    /**
     * Resets the results of a match game.
     *
     * @param gameId ID of the match game.
     */
    async matchGameResults(gameId) {
      const stored = await this.storage.select("match_game", gameId);
      if (!stored) throw Error("Match game not found.");
      const stage = await this.storage.select("stage", stored.stage_id);
      if (!stage) throw Error("Stage not found.");
      const inRoundRobin = isRoundRobin(stage);
      resetMatchResults(stored);
      if (!await this.storage.update("match_game", stored.id, stored))
        throw Error("Could not update the match game.");
      await this.updateParentMatch(stored.parent_id, inRoundRobin);
    }
    /**
     * Resets the seeding of a stage.
     *
     * @param stageId ID of the stage.
     */
    async seeding(stageId) {
      await this.updateSeeding(stageId, { seeding: null }, false);
    }
  };

  // node_modules/uuid/dist/esm-browser/rng.js
  var getRandomValues;
  var rnds8 = new Uint8Array(16);
  function rng() {
    if (!getRandomValues) {
      getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
      if (!getRandomValues) {
        throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
      }
    }
    return getRandomValues(rnds8);
  }

  // node_modules/uuid/dist/esm-browser/stringify.js
  var byteToHex = [];
  for (let i = 0; i < 256; ++i) {
    byteToHex.push((i + 256).toString(16).slice(1));
  }
  function unsafeStringify(arr, offset = 0) {
    return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
  }

  // node_modules/uuid/dist/esm-browser/native.js
  var randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
  var native_default = {
    randomUUID
  };

  // node_modules/uuid/dist/esm-browser/v4.js
  function v4(options, buf, offset) {
    if (native_default.randomUUID && !buf && !options) {
      return native_default.randomUUID();
    }
    options = options || {};
    const rnds = options.random || (options.rng || rng)();
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = rnds[i];
      }
      return buf;
    }
    return unsafeStringify(rnds);
  }
  var v4_default = v4;

  // src/manager.ts
  var BracketsManager = class extends import_events.EventEmitter {
    /**
     * Creates an instance of BracketsManager, which will handle all the stuff from the library.
     *
     * @param storageInterface An implementation of CrudInterface.
     * @param verbose Whether to log CRUD operations.
     */
    constructor(storageInterface, verbose) {
      super();
      this.verbose = false;
      this.verbose = verbose != null ? verbose : false;
      this.storage = storageInterface;
      this.instrumentStorage();
      this.storage.selectFirst = async (table, filter, assertUnique = true) => {
        var _a;
        const results = await this.storage.select(table, filter);
        if (!results || results.length === 0)
          return null;
        if (assertUnique && results.length > 1)
          throw Error(`Selecting ${JSON.stringify(filter)} on table "${table}" must return a unique value.`);
        return (_a = results[0]) != null ? _a : null;
      };
      this.storage.selectLast = async (table, filter, assertUnique = true) => {
        var _a;
        const results = await this.storage.select(table, filter);
        if (!results || results.length === 0) return null;
        if (assertUnique && results.length > 1)
          throw Error(`Selecting ${JSON.stringify(filter)} on table "${table}" must return a unique value.`);
        return (_a = results[results.length - 1]) != null ? _a : null;
      };
      const create = new Create(this.storage);
      const createStageFunction = create.stage.bind(this);
      this.create = Object.assign(createStageFunction, { stage: createStageFunction });
      this.get = new Get(this.storage);
      this.update = new Update(this.storage);
      this.delete = new Delete(this.storage);
      this.find = new Find(this.storage);
      this.reset = new Reset(this.storage);
    }
    /**
     * Imports data in the database.
     *
     * @param data Data to import.
     * @param normalizeIds Enable ID normalization: all IDs (and references to them) are remapped to consecutive IDs starting from 0.
     */
    async import(data, normalizeIds2 = false) {
      if (normalizeIds2)
        data = normalizeIds(data);
      if (!await this.storage.delete("participant"))
        throw Error("Could not empty the participant table.");
      if (!await this.storage.insert("participant", data.participant))
        throw Error("Could not import participants.");
      if (!await this.storage.delete("stage"))
        throw Error("Could not empty the stage table.");
      if (!await this.storage.insert("stage", data.stage))
        throw Error("Could not import stages.");
      if (!await this.storage.delete("group"))
        throw Error("Could not empty the group table.");
      if (!await this.storage.insert("group", data.group))
        throw Error("Could not import groups.");
      if (!await this.storage.delete("round"))
        throw Error("Could not empty the round table.");
      if (!await this.storage.insert("round", data.round))
        throw Error("Could not import rounds.");
      if (!await this.storage.delete("match"))
        throw Error("Could not empty the match table.");
      if (!await this.storage.insert("match", data.match))
        throw Error("Could not import matches.");
      if (!await this.storage.delete("match_game"))
        throw Error("Could not empty the match_game table.");
      if (!await this.storage.insert("match_game", data.match_game))
        throw Error("Could not import match games.");
    }
    /**
     * Exports data from the database.
     */
    async export() {
      const participants = await this.storage.select("participant");
      if (!participants) throw Error("Error getting participants.");
      const stages = await this.storage.select("stage");
      if (!stages) throw Error("Error getting stages.");
      const groups = await this.storage.select("group");
      if (!groups) throw Error("Error getting groups.");
      const rounds = await this.storage.select("round");
      if (!rounds) throw Error("Error getting rounds.");
      const matches = await this.storage.select("match");
      if (!matches) throw Error("Error getting matches.");
      const matchGames = await this.get.matchGames(matches);
      return {
        participant: participants,
        stage: stages,
        group: groups,
        round: rounds,
        match: matches,
        match_game: matchGames
      };
    }
    /**
     * Add `console.log()` to storage methods in verbose mode.
     */
    instrumentStorage() {
      const storage = this.storage;
      const instrumentedMethods = ["insert", "select", "update", "delete"];
      for (const method of Object.getOwnPropertyNames(Object.getPrototypeOf(storage))) {
        if (!instrumentedMethods.includes(method))
          continue;
        const originalMethod = storage[method].bind(storage);
        storage[method] = async (table, ...args) => {
          const verbose = this.verbose;
          const mutationMethod = isStorageMutation(method) ? method : void 0;
          const shouldEmit = mutationMethod !== void 0 && this.listenerCount("entity.changed") > 0;
          const shouldTrack = verbose || shouldEmit;
          let id;
          let start;
          if (shouldTrack) {
            id = v4_default();
            start = Date.now();
          }
          if (verbose)
            console.log(`${id} ${method.toUpperCase()} "${table}" args: ${JSON.stringify(args)}`);
          const result = await originalMethod(table, ...args);
          if (shouldTrack) {
            const duration = Date.now() - start;
            if (shouldEmit && isSuccessfulStorageMutation(mutationMethod, result))
              emitStorageMutationEvent(this, { id, method: mutationMethod, table, args, result, duration });
            if (verbose)
              console.log(`${id} ${duration}ms - Returned ${JSON.stringify(result)}`);
          }
          return result;
        };
      }
    }
  };
  function emitStorageMutationEvent(manager, event) {
    manager.emit("entity.changed", event);
  }
  function isSuccessfulStorageMutation(method, result) {
    if (method === "insert")
      return result !== false && result !== -1;
    return result === true;
  }
  function isStorageMutation(method) {
    return method === "insert" || method === "update" || method === "delete";
  }

  // browser-entry.ts
  var import_brackets_memory_db = __toESM(require_dist2());
  window.BracketsManagerLib = { BracketsManager, InMemoryDatabase: import_brackets_memory_db.InMemoryDatabase, helpers: helpers_exports };
})();
