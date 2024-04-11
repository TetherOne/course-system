import BaseStyle from 'primevue/base/style';

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
var InputSwitchStyle = BaseStyle.extend({
  name: 'inputswitch',
  classes: classes,
  inlineStyles: inlineStyles
});

export { InputSwitchStyle as default };
