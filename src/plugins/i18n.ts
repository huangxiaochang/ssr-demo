import { nextTick } from 'vue'
import { createI18n } from 'vue-i18n'
import type { I18n, I18nOptions } from 'vue-i18n'
import { DEFAULT_LOCALE } from '@/config/index'
import EnLocales from '@/locales/en'
import ZhLocales from '@/locales/zh-cn'

const localesModules = import.meta.glob('../locales/**')

export function setI18nLanguage(i18n: I18n, locale: string) {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale
  } else {
    ;(i18n.global.locale as any).value = locale
  }
}

export async function loadLocaleMessages(i18n: I18n, locale: string) {
  const messages = await Promise.all([
    localesModules[`../locales/${locale}.ts`](),
  ])

  i18n.global.setLocaleMessage(locale, {
    ...messages[0].default,
  })

  return nextTick()
}

export function setupI18n(options: I18nOptions) {
  const i18n = createI18n(options)
  setI18nLanguage(i18n as I18n, DEFAULT_LOCALE)
  return i18n
}

const i18n = createI18n({
  locale: DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  messages: {
    en: {
      ...EnLocales,
    },
    'zh-cn': {
      ...ZhLocales,
    },
  },
})

export default i18n as I18n
