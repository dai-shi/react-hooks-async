"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.useAsyncCombineAll = void 0;

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.array.some");

require("core-js/modules/es6.array.map");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.for-each");

require("regenerator-runtime/runtime");

var _useAsyncTask = require("./use-async-task");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var useAsyncCombineAll = function useAsyncCombineAll(asyncTasks) {
  var task = (0, _useAsyncTask.useAsyncTask)(
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(abortController) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              abortController.signal.addEventListener('abort', function () {
                asyncTasks.forEach(function (asyncTask) {
                  asyncTask.abort();
                });
              });
              asyncTasks.forEach(function (asyncTask) {
                asyncTask.start();
              });

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }(), asyncTasks.map(function (_ref2) {
    var taskId = _ref2.taskId;
    return taskId;
  }));
  return _objectSpread({}, task, {
    pending: asyncTasks.some(function (_ref3) {
      var pending = _ref3.pending;
      return pending;
    }),
    error: asyncTasks.map(function (_ref4) {
      var error = _ref4.error;
      return error;
    }),
    result: asyncTasks.map(function (_ref5) {
      var result = _ref5.result;
      return result;
    })
  });
};

exports.useAsyncCombineAll = useAsyncCombineAll;
var _default = useAsyncCombineAll;
exports.default = _default;