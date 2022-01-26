import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import hkustEnLocale from 'hkust-ui/lib/locale/lang/en.js'
import hkustZhcnLocale from 'hkust-ui/lib/locale/lang/zh-cn.js'
import hkustZhtwLocale from 'hkust-ui/lib/locale/lang/zh-tw.js'
import { DEFAULT_LOCALE, SUPPORT_LOCALES } from '@/config/index'

const hkustLocales = {
  en: hkustEnLocale,
  'zh-cn': hkustZhcnLocale,
  'zh-tw': hkustZhtwLocale,
} as any

export default function useToggleLocale() {
  const supportLocales = SUPPORT_LOCALES

  const router = useRouter()
  const route = useRoute()
  const lang = computed(() => (route.params.locale as string) || DEFAULT_LOCALE)
  const locale = computed(() => hkustLocales[lang.value])

  const changeLocale = (val: string) => {
    const routeLocation = router.resolve({
      ...route,
      params: {
        ...route.params,
        locale: val,
      },
    })

    window.location.href = routeLocation.href
  }

  return {
    lang,
    locale,
    supportLocales,
    changeLocale,
  }
}
