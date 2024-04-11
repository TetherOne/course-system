this.primevue = this.primevue || {};
this.primevue.radiobutton = this.primevue.radiobutton || {};
this.primevue.radiobutton.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: function root(_ref) {
        var instance = _ref.instance,
          props = _ref.props;
        return ['p-radiobutton p-component', {
          'p-highlight': instance.checked,
          'p-disabled': props.disabled,
          'p-invalid': props.invalid,
          'p-variant-filled': props.variant ? props.variant === 'filled' : instance.$primevue.config.inputStyle === 'filled'
        }];
      },
      box: 'p-radiobutton-box',
      input: 'p-radiobutton-input',
      icon: 'p-radiobutton-icon'
    };
    var RadioButtonStyle = BaseStyle__default["default"].extend({
      name: 'radiobutton',
      classes: classes
    });

    return RadioButtonStyle;

})(primevue.base.style);
