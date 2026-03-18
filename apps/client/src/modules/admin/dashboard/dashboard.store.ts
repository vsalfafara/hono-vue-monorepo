import { defineStore } from "pinia";
import { ref } from "vue";
import type { TaskDashboardData } from "./dashboard.types";
import { apiClient, useApi } from "@/lib/api.utils";

export const useDashboardStore = defineStore("dashboard", () => {
  const data = ref<TaskDashboardData[]>([]);
  const count = ref<number>(0);
  const completed = ref<number>(0);
  const notCompleted = ref<number>(0);
  const { loading, execute } = useApi();

  async function getTaskDashboardData() {
    data.value = await execute(apiClient.dashboard.$get);
  }

  async function getTaskCountData() {
    const [countResponse, completedResponse, notCompletedResponse] =
      await Promise.allSettled([
        execute(apiClient.dashboard["tasks-count"].$get),
        execute(apiClient.dashboard["tasks-count"].$get, {
          query: { completed: false },
        }),
        execute(apiClient.dashboard["tasks-count"].$get, {
          query: { completed: true },
        }),
      ]);
    count.value =
      countResponse.status === "fulfilled" ? countResponse.value.count : 0;
    completed.value =
      completedResponse.status === "fulfilled"
        ? completedResponse.value.count
        : 0;
    notCompleted.value =
      notCompletedResponse.status === "fulfilled"
        ? notCompletedResponse.value.count
        : 0;
  }

  function init() {
    getTaskDashboardData();
    getTaskCountData();
  }

  init();

  return {
    data,
    count,
    completed,
    notCompleted,
    loading,
    execute,
    getTaskDashboardData,
    getTaskCountData,
    init,
  };
});
