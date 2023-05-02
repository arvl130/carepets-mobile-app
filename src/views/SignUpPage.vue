<template>
  <ion-page>
    <ion-header :translucent="true" class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/my-pets"></ion-back-button>
        </ion-buttons>
        <ion-title>Sign Up</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <ion-list>
        <ion-item>
          <ion-input label="Name" v-model="displayName" />
        </ion-item>
        <ion-item>
          <ion-input label="Email" type="email" v-model="email" />
        </ion-item>
        <ion-item>
          <ion-input label="Password" type="password" v-model="password" />
        </ion-item>
      </ion-list>
      <ion-button :expand="'block'" @click="onSignUp">Sign Up</ion-button>

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
  useIonRouter,
} from "@ionic/vue"
import { reactive, ref } from "vue"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../firebase"
import { FirebaseError } from "@firebase/util"
import { useRedirectIfAuthenticated } from "../hooks/redirects"

useRedirectIfAuthenticated()

const displayName = ref("")
const email = ref("")
const password = ref("")
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

async function onSignUp() {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    )
    await updateProfile(user, {
      displayName: displayName.value,
    })

    alert.header = "Congratulations!"
    alert.message =
      "Your account has been created. Make sure to add your pets, before making an appointment."
    alert.isOpen = true
    alert.buttons = [
      {
        text: "OK",
        role: "confirm",
        handler: () => {
          router.replace("/dashboard")
        },
      },
    ]
  } catch (e) {
    if (e instanceof FirebaseError) {
      console.log("no code?", e.code)
      if (e.code === "auth/email-already-in-use") {
        alert.header = "Error"
        alert.message =
          "This email address is already in use. Try logging in instead."
        alert.buttons = [
          {
            text: "OK",
            role: "confirm",
            handler: () => {
              router.navigate("/signin")
            },
          },
        ]
        alert.isOpen = true
        return
      }

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
