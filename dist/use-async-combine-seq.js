"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.array.some");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAsyncCombineSeq = void 0;

require("regenerator-runtime/runtime");

var _react = require("react");

var _useAsyncTask = require("./use-async-task");

var _utils = require("./utils");

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var useAsyncCombineSeq = function useAsyncCombineSeq() {
  for (var _len = arguments.length, asyncTasks = new Array(_len), _key = 0; _key < _len; _key++) {
    asyncTasks[_key] = arguments[_key];
  }

  var memoAsyncTasks = (0, _utils.useMemoList)(asyncTasks, function (a, b) {
    return a.start === b.start;
  });
  var task = (0, _useAsyncTask.useAsyncTask)((0, _react.useCallback)( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(abortController) {
      var results, _iterator, _step, currentTask, result;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              abortController.signal.addEventListener('abort', function () {
                memoAsyncTasks.forEach(function (asyncTask) {
                  asyncTask.abort();
                });
              }); // start sequentially

              results = [];
              _iterator = _createForOfIteratorHelper(memoAsyncTasks);
              _context.prev = 3;

              _iterator.s();

            case 5:
              if ((_step = _iterator.n()).done) {
                _context.next = 15;
                break;
              }

              currentTask = _step.value;
              _context.next = 9;
              return currentTask.start();

            case 9:
              result = _context.sent;
              results.push(result);

              if (!(result === _useAsyncTask.SYMBOL_ABORTED)) {
                _context.next = 13;
                break;
              }

              return _context.abrupt("return", results);

            case 13:
              _context.next = 5;
              break;

            case 15:
              _context.next = 20;
              break;

            case 17:
              _context.prev = 17;
              _context.t0 = _context["catch"](3);

              _iterator.e(_context.t0);

            case 20:
              _context.prev = 20;

              _iterator.f();

              return _context.finish(20);

            case 23:
              return _context.abrupt("return", results);

            case 24:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 17, 20, 23]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }(), [memoAsyncTasks]));
  var taskAborted = asyncTasks.some(function (_ref2) {
    var aborted = _ref2.aborted;
    return aborted;
  });
  var taskPending = asyncTasks.some(function (_ref3) {
    var pending = _ref3.pending;
    return pending;
  });
  var taskError = asyncTasks.find(function (_ref4) {
    var error = _ref4.error;
    return error;
  });
  var taskErrorAll = (0, _utils.useMemoList)(asyncTasks.map(function (_ref5) {
    var error = _ref5.error;
    return error;
  }));
  var taskResult = (0, _utils.useMemoList)(asyncTasks.map(function (_ref6) {
    var result = _ref6.result;
    return result;
  }));
  return (0, _react.useMemo)(function () {
    return {
      start: task.start,
      abort: task.abort,
      started: task.started,
      aborted: taskAborted,
      pending: taskPending,
      error: taskError,
      errorAll: taskErrorAll,
      result: taskPending ? null : taskResult
    };
  }, [task.start, task.abort, task.started, taskAborted, taskPending, taskError, taskErrorAll, taskResult]);
};

exports.useAsyncCombineSeq = useAsyncCombineSeq;