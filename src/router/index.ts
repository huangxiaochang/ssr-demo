import {
  createRouter as _createRouter,
  createWebHistory,
  createMemoryHistory,
} from 'vue-router'
import { routes } from './routes'
import type { I18n } from 'vue-i18n'
import { isSSR } from '@/shared/util'
import { loadLocaleMessages, setI18nLanguage } from '@/plugins/i18n'
import { DEFAULT_LOCALE, SUPPORT_LOCALES } from '@/config/index'

export const createRouter = (i18n: I18n) => {
  const router = _createRouter({
    history: isSSR ? createMemoryHistory() : createWebHistory(),
    routes,
  })

  router.beforeEach(async (to, from, next) => {
    if (to.path === '/gz/') {
      return next({
        name: 'Home',
        params: {
          locale: from.params.locale || DEFAULT_LOCALE,
        },
      })
    }
    const paramsLocale = to.params.locale as string
    // use locale if paramsLocale is not in SUPPORT_LOCALES
    if (SUPPORT_LOCALES.some((item) => item.value === paramsLocale)) {
      // load locale messages
      await loadLocaleMessages(i18n, paramsLocale)

      // set i18n language
      setI18nLanguage(i18n, paramsLocale)

      return next()
    }

    return next()
  })

  return router
}
