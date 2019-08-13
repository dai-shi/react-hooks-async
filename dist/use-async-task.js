"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAsyncTask = void 0;

require("regenerator-runtime/runtime");

var _react = require("react");

var _useMemoOne = require("use-memo-one");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createTask = function createTask(func, forceUpdateRef) {
  var task = {
    abortController: null,
    start: function () {
      var _start = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _len,
            args,
            _key,
            _args = arguments;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                task.abort();
                task.abortController = new AbortController();
                task.started = true;
                task.pending = true;
                task.error = null;
                task.result = null;
                forceUpdateRef.current(func);
                _context.prev = 7;

                for (_len = _args.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = _args[_key];
                }

                _context.next = 11;
                return func.apply(void 0, [task.abortController].concat(args));

              case 11:
                task.result = _context.sent;
                _context.next = 17;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](7);
                task.error = _context.t0;

              case 17:
                task.pending = false;
                forceUpdateRef.current(func);

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[7, 14]]);
      }));

      function start() {
        return _start.apply(this, arguments);
      }

      return start;
    }(),
    abort: function abort() {
      if (task.abortController) {
        task.abortController.abort();
        task.abortController = null;
      }
    },
    started: false,
    pending: true,
    error: null,
    result: null
  };
  return task;
};

var useAsyncTask = function useAsyncTask(func) {
  var _useReducer = (0, _react.useReducer)(function (c) {
    return c + 1;
  }, 0),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      forceUpdate = _useReducer2[1];

  var forceUpdateRef = (0, _react.useRef)(forceUpdate);
  var task = (0, _useMemoOne.useMemoOne)(function () {
    return createTask(func, forceUpdateRef);
  }, [func]);
  (0, _react.useEffect)(function () {
    forceUpdateRef.current = function (f) {
      if (f === func) {
        forceUpdate();
      }
    };

    var cleanup = function cleanup() {
      forceUpdateRef.current = function () {
        return null;
      };
    };

    return cleanup;
  }, [func]);
  return (0, _useMemoOne.useMemoOne)(function () {
    return {
      start: task.start,
      abort: task.abort,
      started: task.started,
      pending: task.pending,
      error: task.error,
      result: task.result
    };
  }, [task.start, task.abort, task.started, task.pending, task.error, task.result]);
};

exports.useAsyncTask = useAsyncTask;