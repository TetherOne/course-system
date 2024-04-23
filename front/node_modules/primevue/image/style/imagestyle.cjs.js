'use strict';

var BaseStyle = require('primevue/base/style');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ['p-image p-component', {
      'p-image-preview-container': props.preview
    }];
  },
  image: function image(_ref2) {
    var props = _ref2.props;
    return props.image;
  },
  button: 'p-image-preview-indicator',
  icon: 'p-image-preview-icon',
  mask: 'p-image-mask p-component-overlay p-component-overlay-enter',
  toolbar: 'p-image-toolbar',
  rotateRightButton: 'p-image-action p-link',
  rotateLeftButton: 'p-image-action p-link',
  zoomOutButton: function zoomOutButton(_ref3) {
    var instance = _ref3.instance;
    return ['p-image-action p-link', {
      'p-disabled': instance.isZoomOutDisabled
    }];
  },
  zoomInButton: function zoomInButton(_ref4) {
    var instance = _ref4.instance;
    return ['p-image-action p-link', {
      'p-disabled': instance.isZoomInDisabled
    }];
  },
  closeButton: 'p-image-action p-link',
  preview: 'p-image-preview'
};
var ImageStyle = BaseStyle__default["default"].extend({
  name: 'image',
  classes: classes
});

module.exports = ImageStyle;
