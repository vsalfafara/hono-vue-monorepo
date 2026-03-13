import { tasks } from "@packages/db/schema";
import { defineStore } from "pinia";
import type { Tasks } from "./tasks.types";
import { computed, ref } from "vue";
import { apiClient, useApi } from "@/lib/api.utils";
import { toast } from "vue-sonner";

export const useTasksStore = defineStore("tasks", () => {
  const data = ref<Tasks[]>([]);
  const { loading, execute } = useApi();

  const getData = computed(() => data.value);

  async function fetchData() {
    data.value = await execute(apiClient.tasks.$get);
  }

  return {
    data,
    loading,
    fetchData,
  };
});
