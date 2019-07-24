"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.object.define-properties");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAxios = exports.useAsyncTaskAxios = void 0;

var _useMemoOne = require("use-memo-one");

var _useAsyncTask = require("./use-async-task");

var _useAsyncRun = require("./use-async-run");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useAsyncTaskAxios = function useAsyncTaskAxios(axios, config) {
  return (0, _useAsyncTask.useAsyncTask)((0, _useMemoOne.useCallbackOne)(function (abortController, configOverride) {
    var source = axios.CancelToken.source();
    abortController.signal.addEventListener('abort', function () {
      source.cancel('canceled');
    });
    return axios(_objectSpread({}, config, {}, configOverride, {
      cancelToken: source.token
    }));
  }, [axios, config]));
};

exports.useAsyncTaskAxios = useAsyncTaskAxios;

var useAxios = function useAxios() {
  var asyncTask = useAsyncTaskAxios.apply(void 0, arguments);
  (0, _useAsyncRun.useAsyncRun)(asyncTask);
  return asyncTask;
};

exports.useAxios = useAxios;