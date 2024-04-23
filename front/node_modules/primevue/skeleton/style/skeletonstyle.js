this.primevue = this.primevue || {};
this.primevue.skeleton = this.primevue.skeleton || {};
this.primevue.skeleton.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var inlineStyles = {
      root: {
        position: 'relative'
      }
    };
    var classes = {
      root: function root(_ref) {
        var props = _ref.props;
        return ['p-skeleton p-component', {
          'p-skeleton-circle': props.shape === 'circle',
          'p-skeleton-none': props.animation === 'none'
        }];
      }
    };
    var SkeletonStyle = BaseStyle__default["default"].extend({
      name: 'skeleton',
      classes: classes,
      inlineStyles: inlineStyles
    });

    return SkeletonStyle;

})(primevue.base.style);
