<template>
  <ion-page>
    <ion-content :fullscreen="true">
        <main> 
          <ion-button color="light" @click="onClick">GET STARDED > </ion-button>
    </main>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/vue';
import { useRouter } from 'vue-router';

const router = useRouter()
function onClick(){
  router.push("/create-account")
}
</script>

<style scoped>
  main  {
    background-image: url("../assets/bg.png");
    background-size: contain;
    min-height: 100%; 
    background-repeat: no-repeat;
    background-position: center;
    background-color: #c0f1f7;
    display: flex;
    justify-content: center; 
    align-items: end;
    padding-bottom: 4rem;
    
  } 
</style>
