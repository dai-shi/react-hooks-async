"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.useAsyncTaskDelay = void 0;

var _react = require("react");

var _useAsyncTaskTimeout = require("./use-async-task-timeout");

var _utils = require("./utils");

var useAsyncTaskDelay = function useAsyncTaskDelay(milliSeconds, inputs) {
  var func = (0, _react.useRef)();
  var prevInputs = (0, _react.useRef)();

  if (!prevInputs.current || !(0, _utils.shallowArrayEqual)(prevInputs.current, inputs)) {
    prevInputs.current = inputs;

    func.current = function () {
      return true;
    };
  }

  return (0, _useAsyncTaskTimeout.useAsyncTaskTimeout)(func.current, milliSeconds);
};

exports.useAsyncTaskDelay = useAsyncTaskDelay;
var _default = useAsyncTaskDelay;
exports.default = _default;