this.primevue = this.primevue || {};
this.primevue.inplace = this.primevue.inplace || {};
this.primevue.inplace.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: function root(_ref) {
        var props = _ref.props;
        return ['p-inplace p-component', {
          'p-inplace-closable': props.closable
        }];
      },
      display: function display(_ref2) {
        var props = _ref2.props;
        return ['p-inplace-display', {
          'p-disabled': props.disabled
        }];
      },
      content: 'p-inplace-content'
    };
    var InplaceStyle = BaseStyle__default["default"].extend({
      name: 'inplace',
      classes: classes
    });

    return InplaceStyle;

})(primevue.base.style);
