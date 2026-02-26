<template>
  <div class="h-dvh">
    <RouterView />
    <Toaster :rich-colors="true" />
  </div>
</template>

<script setup lang="ts">
import { Toaster } from "@/components/ui/sonner";
</script>
