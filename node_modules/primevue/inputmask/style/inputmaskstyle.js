this.primevue = this.primevue || {};
this.primevue.inputmask = this.primevue.inputmask || {};
this.primevue.inputmask.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: function root(_ref) {
        var props = _ref.props,
          instance = _ref.instance;
        return ['p-inputmask p-inputtext p-component', {
          'p-filled': instance.filled,
          'p-invalid': props.invalid,
          'p-variant-filled': props.variant ? props.variant === 'filled' : instance.$primevue.config.inputStyle === 'filled'
        }];
      }
    };
    var InputMaskStyle = BaseStyle__default["default"].extend({
      name: 'inputmask',
      classes: classes
    });

    return InputMaskStyle;

})(primevue.base.style);
