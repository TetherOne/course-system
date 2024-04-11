import BaseStyle from 'primevue/base/style';

var classes = {
  mask: function mask(_ref) {
    var instance = _ref.instance;
    return ['p-galleria-mask p-component-overlay p-component-overlay-enter', {
      'p-ripple-disabled': instance.$primevue.config.ripple === false
    }];
  },
  root: function root(_ref2) {
    var instance = _ref2.instance;
    var thumbnailsPosClass = instance.$attrs.showThumbnails && instance.getPositionClass('p-galleria-thumbnails', instance.$attrs.thumbnailsPosition);
    var indicatorPosClass = instance.$attrs.showIndicators && instance.getPositionClass('p-galleria-indicators', instance.$attrs.indicatorsPosition);
    return ['p-galleria p-component', {
      'p-galleria-fullscreen': instance.$attrs.fullScreen,
      'p-galleria-indicator-onitem': instance.$attrs.showIndicatorsOnItem,
      'p-galleria-item-nav-onhover': instance.$attrs.showItemNavigatorsOnHover && !instance.$attrs.fullScreen
    }, thumbnailsPosClass, indicatorPosClass];
  },
  closeButton: 'p-galleria-close p-link',
  closeIcon: 'p-galleria-close-icon',
  header: 'p-galleria-header',
  content: 'p-galleria-content',
  footer: 'p-galleria-footer',
  itemWrapper: 'p-galleria-item-wrapper',
  itemContainer: 'p-galleria-item-container',
  previousItemButton: function previousItemButton(_ref3) {
    var instance = _ref3.instance;
    return ['p-galleria-item-prev p-galleria-item-nav p-link', {
      'p-disabled': instance.isNavBackwardDisabled()
    }];
  },
  previousItemIcon: 'p-galleria-item-prev-icon',
  item: 'p-galleria-item',
  nextItemButton: function nextItemButton(_ref4) {
    var instance = _ref4.instance;
    return ['p-galleria-item-next p-galleria-item-nav p-link', {
      'p-disabled': instance.isNavForwardDisabled()
    }];
  },
  nextItemIcon: 'p-galleria-item-next-icon',
  caption: 'p-galleria-caption',
  indicators: 'p-galleria-indicators p-reset',
  indicator: function indicator(_ref5) {
    var instance = _ref5.instance,
      index = _ref5.index;
    return ['p-galleria-indicator', {
      'p-highlight': instance.isIndicatorItemActive(index)
    }];
  },
  indicatorButton: 'p-link',
  thumbnailWrapper: 'p-galleria-thumbnail-wrapper',
  thumbnailContainer: 'p-galleria-thumbnail-container',
  previousThumbnailButton: function previousThumbnailButton(_ref6) {
    var instance = _ref6.instance;
    return ['p-galleria-thumbnail-prev p-link', {
      'p-disabled': instance.isNavBackwardDisabled()
    }];
  },
  previousThumbnailIcon: 'p-galleria-thumbnail-prev-icon',
  thumbnailItemsContainer: 'p-galleria-thumbnail-items-container',
  thumbnailItems: 'p-galleria-thumbnail-items',
  thumbnailItem: function thumbnailItem(_ref7) {
    var instance = _ref7.instance,
      index = _ref7.index,
      activeIndex = _ref7.activeIndex;
    return ['p-galleria-thumbnail-item', {
      'p-galleria-thumbnail-item-current': activeIndex === index,
      'p-galleria-thumbnail-item-active': instance.isItemActive(index),
      'p-galleria-thumbnail-item-start': instance.firstItemAciveIndex() === index,
      'p-galleria-thumbnail-item-end': instance.lastItemActiveIndex() === index
    }];
  },
  thumbnailItemContent: 'p-galleria-thumbnail-item-content',
  nextThumbnailButton: function nextThumbnailButton(_ref8) {
    var instance = _ref8.instance;
    return ['p-galleria-thumbnail-next p-link', {
      'p-disabled': instance.isNavForwardDisabled()
    }];
  },
  nextThumbnailIcon: 'p-galleria-thumbnail-next-icon'
};
var GalleriaStyle = BaseStyle.extend({
  name: 'galleria',
  classes: classes
});

export { GalleriaStyle as default };
