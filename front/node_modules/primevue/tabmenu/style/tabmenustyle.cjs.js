'use strict';

var BaseStyle = require('primevue/base/style');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

var classes = {
  root: 'p-tabmenu p-component',
  menu: 'p-tabmenu-nav p-reset',
  menuitem: function menuitem(_ref) {
    var instance = _ref.instance,
      index = _ref.index,
      item = _ref.item;
    return ['p-tabmenuitem', {
      'p-highlight': instance.d_activeIndex === index,
      'p-disabled': instance.disabled(item)
    }];
  },
  action: 'p-menuitem-link',
  icon: 'p-menuitem-icon',
  label: 'p-menuitem-text',
  inkbar: 'p-tabmenu-ink-bar'
};
var TabMenuStyle = BaseStyle__default["default"].extend({
  name: 'tabmenu',
  classes: classes
});

module.exports = TabMenuStyle;
