"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.find-index");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.some");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAsyncCombineRace = void 0;

require("regenerator-runtime/runtime");

var _react = require("react");

var _useMemoOne = require("use-memo-one");

var _useAsyncTask = require("./use-async-task");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var useAsyncCombineRace = function useAsyncCombineRace() {
  for (var _len = arguments.length, asyncTasks = new Array(_len), _key = 0; _key < _len; _key++) {
    asyncTasks[_key] = arguments[_key];
  }

  var callback = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    if (callback.current) {
      callback.current(asyncTasks);
    }
  });
  var task = (0, _useAsyncTask.useAsyncTask)((0, _useMemoOne.useCallbackOne)(
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(abortController) {
      var stopOthers;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              abortController.signal.addEventListener('abort', function () {
                asyncTasks.forEach(function (asyncTask) {
                  if (asyncTask.abort) {
                    asyncTask.abort();
                  }
                });
              });

              stopOthers = function stopOthers(tasks) {
                var index = tasks.findIndex(function (_ref2) {
                  var pending = _ref2.pending;
                  return !pending;
                });

                if (index >= 0) {
                  tasks.forEach(function (asyncTask, i) {
                    if (i !== index && asyncTask.abort) {
                      asyncTask.abort();
                    }
                  });
                }
              };

              callback.current = stopOthers;
              asyncTasks.forEach(function (asyncTask) {
                if (!asyncTask.start) throw new Error('no asyncTask.start');
                asyncTask.start();
              });

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }(), // TODO Do we have a better way?
  // eslint-disable-next-line react-hooks/exhaustive-deps
  asyncTasks.map(function (_ref3) {
    var start = _ref3.start;
    return start;
  })));
  (0, _react.useEffect)(function () {
    var cleanup = function cleanup() {
      callback.current = null;
    };

    return cleanup;
  }, asyncTasks.map(function (_ref4) {
    var start = _ref4.start;
    return start;
  })); // eslint-disable-line react-hooks/exhaustive-deps

  return _objectSpread({}, task, {
    pending: asyncTasks.some(function (_ref5) {
      var pending = _ref5.pending;
      return pending;
    }),
    error: asyncTasks.find(function (_ref6) {
      var error = _ref6.error;
      return error;
    }),
    errorAll: asyncTasks.map(function (_ref7) {
      var error = _ref7.error;
      return error;
    }),
    result: asyncTasks.map(function (_ref8) {
      var result = _ref8.result;
      return result;
    })
  });
};

exports.useAsyncCombineRace = useAsyncCombineRace;