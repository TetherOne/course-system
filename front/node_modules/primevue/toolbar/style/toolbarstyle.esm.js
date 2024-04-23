import BaseStyle from 'primevue/base/style';

var classes = {
  root: 'p-toolbar p-component',
  start: 'p-toolbar-group-start p-toolbar-group-left',
  center: 'p-toolbar-group-center',
  end: 'p-toolbar-group-end p-toolbar-group-right'
};
var ToolbarStyle = BaseStyle.extend({
  name: 'toolbar',
  classes: classes
});

export { ToolbarStyle as default };
