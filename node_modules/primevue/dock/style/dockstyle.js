this.primevue = this.primevue || {};
this.primevue.dock = this.primevue.dock || {};
this.primevue.dock.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: function root(_ref) {
        var instance = _ref.instance,
          props = _ref.props;
        return ['p-dock p-component', "p-dock-".concat(props.position), {
          'p-dock-mobile': instance.queryMatches
        }];
      },
      container: 'p-dock-list-container',
      menu: 'p-dock-list',
      menuitem: function menuitem(_ref2) {
        var instance = _ref2.instance,
          processedItem = _ref2.processedItem,
          index = _ref2.index,
          id = _ref2.id;
        return ['p-dock-item', {
          'p-focus': instance.isItemActive(id),
          'p-disabled': instance.disabled(processedItem),
          'p-dock-item-second-prev': instance.currentIndex - 2 === index,
          'p-dock-item-prev': instance.currentIndex - 1 === index,
          'p-dock-item-current': instance.currentIndex === index,
          'p-dock-item-next': instance.currentIndex + 1 === index,
          'p-dock-item-second-next': instance.currentIndex + 2 === index
        }];
      },
      content: 'p-menuitem-content',
      action: 'p-dock-link',
      icon: 'p-dock-icon'
    };
    var DockStyle = BaseStyle__default["default"].extend({
      name: 'dock',
      classes: classes
    });

    return DockStyle;

})(primevue.base.style);
