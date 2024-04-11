this.primevue = this.primevue || {};
this.primevue.scrolltop = this.primevue.scrolltop || {};
this.primevue.scrolltop.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: function root(_ref) {
        var props = _ref.props;
        return ['p-scrolltop p-link p-component', {
          'p-scrolltop-sticky': props.target !== 'window'
        }];
      },
      icon: 'p-scrolltop-icon'
    };
    var ScrollTopStyle = BaseStyle__default["default"].extend({
      name: 'scrolltop',
      classes: classes
    });

    return ScrollTopStyle;

})(primevue.base.style);
