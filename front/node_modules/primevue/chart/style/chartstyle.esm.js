import BaseStyle from 'primevue/base/style';

var inlineStyles = {
  root: {
    position: 'relative'
  }
};
var classes = {
  root: 'p-chart'
};
var ChartStyle = BaseStyle.extend({
  name: 'chart',
  inlineStyles: inlineStyles,
  classes: classes
});

export { ChartStyle as default };
