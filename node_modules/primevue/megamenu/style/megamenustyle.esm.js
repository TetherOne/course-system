import BaseStyle from 'primevue/base/style';

var inlineStyles = {
  submenu: function submenu(_ref) {
    var instance = _ref.instance,
      processedItem = _ref.processedItem;
    return {
      display: instance.isItemActive(processedItem) ? 'block' : 'none'
    };
  }
};
var classes = {
  root: function root(_ref2) {
    var instance = _ref2.instance;
    return ['p-megamenu p-component', {
      'p-megamenu-mobile': instance.queryMatches,
      'p-megamenu-mobile-active': instance.mobileActive,
      'p-megamenu-horizontal': instance.horizontal,
      'p-megamenu-vertical': instance.vertical
    }];
  },
  start: 'p-megamenu-start',
  menubutton: 'p-megamenu-button',
  menu: 'p-megamenu-root-list',
  submenuHeader: function submenuHeader(_ref3) {
    var instance = _ref3.instance,
      processedItem = _ref3.processedItem;
    return ['p-megamenu-submenu-header p-submenu-header', {
      'p-disabled': instance.isItemDisabled(processedItem)
    }];
  },
  menuitem: function menuitem(_ref4) {
    var instance = _ref4.instance,
      processedItem = _ref4.processedItem;
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
  panel: 'p-megamenu-panel',
  grid: 'p-megamenu-grid',
  column: function column(_ref5) {
    var instance = _ref5.instance,
      processedItem = _ref5.processedItem;
    var length = instance.isItemGroup(processedItem) ? processedItem.items.length : 0;
    var columnClass;
    if (instance.$parentInstance.queryMatches) columnClass = 'p-megamenu-col-12';else {
      switch (length) {
        case 2:
          columnClass = 'p-megamenu-col-6';
          break;
        case 3:
          columnClass = 'p-megamenu-col-4';
          break;
        case 4:
          columnClass = 'p-megamenu-col-3';
          break;
        case 6:
          columnClass = 'p-megamenu-col-2';
          break;
        default:
          columnClass = 'p-megamenu-col-12';
          break;
      }
    }
    return columnClass;
  },
  submenu: 'p-submenu-list p-megamenu-submenu',
  submenuLabel: 'p-menuitem-text',
  separator: 'p-menuitem-separator',
  end: 'p-megamenu-end'
};
var MegaMenuStyle = BaseStyle.extend({
  name: 'megamenu',
  classes: classes,
  inlineStyles: inlineStyles
});

export { MegaMenuStyle as default };
