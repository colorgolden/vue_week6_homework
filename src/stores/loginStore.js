import { defineStore } from 'pinia'

export default defineStore('login', {
  state: () => ({ login: false }),
  actions: {
    login () {
      this.login = false
    }
  }
})
