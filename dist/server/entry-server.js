"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var serverRenderer = require("vue/server-renderer");
var vue = require("vue");
var hkustUi = require("hkust-ui");
var lib = require("element-plus/lib");
var vuex = require("vuex");
var vueRouter = require("vue-router");
var hkustEnLocale = require("hkust-ui/lib/locale/lang/en.js");
var hkustZhcnLocale = require("hkust-ui/lib/locale/lang/zh-cn.js");
var hkustZhtwLocale = require("hkust-ui/lib/locale/lang/zh-tw.js");
var axios = require("axios");
var vueI18n = require("vue-i18n");
function _interopDefaultLegacy(e) {
  return e && typeof e === "object" && "default" in e ? e : { "default": e };
}
var hkustUi__default = /* @__PURE__ */ _interopDefaultLegacy(hkustUi);
var hkustEnLocale__default = /* @__PURE__ */ _interopDefaultLegacy(hkustEnLocale);
var hkustZhcnLocale__default = /* @__PURE__ */ _interopDefaultLegacy(hkustZhcnLocale);
var hkustZhtwLocale__default = /* @__PURE__ */ _interopDefaultLegacy(hkustZhtwLocale);
var axios__default = /* @__PURE__ */ _interopDefaultLegacy(axios);
var elButton = "";
const SUPPORT_LOCALES = [
  {
    label: "Eng",
    value: "en"
  },
  {
    label: "\u7B80\u4F53",
    value: "zh-cn"
  }
];
const DEFAULT_LOCALE = "en";
const hkustLocales = {
  en: hkustEnLocale__default["default"],
  "zh-cn": hkustZhcnLocale__default["default"],
  "zh-tw": hkustZhtwLocale__default["default"]
};
function useToggleLocale() {
  const supportLocales = SUPPORT_LOCALES;
  const router = vueRouter.useRouter();
  const route = vueRouter.useRoute();
  const lang = vue.computed(() => route.params.locale || DEFAULT_LOCALE);
  const locale = vue.computed(() => hkustLocales[lang.value]);
  const changeLocale = (val) => {
    const routeLocation = router.resolve(__spreadProps(__spreadValues({}, route), {
      params: __spreadProps(__spreadValues({}, route.params), {
        locale: val
      })
    }));
    window.location.href = routeLocation.href;
  };
  return {
    lang,
    locale,
    supportLocales,
    changeLocale
  };
}
let baseURL = "";
let ssoAuthsServer = "";
{
  baseURL = "https://ims.hkust-gz.edu.cn/";
  ssoAuthsServer = "https://sso.hkust-gz.edu.cn/";
}
const apiConfig = {
  baseURL,
  ssoAuthsServer
};
const instance = axios__default["default"].create({
  baseURL: apiConfig.baseURL,
  timeout: 3e4
});
instance.interceptors.request.use(async (config) => {
  return config;
}, (error) => {
  console.log(error);
  return Promise.reject(error);
});
instance.interceptors.response.use((response) => {
  if (response.status >= 200 && response.status < 300) {
    if (response.data.msg)
      ;
    return response;
  } else {
    if (response.statusText)
      ;
    return Promise.reject(response);
  }
}, (error) => {
  return Promise.reject(error);
});
function getAllDepartment() {
  return instance.get(`/edirectory/external/edstaff/getAllDepartment`).then((response) => response.data);
}
var App_vue_vue_type_style_index_0_lang = "";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$4 = vue.defineComponent({
  name: "App",
  setup() {
    const { locale, lang, changeLocale } = useToggleLocale();
    const store = vuex.useStore();
    const list = vue.computed(() => {
      return store.state.common.menusList;
    });
    const visible = vue.ref(false);
    const vague = vue.ref(true);
    const handleModalClick = () => {
    };
    const dialogVisible = vue.ref(false);
    const handleClose = (done) => {
      done();
    };
    vue.onMounted(() => {
      console.log(2423);
    });
    vue.onUpdated(() => {
      console.log("update");
    });
    return {
      locale,
      lang,
      dialogVisible,
      SUPPORT_LOCALES,
      visible,
      vague,
      list,
      changeLocale,
      handleModalClick,
      handleClose
    };
  },
  asyncData(ctx) {
  },
  async serverPrefetch() {
    return getAllDepartment().then((res) => {
      this.$store.dispatch("common/setMenus", res.data);
    });
  }
});
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_hkust_config_provider = vue.resolveComponent("hkust-config-provider");
  const _component_hkust_header = vue.resolveComponent("hkust-header");
  const _component_router_link = vue.resolveComponent("router-link");
  const _component_el_button = lib.ElButton;
  const _component_router_view = vue.resolveComponent("router-view");
  const _component_hkust_search = vue.resolveComponent("hkust-search");
  const _component_hkust_footer = vue.resolveComponent("hkust-footer");
  _push(serverRenderer.ssrRenderComponent(_component_hkust_config_provider, vue.mergeProps({ locale: _ctx.locale }, _attrs), {
    default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(serverRenderer.ssrRenderComponent(_component_hkust_header, {
          locales: _ctx.SUPPORT_LOCALES,
          "search-teleport": "#search-teleport",
          "locales-teleport": "body"
        }, null, _parent2, _scopeId));
        _push2(serverRenderer.ssrRenderComponent(_component_router_link, { to: "/gz/" }, {
          default: vue.withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Home`);
            } else {
              return [
                vue.createTextVNode("Home")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`| `);
        _push2(serverRenderer.ssrRenderComponent(_component_router_link, {
          to: `/gz/${_ctx.lang}/about`
        }, {
          default: vue.withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`About`);
            } else {
              return [
                vue.createTextVNode("About")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<hr${_scopeId}> 333 <a href="/gz/"${_scopeId}>Home</a>| <a${serverRenderer.ssrRenderAttr("href", `/gz/${_ctx.lang}/about`)}${_scopeId}>About</a><p${_scopeId}>${serverRenderer.ssrInterpolate(_ctx.$t("copyright"))}</p>`);
        _push2(serverRenderer.ssrRenderComponent(_component_el_button, { type: "text" }, {
          default: vue.withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`click to open the Dialog`);
            } else {
              return [
                vue.createTextVNode("click to open the Dialog")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(serverRenderer.ssrRenderComponent(_component_el_button, null, {
          default: vue.withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Default`);
            } else {
              return [
                vue.createTextVNode("Default")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(serverRenderer.ssrRenderComponent(_component_el_button, { type: "primary" }, {
          default: vue.withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Primary`);
            } else {
              return [
                vue.createTextVNode("Primary")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(serverRenderer.ssrRenderComponent(_component_el_button, { type: "success" }, {
          default: vue.withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Success`);
            } else {
              return [
                vue.createTextVNode("Success")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<ul${_scopeId}><!--[-->`);
        serverRenderer.ssrRenderList(_ctx.list, (item) => {
          _push2(`<li${_scopeId}>${serverRenderer.ssrInterpolate(item.name)}</li>`);
        });
        _push2(`<!--]--></ul>`);
        _push2(serverRenderer.ssrRenderComponent(_component_router_view, null, {
          default: vue.withCtx(({ Component }, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              serverRenderer.ssrRenderSuspense(_push3, {
                default: () => {
                  serverRenderer.ssrRenderVNode(_push3, vue.createVNode(vue.resolveDynamicComponent(Component), null, null), _parent3, _scopeId2);
                },
                _: 2
              });
            } else {
              return [
                (vue.openBlock(), vue.createBlock(vue.Suspense, null, {
                  default: vue.withCtx(() => [
                    (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(Component)))
                  ]),
                  _: 2
                }, 1024))
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(serverRenderer.ssrRenderComponent(_component_hkust_search, {
          modelValue: _ctx.dialogVisible,
          "onUpdate:modelValue": ($event) => _ctx.dialogVisible = $event
        }, null, _parent2, _scopeId));
        _push2(serverRenderer.ssrRenderComponent(_component_hkust_footer, null, null, _parent2, _scopeId));
      } else {
        return [
          vue.createVNode(_component_hkust_header, {
            locales: _ctx.SUPPORT_LOCALES,
            "search-teleport": "#search-teleport",
            "locales-teleport": "body",
            onLocalesChange: _ctx.changeLocale
          }, null, 8, ["locales", "onLocalesChange"]),
          vue.createVNode(_component_router_link, { to: "/gz/" }, {
            default: vue.withCtx(() => [
              vue.createTextVNode("Home")
            ]),
            _: 1
          }),
          vue.createTextVNode("| "),
          vue.createVNode(_component_router_link, {
            to: `/gz/${_ctx.lang}/about`
          }, {
            default: vue.withCtx(() => [
              vue.createTextVNode("About")
            ]),
            _: 1
          }, 8, ["to"]),
          vue.createVNode("hr"),
          vue.createTextVNode(" 333 "),
          vue.createVNode("a", { href: "/gz/" }, "Home"),
          vue.createTextVNode("| "),
          vue.createVNode("a", {
            href: `/gz/${_ctx.lang}/about`
          }, "About", 8, ["href"]),
          vue.createVNode("p", null, vue.toDisplayString(_ctx.$t("copyright")), 1),
          vue.createVNode(_component_el_button, {
            type: "text",
            onClick: ($event) => _ctx.dialogVisible = true
          }, {
            default: vue.withCtx(() => [
              vue.createTextVNode("click to open the Dialog")
            ]),
            _: 1
          }, 8, ["onClick"]),
          vue.createVNode(_component_el_button, null, {
            default: vue.withCtx(() => [
              vue.createTextVNode("Default")
            ]),
            _: 1
          }),
          vue.createVNode(_component_el_button, { type: "primary" }, {
            default: vue.withCtx(() => [
              vue.createTextVNode("Primary")
            ]),
            _: 1
          }),
          vue.createVNode(_component_el_button, { type: "success" }, {
            default: vue.withCtx(() => [
              vue.createTextVNode("Success")
            ]),
            _: 1
          }),
          vue.createVNode("ul", null, [
            (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(_ctx.list, (item) => {
              return vue.openBlock(), vue.createBlock("li", {
                key: item.id
              }, vue.toDisplayString(item.name), 1);
            }), 128))
          ]),
          vue.createVNode(_component_router_view, null, {
            default: vue.withCtx(({ Component }) => [
              (vue.openBlock(), vue.createBlock(vue.Suspense, null, {
                default: vue.withCtx(() => [
                  (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(Component)))
                ]),
                _: 2
              }, 1024))
            ]),
            _: 1
          }),
          vue.createVNode(_component_hkust_search, {
            modelValue: _ctx.dialogVisible,
            "onUpdate:modelValue": ($event) => _ctx.dialogVisible = $event
          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
          vue.createVNode(_component_hkust_footer)
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("src/App.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var App = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$3]]);
const _sfc_main$3 = /* @__PURE__ */ vue.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<p${serverRenderer.ssrRenderAttrs(_attrs)}>import type should be removed without side-effect</p>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/ImportType.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var ImportType$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _sfc_main$3
});
var Home_vue_vue_type_style_index_0_scoped_true_lang = "";
function __variableDynamicImportRuntime1__(path) {
  switch (path) {
    case "../components/ImportType.vue":
      return Promise.resolve().then(function() {
        return ImportType$1;
      });
    default:
      return new Promise(function(resolve, reject) {
        (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(reject.bind(null, new Error("Unknown variable dynamic import: " + path)));
      });
  }
}
const ImportType = load("ImportType");
const Foo$2 = vue.defineAsyncComponent(() => Promise.resolve().then(function() {
  return Foo$1;
}).then((mod) => mod.Foo));
function load(file) {
  return vue.defineAsyncComponent(() => __variableDynamicImportRuntime1__(`../components/${file}.vue`));
}
const _sfc_main$2 = vue.defineComponent({
  name: "Home",
  components: {
    ImportType,
    Foo: Foo$2
  },
  setup() {
    const store = vuex.useStore();
    const url = vue.ref(typeof document === "undefined" ? new (require("url")).URL("file:" + __filename).href : document.currentScript && document.currentScript.src || new URL("entry-server.js", document.baseURI).href);
    const protocol = vue.ref("");
    vue.onMounted(() => {
    });
    const state2 = vue.reactive({
      count: 0
    });
    const list = vue.computed(() => {
      return store.state.common.menusList;
    });
    vue.onMounted(() => {
    });
    return {
      url,
      protocol,
      state: state2,
      list
    };
  },
  asyncData(ctx) {
  }
});
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_foo = vue.resolveComponent("foo");
  const _component_import_type = _sfc_main$3;
  _push(`<!--[--><h1 data-v-75115bbe>Home</h1><button type="button" data-v-75115bbe> count is: ${serverRenderer.ssrInterpolate(_ctx.state.count)}</button>`);
  _push(serverRenderer.ssrRenderComponent(_component_foo, null, null, _parent));
  _push(`<p class="virtual" data-v-75115bbe>msg from virtual module:</p><p class="inter" data-v-75115bbe>this will be styled with a font-face</p><p class="import-meta-url" data-v-75115bbe>${serverRenderer.ssrInterpolate(_ctx.url)}</p><p class="protocol" data-v-75115bbe>${serverRenderer.ssrInterpolate(_ctx.protocol)}</p>`);
  _push(serverRenderer.ssrRenderComponent(_component_import_type, null, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("src/pages/Home.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var Home = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-75115bbe"]]);
const LANGS_REG = (() => {
  const langs = SUPPORT_LOCALES.map((item) => item.value);
  return langs.join("|");
})();
const routes = [
  {
    path: `/gz/:locale(${LANGS_REG})`,
    component: Home,
    name: "Home",
    meta: {
      title: "Home | HKUST(GZ)",
      description: "this is home for hkust(gz)",
      keywords: "hkust,home,hkust(gz)"
    }
  },
  {
    path: `/gz/:locale(${LANGS_REG})/about`,
    name: "About",
    component: () => Promise.resolve().then(function() {
      return About$1;
    })
  },
  {
    path: "/gz/:pathMatch(.*)*",
    name: "NotFound",
    component: () => Promise.resolve().then(function() {
      return _404$1;
    })
  }
];
var EnLocales = {
  title: "Title",
  hkust_gz: "HKUST(GZ)",
  follow_hkust_gz: "Follow HKUST(GZ) on",
  copyright: "Copyright \xA9 The Hong Kong University of Science and Technology (Guangzhou). All rights reserved. ",
  footer_menu: {
    policy: "Privacy",
    sitemap: "Sitemap"
  },
  department: "Department",
  keyword: "Name",
  serach: "SEARCH",
  reset: "RESET",
  functional_title: "Functional Title",
  name: "Name",
  tel: "Extn",
  email: "E-Mail",
  room: "Room",
  extn_tip: {
    msg: "All users of HKUST can make extension calls without IDD charge.",
    hk: "For calls from Hong Kong to the Chinese mainland: Please dial '45' plus the last three digits of phone number.",
    ml: "For calls from the Chinese mainland to Hong Kong: Please dial '8' plus the last four digits of phone number."
  },
  tips: "Tips: For any issues of this directory, please contact HRO ",
  hro_number: "Jimmy ZHANG",
  keyword_placeholder: "Enter name to search...",
  department_select: "Select department",
  "intranet-title": "MY ADMIN INTRANET",
  freqContactPoint: "Frequent Contact Points",
  contactPerson: "Contact Person",
  student: "Student",
  staff: "Staff",
  directory: "DIRECTORY",
  date: "Date",
  subject: "Subject"
};
var en = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": EnLocales
});
var ZhLocales = {
  title: "\u6807\u9898",
  hkust_gz: "\u9999\u6E2F\u79D1\u6280\u5927\u5B66\uFF08\u5E7F\u5DDE\uFF09",
  follow_hkust_gz: "\u5173\u6CE8\u6E2F\u79D1\u5927\uFF08\u5E7F\u5DDE\uFF09",
  copyright: "\xA9 \u7248\u6743\u5C5E\u9999\u6E2F\u79D1\u6280\u5927\u5B66\uFF08\u5E7F\u5DDE\uFF09\u6240\u6709",
  footer_menu: {
    policy: "\u9690\u79C1\u653F\u7B56",
    sitemap: "\u7F51\u9875\u6307\u5357"
  },
  department: "\u90E8\u95E8",
  keyword: "\u59D3\u540D",
  serach: "\u641C\u7D22",
  reset: "\u91CD\u7F6E",
  functional_title: "\u804C\u4F4D\u540D\u79F0",
  name: "\u59D3\u540D",
  tel: "\u7535\u8BDD\u53F7\u7801",
  email: "\u7535\u5B50\u90AE\u4EF6",
  room: "\u529E\u516C\u5730\u70B9",
  extn_tip: {
    msg: "\u9999\u6E2F\u79D1\u6280\u5927\u5B66\u7684\u6240\u6709\u7528\u6237\u5747\u53EF\u514D\u8D39\u62E8\u6253\u5206\u673A\u7535\u8BDD\u3002",
    hk: "\u9999\u6E2F\u62D4\u6253\u5185\u5730\uFF1A45+\u5BF9\u65B9\u7535\u8BDD\u53F7\u7801\u540E\u4E09\u4F4D\u3002",
    ml: "\u5185\u5730\u62E8\u6253\u9999\u6E2F\uFF1A8+\u5BF9\u65B9\u7535\u8BDD\u53F7\u7801\u540E\u56DB\u4F4D"
  },
  tips: "\u63D0\u793A: \u6709\u5173\u6B64\u76EE\u5F55\u7684\u4EFB\u4F55\u95EE\u9898\uFF0C\u8BF7\u8054\u7CFBHRO ",
  hro_number: "\u5F20\u4FCA\u9F99",
  keyword_placeholder: "\u8F93\u5165\u59D3\u540D\u641C\u7D22",
  department_select: "\u9009\u62E9\u90E8\u95E8",
  "intranet-title": "\u6211\u7684\u5185\u90E8\u7BA1\u7406\u7F51\u7AD9",
  freqContactPoint: "\u5E38\u7528\u8054\u7CFB",
  contactPerson: "\u8054\u7CFB\u4EBA",
  student: "\u5B66\u751F",
  staff: "\u6559\u804C\u5458",
  directory: "\u901A\u4FE1\u5F55",
  date: "\u65E5\u671F",
  subject: "\u4E3B\u9898"
};
var zhCn = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": ZhLocales
});
const localesModules = { "../locales/en.ts": () => Promise.resolve().then(function() {
  return en;
}), "../locales/zh-cn.ts": () => Promise.resolve().then(function() {
  return zhCn;
}) };
function setI18nLanguage(i18n2, locale) {
  if (i18n2.mode === "legacy") {
    i18n2.global.locale = locale;
  } else {
    i18n2.global.locale.value = locale;
  }
}
async function loadLocaleMessages(i18n2, locale) {
  const messages = await Promise.all([
    localesModules[`../locales/${locale}.ts`]()
  ]);
  i18n2.global.setLocaleMessage(locale, __spreadValues({}, messages[0].default));
  return vue.nextTick();
}
const i18n = vueI18n.createI18n({
  locale: DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  messages: {
    en: __spreadValues({}, EnLocales),
    "zh-cn": __spreadValues({}, ZhLocales)
  }
});
const createRouter = (i18n2) => {
  const router = vueRouter.createRouter({
    history: vueRouter.createMemoryHistory(),
    routes
  });
  router.beforeEach(async (to, from, next) => {
    if (to.path === "/gz/") {
      return next({
        name: "Home",
        params: {
          locale: from.params.locale || DEFAULT_LOCALE
        }
      });
    }
    const paramsLocale = to.params.locale;
    if (SUPPORT_LOCALES.some((item) => item.value === paramsLocale)) {
      await loadLocaleMessages(i18n2, paramsLocale);
      setI18nLanguage(i18n2, paramsLocale);
      return next();
    }
    return next();
  });
  return router;
};
const state = () => ({
  menusList: [],
  userInfo: {}
});
const mutations = {
  SET_MENUS(state2, payload) {
    state2.menusList = payload;
  },
  SET_USER_INFO(state2, payload) {
    state2.userInfo = payload;
  }
};
const actions = {
  setMenus({ commit }, data) {
    commit("SET_MENUS", data);
  },
  setUserInfo({ commit }, data) {
    commit("SET_USER_INFO", data);
  }
};
const getters = {
  getMenus(state2) {
    return state2.menusList;
  },
  getUserInfo(state2) {
    return state2.userInfo;
  }
};
const CommonModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
var modules = {
  common: CommonModule
};
const createStore = () => {
  const store = vuex.createStore({
    modules
  });
  return store;
};
var index$1 = "";
var common = "";
var index = "";
function createApp() {
  const app = vue.createSSRApp(App);
  const router = createRouter(i18n);
  const store = createStore();
  app.use(router).use(store).use(hkustUi__default["default"]).use(i18n);
  return { app, router, store };
}
const getAsyncData = async (router, store, app) => {
  const matchedComponents = router.currentRoute.value.matched.flatMap((record) => Object.values(record.components));
  matchedComponents.unshift(app._component);
  try {
    await Promise.all(matchedComponents.map((component) => {
      if ("asyncData" in component) {
        return component.asyncData({
          store,
          route: router.currentRoute.value
        });
      }
    }));
  } catch (err) {
    console.log(err);
  }
};
async function render(url, manifest) {
  const { app, router, store } = createApp();
  router.push(url);
  await router.isReady();
  await getAsyncData(router, store, app);
  const ctx = {};
  let html = await serverRenderer.renderToString(app, ctx);
  html += `<script>window.__INITIAL_STATE__ = ${JSON.stringify(store.state)}<\/script>`;
  const preloadLinks = renderPreloadLinks(ctx.modules, manifest);
  return [html, preloadLinks, ctx, router, store];
}
function renderPreloadLinks(modules2, manifest) {
  let links = "";
  const seen = new Set();
  modules2.forEach((id) => {
    const files = manifest[id];
    if (files) {
      files.forEach((file) => {
        if (!seen.has(file)) {
          seen.add(file);
          links += renderPreloadLink(file);
        }
      });
    }
  });
  return links;
}
function renderPreloadLink(file) {
  if (file.endsWith(".js")) {
    return `<link rel="modulepreload" crossorigin href="${file}">`;
  } else if (file.endsWith(".css")) {
    return `<link rel="stylesheet" href="${file}">`;
  } else if (file.endsWith(".woff")) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`;
  } else if (file.endsWith(".woff2")) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`;
  } else if (file.endsWith(".gif")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/gif">`;
  } else if (file.endsWith(".jpg") || file.endsWith(".jpeg")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`;
  } else if (file.endsWith(".png")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/png">`;
  } else {
    return "";
  }
}
var foo = "";
function ssrRegisterHelper(comp, filename) {
  const setup = comp.setup;
  comp.setup = (props, ctx) => {
    const ssrContext = vue.useSSRContext();
    (ssrContext.modules || (ssrContext.modules = new Set())).add(filename);
    if (setup) {
      return setup(props, ctx);
    }
  };
}
const Foo = vue.defineComponent({
  name: "Foo",
  setup() {
    return () => vue.createVNode("div", {
      "class": "jsx"
    }, [vue.createTextVNode("from JSX")]);
  }
});
const __moduleId = "src/components/Foo.jsx";
ssrRegisterHelper(Foo, __moduleId);
var Foo$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  Foo
});
var About_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$1 = {
  async setup() {
    const url = vue.ref(typeof document === "undefined" ? new (require("url")).URL("file:" + __filename).href : document.currentScript && document.currentScript.src || new URL("entry-server.js", document.baseURI).href);
    vue.onMounted(() => {
      url.value = document.querySelector(".import-meta-url").textContent;
    });
    return {
      msg: "About",
      url
    };
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<!--[--><h1 data-v-2f811ef0>${serverRenderer.ssrInterpolate($setup.msg)}</h1><p class="import-meta-url" data-v-2f811ef0>${serverRenderer.ssrInterpolate($setup.url)}</p><!--]-->`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("src/pages/About.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var About = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-2f811ef0"]]);
var About$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": About
});
const _sfc_main = vue.defineComponent({
  name: "NotFound",
  asyncData1() {
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<section${serverRenderer.ssrRenderAttrs(_attrs)}>404</section>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("src/pages/404.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var _404 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
var _404$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _404
});
exports.getAsyncData = getAsyncData;
exports.render = render;
