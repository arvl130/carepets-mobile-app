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

    <ion-content :fullscreen="true">
      <main class="pt-24">
        <ion-input
          v-model="displayName"
          placeholder="Name"
          class="border-2 border-blue-600 rounded-2xl bg-white mb-3"
        ></ion-input>
        <ion-input
          type="email"
          v-model="email"
          placeholder="Email"
          class="border-2 border-blue-600 rounded-2xl bg-white mb-3"
        ></ion-input>
        <ion-input
          type="password"
          v-model="password"
          placeholder="Password"
          class="border-2 border-blue-600 rounded-2xl bg-white mb-8"
        ></ion-input>
        <ion-button :expand="'block'" @click="onSignUp">Sign Up</ion-button>
      </main>
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

<style scoped>
ion-content {
  --background: no-repeat center url("../assets/bg-notext.png");
}

main {
  backdrop-filter: blur(5px);
  min-height: 100%;
  padding-bottom: 3rem;
  padding-inline: 1rem;
}

ion-input {
  --padding-start: 1rem;
  --padding-end: 1rem;
}

ion-button {
  --background: #2c64c6;
  --box-shadow: none;
  --border-radius: 9999px;
}
</style>
