import type { Router } from 'vue-router'
import type { Store } from 'vuex'
import type { State } from '@/store/index'

declare module '@vue/runtime-core' {
  export interface ComponentCustomOptions {
    asyncData?(store: any): Promise<any>
  }

  export interface ComponentCustomProperties {
    $store: Store<State>
    $router: Router
  }
}

export {}
