this.primevue = this.primevue || {};
this.primevue.paginator = this.primevue.paginator || {};
this.primevue.paginator.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
    function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
    function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
    var classes = {
      paginator: function paginator(_ref) {
        var instance = _ref.instance,
          key = _ref.key;
        return ['p-paginator p-component', _defineProperty({
          'p-paginator-default': !instance.hasBreakpoints()
        }, "p-paginator-".concat(key), instance.hasBreakpoints())];
      },
      start: 'p-paginator-left-content',
      end: 'p-paginator-right-content',
      firstPageButton: function firstPageButton(_ref3) {
        var instance = _ref3.instance;
        return ['p-paginator-first p-paginator-element p-link', {
          'p-disabled': instance.$attrs.disabled
        }];
      },
      firstPageIcon: 'p-paginator-icon',
      previousPageButton: function previousPageButton(_ref4) {
        var instance = _ref4.instance;
        return ['p-paginator-prev p-paginator-element p-link', {
          'p-disabled': instance.$attrs.disabled
        }];
      },
      previousPageIcon: 'p-paginator-icon',
      nextPageButton: function nextPageButton(_ref5) {
        var instance = _ref5.instance;
        return ['p-paginator-next p-paginator-element p-link', {
          'p-disabled': instance.$attrs.disabled
        }];
      },
      nextPageIcon: 'p-paginator-icon',
      lastPageButton: function lastPageButton(_ref6) {
        var instance = _ref6.instance;
        return ['p-paginator-last p-paginator-element p-link', {
          'p-disabled': instance.$attrs.disabled
        }];
      },
      lastPageIcon: 'p-paginator-icon',
      pages: 'p-paginator-pages',
      pageButton: function pageButton(_ref7) {
        var props = _ref7.props,
          pageLink = _ref7.pageLink;
        return ['p-paginator-page p-paginator-element p-link', {
          'p-highlight': pageLink - 1 === props.page
        }];
      },
      current: 'p-paginator-current',
      rowPerPageDropdown: 'p-paginator-rpp-options',
      jumpToPageDropdown: 'p-paginator-page-options',
      jumpToPageInput: 'p-paginator-page-input'
    };
    var PaginatorStyle = BaseStyle__default["default"].extend({
      name: 'paginator',
      classes: classes
    });

    return PaginatorStyle;

})(primevue.base.style);
