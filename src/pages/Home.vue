<template>
  <h1>Home</h1>
  <button type="button" @click="state.count++">
    count is: {{ state.count }}
  </button>
  <foo />
  <p class="virtual">msg from virtual module:</p>
  <p class="inter">this will be styled with a font-face</p>
  <p class="import-meta-url">{{ url }}</p>
  <p class="protocol">{{ protocol }}</p>

  <import-type />
  <!-- <ul>
    <li v-for="item in list" :key="item.id">{{item.name}}</li>
  </ul> -->
</template>

<script lang="ts">
import {
  reactive,
  defineAsyncComponent,
  ref,
  onMounted,
  defineComponent,
  computed,
} from 'vue'
import { useStore } from 'vuex'
import { getAllDepartment } from '@/api/common'

const ImportType = load('ImportType')
const Foo = defineAsyncComponent(() =>
  import('../components/Foo').then((mod) => mod.Foo)
)
function load(file: any) {
  return defineAsyncComponent(() => import(`../components/${file}.vue`))
}

export default defineComponent({
  name: 'Home',
  components: {
    ImportType,
    Foo,
  },
  setup() {
    const store = useStore()

    const url = ref(import.meta.env.SSR ? import.meta.url : '')
    const protocol = ref('')
    onMounted(() => {})

    const state = reactive({
      count: 0,
    })

    const list = computed(() => {
      return store.state.common.menusList
    })

    onMounted(() => {
      // getAllDepartment().then(res => {
      //   store.dispatch('common/setMenus', res.data)
      // })
    })

    return {
      url,
      protocol,
      state,
      list,
    }
  },
  asyncData(ctx: any) {
    // return getAllDepartment().then(res => {
    //   ctx.store.dispatch('common/setMenus', res.data)
    // })
  },
})
</script>

<style scoped>
h1,
a {
  color: green;
}
</style>
