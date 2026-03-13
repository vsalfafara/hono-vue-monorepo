<template>
  <div class="h-500">
    <div class="mb-4 grid gap-y-4">
      <h1 class="text-3xl font-semibold">Tasks</h1>
      <p class="text-secondary-foreground text-sm">
        Here's a list of all your tasks
      </p>
    </div>
    <TasksTable />
  </div>
</template>

<script setup lang="ts">
import TasksTable from "./components/TasksTable.vue";
</script>
