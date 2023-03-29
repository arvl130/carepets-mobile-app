<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/my-pets"></ion-back-button>
        </ion-buttons>
        <ion-title>My Pets - Dogs</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-button :expand="'block'" @click="onGoToAddDogPage">
        ADD DOG
      </ion-button>
      <ion-list>
        <ion-item v-for="dog in dogs" :key="dog.id">
          <div>{{ dog.name }}</div>
          <div>
            <ion-button @click="onGoToEditDogPage(dog.id)">Edit</ion-button>
          </div>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { getFirestore, collection, getDocs } from "firebase/firestore"
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
  onIonViewDidEnter
} from '@ionic/vue';
import { ref, onMounted } from 'vue';
import { getAuth } from "@firebase/auth";
import router from "@/router";

const dogs = ref<Array<any>>([])
const isLoading = ref(true)
const isError = ref(false)

async function loadDogs() {
  isLoading.value = true
  const auth = getAuth()
  if (!auth.currentUser) return
  const db = getFirestore()
  const dogsRef = collection(db, `users/${auth.currentUser.uid}/pets`);

  const querySnapshot = await getDocs(dogsRef)
  if (!querySnapshot.empty) {
    dogs.value = []
    querySnapshot.forEach((doc) => {
      dogs.value.push({
        id: doc.id,
        ...doc.data()
      })
    })
  }

  isError.value = false
  isLoading.value = false
}

onIonViewDidEnter(() => loadDogs())

function onGoToAddDogPage() {
  router.push("/my-pets/dogs/add")
}

function onGoToEditDogPage(dogId: string) {
  router.push({
    path: `/my-pets/dogs/${dogId}/edit`,
    params: {
      petId: dogId
    }
  })
}
</script>