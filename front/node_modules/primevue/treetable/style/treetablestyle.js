this.primevue = this.primevue || {};
this.primevue.treetable = this.primevue.treetable || {};
this.primevue.treetable.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: function root(_ref) {
        var instance = _ref.instance,
          props = _ref.props;
        return ['p-treetable p-component', {
          'p-treetable-hoverable-rows': props.rowHover || instance.rowSelectionMode,
          'p-treetable-auto-layout': props.autoLayout,
          'p-treetable-resizable': props.resizableColumns,
          'p-treetable-resizable-fit': props.resizableColumns && props.columnResizeMode === 'fit',
          'p-treetable-gridlines': props.showGridlines,
          'p-treetable-scrollable': props.scrollable,
          'p-treetable-scrollable-vertical': props.scrollable && props.scrollDirection === 'vertical',
          'p-treetable-scrollable-horizontal': props.scrollable && props.scrollDirection === 'horizontal',
          'p-treetable-scrollable-both': props.scrollable && props.scrollDirection === 'both',
          'p-treetable-flex-scrollable': props.scrollable && props.scrollHeight === 'flex',
          'p-treetable-responsive-scroll': props.responsiveLayout === 'scroll',
          'p-treetable-sm': props.size === 'small',
          'p-treetable-lg': props.size === 'large'
        }];
      },
      loadingWrapper: 'p-treetable-loading',
      loadingOverlay: 'p-treetable-loading-overlay p-component-overlay',
      loadingIcon: 'p-treetable-loading-icon',
      header: 'p-treetable-header',
      paginator: function paginator(_ref2) {
        var instance = _ref2.instance;
        return instance.paginatorTop ? 'p-paginator-top' : instance.paginatorBottom ? 'p-paginator-bottom' : '';
      },
      wrapper: 'p-treetable-wrapper',
      thead: 'p-treetable-thead',
      //headercell
      headerCell: function headerCell(_ref3) {
        var instance = _ref3.instance,
          props = _ref3.props,
          column = _ref3.column;
        return column && instance.hasColumnFilter() ? ['p-filter-column', {
          'p-frozen-column': instance.columnProp(column, 'frozen')
        }] : [{
          'p-sortable-column': instance.columnProp('sortable'),
          'p-resizable-column': props.resizableColumns,
          'p-highlight': instance.isColumnSorted(),
          'p-frozen-column': instance.columnProp('frozen')
        }];
      },
      columnResizer: 'p-column-resizer',
      headerTitle: 'p-column-title',
      sortIcon: 'p-sortable-column-icon',
      sortBadge: 'p-sortable-column-badge',
      tbody: 'p-treetable-tbody',
      //ttrow
      row: function row(_ref4) {
        var instance = _ref4.instance;
        return [{
          'p-highlight': instance.selected
        }];
      },
      //bodycell
      bodyCell: function bodyCell(_ref5) {
        var instance = _ref5.instance;
        return [{
          'p-frozen-column': instance.columnProp('frozen')
        }];
      },
      rowToggler: 'p-treetable-toggler p-link',
      rowTogglerIcon: 'p-tree-toggler-icon',
      rowCheckbox: function rowCheckbox(_ref6) {
        var instance = _ref6.instance;
        return ['p-treetable-checkbox', {
          'p-indeterminate': instance.partialChecked
        }];
      },
      //treetable
      emptyMessage: 'p-treetable-emptymessage',
      tfoot: 'p-treetable-tfoot',
      //footercell
      footerCell: function footerCell(_ref7) {
        var instance = _ref7.instance;
        return [{
          'p-frozen-column': instance.columnProp('frozen')
        }];
      },
      //treetable
      footer: 'p-treetable-footer',
      resizeHelper: 'p-column-resizer-helper p-highlight'
    };
    var TreeTableStyle = BaseStyle__default["default"].extend({
      name: 'treetable',
      classes: classes
    });

    return TreeTableStyle;

})(primevue.base.style);
