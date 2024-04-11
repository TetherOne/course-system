this.primevue = this.primevue || {};
this.primevue.buttongroup = this.primevue.buttongroup || {};
this.primevue.buttongroup.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: 'p-button-group p-component'
    };
    var ButtonGroupStyle = BaseStyle__default["default"].extend({
      name: 'buttongroup',
      classes: classes
    });

    return ButtonGroupStyle;

})(primevue.base.style);
