import BaseStyle from 'primevue/base/style';

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
var MessageStyle = BaseStyle.extend({
  name: 'message',
  classes: classes
});

export { MessageStyle as default };
