<template>
  <ion-item>
    <ion-checkbox
      :checked="
        newAppointmentStore.petIdHasServiceCode(pet.id, petService.code)
      "
      @ion-change="onClick"
    >
      ₱{{ petService.cost }} - {{ petService.prettyName }}
    </ion-checkbox>
  </ion-item>
</template>

<script setup lang="ts">
import { useNewAppointmentStore } from "@/store/new-appointment"
import { IonCheckbox, IonItem } from "@ionic/vue"
import { Pet } from "@/firebase"
import { User } from "firebase/auth"
import { PropType } from "vue"
import { PetService } from "@/store/new-appointment"

const { petService, pet } = defineProps({
  user: {
    type: Object as PropType<User>,
    required: true,
  },
  petWithServices: {
    type: Object as PropType<{
      petId: string
      serviceCodes: string[]
    }>,
    required: true,
  },
  pet: {
    required: true,
    type: Object as PropType<Pet>,
  },
  petService: {
    required: true,
    type: Object as PropType<PetService>,
  },
})

const newAppointmentStore = useNewAppointmentStore()

function onClick() {
  if (newAppointmentStore.petIdHasServiceCode(pet.id, petService.code)) {
    newAppointmentStore.removeServiceFromPet(pet.id, petService.code)
  } else {
    newAppointmentStore.addServiceToPet(pet.id, petService.code)
  }
}
</script>
