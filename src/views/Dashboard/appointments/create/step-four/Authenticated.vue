<template>
  <div v-if="isLoading">Loading ...</div>
  <div v-else>
    <div v-if="isError">An error occured.</div>
    <div v-else>
      <div v-if="appointments === undefined">No data found.</div>
      <has-appointments :appointments="appointments" v-else></has-appointments>
    </div>
  </div>

  <ion-button :expand="'block'" v-if="selectedSlot !== ''" @click="onClick">
    Next
  </ion-button>
</template>

<script setup lang="ts">
import { getAppointmentsByDate } from "@/firebase"
import { useNewAppointmentStore } from "@/store/new-appointment"
import { IonButton, useIonRouter, onIonViewDidEnter } from "@ionic/vue"
import { useQuery } from "@tanstack/vue-query"
import { User } from "firebase/auth"
import { storeToRefs } from "pinia"
import { PropType } from "vue"
import HasAppointments from "./HasAppointments.vue"

const { user } = defineProps({
  user: {
    type: Object as PropType<User>,
    required: true,
  },
})

const newAppointmentStore = useNewAppointmentStore()
const { selectedSlot, selectedDate } = storeToRefs(newAppointmentStore)

const {
  isLoading,
  isError,
  data: appointments,
  refetch,
} = useQuery({
  queryKey: ["getAppointmentsByDate", selectedDate.value.split("T")[0]],
  queryFn: () => getAppointmentsByDate(selectedDate.value.split("T")[0]),
})
onIonViewDidEnter(() => refetch())

const router = useIonRouter()

function onClick() {
  router.replace("/appointments/create/summary")
}
</script>
