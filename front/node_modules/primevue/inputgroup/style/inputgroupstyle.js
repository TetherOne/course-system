this.primevue = this.primevue || {};
this.primevue.inputgroup = this.primevue.inputgroup || {};
this.primevue.inputgroup.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: 'p-inputgroup'
    };
    var InputGroupStyle = BaseStyle__default["default"].extend({
      name: 'inputgroup',
      classes: classes
    });

    return InputGroupStyle;

})(primevue.base.style);
