import { defineNuxtPlugin } from '#app'
import { createPersistedState } from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin(({ $pinia }) => {
  const persist = createPersistedState({
    storage: localStorage,
    key: (id) => `__persisted__${id}`,
  })

  $pinia.use(persist)
})