<template>
  <div v-if="isLoading">Still loading ...</div>
  <div v-else>
    <div v-if="isAuthenticated">
      <div v-if="user === null">Invalid state: Authenticated, but no user.</div>
      <div v-else>
        <slot :user="user"></slot>
      </div>
    </div>
    <div v-else>Not authenticated</div>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from "../store/user"
import { storeToRefs } from "pinia"
import { onIonViewDidEnter } from "@ionic/vue"
import { onMounted } from "vue"
import { useRedirectIfUnauthenticated } from "@/hooks/redirects"
useRedirectIfUnauthenticated()

const userStore = useUserStore()
onMounted(() => userStore.init())
onIonViewDidEnter(() => userStore.init())

const { isAuthenticated, isLoading, user } = storeToRefs(userStore)
</script>
