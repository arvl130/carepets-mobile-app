<template>
  <ion-button :expand="'block'" @click="onGoToAddDogPage">ADD DOG</ion-button>
  <LoadingAnimation v-if="isLoading" />
  <div v-else>
    <div v-if="isError" class="text-center py-3">An error occured.</div>
    <div v-else>
      <div v-if="dogs === undefined" class="text-center py-3">
        No data found.
      </div>
      <div v-else>
        <div v-if="dogs.length === 0" class="text-center py-3">
          No dogs added.
        </div>
        <ion-list v-else>
          <DogItem v-for="dog in dogs" :key="dog.id" :dog="dog" />
        </ion-list>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IonButton, IonList, onIonViewDidEnter } from "@ionic/vue"
import { useRouter } from "vue-router"
import LoadingAnimation from "@/components/LoadingAnimation.vue"
import { useQuery } from "@tanstack/vue-query"
import { getDogs } from "@/firebase"
import DogItem from "./DogItem.vue"
import { PropType } from "vue"
import { User } from "firebase/auth"

const { user } = defineProps({
  user: {
    type: Object as PropType<User>,
    required: true,
  },
})

const {
  isLoading,
  isError,
  data: dogs,
  refetch,
} = useQuery({
  queryKey: ["getDogs", user.uid],
  queryFn: () => getDogs(user.uid),
})
onIonViewDidEnter(() => refetch())

const router = useRouter()
function onGoToAddDogPage() {
  router.push("/my-pets/dogs/add")
}
</script>
