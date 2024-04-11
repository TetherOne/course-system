this.primevue = this.primevue || {};
this.primevue.progressbar = this.primevue.progressbar || {};
this.primevue.progressbar.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: function root(_ref) {
        var instance = _ref.instance;
        return ['p-progressbar p-component', {
          'p-progressbar-determinate': instance.determinate,
          'p-progressbar-indeterminate': instance.indeterminate
        }];
      },
      container: 'p-progressbar-indeterminate-container',
      value: 'p-progressbar-value p-progressbar-value-animate',
      label: 'p-progressbar-label'
    };
    var ProgressBarStyle = BaseStyle__default["default"].extend({
      name: 'progressbar',
      classes: classes
    });

    return ProgressBarStyle;

})(primevue.base.style);
