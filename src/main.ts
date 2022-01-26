import { createSSRApp } from 'vue'
import hkustUi from 'hkust-ui'
import App from './App.vue'
import { createRouter } from './router/index'
import { createStore } from './store'
import i18n from './plugins/i18n'
import 'hkust-ui/dist/index.css'
import '@/assets/scss/common.scss'

import 'element-plus/theme-chalk/index.css'

// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance. If using Vuex, we'd also be creating a
// fresh store here.
export function createApp() {
  const app = createSSRApp(App)
  const router = createRouter(i18n)
  const store = createStore()
  app.use(router).use(store).use(hkustUi).use(i18n)

  return { app, router, store }
}
