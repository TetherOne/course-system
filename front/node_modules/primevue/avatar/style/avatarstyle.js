this.primevue = this.primevue || {};
this.primevue.avatar = this.primevue.avatar || {};
this.primevue.avatar.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: function root(_ref) {
        var props = _ref.props;
        return ['p-avatar p-component', {
          'p-avatar-image': props.image != null,
          'p-avatar-circle': props.shape === 'circle',
          'p-avatar-lg': props.size === 'large',
          'p-avatar-xl': props.size === 'xlarge'
        }];
      },
      label: 'p-avatar-text',
      icon: 'p-avatar-icon'
    };
    var AvatarStyle = BaseStyle__default["default"].extend({
      name: 'avatar',
      classes: classes
    });

    return AvatarStyle;

})(primevue.base.style);
