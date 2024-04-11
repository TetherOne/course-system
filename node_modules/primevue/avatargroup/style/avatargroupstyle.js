this.primevue = this.primevue || {};
this.primevue.avatargroup = this.primevue.avatargroup || {};
this.primevue.avatargroup.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: 'p-avatar-group p-component'
    };
    var AvatarGroupStyle = BaseStyle__default["default"].extend({
      name: 'avatargroup',
      classes: classes
    });

    return AvatarGroupStyle;

})(primevue.base.style);
