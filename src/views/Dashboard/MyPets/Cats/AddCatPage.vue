<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/my-pets"></ion-back-button>
        </ion-buttons>
        <ion-title>Add Pet Cat</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item>
          <ion-label>Name:</ion-label>
          <ion-input v-model="formData.name"></ion-input>
        </ion-item>
        <ion-select placeholder="Select a breed" v-model="formData.breed">
          <ion-select-option value="ragdoll">Ragdoll</ion-select-option>
          <ion-select-option value="maine coon">Maine Coon</ion-select-option>
          <ion-select-option value="british shorthair">
            British Shorthair
          </ion-select-option>
          <ion-select-option value="american shorthair">
            American Shorthair
          </ion-select-option>
          <ion-select-option value="scottish fold">
            Scottish Fold
          </ion-select-option>
          <ion-select-option value="exotic">Exotic</ion-select-option>
          <ion-select-option value="devon rex">Devon Rex</ion-select-option>
          <ion-select-option value="persian">Persian</ion-select-option>
          <ion-select-option value="abysinnian">Abyssinian</ion-select-option>
          <ion-select-option value="sphynx">Sphynx</ion-select-option>
        </ion-select>
      </ion-list>
      <ion-button :expand="'block'" @click="onSubmit"> SUBMIT </ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { getFirestore, collection } from "firebase/firestore"
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
} from "@ionic/vue"
import { reactive } from "vue"
import { getAuth } from "@firebase/auth"
import { addDoc } from "@firebase/firestore"
import { useRouter } from "vue-router"
import { useRedirectIfUnauthenticated } from "../../../../hooks/redirects"

useRedirectIfUnauthenticated()

const formData = reactive({
  breed: "",
  name: "",
  type: "cat",
})

const router = useRouter()

async function onSubmit() {
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
  await addDoc(collection(db, `users/${auth.currentUser.uid}/pets`), {
    breed: formData.breed,
    name: formData.name,
    type: formData.type,
  })
  formData.name = ""
  formData.breed = ""

  router.back()
}
</script>
