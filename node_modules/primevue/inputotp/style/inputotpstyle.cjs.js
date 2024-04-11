'use strict';

var BaseStyle = require('primevue/base/style');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

var classes = {
  root: 'p-inputotp p-component',
  input: 'p-inputotp-input'
};
var InputOtpStyle = BaseStyle__default["default"].extend({
  name: 'inputotp',
  classes: classes
});

module.exports = InputOtpStyle;
