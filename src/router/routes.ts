import Home from '../pages/Home.vue'
import type { RouteRecordRaw } from 'vue-router'
import { SUPPORT_LOCALES } from '@/config/index'

const LANGS_REG = (() => {
  const langs = SUPPORT_LOCALES.map((item) => item.value)
  return langs.join('|')
})()

export const routes: Array<RouteRecordRaw> = [
  {
    path: `/gz/:locale(${LANGS_REG})`,
    // alias: '/',
    component: Home,
    name: 'Home',
    meta: {
      title: 'Home | HKUST(GZ)',
      description: 'this is home for hkust(gz)',
      keywords: 'hkust,home,hkust(gz)',
    },
  },
  {
    path: `/gz/:locale(${LANGS_REG})/about`,
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../pages/About.vue'),
  },
  {
    path: '/gz/:pathMatch(.*)*',
    name: 'NotFound',
    component: () =>
      import(/* webpackChunkName: "notFound" */ '../pages/404.vue'),
  },
]
