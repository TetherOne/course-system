import BaseStyle from 'primevue/base/style';

var classes = {
  root: 'p-organizationchart p-component',
  table: 'p-organizationchart-table',
  node: function node(_ref) {
    var instance = _ref.instance;
    return ['p-organizationchart-node-content', {
      'p-organizationchart-selectable-node': instance.selectable,
      'p-highlight': instance.selected
    }];
  },
  nodeToggler: 'p-node-toggler',
  nodeTogglerIcon: 'p-node-toggler-icon',
  lines: 'p-organizationchart-lines',
  lineDown: 'p-organizationchart-line-down',
  lineLeft: function lineLeft(_ref2) {
    var index = _ref2.index;
    return ['p-organizationchart-line-left', {
      'p-organizationchart-line-top': !(index === 0)
    }];
  },
  lineRight: function lineRight(_ref3) {
    var props = _ref3.props,
      index = _ref3.index;
    return ['p-organizationchart-line-right', {
      'p-organizationchart-line-top': !(index === props.node.children.length - 1)
    }];
  },
  nodes: 'p-organizationchart-nodes'
};
var OrganizationChartStyle = BaseStyle.extend({
  name: 'organizationchart',
  classes: classes
});

export { OrganizationChartStyle as default };
