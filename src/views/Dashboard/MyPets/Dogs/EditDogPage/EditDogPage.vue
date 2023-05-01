<template>
  <BasePageWithBackButton defaultHref="/my-pets" pageTitle="Edit Pet Dog">
    <IsAuthenticated v-slot="{ user }">
      <div v-if="typeof route.params.petId === 'string'">
        <Authenticated :userId="user.uid" :petId="route.params.petId" />
      </div>
    </IsAuthenticated>
  </BasePageWithBackButton>
</template>

<script lang="ts" setup>
import BasePageWithBackButton from "@/components/BasePageWithBackButton.vue"
import IsAuthenticated from "@/components/IsAuthenticated.vue"
import Authenticated from "./Authenticated.vue"
import { useRoute } from "vue-router"

const route = useRoute()
</script>
