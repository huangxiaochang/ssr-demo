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
import { u as useRouter, a as useRoute, c as computed, h as hkustEnLocale, b as hkustZhcnLocale, d as hkustZhtwLocale, e as axios, f as defineComponent, g as useStore, r as ref, o as onMounted, i as onUpdated, j as resolveComponent, k as openBlock, l as createBlock, w as withCtx, m as createVNode, n as createBaseVNode, t as toDisplayString, p as createElementBlock, q as renderList, F as Fragment, S as Suspense, s as resolveDynamicComponent, v as createTextVNode, x as lib, y as defineAsyncComponent, z as reactive, A as pushScopeId, B as popScopeId, C as createI18n, D as nextTick, E as createRouter$1, G as createWebHistory, H as createStore$1, I as createSSRApp, J as index$2 } from "./vendor.456977d6.js";
const p = function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations2) => {
    for (const mutation of mutations2) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
};
p();
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
  en: hkustEnLocale,
  "zh-cn": hkustZhcnLocale,
  "zh-tw": hkustZhtwLocale
};
function useToggleLocale() {
  const supportLocales = SUPPORT_LOCALES;
  const router2 = useRouter();
  const route = useRoute();
  const lang = computed(() => route.params.locale || DEFAULT_LOCALE);
  const locale = computed(() => hkustLocales[lang.value]);
  const changeLocale = (val) => {
    const routeLocation = router2.resolve(__spreadProps(__spreadValues({}, route), {
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
const instance = axios.create({
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
const _sfc_main$2 = defineComponent({
  name: "App",
  setup() {
    const { locale, lang, changeLocale } = useToggleLocale();
    const store2 = useStore();
    const list = computed(() => {
      return store2.state.common.menusList;
    });
    const visible = ref(false);
    const vague = ref(true);
    const handleModalClick = () => {
    };
    const dialogVisible = ref(false);
    const handleClose = (done) => {
      done();
    };
    onMounted(() => {
      console.log(2423);
    });
    onUpdated(() => {
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
const _hoisted_1$1 = /* @__PURE__ */ createTextVNode("Home");
const _hoisted_2$1 = /* @__PURE__ */ createTextVNode("| ");
const _hoisted_3$1 = /* @__PURE__ */ createTextVNode("About");
const _hoisted_4$1 = /* @__PURE__ */ createBaseVNode("hr", null, null, -1);
const _hoisted_5$1 = /* @__PURE__ */ createTextVNode(" 333 ");
const _hoisted_6 = /* @__PURE__ */ createBaseVNode("a", { href: "/gz/" }, "Home", -1);
const _hoisted_7 = /* @__PURE__ */ createTextVNode("| ");
const _hoisted_8 = ["href"];
const _hoisted_9 = /* @__PURE__ */ createTextVNode("click to open the Dialog");
const _hoisted_10 = /* @__PURE__ */ createTextVNode("Default");
const _hoisted_11 = /* @__PURE__ */ createTextVNode("Primary");
const _hoisted_12 = /* @__PURE__ */ createTextVNode("Success");
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_hkust_header = resolveComponent("hkust-header");
  const _component_router_link = resolveComponent("router-link");
  const _component_el_button = lib.ElButton;
  const _component_router_view = resolveComponent("router-view");
  const _component_hkust_search = resolveComponent("hkust-search");
  const _component_hkust_footer = resolveComponent("hkust-footer");
  const _component_hkust_config_provider = resolveComponent("hkust-config-provider");
  return openBlock(), createBlock(_component_hkust_config_provider, { locale: _ctx.locale }, {
    default: withCtx(() => [
      createVNode(_component_hkust_header, {
        locales: _ctx.SUPPORT_LOCALES,
        "search-teleport": "#search-teleport",
        "locales-teleport": "body",
        onLocalesChange: _ctx.changeLocale
      }, null, 8, ["locales", "onLocalesChange"]),
      createVNode(_component_router_link, { to: "/gz/" }, {
        default: withCtx(() => [
          _hoisted_1$1
        ]),
        _: 1
      }),
      _hoisted_2$1,
      createVNode(_component_router_link, {
        to: `/gz/${_ctx.lang}/about`
      }, {
        default: withCtx(() => [
          _hoisted_3$1
        ]),
        _: 1
      }, 8, ["to"]),
      _hoisted_4$1,
      _hoisted_5$1,
      _hoisted_6,
      _hoisted_7,
      createBaseVNode("a", {
        href: `/gz/${_ctx.lang}/about`
      }, "About", 8, _hoisted_8),
      createBaseVNode("p", null, toDisplayString(_ctx.$t("copyright")), 1),
      createVNode(_component_el_button, {
        type: "text",
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.dialogVisible = true)
      }, {
        default: withCtx(() => [
          _hoisted_9
        ]),
        _: 1
      }),
      createVNode(_component_el_button, null, {
        default: withCtx(() => [
          _hoisted_10
        ]),
        _: 1
      }),
      createVNode(_component_el_button, { type: "primary" }, {
        default: withCtx(() => [
          _hoisted_11
        ]),
        _: 1
      }),
      createVNode(_component_el_button, { type: "success" }, {
        default: withCtx(() => [
          _hoisted_12
        ]),
        _: 1
      }),
      createBaseVNode("ul", null, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.list, (item) => {
          return openBlock(), createElementBlock("li", {
            key: item.id
          }, toDisplayString(item.name), 1);
        }), 128))
      ]),
      createVNode(_component_router_view, null, {
        default: withCtx(({ Component }) => [
          (openBlock(), createBlock(Suspense, null, {
            default: withCtx(() => [
              (openBlock(), createBlock(resolveDynamicComponent(Component)))
            ]),
            _: 2
          }, 1024))
        ]),
        _: 1
      }),
      createVNode(_component_hkust_search, {
        modelValue: _ctx.dialogVisible,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.dialogVisible = $event)
      }, null, 8, ["modelValue"]),
      createVNode(_component_hkust_footer)
    ]),
    _: 1
  }, 8, ["locale"]);
}
var App = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1]]);
const scriptRel = "modulepreload";
const seen = {};
const base = "/";
const __vitePreload = function preload(baseModule, deps) {
  if (!deps || deps.length === 0) {
    return baseModule();
  }
  return Promise.all(deps.map((dep) => {
    dep = `${base}${dep}`;
    if (dep in seen)
      return;
    seen[dep] = true;
    const isCss = dep.endsWith(".css");
    const cssSelector = isCss ? '[rel="stylesheet"]' : "";
    if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
      return;
    }
    const link = document.createElement("link");
    link.rel = isCss ? "stylesheet" : scriptRel;
    if (!isCss) {
      link.as = "script";
      link.crossOrigin = "";
    }
    link.href = dep;
    document.head.appendChild(link);
    if (isCss) {
      return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", rej);
      });
    }
  })).then(() => baseModule());
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("p", null, "import type should be removed without side-effect");
    };
  }
});
var ImportType$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _sfc_main$1
});
var Home_vue_vue_type_style_index_0_scoped_true_lang = "";
function __variableDynamicImportRuntime1__(path) {
  switch (path) {
    case "../components/ImportType.vue":
      return __vitePreload(() => Promise.resolve().then(function() {
        return ImportType$1;
      }), true ? void 0 : void 0);
    default:
      return new Promise(function(resolve, reject) {
        (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(reject.bind(null, new Error("Unknown variable dynamic import: " + path)));
      });
  }
}
const ImportType = load("ImportType");
const Foo = defineAsyncComponent(() => __vitePreload(() => import("./Foo.8abf7df4.js"), true ? ["gz-assets/js/Foo.8abf7df4.js","gz-assets/css/Foo.a8752494.css","gz-assets/js/vendor.456977d6.js"] : void 0).then((mod) => mod.Foo));
function load(file) {
  return defineAsyncComponent(() => __variableDynamicImportRuntime1__(`../components/${file}.vue`));
}
const _sfc_main = defineComponent({
  name: "Home",
  components: {
    ImportType,
    Foo
  },
  setup() {
    const store2 = useStore();
    const url = ref("");
    const protocol = ref("");
    onMounted(() => {
    });
    const state2 = reactive({
      count: 0
    });
    const list = computed(() => {
      return store2.state.common.menusList;
    });
    onMounted(() => {
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
const _withScopeId = (n) => (pushScopeId("data-v-75115bbe"), n = n(), popScopeId(), n);
const _hoisted_1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("h1", null, "Home", -1));
const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("p", { class: "virtual" }, "msg from virtual module:", -1));
const _hoisted_3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("p", { class: "inter" }, "this will be styled with a font-face", -1));
const _hoisted_4 = { class: "import-meta-url" };
const _hoisted_5 = { class: "protocol" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_foo = resolveComponent("foo");
  const _component_import_type = _sfc_main$1;
  return openBlock(), createElementBlock(Fragment, null, [
    _hoisted_1,
    createBaseVNode("button", {
      type: "button",
      onClick: _cache[0] || (_cache[0] = ($event) => _ctx.state.count++)
    }, " count is: " + toDisplayString(_ctx.state.count), 1),
    createVNode(_component_foo),
    _hoisted_2,
    _hoisted_3,
    createBaseVNode("p", _hoisted_4, toDisplayString(_ctx.url), 1),
    createBaseVNode("p", _hoisted_5, toDisplayString(_ctx.protocol), 1),
    createVNode(_component_import_type)
  ], 64);
}
var Home = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-75115bbe"]]);
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
    component: () => __vitePreload(() => import(
      /* webpackChunkName: "about" */
      "./About.966f5e6a.js"
    ), true ? ["gz-assets/js/About.966f5e6a.js","gz-assets/css/About.8003fd64.css","gz-assets/js/vendor.456977d6.js"] : void 0)
  },
  {
    path: "/gz/:pathMatch(.*)*",
    name: "NotFound",
    component: () => __vitePreload(() => import(
      /* webpackChunkName: "notFound" */
      "./404.7cc40057.js"
    ), true ? ["gz-assets/js/404.7cc40057.js","gz-assets/js/vendor.456977d6.js"] : void 0)
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
const localesModules = { "../locales/en.ts": () => true ? __vitePreload(() => Promise.resolve().then(function() {
  return en;
}), void 0) : Promise.resolve().then(function() {
  return en;
}), "../locales/zh-cn.ts": () => true ? __vitePreload(() => Promise.resolve().then(function() {
  return zhCn;
}), void 0) : Promise.resolve().then(function() {
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
  return nextTick();
}
const i18n = createI18n({
  locale: DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  messages: {
    en: __spreadValues({}, EnLocales),
    "zh-cn": __spreadValues({}, ZhLocales)
  }
});
const createRouter = (i18n2) => {
  const router2 = createRouter$1({
    history: createWebHistory(),
    routes
  });
  router2.beforeEach(async (to, from, next) => {
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
  return router2;
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
  const store2 = createStore$1({
    modules
  });
  return store2;
};
var index$1 = "";
var common = "";
var index = "";
function createApp() {
  const app2 = createSSRApp(App);
  const router2 = createRouter(i18n);
  const store2 = createStore();
  app2.use(router2).use(store2).use(index$2).use(i18n);
  return { app: app2, router: router2, store: store2 };
}
const { app, router, store } = createApp();
if (window.__INITIAL_STATE__) {
  console.log(window.__INITIAL_STATE__, "window.__INITIAL_STATE__");
  store.replaceState(window.__INITIAL_STATE__);
}
router.isReady().then(() => {
  app.mount("#app");
});
export { _export_sfc as _ };
