"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.define-properties");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var useIsomorphicLayoutEffect = typeof window !== 'undefined' ? _react.useLayoutEffect : _react.useEffect;

var createTask = function createTask(func, dispatchRef) {
  var abortController = null;

  var abort = function abort() {
    if (abortController) {
      abortController.abort();
      abortController = null;
    }
  };

  var start =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var _len,
          args,
          _key,
          result,
          _args = arguments;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              abort();
              abortController = new AbortController();
              dispatchRef.current({
                type: 'start',
                func: func
              });
              _context.prev = 3;

              for (_len = _args.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = _args[_key];
              }

              _context.next = 7;
              return func.apply(void 0, [abortController].concat(args));

            case 7:
              result = _context.sent;
              dispatchRef.current({
                type: 'result',
                func: func,
                result: result
              });
              _context.next = 14;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](3);
              dispatchRef.current({
                type: 'error',
                func: func,
                error: _context.t0
              });

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 11]]);
    }));

    return function start() {
      return _ref.apply(this, arguments);
    };
  }();

  return {
    start: start,
    abort: abort
  };
};

var initialState = {
  func: null,
  started: false,
  pending: true,
  error: null,
  result: null
};

var reducer = function reducer(state, action) {
  switch (action.type) {
    case 'init':
      return _objectSpread({}, initialState, {
        func: action.func
      });

    case 'start':
      if (state.func !== action.func) return state; // bail out

      return _objectSpread({}, state, {
        started: true,
        pending: true,
        error: null,
        result: null
      });

    case 'result':
      if (state.func !== action.func) return state; // bail out

      return _objectSpread({}, state, {
        pending: false,
        result: action.result
      });

    case 'error':
      if (state.func !== action.func) return state; // bail out

      return _objectSpread({}, state, {
        pending: false,
        error: action.error
      });

    default:
      throw new Error("unexpected action type: ".concat(action.type));
  }
};

var useAsyncTask = function useAsyncTask(func) {
  var _useReducer = (0, _react.useReducer)(reducer, initialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var dispatchRef = (0, _react.useRef)(dispatch);
  var task = (0, _useMemoOne.useMemoOne)(function () {
    return createTask(func, dispatchRef);
  }, [func]);
  useIsomorphicLayoutEffect(function () {
    if (func !== state.func) {
      dispatch({
        type: 'init',
        func: func
      });
    }
  });
  (0, _react.useEffect)(function () {
    var cleanup = function cleanup() {
      dispatchRef.current = function () {
        return null;
      };
    };

    return cleanup;
  }, []);
  return {
    started: state.started,
    pending: state.pending,
    error: state.error,
    result: state.result,
    start: task.start,
    abort: task.abort
  };
};

exports.useAsyncTask = useAsyncTask;