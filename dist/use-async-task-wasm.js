"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.define-properties");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useWasm = exports.useAsyncTaskWasm = void 0;

require("regenerator-runtime/runtime");

var _react = require("react");

var _useAsyncTask = require("./use-async-task");

var _useAsyncRun = require("./use-async-run");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var defaultImportObject = {};

var useAsyncTaskWasm = function useAsyncTaskWasm(input) {
  var importObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultImportObject;
  return (0, _useAsyncTask.useAsyncTask)((0, _react.useCallback)(function _callee(abortController, inputOverride) {
    var inputToUse, response, results;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            inputToUse = _typeof(input) === 'object' && _typeof(inputOverride) === 'object' ? _objectSpread({}, input, {}, inputOverride) : inputOverride || input;
            _context.next = 3;
            return regeneratorRuntime.awrap(fetch(inputToUse, {
              signal: abortController.signal
            }));

          case 3:
            response = _context.sent;

            if (response.ok) {
              _context.next = 6;
              break;
            }

            throw new Error(response.statusText);

          case 6:
            _context.next = 8;
            return regeneratorRuntime.awrap(WebAssembly.instantiateStreaming(response, importObject));

          case 8:
            results = _context.sent;
            return _context.abrupt("return", results.instance);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    });
  }, [input, importObject]));
};

exports.useAsyncTaskWasm = useAsyncTaskWasm;

var useWasm = function useWasm() {
  var asyncTask = useAsyncTaskWasm.apply(void 0, arguments);
  (0, _useAsyncRun.useAsyncRun)(asyncTask);
  return asyncTask;
};

exports.useWasm = useWasm;