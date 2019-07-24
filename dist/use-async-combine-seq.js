"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.find-index");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.some");

require("core-js/modules/es.object.define-properties");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var useAsyncCombineSeq = function useAsyncCombineSeq() {
  for (var _len = arguments.length, asyncTasks = new Array(_len), _key = 0; _key < _len; _key++) {
    asyncTasks[_key] = arguments[_key];
  }

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
                asyncTasks.forEach(function (asyncTask) {
                  asyncTask.abort();
                });
              }); // start the first one

              asyncTasks[0].start();

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
  }(), // eslint-disable-next-line react-hooks/exhaustive-deps
  asyncTasks.map(function (_ref2) {
    var start = _ref2.start;
    return start;
  })));
  (0, _react.useEffect)(function () {
    // if prev task is finished, start next task
    var index = asyncTasks.findIndex(function (_ref3) {
      var started = _ref3.started;
      return !started;
    });
    var prevTask = asyncTasks[index - 1];
    var nextTask = asyncTasks[index];

    if (nextTask && prevTask && !prevTask.pending && !prevTask.error) {
      nextTask.start();
    }
  });
  return _objectSpread({}, task, {
    pending: asyncTasks.some(function (_ref4) {
      var pending = _ref4.pending;
      return pending;
    }),
    error: asyncTasks.find(function (_ref5) {
      var error = _ref5.error;
      return error;
    }),
    errorAll: asyncTasks.map(function (_ref6) {
      var error = _ref6.error;
      return error;
    }),
    result: asyncTasks.map(function (_ref7) {
      var result = _ref7.result;
      return result;
    })
  });
};

exports.useAsyncCombineSeq = useAsyncCombineSeq;