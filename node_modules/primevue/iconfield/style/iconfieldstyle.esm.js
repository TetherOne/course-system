import BaseStyle from 'primevue/base/style';

var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ['p-icon-field', {
      'p-icon-field-right': props.iconPosition === 'right',
      'p-icon-field-left': props.iconPosition === 'left'
    }];
  }
};
var IconFieldStyle = BaseStyle.extend({
  name: 'iconfield',
  classes: classes
});

export { IconFieldStyle as default };
