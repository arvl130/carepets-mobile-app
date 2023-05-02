<template>
  <ion-item>
    <ion-checkbox
      @ion-change="onClick"
      :checked="newAppointmentStore.hasPetId(pet.id)"
    >
      {{ pet.name }} ({{ pet.type }})
    </ion-checkbox>
  </ion-item>
</template>

<script setup lang="ts">
import { Pet } from "@/firebase"
import { useNewAppointmentStore } from "@/store/new-appointment"
import { IonItem, IonCheckbox } from "@ionic/vue"
import { PropType } from "vue"

const { pet } = defineProps({
  pet: {
    type: Object as PropType<Pet>,
    required: true,
  },
})

const newAppointmentStore = useNewAppointmentStore()

function onClick() {
  if (newAppointmentStore.hasPetId(pet.id)) {
    newAppointmentStore.removePet(pet.id)
  } else {
    newAppointmentStore.addPet(pet.id)
  }
}
</script>
