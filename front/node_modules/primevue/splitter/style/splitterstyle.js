this.primevue = this.primevue || {};
this.primevue.splitter = this.primevue.splitter || {};
this.primevue.splitter.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: function root(_ref) {
        var props = _ref.props;
        return ['p-splitter p-component', 'p-splitter-' + props.layout];
      },
      gutter: 'p-splitter-gutter',
      gutterHandler: 'p-splitter-gutter-handle'
    };
    var inlineStyles = {
      root: function root(_ref2) {
        var props = _ref2.props;
        return [{
          display: 'flex',
          'flex-wrap': 'nowrap'
        }, props.layout === 'vertical' ? {
          'flex-direction': 'column'
        } : ''];
      }
    };
    var SplitterStyle = BaseStyle__default["default"].extend({
      name: 'splitter',
      classes: classes,
      inlineStyles: inlineStyles
    });

    return SplitterStyle;

})(primevue.base.style);
