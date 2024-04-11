this.primevue = this.primevue || {};
this.primevue.tristatecheckbox = this.primevue.tristatecheckbox || {};
this.primevue.tristatecheckbox.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: function root(_ref) {
        var instance = _ref.instance,
          props = _ref.props;
        return ['p-tristatecheckbox p-checkbox p-component', {
          'p-highlight': instance.active,
          'p-disabled': props.disabled,
          'p-invalid': props.invalid,
          'p-variant-filled': props.variant === 'filled' || instance.$primevue.config.inputStyle === 'filled'
        }];
      },
      box: 'p-checkbox-box',
      input: 'p-checkbox-input',
      checkIcon: 'p-checkbox-icon',
      uncheckIcon: 'p-checkbox-icon',
      nullableIcon: 'p-checkbox-icon'
    };
    var TriStateCheckboxStyle = BaseStyle__default["default"].extend({
      name: 'tristatecheckbox',
      classes: classes
    });

    return TriStateCheckboxStyle;

})(primevue.base.style);
