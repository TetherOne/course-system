import BaseStyle from 'primevue/base/style';

var classes = {
  root: 'p-progress-spinner',
  spinner: 'p-progress-spinner-svg',
  circle: 'p-progress-spinner-circle'
};
var ProgressSpinnerStyle = BaseStyle.extend({
  name: 'progressspinner',
  classes: classes
});

export { ProgressSpinnerStyle as default };
