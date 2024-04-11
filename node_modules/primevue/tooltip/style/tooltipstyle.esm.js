import BaseStyle from 'primevue/base/style';

var classes = {
  root: 'p-tooltip p-component',
  arrow: 'p-tooltip-arrow',
  text: 'p-tooltip-text'
};
var TooltipStyle = BaseStyle.extend({
  name: 'tooltip',
  classes: classes
});

export { TooltipStyle as default };
