import BaseStyle from 'primevue/base/style';

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
var TextareaStyle = BaseStyle.extend({
  name: 'textarea',
  classes: classes
});

export { TextareaStyle as default };
