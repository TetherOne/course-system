import BaseStyle from 'primevue/base/style';

var classes = {
  root: function root(_ref) {
    var instance = _ref.instance;
    return ['p-contextmenu p-component', {
      'p-ripple-disabled': instance.$primevue.config.ripple === false
    }];
  },
  menu: 'p-contextmenu-root-list',
  menuitem: function menuitem(_ref2) {
    var instance = _ref2.instance,
      processedItem = _ref2.processedItem;
    return ['p-menuitem', {
      'p-menuitem-active p-highlight': instance.isItemActive(processedItem),
      'p-focus': instance.isItemFocused(processedItem),
      'p-disabled': instance.isItemDisabled(processedItem)
    }];
  },
  content: 'p-menuitem-content',
  action: 'p-menuitem-link',
  icon: 'p-menuitem-icon',
  label: 'p-menuitem-text',
  submenuIcon: 'p-submenu-icon',
  submenu: 'p-submenu-list',
  separator: 'p-menuitem-separator'
};
var ContextMenuStyle = BaseStyle.extend({
  name: 'contextmenu',
  classes: classes
});

export { ContextMenuStyle as default };
