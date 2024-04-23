this.primevue = this.primevue || {};
this.primevue.menu = this.primevue.menu || {};
this.primevue.menu.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: function root(_ref) {
        var instance = _ref.instance,
          props = _ref.props;
        return ['p-menu p-component', {
          'p-menu-overlay': props.popup,
          'p-ripple-disabled': instance.$primevue.config.ripple === false
        }];
      },
      start: 'p-menu-start',
      menu: 'p-menu-list p-reset',
      submenuHeader: 'p-submenu-header',
      separator: 'p-menuitem-separator',
      end: 'p-menu-end',
      menuitem: function menuitem(_ref2) {
        var instance = _ref2.instance;
        return ['p-menuitem', {
          'p-focus': instance.id === instance.focusedOptionId,
          'p-disabled': instance.disabled()
        }];
      },
      content: 'p-menuitem-content',
      action: 'p-menuitem-link',
      icon: 'p-menuitem-icon',
      label: 'p-menuitem-text'
    };
    var MenuStyle = BaseStyle__default["default"].extend({
      name: 'menu',
      classes: classes
    });

    return MenuStyle;

})(primevue.base.style);
