"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  started: false,
  pending: true,
  error: null,
  result: null,
  start: null,
  abort: null
};

var reducer = function reducer(state, action) {
  switch (action.type) {
    case 'init':
      return initialState;

    case 'ready':
      return _objectSpread({}, state, {
        start: action.start,
        abort: action.abort
      });

    case 'start':
      if (state.started) return state; // to bail out just in case

      return _objectSpread({}, state, {
        started: true
      });

    case 'result':
      if (!state.pending) return state; // to bail out just in case

      return _objectSpread({}, state, {
        pending: false,
        result: action.result
      });

    case 'error':
      if (!state.pending) return state; // to bail out just in case

      return _objectSpread({}, state, {
        pending: false,
        error: action.error
      });

    default:
      throw new Error("unexpected action type: ".concat(action.type));
  }
};

var useAsyncTask = function useAsyncTask(func, deps) {
  var _useReducer = (0, _react.useReducer)(reducer, initialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  (0, _react.useEffect)(function () {
    var dispatchSafe = function dispatchSafe(action) {
      return dispatch(action);
    };

    var abortController = null;

    var start =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!abortController) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                abortController = new AbortController();
                dispatchSafe({
                  type: 'start'
                });
                _context.prev = 4;
                _context.next = 7;
                return func(abortController);

              case 7:
                result = _context.sent;
                dispatchSafe({
                  type: 'result',
                  result: result
                });
                _context.next = 14;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](4);
                dispatchSafe({
                  type: 'error',
                  error: _context.t0
                });

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[4, 11]]);
      }));

      return function start() {
        return _ref.apply(this, arguments);
      };
    }();

    var abort = function abort() {
      if (abortController) {
        abortController.abort();
      }
    };

    dispatch({
      type: 'ready',
      start: start,
      abort: abort
    });

    var cleanup = function cleanup() {
      dispatchSafe = function dispatchSafe() {
        return null;
      }; // avoid to dispatch after stopped


      dispatch({
        type: 'init'
      });
    };

    return cleanup;
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  return state;
};

exports.useAsyncTask = useAsyncTask;