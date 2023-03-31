<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/dashboard"></ion-back-button>
        </ion-buttons>
        <ion-title>Grooming Services</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <main class="min-h-full px-3 pt-12">
        <div class="bg-white px-4 py-2 rounded-lg mb-6">
          <h2 class="font-semibold mb-1">Grooming for Dogs</h2>
          <div class="grid grid-cols-[16rem_1fr]">
            <div>Nail Trim and Filing</div>
            <div>75</div>
          </div>
          <div class="grid grid-cols-[16rem_1fr]">
            <div>Teeth Brushing (toothbrush not provided)</div>
            <div>75</div>
          </div>
          <div class="grid grid-cols-[16rem_1fr]">
            <div>Eye Wash</div>
            <div>75</div>
          </div>
          <div class="grid grid-cols-[16rem_1fr]">
            <div>Ear Cleaning</div>
            <div>75</div>
          </div>
          <div class="grid grid-cols-[16rem_1fr]">
            <div>Anal Drain</div>
            <div>150</div>
          </div>
          <div class="grid grid-cols-[16rem_1fr]">
            <div>Full Body Trimming (fixed price)</div>
            <div>250</div>
          </div>
          <div class="grid grid-cols-[16rem_1fr]">
            <div>Dematting (all sizes of breed)</div>
            <div>450</div>
          </div>
        </div>
        <div class="bg-white px-4 py-2 rounded-lg">
          <h2 class="font-semibold mb-1">Grooming for Cats</h2>
          <div class="grid grid-cols-[16rem_1fr]">
            <div>Nail Clipping</div>
            <div>450</div>
          </div>
          <div class="grid grid-cols-[16rem_1fr]">
            <div>Deshedding Brushing Only</div>
            <div>450</div>
          </div>
          <div class="grid grid-cols-[16rem_1fr]">
            <div>Bath + Brush</div>
            <div>700</div>
          </div>
          <div class="grid grid-cols-[16rem_1fr]">
            <div>Nails + Brush</div>
            <div>800</div>
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
