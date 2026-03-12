<template>
  <div class="h-500">
    <div class="mb-4 grid gap-y-4">
      <h1 class="text-3xl font-semibold">Tasks</h1>
      <p class="text-secondary-foreground text-sm">
        Here's a list of all your tasks
      </p>
    </div>
    <DataTable :data :columns :visibleColumns>
      <template #actions>
        <Button variant="success"> Create Task </Button>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/custom/data-table";
import { h, ref } from "vue";
import { selectTaskSchema } from "@packages/db/validators";
import type z from "zod";
import type { tasks } from "@packages/db/schema";
import type { ColumnDef, VisibilityState } from "@tanstack/vue-table";
import { ArrowUpDown } from "lucide-vue-next";
import { IconCircleCheckFilled, IconCircleMinus } from "@tabler/icons-vue";
import { useDateFormat, useStorage } from "@vueuse/core";

type Data = typeof tasks.$inferSelect;
const data = ref<Data[]>([
  {
    id: "43d1d16c-ffd0-4cfe-a141-85e44c190cbb",
    userId: "EMjpQcHwhZwySwc5hJAAjvS9oVmEFlAT",
    title: "test",
    description: "asd",
    completed: true,
    createdAt: new Date("2026-03-05T16:35:40.498Z"),
    updatedAt: new Date("2026-03-05T16:44:51.149Z"),
  },
]);
const visibleColumns = useStorage<VisibilityState>(
  "tasks-table",
  {},
  localStorage,
);
const columns: ColumnDef<Data>[] = [
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
</script>
