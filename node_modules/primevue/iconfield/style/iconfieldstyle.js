this.primevue = this.primevue || {};
this.primevue.iconfield = this.primevue.iconfield || {};
this.primevue.iconfield.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: function root(_ref) {
        var props = _ref.props;
        return ['p-icon-field', {
          'p-icon-field-right': props.iconPosition === 'right',
          'p-icon-field-left': props.iconPosition === 'left'
        }];
      }
    };
    var IconFieldStyle = BaseStyle__default["default"].extend({
      name: 'iconfield',
      classes: classes
    });

    return IconFieldStyle;

})(primevue.base.style);
