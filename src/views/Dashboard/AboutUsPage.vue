<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/dashboard"></ion-back-button>
        </ion-buttons>
        <ion-title>About Us</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <main class="min-h-full px-3 pt-8">
        <div class="bg-white rounded-lg px-4 py-2 mb-6">
          <ion-text>
            We are professionals and are committed to providing quality service.
            Our individual and corporate clients. We are always on the lookout
            for the latest technologies, more effective cleaning methods. We are
            passionate about making our CarePets service simple and convenient
            for our customers.
          </ion-text>
        </div>
        <h2 class="underline font-semibold text-2xl text-center mb-3">
          WHO WE ARE
        </h2>
        <div class="bg-white rounded-lg px-4 py-2 mb-6">
          The CarePets Mobile Application provides quality services for you pets
          needs. Our team is dedicated to handling your pets with care.
        </div>
        <ion-grid class="px-10 mb-3">
          <ion-row class="items-center grid grid-cols-[1.5rem_1fr]">
            <font-awesome-icon icon="fa-solid fa-location-dot" />
            <ion-text>Sangandaan, Quezon City</ion-text>
          </ion-row>
          <ion-row class="items-center grid grid-cols-[1.5rem_1fr]">
            <font-awesome-icon icon="fa-solid fa-phone" />
            <ion-text>09668812479</ion-text>
          </ion-row>
          <ion-row class="items-center grid grid-cols-[1.5rem_1fr]">
            <font-awesome-icon
              icon="fa-solid fa-envelope"
              class="mr-1 items-center"
            />
            <ion-text>carepetsmobileapp@gmail.com</ion-text>
          </ion-row>
        </ion-grid>
        <div class="text-center text-sm">CarePets &copy; 2023</div>
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
  IonText,
  IonGrid,
  IonRow,
} from "@ionic/vue"
import { useRedirectIfUnauthenticated } from "../../hooks/redirects"

useRedirectIfUnauthenticated()
</script>

<style scoped>
ion-content {
  --background: no-repeat center url("../../assets/bg-notext.png");
}

ion-toolbar {
  --background: #c0f1f7;
}

main {
  backdrop-filter: blur(5px);
}
</style>
