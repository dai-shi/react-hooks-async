"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAsyncRun = void 0;

var _react = require("react");

var _utils = require("./utils");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var useAsyncRun = function useAsyncRun(asyncTask) {
  var start = asyncTask && asyncTask.start;

  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var memoArgs = (0, _utils.useMemoList)(args);
  var abort = asyncTask && asyncTask.abort;
  var lastAbort = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    if (start) {
      if (lastAbort.current) {
        lastAbort.current();
      }

      start.apply(void 0, _toConsumableArray(memoArgs));
    }
  }, [start, memoArgs]);
  (0, _react.useEffect)(function () {
    if (abort) {
      lastAbort.current = abort;
    }
  }, [abort]);
  (0, _react.useEffect)(function () {
    var cleanup = function cleanup() {
      if (lastAbort.current) {
        lastAbort.current();
      }
    };

    return cleanup;
  }, []);
};

exports.useAsyncRun = useAsyncRun;