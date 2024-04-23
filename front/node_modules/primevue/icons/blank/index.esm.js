import BaseIcon from 'primevue/baseicon';
import { openBlock, createElementBlock, mergeProps, createElementVNode } from 'vue';

var script = {
  name: 'BlankIcon',
  "extends": BaseIcon
};

var _hoisted_1 = /*#__PURE__*/createElementVNode("rect", {
  width: "1",
  height: "1",
  fill: "currentColor",
  "fill-opacity": "0"
}, null, -1);
var _hoisted_2 = [_hoisted_1];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", mergeProps({
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, _ctx.pti()), _hoisted_2, 16);
}

script.render = render;

export { script as default };
