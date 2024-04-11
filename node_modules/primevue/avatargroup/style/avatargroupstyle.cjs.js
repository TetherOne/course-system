'use strict';

var BaseStyle = require('primevue/base/style');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

var classes = {
  root: 'p-avatar-group p-component'
};
var AvatarGroupStyle = BaseStyle__default["default"].extend({
  name: 'avatargroup',
  classes: classes
});

module.exports = AvatarGroupStyle;
