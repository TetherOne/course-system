import BaseStyle from 'primevue/base/style';

var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ['p-scrolltop p-link p-component', {
      'p-scrolltop-sticky': props.target !== 'window'
    }];
  },
  icon: 'p-scrolltop-icon'
};
var ScrollTopStyle = BaseStyle.extend({
  name: 'scrolltop',
  classes: classes
});

export { ScrollTopStyle as default };
