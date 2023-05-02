<template>
  <div>Selected Date: {{ formattedDate(selectedDate) }}</div>
  <div class="mb-3">
    Selected Slot:
    <span v-if="selectedSlot === 'MORNING'">Morning (9AM-12PM)</span>
    <span v-if="selectedSlot === 'AFTERNOON'">Afternoon (1PM-4PM)</span>
  </div>
  <hr />
  <div class="mt-3">
    <div v-if="selectedPetsWithServices.length === 0">No pets selected.</div>
    <div v-else>
      <PetWithServiceItem
        v-for="selectedPetWithServices in selectedPetsWithServices"
        :key="selectedPetWithServices.petId"
        :user="user"
        :pet-with-service="selectedPetWithServices"
      />
    </div>
  </div>

  <ion-button
    :expand="'block'"
    v-if="
      selectedDate !== '' &&
      selectedSlot !== '' &&
      selectedPetsWithServices.length > 0 &&
      newAppointmentStore.allPetsHasService
    "
    @click="onClick"
  >
    Schedule Appointment
  </ion-button>
</template>

<script setup lang="ts">
import { useNewAppointmentStore } from "@/store/new-appointment"
import { IonButton, useIonRouter } from "@ionic/vue"
import { User } from "firebase/auth"
import { storeToRefs } from "pinia"
import { PropType } from "vue"
import PetWithServiceItem from "./PetWithServiceItem.vue"
import { useMutation, useQuery } from "@tanstack/vue-query"
import { createAppointment, getAppointmentsByUser } from "@/firebase"

const { user } = defineProps({
  user: {
    type: Object as PropType<User>,
    required: true,
  },
})

const newAppointmentStore = useNewAppointmentStore()
const { selectedDate, selectedSlot, selectedPetsWithServices } =
  storeToRefs(newAppointmentStore)

const router = useIonRouter()

const { refetch } = useQuery({
  queryKey: ["getAppointmentsByUser", user.uid],
  queryFn: () => getAppointmentsByUser(user.uid),
})

const { mutate } = useMutation({
  mutationKey: ["createAppointment", user.uid],
  mutationFn: () =>
    createAppointment(user.uid, {
      pets: selectedPetsWithServices.value,
      selectedDate: selectedDate.value,
      selectedSlot: selectedSlot.value as "MORNING" | "AFTERNOON",
    }),
  onSuccess: async () => {
    await refetch()
    const result = await getAppointmentsByUser(user.uid)
    console.log("new appointments list", result)
    router.replace("/appointments/create/confirmation")
    selectedDate.value = ""
    selectedSlot.value = ""
    selectedPetsWithServices.value = []
  },
})

function onClick() {
  mutate()
}

function formattedDate(dateStr: string) {
  const date = new Date(dateStr.split("T")[0])
  const monthInt = date.getMonth() + 1
  const month = monthInt > 9 ? `${monthInt}` : `0${monthInt}`
  const dayInt = date.getDate()
  const day = dayInt > 9 ? `${dayInt}` : `0${dayInt}`

  return `${date.getFullYear()}-${month}-${day}`
}
</script>
