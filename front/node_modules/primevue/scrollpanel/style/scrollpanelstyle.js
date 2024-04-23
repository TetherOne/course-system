this.primevue = this.primevue || {};
this.primevue.scrollpanel = this.primevue.scrollpanel || {};
this.primevue.scrollpanel.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: 'p-scrollpanel p-component',
      wrapper: 'p-scrollpanel-wrapper',
      content: 'p-scrollpanel-content',
      barx: 'p-scrollpanel-bar p-scrollpanel-bar-x',
      bary: 'p-scrollpanel-bar p-scrollpanel-bar-y'
    };
    var ScrollPanelStyle = BaseStyle__default["default"].extend({
      name: 'scrollpanel',
      classes: classes
    });

    return ScrollPanelStyle;

})(primevue.base.style);
