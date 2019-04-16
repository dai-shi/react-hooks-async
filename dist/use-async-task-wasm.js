"use strict";

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.useWasm = exports.useAsyncTaskWasm = void 0;

require("regenerator-runtime/runtime");

var _useAsyncTask = require("./use-async-task");

var _useAsyncRun = require("./use-async-run");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var defaultImportObject = {};

var useAsyncTaskWasm = function useAsyncTaskWasm(input) {
  var importObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultImportObject;
  return (0, _useAsyncTask.useAsyncTask)(
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(abortController) {
      var response, results;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return fetch(input, {
                signal: abortController.signal
              });

            case 2:
              response = _context.sent;

              if (response.ok) {
                _context.next = 5;
                break;
              }

              throw new Error(response.statusText);

            case 5:
              _context.next = 7;
              return WebAssembly.instantiateStreaming(response, importObject);

            case 7:
              results = _context.sent;
              return _context.abrupt("return", results.instance);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }(), [input, importObject]);
};

exports.useAsyncTaskWasm = useAsyncTaskWasm;

var useWasm = function useWasm() {
  var asyncTask = useAsyncTaskWasm.apply(void 0, arguments);
  (0, _useAsyncRun.useAsyncRun)(asyncTask);
  return asyncTask;
};

exports.useWasm = useWasm;
var _default = useAsyncTaskWasm;
exports["default"] = _default;