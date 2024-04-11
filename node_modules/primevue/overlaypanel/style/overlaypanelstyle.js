this.primevue = this.primevue || {};
this.primevue.overlaypanel = this.primevue.overlaypanel || {};
this.primevue.overlaypanel.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: function root(_ref) {
        var instance = _ref.instance;
        return ['p-overlaypanel p-component', {
          'p-ripple-disabled': instance.$primevue.config.ripple === false
        }];
      },
      content: 'p-overlaypanel-content',
      closeButton: 'p-overlaypanel-close p-link',
      closeIcon: 'p-overlaypanel-close-icon'
    };
    var OverlayPanelStyle = BaseStyle__default["default"].extend({
      name: 'overlaypanel',
      classes: classes
    });

    return OverlayPanelStyle;

})(primevue.base.style);
