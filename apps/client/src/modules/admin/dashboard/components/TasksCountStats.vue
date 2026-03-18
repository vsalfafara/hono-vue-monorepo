<template>
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
    <StatsCard title="Total Tasks" :value="count" :loading>
      <template #icon>
        <ListTodo :size="50" class="bg-info rounded-full p-3" />
      </template>
    </StatsCard>
    <StatsCard title="Completed Tasks" :value="completed" :loading>
      <template #icon>
        <ListCheck :size="50" class="bg-success rounded-full p-3" />
      </template>
    </StatsCard>
    <StatsCard title="Not Completed Tasks" :value="notCompleted" :loading>
      <template #icon>
        <List :size="50" class="bg-destructive rounded-full p-3" />
      </template>
    </StatsCard>
  </div>
</template>

<script setup lang="ts">
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { List, ListCheck, ListTodo } from "lucide-vue-next";
import { storeToRefs } from "pinia";
import { useDashboardStore } from "../dashboard.store";
import StatsCard from "@/components/custom/stats-card/StatsCard.vue";

const { count, completed, notCompleted, loading } =
  storeToRefs(useDashboardStore());
</script>
