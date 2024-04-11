this.primevue = this.primevue || {};
this.primevue.toolbar = this.primevue.toolbar || {};
this.primevue.toolbar.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: 'p-toolbar p-component',
      start: 'p-toolbar-group-start p-toolbar-group-left',
      center: 'p-toolbar-group-center',
      end: 'p-toolbar-group-end p-toolbar-group-right'
    };
    var ToolbarStyle = BaseStyle__default["default"].extend({
      name: 'toolbar',
      classes: classes
    });

    return ToolbarStyle;

})(primevue.base.style);
