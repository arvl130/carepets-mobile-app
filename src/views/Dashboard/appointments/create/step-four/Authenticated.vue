<template>
  <ion-radio-group v-model="selectedSlot">
    <ion-item>
      <ion-radio value="MORNING" justify="space-between">
        Morning schedule (9AM-12PM)
      </ion-radio>
    </ion-item>
    <ion-item>
      <ion-radio value="AFTERNOON" justify="space-between">
        Afternoon schedule (1PM-4PM)
      </ion-radio>
    </ion-item>
  </ion-radio-group>
  <ion-button :expand="'block'" v-if="selectedSlot !== ''" @click="onClick">
    Next
  </ion-button>
</template>

<script setup lang="ts">
import { useNewAppointmentStore } from "@/store/new-appointment"
import {
  IonButton,
  IonRadioGroup,
  IonRadio,
  IonItem,
  useIonRouter,
} from "@ionic/vue"
import { User } from "firebase/auth"
import { storeToRefs } from "pinia"
import { PropType } from "vue"

const { user } = defineProps({
  user: {
    type: Object as PropType<User>,
    required: true,
  },
})

const newAppointmentStore = useNewAppointmentStore()
const { selectedSlot } = storeToRefs(newAppointmentStore)

const router = useIonRouter()

function onClick() {
  router.replace("/appointments/create/summary")
}
</script>
