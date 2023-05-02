<template>
  <div v-if="isLoading">Loading ...</div>
  <div v-else>
    <div v-if="isError">An error occured.</div>
    <div v-else>
      <div v-if="pet === undefined">No data found.</div>
      <PetWithServiceWithDetailsItem
        v-else
        :user="user"
        :pet-with-service="petWithService"
        :pet="pet"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getPet } from "@/firebase"
import { onIonViewDidEnter } from "@ionic/vue"
import { useQuery } from "@tanstack/vue-query"
import { User } from "firebase/auth"
import { PropType } from "vue"
import PetWithServiceWithDetailsItem from "./PetWithServiceWithDetailsItem.vue"

const { user, petWithService } = defineProps({
  user: {
    required: true,
    type: Object as PropType<User>,
  },
  petWithService: {
    required: true,
    type: Object as PropType<{ petId: string; serviceCodes: string[] }>,
  },
})

const {
  isLoading,
  isError,
  data: pet,
  refetch,
} = useQuery({
  queryKey: ["getPet", user.uid, petWithService.petId],
  queryFn: () => getPet(user.uid, petWithService.petId),
})
onIonViewDidEnter(() => refetch())
</script>
