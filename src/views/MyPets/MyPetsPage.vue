<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/dashboard"></ion-back-button>
        </ion-buttons>
        <ion-title>My Pets Page</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-button :expand="'block'" @click="onOpenDogsPage">
        DOG
      </ion-button>
      <ion-button :expand="'block'" @click="onOpenCatsPage">
        CAT
      </ion-button>
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
  IonButton,
  IonButtons,
  IonBackButton
} from '@ionic/vue';
import { useRouter } from 'vue-router';

const router = useRouter()

function onOpenDogsPage() {
  router.push("/my-pets/dogs")
}

function onOpenCatsPage() {
  router.push("/my-pets/cats")
}
</script>