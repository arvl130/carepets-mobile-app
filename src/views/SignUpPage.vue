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
} from "@ionic/vue"
import { ref } from "vue"
import { useRouter } from "vue-router"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../firebase"
import { FirebaseError } from "@firebase/util"
import { useRedirectIfAuthenticated } from "../hooks/redirects"

useRedirectIfAuthenticated()

const displayName = ref("")
const email = ref("")
const password = ref("")
const router = useRouter()

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
    router.replace("/dashboard")
  } catch (e) {
    if (e instanceof FirebaseError) {
      if (e.code === "auth/email-already-in-use") {
        router.push("/sign-in")
      }
    } else {
      console.log("An error has occured", e)
    }
  }
}
</script>
