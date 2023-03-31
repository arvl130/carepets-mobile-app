<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/my-pets"></ion-back-button>
        </ion-buttons>
        <ion-title>My Pet Dogs</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-button :expand="'block'" @click="onGoToAddDogPage">
        ADD DOG
      </ion-button>
      <LoadingAnimation v-if="isLoading" />
      <ion-list v-else>
        <ion-item
          v-for="dog in dogs"
          :key="dog.id"
          @click="onGoToEditDogPage(dog.id)"
          button
        >
          {{ dog.name }}
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
import { ref } from "vue"
import { getAuth } from "@firebase/auth"
import { useRedirectIfUnauthenticated } from "../../../../hooks/redirects"
import { useRouter } from "vue-router"
import LoadingAnimation from "../../../../components/LoadingAnimation.vue"

useRedirectIfUnauthenticated()

const dogs = ref<Array<any>>([])
const isLoading = ref(true)
const isError = ref(false)

async function loadDogs() {
  const auth = getAuth()
  if (!auth.currentUser) return
  const db = getFirestore()
  const dogsRef = collection(db, `users/${auth.currentUser.uid}/pets`)

  const querySnapshot = await getDocs(
    query(dogsRef, where("type", "==", "dog"))
  )

  const dogsFound: Array<any> = []

  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc) => {
      dogsFound.push({
        id: doc.id,
        ...doc.data(),
      })
    })
  }

  dogs.value = dogsFound

  isError.value = false
  isLoading.value = false
}

onIonViewDidEnter(() => loadDogs())

const router = useRouter()

function onGoToAddDogPage() {
  router.push("/my-pets/dogs/add")
}

function onGoToEditDogPage(dogId: string) {
  router.push({
    name: "My Pets - Edit Dog",
    params: {
      petId: dogId,
    },
  })
}
</script>
