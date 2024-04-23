this.primevue = this.primevue || {};
this.primevue.confirmpopup = this.primevue.confirmpopup || {};
this.primevue.confirmpopup.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: function root(_ref) {
        var instance = _ref.instance;
        return ['p-confirm-popup p-component', {
          'p-ripple-disabled': instance.$primevue.config.ripple === false
        }];
      },
      content: 'p-confirm-popup-content',
      icon: 'p-confirm-popup-icon',
      message: 'p-confirm-popup-message',
      footer: 'p-confirm-popup-footer',
      rejectButton: function rejectButton(_ref2) {
        var instance = _ref2.instance;
        return ['p-confirm-popup-reject', instance.confirmation && !instance.confirmation.rejectClass ? 'p-button-sm p-button-text' : null];
      },
      acceptButton: function acceptButton(_ref3) {
        var instance = _ref3.instance;
        return ['p-confirm-popup-accept', instance.confirmation && !instance.confirmation.acceptClass ? 'p-button-sm' : null];
      }
    };
    var ConfirmPopupStyle = BaseStyle__default["default"].extend({
      name: 'confirmpopup',
      classes: classes
    });

    return ConfirmPopupStyle;

})(primevue.base.style);
