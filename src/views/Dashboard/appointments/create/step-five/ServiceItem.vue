<template>
  <div v-if="petService">
    <div>{{ petService.prettyName }} (₱{{ petService.cost }})</div>
  </div>
  <div v-else>
    <div>Loading ...</div>
  </div>
</template>

<script setup lang="ts">
import { PetService } from "@/store/new-appointment"
import { PropType } from "vue"

const { petService } = defineProps({
  petService: {
    type: Object as PropType<PetService>,
  },
})
</script>
