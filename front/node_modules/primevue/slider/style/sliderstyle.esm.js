import BaseStyle from 'primevue/base/style';

var inlineStyles = {
  handle: {
    position: 'absolute'
  },
  range: {
    position: 'absolute'
  }
};
var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ['p-slider p-component', {
      'p-disabled': props.disabled,
      'p-slider-horizontal': props.orientation === 'horizontal',
      'p-slider-vertical': props.orientation === 'vertical'
    }];
  },
  range: 'p-slider-range',
  handle: 'p-slider-handle'
};
var SliderStyle = BaseStyle.extend({
  name: 'slider',
  classes: classes,
  inlineStyles: inlineStyles
});

export { SliderStyle as default };
