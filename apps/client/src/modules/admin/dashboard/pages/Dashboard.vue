<template>
  <div>
    <PageHeader
      title="Dashboard"
      description="View your users' tasks analytics here"
    />
    <div class="grid gap-4">
      <TasksCountStats />
      <TasksStatusPieChart />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PageHeader } from "@/components/custom/page-header";
import TasksStatusPieChart from "../components/TasksStatusPieChart.vue";
import TasksCountStats from "../components/TasksCountStats.vue";
</script>
