import BaseStyle from 'primevue/base/style';

var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ["p-fileupload p-fileupload-".concat(props.mode, " p-component")];
  },
  buttonbar: 'p-fileupload-buttonbar',
  chooseButton: function chooseButton(_ref2) {
    var instance = _ref2.instance,
      props = _ref2.props;
    return ['p-button p-component p-fileupload-choose', {
      'p-fileupload-choose-selected': props.mode === 'basic' && instance.hasFiles,
      'p-disabled': props.disabled,
      'p-focus': instance.focused
    }];
  },
  chooseIcon: 'p-button-icon p-button-icon-left',
  chooseButtonLabel: 'p-button-label',
  content: 'p-fileupload-content',
  empty: 'p-fileupload-empty',
  uploadIcon: 'p-button-icon p-button-icon-left',
  label: 'p-button-label',
  file: 'p-fileupload-file',
  thumbnail: 'p-fileupload-file-thumbnail',
  details: 'p-fileupload-file-details',
  fileName: 'p-fileupload-file-name',
  fileSize: 'p-fileupload-file-size',
  badge: 'p-fileupload-file-badge',
  actions: 'p-fileupload-file-actions',
  removeButton: 'p-fileupload-file-remove'
};
var FileUploadStyle = BaseStyle.extend({
  name: 'fileupload',
  classes: classes
});

export { FileUploadStyle as default };
