"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.useAsyncRun = void 0;

var _react = require("react");

var useAsyncRun = function useAsyncRun(asyncTask) {
  var previous = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    if (asyncTask) {
      if (previous.current) {
        previous.current.abort();
      }

      previous.current = asyncTask;
      asyncTask.start();
    }
  }, [asyncTask && asyncTask.taskId]);
};

exports.useAsyncRun = useAsyncRun;
var _default = useAsyncRun;
exports.default = _default;