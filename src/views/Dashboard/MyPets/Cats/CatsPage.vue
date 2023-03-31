<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/my-pets"></ion-back-button>
        </ion-buttons>
        <ion-title>My Pet Cats</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-button :expand="'block'" @click="onGoToAddCatsPage">
        ADD CAT
      </ion-button>
      <LoadingAnimation v-if="isLoading" />
      <ion-list v-else>
        <ion-item
          v-for="cat in cats"
          :key="cat.id"
          @click="onGoToEditcatPage(cat.id)"
          button
        >
          {{ cat.name }}
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore"
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonBackButton,
  IonList,
  IonItem,
  onIonViewDidEnter,
} from "@ionic/vue"
import { useRouter } from "vue-router"
import { useRedirectIfUnauthenticated } from "../../../../hooks/redirects"
import { ref } from "vue"
import { getAuth } from "@firebase/auth"
import LoadingAnimation from "../../../../components/LoadingAnimation.vue"

useRedirectIfUnauthenticated()

const cats = ref<Array<any>>([])
const isLoading = ref(true)
const isError = ref(false)

async function loadCats() {
  const auth = getAuth()
  if (!auth.currentUser) return
  const db = getFirestore()
  const catsRef = collection(db, `users/${auth.currentUser.uid}/pets`)

  const querySnapshot = await getDocs(
    query(catsRef, where("type", "==", "cat"))
  )

  const catsFound: Array<any> = []

  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc) => {
      catsFound.push({
        id: doc.id,
        ...doc.data(),
      })
    })
  }

  cats.value = catsFound

  isError.value = false
  isLoading.value = false
}

onIonViewDidEnter(() => loadCats())

const router = useRouter()

function onGoToAddCatsPage() {
  router.push("/my-pets/cats/add")
}

function onGoToEditcatPage(catId: string) {
  router.push({
    name: "My Pets - Edit Cat",
    params: {
      petId: catId,
    },
  })
}
</script>
