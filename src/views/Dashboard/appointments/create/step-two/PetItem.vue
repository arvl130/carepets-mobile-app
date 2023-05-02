<template>
  <div v-if="isLoading">Loading ...</div>
  <div v-else>
    <div v-if="isError">Error</div>
    <div v-else>
      <div v-if="pet === undefined">No data found.</div>
      <div v-else>
        <PetItemWithDetails
          :pet-with-services="petWithServices"
          :pet="pet"
          :user="user"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getPet } from "@/firebase"
import { onIonViewDidEnter } from "@ionic/vue"
import { useQuery } from "@tanstack/vue-query"
import { User } from "firebase/auth"
import { PropType } from "vue"
import PetItemWithDetails from "./PetItemWithDetails.vue"

const { petWithServices, user } = defineProps({
  petWithServices: {
    type: Object as PropType<{
      petId: string
      serviceCodes: string[]
    }>,
    required: true,
  },
  user: {
    required: true,
    type: Object as PropType<User>,
  },
})

const {
  isLoading,
  isError,
  data: pet,
  refetch,
} = useQuery({
  queryKey: ["getPet", user.uid, petWithServices.petId],
  queryFn: () => getPet(user.uid, petWithServices.petId),
})
onIonViewDidEnter(() => refetch())
</script>
