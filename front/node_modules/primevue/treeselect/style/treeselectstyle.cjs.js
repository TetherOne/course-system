'use strict';

var BaseStyle = require('primevue/base/style');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

var inlineStyles = {
  root: function root(_ref) {
    var props = _ref.props;
    return {
      position: props.appendTo === 'self' ? 'relative' : undefined
    };
  }
};
var classes = {
  root: function root(_ref2) {
    var instance = _ref2.instance,
      props = _ref2.props;
    return ['p-treeselect p-component p-inputwrapper', {
      'p-treeselect-chip': props.display === 'chip',
      'p-disabled': props.disabled,
      'p-invalid': props.invalid,
      'p-focus': instance.focused,
      'p-variant-filled': props.variant ? props.variant === 'filled' : instance.$primevue.config.inputStyle === 'filled',
      'p-inputwrapper-filled': !instance.emptyValue,
      'p-inputwrapper-focus': instance.focused || instance.overlayVisible
    }];
  },
  labelContainer: 'p-treeselect-label-container',
  label: function label(_ref3) {
    var instance = _ref3.instance,
      props = _ref3.props;
    return ['p-treeselect-label', {
      'p-placeholder': instance.label === props.placeholder,
      'p-treeselect-label-empty': !props.placeholder && instance.emptyValue
    }];
  },
  token: 'p-treeselect-token',
  tokenLabel: 'p-treeselect-token-label',
  trigger: 'p-treeselect-trigger',
  triggerIcon: 'p-treeselect-trigger-icon',
  panel: function panel(_ref4) {
    _ref4.props;
      var instance = _ref4.instance;
    return ['p-treeselect-panel p-component', {
      'p-ripple-disabled': instance.$primevue.config.ripple === false
    }];
  },
  wrapper: 'p-treeselect-items-wrapper',
  emptyMessage: 'p-treeselect-empty-message'
};
var TreeSelectStyle = BaseStyle__default["default"].extend({
  name: 'treeselect',
  classes: classes,
  inlineStyles: inlineStyles
});

module.exports = TreeSelectStyle;
