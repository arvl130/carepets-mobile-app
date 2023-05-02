<template>
  <ion-datetime
    presentation="date"
    v-model="selectedDate"
    :year-values="2023"
    :min="minCalendarValue"
    :is-date-enabled="isDateEnabled"
  />
</template>

<script setup lang="ts">
import { Appointment } from "@/firebase"
import { useNewAppointmentStore } from "@/store/new-appointment"
import { IonDatetime, onIonViewDidEnter } from "@ionic/vue"
import { DateTime } from "luxon"
import { storeToRefs } from "pinia"
import { PropType, onMounted, ref } from "vue"

const { appointments } = defineProps({
  appointments: {
    type: Array as PropType<Appointment[]>,
    required: true,
  },
})

function isDateEnabled(dateStr: string) {
  const actualDate = dateStr.split("T")[0]
  console.log(`ran for ${actualDate} with:`, appointments)
  return !appointments.some((appointment) => {
    if (appointment.actualDate === actualDate) {
      console.log("disabled", actualDate)
      return true
    } else {
      return false
    }
  })
}

const minCalendarValue = ref("")

onMounted(() => {
  const currLuxonDate = DateTime.now().plus({ days: 1 }).toISO()
  if (!currLuxonDate) return

  minCalendarValue.value = currLuxonDate
  selectedDate.value = currLuxonDate
})

onIonViewDidEnter(() => {
  const currLuxonDate = DateTime.now().plus({ days: 1 }).toISO()
  if (!currLuxonDate) return

  minCalendarValue.value = currLuxonDate
  selectedDate.value = currLuxonDate
})

const newAppointmentStore = useNewAppointmentStore()
const { selectedDate } = storeToRefs(newAppointmentStore)
</script>
