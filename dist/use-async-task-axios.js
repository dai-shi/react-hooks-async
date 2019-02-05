"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.useAxios = exports.useAsyncTaskAxios = exports.useMemoSafe = void 0;

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.some");

var _react = require("react");

var _axios = _interopRequireDefault(require("axios"));

var _useAsyncTask = require("./use-async-task");

var _useAsyncRun = require("./use-async-run");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// this can be too naive
var useMemoSafe = function useMemoSafe(create, inputs) {
  var memoized = (0, _react.useRef)();
  var prevInputs = (0, _react.useRef)([]);

  if (prevInputs.current.length !== inputs.length || prevInputs.current.some(function (x, i) {
    return x !== inputs[i];
  })) {
    prevInputs.current = inputs;
    memoized.current = create();
  }

  return memoized.current;
};

exports.useMemoSafe = useMemoSafe;

var useAsyncTaskAxios = function useAsyncTaskAxios(config) {
  return (0, _useAsyncTask.useAsyncTask)(function (abortController) {
    var source = _axios.default.CancelToken.source();

    abortController.signal.addEventListener('abort', function () {
      source.cancel('canceled');
    });
    return (0, _axios.default)(_objectSpread({}, config, {
      cancelToken: source.token
    }));
  }, [config]);
};

exports.useAsyncTaskAxios = useAsyncTaskAxios;

var useAxios = function useAxios() {
  var asyncTask = useAsyncTaskAxios.apply(void 0, arguments);
  (0, _useAsyncRun.useAsyncRun)(asyncTask);
  return asyncTask;
};

exports.useAxios = useAxios;
var _default = useAsyncTaskAxios;
exports.default = _default;