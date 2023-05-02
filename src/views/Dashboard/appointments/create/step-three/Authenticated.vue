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
import {
  IonButton,
  onIonViewDidEnter,
  onIonViewWillEnter,
  useIonRouter,
} from "@ionic/vue"
import { User } from "firebase/auth"
import { storeToRefs } from "pinia"
import { PropType, onMounted, ref } from "vue"
import { Appointment, getAppointmentsByUser } from "@/firebase"
import CalendarWithAppointments from "./CalendarWithAppointments.vue"

const { user } = defineProps({
  user: {
    type: Object as PropType<User>,
    required: true,
  },
})

const newAppointmentStore = useNewAppointmentStore()
const { selectedDate } = storeToRefs(newAppointmentStore)

const isLoading = ref(true)
const isError = ref(false)
const appointments = ref<Appointment[] | undefined>()

onMounted(async () => {
  try {
    isLoading.value = true
    console.log("loading")
    appointments.value = await getAppointmentsByUser(user.uid)
  } catch {
    isError.value = true
  } finally {
    isLoading.value = false
  }
})
onIonViewWillEnter(async () => {
  try {
    isLoading.value = true
    console.log("reloading")
    appointments.value = await getAppointmentsByUser(user.uid)
  } catch {
    isError.value = true
  } finally {
    isLoading.value = false
  }
})

const router = useIonRouter()

function onClick() {
  router.replace("/appointments/create/choose-slot")
}
</script>
