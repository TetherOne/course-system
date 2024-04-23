this.primevue = this.primevue || {};
this.primevue.multiselect = this.primevue.multiselect || {};
this.primevue.multiselect.style = (function (BaseStyle) {
    'use strict';

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
        return ['p-multiselect p-component p-inputwrapper', {
          'p-multiselect-chip': props.display === 'chip',
          'p-disabled': props.disabled,
          'p-invalid': props.invalid,
          'p-variant-filled': props.variant ? props.variant === 'filled' : instance.$primevue.config.inputStyle === 'filled',
          'p-focus': instance.focused,
          'p-inputwrapper-filled': props.modelValue && props.modelValue.length,
          'p-inputwrapper-focus': instance.focused || instance.overlayVisible,
          'p-overlay-open': instance.overlayVisible
        }];
      },
      labelContainer: 'p-multiselect-label-container',
      label: function label(_ref3) {
        var instance = _ref3.instance,
          props = _ref3.props;
        return ['p-multiselect-label', {
          'p-placeholder': instance.label === props.placeholder,
          'p-multiselect-label-empty': !props.placeholder && (!props.modelValue || props.modelValue.length === 0)
        }];
      },
      token: 'p-multiselect-token',
      tokenLabel: 'p-multiselect-token-label',
      removeTokenIcon: 'p-multiselect-token-icon',
      trigger: 'p-multiselect-trigger',
      loadingIcon: 'p-multiselect-trigger-icon',
      dropdownIcon: 'p-multiselect-trigger-icon',
      panel: function panel(_ref4) {
        _ref4.props;
          var instance = _ref4.instance;
        return ['p-multiselect-panel p-component', {
          'p-ripple-disabled': instance.$primevue.config.ripple === false
        }];
      },
      header: 'p-multiselect-header',
      filterContainer: 'p-multiselect-filter-container',
      filterInput: function filterInput(_ref5) {
        var props = _ref5.props,
          instance = _ref5.instance;
        return ['p-multiselect-filter p-inputtext p-component', {
          'p-variant-filled': props.variant ? props.variant === 'filled' : instance.$primevue.config.inputStyle === 'filled'
        }];
      },
      filterIcon: 'p-multiselect-filter-icon',
      closeButton: 'p-multiselect-close p-link',
      closeIcon: 'p-multiselect-close-icon',
      wrapper: 'p-multiselect-items-wrapper',
      list: 'p-multiselect-items p-component',
      itemGroup: 'p-multiselect-item-group',
      item: function item(_ref6) {
        var instance = _ref6.instance,
          option = _ref6.option,
          index = _ref6.index,
          getItemOptions = _ref6.getItemOptions,
          props = _ref6.props;
        return ['p-multiselect-item', {
          'p-highlight': instance.isSelected(option) && props.highlightOnSelect,
          'p-focus': instance.focusedOptionIndex === instance.getOptionIndex(index, getItemOptions),
          'p-disabled': instance.isOptionDisabled(option)
        }];
      },
      emptyMessage: 'p-multiselect-empty-message'
    };
    var MultiSelectStyle = BaseStyle__default["default"].extend({
      name: 'multiselect',
      classes: classes,
      inlineStyles: inlineStyles
    });

    return MultiSelectStyle;

})(primevue.base.style);
