import BaseStyle from 'primevue/base/style';

var classes = {
  root: function root(_ref) {
    var instance = _ref.instance;
    return ['p-splitter-panel', {
      'p-splitter-panel-nested': instance.isNested
    }];
  }
};
var SplitterPanelStyle = BaseStyle.extend({
  name: 'splitterpanel',
  classes: classes
});

export { SplitterPanelStyle as default };
