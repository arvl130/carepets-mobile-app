<template>
  <ion-page>
    <ion-header :translucent="true" class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/getting-started"></ion-back-button>
        </ion-buttons>
        <ion-title>Sign In</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <ion-list>
        <ion-item>
          <ion-input label="Email" labelPlacement="stacked" v-model="email" />
        </ion-item>
        <ion-item>
          <ion-input
            label="Password"
            labelPlacement="stacked"
            type="password"
            v-model="password"
          />
        </ion-item>
      </ion-list>

      <div class="flex justify-end mb-8">
        <ion-nav-link class="underline text-gray-500">
          Forgot Password?
        </ion-nav-link>
      </div>
      <ion-button expand="full" @click="onSignIn" class="mb-8">
        Sign In
      </ion-button>
      <div class="text-gray-500 text-center">
        Don't have an account?
        <ion-text
          class="underline"
          router-link="/signup"
          router-direction="forward"
        >
          Sign Up
        </ion-text>
      </div>

      <ion-alert
        :is-open="alert.isOpen"
        :header="alert.header"
        :message="alert.message"
        :buttons="['OK']"
        @didDismiss="alert.isOpen = false"
      />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { signInWithEmailAndPassword } from "@firebase/auth"
import {
  IonNavLink,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonButtons,
  IonText,
  IonBackButton,
  IonList,
  IonItem,
} from "@ionic/vue"
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { auth } from "../firebase"
import { useRedirectIfAuthenticated } from "../hooks/redirects"
import { IonAlert } from "@ionic/vue"
import { FirebaseError } from "firebase/app"

useRedirectIfAuthenticated()

const email = ref("")
const password = ref("")
const router = useRouter()

const alert = reactive({
  isOpen: false,
  header: "",
  message: "",
})

async function onSignIn() {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)

    email.value = ""
    password.value = ""
    router.replace("/dashboard")
  } catch (e) {
    if (e instanceof FirebaseError) {
      if (e.code === "auth/invalid-email") {
        alert.header = "Invalid username or password"
        alert.message =
          "The username or password that you have entered is incorrect. Please try again."
        alert.isOpen = true
        return
      }

      if (e.code === "auth/user-not-found") {
        alert.header = "No such user"
        alert.message =
          "The username or password that you have entered is incorrect. Please try again."
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
