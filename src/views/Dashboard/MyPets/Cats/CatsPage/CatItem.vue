<template>
  <ion-item @click="onGoToEditcatPage(cat.id)" button>
    {{ cat.name }}
  </ion-item>
</template>

<script setup lang="ts">
import { IonItem } from "@ionic/vue"
import { PropType } from "vue"
import { useRouter } from "vue-router"
import type { Pet } from "@/firebase"

const { cat } = defineProps({
  cat: {
    type: Object as PropType<Pet>,
    required: true,
  },
})

const router = useRouter()
function onGoToEditcatPage(catId: string) {
  router.push({
    name: "My Pets - Edit Cat",
    params: {
      petId: catId,
    },
  })
}
</script>
