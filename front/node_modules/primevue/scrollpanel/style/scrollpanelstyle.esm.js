import BaseStyle from 'primevue/base/style';

var classes = {
  root: 'p-scrollpanel p-component',
  wrapper: 'p-scrollpanel-wrapper',
  content: 'p-scrollpanel-content',
  barx: 'p-scrollpanel-bar p-scrollpanel-bar-x',
  bary: 'p-scrollpanel-bar p-scrollpanel-bar-y'
};
var ScrollPanelStyle = BaseStyle.extend({
  name: 'scrollpanel',
  classes: classes
});

export { ScrollPanelStyle as default };
