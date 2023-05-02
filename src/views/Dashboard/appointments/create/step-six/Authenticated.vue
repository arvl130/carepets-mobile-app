<template>
  <div class="flex justify-center mb-3">Your appointment has been set.</div>
  <ion-button :expand="'block'" @click="onClick">Done</ion-button>
</template>

<script setup lang="ts">
import { IonButton, useIonRouter } from "@ionic/vue"
import { User } from "firebase/auth"
import { PropType } from "vue"

const { user } = defineProps({
  user: {
    type: Object as PropType<User>,
    required: true,
  },
})

const router = useIonRouter()

function onClick() {
  router.replace("/appointments")
}
</script>
