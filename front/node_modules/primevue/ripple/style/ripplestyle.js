this.primevue = this.primevue || {};
this.primevue.ripple = this.primevue.ripple || {};
this.primevue.ripple.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: 'p-ink'
    };
    var RippleStyle = BaseStyle__default["default"].extend({
      name: 'ripple',
      classes: classes
    });

    return RippleStyle;

})(primevue.base.style);
