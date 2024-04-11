this.primevue = this.primevue || {};
this.primevue.autocomplete = this.primevue.autocomplete || {};
this.primevue.autocomplete.style = (function (BaseStyle, utils) {
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
        var instance = _ref.instance,
          props = _ref.props;
        return ['p-autocomplete p-component p-inputwrapper', {
          'p-disabled': props.disabled,
          'p-invalid': props.invalid,
          'p-focus': instance.focused,
          'p-autocomplete-dd': props.dropdown,
          'p-autocomplete-multiple': props.multiple,
          'p-inputwrapper-filled': props.modelValue || utils.ObjectUtils.isNotEmpty(instance.inputValue),
          'p-inputwrapper-focus': instance.focused,
          'p-overlay-open': instance.overlayVisible
        }];
      },
      input: function input(_ref2) {
        var props = _ref2.props,
          instance = _ref2.instance;
        return ['p-autocomplete-input p-inputtext p-component', {
          'p-autocomplete-dd-input': props.dropdown,
          'p-variant-filled': props.variant ? props.variant === 'filled' : instance.$primevue.config.inputStyle === 'filled'
        }];
      },
      container: function container(_ref3) {
        var props = _ref3.props,
          instance = _ref3.instance;
        return ['p-autocomplete-multiple-container p-component p-inputtext', {
          'p-variant-filled': props.variant ? props.variant === 'filled' : instance.$primevue.config.inputStyle === 'filled'
        }];
      },
      token: function token(_ref4) {
        var instance = _ref4.instance,
          i = _ref4.i;
        return ['p-autocomplete-token', {
          'p-focus': instance.focusedMultipleOptionIndex === i
        }];
      },
      tokenLabel: 'p-autocomplete-token-label',
      removeTokenIcon: 'p-autocomplete-token-icon',
      inputToken: 'p-autocomplete-input-token',
      loadingIcon: 'p-autocomplete-loader',
      dropdownButton: 'p-autocomplete-dropdown',
      panel: function panel(_ref5) {
        _ref5.props;
          var instance = _ref5.instance;
        return ['p-autocomplete-panel p-component', {
          'p-ripple-disabled': instance.$primevue.config.ripple === false
        }];
      },
      list: 'p-autocomplete-items',
      itemGroup: 'p-autocomplete-item-group',
      item: function item(_ref6) {
        var instance = _ref6.instance,
          option = _ref6.option,
          i = _ref6.i,
          getItemOptions = _ref6.getItemOptions;
        return ['p-autocomplete-item', {
          'p-highlight': instance.isSelected(option),
          'p-focus': instance.focusedOptionIndex === instance.getOptionIndex(i, getItemOptions),
          'p-disabled': instance.isOptionDisabled(option)
        }];
      },
      emptyMessage: 'p-autocomplete-empty-message'
    };
    var AutoCompleteStyle = BaseStyle__default["default"].extend({
      name: 'autocomplete',
      classes: classes,
      inlineStyles: inlineStyles
    });

    return AutoCompleteStyle;

})(primevue.base.style, primevue.utils);
