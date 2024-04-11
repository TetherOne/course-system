'use strict';

var BaseStyle = require('primevue/base/style');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ['p-picklist p-component', {
      'p-picklist-striped': props.stripedRows
    }];
  },
  sourceControls: 'p-picklist-buttons p-picklist-source-controls',
  sourceWrapper: 'p-picklist-list-wrapper p-picklist-source-wrapper',
  sourceHeader: 'p-picklist-header',
  sourceList: 'p-picklist-list p-picklist-source-list',
  buttons: 'p-picklist-buttons p-picklist-transfer-buttons',
  targetWrapper: 'p-picklist-list-wrapper p-picklist-target-wrapper',
  targetHeader: 'p-picklist-header',
  targetList: 'p-picklist-list p-picklist-target',
  item: function item(_ref2) {
    var instance = _ref2.instance,
      _item = _ref2.item,
      id = _ref2.id,
      listIndex = _ref2.listIndex;
    return ['p-picklist-item', {
      'p-highlight': instance.isSelected(_item, listIndex),
      'p-focus': id === instance.focusedOptionId
    }];
  },
  targetControls: 'p-picklist-buttons p-picklist-target-controls'
};
var PickListStyle = BaseStyle__default["default"].extend({
  name: 'picklist',
  classes: classes
});

module.exports = PickListStyle;
