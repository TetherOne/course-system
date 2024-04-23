this.primevue = this.primevue || {};
this.primevue.knob = this.primevue.knob || {};
this.primevue.knob.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: function root(_ref) {
        var props = _ref.props;
        return ['p-knob p-component', {
          'p-disabled': props.disabled
        }];
      },
      range: 'p-knob-range',
      value: 'p-knob-value',
      label: 'p-knob-text'
    };
    var KnobStyle = BaseStyle__default["default"].extend({
      name: 'knob',
      classes: classes
    });

    return KnobStyle;

})(primevue.base.style);
