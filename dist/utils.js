"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shallowArrayEqual = void 0;

var shallowArrayEqual = function shallowArrayEqual(a1, a2) {
  if (a1.length !== a2.length) return false;

  for (var i = 0; i < a1.length; i += 1) {
    if (a1[i] !== a2[i]) return false;
  }

  return true;
};

exports.shallowArrayEqual = shallowArrayEqual;