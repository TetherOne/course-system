this.primevue = this.primevue || {};
this.primevue.terminal = this.primevue.terminal || {};
this.primevue.terminal.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: 'p-terminal p-component',
      content: 'p-terminal-content',
      prompt: 'p-terminal-prompt',
      command: 'p-terminal-command',
      response: 'p-terminal-response',
      container: 'p-terminal-prompt-container',
      commandText: 'p-terminal-input'
    };
    var TerminalStyle = BaseStyle__default["default"].extend({
      name: 'terminal',
      classes: classes
    });

    return TerminalStyle;

})(primevue.base.style);
