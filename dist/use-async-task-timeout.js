"use strict";

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/web.timers");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.useAsyncTaskTimeout = void 0;

var _useAsyncTask = require("./use-async-task");

var createAbortError = function createAbortError(message) {
  try {
    return new DOMException(message, 'AbortError');
  } catch (e) {
    var err = new Error(message);
    err.name = 'AbortError';
    return err;
  }
};

var useAsyncTaskTimeout = function useAsyncTaskTimeout(func, delay, deps) {
  return (0, _useAsyncTask.useAsyncTask)(function (abortController) {
    return new Promise(function (resolve, reject) {
      var id = setTimeout(function () {
        resolve(func());
      }, delay);
      abortController.signal.addEventListener('abort', function () {
        clearTimeout(id);
        reject(createAbortError('timer aborted'));
      });
    });
  }, deps);
};

exports.useAsyncTaskTimeout = useAsyncTaskTimeout;
var _default = useAsyncTaskTimeout;
exports["default"] = _default;