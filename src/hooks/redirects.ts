import { onIonViewDidEnter } from "@ionic/vue"
import { getAuth } from "firebase/auth"
import { useRouter } from "vue-router"

export function useRedirectIfAuthenticated() {
  const router = useRouter()

  onIonViewDidEnter(() => {
    const auth = getAuth()
    if (auth.currentUser) router.replace("/dashboard")
  })
}

export function useRedirectIfUnauthenticated() {
  const router = useRouter()

  onIonViewDidEnter(() => {
    const auth = getAuth()
    if (!auth.currentUser) router.replace("/signin")
  })
}
