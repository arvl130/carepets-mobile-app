<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/my-pets"></ion-back-button>
        </ion-buttons>
        <ion-title>Edit Pet Dog</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <LoadingAnimation v-if="isLoading" />
      <div v-else>
        <ion-list>
          <ion-item>
            <ion-label>Name:</ion-label>
            <ion-input v-model="formData.name"></ion-input>
          </ion-item>
          <ion-select placeholder="Select a breed" v-model="formData.breed">
            <ion-select-option value="shih tzu">Shih Tzu</ion-select-option>
            <ion-select-option value="pug">Pug</ion-select-option>
            <ion-select-option value="poodle">Poodle</ion-select-option>
            <ion-select-option value="retriever">Retriever</ion-select-option>
            <ion-select-option value="chow chow">Chow Chow</ion-select-option>
            <ion-select-option value="pomeranian">Pomeranian</ion-select-option>
            <ion-select-option value="labrador">Labrador</ion-select-option>
            <ion-select-option value="husky">Husky</ion-select-option>
          </ion-select>
        </ion-list>
        <ion-button color="danger" :expand="'block'" @click="onDeleteDog">
          DELETE
        </ion-button>
        <ion-button :expand="'block'" @click="onEditDog">SAVE</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { getFirestore, doc } from "firebase/firestore"
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
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  alertController,
  onIonViewDidEnter,
} from "@ionic/vue"
import { reactive, ref } from "vue"
import { getAuth } from "@firebase/auth"
import { setDoc, getDoc, deleteDoc } from "@firebase/firestore"
import { useRoute, useRouter } from "vue-router"
import LoadingAnimation from "../../../../components/LoadingAnimation.vue"
import { useRedirectIfUnauthenticated } from "../../../../hooks/redirects"

useRedirectIfUnauthenticated()

const formData = reactive({
  breed: "",
  name: "",
  type: "dog",
})

const route = useRoute()
const isLoading = ref(true)
const isError = ref(false)

onIonViewDidEnter(async () => {
  isLoading.value = true
  isError.value = false

  const db = getFirestore()
  const auth = getAuth()
  const user = auth.currentUser
  if (!user) return

  const docRef = doc(db, `/users/${user.uid}/pets/${route.params.petId}`)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists) return
  const data = docSnap.data()

  if (!data) return
  const { name, breed } = data

  formData.name = name
  formData.breed = breed

  isError.value = false
  isLoading.value = false
})

const router = useRouter()

async function onEditDog() {
  if (formData.breed === "") {
    const alert = await alertController.create({
      header: "Invalid input",
      message: "Please enter a breed for your dog.",
      buttons: ["OK"],
    })

    await alert.present()
    return
  }

  if (formData.name === "") {
    const alert = await alertController.create({
      header: "Invalid input",
      message: "Please enter a name for your dog.",
      buttons: ["OK"],
    })

    await alert.present()
    return
  }

  const auth = getAuth()
  if (!auth.currentUser) return

  const db = getFirestore()
  await setDoc(
    doc(db, `users/${auth.currentUser.uid}/pets/${route.params.petId}`),
    {
      breed: formData.breed,
      name: formData.name,
      type: formData.type,
    }
  )

  formData.name = ""
  formData.breed = ""

  router.back()
}

async function onDeleteDog() {
  const db = getFirestore()
  const auth = getAuth()
  if (!auth.currentUser) return

  await deleteDoc(
    doc(db, `users/${auth.currentUser.uid}/pets/${route.params.petId}`)
  )

  router.back()
}
</script>
