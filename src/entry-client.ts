import { createApp } from './main'

const { app, router, store } = createApp()

// inject the data from server side
if (window.__INITIAL_STATE__) {
  console.log(window.__INITIAL_STATE__, 'window.__INITIAL_STATE__')

  store.replaceState(window.__INITIAL_STATE__)
}

// wait until router is ready before mounting to ensure hydration match
router.isReady().then(() => {
  app.mount('#app')
})
