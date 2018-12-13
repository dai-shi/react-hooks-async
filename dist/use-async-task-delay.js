"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.useAsyncTaskDelay = void 0;

var _react = require("react");

var _useAsyncTaskTimeout = require("./use-async-task-timeout");

var useAsyncTaskDelay = function useAsyncTaskDelay(milliSeconds, inputs) {
  return (0, _useAsyncTaskTimeout.useAsyncTaskTimeout)((0, _react.useCallback)(function () {
    return true;
  }, inputs), milliSeconds);
};

exports.useAsyncTaskDelay = useAsyncTaskDelay;
var _default = useAsyncTaskDelay;
exports.default = _default;