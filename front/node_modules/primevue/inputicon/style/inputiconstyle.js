this.primevue = this.primevue || {};
this.primevue.inputicon = this.primevue.inputicon || {};
this.primevue.inputicon.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: 'p-input-icon'
    };
    var InputIconStyle = BaseStyle__default["default"].extend({
      name: 'inputicon',
      classes: classes
    });

    return InputIconStyle;

})(primevue.base.style);
