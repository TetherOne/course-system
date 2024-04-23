this.primevue = this.primevue || {};
this.primevue.inputgroupaddon = this.primevue.inputgroupaddon || {};
this.primevue.inputgroupaddon.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: 'p-inputgroup-addon'
    };
    var InputGroupAddonStyle = BaseStyle__default["default"].extend({
      name: 'inputgroupaddon',
      classes: classes
    });

    return InputGroupAddonStyle;

})(primevue.base.style);
