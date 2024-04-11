'use strict';

var BaseStyle = require('primevue/base/style');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ['p-metergroup p-component', {
      'p-metergroup-horizontal': props.orientation === 'horizontal',
      'p-metergroup-vertical': props.orientation === 'vertical'
    }];
  },
  metercontainer: 'p-metergroup-meters',
  meter: 'p-metergroup-meter',
  labellist: function labellist(_ref2) {
    var props = _ref2.props;
    return ['p-metergroup-labels', {
      'p-metergroup-labels-vertical': props.labelOrientation === 'vertical',
      'p-metergroup-labels-horizontal': props.labelOrientation === 'horizontal'
    }];
  },
  labellistitem: 'p-metergroup-label',
  labelicon: 'p-metergroup-label-icon',
  labellisttype: 'p-metergroup-label-marker',
  label: 'p-metergroup-label-text'
};
var MeterGroupStyle = BaseStyle__default["default"].extend({
  name: 'metergroup',
  classes: classes
});

module.exports = MeterGroupStyle;
