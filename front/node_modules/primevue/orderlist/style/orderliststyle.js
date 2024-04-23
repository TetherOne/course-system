this.primevue = this.primevue || {};
this.primevue.orderlist = this.primevue.orderlist || {};
this.primevue.orderlist.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: function root(_ref) {
        var props = _ref.props;
        return ['p-orderlist p-component', {
          'p-orderlist-striped': props.stripedRows
        }];
      },
      controls: 'p-orderlist-controls',
      container: 'p-orderlist-list-container',
      header: 'p-orderlist-header',
      list: 'p-orderlist-list',
      item: function item(_ref2) {
        var instance = _ref2.instance,
          _item = _ref2.item,
          id = _ref2.id;
        return ['p-orderlist-item', {
          'p-highlight': instance.isSelected(_item),
          'p-focus': id === instance.focusedOptionId
        }];
      }
    };
    var OrderListStyle = BaseStyle__default["default"].extend({
      name: 'orderlist',
      classes: classes
    });

    return OrderListStyle;

})(primevue.base.style);
