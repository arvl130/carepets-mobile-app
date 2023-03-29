<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/my-pets"></ion-back-button>
        </ion-buttons>
        <ion-title>My Pets - Cats</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-button :expand="'block'" @click="onAddCatsPage">
        ADD CAT
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
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

function onAddCatsPage() {
  console.log("Add cat")
}
</script>