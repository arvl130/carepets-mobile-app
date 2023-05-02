<template>
  <ion-radio-group v-model="selectedSlot">
    <ion-item>
      <ion-radio
        value="MORNING"
        justify="space-between"
        :disabled="isMorningSlotsFull"
      >
        Morning schedule (9AM-12PM)
      </ion-radio>
    </ion-item>
    <ion-item>
      <ion-radio
        value="AFTERNOON"
        justify="space-between"
        :disabled="isAfternoonSlotsFull"
      >
        Afternoon schedule (1PM-4PM)
      </ion-radio>
    </ion-item>
  </ion-radio-group>
</template>

<script setup lang="ts">
import { Appointment } from "@/firebase"
import { useNewAppointmentStore } from "@/store/new-appointment"
import { IonRadioGroup, IonRadio, IonItem } from "@ionic/vue"
import { storeToRefs } from "pinia"
import { PropType, computed } from "vue"

const { appointments } = defineProps({
  appointments: {
    required: true,
    type: Array as PropType<Appointment[]>,
  },
})

const isMorningSlotsFull = computed(() => {
  const morningSlotsCount = appointments.reduce((tally, appointment) => {
    const actualDate = selectedDate.value.split("T")[0]
    if (
      appointment.actualDate === actualDate &&
      appointment.slot === "MORNING"
    ) {
      return tally + 1
    } else {
      return tally
    }
  }, 0)

  if (morningSlotsCount < 5) return false
  else return true
})

const isAfternoonSlotsFull = computed(() => {
  const afternoonSlotsCount = appointments.reduce((tally, appointment) => {
    const actualDate = selectedDate.value.split("T")[0]
    if (
      appointment.actualDate === actualDate &&
      appointment.slot === "AFTERNOON"
    ) {
      return tally + 1
    } else {
      return tally
    }
  }, 0)

  if (afternoonSlotsCount < 5) return false
  else return true
})

const newAppointmentStore = useNewAppointmentStore()
const { selectedSlot, selectedDate } = storeToRefs(newAppointmentStore)
</script>
