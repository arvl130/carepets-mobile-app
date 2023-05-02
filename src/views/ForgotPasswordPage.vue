<template>
  <ion-page>
    <ion-header :translucent="true" class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/signin"></ion-back-button>
        </ion-buttons>
        <ion-title>Forgot Password</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <ion-list>
        <div class="ion-text-center">
          <ion-text>Enter the email you used to sign in.</ion-text>
        </div>
        <ion-item>
          <ion-input label="Email" type="email" v-model="email" />
        </ion-item>
      </ion-list>
      <ion-button :expand="'block'" @click="onSubmit">Submit</ion-button>

      <ion-alert
        :is-open="alert.isOpen"
        :header="alert.header"
        :message="alert.message"
        :buttons="alert.buttons"
        @didDismiss="alert.isOpen = false"
      />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButtons,
  IonBackButton,
  IonList,
  IonItem,
  IonAlert,
  IonText,
  useIonRouter,
} from "@ionic/vue"
import { reactive, ref } from "vue"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "../firebase"
import { FirebaseError } from "@firebase/util"
import { useRedirectIfAuthenticated } from "../hooks/redirects"

useRedirectIfAuthenticated()

const email = ref("")
const router = useIonRouter()

const alert = reactive<{
  isOpen: boolean
  header: string
  message: string
  buttons: string[] | { text: string; role: string; handler: () => void }[]
}>({
  isOpen: false,
  header: "",
  message: "",
  buttons: ["OK"],
})

async function onSubmit() {
  try {
    await sendPasswordResetEmail(auth, email.value)

    alert.header = "Success"
    alert.message = "Your password reset email will be sent shortly."
    alert.buttons = [
      {
        text: "OK",
        role: "confirm",
        handler: () => {
          router.push("/signin")
        },
      },
    ]
    alert.isOpen = true
  } catch (e) {
    if (e instanceof FirebaseError) {
      alert.header = "Unknown Firebase error occured"
      alert.message = e.message
      alert.isOpen = true
      return
    }

    alert.header = "Unknown error occured"
    alert.message =
      "An unknown error has occured. Please check the Console tab for more information"
    alert.isOpen = true
    console.log(e)
  }
}
</script>
