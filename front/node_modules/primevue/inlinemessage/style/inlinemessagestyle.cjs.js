'use strict';

var BaseStyle = require('primevue/base/style');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

var classes = {
  root: function root(_ref) {
    var props = _ref.props,
      instance = _ref.instance;
    return ['p-inline-message p-component p-inline-message-' + props.severity, {
      'p-inline-message-icon-only': !instance.$slots["default"]
    }];
  },
  icon: function icon(_ref2) {
    var props = _ref2.props;
    return ['p-inline-message-icon', props.icon];
  },
  text: 'p-inline-message-text'
};
var InlineMessageStyle = BaseStyle__default["default"].extend({
  name: 'inlinemessage',
  classes: classes
});

module.exports = InlineMessageStyle;
