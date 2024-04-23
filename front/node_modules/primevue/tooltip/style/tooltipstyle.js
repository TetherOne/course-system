this.primevue = this.primevue || {};
this.primevue.tooltip = this.primevue.tooltip || {};
this.primevue.tooltip.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: 'p-tooltip p-component',
      arrow: 'p-tooltip-arrow',
      text: 'p-tooltip-text'
    };
    var TooltipStyle = BaseStyle__default["default"].extend({
      name: 'tooltip',
      classes: classes
    });

    return TooltipStyle;

})(primevue.base.style);
