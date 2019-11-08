"use strict";

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/web.timers");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAsyncTaskTimeout = void 0;

var _useMemoOne = require("use-memo-one");

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

var useAsyncTaskTimeout = function useAsyncTaskTimeout(func, delay) {
  return (0, _useAsyncTask.useAsyncTask)((0, _useMemoOne.useCallbackOne)(function (abortController, delayOverride) {
    return new Promise(function (resolve, reject) {
      var delayToUse = delayOverride || delay;
      var id = setTimeout(function () {
        resolve(func());
      }, delayToUse);
      abortController.signal.addEventListener('abort', function () {
        clearTimeout(id);
        reject(createAbortError('timer aborted'));
      });
    });
  }, [func, delay]));
};

exports.useAsyncTaskTimeout = useAsyncTaskTimeout;