"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.concat");

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
exports.useFetch = exports.useAsyncTaskFetch = void 0;

require("regenerator-runtime/runtime");

var _react = require("react");

var _useAsyncTask = require("./use-async-task");

var _useAsyncRun = require("./use-async-run");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var defaultInit = {};

var defaultReadBody = function defaultReadBody(body) {
  return body.json();
};

var createFetchError = function createFetchError(response, responseBody) {
  var err = new Error("".concat(response.statusCode, " ").concat(response.statusText));
  err.name = 'FetchError';
  err.response = response;
  err.responseBody = responseBody;
  return err;
};

var safeReadBody = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(readBody, response) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return readBody(response);

          case 3:
            return _context.abrupt("return", _context.sent);

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", null);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 6]]);
  }));

  return function safeReadBody(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var useAsyncTaskFetch = function useAsyncTaskFetch(input) {
  var init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultInit;
  var argReadBody = arguments.length > 2 ? arguments[2] : undefined;
  // a workaround for terser (#19)
  var readBody = argReadBody || defaultReadBody;
  return (0, _useAsyncTask.useAsyncTask)((0, _react.useCallback)( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(abortController, inputOverride, initOverride) {
      var response, responseBody, body;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return fetch(inputOverride || input, _objectSpread({}, init, {}, initOverride, {
                signal: abortController.signal
              }));

            case 2:
              response = _context2.sent;

              if (response.ok) {
                _context2.next = 8;
                break;
              }

              _context2.next = 6;
              return safeReadBody(readBody, response);

            case 6:
              responseBody = _context2.sent;
              throw createFetchError(response, responseBody);

            case 8:
              _context2.next = 10;
              return readBody(response);

            case 10:
              body = _context2.sent;
              return _context2.abrupt("return", body);

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x3, _x4, _x5) {
      return _ref2.apply(this, arguments);
    };
  }(), [input, init, readBody]));
};

exports.useAsyncTaskFetch = useAsyncTaskFetch;

var useFetch = function useFetch() {
  var asyncTask = useAsyncTaskFetch.apply(void 0, arguments);
  (0, _useAsyncRun.useAsyncRun)(asyncTask);
  return asyncTask;
};

exports.useFetch = useFetch;