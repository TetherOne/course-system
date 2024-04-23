this.primevue = this.primevue || {};
this.primevue.breadcrumb = this.primevue.breadcrumb || {};
this.primevue.breadcrumb.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: 'p-breadcrumb p-component',
      menu: 'p-breadcrumb-list',
      home: 'p-breadcrumb-home',
      separator: 'p-menuitem-separator',
      menuitem: function menuitem(_ref) {
        var instance = _ref.instance;
        return ['p-menuitem', {
          'p-disabled': instance.disabled()
        }];
      },
      action: 'p-menuitem-link',
      icon: 'p-menuitem-icon',
      label: 'p-menuitem-text'
    };
    var BreadcrumbStyle = BaseStyle__default["default"].extend({
      name: 'breadcrumb',
      classes: classes
    });

    return BreadcrumbStyle;

})(primevue.base.style);
