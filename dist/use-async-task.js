"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.define-properties");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAsyncTask = void 0;

require("regenerator-runtime/runtime");

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createTask = function createTask(_ref) {
  var func = _ref.func,
      dispatchRef = _ref.dispatchRef;
  var taskId = Symbol('TASK_ID');
  var abortController = null;
  return {
    func: func,
    taskId: taskId,
    runId: null,
    start: function start() {
      var runId,
          _len,
          args,
          _key,
          result,
          _args = arguments;

      return regeneratorRuntime.async(function start$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (abortController) {
                abortController.abort();
              }

              abortController = new AbortController();
              runId = Symbol('RUN_ID');
              dispatchRef.current({
                type: 'START',
                taskId: taskId,
                runId: runId
              });
              _context.prev = 4;

              for (_len = _args.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = _args[_key];
              }

              _context.next = 8;
              return regeneratorRuntime.awrap(func.apply(void 0, [abortController].concat(args)));

            case 8:
              result = _context.sent;
              dispatchRef.current({
                type: 'RESULT',
                taskId: taskId,
                runId: runId,
                result: result
              });
              return _context.abrupt("return", result);

            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](4);

              if (!(_context.t0.name === 'AbortError')) {
                _context.next = 18;
                break;
              }

              dispatchRef.current({
                type: 'ABORT',
                taskId: taskId,
                runId: runId
              });
              return _context.abrupt("return", null);

            case 18:
              dispatchRef.current({
                type: 'ERROR',
                taskId: taskId,
                runId: runId,
                error: _context.t0
              });
              throw _context.t0;

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[4, 13]]);
    },
    abort: function abort() {
      if (abortController) {
        abortController.abort();
        abortController = null;
      }
    },
    started: false,
    pending: true,
    aborted: false,
    error: null,
    result: null
  };
};

var reducer = function reducer(task, action) {
  switch (action.type) {
    case 'INIT':
      return createTask(action);

    case 'START':
      if (task.taskId !== action.taskId) {
        return task; // bail out
      }

      return _objectSpread({}, task, {
        runId: action.runId,
        started: true,
        pending: true,
        aborted: false,
        error: null,
        result: null
      });

    case 'RESULT':
      if (task.taskId !== action.taskId || task.runId !== action.runId) {
        return task; // bail out
      }

      return _objectSpread({}, task, {
        started: false,
        pending: false,
        result: action.result
      });

    case 'ABORT':
      if (task.taskId !== action.taskId || task.runId !== action.runId) {
        return task; // bail out
      }

      return _objectSpread({}, task, {
        started: false,
        aborted: true
      });

    case 'ERROR':
      if (task.taskId !== action.taskId || task.runId !== action.runId) {
        return task; // bail out
      }

      return _objectSpread({}, task, {
        started: false,
        pending: false,
        error: action.error
      });

    default:
      throw new Error("unknown action type: ".concat(action.type));
  }
};

var useAsyncTask = function useAsyncTask(func) {
  var dispatchRef = (0, _react.useRef)(function () {
    throw new Error('not initialized');
  });

  var _useReducer = (0, _react.useReducer)(reducer, {
    func: func,
    dispatchRef: dispatchRef
  }, createTask),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      task = _useReducer2[0],
      dispatch = _useReducer2[1];

  if (task.func !== func) {
    dispatch({
      type: 'INIT',
      func: func,
      dispatchRef: dispatchRef
    });
  }

  dispatchRef.current = dispatch;
  (0, _react.useEffect)(function () {
    var cleanup = function cleanup() {
      dispatchRef.current = function () {};
    };

    return cleanup;
  }, []);
  return task;
};

exports.useAsyncTask = useAsyncTask;