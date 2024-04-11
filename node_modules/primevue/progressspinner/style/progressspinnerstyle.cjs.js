'use strict';

var BaseStyle = require('primevue/base/style');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

var classes = {
  root: 'p-progress-spinner',
  spinner: 'p-progress-spinner-svg',
  circle: 'p-progress-spinner-circle'
};
var ProgressSpinnerStyle = BaseStyle__default["default"].extend({
  name: 'progressspinner',
  classes: classes
});

module.exports = ProgressSpinnerStyle;
