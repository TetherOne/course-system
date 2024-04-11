import BaseStyle from 'primevue/base/style';

var classes = {
  root: 'p-badge p-component'
};
var BadgeDirectiveStyle = BaseStyle.extend({
  name: 'badge',
  classes: classes
});

export { BadgeDirectiveStyle as default };
