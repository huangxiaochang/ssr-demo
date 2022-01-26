import { _ as _export_sfc } from "./index.d3db430e.js";
import { r as ref, o as onMounted, k as openBlock, p as createElementBlock, n as createBaseVNode, t as toDisplayString, F as Fragment } from "./vendor.456977d6.js";
var About_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = {
  async setup() {
    const url = ref("");
    onMounted(() => {
      url.value = document.querySelector(".import-meta-url").textContent;
    });
    return {
      msg: "About",
      url
    };
  }
};
const _hoisted_1 = { class: "import-meta-url" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("h1", null, toDisplayString($setup.msg), 1),
    createBaseVNode("p", _hoisted_1, toDisplayString($setup.url), 1)
  ], 64);
}
var About = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2f811ef0"]]);
export { About as default };
