"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.useAsyncRun = void 0;

var _react = require("react");

var useAsyncRun = function useAsyncRun(asyncTask) {
  var start = asyncTask && asyncTask.start;
  var abort = asyncTask && asyncTask.abort;
  (0, _react.useEffect)(function () {
    if (start) {
      start();
    }
  }, [start]);
  (0, _react.useEffect)(function () {
    var cleanup = function cleanup() {
      if (abort) {
        abort();
      }
    };

    return cleanup;
  }, [abort]);
};

exports.useAsyncRun = useAsyncRun;
var _default = useAsyncRun;
exports.default = _default;