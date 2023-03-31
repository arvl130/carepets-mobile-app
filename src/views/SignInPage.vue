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

    <ion-content :fullscreen="true">
      <main class="pt-24">
        <ion-input
          class="border-2 border-blue-600 rounded-2xl bg-white mb-3"
          type="email"
          placeholder="Email"
          v-model="email"
        />
        <ion-input
          class="border-2 border-blue-600 rounded-2xl bg-white mb-3"
          type="password"
          placeholder="Password"
          v-model="password"
        />
        <div class="flex justify-end mb-8">
          <ion-nav-link class="underline text-gray-500">
            Forgot Password?
          </ion-nav-link>
        </div>
        <ion-button :expand="'block'" @click="onSignIn" class="mb-8">
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
      </main>
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
} from "@ionic/vue"
import { ref } from "vue"
import { useRouter } from "vue-router"
import { auth } from "../firebase"
import { useRedirectIfAuthenticated } from "../hooks/redirects"

useRedirectIfAuthenticated()

const email = ref("")
const password = ref("")
const router = useRouter()

async function onSignIn() {
  await signInWithEmailAndPassword(auth, email.value, password.value)

  email.value = ""
  password.value = ""
  router.replace("/dashboard")
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
