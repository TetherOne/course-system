import BaseStyle from 'primevue/base/style';

var classes = {
  root: function root(_ref) {
    var instance = _ref.instance;
    return ['p-overlaypanel p-component', {
      'p-ripple-disabled': instance.$primevue.config.ripple === false
    }];
  },
  content: 'p-overlaypanel-content',
  closeButton: 'p-overlaypanel-close p-link',
  closeIcon: 'p-overlaypanel-close-icon'
};
var OverlayPanelStyle = BaseStyle.extend({
  name: 'overlaypanel',
  classes: classes
});

export { OverlayPanelStyle as default };
