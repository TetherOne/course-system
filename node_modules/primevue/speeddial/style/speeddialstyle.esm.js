import BaseStyle from 'primevue/base/style';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

/* Direction */
var inlineStyles = {
  root: function root(_ref) {
    var props = _ref.props;
    return {
      alignItems: (props.direction === 'up' || props.direction === 'down') && 'center',
      justifyContent: (props.direction === 'left' || props.direction === 'right') && 'center',
      flexDirection: props.direction === 'up' ? 'column-reverse' : props.direction === 'down' ? 'column' : props.direction === 'left' ? 'row-reverse' : props.direction === 'right' ? 'row' : null
    };
  },
  menu: function menu(_ref2) {
    var props = _ref2.props;
    return {
      flexDirection: props.direction === 'up' ? 'column-reverse' : props.direction === 'down' ? 'column' : props.direction === 'left' ? 'row-reverse' : props.direction === 'right' ? 'row' : null
    };
  }
};
var classes = {
  root: function root(_ref3) {
    var instance = _ref3.instance,
      props = _ref3.props;
    return ["p-speeddial p-component p-speeddial-".concat(props.type), _defineProperty(_defineProperty(_defineProperty({}, "p-speeddial-direction-".concat(props.direction), props.type !== 'circle'), 'p-speeddial-opened', instance.d_visible), 'p-disabled', props.disabled)];
  },
  button: function button(_ref5) {
    var props = _ref5.props;
    return ['p-speeddial-button p-button-rounded', {
      'p-speeddial-rotate': props.rotateAnimation && !props.hideIcon
    }];
  },
  menu: 'p-speeddial-list',
  menuitem: function menuitem(_ref6) {
    var instance = _ref6.instance,
      id = _ref6.id;
    return ['p-speeddial-item', {
      'p-focus': instance.isItemActive(id)
    }];
  },
  action: function action(_ref7) {
    var item = _ref7.item;
    return ['p-speeddial-action', {
      'p-disabled': item.disabled
    }];
  },
  actionIcon: 'p-speeddial-action-icon',
  mask: function mask(_ref8) {
    var instance = _ref8.instance;
    return ['p-speeddial-mask', {
      'p-speeddial-mask-visible': instance.d_visible
    }];
  }
};
var SpeedDialStyle = BaseStyle.extend({
  name: 'speeddial',
  classes: classes,
  inlineStyles: inlineStyles
});

export { SpeedDialStyle as default };
