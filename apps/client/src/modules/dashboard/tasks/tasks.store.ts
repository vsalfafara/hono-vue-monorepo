import { tasks } from "@packages/db/schema";
import { defineStore } from "pinia";
import type { Task } from "./tasks.types";
import { computed, ref } from "vue";
import { apiClient, useApi } from "@/lib/api.utils";
import { toast } from "vue-sonner";
import { authClient } from "@/lib/auth.utils";

export const useTasksStore = defineStore("tasks", () => {
  const data = ref<Task[]>([]);
  const { loading, execute } = useApi();

  async function fetchData() {
    data.value = await execute(apiClient.tasks.$get);
  }

  function $reset() {
    data.value = [];
  }

  return {
    data,
    loading,
    execute,
    fetchData,
    $reset,
  };
});
