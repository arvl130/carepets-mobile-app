<template>
  <BasePageWithBackButton defaultHref="/my-pets" pageTitle="My Pet Cats">
    <IsAuthenticated v-slot="{ user }">
      <Authenticated :user="user" />
    </IsAuthenticated>
  </BasePageWithBackButton>
</template>

<script lang="ts" setup>
import IsAuthenticated from "@/components/IsAuthenticated.vue"
import Authenticated from "./Authenticated.vue"
import BasePageWithBackButton from "@/components/BasePageWithBackButton.vue"
</script>
