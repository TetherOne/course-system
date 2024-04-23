import BaseStyle from 'primevue/base/style';

var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ['p-colorpicker p-component', {
      'p-colorpicker-overlay': !props.inline
    }];
  },
  input: function input(_ref2) {
    var props = _ref2.props;
    return ['p-colorpicker-preview p-inputtext', {
      'p-disabled': props.disabled
    }];
  },
  panel: function panel(_ref3) {
    var instance = _ref3.instance,
      props = _ref3.props;
    return ['p-colorpicker-panel', {
      'p-colorpicker-overlay-panel': !props.inline,
      'p-disabled': props.disabled,
      'p-ripple-disabled': instance.$primevue.config.ripple === false
    }];
  },
  content: 'p-colorpicker-content',
  selector: 'p-colorpicker-color-selector',
  color: 'p-colorpicker-color',
  colorHandle: 'p-colorpicker-color-handle',
  hue: 'p-colorpicker-hue',
  hueHandle: 'p-colorpicker-hue-handle'
};
var ColorPickerStyle = BaseStyle.extend({
  name: 'colorpicker',
  classes: classes
});

export { ColorPickerStyle as default };
