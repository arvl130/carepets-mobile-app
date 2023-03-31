<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/dashboard"></ion-back-button>
        </ion-buttons>
        <ion-title>Vaccine Services</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <main class="min-h-full px-3 pt-12">
        <div class="bg-white px-4 py-2 rounded-lg mb-6">
          <h2 class="font-semibold mb-1">Vaccine for Dogs</h2>
          <div class="grid grid-cols-[16rem_1fr]">
            <div>5 in 1 Vaccine</div>
            <div>450</div>
          </div>
          <div class="grid grid-cols-[16rem_1fr]">
            <div>Anti Rabies</div>
            <div>300</div>
          </div>
          <div class="grid grid-cols-[16rem_1fr]">
            <div>Cough Vaccine</div>
            <div>500</div>
          </div>
          <div class="grid grid-cols-[16rem_1fr]">
            <div>Heartworm Prevention Shot</div>
            <div>350</div>
          </div>
          <div class="grid grid-cols-[16rem_1fr]">
            <div>Deworming Prevention</div>
            <div>300</div>
          </div>
        </div>
        <div class="bg-white px-4 py-2 rounded-lg">
          <h2 class="font-semibold mb-1">Vaccine for Cats</h2>
          <div class="grid grid-cols-[16rem_1fr]">
            <div>4 in 1 Vaccine</div>
            <div>950</div>
          </div>
          <div class="grid grid-cols-[16rem_1fr]">
            <div>Anti Rabies</div>
            <div>300</div>
          </div>
          <div class="grid grid-cols-[16rem_1fr]">
            <div>Deworming Prevention</div>
            <div>250</div>
          </div>
        </div>
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
} from "@ionic/vue"
import { useRedirectIfUnauthenticated } from "../../../hooks/redirects"

useRedirectIfUnauthenticated()
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
