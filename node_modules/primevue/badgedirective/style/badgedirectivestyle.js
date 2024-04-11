this.primevue = this.primevue || {};
this.primevue.badgedirective = this.primevue.badgedirective || {};
this.primevue.badgedirective.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: 'p-badge p-component'
    };
    var BadgeDirectiveStyle = BaseStyle__default["default"].extend({
      name: 'badge',
      classes: classes
    });

    return BadgeDirectiveStyle;

})(primevue.base.style);
