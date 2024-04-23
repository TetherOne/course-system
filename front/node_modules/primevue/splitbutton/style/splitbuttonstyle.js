this.primevue = this.primevue || {};
this.primevue.splitbutton = this.primevue.splitbutton || {};
this.primevue.splitbutton.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: function root(_ref) {
        var props = _ref.props;
        return ['p-splitbutton p-component', {
          'p-button-raised': props.raised,
          'p-button-rounded': props.rounded,
          'p-button-text': props.text,
          'p-button-outlined': props.outlined,
          'p-button-sm': props.size === 'small',
          'p-button-lg': props.size === 'large'
        }];
      },
      button: 'p-splitbutton-defaultbutton',
      menuButton: 'p-splitbutton-menubutton'
    };
    var SplitButtonStyle = BaseStyle__default["default"].extend({
      name: 'splitbutton',
      classes: classes
    });

    return SplitButtonStyle;

})(primevue.base.style);
