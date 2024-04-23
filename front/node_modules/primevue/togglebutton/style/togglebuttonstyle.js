this.primevue = this.primevue || {};
this.primevue.togglebutton = this.primevue.togglebutton || {};
this.primevue.togglebutton.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: function root(_ref) {
        var instance = _ref.instance,
          props = _ref.props;
        return ['p-togglebutton p-component', {
          'p-disabled': props.disabled,
          'p-highlight': instance.active,
          'p-invalid': props.invalid
        }];
      },
      input: 'p-togglebutton-input',
      box: function box(_ref2) {
        var instance = _ref2.instance;
        return ['p-button p-component', {
          'p-button-icon-only': instance.hasIcon && !instance.hasLabel
        }];
      },
      icon: function icon(_ref3) {
        var instance = _ref3.instance,
          props = _ref3.props;
        return ['p-button-icon', {
          'p-button-icon-left': props.iconPos === 'left' && instance.label,
          'p-button-icon-right': props.iconPos === 'right' && instance.label
        }];
      },
      label: 'p-button-label'
    };
    var ToggleButtonStyle = BaseStyle__default["default"].extend({
      name: 'togglebutton',
      classes: classes
    });

    return ToggleButtonStyle;

})(primevue.base.style);
