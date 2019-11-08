"use strict";

require("core-js/modules/es.array.some");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMemoList = void 0;

var _react = require("react");

var useMemoList = function useMemoList(list) {
  var compareFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (a, b) {
    return a === b;
  };
  var listRef = (0, _react.useRef)(list);
  var listChanged = list.length !== listRef.current.length || list.some(function (arg, index) {
    return !compareFn(arg, listRef.current[index]);
  });
  (0, _react.useEffect)(function () {
    if (listChanged) {
      listRef.current = list;
    }
  });
  return listChanged ? list : listRef.current;
};

exports.useMemoList = useMemoList;