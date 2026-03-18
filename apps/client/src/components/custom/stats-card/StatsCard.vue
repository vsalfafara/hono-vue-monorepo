<template>
  <Card>
    <CardHeader class="flex h-full justify-between gap-4">
      <div class="grid gap-2">
        <CardDescription class="font-semibold">{{ title }}</CardDescription>
        <CardTitle class="text-3xl">
          <template v-if="loading">
            <Loader2 class="animate-spin" />
          </template>
          <template v-else>{{ value }}</template>
        </CardTitle>
      </div>
      <slot name="icon" />
    </CardHeader>
  </Card>
</template>

<script setup lang="ts">
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-vue-next";

type StatsCardProps = {
  title: string;
  value: any;
  loading?: boolean;
};

const { title, value, loading = false } = defineProps<StatsCardProps>();
</script>
