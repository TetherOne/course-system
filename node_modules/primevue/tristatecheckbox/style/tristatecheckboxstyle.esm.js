import BaseStyle from 'primevue/base/style';

var classes = {
  root: function root(_ref) {
    var instance = _ref.instance,
      props = _ref.props;
    return ['p-tristatecheckbox p-checkbox p-component', {
      'p-highlight': instance.active,
      'p-disabled': props.disabled,
      'p-invalid': props.invalid,
      'p-variant-filled': props.variant === 'filled' || instance.$primevue.config.inputStyle === 'filled'
    }];
  },
  box: 'p-checkbox-box',
  input: 'p-checkbox-input',
  checkIcon: 'p-checkbox-icon',
  uncheckIcon: 'p-checkbox-icon',
  nullableIcon: 'p-checkbox-icon'
};
var TriStateCheckboxStyle = BaseStyle.extend({
  name: 'tristatecheckbox',
  classes: classes
});

export { TriStateCheckboxStyle as default };
