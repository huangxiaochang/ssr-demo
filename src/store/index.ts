import { createStore as _createStore, useStore as baseUseStore } from 'vuex'
import modules from './modules/index'
import type { InjectionKey } from 'vue'
import type { Store } from 'vuex'

import type { CommonState } from './modules/common'

export interface State {
  common: CommonState
}

export const key: InjectionKey<Store<State>> = Symbol()

/* 
  if you want to simplify the usage useStore, you can use this `useStore`, insteading of using `useStore` from 'vuex'
  by the way, thi need to register the key when register the store in main entry, for example:
  
  // main.ts
  import store, { key } from '@/store/index'

  app.use(store, key)
 */
export function useStore() {
  return baseUseStore(key)
}

export const createStore = () => {
  const store = _createStore<State>({
    modules,
  })

  return store
}
