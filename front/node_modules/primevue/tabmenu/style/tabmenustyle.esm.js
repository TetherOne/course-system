import BaseStyle from 'primevue/base/style';

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
var TabMenuStyle = BaseStyle.extend({
  name: 'tabmenu',
  classes: classes
});

export { TabMenuStyle as default };
