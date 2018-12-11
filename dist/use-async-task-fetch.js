"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.useAsyncTaskFetch = void 0;

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.promise");

require("regenerator-runtime/runtime");

var _useAsyncTask = require("./use-async-task");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var defaultInit = {};

var defaultReadBody = function defaultReadBody(body) {
  return body.json();
};

var createFetchError = function createFetchError(message) {
  var err = new Error(message);
  err.name = 'FetchError';
  return err;
};

var useAsyncTaskFetch = function useAsyncTaskFetch(input) {
  var init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultInit;
  var readBody = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultReadBody;
  return (0, _useAsyncTask.useAsyncTask)(
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(abortController) {
      var response, body;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return fetch(input, _objectSpread({
                signal: abortController.signal
              }, init));

            case 2:
              response = _context.sent;

              if (response.ok) {
                _context.next = 5;
                break;
              }

              throw createFetchError(response.statusText);

            case 5:
              _context.next = 7;
              return readBody(response);

            case 7:
              body = _context.sent;
              return _context.abrupt("return", body);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }(), [input, init, readBody]);
};

exports.useAsyncTaskFetch = useAsyncTaskFetch;
var _default = useAsyncTaskFetch;
exports.default = _default;