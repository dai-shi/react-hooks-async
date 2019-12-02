"use strict";

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.some");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAsyncCombineSeq = void 0;

require("regenerator-runtime/runtime");

var _react = require("react");

var _useAsyncTask = require("./use-async-task");

var _utils = require("./utils");

var useAsyncCombineSeq = function useAsyncCombineSeq() {
  for (var _len = arguments.length, asyncTasks = new Array(_len), _key = 0; _key < _len; _key++) {
    asyncTasks[_key] = arguments[_key];
  }

  var indexRef = (0, _react.useRef)(0);
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
            }); // start the first one

            indexRef.current = 0;
            _context.next = 4;
            return regeneratorRuntime.awrap(memoAsyncTasks[0].start());

          case 4:
          case "end":
            return _context.stop();
        }
      }
    });
  }, [memoAsyncTasks]));
  (0, _react.useEffect)(function () {
    // if current task is finished, start next task
    var currTask = asyncTasks[indexRef.current];
    var nextTask = asyncTasks[indexRef.current + 1];

    if (nextTask && currTask && !currTask.pending && !currTask.error) {
      indexRef.current += 1;

      (function _callee2() {
        return regeneratorRuntime.async(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return regeneratorRuntime.awrap(nextTask.start());

              case 3:
                _context2.next = 7;
                break;

              case 5:
                _context2.prev = 5;
                _context2.t0 = _context2["catch"](0);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, null, null, [[0, 5]]);
      })();
    }
  });
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

exports.useAsyncCombineSeq = useAsyncCombineSeq;