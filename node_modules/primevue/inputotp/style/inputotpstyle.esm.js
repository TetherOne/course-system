import BaseStyle from 'primevue/base/style';

var classes = {
  root: 'p-inputotp p-component',
  input: 'p-inputotp-input'
};
var InputOtpStyle = BaseStyle.extend({
  name: 'inputotp',
  classes: classes
});

export { InputOtpStyle as default };
