this.primevue = this.primevue || {};
this.primevue.timeline = this.primevue.timeline || {};
this.primevue.timeline.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: function root(_ref) {
        var props = _ref.props;
        return ['p-timeline p-component', 'p-timeline-' + props.align, 'p-timeline-' + props.layout];
      },
      event: 'p-timeline-event',
      opposite: 'p-timeline-event-opposite',
      separator: 'p-timeline-event-separator',
      marker: 'p-timeline-event-marker',
      connector: 'p-timeline-event-connector',
      content: 'p-timeline-event-content'
    };
    var TimelineStyle = BaseStyle__default["default"].extend({
      name: 'timeline',
      classes: classes
    });

    return TimelineStyle;

})(primevue.base.style);
