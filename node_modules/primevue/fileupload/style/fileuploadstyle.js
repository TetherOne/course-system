this.primevue = this.primevue || {};
this.primevue.fileupload = this.primevue.fileupload || {};
this.primevue.fileupload.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

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
    var FileUploadStyle = BaseStyle__default["default"].extend({
      name: 'fileupload',
      classes: classes
    });

    return FileUploadStyle;

})(primevue.base.style);
