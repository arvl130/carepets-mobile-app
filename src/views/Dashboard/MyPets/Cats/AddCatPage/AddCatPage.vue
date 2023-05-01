<template>
  <base-page-with-back-button default-href="/my-pets" page-title="Add Pet Cat">
    <is-authenticated v-slot="{ user }">
      <Authenticated :userId="user.uid" />
    </is-authenticated>
  </base-page-with-back-button>
</template>

<script lang="ts" setup>
import BasePageWithBackButton from "@/components/BasePageWithBackButton.vue"
import IsAuthenticated from "@/components/IsAuthenticated.vue"
import Authenticated from "./Authenticated.vue"
</script>
