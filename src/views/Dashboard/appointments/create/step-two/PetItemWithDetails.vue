<template>
  <div>
    <div>{{ pet.name }} ({{ pet.type }})</div>
    <div v-if="pet.type === 'DOG'">
      <div>Grooming services</div>
      <ion-list :inset="true">
        <PetServiceItem
          v-for="petService in groomingServicesForDogs"
          :key="petService.code"
          :user="user"
          :pet-with-services="petWithServices"
          :pet="pet"
          :pet-service="petService"
        />
      </ion-list>
      <div>Vaccine services</div>
      <ion-list :inset="true">
        <PetServiceItem
          v-for="petService in vaccineServicesForDogs"
          :key="petService.code"
          :user="user"
          :pet-with-services="petWithServices"
          :pet="pet"
          :pet-service="petService"
        />
      </ion-list>
    </div>
    <div v-else-if="pet.type === 'CAT'">
      <div>Grooming services</div>
      <ion-list :inset="true">
        <PetServiceItem
          v-for="petService in groomingServicesForCats"
          :key="petService.code"
          :user="user"
          :pet-with-services="petWithServices"
          :pet="pet"
          :pet-service="petService"
        />
      </ion-list>
      <div>Vaccine services</div>
      <ion-list :inset="true">
        <PetServiceItem
          v-for="petService in vaccineServicesForCats"
          :key="petService.code"
          :user="user"
          :pet-with-services="petWithServices"
          :pet="pet"
          :pet-service="petService"
        />
      </ion-list>
    </div>
    <div v-else>Unrecognized type of pet.</div>
  </div>
</template>

<script setup lang="ts">
import { Pet } from "@/firebase"
import { useNewAppointmentStore } from "@/store/new-appointment"
import { IonList, IonItem, IonCheckbox } from "@ionic/vue"
import { User } from "firebase/auth"
import { PropType } from "vue"
import {
  vaccineServicesForDogs,
  groomingServicesForDogs,
  vaccineServicesForCats,
  groomingServicesForCats,
} from "@/store/new-appointment"
import PetServiceItem from "./PetServiceItem.vue"

const { user, petWithServices, pet } = defineProps({
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
})

const newAppointmentStore = useNewAppointmentStore()
</script>
