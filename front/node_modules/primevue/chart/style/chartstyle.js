this.primevue = this.primevue || {};
this.primevue.chart = this.primevue.chart || {};
this.primevue.chart.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var inlineStyles = {
      root: {
        position: 'relative'
      }
    };
    var classes = {
      root: 'p-chart'
    };
    var ChartStyle = BaseStyle__default["default"].extend({
      name: 'chart',
      inlineStyles: inlineStyles,
      classes: classes
    });

    return ChartStyle;

})(primevue.base.style);
