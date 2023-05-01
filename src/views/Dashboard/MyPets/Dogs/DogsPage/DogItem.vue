<template>
  <ion-item button @click="onGoToEditDogPage(dog.id)">
    {{ dog.name }}
  </ion-item>
</template>

<script lang="ts" setup>
import { IonItem } from "@ionic/vue"
import { PropType } from "vue"
import { useRouter } from "vue-router"
import type { Pet } from "@/firebase"

const { dog } = defineProps({
  dog: {
    type: Object as PropType<Pet>,
    required: true,
  },
})

const router = useRouter()

function onGoToEditDogPage(dogId: string) {
  router.push({
    name: "My Pets - Edit Dog",
    params: {
      petId: dogId,
    },
  })
}
</script>
