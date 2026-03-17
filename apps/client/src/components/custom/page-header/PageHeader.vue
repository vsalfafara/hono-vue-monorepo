<template>
  <div class="mb-4 grid gap-y-4">
    <h1 class="text-3xl font-semibold">{{ title }}</h1>
    <p class="text-secondary-foreground text-sm">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
type PageHeaderProps = {
  title: string;
  description: string;
};

const { title, description } = defineProps<PageHeaderProps>();
</script>
