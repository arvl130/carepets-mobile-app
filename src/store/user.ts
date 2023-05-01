import { User, getAuth, onAuthStateChanged } from "firebase/auth"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useUserStore = defineStore("user", () => {
  const isAuthenticated = ref(false)
  const isLoading = ref(true)
  const user = ref<User | null>(null)
  const isInitialized = ref(false)

  function init() {
    if (isInitialized.value) return

    const auth = getAuth()
    onAuthStateChanged(auth, (fbUser) => {
      isLoading.value = false
      if (fbUser) {
        isAuthenticated.value = true
        user.value = fbUser
      } else {
        isAuthenticated.value = false
      }
    })
    isInitialized.value = true
  }

  return { isAuthenticated, isLoading, init, user }
})
