this.primevue = this.primevue || {};
this.primevue.blockui = this.primevue.blockui || {};
this.primevue.blockui.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: 'p-blockui-container'
    };
    var BlockUIStyle = BaseStyle__default["default"].extend({
      name: 'blockui',
      classes: classes
    });

    return BlockUIStyle;

})(primevue.base.style);
