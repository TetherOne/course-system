this.primevue = this.primevue || {};
this.primevue.inputotp = this.primevue.inputotp || {};
this.primevue.inputotp.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: 'p-inputotp p-component',
      input: 'p-inputotp-input'
    };
    var InputOtpStyle = BaseStyle__default["default"].extend({
      name: 'inputotp',
      classes: classes
    });

    return InputOtpStyle;

})(primevue.base.style);
