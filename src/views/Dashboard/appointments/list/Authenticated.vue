<template>
  <div v-if="isLoading">Loading ...</div>
  <div v-else>
    <div v-if="isError">An error occured.</div>
    <div v-else>
      <div v-if="appointments === undefined">No data found.</div>
      <div v-else>
        <div v-if="appointments.length === 0" class="flex py-3 justify-center">
          No appointments made.
        </div>
        <div v-else>
          <AppointmentItem
            v-for="appointment in appointments"
            :key="appointment.id"
            :user="user"
            :appointment="appointment"
          />
        </div>
      </div>
    </div>
  </div>
  <ion-button
    :expand="'block'"
    @click="router.push('/appointments/create/choose-pet')"
  >
    ADD APPOINTMENT
  </ion-button>
</template>

<script setup lang="ts">
import { getAppointmentsByUser } from "@/firebase"
import { IonButton, onIonViewDidEnter, useIonRouter } from "@ionic/vue"
import { useQuery } from "@tanstack/vue-query"
import { User } from "firebase/auth"
import { PropType } from "vue"
import AppointmentItem from "./AppointmentItem.vue"

const { user } = defineProps({
  user: {
    type: Object as PropType<User>,
    required: true,
  },
})

const {
  isLoading,
  isError,
  data: appointments,
  refetch,
} = useQuery({
  queryKey: ["getAppointmentsByUser", user.uid],
  queryFn: () => getAppointmentsByUser(user.uid),
})
onIonViewDidEnter(() => refetch())

const router = useIonRouter()
</script>
