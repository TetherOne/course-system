this.primevue = this.primevue || {};
this.primevue.progressspinner = this.primevue.progressspinner || {};
this.primevue.progressspinner.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: 'p-progress-spinner',
      spinner: 'p-progress-spinner-svg',
      circle: 'p-progress-spinner-circle'
    };
    var ProgressSpinnerStyle = BaseStyle__default["default"].extend({
      name: 'progressspinner',
      classes: classes
    });

    return ProgressSpinnerStyle;

})(primevue.base.style);
