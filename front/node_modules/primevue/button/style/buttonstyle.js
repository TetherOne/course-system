this.primevue = this.primevue || {};
this.primevue.button = this.primevue.button || {};
this.primevue.button.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
    function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
    function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
    var classes = {
      root: function root(_ref) {
        var instance = _ref.instance,
          props = _ref.props;
        return ['p-button p-component', _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
          'p-button-icon-only': instance.hasIcon && !props.label && !props.badge,
          'p-button-vertical': (props.iconPos === 'top' || props.iconPos === 'bottom') && props.label,
          'p-disabled': instance.$attrs.disabled || instance.$attrs.disabled === '' || props.loading,
          'p-button-loading': props.loading,
          'p-button-loading-label-only': props.loading && !instance.hasIcon && props.label,
          'p-button-link': props.link
        }, "p-button-".concat(props.severity), props.severity), 'p-button-raised', props.raised), 'p-button-rounded', props.rounded), 'p-button-text', props.text), 'p-button-outlined', props.outlined), 'p-button-sm', props.size === 'small'), 'p-button-lg', props.size === 'large'), 'p-button-plain', props.plain)];
      },
      loadingIcon: 'p-button-loading-icon pi-spin',
      icon: function icon(_ref3) {
        var props = _ref3.props;
        return ['p-button-icon', {
          'p-button-icon-left': props.iconPos === 'left' && props.label,
          'p-button-icon-right': props.iconPos === 'right' && props.label,
          'p-button-icon-top': props.iconPos === 'top' && props.label,
          'p-button-icon-bottom': props.iconPos === 'bottom' && props.label
        }];
      },
      label: 'p-button-label'
    };
    var ButtonStyle = BaseStyle__default["default"].extend({
      name: 'button',
      classes: classes
    });

    return ButtonStyle;

})(primevue.base.style);
