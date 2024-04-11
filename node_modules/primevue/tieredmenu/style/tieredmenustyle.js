this.primevue = this.primevue || {};
this.primevue.tieredmenu = this.primevue.tieredmenu || {};
this.primevue.tieredmenu.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

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
        var instance = _ref2.instance,
          props = _ref2.props;
        return ['p-tieredmenu p-component', {
          'p-tieredmenu-overlay': props.popup,
          'p-ripple-disabled': instance.$primevue.config.ripple === false
        }];
      },
      start: 'p-tieredmenu-start',
      menu: 'p-tieredmenu-root-list',
      menuitem: function menuitem(_ref3) {
        var instance = _ref3.instance,
          processedItem = _ref3.processedItem;
        return ['p-menuitem', {
          'p-menuitem-active p-highlight': instance.isItemActive(processedItem),
          'p-focus': instance.isItemFocused(processedItem),
          'p-disabled': instance.isItemDisabled(processedItem)
        }];
      },
      content: 'p-menuitem-content',
      action: 'p-menuitem-link',
      icon: 'p-menuitem-icon',
      text: 'p-menuitem-text',
      submenuIcon: 'p-submenu-icon',
      submenu: 'p-submenu-list',
      separator: 'p-menuitem-separator',
      end: 'p-tieredmenu-end'
    };
    var TieredMenuStyle = BaseStyle__default["default"].extend({
      name: 'tieredmenu',
      classes: classes,
      inlineStyles: inlineStyles
    });

    return TieredMenuStyle;

})(primevue.base.style);
