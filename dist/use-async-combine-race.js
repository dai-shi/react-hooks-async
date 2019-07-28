"use strict";

require("core-js/modules/es.array.find-index");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.object.define-property");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAsyncCombineRace = void 0;

var _react = require("react");

var _useAsyncCombineAll = require("./use-async-combine-all");

var useAsyncCombineRace = function useAsyncCombineRace() {
  for (var _len = arguments.length, asyncTasks = new Array(_len), _key = 0; _key < _len; _key++) {
    asyncTasks[_key] = arguments[_key];
  }

  var task = _useAsyncCombineAll.useAsyncCombineAll.apply(void 0, asyncTasks);

  var finishedIndex = asyncTasks.findIndex(function (_ref) {
    var pending = _ref.pending;
    return !pending;
  });
  (0, _react.useEffect)(function () {
    // if there's one task finished, abort all the others
    if (finishedIndex >= 0) {
      asyncTasks.forEach(function (asyncTask, i) {
        if (i !== finishedIndex) {
          asyncTask.abort();
        }
      });
    }
  });
  return task;
};

exports.useAsyncCombineRace = useAsyncCombineRace;