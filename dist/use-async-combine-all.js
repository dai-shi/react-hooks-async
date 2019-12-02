"use strict";

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.some");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAsyncCombineAll = void 0;

require("regenerator-runtime/runtime");

var _react = require("react");

var _useAsyncTask = require("./use-async-task");

var _utils = require("./utils");

var useAsyncCombineAll = function useAsyncCombineAll() {
  for (var _len = arguments.length, asyncTasks = new Array(_len), _key = 0; _key < _len; _key++) {
    asyncTasks[_key] = arguments[_key];
  }

  var memoAsyncTasks = (0, _utils.useMemoList)(asyncTasks, function (a, b) {
    return a.start === b.start;
  });
  var task = (0, _useAsyncTask.useAsyncTask)((0, _react.useCallback)(function _callee(abortController) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            abortController.signal.addEventListener('abort', function () {
              memoAsyncTasks.forEach(function (asyncTask) {
                asyncTask.abort();
              });
            }); // start everything

            return _context.abrupt("return", Promise.all(memoAsyncTasks.map(function (asyncTask) {
              return asyncTask.start();
            })));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    });
  }, [memoAsyncTasks]));
  var taskAborted = asyncTasks.some(function (_ref) {
    var aborted = _ref.aborted;
    return aborted;
  });
  var taskPending = asyncTasks.some(function (_ref2) {
    var pending = _ref2.pending;
    return pending;
  });
  var taskError = asyncTasks.find(function (_ref3) {
    var error = _ref3.error;
    return error;
  });
  var taskErrorAll = (0, _utils.useMemoList)(asyncTasks.map(function (_ref4) {
    var error = _ref4.error;
    return error;
  }));
  var taskResult = (0, _utils.useMemoList)(asyncTasks.map(function (_ref5) {
    var result = _ref5.result;
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

exports.useAsyncCombineAll = useAsyncCombineAll;