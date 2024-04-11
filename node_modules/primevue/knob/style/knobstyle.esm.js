import BaseStyle from 'primevue/base/style';

var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ['p-knob p-component', {
      'p-disabled': props.disabled
    }];
  },
  range: 'p-knob-range',
  value: 'p-knob-value',
  label: 'p-knob-text'
};
var KnobStyle = BaseStyle.extend({
  name: 'knob',
  classes: classes
});

export { KnobStyle as default };
