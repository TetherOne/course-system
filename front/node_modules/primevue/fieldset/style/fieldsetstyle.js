this.primevue = this.primevue || {};
this.primevue.fieldset = this.primevue.fieldset || {};
this.primevue.fieldset.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: function root(_ref) {
        var props = _ref.props;
        return ['p-fieldset p-component', {
          'p-fieldset-toggleable': props.toggleable
        }];
      },
      legend: 'p-fieldset-legend',
      legendtitle: 'p-fieldset-legend-text',
      togglericon: 'p-fieldset-toggler',
      toggleablecontent: 'p-toggleable-content',
      content: 'p-fieldset-content'
    };
    var FieldsetStyle = BaseStyle__default["default"].extend({
      name: 'fieldset',
      classes: classes
    });

    return FieldsetStyle;

})(primevue.base.style);
