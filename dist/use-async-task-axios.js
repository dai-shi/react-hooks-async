"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.define-properties");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAxios = exports.useAsyncTaskAxios = void 0;

require("regenerator-runtime/runtime");

var _react = require("react");

var _useAsyncTask = require("./use-async-task");

var _useAsyncRun = require("./use-async-run");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useAsyncTaskAxios = function useAsyncTaskAxios(axios, config) {
  return (0, _useAsyncTask.useAsyncTask)((0, _react.useCallback)(function _callee(abortController, configOverride) {
    var source, error;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            source = axios.CancelToken.source();
            abortController.signal.addEventListener('abort', function () {
              source.cancel('canceled');
            });
            _context.prev = 2;
            _context.next = 5;
            return regeneratorRuntime.awrap(axios(_objectSpread({}, config, {}, configOverride, {
              cancelToken: source.token
            })));

          case 5:
            return _context.abrupt("return", _context.sent);

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](2);

            if (!axios.isCancel(_context.t0)) {
              _context.next = 14;
              break;
            }

            error = new Error(_context.t0.message);
            error.name = 'AbortError';
            throw error;

          case 14:
            throw _context.t0;

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[2, 8]]);
  }, [axios, config]));
};

exports.useAsyncTaskAxios = useAsyncTaskAxios;

var useAxios = function useAxios() {
  var asyncTask = useAsyncTaskAxios.apply(void 0, arguments);
  (0, _useAsyncRun.useAsyncRun)(asyncTask);
  return asyncTask;
};

exports.useAxios = useAxios;