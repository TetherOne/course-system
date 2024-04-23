import BaseStyle from 'primevue/base/style';

var classes = {
  root: function root(_ref) {
    var instance = _ref.instance,
      props = _ref.props;
    return ['p-chips p-component p-inputwrapper', {
      'p-disabled': props.disabled,
      'p-invalid': props.invalid,
      'p-focus': instance.focused,
      'p-inputwrapper-filled': props.modelValue && props.modelValue.length || instance.inputValue && instance.inputValue.length,
      'p-inputwrapper-focus': instance.focused
    }];
  },
  container: function container(_ref2) {
    var props = _ref2.props,
      instance = _ref2.instance;
    return ['p-inputtext p-chips-multiple-container', {
      'p-variant-filled': props.variant ? props.variant === 'filled' : instance.$primevue.config.inputStyle === 'filled'
    }];
  },
  token: function token(_ref3) {
    var state = _ref3.state,
      index = _ref3.index;
    return ['p-chips-token', {
      'p-focus': state.focusedIndex === index
    }];
  },
  label: 'p-chips-token-label',
  removeTokenIcon: 'p-chips-token-icon',
  inputToken: 'p-chips-input-token'
};
var ChipsStyle = BaseStyle.extend({
  name: 'chips',
  classes: classes
});

export { ChipsStyle as default };
