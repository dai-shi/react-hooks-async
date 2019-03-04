"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.useAsyncTaskDelay = void 0;

require("core-js/modules/es6.promise");

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

var useAsyncTaskDelay = function useAsyncTaskDelay(milliSeconds, inputs) {
  return (0, _useAsyncTask.useAsyncTask)(function (abortController) {
    return new Promise(function (resolve, reject) {
      var id = setTimeout(function () {
        resolve(true);
      }, milliSeconds);
      abortController.signal.addEventListener('abort', function () {
        clearTimeout(id);
        reject(createAbortError('timer aborted'));
      });
    });
  }, inputs);
};

exports.useAsyncTaskDelay = useAsyncTaskDelay;
var _default = useAsyncTaskDelay;
exports.default = _default;