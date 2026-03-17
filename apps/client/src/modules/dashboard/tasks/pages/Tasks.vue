<template>
  <div>
    <PageHeader title="Tasks" description="Here's a list of all your tasks" />
    <TasksTable />
  </div>
</template>

<script setup lang="ts">
import { PageHeader } from "@/components/custom/page-header";
import TasksTable from "../components/TasksTable.vue";
</script>
