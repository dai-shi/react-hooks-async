"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAsyncRun = void 0;

var _react = require("react");

var useAsyncRun = function useAsyncRun(asyncTask) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var start = asyncTask.start,
      abort = asyncTask.abort;
  (0, _react.useEffect)(function () {
    start.apply(void 0, args); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asyncTask.start].concat(args));
  (0, _react.useEffect)(function () {
    var cleanup = function cleanup() {
      abort();
    };

    return cleanup;
  }, [abort]);
};

exports.useAsyncRun = useAsyncRun;