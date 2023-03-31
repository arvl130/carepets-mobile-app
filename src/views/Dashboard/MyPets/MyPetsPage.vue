<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/dashboard"></ion-back-button>
        </ion-buttons>
        <ion-title>My Pets</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <main class="min-h-full px-16 pt-12">
        <ion-item
          button
          :expand="'block'"
          @click="onGoToDogsPage"
          class="mb-6 rounded-2xl"
        >
          <ion-grid class="py-4">
            <ion-row class="ion-justify-content-center mb-3">
              <font-awesome-icon icon="fa-solid fa-dog" class="h-24" />
            </ion-row>
            <ion-row class="ion-justify-content-center">DOGS</ion-row>
          </ion-grid>
        </ion-item>
        <ion-item
          button
          :expand="'block'"
          @click="onGoToCatsPage"
          class="mb-3 rounded-2xl"
        >
          <ion-grid class="py-4">
            <ion-row class="ion-justify-content-center mb-3">
              <font-awesome-icon icon="fa-solid fa-cat" class="h-24" />
            </ion-row>
            <ion-row class="ion-justify-content-center">CATS</ion-row>
          </ion-grid>
        </ion-item>
      </main>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
} from "@ionic/vue"
import { useRouter } from "vue-router"
import { useRedirectIfUnauthenticated } from "../../../hooks/redirects"

useRedirectIfUnauthenticated()

const router = useRouter()

function onGoToDogsPage() {
  router.push("/my-pets/dogs")
}

function onGoToCatsPage() {
  router.push("/my-pets/cats")
}
</script>

<style scoped>
ion-content {
  --background: no-repeat center url("../../../assets/bg-notext.png");
}

ion-toolbar {
  --background: #c0f1f7;
}

main {
  backdrop-filter: blur(5px);
}
</style>
