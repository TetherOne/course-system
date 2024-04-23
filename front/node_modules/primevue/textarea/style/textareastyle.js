this.primevue = this.primevue || {};
this.primevue.textarea = this.primevue.textarea || {};
this.primevue.textarea.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: function root(_ref) {
        var instance = _ref.instance,
          props = _ref.props;
        return ['p-inputtextarea p-inputtext p-component', {
          'p-filled': instance.filled,
          'p-inputtextarea-resizable ': props.autoResize,
          'p-invalid': props.invalid,
          'p-variant-filled': props.variant ? props.variant === 'filled' : instance.$primevue.config.inputStyle === 'filled'
        }];
      }
    };
    var TextareaStyle = BaseStyle__default["default"].extend({
      name: 'textarea',
      classes: classes
    });

    return TextareaStyle;

})(primevue.base.style);
