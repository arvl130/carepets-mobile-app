<template>
  <div v-if="isLoading"></div>
  <div v-else>
    <div v-if="isError"></div>
    <div v-else>
      <div v-if="pets === undefined">No data found.</div>
      <div v-else>
        <div v-if="pets.length === 0">No pets to choose.</div>
        <ion-list v-else>
          <PetItem v-for="pet in pets" :key="pet.id" :pet="pet" />
        </ion-list>
      </div>
    </div>
  </div>
  <ion-button
    :expand="'block'"
    v-if="selectedPetsWithServices.length > 0"
    @click="onGoToStepTwo"
  >
    Next
  </ion-button>
</template>

<script setup lang="ts">
import { getPets } from "@/firebase"
import { IonButton, onIonViewDidEnter, IonList, useIonRouter } from "@ionic/vue"
import { useQuery } from "@tanstack/vue-query"
import { User } from "firebase/auth"
import { PropType } from "vue"
import PetItem from "./PetItem.vue"
import { useNewAppointmentStore } from "@/store/new-appointment"
import { storeToRefs } from "pinia"

const { user } = defineProps({
  user: {
    type: Object as PropType<User>,
    required: true,
  },
})

const {
  isLoading,
  isError,
  data: pets,
  refetch,
} = useQuery({
  queryKey: ["getDogs", user.uid],
  queryFn: () => getPets(user.uid),
})
onIonViewDidEnter(() => refetch())

const newAppointmentStore = useNewAppointmentStore()
const { selectedPetsWithServices } = storeToRefs(newAppointmentStore)

const router = useIonRouter()
function onGoToStepTwo() {
  router.replace("/appointments/create/choose-service")
}
</script>
