<template>
  <DataTable :data :columns :visibleColumns :loading />
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/custom/data-table";
import type { User } from "../users.types";
import type { ColumnDef, VisibilityState } from "@tanstack/vue-table";
import { useDateFormat, useStorage } from "@vueuse/core";
import { h, onBeforeMount, onMounted, ref, toRefs, watch } from "vue";
import { ArrowUpDown } from "lucide-vue-next";
import { IconCircleCheckFilled, IconCircleMinus } from "@tabler/icons-vue";
import { useUserStore } from "../users.store";
import { storeToRefs } from "pinia";
import { Badge } from "@/components/ui/badge";

const userStore = useUserStore();
const { data, loading } = storeToRefs(userStore);

const visibleColumns = useStorage<VisibilityState>(
  "tasks-table",
  {},
  localStorage,
);
const columns: ColumnDef<User>[] = [
  // {
  //   accessorKey: "id",
  //   enableSorting: true,
  //   meta: "ID",
  //   header: ({ column }) => {
  //     return h(
  //       Button,
  //       {
  //         variant: "ghost",
  //         onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
  //       },
  //       () => ["ID", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })],
  //     );
  //   },
  //   cell: ({ row }) => row.getValue("id"),
  // },
  {
    accessorKey: "name",
    enableSorting: true,
    meta: "Name",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Name", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })],
      );
    },
    cell: ({ row }) => row.getValue("name"),
  },
  {
    accessorKey: "email",
    enableSorting: true,
    meta: "Email",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Email", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })],
      );
    },
    cell: ({ row }) => row.getValue("email"),
  },
  {
    accessorKey: "emailVerified",
    enableSorting: false,
    meta: "Verified",
    header: "Verified",
    cell: ({ row }) => {
      const verified = row.getValue("emailVerified");
      const variant = verified ? "default" : "destructive";
      const badgeContent = verified ? "Yes" : "No";

      return h(Badge, { variant }, () => [badgeContent]);
    },
  },
];

onBeforeMount(async () => {
  await userStore.fetchUsers();
});
</script>
