'use strict';

var BaseStyle = require('primevue/base/style');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

var classes = {
  root: 'p-button-group p-component'
};
var ButtonGroupStyle = BaseStyle__default["default"].extend({
  name: 'buttongroup',
  classes: classes
});

module.exports = ButtonGroupStyle;
