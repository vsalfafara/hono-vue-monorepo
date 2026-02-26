<template>
  <div class="h-500">This is the home page</div>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth.store";

const authStore = useAuthStore();
</script>
