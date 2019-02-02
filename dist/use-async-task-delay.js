"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.useAsyncTaskDelay = void 0;

var _react = require("react");

var _shallowequal = _interopRequireDefault(require("shallowequal"));

var _useAsyncTaskTimeout = require("./use-async-task-timeout");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var useAsyncTaskDelay = function useAsyncTaskDelay(milliSeconds, inputs) {
  var func = (0, _react.useRef)();
  var prevInputs = (0, _react.useRef)();

  if (!prevInputs.current || !(0, _shallowequal.default)(prevInputs.current, inputs)) {
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