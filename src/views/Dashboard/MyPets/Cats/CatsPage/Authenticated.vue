<template>
  <ion-button :expand="'block'" @click="onGoToAddCatPage">ADD CAT</ion-button>
  <LoadingAnimation v-if="isLoading" />
  <div v-else>
    <div v-if="isError" class="text-center py-3">An error occured.</div>
    <div v-else>
      <div v-if="cats === undefined" class="text-center py-3">
        No data found.
      </div>
      <div v-else>
        <div v-if="cats.length === 0" class="text-center py-3">
          No cats added.
        </div>
        <ion-list v-else>
          <CatItem v-for="cat in cats" :key="cat.id" :cat="cat" />
        </ion-list>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonButton, IonList, onIonViewDidEnter } from "@ionic/vue"
import LoadingAnimation from "@/components/LoadingAnimation.vue"
import { useRouter } from "vue-router"
import CatItem from "./CatItem.vue"
import { useQuery } from "@tanstack/vue-query"
import { getCats } from "@/firebase"
import { User } from "firebase/auth"
import { PropType } from "vue"

const { user } = defineProps({
  user: {
    type: Object as PropType<User>,
    required: true,
  },
})

const {
  isLoading,
  isError,
  data: cats,
  refetch,
} = useQuery({
  queryKey: ["getCats", user.uid],
  queryFn: () => getCats(user.uid),
})
onIonViewDidEnter(() => refetch())

const router = useRouter()
function onGoToAddCatPage() {
  router.push("/my-pets/cats/add")
}
</script>
