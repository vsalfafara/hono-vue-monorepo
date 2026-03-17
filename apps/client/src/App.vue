<template>
  <div class="h-dvh">
    <RouterView />
    <Toaster :rich-colors="true" />
  </div>
</template>

<script setup lang="ts">
import { Toaster } from "@/components/ui/sonner";
import { useAuthStore } from "./stores/auth.store";
import { onBeforeMount } from "vue";

onBeforeMount(async () => {
  // Important for components with authentication dependencies
  await useAuthStore().session.refetch();
});
</script>
