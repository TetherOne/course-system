this.primevue = this.primevue || {};
this.primevue.password = this.primevue.password || {};
this.primevue.password.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var inlineStyles = {
      root: function root(_ref) {
        var props = _ref.props;
        return {
          position: props.appendTo === 'self' ? 'relative' : undefined
        };
      }
    };
    var classes = {
      root: function root(_ref2) {
        var instance = _ref2.instance,
          props = _ref2.props;
        return ['p-password p-component p-inputwrapper', {
          'p-inputwrapper-filled': instance.filled,
          'p-inputwrapper-focus': instance.focused,
          'p-icon-field p-icon-field-right': props.toggleMask
        }];
      },
      input: function input(_ref3) {
        var props = _ref3.props;
        return ['p-password-input', {
          'p-disabled': props.disabled
        }];
      },
      hideIcon: 'p-input-icon',
      showIcon: 'p-input-icon',
      panel: function panel(_ref4) {
        var instance = _ref4.instance;
        return ['p-password-panel p-component', {
          'p-ripple-disabled': instance.$primevue.config.ripple === false
        }];
      },
      meter: 'p-password-meter',
      meterLabel: function meterLabel(_ref5) {
        var instance = _ref5.instance;
        return "p-password-strength ".concat(instance.meter ? instance.meter.strength : '');
      },
      info: 'p-password-info'
    };
    var PasswordStyle = BaseStyle__default["default"].extend({
      name: 'password',
      classes: classes,
      inlineStyles: inlineStyles
    });

    return PasswordStyle;

})(primevue.base.style);
