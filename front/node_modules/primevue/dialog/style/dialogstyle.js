this.primevue = this.primevue || {};
this.primevue.dialog = this.primevue.dialog || {};
this.primevue.dialog.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    /* Position */
    var inlineStyles = {
      mask: function mask(_ref) {
        var position = _ref.position,
          modal = _ref.modal;
        return {
          position: 'fixed',
          height: '100%',
          width: '100%',
          left: 0,
          top: 0,
          display: 'flex',
          justifyContent: position === 'left' || position === 'topleft' || position === 'bottomleft' ? 'flex-start' : position === 'right' || position === 'topright' || position === 'bottomright' ? 'flex-end' : 'center',
          alignItems: position === 'top' || position === 'topleft' || position === 'topright' ? 'flex-start' : position === 'bottom' || position === 'bottomleft' || position === 'bottomright' ? 'flex-end' : 'center',
          pointerEvents: modal ? 'auto' : 'none'
        };
      },
      root: {
        display: 'flex',
        flexDirection: 'column',
        pointerEvents: 'auto'
      }
    };
    var classes = {
      mask: function mask(_ref2) {
        var props = _ref2.props;
        var positions = ['left', 'right', 'top', 'topleft', 'topright', 'bottom', 'bottomleft', 'bottomright'];
        var pos = positions.find(function (item) {
          return item === props.position;
        });
        return ['p-dialog-mask', {
          'p-component-overlay p-component-overlay-enter': props.modal
        }, pos ? "p-dialog-".concat(pos) : ''];
      },
      root: function root(_ref3) {
        var props = _ref3.props,
          instance = _ref3.instance;
        return ['p-dialog p-component', {
          'p-dialog-rtl': props.rtl,
          'p-dialog-maximized': props.maximizable && instance.maximized,
          'p-ripple-disabled': instance.$primevue.config.ripple === false
        }];
      },
      header: 'p-dialog-header',
      title: 'p-dialog-title',
      icons: 'p-dialog-header-icons',
      maximizableButton: 'p-dialog-header-icon p-dialog-header-maximize p-link',
      maximizableIcon: 'p-dialog-header-maximize-icon',
      closeButton: 'p-dialog-header-icon p-dialog-header-close p-link',
      closeButtonIcon: 'p-dialog-header-close-icon',
      content: 'p-dialog-content',
      footer: 'p-dialog-footer'
    };
    var DialogStyle = BaseStyle__default["default"].extend({
      name: 'dialog',
      classes: classes,
      inlineStyles: inlineStyles
    });

    return DialogStyle;

})(primevue.base.style);
