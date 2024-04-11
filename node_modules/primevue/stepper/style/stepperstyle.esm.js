import BaseStyle from 'primevue/base/style';

var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ['p-stepper p-component', {
      'p-stepper-horizontal': props.orientation === 'horizontal',
      'p-stepper-vertical': props.orientation === 'vertical',
      'p-readonly': props.linear
    }];
  },
  nav: 'p-stepper-nav',
  stepper: {
    header: function header(_ref2) {
      var instance = _ref2.instance;
        _ref2.step;
        var index = _ref2.index;
      return ['p-stepper-header', {
        'p-highlight': instance.isStepActive(index),
        'p-disabled': instance.isItemDisabled(index)
      }];
    },
    action: 'p-stepper-action',
    number: 'p-stepper-number',
    title: 'p-stepper-title',
    separator: 'p-stepper-separator',
    toggleableContent: 'p-stepper-toggleable-content',
    content: function content(_ref3) {
      var props = _ref3.props;
      return ['p-stepper-content', {
        'p-toggleable-content': props.orientation === 'vertical'
      }];
    }
  },
  panelContainer: 'p-stepper-panels',
  panel: function panel(_ref4) {
    var instance = _ref4.instance,
      props = _ref4.props,
      index = _ref4.index;
    return ['p-stepper-panel', {
      'p-stepper-panel-active': props.orientation === 'vertical' && instance.isStepActive(index)
    }];
  }
};
var StepperStyle = BaseStyle.extend({
  name: 'stepper',
  classes: classes
});

export { StepperStyle as default };
