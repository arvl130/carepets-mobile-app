<template>
  <ion-app>
    <ion-router-outlet v-if="isAuthLoaded" />
  </ion-app>
</template>

<script setup lang="ts">
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { onMounted, ref } from 'vue';
import { IonApp, IonRouterOutlet } from '@ionic/vue';

const isAuthLoaded = ref(false)

onMounted(() => {
  const auth = getAuth()
  onAuthStateChanged(auth, () => {
    isAuthLoaded.value = true
  })
})
</script>
