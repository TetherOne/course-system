import BaseStyle from 'primevue/base/style';

var inlineStyles = {
  root: {
    position: 'relative'
  }
};
var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ['p-skeleton p-component', {
      'p-skeleton-circle': props.shape === 'circle',
      'p-skeleton-none': props.animation === 'none'
    }];
  }
};
var SkeletonStyle = BaseStyle.extend({
  name: 'skeleton',
  classes: classes,
  inlineStyles: inlineStyles
});

export { SkeletonStyle as default };
