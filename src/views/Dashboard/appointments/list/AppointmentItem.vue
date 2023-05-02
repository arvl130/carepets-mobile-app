<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>Schedule: {{ appointment.actualDate }}</ion-card-title>
    </ion-card-header>

    <ion-card-content>
      <div class="mb-3">
        <div v-if="appointment.slot === 'MORNING'">Time: 9-12PM (Morning)</div>
        <div v-if="appointment.slot === 'AFTERNOON'">
          Time: 1-4PM (Afternoon)
        </div>
      </div>
      <hr />
      <div class="mt-3">
        <PetWithServiceItem
          v-for="petWithService in appointment.pets"
          :key="petWithService.petId"
          :user="user"
          :pet-with-service="petWithService"
        />
      </div>
    </ion-card-content>

    <div class="flex justify-end">
      <ion-button
        fill="clear"
        @click="onDone"
        :disabled="isLoading"
        v-if="isInThePast(appointment.actualDate)"
      >
        Done
      </ion-button>
      <ion-button fill="clear" @click="onCancel" :disabled="isLoading" v-else
        >Cancel</ion-button
      >
    </div>

    <ion-alert
      :is-open="alert.isOpen"
      :header="alert.header"
      :message="alert.message"
      :buttons="alert.buttons"
      @didDismiss="alert.isOpen = false"
    />
  </ion-card>
</template>

<script setup lang="ts">
import { User } from "firebase/auth"
import { PropType, reactive } from "vue"
import type { Appointment } from "@/firebase"
import {
  IonButton,
  IonAlert,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
} from "@ionic/vue"
import { deleteAppointment } from "@/firebase"
import { useMutation, useQuery } from "@tanstack/vue-query"
import { getAppointmentsByUser } from "@/firebase"
import PetWithServiceItem from "../create/step-five/PetWithServiceItem.vue"

const alert = reactive<{
  isOpen: boolean
  header: string
  message: string
  buttons: string[] | { text: string; role: string; handler: () => void }[]
}>({
  isOpen: false,
  header: "",
  message: "",
  buttons: ["OK"],
})

const { user, appointment } = defineProps({
  user: {
    required: true,
    type: Object as PropType<User>,
  },
  appointment: {
    required: true,
    type: Object as PropType<Appointment>,
  },
})

const { refetch } = useQuery({
  queryKey: ["getAppointmentsByUser", user.uid],
  queryFn: () => getAppointmentsByUser(user.uid),
})

const { mutate, isLoading } = useMutation({
  mutationKey: ["deleteAppointment", user.uid, appointment.id],
  mutationFn: () => deleteAppointment(user.uid, appointment.id),
  onSuccess: () => {
    refetch()
    console.log("delete succeeded")
  },
})

function onCancel() {
  alert.header = "Cancel"
  alert.message = "Are you sure you want to cancel this appointment?"
  alert.buttons = [
    {
      text: "Cancel",
      role: "cancel",
      handler: () => {
        console.log("canceled")
      },
    },
    {
      text: "OK",
      role: "confirm",
      handler: () => {
        console.log("deleting")
        mutate()
      },
    },
  ]
  alert.isOpen = true
}

function onDone() {
  alert.header = "Done"
  alert.message = "Are you sure this appointment is done?"
  alert.buttons = [
    {
      text: "Cancel",
      role: "cancel",
      handler: () => {
        console.log("canceled", appointment.id)
      },
    },
    {
      text: "OK",
      role: "confirm",
      handler: () => {
        console.log("deleting", appointment.id)
        mutate()
      },
    },
  ]
  alert.isOpen = true
}

function isInThePast(dateStr: string) {
  const givenDate = new Date(dateStr)
  const currentDate = new Date()

  return currentDate.getTime() > givenDate.getTime()
}
</script>
