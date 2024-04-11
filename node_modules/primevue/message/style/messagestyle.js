this.primevue = this.primevue || {};
this.primevue.message = this.primevue.message || {};
this.primevue.message.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: function root(_ref) {
        var props = _ref.props;
        return 'p-message p-component p-message-' + props.severity;
      },
      wrapper: 'p-message-wrapper',
      icon: 'p-message-icon',
      text: 'p-message-text',
      closeButton: 'p-message-close p-link',
      closeIcon: 'p-message-close-icon'
    };
    var MessageStyle = BaseStyle__default["default"].extend({
      name: 'message',
      classes: classes
    });

    return MessageStyle;

})(primevue.base.style);
