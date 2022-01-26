<template>
  <hkust-config-provider :locale="locale">
    <hkust-header
      :locales="SUPPORT_LOCALES"
      search-teleport="#search-teleport"
      locales-teleport="body"
      @localesChange="changeLocale"
    />
    <router-link to="/gz/">Home</router-link>|
    <router-link :to="`/gz/${lang}/about`">About</router-link>
    <hr />
    <div class="more-btn-wrap">
      <a href="/news" class="more-btn">MORE NEWS</a>
    </div>
    <div class="arrow-wrap">
      <div class="prev-arrow slick-arrow" id="prev-arrow" style="">&lt;</div>

      <div class="next-arrow slick-arrow" id="next-arrow" style="">&gt;</div>
    </div>
    333
    <a href="/gz/">Home</a>|
    <a :href="`/gz/${lang}/about`">About</a>

    <p>{{ $t('copyright') }}</p>

    <el-button type="text" @click="dialogVisible = true"
      >click to open the Dialog</el-button
    >

    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <ul>
      <li v-for="item in list" :key="item.id">{{ item.name }}</li>
    </ul>
    <router-view v-slot="{ Component }">
      <suspense>
        <component :is="Component" />
      </suspense>
    </router-view>
    <hkust-search v-model="dialogVisible" />
    <hkust-footer />
  </hkust-config-provider>
</template>

<script lang="ts">
import {
  onUpdated,
  onMounted,
  ref,
  defineComponent,
  computed,
  onServerPrefetch,
} from 'vue'
import { useStore } from 'vuex'
import useToggleLocale from '@/hooks/useToggleLocale'
import { SUPPORT_LOCALES } from '@/config/index'
import { getAllDepartment } from '@/api/common'

export default defineComponent({
  name: 'App',
  setup() {
    const { locale, lang, changeLocale } = useToggleLocale()

    const store = useStore()

    const list = computed(() => {
      return store.state.common.menusList
    })

    const visible = ref(false)
    const vague = ref(true)
    const handleModalClick = () => {}

    const dialogVisible = ref(false)

    const handleClose = (done: any) => {
      done()
    }

    onMounted(() => {
      console.log(2423)
    })

    onUpdated(() => {
      console.log('update')
    })

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
      handleClose,
    }
  },
  asyncData(ctx: any) {
    // return getAllDepartment().then(res => {
    //     ctx.store.dispatch('common/setMenus', res.data)
    //   })
  },
  async serverPrefetch() {
    // console.log(this.$store, '3333338855', this.$router)
    return getAllDepartment().then((res) => {
      this.$store.dispatch('common/setMenus', res.data)
    })
  },
})
</script>

<style>
.arrow-wrap .prev-arrow,
.arrow-wrap .next-arrow {
  height: 44px;
  width: 44px;
  line-height: 44px;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
  display: inline-block;
  margin: 0 6px;
}
.arrow-wrap .prev-arrow:hover,
.arrow-wrap .next-arrow:hover {
  background: #A26400;
  color: #fff;
}
.more-btn-wrap {
  padding: 60px 0;
  text-align: center;
}
.more-btn-wrap .more-btn {
  display: inline-block;
  background: #A26400;
  color: #fff;
  line-height: 44px;
  width: 238px;
}
@font-face {
  font-family: 'Inter';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url('./assets/fonts/Inter-Italic.woff2#iefix') format('woff2'),
    url('./assets/fonts/Inter-Italic.woff') format('woff');
}
.inter {
  font-family: 'Inter';
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
