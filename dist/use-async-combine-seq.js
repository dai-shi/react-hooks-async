"use strict";

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.find-index");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.some");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAsyncCombineSeq = void 0;

require("regenerator-runtime/runtime");

var _react = require("react");

var _useMemoOne = require("use-memo-one");

var _useAsyncTask = require("./use-async-task");

var _utils = require("./utils");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var useAsyncCombineSeq = function useAsyncCombineSeq() {
  for (var _len = arguments.length, asyncTasks = new Array(_len), _key = 0; _key < _len; _key++) {
    asyncTasks[_key] = arguments[_key];
  }

  var memoAsyncTasks = (0, _utils.useMemoList)(asyncTasks, function (a, b) {
    return a.start === b.start;
  });
  var task = (0, _useAsyncTask.useAsyncTask)((0, _useMemoOne.useCallbackOne)(
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
                memoAsyncTasks.forEach(function (asyncTask) {
                  asyncTask.abort();
                });
              }); // start the first one

              memoAsyncTasks[0].start();

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }(), [memoAsyncTasks]));
  (0, _react.useEffect)(function () {
    // if prev task is finished, start next task
    var index = asyncTasks.findIndex(function (_ref2) {
      var started = _ref2.started;
      return !started;
    });
    var prevTask = asyncTasks[index - 1];
    var nextTask = asyncTasks[index];

    if (nextTask && prevTask && !prevTask.pending && !prevTask.error) {
      nextTask.start();
    }
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
  return (0, _useMemoOne.useMemoOne)(function () {
    return {
      start: task.start,
      abort: task.abort,
      started: task.started,
      pending: taskPending,
      error: taskError,
      errorAll: taskErrorAll,
      result: taskResult
    };
  }, [task.start, task.abort, task.started, taskPending, taskError, taskErrorAll, taskResult]);
};

exports.useAsyncCombineSeq = useAsyncCombineSeq;