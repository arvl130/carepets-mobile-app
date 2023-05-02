<template>
  <BasePageWithBackButton
    default-href="/appointments"
    page-title="Appointments - Choose Slot"
  >
    <IsAuthenticated v-slot="{ user }">
      <Authenticated :user="user" />
    </IsAuthenticated>
  </BasePageWithBackButton>
</template>

<script setup lang="ts">
import BasePageWithBackButton from "@/components/BasePageWithBackButton.vue"
import IsAuthenticated from "@/components/IsAuthenticated.vue"
import Authenticated from "./Authenticated.vue"
</script>
