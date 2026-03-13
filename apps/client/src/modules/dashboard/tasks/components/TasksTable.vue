<template>
  <DataTable :data :columns :visibleColumns :loading>
    <template #actions>
      <Button variant="success"> Create Task </Button>
    </template>
  </DataTable>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/custom/data-table";
import type { Tasks } from "../tasks.types";
import type { ColumnDef, VisibilityState } from "@tanstack/vue-table";
import { useDateFormat, useStorage } from "@vueuse/core";
import { h, onMounted, ref, toRefs, watch } from "vue";
import { ArrowUpDown } from "lucide-vue-next";
import { IconCircleCheckFilled, IconCircleMinus } from "@tabler/icons-vue";
import { useTasksStore } from "../tasks.store";
import { storeToRefs } from "pinia";

const tasksStore = useTasksStore();
const { data, loading } = storeToRefs(tasksStore);

const visibleColumns = useStorage<VisibilityState>(
  "tasks-table",
  {},
  localStorage,
);
const columns: ColumnDef<Tasks>[] = [
  {
    accessorKey: "title",
    enableSorting: true,
    meta: "Title",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Title", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })],
      );
    },
    cell: ({ row }) => row.getValue("title"),
  },
  {
    accessorKey: "description",
    enableSorting: true,
    meta: "Description",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Description", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })],
      );
    },
    cell: ({ row }) => row.getValue("description"),
  },
  {
    accessorKey: "completed",
    meta: "Completed",
    header: "Completed",
    cell: ({ row }) => {
      if (row.getValue("completed"))
        return h(IconCircleCheckFilled, { class: "h-4 w-4 text-success" });
      return h(IconCircleMinus, { class: "h-4 w-4 text-destructive" });
    },
  },
  {
    accessorKey: "createdAt",
    enableSorting: true,
    meta: "Created At",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Created At", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })],
      );
    },
    cell: ({ row }) => {
      return useDateFormat(row.getValue("createdAt"), "YYYY-MM-DD").value;
    },
  },
  {
    accessorKey: "updatedAt",
    enableSorting: true,
    meta: "Updated At",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Updated At", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })],
      );
    },
    cell: ({ row }) => {
      return useDateFormat(row.getValue("updatedAt"), "YYYY-MM-DD").value;
    },
  },
];

onMounted(async () => {
  await tasksStore.fetchData();
});
</script>
