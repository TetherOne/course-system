import BaseStyle from 'primevue/base/style';

var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ['p-splitbutton p-component', {
      'p-button-raised': props.raised,
      'p-button-rounded': props.rounded,
      'p-button-text': props.text,
      'p-button-outlined': props.outlined,
      'p-button-sm': props.size === 'small',
      'p-button-lg': props.size === 'large'
    }];
  },
  button: 'p-splitbutton-defaultbutton',
  menuButton: 'p-splitbutton-menubutton'
};
var SplitButtonStyle = BaseStyle.extend({
  name: 'splitbutton',
  classes: classes
});

export { SplitButtonStyle as default };
