<template>
  <div class="relative grid h-full w-full place-items-center">
    <DarkMode class="absolute top-2 right-2" />
    <LoginForm />
  </div>
</template>

<script setup lang="ts">
import { DarkMode } from "@/components/custom/dark-mode";
import LoginForm from "./components/LoginForm.vue";
</script>
