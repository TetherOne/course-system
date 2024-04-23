import BaseStyle from 'primevue/base/style';

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
var InputMaskStyle = BaseStyle.extend({
  name: 'inputmask',
  classes: classes
});

export { InputMaskStyle as default };
