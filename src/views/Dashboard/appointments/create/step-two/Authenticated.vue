<template>
  <div v-if="selectedPetsWithServices.length === 0">No pets selected.</div>
  <div v-else>
    <PetItem
      v-for="selectedPetWithServices in selectedPetsWithServices"
      :key="selectedPetWithServices.petId"
      :selectedPetWithServices="selectedPetWithServices"
      :user="user"
      :petWithServices="selectedPetWithServices"
    />
  </div>
  <ion-button :expand="'block'" v-if="allPetsHasService" @click="onClick">
    Next
  </ion-button>
</template>

<script setup lang="ts">
import { useNewAppointmentStore } from "@/store/new-appointment"
import { IonButton, useIonRouter } from "@ionic/vue"
import { User } from "firebase/auth"
import { storeToRefs } from "pinia"
import { PropType } from "vue"
import PetItem from "./PetItem.vue"

const { user } = defineProps({
  user: {
    type: Object as PropType<User>,
    required: true,
  },
})

const newAppointmentStore = useNewAppointmentStore()
const { selectedPetsWithServices, allPetsHasService } =
  storeToRefs(newAppointmentStore)

const router = useIonRouter()
function onClick() {
  router.replace("/appointments/create/choose-date")
}
</script>
