<template>
  <h1>{{ msg }}</h1>
  <p class="import-meta-url">{{ url }}</p>
</template>

<script>
import { ref, onMounted } from 'vue'
export default {
  async setup() {
    const url = ref(import.meta.env.SSR ? import.meta.url : '')
    onMounted(() => {
      url.value = document.querySelector('.import-meta-url').textContent
    })
    return {
      msg: 'About',
      url,
    }
  },
}
</script>

<style scoped>
h1 {
  color: red;
}
</style>
