import BaseStyle from 'primevue/base/style';

var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ['p-chip p-component', {
      'p-chip-image': props.image != null
    }];
  },
  icon: 'p-chip-icon',
  label: 'p-chip-text',
  removeIcon: 'p-chip-remove-icon'
};
var ChipStyle = BaseStyle.extend({
  name: 'chip',
  classes: classes
});

export { ChipStyle as default };
