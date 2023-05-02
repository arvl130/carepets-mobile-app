<template>
  <div v-if="isLoading">Loading ...</div>
  <div v-else>
    <div v-if="isError">Error</div>
    <div v-else>
      <div v-if="appointments === undefined">No data found.</div>
      <CalendarWithAppointments v-else :appointments="appointments" />
    </div>
  </div>
  <ion-button :expand="'block'" v-if="selectedDate !== ''" @click="onClick">
    Next
  </ion-button>
</template>

<script setup lang="ts">
import { useNewAppointmentStore } from "@/store/new-appointment"
import { IonButton, onIonViewWillEnter, useIonRouter } from "@ionic/vue"
import { User } from "firebase/auth"
import { storeToRefs } from "pinia"
import { PropType } from "vue"
import { getAppointmentsByUser } from "@/firebase"
import CalendarWithAppointments from "./CalendarWithAppointments.vue"
import { useQuery } from "@tanstack/vue-query"

const { user } = defineProps({
  user: {
    type: Object as PropType<User>,
    required: true,
  },
})

const newAppointmentStore = useNewAppointmentStore()
const { selectedDate } = storeToRefs(newAppointmentStore)

const {
  isLoading,
  isError,
  data: appointments,
  refetch,
} = useQuery({
  queryKey: ["getAppointmentsByUser", user.uid],
  queryFn: () => getAppointmentsByUser(user.uid),
})
onIonViewWillEnter(async () => refetch())

const router = useIonRouter()

function onClick() {
  router.replace("/appointments/create/choose-slot")
}
</script>
