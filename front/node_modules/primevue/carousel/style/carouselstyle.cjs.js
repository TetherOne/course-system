'use strict';

var BaseStyle = require('primevue/base/style');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

var classes = {
  root: function root(_ref) {
    var instance = _ref.instance;
    return ['p-carousel p-component', {
      'p-carousel-vertical': instance.isVertical(),
      'p-carousel-horizontal': !instance.isVertical()
    }];
  },
  header: 'p-carousel-header',
  content: 'p-carousel-content',
  container: 'p-carousel-container',
  previousButton: function previousButton(_ref2) {
    var instance = _ref2.instance;
    return ['p-carousel-prev p-link', {
      'p-disabled': instance.backwardIsDisabled
    }];
  },
  previousButtonIcon: 'p-carousel-next-icon',
  itemsContent: 'p-carousel-items-content',
  itemsContainer: 'p-carousel-items-container',
  itemCloned: function itemCloned(_ref3) {
    var index = _ref3.index,
      value = _ref3.value,
      totalShiftedItems = _ref3.totalShiftedItems,
      d_numVisible = _ref3.d_numVisible;
    return ['p-carousel-item p-carousel-item-cloned', {
      'p-carousel-item-active': totalShiftedItems * -1 === value.length + d_numVisible,
      'p-carousel-item-start': index === 0,
      'p-carousel-item-end': value.slice(-1 * d_numVisible).length - 1 === index
    }];
  },
  item: function item(_ref4) {
    var instance = _ref4.instance,
      index = _ref4.index;
    return ['p-carousel-item', {
      'p-carousel-item-active': instance.firstIndex() <= index && instance.lastIndex() >= index,
      'p-carousel-item-start': instance.firstIndex() === index,
      'p-carousel-item-end': instance.lastIndex() === index
    }];
  },
  nextButton: function nextButton(_ref5) {
    var instance = _ref5.instance;
    return ['p-carousel-next p-link', {
      'p-disabled': instance.forwardIsDisabled
    }];
  },
  nextButtonIcon: 'p-carousel-prev-icon',
  indicators: 'p-carousel-indicators p-reset',
  indicator: function indicator(_ref6) {
    var instance = _ref6.instance,
      index = _ref6.index;
    return ['p-carousel-indicator', {
      'p-highlight': instance.d_page === index
    }];
  },
  indicatorButton: 'p-link',
  footer: 'p-carousel-footer'
};
var CarouselStyle = BaseStyle__default["default"].extend({
  name: 'carousel',
  classes: classes
});

module.exports = CarouselStyle;
