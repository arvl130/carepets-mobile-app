<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/dashboard"></ion-back-button>
        </ion-buttons>
        <ion-title>Services</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <main class="min-h-full px-16 pt-12">
        <ion-item
          button
          :expand="'block'"
          @click="onGoToGroomingPage"
          class="mb-6 rounded-2xl"
        >
          <ion-grid class="py-4">
            <ion-row class="ion-justify-content-center mb-3">
              <font-awesome-icon icon="fa-solid fa-soap" class="h-24" />
            </ion-row>
            <ion-row class="ion-justify-content-center">GROOMING</ion-row>
          </ion-grid>
        </ion-item>
        <ion-item
          button
          :expand="'block'"
          @click="onGoToVaccinePage"
          class="mb-3 rounded-2xl"
        >
          <ion-grid class="py-4">
            <ion-row class="ion-justify-content-center mb-3">
              <font-awesome-icon icon="fa-solid fa-syringe" class="h-24" />
            </ion-row>
            <ion-row class="ion-justify-content-center">VACCINE</ion-row>
          </ion-grid>
        </ion-item>
      </main>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonToolbar,
  IonHeader,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonItem,
  IonGrid,
  IonRow,
} from "@ionic/vue"
import { useRouter } from "vue-router"
import { useRedirectIfUnauthenticated } from "../../../hooks/redirects"

useRedirectIfUnauthenticated()

const router = useRouter()
function onGoToGroomingPage() {
  router.push("/services/grooming")
}

function onGoToVaccinePage() {
  router.push("/services/vaccine")
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
