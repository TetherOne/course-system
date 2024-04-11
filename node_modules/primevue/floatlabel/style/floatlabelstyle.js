this.primevue = this.primevue || {};
this.primevue.floatlabel = this.primevue.floatlabel || {};
this.primevue.floatlabel.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: 'p-float-label'
    };
    var FloatLabelStyle = BaseStyle__default["default"].extend({
      name: 'floatlabel',
      classes: classes
    });

    return FloatLabelStyle;

})(primevue.base.style);
