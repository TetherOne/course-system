'use strict';

var BaseIcon = require('primevue/baseicon');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseIcon__default = /*#__PURE__*/_interopDefaultLegacy(BaseIcon);

var script = {
  name: 'BlankIcon',
  "extends": BaseIcon__default["default"]
};

var _hoisted_1 = /*#__PURE__*/vue.createElementVNode("rect", {
  width: "1",
  height: "1",
  fill: "currentColor",
  "fill-opacity": "0"
}, null, -1);
var _hoisted_2 = [_hoisted_1];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("svg", vue.mergeProps({
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, _ctx.pti()), _hoisted_2, 16);
}

script.render = render;

module.exports = script;
