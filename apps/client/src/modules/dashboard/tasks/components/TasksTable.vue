<template>
  <DataTable :data :columns :visibleColumns :loading>
    <template #actions>
      <CreateTaskDialog />
    </template>
  </DataTable>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/custom/data-table";
import type { Task } from "../tasks.types";
import type { ColumnDef, VisibilityState } from "@tanstack/vue-table";
import { useDateFormat, useStorage } from "@vueuse/core";
import { h, onBeforeMount, onMounted, ref, toRefs, watch } from "vue";
import { ArrowUpDown } from "lucide-vue-next";
import { IconCircleCheckFilled, IconCircleMinus } from "@tabler/icons-vue";
import { useTasksStore } from "../tasks.store";
import { storeToRefs } from "pinia";
import CreateTaskDialog from "./CreateTaskDialog.vue";
import CompleteTaskDialog from "./CompleteTaskDialog.vue";
import EditTaskDialog from "./EditTaskDialog.vue";
import DeleteTaskDialog from "./DeleteTaskDialog.vue";

const tasksStore = useTasksStore();
const { data, loading } = storeToRefs(tasksStore);

const visibleColumns = useStorage<VisibilityState>(
  "tasks-table",
  {},
  localStorage,
);
const columns: ColumnDef<Task>[] = [
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
  {
    id: "actions",
    enableHiding: false,
    header: () => h("span", { class: "flex justify-center" }, ["Actions"]),
    cell: ({ row }) => {
      const data = row.original;
      const actions = [];

      if (!data.completed) {
        actions.push(
          h(EditTaskDialog, {
            id: data.id,
            title: data.title,
            description: data.description as string,
            onRefresh: () => tasksStore.fetchData(),
          }),
        );
        actions.push(
          h(CompleteTaskDialog, {
            id: data.id,
            onRefresh: () => tasksStore.fetchData(),
          }),
        );
        actions.push(
          h(DeleteTaskDialog, {
            id: data.id,
            onRefresh: () => tasksStore.fetchData(),
          }),
        );
      }

      return h("div", { class: "flex gap-2 justify-center" }, actions);
    },
  },
];

onBeforeMount(async () => {
  await tasksStore.fetchData();
});
</script>
