<template>
  <Card class="flex flex-col">
    <CardHeader class="items-center pb-0">
      <CardTitle>Pie Chart</CardTitle>
      <CardDescription>Task Status</CardDescription>
    </CardHeader>
    <CardContent class="flex-1 pb-0">
      <ChartContainer
        :config="chartConfig"
        class="mx-auto aspect-square max-h-62.5"
      >
        <ChartLegendContent />
        <VisSingleContainer :data="data" :margin="{ top: 30, bottom: 30 }">
          <VisDonut
            :value="(d: Data) => d.value"
            :color="
              (d: Data) =>
                chartConfig[d.label as keyof typeof chartConfig].color
            "
            :arc-width="0"
          />
          <ChartTooltip
            :triggers="{
              [Donut.selectors.segment]: componentToString(
                chartConfig,
                ChartTooltipContent,
                { hideLabel: true },
              )!,
            }"
          />
        </VisSingleContainer>
      </ChartContainer>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import type { ChartConfig } from "@/components/ui/chart";
import { Donut } from "@unovis/ts";
import { VisDonut, VisSingleContainer } from "@unovis/vue";
import { TrendingUp } from "lucide-vue-next";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  componentToString,
} from "@/components/ui/chart";
import { useDashboardStore } from "../dashboard.store";
import { storeToRefs } from "pinia";

const dashboardStore = useDashboardStore();

const { data, loading } = storeToRefs(dashboardStore);

type Data = (typeof data.value)[number];

const chartConfig = {
  value: {
    label: "Tasks",
    color: undefined,
  },
  completed: {
    label: "Completed",
    color: "var(--chart-1)",
  },
  "not-completed": {
    label: "Not Completed",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;
</script>
