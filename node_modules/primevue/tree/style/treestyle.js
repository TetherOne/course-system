this.primevue = this.primevue || {};
this.primevue.tree = this.primevue.tree || {};
this.primevue.tree.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: function root(_ref) {
        var props = _ref.props;
        return ['p-tree p-component', {
          'p-tree-selectable': props.selectionMode != null,
          'p-tree-loading': props.loading,
          'p-tree-flex-scrollable': props.scrollHeight === 'flex'
        }];
      },
      loadingOverlay: 'p-tree-loading-overlay p-component-overlay',
      loadingIcon: 'p-tree-loading-icon',
      filterContainer: 'p-tree-filter-container',
      input: 'p-tree-filter p-inputtext p-component',
      searchIcon: 'p-tree-filter-icon',
      wrapper: 'p-tree-wrapper',
      container: 'p-tree-container',
      node: function node(_ref2) {
        var instance = _ref2.instance;
        return ['p-treenode', {
          'p-treenode-leaf': instance.leaf
        }];
      },
      content: function content(_ref3) {
        var instance = _ref3.instance;
        return ['p-treenode-content', instance.node.styleClass, {
          'p-treenode-selectable': instance.selectable,
          'p-highlight': instance.checkboxMode && instance.$parentInstance.highlightOnSelect ? instance.checked : instance.selected
        }];
      },
      toggler: 'p-tree-toggler p-link',
      togglerIcon: 'p-tree-toggler-icon',
      nodeTogglerIcon: 'p-tree-node-toggler-icon',
      nodeCheckbox: function nodeCheckbox(_ref4) {
        var instance = _ref4.instance;
        return [{
          'p-indeterminate': instance.partialChecked
        }];
      },
      nodeIcon: 'p-treenode-icon',
      label: 'p-treenode-label',
      subgroup: 'p-treenode-children'
    };
    var TreeStyle = BaseStyle__default["default"].extend({
      name: 'tree',
      classes: classes
    });

    return TreeStyle;

})(primevue.base.style);
