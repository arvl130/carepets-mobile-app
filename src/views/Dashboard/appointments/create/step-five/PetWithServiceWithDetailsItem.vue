<template>
  <div>Pet: {{ pet.name }}</div>
  <div class="mb-1">
    <div>Services:</div>
    <div v-if="pet.type === 'DOG'">
      <ServiceItem
        v-for="serviceCode in petWithService.serviceCodes"
        :key="serviceCode"
        :pet-service="getDogServiceByCode(serviceCode)"
      />
    </div>
    <div v-if="pet.type === 'CAT'">
      <ServiceItem
        v-for="serviceCode in petWithService.serviceCodes"
        :key="serviceCode"
        :pet-service="getCatServiceByCode(serviceCode)"
      />
    </div>
  </div>
  <hr />
</template>

<script setup lang="ts">
import { Pet } from "@/firebase"
import { User } from "firebase/auth"
import { PropType } from "vue"
import ServiceItem from "./ServiceItem.vue"
import {
  PetService,
  getCatServiceByCode,
  getDogServiceByCode,
} from "@/store/new-appointment"

const { user, petWithService, pet } = defineProps({
  user: {
    required: true,
    type: Object as PropType<User>,
  },
  petWithService: {
    required: true,
    type: Object as PropType<{ petId: string; serviceCodes: string[] }>,
  },
  pet: {
    required: true,
    type: Object as PropType<Pet>,
  },
})
</script>
