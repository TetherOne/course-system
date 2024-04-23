this.primevue = this.primevue || {};
this.primevue.chip = this.primevue.chip || {};
this.primevue.chip.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: function root(_ref) {
        var props = _ref.props;
        return ['p-chip p-component', {
          'p-chip-image': props.image != null
        }];
      },
      icon: 'p-chip-icon',
      label: 'p-chip-text',
      removeIcon: 'p-chip-remove-icon'
    };
    var ChipStyle = BaseStyle__default["default"].extend({
      name: 'chip',
      classes: classes
    });

    return ChipStyle;

})(primevue.base.style);
