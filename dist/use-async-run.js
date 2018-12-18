"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.useAsyncRun = void 0;

var _react = require("react");

var useAsyncRun = function useAsyncRun(asyncTask) {
  (0, _react.useEffect)(function () {
    if (asyncTask) {
      asyncTask.start();
    }

    var cleanup = function cleanup() {
      if (asyncTask) {
        asyncTask.abort();
      }
    };

    return cleanup;
  }, [asyncTask && asyncTask.taskId]);
};

exports.useAsyncRun = useAsyncRun;
var _default = useAsyncRun;
exports.default = _default;