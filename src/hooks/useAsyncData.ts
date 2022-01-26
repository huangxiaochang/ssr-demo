import { computed, onMounted, onServerPrefetch } from 'vue'
import type { Store, Dispatch } from 'vuex'
import type { State } from '@/store'
import store from '@/store'

export type StoreAction = ((d: Dispatch, s?: Store<State>) => void) | string
export type StoreGetter = ((g: any, s?: Store<State>) => void) | string

export default function asyncData<T>(
  storeAction: StoreAction,
  storeGetters: StoreGetter,
  downGrade?: (d: T) => boolean,
  ...args: any[]
) {
  const fetchInitialData = async () => {
    if (typeof storeAction === 'string') {
      await store.dispatch(storeAction, ...args)
    } else {
      await storeAction(store.dispatch, store)
    }
  }

  const data = computed<T>(() => {
    if (typeof storeGetters === 'string') {
      return store.getters[storeGetters]
    } else {
      return storeGetters(store.getters, store)
    }
  })

  /* 
  getting data in server
   */
  onServerPrefetch(async () => {
    await fetchInitialData()
  })

  /* 
    if data getting fail in server, we downgrade to client.
   */
  onMounted(async () => {
    const isDownGrade = (downGrade && downGrade(data.value)) || !data.value
    if (isDownGrade) {
      console.log('get data from client')
      await fetchInitialData()
    }
  })

  return data
}
