<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="h-8"></div>
      <main>
        <ion-button color="light" @click="onClick">GET STARTED »</ion-button>
      </main>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonButton } from "@ionic/vue"
import { useRouter } from "vue-router"
import { useRedirectIfAuthenticated } from "../hooks/redirects"

useRedirectIfAuthenticated()

const router = useRouter()
function onClick() {
  router.push("/signin")
}
</script>

<style scoped>
ion-content {
  --background: #c0f1f7;
}

main {
  background-image: url("../assets/bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 3rem;
}
</style>
