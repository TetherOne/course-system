this.primevue = this.primevue || {};
this.primevue.inputswitch = this.primevue.inputswitch || {};
this.primevue.inputswitch.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var inlineStyles = {
      root: {
        position: 'relative'
      }
    };
    var classes = {
      root: function root(_ref) {
        var instance = _ref.instance,
          props = _ref.props;
        return ['p-inputswitch p-component', {
          'p-highlight': instance.checked,
          'p-disabled': props.disabled,
          'p-invalid': props.invalid
        }];
      },
      input: 'p-inputswitch-input',
      slider: 'p-inputswitch-slider'
    };
    var InputSwitchStyle = BaseStyle__default["default"].extend({
      name: 'inputswitch',
      classes: classes,
      inlineStyles: inlineStyles
    });

    return InputSwitchStyle;

})(primevue.base.style);
