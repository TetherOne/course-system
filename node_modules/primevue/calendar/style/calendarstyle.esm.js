import BaseStyle from 'primevue/base/style';

var inlineStyles = {
  root: function root(_ref) {
    var props = _ref.props;
    return {
      position: props.appendTo === 'self' ? 'relative' : undefined
    };
  }
};
var classes = {
  root: function root(_ref2) {
    var props = _ref2.props,
      state = _ref2.state;
    return ['p-calendar p-component p-inputwrapper', {
      'p-calendar-w-btn': props.showIcon && props.iconDisplay === 'button',
      'p-icon-field p-icon-field-right': props.showIcon && props.iconDisplay === 'input',
      'p-calendar-timeonly': props.timeOnly,
      'p-calendar-disabled': props.disabled,
      'p-invalid': props.invalid,
      'p-inputwrapper-filled': props.modelValue,
      'p-inputwrapper-focus': state.focused,
      'p-focus': state.focused || state.overlayVisible
    }];
  },
  input: function input(_ref3) {
    var props = _ref3.props,
      instance = _ref3.instance;
    return ['p-inputtext p-component', {
      'p-variant-filled': props.variant ? props.variant === 'filled' : instance.$primevue.config.inputStyle === 'filled'
    }];
  },
  dropdownButton: 'p-datepicker-trigger',
  inputIcon: 'p-datepicker-trigger-icon p-input-icon',
  panel: function panel(_ref4) {
    var instance = _ref4.instance,
      props = _ref4.props,
      state = _ref4.state;
    return ['p-datepicker p-component', {
      'p-datepicker-mobile': instance.queryMatches,
      'p-datepicker-inline': props.inline,
      'p-disabled': props.disabled,
      'p-datepicker-timeonly': props.timeOnly,
      'p-datepicker-multiple-month': props.numberOfMonths > 1,
      'p-datepicker-monthpicker': state.currentView === 'month',
      'p-datepicker-yearpicker': state.currentView === 'year',
      'p-datepicker-touch-ui': props.touchUI,
      'p-ripple-disabled': instance.$primevue.config.ripple === false
    }];
  },
  groupContainer: 'p-datepicker-group-container',
  group: 'p-datepicker-group',
  header: 'p-datepicker-header',
  previousButton: 'p-datepicker-prev p-link',
  previousIcon: 'p-datepicker-prev-icon',
  title: 'p-datepicker-title',
  monthTitle: 'p-datepicker-month p-link',
  yearTitle: 'p-datepicker-year p-link',
  decadeTitle: 'p-datepicker-decade',
  nextButton: 'p-datepicker-next p-link',
  nextIcon: 'p-datepicker-next-icon',
  container: 'p-datepicker-calendar-container',
  table: 'p-datepicker-calendar',
  weekHeader: 'p-datepicker-weekheader p-disabled',
  weekNumber: 'p-datepicker-weeknumber',
  weekLabelContainer: 'p-disabled',
  day: function day(_ref5) {
    var date = _ref5.date;
    return [{
      'p-datepicker-other-month': date.otherMonth,
      'p-datepicker-today': date.today
    }];
  },
  dayLabel: function dayLabel(_ref6) {
    var instance = _ref6.instance,
      date = _ref6.date;
    return [{
      'p-highlight': instance.isSelected(date) && date.selectable,
      'p-disabled': !date.selectable
    }];
  },
  monthPicker: 'p-monthpicker',
  month: function month(_ref7) {
    var instance = _ref7.instance,
      _month = _ref7.month,
      index = _ref7.index;
    return ['p-monthpicker-month', {
      'p-highlight': instance.isMonthSelected(index),
      'p-disabled': !_month.selectable
    }];
  },
  yearPicker: 'p-yearpicker',
  year: function year(_ref8) {
    var instance = _ref8.instance,
      _year = _ref8.year;
    return ['p-yearpicker-year', {
      'p-highlight': instance.isYearSelected(_year.value),
      'p-disabled': !_year.selectable
    }];
  },
  timePicker: 'p-timepicker',
  hourPicker: 'p-hour-picker',
  incrementButton: 'p-link',
  decrementButton: 'p-link',
  separatorContainer: 'p-separator',
  minutePicker: 'p-minute-picker',
  secondPicker: 'p-second-picker',
  ampmPicker: 'p-ampm-picker',
  buttonbar: 'p-datepicker-buttonbar',
  todayButton: 'p-button-text',
  clearButton: 'p-button-text'
};
var CalendarStyle = BaseStyle.extend({
  name: 'calendar',
  classes: classes,
  inlineStyles: inlineStyles
});

export { CalendarStyle as default };
