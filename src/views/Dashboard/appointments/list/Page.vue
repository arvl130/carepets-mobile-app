<template>
  <BasePageWithBackButton default-href="/dashboard" page-title="Appointments">
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
